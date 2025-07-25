-- AFFWISH CPA Network - Complete MySQL Schema
-- Compatible with cPanel MySQL databases

-- Create database (uncomment if creating new database)
-- CREATE DATABASE affwish_network CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE affwish_network;

-- Enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- Users table (replaces Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE,
  email_verification_token VARCHAR(255),
  password_reset_token VARCHAR(255),
  password_reset_expires DATETIME,
  last_login DATETIME,
  login_attempts INT DEFAULT 0,
  locked_until DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_verification_token (email_verification_token),
  INDEX idx_reset_token (password_reset_token)
) ENGINE=InnoDB;

-- User profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id CHAR(36) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role ENUM('admin', 'affiliate') NOT NULL DEFAULT 'affiliate',
  status ENUM('active', 'pending', 'suspended', 'banned') NOT NULL DEFAULT 'pending',
  company VARCHAR(255),
  website VARCHAR(255),
  phone VARCHAR(50),
  country VARCHAR(100),
  address TEXT,
  city VARCHAR(100),
  zip_code VARCHAR(20),
  timezone VARCHAR(100) DEFAULT 'UTC',
  payment_method ENUM('paypal', 'bank', 'crypto', 'check'),
  payment_details JSON,
  traffic_sources JSON,
  experience_level VARCHAR(50),
  bio TEXT,
  avatar_url VARCHAR(500),
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login TIMESTAMP,
  FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_role (role),
  INDEX idx_status (status),
  INDEX idx_email (email)
) ENGINE=InnoDB;

-- Offers table
CREATE TABLE IF NOT EXISTS offers (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  advertiser VARCHAR(255) NOT NULL,
  advertiser_id VARCHAR(100),
  payout DECIMAL(10,2) NOT NULL,
  payout_type ENUM('CPA', 'CPI', 'CPL', 'RevShare') NOT NULL DEFAULT 'CPA',
  rev_share_percentage DECIMAL(5,2),
  category VARCHAR(100) NOT NULL,
  status ENUM('active', 'paused', 'expired') NOT NULL DEFAULT 'active',
  countries JSON,
  devices JSON,
  traffic_sources JSON,
  offer_url TEXT NOT NULL,
  preview_url TEXT,
  tracking_url TEXT,
  postback_url TEXT,
  global_postback_enabled BOOLEAN DEFAULT TRUE,
  caps JSON,
  restrictions TEXT,
  conversion_flow TEXT,
  expires_at DATETIME,
  require_approval BOOLEAN DEFAULT FALSE,
  scrub_rate DECIMAL(5,2) DEFAULT 0,
  throttle_rate DECIMAL(5,2) DEFAULT 0,
  auto_approve BOOLEAN DEFAULT TRUE,
  hold_period INT DEFAULT 0,
  created_by CHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES profiles(id),
  INDEX idx_status (status),
  INDEX idx_category (category),
  INDEX idx_advertiser (advertiser),
  INDEX idx_created_by (created_by)
) ENGINE=InnoDB;

-- Affiliates table
CREATE TABLE IF NOT EXISTS affiliates (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  user_id CHAR(36),
  affiliate_id VARCHAR(50) UNIQUE NOT NULL,
  manager_id CHAR(36),
  notes TEXT,
  tags JSON,
  total_earnings DECIMAL(12,2) DEFAULT 0,
  total_clicks INT DEFAULT 0,
  total_conversions INT DEFAULT 0,
  conversion_rate DECIMAL(5,2) DEFAULT 0,
  epc DECIMAL(8,2) DEFAULT 0,
  last_activity TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE,
  FOREIGN KEY (manager_id) REFERENCES profiles(id),
  INDEX idx_affiliate_id (affiliate_id),
  INDEX idx_user_id (user_id),
  INDEX idx_manager_id (manager_id)
) ENGINE=InnoDB;

