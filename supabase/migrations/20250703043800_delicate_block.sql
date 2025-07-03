/*
  # Fix Supabase Authentication Schema Issues (Safe Version)

  1. Ensure auth schema exists and has proper permissions
  2. Verify required auth roles exist (only safe ones)
  3. Fix any missing auth tables or functions
  4. Ensure proper RLS policies for auth integration
  
  Note: Removed all references to reserved supabase_auth_admin role
*/

-- Ensure auth schema exists
CREATE SCHEMA IF NOT EXISTS auth;

-- Grant necessary permissions to auth schema (only safe roles)
GRANT USAGE ON SCHEMA auth TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA auth TO postgres, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA auth TO postgres, service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA auth TO postgres, service_role;

-- Ensure required roles exist (only safe ones we can create)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
    CREATE ROLE anon NOLOGIN NOINHERIT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN
    CREATE ROLE authenticated NOLOGIN NOINHERIT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'service_role') THEN
    CREATE ROLE service_role NOLOGIN NOINHERIT BYPASSRLS;
  END IF;
END $$;

-- Grant safe role memberships only
GRANT anon TO postgres;
GRANT authenticated TO postgres;
GRANT service_role TO postgres;

-- Create aal_level enum if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'aal_level') THEN
    CREATE TYPE auth.aal_level AS ENUM ('aal1', 'aal2', 'aal3');
  END IF;
EXCEPTION
  WHEN duplicate_object THEN
    NULL; -- Type already exists, ignore
END $$;

-- Ensure auth.users table exists with proper structure
CREATE TABLE IF NOT EXISTS auth.users (
  instance_id uuid,
  id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  aud character varying(255),
  role character varying(255),
  email character varying(255) UNIQUE,
  encrypted_password character varying(255),
  email_confirmed_at timestamp with time zone,
  invited_at timestamp with time zone,
  confirmation_token character varying(255),
  confirmation_sent_at timestamp with time zone,
  recovery_token character varying(255),
  recovery_sent_at timestamp with time zone,
  email_change_token_new character varying(255),
  email_change character varying(255),
  email_change_sent_at timestamp with time zone,
  last_sign_in_at timestamp with time zone,
  raw_app_meta_data jsonb,
  raw_user_meta_data jsonb,
  is_super_admin boolean,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  phone text UNIQUE,
  phone_confirmed_at timestamp with time zone,
  phone_change text DEFAULT '',
  phone_change_token character varying(255) DEFAULT '',
  phone_change_sent_at timestamp with time zone,
  confirmed_at timestamp with time zone GENERATED ALWAYS AS (LEAST(email_confirmed_at, phone_confirmed_at)) STORED,
  email_change_token_current character varying(255) DEFAULT '',
  email_change_confirm_status smallint DEFAULT 0,
  banned_until timestamp with time zone,
  reauthentication_token character varying(255) DEFAULT '',
  reauthentication_sent_at timestamp with time zone,
  is_sso_user boolean NOT NULL DEFAULT false,
  deleted_at timestamp with time zone
);

-- Ensure auth.identities table exists
CREATE TABLE IF NOT EXISTS auth.identities (
  id text NOT NULL PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  identity_data jsonb NOT NULL,
  provider text NOT NULL,
  last_sign_in_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Ensure auth.sessions table exists
CREATE TABLE IF NOT EXISTS auth.sessions (
  id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  factor_id uuid,
  aal auth.aal_level,
  not_after timestamp with time zone
);

-- Ensure auth.refresh_tokens table exists
CREATE TABLE IF NOT EXISTS auth.refresh_tokens (
  instance_id uuid,
  id bigserial PRIMARY KEY,
  token character varying(255) UNIQUE,
  user_id character varying(255),
  revoked boolean,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  parent character varying(255),
  session_id uuid REFERENCES auth.sessions(id) ON DELETE CASCADE
);

-- Grant proper permissions on auth tables (only to safe roles)
GRANT SELECT ON auth.users TO authenticated, anon;
GRANT SELECT ON auth.identities TO authenticated;
GRANT SELECT ON auth.sessions TO authenticated;

-- Enable RLS on auth tables
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE auth.identities ENABLE ROW LEVEL SECURITY;
ALTER TABLE auth.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE auth.refresh_tokens ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for auth tables
DROP POLICY IF EXISTS "Users can view own user data" ON auth.users;
CREATE POLICY "Users can view own user data" ON auth.users
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can view own identities" ON auth.identities;
CREATE POLICY "Users can view own identities" ON auth.identities
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view own sessions" ON auth.sessions;
CREATE POLICY "Users can view own sessions" ON auth.sessions
  FOR SELECT USING (auth.uid() = user_id);

-- Ensure auth functions exist
CREATE OR REPLACE FUNCTION auth.uid()
RETURNS uuid
LANGUAGE sql STABLE
AS $$
  SELECT 
    COALESCE(
      current_setting('request.jwt.claim.sub', true),
      (current_setting('request.jwt.claims', true)::jsonb ->> 'sub')
    )::uuid
$$;

CREATE OR REPLACE FUNCTION auth.role()
RETURNS text
LANGUAGE sql STABLE
AS $$
  SELECT 
    COALESCE(
      current_setting('request.jwt.claim.role', true),
      (current_setting('request.jwt.claims', true)::jsonb ->> 'role')
    )::text
$$;

-- Create auth.email() function
CREATE OR REPLACE FUNCTION auth.email()
RETURNS text
LANGUAGE sql STABLE
AS $$
  SELECT 
    COALESCE(
      current_setting('request.jwt.claim.email', true),
      (current_setting('request.jwt.claims', true)::jsonb ->> 'email')
    )::text
$$;

-- Ensure proper indexes exist
CREATE INDEX IF NOT EXISTS users_instance_id_idx ON auth.users(instance_id);
CREATE INDEX IF NOT EXISTS users_email_idx ON auth.users(email);
CREATE INDEX IF NOT EXISTS identities_user_id_idx ON auth.identities(user_id);
CREATE INDEX IF NOT EXISTS sessions_user_id_idx ON auth.sessions(user_id);
CREATE INDEX IF NOT EXISTS refresh_tokens_token_idx ON auth.refresh_tokens(token);

-- Update profiles table to ensure proper foreign key relationship
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;
ALTER TABLE profiles ADD CONSTRAINT profiles_id_fkey 
  FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Ensure proper grants for public schema
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated, service_role;

-- Set default privileges
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon, authenticated, service_role;

-- Ensure the auth trigger function exists
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, status, email_verified, created_at, updated_at)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email),
    COALESCE(new.raw_user_meta_data->>'role', 'affiliate'),
    'pending',
    new.email_confirmed_at IS NOT NULL,
    now(),
    now()
  );
  RETURN new;
