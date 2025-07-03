// MySQL/cPanel specific utilities and configurations

export const mysqlConfig = {
  // cPanel MySQL connection settings
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  
  // cPanel specific settings
  ssl: process.env.DB_SSL === 'true' ? {
    rejectUnauthorized: false
  } : false,
  
  // Connection pool settings for shared hosting
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true,
  
  // Character set for proper UTF-8 support
  charset: 'utf8mb4',
  timezone: '+00:00'
};

// cPanel deployment helper functions
export class CpanelHelper {
  // Generate .htaccess for React routing
  static generateHtaccess(): string {
    return `
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]

# Security headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
Header always set Referrer-Policy "strict-origin-when-cross-origin"

# Cache static assets
<filesMatch "\\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$">
  ExpiresActive On
  ExpiresDefault "access plus 1 month"
</filesMatch>
`;
  }

  // Generate database configuration for cPanel
  static generateDbConfig(): string {
    return `
# Database Configuration for cPanel
# Add these to your .env file:

DB_HOST=localhost
DB_PORT=3306
DB_USER=your_cpanel_username_dbuser
DB_PASSWORD=your_database_password
DB_NAME=your_cpanel_username_affwish

# For cPanel, the database name format is usually:
# cpanel_username_database_name

# SSL (usually not needed for localhost)
DB_SSL=false

# Application settings
APP_URL=https://yourdomain.com
JWT_SECRET=your_jwt_secret_key_here
ENCRYPTION_KEY=your_encryption_key_here

# Email settings (for cPanel email)
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
SMTP_USER=noreply@yourdomain.com
SMTP_PASS=your_email_password
SMTP_SECURE=true

# Fraud protection (optional)
IPQUALITYSCORE_API_KEY=your_api_key_here
`;
  }

  // Generate deployment instructions
  static generateDeploymentInstructions(): string {
    return `
# AFFWISH CPA Network - cPanel Deployment Instructions

## 1. Database Setup
1. Login to cPanel
2. Go to "MySQL Databases"
3. Create a new database: "affwish" (will become cpanel_username_affwish)
4. Create a database user and assign to the database
5. Import the schema.sql file via phpMyAdmin
6. Import the sample_data.sql file for demo data

## 2. File Upload
1. Build the project: npm run build
2. Upload the contents of the 'dist' folder to public_html
3. Upload the .htaccess file to public_html
4. Create a .env file with your database credentials

## 3. Environment Configuration
1. Copy the database configuration template
2. Update with your actual cPanel database credentials
3. Set your domain URL and other settings

## 4. SSL Certificate
1. Enable SSL in cPanel (Let's Encrypt is usually free)
2. Update APP_URL to use https://

## 5. Email Configuration
1. Create an email account in cPanel (e.g., noreply@yourdomain.com)
2. Update SMTP settings in .env file

## 6. Testing
1. Visit your domain
2. Login with demo credentials:
   - Admin: admin@affwish.com / Admin123!@#
   - Affiliate: affiliate@affwish.com / Affiliate123!@#

## 7. Security
1. Change default passwords
2. Update JWT_SECRET and ENCRYPTION_KEY
3. Enable firewall rules if available
4. Regular database backups

## Troubleshooting
- Check error logs in cPanel
- Verify database connection
- Ensure all files uploaded correctly
- Check .htaccess syntax
`;
  }
}

// MySQL query builders for common operations
export class MySQLQueryBuilder {
  // Build SELECT query with pagination
  static select(table: string, options: {
    columns?: string[];
    where?: string;
    orderBy?: string;
    limit?: number;
    offset?: number;
    joins?: string[];
  } = {}): { sql: string; countSql: string } {
    const {
      columns = ['*'],
      where = '',
      orderBy = '',
      limit,
      offset = 0,
      joins = []
    } = options;

    let sql = `SELECT ${columns.join(', ')} FROM ${table}`;
    let countSql = `SELECT COUNT(*) as total FROM ${table}`;

    // Add joins
    if (joins.length > 0) {
      const joinClause = joins.join(' ');
      sql += ` ${joinClause}`;
      countSql += ` ${joinClause}`;
    }

    // Add WHERE clause
    if (where) {
      sql += ` WHERE ${where}`;
      countSql += ` WHERE ${where}`;
    }

    // Add ORDER BY
    if (orderBy) {
      sql += ` ORDER BY ${orderBy}`;
    }

    // Add LIMIT and OFFSET
    if (limit) {
      sql += ` LIMIT ${limit}`;
      if (offset > 0) {
        sql += ` OFFSET ${offset}`;
      }
    }

    return { sql, countSql };
  }

  // Build INSERT query
  static insert(table: string, data: Record<string, any>): { sql: string; values: any[] } {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map(() => '?').join(', ');

    const sql = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`;
    return { sql, values };
  }

  // Build UPDATE query
  static update(table: string, data: Record<string, any>, where: string): { sql: string; values: any[] } {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys.map(key => `${key} = ?`).join(', ');

    const sql = `UPDATE ${table} SET ${setClause} WHERE ${where}`;
    return { sql, values };
  }

  // Build analytics queries
  static analytics = {
    // Daily stats
    dailyStats: (dateRange: number = 7) => `
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as clicks,
        COUNT(CASE WHEN is_converted = 1 THEN 1 END) as conversions,
        ROUND(COUNT(CASE WHEN is_converted = 1 THEN 1 END) * 100.0 / COUNT(*), 2) as cvr
      FROM clicks 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL ${dateRange} DAY)
      GROUP BY DATE(created_at)
      ORDER BY date DESC
    `,

    // Top offers
    topOffers: (limit: number = 10) => `
      SELECT 
        o.id,
        o.name,
        o.payout,
        COUNT(c.id) as clicks,
        COUNT(conv.id) as conversions,
        ROUND(COUNT(conv.id) * 100.0 / COUNT(c.id), 2) as cvr,
        SUM(conv.payout) as revenue
      FROM offers o
      LEFT JOIN clicks c ON o.id = c.offer_id
      LEFT JOIN conversions conv ON c.id = conv.click_id
      WHERE o.status = 'active'
      GROUP BY o.id, o.name, o.payout
      ORDER BY revenue DESC
      LIMIT ${limit}
    `,

    // Affiliate performance
    affiliateStats: (affiliateId?: string) => {
      const whereClause = affiliateId ? `WHERE p.id = '${affiliateId}'` : '';
      return `
        SELECT 
          p.id,
          p.full_name,
          p.email,
          COUNT(c.id) as total_clicks,
          COUNT(conv.id) as total_conversions,
          ROUND(COUNT(conv.id) * 100.0 / COUNT(c.id), 2) as conversion_rate,
          SUM(conv.payout) as total_earnings,
          ROUND(SUM(conv.payout) / COUNT(c.id), 2) as epc
        FROM profiles p
        LEFT JOIN clicks c ON p.id = c.affiliate_id
        LEFT JOIN conversions conv ON c.id = conv.click_id
        ${whereClause}
        GROUP BY p.id, p.full_name, p.email
        ORDER BY total_earnings DESC
      `;
    }
  };
}

export default MySQLQueryBuilder;