-- AFFWISH CPA Network - MySQL Functions and Procedures

DELIMITER //

-- Function to generate affiliate ID
CREATE FUNCTION IF NOT EXISTS generate_affiliate_id()
RETURNS VARCHAR(50)
READS SQL DATA
DETERMINISTIC
BEGIN
  DECLARE new_id VARCHAR(50);
  DECLARE counter INT DEFAULT 1;
  DECLARE done INT DEFAULT 0;
  
  REPEAT
    SET new_id = CONCAT('AFF', LPAD(counter, 6, '0'));
    
    IF NOT EXISTS (SELECT 1 FROM affiliates WHERE affiliate_id = new_id) THEN
      SET done = 1;
    ELSE
      SET counter = counter + 1;
    END IF;
  UNTIL done END REPEAT;
  
  RETURN new_id;
END//

-- Function to generate tracking URL
CREATE FUNCTION IF NOT EXISTS generate_tracking_url(
  p_offer_id CHAR(36),
  p_affiliate_id CHAR(36),
  p_sub_id VARCHAR(255)
)
RETURNS TEXT
READS SQL DATA
DETERMINISTIC
BEGIN
  DECLARE base_url TEXT DEFAULT 'https://track.affwish.com/click';
  DECLARE tracking_url TEXT;
  
  SET tracking_url = CONCAT(
    base_url, 
    '?offer_id=', p_offer_id,
    '&affiliate_id=', p_affiliate_id,
    '&click_id={click_id}'
  );
  
  IF p_sub_id IS NOT NULL AND p_sub_id != '' THEN
    SET tracking_url = CONCAT(tracking_url, '&sub_id=', p_sub_id);
  END IF;
  
  RETURN tracking_url;
END//

-- Procedure to update affiliate stats
CREATE PROCEDURE IF NOT EXISTS update_affiliate_stats(
  IN p_affiliate_id CHAR(36)
)
BEGIN
  DECLARE total_clicks_count INT DEFAULT 0;
  DECLARE total_conversions_count INT DEFAULT 0;
  DECLARE total_earnings_amount DECIMAL(12,2) DEFAULT 0;
  DECLARE conversion_rate_calc DECIMAL(5,2) DEFAULT 0;
  DECLARE epc_calc DECIMAL(8,2) DEFAULT 0;
  
  -- Get total clicks
  SELECT COUNT(*) INTO total_clicks_count
  FROM clicks 
  WHERE affiliate_id = p_affiliate_id;
  
  -- Get total conversions and earnings
  SELECT 
    COUNT(*),
    COALESCE(SUM(payout), 0)
  INTO total_conversions_count, total_earnings_amount
  FROM conversions 
  WHERE affiliate_id = p_affiliate_id AND status = 'approved';
  
  -- Calculate conversion rate
  IF total_clicks_count > 0 THEN
    SET conversion_rate_calc = (total_conversions_count * 100.0) / total_clicks_count;
    SET epc_calc = total_earnings_amount / total_clicks_count;
  END IF;
  
  -- Update affiliate record
  UPDATE affiliates 
  SET 
    total_clicks = total_clicks_count,
    total_conversions = total_conversions_count,
    total_earnings = total_earnings_amount,
    conversion_rate = conversion_rate_calc,
    epc = epc_calc,
    updated_at = NOW()
  WHERE user_id = p_affiliate_id;
END//

-- Procedure to process pending conversions
CREATE PROCEDURE IF NOT EXISTS process_pending_conversions()
BEGIN
  DECLARE done INT DEFAULT 0;
  DECLARE conv_id CHAR(36);
  DECLARE conv_affiliate_id CHAR(36);
  
  DECLARE conversion_cursor CURSOR FOR
    SELECT id, affiliate_id
    FROM conversions 
    WHERE status = 'pending' 
    AND created_at <= DATE_SUB(NOW(), INTERVAL 24 HOUR);
  
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
  
  OPEN conversion_cursor;
  
  conversion_loop: LOOP
    FETCH conversion_cursor INTO conv_id, conv_affiliate_id;
    
    IF done THEN
      LEAVE conversion_loop;
    END IF;
    
    -- Auto-approve conversions older than 24 hours
    UPDATE conversions 
    SET 
      status = 'approved',
      approved_at = NOW(),
      updated_at = NOW()
    WHERE id = conv_id;
    
    -- Update affiliate stats
    CALL update_affiliate_stats(conv_affiliate_id);
    
  END LOOP;
  
  CLOSE conversion_cursor;
