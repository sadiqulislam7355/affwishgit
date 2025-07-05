// API Service for MySQL Backend
// This replaces Supabase API calls with MySQL-compatible endpoints

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  total?: number;
}

class ApiService {
  private baseUrl = '/api'; // In production, this would be your backend API URL

  // Demo data for development
  private demoOffers = [
    {
      id: '00000000-0000-0000-0000-000000000010',
      name: 'Premium Dating App - iOS/Android',
      description: 'High-converting dating app with premium features. Target audience: 18-45 years old, looking for serious relationships.',
      advertiser: 'Dating Corp International',
      advertiser_id: 'DC_001',
      payout: 25.00,
      payout_type: 'CPA',
      category: 'Dating',
      status: 'active',
      countries: ['US', 'CA', 'UK', 'AU', 'DE'],
      devices: ['Mobile', 'Desktop'],
      traffic_sources: ['Social Media', 'Email Marketing', 'Native Ads'],
      offer_url: 'https://dating-app.example.com/signup',
      preview_url: 'https://dating-app.example.com/preview',
      tracking_url: 'https://track.affwish.com/click?offer_id={offer_id}&affiliate_id={affiliate_id}&click_id={click_id}',
      global_postback_enabled: true,
      created_at: new Date().toISOString()
    },
    {
      id: '00000000-0000-0000-0000-000000000011',
      name: 'Crypto Trading Platform',
      description: 'Leading cryptocurrency trading platform with advanced features. High payouts for qualified leads.',
      advertiser: 'CryptoTrade Exchange',
      advertiser_id: 'CTE_002',
      payout: 40.00,
      payout_type: 'CPA',
      category: 'Finance',
      status: 'active',
      countries: ['US', 'CA', 'UK', 'AU', 'DE'],
      devices: ['Desktop', 'Mobile'],
      traffic_sources: ['PPC', 'Social Media', 'Email Marketing'],
      offer_url: 'https://crypto-exchange.example.com/register',
      preview_url: 'https://crypto-exchange.example.com/preview',
      tracking_url: 'https://track.affwish.com/click?offer_id={offer_id}&affiliate_id={affiliate_id}&click_id={click_id}',
      global_postback_enabled: true,
      created_at: new Date().toISOString()
    },
    {
      id: '00000000-0000-0000-0000-000000000012',
      name: 'VPN Service - Premium Subscription',
      description: 'Top-rated VPN service with global servers. High conversion rates on free trial offers.',
      advertiser: 'SecureVPN Solutions',
      advertiser_id: 'SVS_003',
      payout: 15.00,
      payout_type: 'CPA',
      category: 'Software',
      status: 'active',
      countries: ['Global'],
      devices: ['Desktop', 'Mobile', 'Tablet'],
      traffic_sources: ['SEO', 'Content Marketing', 'Social Media'],
      offer_url: 'https://secure-vpn.example.com/trial',
      preview_url: 'https://secure-vpn.example.com/preview',
      tracking_url: 'https://track.affwish.com/click?offer_id={offer_id}&affiliate_id={affiliate_id}&click_id={click_id}',
      global_postback_enabled: true,
      created_at: new Date().toISOString()
    }
  ];

