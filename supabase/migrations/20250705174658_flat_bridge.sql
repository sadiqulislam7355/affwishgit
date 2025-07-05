-- AFFWISH CPA Network - Clean MySQL Schema
-- This migration creates the basic structure without any Supabase-specific roles

-- Create basic tables for the CPA network
CREATE TABLE IF NOT EXISTS public.network_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT 'AFFWISH Network',
  description text DEFAULT 'Premium CPA affiliate network',
  created_at timestamptz DEFAULT now()
);

-- Insert basic network info
INSERT INTO public.network_info (name, description) 
VALUES ('AFFWISH Network', 'Premium CPA affiliate network')
ON CONFLICT DO NOTHING;

-- Create a simple settings table
CREATE TABLE IF NOT EXISTS public.app_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key text UNIQUE NOT NULL,
  setting_value jsonb NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Insert basic settings
INSERT INTO public.app_settings (setting_key, setting_value, description) VALUES
('network_name', '"AFFWISH Network"', 'Network display name'),
('network_description', '"Premium CPA affiliate network"', 'Network description'),
('default_currency', '"USD"', 'Default currency'),
('tracking_domain', '"track.affwish.com"', 'Primary tracking domain')
ON CONFLICT (setting_key) DO NOTHING;

-- Enable RLS on tables
ALTER TABLE public.network_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;

-- Create simple policies that allow read access
CREATE POLICY "Allow read access to network info" ON public.network_info
  FOR SELECT USING (true);

CREATE POLICY "Allow read access to settings" ON public.app_settings
  FOR SELECT USING (true);