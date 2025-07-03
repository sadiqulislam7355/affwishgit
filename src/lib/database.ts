import mysql from 'mysql2/promise';

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'affwish_network',
  charset: 'utf8mb4',
  timezone: '+00:00',
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
};

// Create connection pool
export const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Database helper functions
export class Database {
  // Execute a query
  static async query(sql: string, params: any[] = []): Promise<any> {
    try {
      const [rows] = await pool.execute(sql, params);
      return rows;
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }
  }

  // Get a single row
  static async queryOne(sql: string, params: any[] = []): Promise<any> {
    const rows = await this.query(sql, params);
    return rows[0] || null;
  }

  // Insert and return the inserted ID
  static async insert(table: string, data: Record<string, any>): Promise<string> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map(() => '?').join(', ');
    
    const sql = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`;
    const result: any = await this.query(sql, values);
    
    return data.id || result.insertId;
  }

  // Update records
  static async update(table: string, data: Record<string, any>, where: string, whereParams: any[] = []): Promise<number> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys.map(key => `${key} = ?`).join(', ');
    
    const sql = `UPDATE ${table} SET ${setClause} WHERE ${where}`;
    const result: any = await this.query(sql, [...values, ...whereParams]);
    
    return result.affectedRows;
  }

  // Delete records
  static async delete(table: string, where: string, whereParams: any[] = []): Promise<number> {
    const sql = `DELETE FROM ${table} WHERE ${where}`;
    const result: any = await this.query(sql, whereParams);
    
    return result.affectedRows;
  }

  // Generate UUID
  static generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  // Test connection
  static async testConnection(): Promise<boolean> {
    try {
      await this.query('SELECT 1');
      return true;
    } catch (error) {
      console.error('Database connection test failed:', error);
      return false;
    }
  }
}

// User authentication functions
export class Auth {
  // Hash password
  static async hashPassword(password: string): Promise<string> {
    const bcrypt = await import('bcryptjs');
    return bcrypt.hash(password, 12);
  }

  // Verify password
  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    const bcrypt = await import('bcryptjs');
    return bcrypt.compare(password, hash);
  }

  // Generate session token
  static generateSessionToken(): string {
    return require('crypto').randomBytes(32).toString('hex');
  }

  // Create user session
  static async createSession(userId: string, ipAddress?: string, userAgent?: string): Promise<string> {
    const sessionToken = this.generateSessionToken();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    
    await Database.insert('user_sessions', {
      id: Database.generateUUID(),
      user_id: userId,
      session_token: sessionToken,
      expires_at: expiresAt,
      ip_address: ipAddress,
      user_agent: userAgent
    });
    
    return sessionToken;
  }

  // Validate session
  static async validateSession(sessionToken: string): Promise<any> {
    const session = await Database.queryOne(
      `SELECT s.*, u.*, p.* FROM user_sessions s 
       JOIN users u ON s.user_id = u.id 
       JOIN profiles p ON u.id = p.id 
       WHERE s.session_token = ? AND s.expires_at > NOW()`,
      [sessionToken]
    );
    
    return session;
  }

  // Delete session
  static async deleteSession(sessionToken: string): Promise<void> {
    await Database.delete('user_sessions', 'session_token = ?', [sessionToken]);
  }

  // Login user
  static async login(email: string, password: string, ipAddress?: string, userAgent?: string): Promise<{ user: any; sessionToken: string } | null> {
    // Get user
    const user = await Database.queryOne(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    
    if (!user) {
      return null;
    }
    
    // Check if account is locked
    if (user.locked_until && new Date(user.locked_until) > new Date()) {
      throw new Error('Account is temporarily locked due to too many failed login attempts');
    }
    
    // Verify password
    const isValid = await this.verifyPassword(password, user.password_hash);
    
    if (!isValid) {
      // Increment login attempts
      await Database.update(
        'users',
        { 
          login_attempts: user.login_attempts + 1,
          locked_until: user.login_attempts >= 4 ? new Date(Date.now() + 30 * 60 * 1000) : null // Lock for 30 minutes after 5 attempts
        },
        'id = ?',
        [user.id]
      );
      return null;
    }
    
    // Reset login attempts and update last login
    await Database.update(
      'users',
      { 
        login_attempts: 0,
        locked_until: null,
        last_login: new Date()
      },
      'id = ?',
      [user.id]
    );
    
    // Get user profile
    const profile = await Database.queryOne(
      'SELECT * FROM profiles WHERE id = ?',
      [user.id]
    );
    
    // Create session
    const sessionToken = await this.createSession(user.id, ipAddress, userAgent);
    
    return {
      user: { ...user, ...profile },
      sessionToken
    };
  }

  // Register user
  static async register(userData: {
    email: string;
    password: string;
    fullName: string;
    role?: string;
    [key: string]: any;
  }): Promise<string> {
    const userId = Database.generateUUID();
    const hashedPassword = await this.hashPassword(userData.password);
    
    // Insert user
    await Database.insert('users', {
      id: userId,
      email: userData.email,
      password_hash: hashedPassword,
      email_verified: false
    });
    
    // Insert profile
    await Database.insert('profiles', {
      id: userId,
      email: userData.email,
      full_name: userData.fullName,
      role: userData.role || 'affiliate',
      status: 'pending',
      email_verified: false,
      ...userData
    });
    
    return userId;
  }
}

export default Database;