  // User management
  async getUserProfile(userId: string): Promise<ApiResponse> {
    try {
      // Demo implementation - replace with actual API call
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        return { success: true, data: JSON.parse(currentUser) };
      }
      return { success: false, error: 'User not found' };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to get user profile' 
      };
    }
  }

  // Offer management
  async createOffer(offerData: any): Promise<ApiResponse> {
    try {
      const newOffer = {
        id: `offer_${Date.now()}`,
        ...offerData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // In production, this would make an API call to your MySQL backend
      this.demoOffers.push(newOffer);
      
      return { success: true, data: newOffer };
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
      const offerIndex = this.demoOffers.findIndex(offer => offer.id === offerId);
      
      if (offerIndex === -1) {
        return { success: false, error: 'Offer not found' };
      }

      this.demoOffers[offerIndex] = {
        ...this.demoOffers[offerIndex],
        ...offerData,
        updated_at: new Date().toISOString()
      };

      return { success: true, data: this.demoOffers[offerIndex] };
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
      const offerIndex = this.demoOffers.findIndex(offer => offer.id === offerId);
      
      if (offerIndex === -1) {
        return { success: false, error: 'Offer not found' };
      }

      this.demoOffers.splice(offerIndex, 1);
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
      // Demo implementation - in production, this would query MySQL
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedOffers = this.demoOffers.slice(startIndex, endIndex);

      return { 
        success: true, 
        data: paginatedOffers, 
        total: this.demoOffers.length 
      };
    } catch (error) {
      console.error('Failed to fetch offers:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch offers' 
      };
    }
  }

  // Click tracking
  async trackClick(clickData: any): Promise<ApiResponse> {
    try {
      const click = {
        id: `click_${Date.now()}`,
        ...clickData,
        created_at: new Date().toISOString()
      };

      // In production, this would insert into MySQL clicks table
      console.log('Tracking click:', click);

      return { success: true, data: click };
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
      const conversion = {
        id: `conversion_${Date.now()}`,
        ...conversionData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // In production, this would insert into MySQL conversions table
      console.log('Tracking conversion:', conversion);

      return { success: true, data: conversion };
    } catch (error) {
      console.error('Failed to track conversion:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to track conversion' 
      };
    }
  }

  // Analytics
  async getAnalytics(dateRange: string = '7d'): Promise<ApiResponse> {
    try {
      // Demo analytics data
      const analyticsData = {
        clicks: [
          { date: '2024-01-01', count: 420, affiliate_id: '00000000-0000-0000-0000-000000000002' },
          { date: '2024-01-02', count: 380, affiliate_id: '00000000-0000-0000-0000-000000000002' },
          { date: '2024-01-03', count: 520, affiliate_id: '00000000-0000-0000-0000-000000000002' }
        ],
        conversions: [
          { date: '2024-01-01', count: 45, payout: 1125, affiliate_id: '00000000-0000-0000-0000-000000000002' },
          { date: '2024-01-02', count: 38, payout: 950, affiliate_id: '00000000-0000-0000-0000-000000000002' },
          { date: '2024-01-03', count: 62, payout: 1550, affiliate_id: '00000000-0000-0000-0000-000000000002' }
        ]
      };

      return { success: true, data: analyticsData };
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch analytics' 
      };
    }
  }

  // Settings management
  async getSetting(key: string): Promise<ApiResponse> {
    try {
      // Demo settings
      const settings: Record<string, any> = {
        network_name: 'AFFWISH Network',
        global_postback_url: 'https://postback.affwish.com/global?click_id={click_id}&status={status}',
        fraud_protection_enabled: false,
        ipqualityscore_api_key: ''
      };

      return { success: true, data: settings[key] };
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
      // In production, this would update MySQL settings table
      console.log(`Setting ${key} = ${value}`);
      
      return { success: true, data: { key, value } };
    } catch (error) {
      console.error('Failed to update setting:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to update setting' 
      };
    }
  }

  // Postback management
  async createPostback(postbackData: any): Promise<ApiResponse> {
    try {
      const postback = {
        id: `postback_${Date.now()}`,
        ...postbackData,
        created_at: new Date().toISOString()
      };

      // In production, this would insert into MySQL postbacks table
      console.log('Creating postback:', postback);

      return { success: true, data: postback };
    } catch (error) {
      console.error('Failed to create postback:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to create postback' 
      };
    }
  }

  // Fraud detection
  async checkFraud(ipAddress: string): Promise<ApiResponse> {
    try {
      // Demo fraud check - in production, this would call IPQualityScore API
      const fraudData = {
        fraud_score: Math.floor(Math.random() * 100),
        country_match: true,
        proxy: false,
        vpn: false,
        tor: false,
        recent_abuse: false,
        bot_status: false
      };

      return { success: true, data: fraudData };
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