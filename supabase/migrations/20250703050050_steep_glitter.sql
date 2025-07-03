-- AFFWISH CPA Network - Sample Data for MySQL
-- Insert demo data for testing

-- Insert demo users
INSERT INTO users (id, email, password_hash, email_verified, created_at, updated_at) VALUES
('00000000-0000-0000-0000-000000000001', 'admin@affwish.com', '$2b$12$LQv3c1yqBwEHFl5aBLloe.Az4oeLjKHm9gOL9YrGrcLmy8ww6tXdO', TRUE, NOW(), NOW()),
('00000000-0000-0000-0000-000000000002', 'affiliate@affwish.com', '$2b$12$LQv3c1yqBwEHFl5aBLloe.Az4oeLjKHm9gOL9YrGrcLmy8ww6tXdO', TRUE, NOW(), NOW());
-- Password for both: Admin123!@# and Affiliate123!@# (hashed with bcrypt)

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
  '{"bank_name": "Chase Bank", "account_number": "****1234", "routing_number": "****5678"}',
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
  'Experienced affiliate marketer specializing in performance marketing and lead generation.',
  TRUE,
  NOW(),
  NOW()
);

-- Insert affiliate record
INSERT INTO affiliates (
  id, user_id, affiliate_id, manager_id, notes, tags, total_earnings, 
  total_clicks, total_conversions, conversion_rate, epc, last_activity, 
  created_at, updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000002',
  'AFF000001',
  '00000000-0000-0000-0000-000000000001',
  'Top performing affiliate - VIP status',
  '["VIP", "High Volume", "Trusted"]',
  15420.50,
  45230,
  1240,
  2.74,
  0.34,
  NOW(),
  NOW(),
  NOW()
);

-- Insert sample offers
INSERT INTO offers (
  id, name, description, advertiser, advertiser_id, payout, payout_type, 
  category, status, countries, devices, traffic_sources, offer_url, 
  preview_url, tracking_url, postback_url, global_postback_enabled, 
  caps, restrictions, conversion_flow, require_approval, scrub_rate, 
  throttle_rate, auto_approve, hold_period, created_by, created_at, updated_at
) VALUES 
(
  '00000000-0000-0000-0000-000000000010',
  'Premium Dating App - iOS/Android',
  'High-converting dating app with premium features. Target audience: 18-45 years old, looking for serious relationships.',
  'Dating Corp International',
  'DC_001',
  25.00,
  'CPA',
  'Dating',
  'active',
  '["US", "CA", "UK", "AU", "DE"]',
  '["Mobile", "Desktop"]',
  '["Social Media", "Email Marketing", "Native Ads", "Push Notifications"]',
  'https://dating-app.example.com/signup',
  'https://dating-app.example.com/preview',
  'https://track.affwish.com/click?offer_id={offer_id}&affiliate_id={affiliate_id}&click_id={click_id}&sub1={sub1}&sub2={sub2}',
  'https://dating-app.example.com/postback?click_id={click_id}&status={status}&payout={payout}',
  TRUE,
  '{"daily": 100, "weekly": 500, "monthly": 2000}',
  'No adult content, no incentivized traffic, 18+ only',
  'Registration + Email Verification + Profile Completion',
  FALSE,
  5.0,
  0.0,
  TRUE,
  7,
  '00000000-0000-0000-0000-000000000001',
  NOW(),
  NOW()
),
(
  '00000000-0000-0000-0000-000000000011',
  'Crypto Trading Platform',
  'Leading cryptocurrency trading platform with advanced features. High payouts for qualified leads.',
  'CryptoTrade Exchange',
  'CTE_002',
  40.00,
  'CPA',
  'Finance',
  'active',
  '["US", "CA", "UK", "AU", "DE", "NL", "FR"]',
  '["Desktop", "Mobile"]',
  '["PPC", "Social Media", "Email Marketing", "Content Marketing"]',
  'https://crypto-exchange.example.com/register',
  'https://crypto-exchange.example.com/preview',
  'https://track.affwish.com/click?offer_id={offer_id}&affiliate_id={affiliate_id}&click_id={click_id}&source={source}',
  'https://crypto-exchange.example.com/conversion?click_id={click_id}&amount={payout}&status={status}',
  TRUE,
  '{"daily": 50, "weekly": 300, "monthly": 1200}',
  'No crypto-related content restrictions, 18+ only, KYC required',
  'Registration + Email Verification + KYC + First Deposit',
  TRUE,
  8.0,
  5.0,
  FALSE,
  14,
  '00000000-0000-0000-0000-000000000001',
  NOW(),
  NOW()
),
(
  '00000000-0000-0000-0000-000000000012',
  'VPN Service - Premium Subscription',
  'Top-rated VPN service with global servers. High conversion rates on free trial offers.',
  'SecureVPN Solutions',
  'SVS_003',
  15.00,
  'CPA',
  'Software',
  'active',
  '["Global"]',
  '["Desktop", "Mobile", "Tablet"]',
  '["SEO", "Content Marketing", "Social Media", "YouTube", "Review Sites"]',
  'https://secure-vpn.example.com/trial',
  'https://secure-vpn.example.com/preview',
  'https://track.affwish.com/click?offer_id={offer_id}&affiliate_id={affiliate_id}&click_id={click_id}&campaign={campaign}',
  'https://secure-vpn.example.com/postback?transaction_id={click_id}&commission={payout}&status={status}',
  TRUE,
  '{"daily": 200, "weekly": 1000, "monthly": 4000}',
  'No trademark bidding, no adult content',
  'Free Trial Signup + Email Verification',
  FALSE,
  3.0,
  0.0,
  TRUE,
  3,
  '00000000-0000-0000-0000-000000000001',
  NOW(),
  NOW()
);

