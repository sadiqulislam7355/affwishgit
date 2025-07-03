-- AFFWISH CPA Network - MySQL Indexes for Performance

-- Users table indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_email_verified ON users(email_verified);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);
CREATE INDEX IF NOT EXISTS idx_users_last_login ON users(last_login);

-- Profiles table indexes
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_status ON profiles(status);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_country ON profiles(country);
CREATE INDEX IF NOT EXISTS idx_profiles_created_at ON profiles(created_at);

-- Offers table indexes
CREATE INDEX IF NOT EXISTS idx_offers_status ON offers(status);
CREATE INDEX IF NOT EXISTS idx_offers_category ON offers(category);
CREATE INDEX IF NOT EXISTS idx_offers_advertiser ON offers(advertiser);
CREATE INDEX IF NOT EXISTS idx_offers_payout_type ON offers(payout_type);
CREATE INDEX IF NOT EXISTS idx_offers_created_by ON offers(created_by);
CREATE INDEX IF NOT EXISTS idx_offers_created_at ON offers(created_at);
CREATE INDEX IF NOT EXISTS idx_offers_expires_at ON offers(expires_at);

-- Affiliates table indexes
CREATE INDEX IF NOT EXISTS idx_affiliates_affiliate_id ON affiliates(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_affiliates_user_id ON affiliates(user_id);
CREATE INDEX IF NOT EXISTS idx_affiliates_manager_id ON affiliates(manager_id);
CREATE INDEX IF NOT EXISTS idx_affiliates_total_earnings ON affiliates(total_earnings);
CREATE INDEX IF NOT EXISTS idx_affiliates_conversion_rate ON affiliates(conversion_rate);
CREATE INDEX IF NOT EXISTS idx_affiliates_last_activity ON affiliates(last_activity);

-- Clicks table indexes
CREATE INDEX IF NOT EXISTS idx_clicks_click_id ON clicks(click_id);
CREATE INDEX IF NOT EXISTS idx_clicks_offer_id ON clicks(offer_id);
CREATE INDEX IF NOT EXISTS idx_clicks_affiliate_id ON clicks(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_clicks_ip_address ON clicks(ip_address);
CREATE INDEX IF NOT EXISTS idx_clicks_country ON clicks(country);
CREATE INDEX IF NOT EXISTS idx_clicks_device ON clicks(device);
CREATE INDEX IF NOT EXISTS idx_clicks_is_fraud ON clicks(is_fraud);
CREATE INDEX IF NOT EXISTS idx_clicks_is_converted ON clicks(is_converted);
CREATE INDEX IF NOT EXISTS idx_clicks_created_at ON clicks(created_at);
CREATE INDEX IF NOT EXISTS idx_clicks_sub_id ON clicks(sub_id);

-- Composite indexes for clicks table (for common queries)
CREATE INDEX IF NOT EXISTS idx_clicks_affiliate_date ON clicks(affiliate_id, created_at);
CREATE INDEX IF NOT EXISTS idx_clicks_offer_date ON clicks(offer_id, created_at);
CREATE INDEX IF NOT EXISTS idx_clicks_fraud_date ON clicks(is_fraud, created_at);

-- Conversions table indexes
CREATE INDEX IF NOT EXISTS idx_conversions_conversion_id ON conversions(conversion_id);
CREATE INDEX IF NOT EXISTS idx_conversions_click_id ON conversions(click_id);
CREATE INDEX IF NOT EXISTS idx_conversions_offer_id ON conversions(offer_id);
CREATE INDEX IF NOT EXISTS idx_conversions_affiliate_id ON conversions(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_conversions_status ON conversions(status);
CREATE INDEX IF NOT EXISTS idx_conversions_payout ON conversions(payout);
CREATE INDEX IF NOT EXISTS idx_conversions_created_at ON conversions(created_at);
CREATE INDEX IF NOT EXISTS idx_conversions_approved_at ON conversions(approved_at);
CREATE INDEX IF NOT EXISTS idx_conversions_approved_by ON conversions(approved_by);

-- Composite indexes for conversions table
CREATE INDEX IF NOT EXISTS idx_conversions_affiliate_status ON conversions(affiliate_id, status);
CREATE INDEX IF NOT EXISTS idx_conversions_offer_status ON conversions(offer_id, status);
CREATE INDEX IF NOT EXISTS idx_conversions_status_date ON conversions(status, created_at);

-- Payments table indexes
CREATE INDEX IF NOT EXISTS idx_payments_affiliate_id ON payments(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_payment_method ON payments(payment_method);
CREATE INDEX IF NOT EXISTS idx_payments_reference_id ON payments(reference_id);
CREATE INDEX IF NOT EXISTS idx_payments_transaction_id ON payments(transaction_id);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments(created_at);
CREATE INDEX IF NOT EXISTS idx_payments_processed_at ON payments(processed_at);
CREATE INDEX IF NOT EXISTS idx_payments_period_start ON payments(period_start);
CREATE INDEX IF NOT EXISTS idx_payments_period_end ON payments(period_end);

-- Postbacks table indexes
CREATE INDEX IF NOT EXISTS idx_postbacks_offer_id ON postbacks(offer_id);
CREATE INDEX IF NOT EXISTS idx_postbacks_status ON postbacks(status);
CREATE INDEX IF NOT EXISTS idx_postbacks_created_by ON postbacks(created_by);
CREATE INDEX IF NOT EXISTS idx_postbacks_last_fired ON postbacks(last_fired);

-- Fraud logs table indexes
CREATE INDEX IF NOT EXISTS idx_fraud_logs_click_id ON fraud_logs(click_id);
CREATE INDEX IF NOT EXISTS idx_fraud_logs_ip_address ON fraud_logs(ip_address);
CREATE INDEX IF NOT EXISTS idx_fraud_logs_blocked ON fraud_logs(blocked);
CREATE INDEX IF NOT EXISTS idx_fraud_logs_fraud_score ON fraud_logs(fraud_score);
CREATE INDEX IF NOT EXISTS idx_fraud_logs_risk_level ON fraud_logs(risk_level);
CREATE INDEX IF NOT EXISTS idx_fraud_logs_created_at ON fraud_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_fraud_logs_provider ON fraud_logs(provider);

-- Settings table indexes
CREATE INDEX IF NOT EXISTS idx_settings_key ON settings(setting_key);
CREATE INDEX IF NOT EXISTS idx_settings_category ON settings(category);
CREATE INDEX IF NOT EXISTS idx_settings_created_by ON settings(created_by);

-- User sessions table indexes
CREATE INDEX IF NOT EXISTS idx_sessions_session_token ON user_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON user_sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_sessions_ip_address ON user_sessions(ip_address);

-- Full-text indexes for search functionality
-- Note: These require MyISAM engine or MySQL 5.6+ with InnoDB
ALTER TABLE offers ADD FULLTEXT(name, description);
ALTER TABLE profiles ADD FULLTEXT(full_name, company, bio);

-- Analyze tables to update statistics
ANALYZE TABLE users, profiles, offers, affiliates, clicks, conversions, payments, postbacks, fraud_logs, settings, user_sessions;