END;
$$;

-- Create trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert or update the default users with proper auth structure
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  role,
  aud,
  raw_user_meta_data,
  raw_app_meta_data
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000000',
  'admin@affwish.com',
  crypt('Admin123!@#', gen_salt('bf')),
  now(),
  now(),
  now(),
  'authenticated',
  'authenticated',
  '{"full_name": "AFFWISH Administrator", "role": "admin"}',
  '{"provider": "email", "providers": ["email"]}'
) ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  encrypted_password = EXCLUDED.encrypted_password,
  email_confirmed_at = EXCLUDED.email_confirmed_at,
  updated_at = now(),
  raw_user_meta_data = EXCLUDED.raw_user_meta_data;

INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  role,
  aud,
  raw_user_meta_data,
  raw_app_meta_data
) VALUES (
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000000',
  'affiliate@affwish.com',
  crypt('Affiliate123!@#', gen_salt('bf')),
  now(),
  now(),
  now(),
  'authenticated',
  'authenticated',
  '{"full_name": "Top Affiliate Marketer", "role": "affiliate"}',
  '{"provider": "email", "providers": ["email"]}'
) ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  encrypted_password = EXCLUDED.encrypted_password,
  email_confirmed_at = EXCLUDED.email_confirmed_at,
  updated_at = now(),
  raw_user_meta_data = EXCLUDED.raw_user_meta_data;

-- Insert corresponding identities
INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  created_at,
  updated_at
) VALUES (
  'admin@affwish.com',
  '00000000-0000-0000-0000-000000000001',
  '{"sub": "00000000-0000-0000-0000-000000000001", "email": "admin@affwish.com"}',
  'email',
  now(),
  now()
) ON CONFLICT (id) DO UPDATE SET
  identity_data = EXCLUDED.identity_data,
  updated_at = now();

INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  created_at,
  updated_at
) VALUES (
  'affiliate@affwish.com',
  '00000000-0000-0000-0000-000000000002',
  '{"sub": "00000000-0000-0000-0000-000000000002", "email": "affiliate@affwish.com"}',
  'email',
  now(),
  now()
) ON CONFLICT (id) DO UPDATE SET
  identity_data = EXCLUDED.identity_data,
  updated_at = now();

-- Ensure profiles exist and are properly linked
INSERT INTO public.profiles (
  id,
  email,
  full_name,
  role,
  status,
  company,
  website,
  phone,
  country,
  address,
  city,
  zip_code,
  timezone,
  payment_method,
  payment_details,
  traffic_sources,
  experience_level,
  bio,
  email_verified,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  'admin@affwish.com',
  'AFFWISH Administrator',
  'admin',
  'active',
  'AFFWISH Network',
  'https://affwish.com',
  '+1-555-0100',
  'United States',
  '123 Network Street',
  'San Francisco',
  '94105',
  'America/Los_Angeles',
  'bank',
  '{"bank_name": "Chase Bank", "account_number": "****1234", "routing_number": "****5678"}',
  '{"Email Marketing", "PPC", "Social Media"}',
  'expert',
  'Network administrator with 10+ years experience in affiliate marketing.',
  true,
  now(),
  now()
) ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  status = EXCLUDED.status,
  email_verified = EXCLUDED.email_verified,
  updated_at = now();

INSERT INTO public.profiles (
  id,
  email,
  full_name,
  role,
  status,
  company,
  website,
  phone,
  country,
  address,
  city,
  zip_code,
  timezone,
  payment_method,
  payment_details,
  traffic_sources,
  experience_level,
  bio,
  email_verified,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000002',
  'affiliate@affwish.com',
  'Top Affiliate Marketer',
  'affiliate',
  'active',
  'Marketing Pro LLC',
  'https://marketingpro.com',
  '+1-555-0200',
  'United States',
  '456 Marketing Avenue',
  'New York',
  '10001',
  'America/New_York',
  'paypal',
  '{"paypal_email": "affiliate@affwish.com"}',
  '{"Social Media", "Email Marketing", "SEO", "YouTube"}',
  'advanced',
  'Experienced affiliate marketer specializing in performance marketing and lead generation.',
  true,
  now(),
  now()
) ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  status = EXCLUDED.status,
  email_verified = EXCLUDED.email_verified,
  updated_at = now();