-- Insert default settings
INSERT INTO settings (setting_key, setting_value, description, category, created_by) VALUES
('network_name', '"AFFWISH - Premium CPA Network"', 'Network display name', 'general', '00000000-0000-0000-0000-000000000001'),
('network_description', '"The leading CPA affiliate network with premium offers and real-time tracking"', 'Network description', 'general', '00000000-0000-0000-0000-000000000001'),
('default_currency', '"USD"', 'Default currency', 'general', '00000000-0000-0000-0000-000000000001'),
('default_timezone', '"UTC"', 'Default timezone', 'general', '00000000-0000-0000-0000-000000000001'),
('global_postback_url', '"https://postback.affwish.com/global?click_id={click_id}&conversion_id={conversion_id}&offer_id={offer_id}&affiliate_id={affiliate_id}&payout={payout}&status={status}&timestamp={timestamp}&ip={ip_address}&country={country}"', 'Global postback URL with macros', 'postback', '00000000-0000-0000-0000-000000000001'),
('fraud_protection_enabled', 'false', 'Enable fraud protection', 'fraud', '00000000-0000-0000-0000-000000000001'),
('ipqualityscore_api_key', '""', 'IPQualityScore API key', 'fraud', '00000000-0000-0000-0000-000000000001'),
('ipqualityscore_threshold', '75', 'Risk threshold percentage', 'fraud', '00000000-0000-0000-0000-000000000001'),
('auto_block_high_risk', 'true', 'Auto-block high risk traffic', 'fraud', '00000000-0000-0000-0000-000000000001'),
('min_payout_amount', '50', 'Minimum payout amount in USD', 'payments', '00000000-0000-0000-0000-000000000001'),
('payment_frequency', '"weekly"', 'Default payment frequency', 'payments', '00000000-0000-0000-0000-000000000001'),
('tracking_domain', '"track.affwish.com"', 'Primary tracking domain', 'tracking', '00000000-0000-0000-0000-000000000001'),
('postback_domain', '"postback.affwish.com"', 'Primary postback domain', 'tracking', '00000000-0000-0000-0000-000000000001');

