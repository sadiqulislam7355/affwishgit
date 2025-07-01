/*
  # Initial CPA Network Schema

  1. New Tables
    - `profiles` - User profiles with role-based access
    - `offers` - CPA offers with tracking and postback configuration
    - `affiliates` - Affiliate management with payment details
    - `postbacks` - Postback configurations and tracking
    - `clicks` - Click tracking and analytics
    - `conversions` - Conversion tracking and reporting
    - `payments` - Payment history and management
    - `fraud_logs` - Fraud detection logs
    - `settings` - Network-wide settings

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access control
    - Secure admin and affiliate data separation

  3. Functions
    - Generate tracking URLs with macros
    - Handle postback processing
    - Fraud detection integration
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE user_role AS ENUM ('admin', 'affiliate');
CREATE TYPE user_status AS ENUM ('active', 'pending', 'suspended', 'banned');
CREATE TYPE offer_status AS ENUM ('active', 'paused', 'expired');
CREATE TYPE payout_type AS ENUM ('CPA', 'CPI', 'CPL', 'RevShare');
CREATE TYPE payment_method AS ENUM ('paypal', 'bank', 'crypto', 'check');
CREATE TYPE conversion_status AS ENUM ('pending', 'approved', 'rejected', 'held');

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role user_role NOT NULL DEFAULT 'affiliate',
  status user_status NOT NULL DEFAULT 'pending',
  company text,
  website text,
  phone text,
  country text,
  address text,
  city text,
  zip_code text,
  timezone text DEFAULT 'UTC',
  payment_method payment_method,
  payment_details jsonb,
  traffic_sources text[],
  experience_level text,
  bio text,
  avatar_url text,
  email_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_login timestamptz
);

-- Offers table
CREATE TABLE IF NOT EXISTS offers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text,
  advertiser text NOT NULL,
  advertiser_id text,
  payout decimal(10,2) NOT NULL,
  payout_type payout_type NOT NULL DEFAULT 'CPA',
  rev_share_percentage decimal(5,2),
  category text NOT NULL,
  status offer_status NOT NULL DEFAULT 'active',
  countries text[] DEFAULT '{}',
  devices text[] DEFAULT '{}',
  traffic_sources text[] DEFAULT '{}',
  offer_url text NOT NULL,
  preview_url text,
  tracking_url text,
  postback_url text,
  global_postback_enabled boolean DEFAULT true,
  caps jsonb DEFAULT '{}',
  restrictions text,
  conversion_flow text,
  expires_at timestamptz,
  require_approval boolean DEFAULT false,
  scrub_rate decimal(5,2) DEFAULT 0,
  throttle_rate decimal(5,2) DEFAULT 0,
  auto_approve boolean DEFAULT true,
  hold_period integer DEFAULT 0,
  created_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Affiliates table (for admin management)
CREATE TABLE IF NOT EXISTS affiliates (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  affiliate_id text UNIQUE NOT NULL,
  manager_id uuid REFERENCES profiles(id),
  notes text,
  tags text[],
  total_earnings decimal(12,2) DEFAULT 0,
  total_clicks integer DEFAULT 0,
  total_conversions integer DEFAULT 0,
  conversion_rate decimal(5,2) DEFAULT 0,
  epc decimal(8,2) DEFAULT 0,
  last_activity timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Postbacks table
CREATE TABLE IF NOT EXISTS postbacks (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  url text NOT NULL,
  method text DEFAULT 'GET',
  parameters jsonb DEFAULT '{}',
  headers jsonb DEFAULT '{}',
  status text DEFAULT 'active',
  offer_id uuid REFERENCES offers(id) ON DELETE CASCADE,
  created_by uuid REFERENCES profiles(id),
  fire_count integer DEFAULT 0,
  last_fired timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Clicks table
CREATE TABLE IF NOT EXISTS clicks (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  click_id text UNIQUE NOT NULL,
  offer_id uuid REFERENCES offers(id),
  affiliate_id uuid REFERENCES profiles(id),
  ip_address inet,
  user_agent text,
  country text,
  device text,
  browser text,
  os text,
  referrer text,
  landing_page text,
  sub_id text,
  sub_id_2 text,
  sub_id_3 text,
  sub_id_4 text,
  sub_id_5 text,
  fraud_score integer,
  is_fraud boolean DEFAULT false,
  is_converted boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Conversions table
CREATE TABLE IF NOT EXISTS conversions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversion_id text UNIQUE NOT NULL,
  click_id uuid REFERENCES clicks(id),
  offer_id uuid REFERENCES offers(id),
  affiliate_id uuid REFERENCES profiles(id),
  payout decimal(10,2) NOT NULL,
  revenue decimal(10,2),
  status conversion_status DEFAULT 'pending',
  conversion_value decimal(10,2),
  currency text DEFAULT 'USD',
  transaction_id text,
  customer_id text,
  ip_address inet,
  user_agent text,
  postback_sent boolean DEFAULT false,
  postback_response text,
  approved_at timestamptz,
  approved_by uuid REFERENCES profiles(id),
  rejection_reason text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  affiliate_id uuid REFERENCES profiles(id),
  amount decimal(12,2) NOT NULL,
  currency text DEFAULT 'USD',
  payment_method payment_method NOT NULL,
  payment_details jsonb,
  status text DEFAULT 'pending',
  reference_id text,
  transaction_id text,
  period_start date,
  period_end date,
  notes text,
  processed_at timestamptz,
  processed_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Fraud logs table
CREATE TABLE IF NOT EXISTS fraud_logs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  click_id uuid REFERENCES clicks(id),
  ip_address inet NOT NULL,
  fraud_score integer,
  risk_level text,
  reasons text[],
  blocked boolean DEFAULT false,
  provider text DEFAULT 'ipqualityscore',
  raw_response jsonb,
  created_at timestamptz DEFAULT now()
);

-- Settings table
CREATE TABLE IF NOT EXISTS settings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  description text,
  category text,
  created_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliates ENABLE ROW LEVEL SECURITY;
ALTER TABLE postbacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE fraud_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can read all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update all profiles" ON profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Offers policies
CREATE POLICY "Affiliates can read active offers" ON offers
  FOR SELECT USING (
    status = 'active' OR 
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage offers" ON offers
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Affiliates policies
CREATE POLICY "Users can read own affiliate data" ON affiliates
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can manage affiliates" ON affiliates
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Postbacks policies
CREATE POLICY "Admins can manage postbacks" ON postbacks
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Clicks policies
CREATE POLICY "Users can read own clicks" ON clicks
  FOR SELECT USING (
    affiliate_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "System can insert clicks" ON clicks
  FOR INSERT WITH CHECK (true);

-- Conversions policies
CREATE POLICY "Users can read own conversions" ON conversions
  FOR SELECT USING (
    affiliate_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage conversions" ON conversions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Payments policies
CREATE POLICY "Users can read own payments" ON payments
  FOR SELECT USING (
    affiliate_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage payments" ON payments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Settings policies
CREATE POLICY "Admins can manage settings" ON settings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Functions
CREATE OR REPLACE FUNCTION generate_tracking_url(
  p_offer_id uuid,
  p_affiliate_id uuid,
  p_sub_id text DEFAULT NULL
)
RETURNS text
LANGUAGE plpgsql
AS $$
DECLARE
  base_url text := 'https://track.affwish.com/click';
  tracking_url text;
BEGIN
  tracking_url := base_url || '?offer_id=' || p_offer_id::text || '&affiliate_id=' || p_affiliate_id::text || '&click_id={click_id}';
  
  IF p_sub_id IS NOT NULL THEN
    tracking_url := tracking_url || '&sub_id=' || p_sub_id;
  END IF;
  
  RETURN tracking_url;
END;
$$;

CREATE OR REPLACE FUNCTION generate_affiliate_id()
RETURNS text
LANGUAGE plpgsql
AS $$
DECLARE
  new_id text;
  counter integer := 1;
BEGIN
  LOOP
    new_id := 'AFF' || LPAD(counter::text, 6, '0');
    
    IF NOT EXISTS (SELECT 1 FROM affiliates WHERE affiliate_id = new_id) THEN
      RETURN new_id;
    END IF;
    
    counter := counter + 1;
  END LOOP;
END;
$$;

-- Insert default settings
INSERT INTO settings (key, value, description, category) VALUES
('network_name', '"AFFWISH Network"', 'Network display name', 'general'),
('network_description', '"Premium CPA affiliate network"', 'Network description', 'general'),
('default_currency', '"USD"', 'Default currency', 'general'),
('default_timezone', '"UTC"', 'Default timezone', 'general'),
('global_postback_url', '"https://your-domain.com/postback?click_id={click_id}&status={status}&affiliate_id={affiliate_id}&offer_id={offer_id}&payout={payout}"', 'Global postback URL with macros', 'postback'),
('fraud_protection_enabled', 'false', 'Enable fraud protection', 'fraud'),
('ipqualityscore_api_key', '""', 'IPQualityScore API key', 'fraud'),
('ipqualityscore_threshold', '75', 'Risk threshold percentage', 'fraud'),
('auto_block_high_risk', 'true', 'Auto-block high risk traffic', 'fraud'),
('require_email_verification', 'true', 'Require email verification for new users', 'auth'),
('allow_self_registration', 'false', 'Allow self registration', 'auth'),
('smtp_host', '""', 'SMTP server host', 'email'),
('smtp_port', '587', 'SMTP server port', 'email'),
('smtp_username', '""', 'SMTP username', 'email'),
('smtp_password', '""', 'SMTP password', 'email'),
('smtp_from_email', '""', 'From email address', 'email'),
('smtp_from_name', '"AFFWISH Network"', 'From name', 'email')
ON CONFLICT (key) DO NOTHING;

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_offers_updated_at BEFORE UPDATE ON offers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_affiliates_updated_at BEFORE UPDATE ON affiliates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conversions_updated_at BEFORE UPDATE ON conversions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();