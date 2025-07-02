import { apiService } from './api';
import { fraudService } from './fraudService';

export interface TrackingData {
  offerId: string;
  affiliateId: string;
  clickId: string;
  ipAddress?: string;
  userAgent?: string;
  country?: string;
  device?: string;
  browser?: string;
  os?: string;
  referrer?: string;
  landingPage?: string;
  subId?: string;
  subId2?: string;
  subId3?: string;
  subId4?: string;
  subId5?: string;
}

export interface ConversionData {
  clickId: string;
  conversionId: string;
  offerId: string;
  affiliateId: string;
  payout: number;
  revenue?: number;
  conversionValue?: number;
  currency?: string;
  transactionId?: string;
  customerId?: string;
}

class TrackingService {
  async trackClick(data: TrackingData): Promise<{ success: boolean; redirectUrl?: string; error?: string }> {
    try {
      // Check for fraud if IP address is provided
      if (data.ipAddress) {
        const fraudCheck = await fraudService.checkIP(data.ipAddress);
        
        if (fraudCheck.isBlocked) {
          await fraudService.logFraudAttempt(data.ipAddress, 'high_risk_ip');
          return { 
            success: false, 
            error: 'Traffic blocked due to fraud detection' 
          };
        }
      }

      // Track the click
      const clickData = {
        click_id: data.clickId,
        offer_id: data.offerId,
        affiliate_id: data.affiliateId,
        ip_address: data.ipAddress,
        user_agent: data.userAgent,
        country: data.country,
        device: data.device,
        browser: data.browser,
        os: data.os,
        referrer: data.referrer,
        landing_page: data.landingPage,
        sub_id: data.subId,
        sub_id_2: data.subId2,
        sub_id_3: data.subId3,
        sub_id_4: data.subId4,
        sub_id_5: data.subId5,
        is_fraud: false,
        is_converted: false,
        created_at: new Date().toISOString()
      };

      const response = await apiService.trackClick(clickData);
      
      if (!response.success) {
        return { success: false, error: response.error };
      }

      // Get the offer URL for redirect
      const offerResponse = await apiService.getOffers();
      if (offerResponse.success && offerResponse.data) {
        const offer = offerResponse.data.find((o: any) => o.id === data.offerId);
        if (offer) {
          return { 
            success: true, 
            redirectUrl: offer.offer_url 
          };
        }
      }

      return { success: true };
    } catch (error) {
      console.error('Click tracking failed:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Click tracking failed' 
      };
    }
  }

  async trackConversion(data: ConversionData): Promise<{ success: boolean; error?: string }> {
    try {
      const conversionData = {
        conversion_id: data.conversionId,
        click_id: data.clickId,
        offer_id: data.offerId,
        affiliate_id: data.affiliateId,
        payout: data.payout,
        revenue: data.revenue,
        status: 'pending',
        conversion_value: data.conversionValue,
        currency: data.currency || 'USD',
        transaction_id: data.transactionId,
        customer_id: data.customerId,
        postback_sent: false,
        created_at: new Date().toISOString()
      };

      const response = await apiService.trackConversion(conversionData);
      
      if (!response.success) {
        return { success: false, error: response.error };
      }

      // Update click as converted
      // This would typically be done via a database trigger or function
      
      return { success: true };
    } catch (error) {
      console.error('Conversion tracking failed:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Conversion tracking failed' 
      };
    }
  }

  generateClickId(): string {
    return `click_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  generateConversionId(): string {
    return `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  parseUserAgent(userAgent: string): { device: string; browser: string; os: string } {
    // Simple user agent parsing - in production, use a proper library
    const device = /Mobile|Android|iPhone|iPad/.test(userAgent) ? 'Mobile' : 'Desktop';
    
    let browser = 'Unknown';
    if (userAgent.includes('Chrome')) browser = 'Chrome';
    else if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Safari')) browser = 'Safari';
    else if (userAgent.includes('Edge')) browser = 'Edge';
    
    let os = 'Unknown';
    if (userAgent.includes('Windows')) os = 'Windows';
    else if (userAgent.includes('Mac')) os = 'macOS';
    else if (userAgent.includes('Linux')) os = 'Linux';
    else if (userAgent.includes('Android')) os = 'Android';
    else if (userAgent.includes('iOS')) os = 'iOS';
    
    return { device, browser, os };
  }

  async getClickStats(affiliateId?: string, dateRange: string = '7d'): Promise<any> {
    try {
      const response = await apiService.getAnalytics(dateRange);
      
      if (!response.success) {
        return { clicks: 0, conversions: 0, revenue: 0 };
      }

      const { clicks, conversions } = response.data;
      
      // Filter by affiliate if specified
      const filteredClicks = affiliateId 
        ? clicks.filter((c: any) => c.affiliate_id === affiliateId)
        : clicks;
        
      const filteredConversions = affiliateId
        ? conversions.filter((c: any) => c.affiliate_id === affiliateId)
        : conversions;

      const totalRevenue = filteredConversions.reduce((sum: number, conv: any) => sum + (conv.payout || 0), 0);

      return {
        clicks: filteredClicks.length,
        conversions: filteredConversions.length,
        revenue: totalRevenue,
        conversionRate: filteredClicks.length > 0 ? (filteredConversions.length / filteredClicks.length) * 100 : 0,
        epc: filteredClicks.length > 0 ? totalRevenue / filteredClicks.length : 0
      };
    } catch (error) {
      console.error('Failed to get click stats:', error);
      return { clicks: 0, conversions: 0, revenue: 0 };
    }
  }
}

export const trackingService = new TrackingService();