-- Clicks table
CREATE TABLE IF NOT EXISTS clicks (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  click_id VARCHAR(255) UNIQUE NOT NULL,
  offer_id CHAR(36),
  affiliate_id CHAR(36),
  ip_address VARCHAR(45),
  user_agent TEXT,
  country VARCHAR(10),
  device VARCHAR(50),
  browser VARCHAR(50),
  os VARCHAR(50),
  referrer TEXT,
  landing_page TEXT,
  sub_id VARCHAR(255),
  sub_id_2 VARCHAR(255),
  sub_id_3 VARCHAR(255),
  sub_id_4 VARCHAR(255),
  sub_id_5 VARCHAR(255),
  fraud_score INT,
  is_fraud BOOLEAN DEFAULT FALSE,
  is_converted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (offer_id) REFERENCES offers(id),
  FOREIGN KEY (affiliate_id) REFERENCES profiles(id),
  INDEX idx_click_id (click_id),
  INDEX idx_offer_id (offer_id),
  INDEX idx_affiliate_id (affiliate_id),
  INDEX idx_created_at (created_at),
  INDEX idx_is_fraud (is_fraud),
  INDEX idx_is_converted (is_converted)
) ENGINE=InnoDB;

-- Conversions table
CREATE TABLE IF NOT EXISTS conversions (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  conversion_id VARCHAR(255) UNIQUE NOT NULL,
  click_id CHAR(36),
  offer_id CHAR(36),
  affiliate_id CHAR(36),
  payout DECIMAL(10,2) NOT NULL,
  revenue DECIMAL(10,2),
  status ENUM('pending', 'approved', 'rejected', 'held') DEFAULT 'pending',
  conversion_value DECIMAL(10,2),
  currency VARCHAR(10) DEFAULT 'USD',
  transaction_id VARCHAR(255),
  customer_id VARCHAR(255),
  ip_address VARCHAR(45),
  user_agent TEXT,
  postback_sent BOOLEAN DEFAULT FALSE,
  postback_response TEXT,
  approved_at TIMESTAMP,
  approved_by CHAR(36),
  rejection_reason TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (click_id) REFERENCES clicks(id),
  FOREIGN KEY (offer_id) REFERENCES offers(id),
  FOREIGN KEY (affiliate_id) REFERENCES profiles(id),
  FOREIGN KEY (approved_by) REFERENCES profiles(id),
  INDEX idx_conversion_id (conversion_id),
  INDEX idx_click_id (click_id),
  INDEX idx_offer_id (offer_id),
  INDEX idx_affiliate_id (affiliate_id),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB;

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  affiliate_id CHAR(36),
  amount DECIMAL(12,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'USD',
  payment_method ENUM('paypal', 'bank', 'crypto', 'check') NOT NULL,
  payment_details JSON,
  status VARCHAR(20) DEFAULT 'pending',
  reference_id VARCHAR(255),
  transaction_id VARCHAR(255),
  period_start DATE,
  period_end DATE,
  notes TEXT,
  processed_at TIMESTAMP,
  processed_by CHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (affiliate_id) REFERENCES profiles(id),
  FOREIGN KEY (processed_by) REFERENCES profiles(id),
  INDEX idx_affiliate_id (affiliate_id),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB;

-- Settings table
CREATE TABLE IF NOT EXISTS settings (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  setting_key VARCHAR(255) UNIQUE NOT NULL,
  setting_value JSON NOT NULL,
  description TEXT,
  category VARCHAR(100),
  created_by CHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES profiles(id),
  INDEX idx_key (setting_key),
  INDEX idx_category (category)
) ENGINE=InnoDB;

-- Sessions table for user sessions
CREATE TABLE IF NOT EXISTS user_sessions (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  user_id CHAR(36) NOT NULL,
  session_token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_session_token (session_token),
  INDEX idx_user_id (user_id),
  INDEX idx_expires_at (expires_at)
) ENGINE=InnoDB;

-- Insert demo users
INSERT INTO users (id, email, password_hash, email_verified, created_at, updated_at) VALUES
('00000000-0000-0000-0000-000000000001', 'admin@affwish.com', '$2b$12$LQv3c1yqBwEHFl5aBLloe.Az4oeLjKHm9gOL9YrGrcLmy8ww6tXdO', TRUE, NOW(), NOW()),
('00000000-0000-0000-0000-000000000002', 'affiliate@affwish.com', '$2b$12$LQv3c1yqBwEHFl5aBLloe.Az4oeLjKHm9gOL9YrGrcLmy8ww6tXdO', TRUE, NOW(), NOW())
ON DUPLICATE KEY UPDATE email = VALUES(email);

-- Insert demo profiles
INSERT INTO profiles (
  id, email, full_name, role, status, company, website, phone, country, 
  address, city, zip_code, timezone, payment_method, payment_details, 
  traffic_sources, experience_level, bio, email_verified, created_at, updated_at
) VALUES 
(
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
  '{"bank_name": "Chase Bank", "account_number": "****1234"}',
  '["Email Marketing", "PPC", "Social Media"]',
  'expert',
  'Network administrator with 10+ years experience in affiliate marketing.',
  TRUE,
  NOW(),
  NOW()
),
(
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
  '["Social Media", "Email Marketing", "SEO", "YouTube"]',
  'advanced',
  'Experienced affiliate marketer specializing in performance marketing.',
  TRUE,
  NOW(),
  NOW()
)
ON DUPLICATE KEY UPDATE 
  full_name = VALUES(full_name),
  role = VALUES(role),
  status = VALUES(status);

-- Insert sample offers
INSERT INTO offers (
  id, name, description, advertiser, advertiser_id, payout, payout_type, 
  category, status, countries, devices, traffic_sources, offer_url, 
  preview_url, tracking_url, global_postback_enabled, created_by, created_at, updated_at
) VALUES 
(
  '00000000-0000-0000-0000-000000000010',
  'Premium Dating App - iOS/Android',
  'High-converting dating app with premium features.',
  'Dating Corp International',
  'DC_001',
  25.00,
  'CPA',
  'Dating',
  'active',
  '["US", "CA", "UK", "AU", "DE"]',
  '["Mobile", "Desktop"]',
  '["Social Media", "Email Marketing", "Native Ads"]',
  'https://dating-app.example.com/signup',
  'https://dating-app.example.com/preview',
  'https://track.affwish.com/click?offer_id={offer_id}&affiliate_id={affiliate_id}&click_id={click_id}',
  TRUE,
  '00000000-0000-0000-0000-000000000001',
  NOW(),
  NOW()
),
(
  '00000000-0000-0000-0000-000000000011',
  'Crypto Trading Platform',
  'Leading cryptocurrency trading platform with advanced features.',
  'CryptoTrade Exchange',
  'CTE_002',
  40.00,
  'CPA',
  'Finance',
  'active',
  '["US", "CA", "UK", "AU", "DE"]',
  '["Desktop", "Mobile"]',
  '["PPC", "Social Media", "Email Marketing"]',
  'https://crypto-exchange.example.com/register',
  'https://crypto-exchange.example.com/preview',
  'https://track.affwish.com/click?offer_id={offer_id}&affiliate_id={affiliate_id}&click_id={click_id}',
  TRUE,
  '00000000-0000-0000-0000-000000000001',
  NOW(),
  NOW()
)
ON DUPLICATE KEY UPDATE 
  name = VALUES(name),
  status = VALUES(status);

-- Insert default settings
INSERT INTO settings (setting_key, setting_value, description, category, created_by) VALUES
('network_name', '"AFFWISH - Premium CPA Network"', 'Network display name', 'general', '00000000-0000-0000-0000-000000000001'),
('network_description', '"The leading CPA affiliate network"', 'Network description', 'general', '00000000-0000-0000-0000-000000000001'),
('default_currency', '"USD"', 'Default currency', 'general', '00000000-0000-0000-0000-000000000001'),
('tracking_domain', '"track.affwish.com"', 'Primary tracking domain', 'tracking', '00000000-0000-0000-0000-000000000001')
ON DUPLICATE KEY UPDATE 
  setting_value = VALUES(setting_value),
  updated_at = NOW();