END//

-- Procedure to clean old sessions
CREATE PROCEDURE IF NOT EXISTS clean_expired_sessions()
BEGIN
  DELETE FROM user_sessions 
  WHERE expires_at < NOW();
END//

-- Procedure to generate daily reports
CREATE PROCEDURE IF NOT EXISTS generate_daily_report(
  IN report_date DATE
)
BEGIN
  SELECT 
    'Daily Report' as report_type,
    report_date as date,
    COUNT(DISTINCT c.affiliate_id) as active_affiliates,
    COUNT(c.id) as total_clicks,
    COUNT(conv.id) as total_conversions,
    ROUND(COUNT(conv.id) * 100.0 / COUNT(c.id), 2) as conversion_rate,
    SUM(conv.payout) as total_revenue,
    ROUND(SUM(conv.payout) / COUNT(c.id), 2) as epc
  FROM clicks c
  LEFT JOIN conversions conv ON c.id = conv.click_id
  WHERE DATE(c.created_at) = report_date;
END//

-- Function to calculate fraud score
CREATE FUNCTION IF NOT EXISTS calculate_fraud_score(
  p_ip_address VARCHAR(45),
  p_user_agent TEXT,
  p_affiliate_id CHAR(36)
)
RETURNS INT
READS SQL DATA
DETERMINISTIC
BEGIN
  DECLARE fraud_score INT DEFAULT 0;
  DECLARE click_count INT DEFAULT 0;
  DECLARE recent_clicks INT DEFAULT 0;
  
  -- Check for multiple clicks from same IP in last hour
  SELECT COUNT(*) INTO recent_clicks
  FROM clicks 
  WHERE ip_address = p_ip_address 
  AND created_at >= DATE_SUB(NOW(), INTERVAL 1 HOUR);
  
  -- Increase fraud score based on click frequency
  IF recent_clicks > 10 THEN
    SET fraud_score = fraud_score + 50;
  ELSEIF recent_clicks > 5 THEN
    SET fraud_score = fraud_score + 25;
  END IF;
  
  -- Check for suspicious user agent patterns
  IF p_user_agent LIKE '%bot%' OR p_user_agent LIKE '%crawler%' THEN
    SET fraud_score = fraud_score + 75;
  END IF;
  
  -- Check for empty or suspicious user agent
  IF p_user_agent IS NULL OR LENGTH(p_user_agent) < 10 THEN
    SET fraud_score = fraud_score + 30;
  END IF;
  
  -- Ensure score doesn't exceed 100
  IF fraud_score > 100 THEN
    SET fraud_score = 100;
  END IF;
  
  RETURN fraud_score;
END//

DELIMITER ;

-- Create events for automated tasks (if EVENT_SCHEDULER is enabled)
-- SET GLOBAL event_scheduler = ON;

-- Event to process pending conversions every hour
CREATE EVENT IF NOT EXISTS process_conversions_hourly
ON SCHEDULE EVERY 1 HOUR
DO
  CALL process_pending_conversions();

-- Event to clean expired sessions daily
CREATE EVENT IF NOT EXISTS clean_sessions_daily
ON SCHEDULE EVERY 1 DAY
STARTS TIMESTAMP(CURRENT_DATE + INTERVAL 1 DAY, '02:00:00')
DO
  CALL clean_expired_sessions();

-- Event to update affiliate stats daily
CREATE EVENT IF NOT EXISTS update_stats_daily
ON SCHEDULE EVERY 1 DAY
STARTS TIMESTAMP(CURRENT_DATE + INTERVAL 1 DAY, '03:00:00')
DO
BEGIN
  DECLARE done INT DEFAULT 0;
  DECLARE affiliate_user_id CHAR(36);
  
  DECLARE affiliate_cursor CURSOR FOR
    SELECT DISTINCT user_id FROM affiliates WHERE user_id IS NOT NULL;
  
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
  
  OPEN affiliate_cursor;
  
  affiliate_loop: LOOP
    FETCH affiliate_cursor INTO affiliate_user_id;
    
    IF done THEN
      LEAVE affiliate_loop;
    END IF;
    
    CALL update_affiliate_stats(affiliate_user_id);
    
  END LOOP;
  
  CLOSE affiliate_cursor;
END;