-- Insert sample clicks and conversions for testing
INSERT INTO clicks (
  id, click_id, offer_id, affiliate_id, ip_address, user_agent, country, 
  device, browser, os, referrer, landing_page, sub_id, sub_id_2, sub_id_3, 
  fraud_score, is_fraud, is_converted, created_at
) VALUES 
(
  '00000000-0000-0000-0000-000000000030',
  'click_1704067200_abc123',
  '00000000-0000-0000-0000-000000000010',
  '00000000-0000-0000-0000-000000000002',
  '192.168.1.100',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15',
  'US',
  'Mobile',
  'Safari',
  'iOS',
  'https://facebook.com',
  'https://dating-app.example.com/landing',
  'fb_campaign_001',
  'ios_users',
  'dating_interest',
  25,
  FALSE,
  TRUE,
  DATE_SUB(NOW(), INTERVAL 2 DAY)
),
(
  '00000000-0000-0000-0000-000000000031',
  'click_1704067300_def456',
  '00000000-0000-0000-0000-000000000011',
  '00000000-0000-0000-0000-000000000002',
  '192.168.1.101',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  'US',
  'Desktop',
  'Chrome',
  'Windows',
  'https://google.com',
  'https://crypto-exchange.example.com/landing',
  'google_ads_crypto',
  'desktop_users',
  'finance_interest',
  15,
  FALSE,
  TRUE,
  DATE_SUB(NOW(), INTERVAL 1 DAY)
);

-- Insert sample conversions
INSERT INTO conversions (
  id, conversion_id, click_id, offer_id, affiliate_id, payout, revenue, 
  status, conversion_value, currency, transaction_id, customer_id, 
  ip_address, user_agent, postback_sent, postback_response, approved_at, 
  approved_by, created_at, updated_at
) VALUES 
(
  '00000000-0000-0000-0000-000000000040',
  'conv_1704067500_xyz789',
  '00000000-0000-0000-0000-000000000030',
  '00000000-0000-0000-0000-000000000010',
  '00000000-0000-0000-0000-000000000002',
  25.00,
  30.00,
  'approved',
  25.00,
  'USD',
  'dating_txn_123456',
  'user_dating_001',
  '192.168.1.100',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15',
  TRUE,
  'HTTP/1.1 200 OK',
  DATE_SUB(NOW(), INTERVAL 1 DAY),
  '00000000-0000-0000-0000-000000000001',
  DATE_SUB(NOW(), INTERVAL 2 DAY),
  DATE_SUB(NOW(), INTERVAL 1 DAY)
),
(
  '00000000-0000-0000-0000-000000000041',
  'conv_1704067600_uvw012',
  '00000000-0000-0000-0000-000000000031',
  '00000000-0000-0000-0000-000000000011',
  '00000000-0000-0000-0000-000000000002',
  40.00,
  50.00,
  'approved',
  40.00,
  'USD',
  'crypto_txn_789012',
  'user_crypto_002',
  '192.168.1.101',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  TRUE,
  'HTTP/1.1 200 OK',
  NOW(),
  '00000000-0000-0000-0000-000000000001',
  DATE_SUB(NOW(), INTERVAL 1 DAY),
  NOW()
);

-- Insert sample payment records
INSERT INTO payments (
  id, affiliate_id, amount, currency, payment_method, payment_details, 
  status, reference_id, transaction_id, period_start, period_end, notes, 
  processed_at, processed_by, created_at, updated_at
) VALUES 
(
  '00000000-0000-0000-0000-000000000050',
  '00000000-0000-0000-0000-000000000002',
  2450.00,
  'USD',
  'paypal',
  '{"paypal_email": "affiliate@affwish.com", "paypal_transaction_id": "PP123456789"}',
  'completed',
  'PAY_001_2024_01',
  'pp_txn_123456789',
  '2024-01-01',
  '2024-01-15',
  'Bi-weekly payment for period Jan 1-15, 2024',
  DATE_SUB(NOW(), INTERVAL 5 DAY),
  '00000000-0000-0000-0000-000000000001',
  DATE_SUB(NOW(), INTERVAL 7 DAY),
  DATE_SUB(NOW(), INTERVAL 5 DAY)
);