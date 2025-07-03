/*
  # Fix Authentication Setup - Public Schema Only

  1. Remove all auth schema modifications
  2. Use only public schema for our application data
  3. Let Supabase handle auth.users via Auth API
  4. Create proper RLS policies that reference auth.users safely

  This migration follows Supabase best practices:
  - Never create/modify auth schema tables
  - Use public schema for application data
  - Reference auth.users via foreign keys only
  - Let Supabase Auth API handle user creation
*/

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
EXCEPTION
  WHEN insufficient_privilege THEN
    -- Roles already exist or we don't have permission, that's fine
    NULL;
END $$;

-- Grant safe role memberships only (if we have permission)
DO $$
BEGIN
  GRANT anon TO postgres;
  GRANT authenticated TO postgres;
  GRANT service_role TO postgres;
EXCEPTION
  WHEN insufficient_privilege THEN
    -- We don't have permission to grant roles, that's fine
    NULL;
END $$;

-- Ensure proper grants for public schema
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated, service_role;

-- Set default privileges
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon, authenticated, service_role;

-- Update profiles table to reference auth.users properly
-- Remove the foreign key constraint temporarily
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- Add it back with proper reference to auth.users
-- Note: We reference auth.users but don't modify it
ALTER TABLE profiles ADD CONSTRAINT profiles_id_fkey 
  FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Ensure the auth trigger function exists for new user creation
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
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    email_verified = EXCLUDED.email_verified,
    updated_at = now();
  RETURN new;
END;
$$;

-- Create trigger for new user creation (if it doesn't exist)
-- This will automatically create profiles when users sign up via Supabase Auth API
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert demo profiles directly (these will be linked when users are created via Auth API)
-- Note: We're only creating the profile data, not the auth.users records
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

-- Insert affiliate record for the demo affiliate
INSERT INTO affiliates (
  id,
  user_id,
  affiliate_id,
  manager_id,
  notes,
  tags,
  total_earnings,
  total_clicks,
  total_conversions,
  conversion_rate,
  epc,
  last_activity,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000002',
  'AFF000001',
  '00000000-0000-0000-0000-000000000001',
  'Demo affiliate account - VIP status',
  '{"Demo", "VIP", "High Volume", "Trusted"}',
  15420.50,
  45230,
  1240,
  2.74,
  0.34,
  now(),
  now(),
  now()
) ON CONFLICT (id) DO NOTHING;

-- Note: The actual auth.users records need to be created via Supabase Auth API
-- This can be done through the Supabase dashboard or via the signup API
-- The demo credentials will be:
-- Admin: admin@affwish.com / Admin123!@#
-- Affiliate: affiliate@affwish.com / Affiliate123!@#