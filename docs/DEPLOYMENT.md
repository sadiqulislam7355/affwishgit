# AFFWISH CPA Network - Deployment Guide

## Overview
This guide covers deploying AFFWISH CPA Network to cPanel hosting with MySQL database.

## Prerequisites
- cPanel hosting account with MySQL support
- Node.js support (or static file hosting)
- SSL certificate (recommended)
- Email account for SMTP

## Database Setup

### 1. Create MySQL Database
1. Login to cPanel
2. Go to "MySQL Databases"
3. Create database: `affwish` (will become `cpanel_username_affwish`)
4. Create database user with strong password
5. Assign user to database with ALL PRIVILEGES

### 2. Import Database Schema
1. Open phpMyAdmin from cPanel
2. Select your database
3. Go to "Import" tab
4. Upload and execute `database/mysql/schema.sql`
5. Upload and execute `database/mysql/sample_data.sql` (for demo data)
6. Upload and execute `database/mysql/functions.sql` (for stored procedures)
7. Upload and execute `database/mysql/indexes.sql` (for performance)

## Application Deployment

### 1. Build Application
```bash
npm install
npm run build
```

### 2. Upload Files
1. Upload contents of `dist/` folder to `public_html/`
2. Upload `.htaccess` file to `public_html/`
3. Create `.env` file in root directory

### 3. Environment Configuration
Create `.env` file with your settings:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=cpanel_username_dbuser
DB_PASSWORD=your_database_password
DB_NAME=cpanel_username_affwish
DB_SSL=false

# Application Settings
APP_URL=https://yourdomain.com
APP_NAME="AFFWISH CPA Network"
NODE_ENV=production

# Security Keys (Generate new ones!)
JWT_SECRET=your_very_long_random_jwt_secret_key_here
ENCRYPTION_KEY=your_32_character_encryption_key

# Email Configuration
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
SMTP_USER=noreply@yourdomain.com
SMTP_PASS=your_email_password
SMTP_SECURE=true

# Optional: Fraud Protection
IPQUALITYSCORE_API_KEY=your_api_key_here
```

## SSL Certificate Setup

### 1. Enable SSL in cPanel
1. Go to "SSL/TLS" in cPanel
2. Use "Let's Encrypt" for free SSL
3. Enable "Force HTTPS Redirect"

### 2. Update Configuration
- Update `APP_URL` in `.env` to use `https://`
- Ensure all tracking URLs use HTTPS

## Email Configuration

### 1. Create Email Account
1. Go to "Email Accounts" in cPanel
2. Create account: `noreply@yourdomain.com`
3. Set strong password

### 2. SMTP Settings
- Host: `mail.yourdomain.com`
- Port: `587` (STARTTLS) or `465` (SSL)
- Authentication: Yes
- Username: Full email address
- Password: Email account password

## Security Configuration

### 1. File Permissions
Set proper file permissions:
```bash
chmod 644 .env
chmod 644 .htaccess
chmod -R 755 public_html/
```

### 2. Database Security
- Use strong database passwords
- Limit database user privileges
- Regular database backups

### 3. Application Security
- Generate unique JWT_SECRET and ENCRYPTION_KEY
- Change default admin password immediately
- Enable fraud protection if needed

## Testing Deployment

### 1. Database Connection
- Check if application loads without errors
- Verify database connection in browser console

### 2. Authentication
Test with demo accounts:
- Admin: `admin@affwish.com` / `Admin123!@#`
- Affiliate: `affiliate@affwish.com` / `Affiliate123!@#`

### 3. Core Features
- User registration/login
- Offer management (admin)
- Click tracking
- Conversion tracking
- Payment management

## Performance Optimization

### 1. Database Optimization
- Enable query cache in MySQL
- Regular OPTIMIZE TABLE commands
- Monitor slow query log

### 2. Application Optimization
- Enable gzip compression
- Set proper cache headers
- Optimize images and assets

### 3. Monitoring
- Set up error logging
- Monitor database performance
- Track application metrics

## Backup Strategy

### 1. Database Backups
- Daily automated backups via cPanel
- Export database regularly via phpMyAdmin
- Store backups off-site

### 2. File Backups
- Regular file system backups
- Version control for code changes
- Document configuration changes

## Troubleshooting

### Common Issues

#### Database Connection Errors
- Verify database credentials in `.env`
- Check database user permissions
- Ensure database server is running

#### SSL Certificate Issues
- Verify SSL certificate is valid
- Check mixed content warnings
- Update all URLs to HTTPS

#### Email Delivery Issues
- Test SMTP settings
- Check spam folders
- Verify email account exists

#### Performance Issues
- Check database indexes
- Monitor server resources
- Optimize database queries

### Error Logs
- Check cPanel error logs
- Monitor application console errors
- Review database error logs

## Maintenance

### Regular Tasks
- Update application dependencies
- Monitor security updates
- Review and rotate API keys
- Clean up old session data
- Optimize database tables

### Monitoring
- Set up uptime monitoring
- Monitor disk space usage
- Track application performance
- Review security logs

## Support

For technical support:
1. Check error logs first
2. Verify configuration settings
3. Test with minimal setup
4. Contact hosting provider if needed

## Security Checklist

- [ ] SSL certificate installed and working
- [ ] Strong database passwords set
- [ ] Default admin password changed
- [ ] JWT_SECRET and ENCRYPTION_KEY generated
- [ ] File permissions set correctly
- [ ] Error logging enabled
- [ ] Regular backups configured
- [ ] Fraud protection configured (optional)
- [ ] Email delivery tested
- [ ] All demo data reviewed/updated

## Post-Deployment

1. **Change Default Credentials**
   - Update admin password
   - Create real admin account
   - Remove or update demo accounts

2. **Configure Network Settings**
   - Update network name and description
   - Set tracking domains
   - Configure payment methods
   - Set up fraud protection

3. **Add Real Offers**
   - Remove demo offers
   - Add actual CPA offers
   - Configure tracking URLs
   - Set up postbacks

4. **Invite Affiliates**
   - Create affiliate accounts
   - Send login credentials
   - Provide documentation
   - Set up payment schedules

This completes the deployment process. Your AFFWISH CPA Network should now be fully operational on cPanel hosting with MySQL database.