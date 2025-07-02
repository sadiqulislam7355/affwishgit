import { supabase } from '../lib/supabase';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

class ApiService {
  // Offer management
  async createOffer(offerData: any): Promise<ApiResponse> {
    try {
      const { data, error } = await supabase
        .from('offers')
        .insert(offerData)
        .select()
        .single();

      if (error) throw error;

      return { success: true, data };
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
      const { data, error } = await supabase
        .from('offers')
        .update(offerData)
        .eq('id', offerId)
        .select()
        .single();

      if (error) throw error;

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
      const { error } = await supabase
        .from('offers')
        .delete()
        .eq('id', offerId);

      if (error) throw error;

      return { success: true };
    } catch (error) {
      console.error('Failed to delete offer:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to delete offer' 
      };
    }
  }

  async getOffers(): Promise<ApiResponse> {
    try {
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return { success: true, data };
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
      // This would typically be handled by the AddAffiliateModal
      // which creates the user account and profile
      return { success: true, data: affiliateData };
    } catch (error) {
      console.error('Failed to create affiliate:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to create affiliate' 
      };
    }
  }

  async getAffiliates(): Promise<ApiResponse> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          affiliates (*)
        `)
        .eq('role', 'affiliate')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Failed to fetch affiliates:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch affiliates' 
      };
    }
  }

  // Postback management
  async createPostback(postbackData: any): Promise<ApiResponse> {
    try {
      const { data, error } = await supabase
        .from('postbacks')
        .insert(postbackData)
        .select()
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Failed to create postback:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to create postback' 
      };
    }
  }

  async getPostbacks(): Promise<ApiResponse> {
    try {
      const { data, error } = await supabase
        .from('postbacks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Failed to fetch postbacks:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch postbacks' 
      };
    }
  }

  // Click tracking
  async trackClick(clickData: any): Promise<ApiResponse> {
    try {
      const { data, error } = await supabase
        .from('clicks')
        .insert(clickData)
        .select()
        .single();

      if (error) throw error;

      return { success: true, data };
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
      const { data, error } = await supabase
        .from('conversions')
        .insert(conversionData)
        .select()
        .single();

      if (error) throw error;

      return { success: true, data };
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
      const { data, error } = await supabase
        .from('settings')
        .select('value')
        .eq('key', key)
        .single();

      if (error) throw error;

      return { success: true, data: data?.value };
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
      const { data, error } = await supabase
        .from('settings')
        .upsert({ key, value })
        .select()
        .single();

      if (error) throw error;

      return { success: true, data };
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
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .order('category', { ascending: true });

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Failed to fetch settings:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch settings' 
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

      const apiKey = apiKeyResponse.data;
      const url = `https://ipqualityscore.com/api/json/ip/${apiKey}/${ipAddress}`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Fraud check failed');
      }

      // Log the fraud check
      await supabase
        .from('fraud_logs')
        .insert({
          ip_address: ipAddress,
          fraud_score: data.fraud_score,
          risk_level: data.fraud_score > 75 ? 'high' : data.fraud_score > 50 ? 'medium' : 'low',
          reasons: data.recent_abuse ? ['recent_abuse'] : [],
          blocked: data.fraud_score > 75,
          provider: 'ipqualityscore',
          raw_response: data
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

  // Analytics
  async getAnalytics(dateRange: string = '7d'): Promise<ApiResponse> {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        return { success: false, error: 'Not authenticated' };
      }

      // Calculate date range
      const endDate = new Date();
      const startDate = new Date();
      
      switch (dateRange) {
        case '7d':
          startDate.setDate(endDate.getDate() - 7);
          break;
        case '30d':
          startDate.setDate(endDate.getDate() - 30);
          break;
        case '90d':
          startDate.setDate(endDate.getDate() - 90);
          break;
        default:
          startDate.setDate(endDate.getDate() - 7);
      }

      // Get clicks data
      const { data: clicks, error: clicksError } = await supabase
        .from('clicks')
        .select('*')
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString());

      if (clicksError) throw clicksError;

      // Get conversions data
      const { data: conversions, error: conversionsError } = await supabase
        .from('conversions')
        .select('*')
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString());

      if (conversionsError) throw conversionsError;

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
}

export const apiService = new ApiService();