import { Database } from '../lib/database';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  total?: number;
}

class ApiService {
  // Offer management
  async createOffer(offerData: any): Promise<ApiResponse> {
    try {
      const offerId = Database.generateUUID();
      const data = {
        id: offerId,
        ...offerData,
        created_at: new Date(),
        updated_at: new Date()
      };

      await Database.insert('offers', data);

      return { success: true, data: { id: offerId, ...data } };
    } catch (error) {
      console.error('Failed to create offer:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to create offer' 
      };
    }
  }

  async updateOffer(offerId: string, offerData: any): Promise<ApiResponse> {
    try {
      const data = {
        ...offerData,
        updated_at: new Date()
      };

      const affectedRows = await Database.update('offers', data, 'id = ?', [offerId]);

      if (affectedRows === 0) {
        return { success: false, error: 'Offer not found' };
      }

      return { success: true, data };
    } catch (error) {
      console.error('Failed to update offer:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to update offer' 
      };
    }
  }

  async deleteOffer(offerId: string): Promise<ApiResponse> {
    try {
      const affectedRows = await Database.delete('offers', 'id = ?', [offerId]);

      if (affectedRows === 0) {
        return { success: false, error: 'Offer not found' };
      }

      return { success: true };
    } catch (error) {
      console.error('Failed to delete offer:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to delete offer' 
      };
    }
  }

  async getOffers(page: number = 1, limit: number = 50): Promise<ApiResponse> {
    try {
      const offset = (page - 1) * limit;
      
      const offers = await Database.query(
        'SELECT * FROM offers ORDER BY created_at DESC LIMIT ? OFFSET ?',
        [limit, offset]
      );

      const totalResult = await Database.queryOne('SELECT COUNT(*) as total FROM offers');
      const total = totalResult.total;

      return { success: true, data: offers, total };
    } catch (error) {
      console.error('Failed to fetch offers:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch offers' 
      };
    }
  }

  // Affiliate management
  async createAffiliate(affiliateData: any): Promise<ApiResponse> {
    try {
      const affiliateId = Database.generateUUID();
      const data = {
        id: affiliateId,
        ...affiliateData,
        created_at: new Date(),
        updated_at: new Date()
      };

      await Database.insert('affiliates', data);

      return { success: true, data: { id: affiliateId, ...data } };
    } catch (error) {
      console.error('Failed to create affiliate:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to create affiliate' 
      };
    }
  }

  async getAffiliates(page: number = 1, limit: number = 50): Promise<ApiResponse> {
    try {
      const offset = (page - 1) * limit;
      
      const affiliates = await Database.query(`
        SELECT p.*, a.* FROM profiles p
        LEFT JOIN affiliates a ON p.id = a.user_id
        WHERE p.role = 'affiliate'
        ORDER BY p.created_at DESC
        LIMIT ? OFFSET ?
      `, [limit, offset]);

      const totalResult = await Database.queryOne(`
        SELECT COUNT(*) as total FROM profiles 
        WHERE role = 'affiliate'
      `);
      const total = totalResult.total;

      return { success: true, data: affiliates, total };
    } catch (error) {
      console.error('Failed to fetch affiliates:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch affiliates' 
      };
    }
  }

  // Click tracking
  async trackClick(clickData: any): Promise<ApiResponse> {
    try {
      const clickId = Database.generateUUID();
      const data = {
        id: clickId,
        ...clickData,
        created_at: new Date()
      };

      await Database.insert('clicks', data);

      return { success: true, data: { id: clickId, ...data } };
    } catch (error) {
      console.error('Failed to track click:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to track click' 
      };
    }
  }

  // Conversion tracking
  async trackConversion(conversionData: any): Promise<ApiResponse> {
    try {
      const conversionId = Database.generateUUID();
      const data = {
        id: conversionId,
        ...conversionData,
        created_at: new Date(),
        updated_at: new Date()
      };

      await Database.insert('conversions', data);

      // Update click as converted
      if (data.click_id) {
        await Database.update('clicks', { is_converted: true }, 'id = ?', [data.click_id]);
      }

      return { success: true, data: { id: conversionId, ...data } };
    } catch (error) {
      console.error('Failed to track conversion:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to track conversion' 
      };
    }
  }

  // Settings management
  async getSetting(key: string): Promise<ApiResponse> {
    try {
      const setting = await Database.queryOne(
        'SELECT setting_value FROM settings WHERE setting_key = ?',
        [key]
      );

      return { success: true, data: setting?.setting_value };
    } catch (error) {
      console.error('Failed to get setting:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to get setting' 
      };
    }
  }

  async updateSetting(key: string, value: any): Promise<ApiResponse> {
    try {
      // Try to update first
      const affectedRows = await Database.update(
        'settings', 
        { setting_value: JSON.stringify(value), updated_at: new Date() }, 
        'setting_key = ?', 
        [key]
      );

      // If no rows affected, insert new setting
      if (affectedRows === 0) {
        await Database.insert('settings', {
          id: Database.generateUUID(),
          setting_key: key,
          setting_value: JSON.stringify(value),
          created_at: new Date(),
          updated_at: new Date()
        });
      }

      return { success: true, data: { key, value } };
    } catch (error) {
      console.error('Failed to update setting:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to update setting' 
      };
    }
  }

  async getSettings(): Promise<ApiResponse> {
    try {
      const settings = await Database.query(
        'SELECT * FROM settings ORDER BY category, setting_key'
      );

      return { success: true, data: settings };
    } catch (error) {
      console.error('Failed to fetch settings:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch settings' 
      };
    }
  }

  // Analytics
  async getAnalytics(dateRange: string = '7d'): Promise<ApiResponse> {
    try {
      let days = 7;
      switch (dateRange) {
        case '30d': days = 30; break;
        case '90d': days = 90; break;
        default: days = 7;
      }

      // Get clicks data
      const clicks = await Database.query(`
        SELECT * FROM clicks 
        WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
        ORDER BY created_at DESC
      `, [days]);

      // Get conversions data
      const conversions = await Database.query(`
        SELECT * FROM conversions 
        WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
        ORDER BY created_at DESC
      `, [days]);

      return { 
        success: true, 
        data: { 
          clicks: clicks || [], 
          conversions: conversions || [] 
        } 
      };
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch analytics' 
      };
    }
  }

  // Fraud detection
  async checkFraud(ipAddress: string): Promise<ApiResponse> {
    try {
      // Get IPQualityScore API key from settings
      const apiKeyResponse = await this.getSetting('ipqualityscore_api_key');
      if (!apiKeyResponse.success || !apiKeyResponse.data) {
        return { success: false, error: 'IPQualityScore API key not configured' };
      }

      const apiKey = JSON.parse(apiKeyResponse.data);
      const url = `https://ipqualityscore.com/api/json/ip/${apiKey}/${ipAddress}`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Fraud check failed');
      }

      // Log the fraud check
      await Database.insert('fraud_logs', {
        id: Database.generateUUID(),
        ip_address: ipAddress,
        fraud_score: data.fraud_score,
        risk_level: data.fraud_score > 75 ? 'high' : data.fraud_score > 50 ? 'medium' : 'low',
        reasons: JSON.stringify(data.recent_abuse ? ['recent_abuse'] : []),
        blocked: data.fraud_score > 75,
        provider: 'ipqualityscore',
        raw_response: JSON.stringify(data),
        created_at: new Date()
      });

      return { success: true, data };
    } catch (error) {
      console.error('Fraud check failed:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Fraud check failed' 
      };
    }
  }
}

export const apiService = new ApiService();