export interface ClickData {
  id: string;
  affiliateId: string;
  offerId: string;
  ipAddress: string;
  userAgent: string;
  country: string;
  device: string;
  source: string;
  timestamp: string;
  fraudScore?: number;
  fraudStatus: 'clean' | 'suspicious' | 'blocked';
  cookieId: string;
  subId?: string;
  referrer?: string;
  landingPageUrl?: string;
  conversionValue?: number;
}

class ClickTrackingService {
  private clicks: ClickData[] = [];
  private cookiePrefix = 'affwish_';
  private cookieExpiry = 30; // days

  // Generate unique click ID
  generateClickId(): string {
    return 'click_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Generate unique cookie ID
  generateCookieId(): string {
    return 'cookie_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Set tracking cookie
  setTrackingCookie(clickId: string, affiliateId: string, offerId: string): string {
    const cookieId = this.generateCookieId();
    const cookieData = {
      clickId,
      affiliateId,
      offerId,
      timestamp: new Date().toISOString()
    };

    // Set cookie with expiry
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + this.cookieExpiry);
    
    document.cookie = `${this.cookiePrefix}tracking=${JSON.stringify(cookieData)}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
    
    return cookieId;
  }

  // Get tracking cookie
  getTrackingCookie(): any {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === `${this.cookiePrefix}tracking`) {
        try {
          return JSON.parse(decodeURIComponent(value));
        } catch (error) {
          console.error('Error parsing tracking cookie:', error);
          return null;
        }
      }
    }
    return null;
  }

  // Track click
  async trackClick(params: {
    affiliateId: string;
    offerId: string;
    subId?: string;
    source?: string;
  }): Promise<ClickData> {
    const clickId = this.generateClickId();
    const cookieId = this.setTrackingCookie(clickId, params.affiliateId, params.offerId);
    
    // Get user information
    const userInfo = this.getUserInfo();
    
    const clickData: ClickData = {
      id: clickId,
      affiliateId: params.affiliateId,
      offerId: params.offerId,
      ipAddress: userInfo.ipAddress,
      userAgent: userInfo.userAgent,
      country: userInfo.country,
      device: userInfo.device,
      source: params.source || 'direct',
      timestamp: new Date().toISOString(),
      fraudScore: 0,
      fraudStatus: 'clean',
      cookieId,
      subId: params.subId,
      referrer: document.referrer,
      landingPageUrl: window.location.href
    };

    // Perform fraud check
    await this.performFraudCheck(clickData);
    
    // Store click data
    this.clicks.push(clickData);
    
    // Send to backend
    await this.sendClickToBackend(clickData);
    
    return clickData;
  }

  // Get user information
  private getUserInfo() {
    const userAgent = navigator.userAgent;
    
    // Detect device type
    let device = 'Desktop';
    if (/Mobile|Android|iPhone|iPad/.test(userAgent)) {
      device = /iPad/.test(userAgent) ? 'Tablet' : 'Mobile';
    }

    // Simulate IP and country detection (in production, this would be server-side)
    const ipAddress = '192.168.1.' + Math.floor(Math.random() * 255);
    const countries = ['US', 'CA', 'UK', 'AU', 'DE', 'FR'];
    const country = countries[Math.floor(Math.random() * countries.length)];

    return {
      ipAddress,
      userAgent,
      country,
      device
    };
  }

  // Perform fraud check
  private async performFraudCheck(clickData: ClickData): Promise<void> {
    // Simulate fraud detection
    let fraudScore = 0;
    const reasons = [];

    // Check user agent
    if (clickData.userAgent.toLowerCase().includes('bot')) {
      fraudScore += 50;
      reasons.push('Bot user agent detected');
    }

    // Check for rapid clicks from same IP
    const recentClicks = this.clicks.filter(click => 
      click.ipAddress === clickData.ipAddress && 
      Date.now() - new Date(click.timestamp).getTime() < 60000 // 1 minute
    );
    
    if (recentClicks.length > 5) {
      fraudScore += 30;
      reasons.push('Rapid clicking detected');
    }

    // Check referrer
    if (!clickData.referrer) {
      fraudScore += 10;
      reasons.push('No referrer');
    }

    // Simulate random fraud score
    fraudScore += Math.random() * 20;

    clickData.fraudScore = Math.round(fraudScore);
    
    if (fraudScore > 70) {
      clickData.fraudStatus = 'blocked';
    } else if (fraudScore > 40) {
      clickData.fraudStatus = 'suspicious';
    } else {
      clickData.fraudStatus = 'clean';
    }
  }

  // Send click data to backend
  private async sendClickToBackend(clickData: ClickData): Promise<void> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 100));
      console.log('Click tracked:', clickData.id);
    } catch (error) {
      console.error('Failed to send click data:', error);
    }
  }

  // Track conversion
  async trackConversion(conversionValue: number): Promise<any> {
    const trackingCookie = this.getTrackingCookie();
    
    if (!trackingCookie) {
      throw new Error('No tracking cookie found');
    }

    const conversionData = {
      id: 'conv_' + Date.now(),
      clickId: trackingCookie.clickId,
      affiliateId: trackingCookie.affiliateId,
      offerId: trackingCookie.offerId,
      value: conversionValue,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    // Send conversion to backend
    await this.sendConversionToBackend(conversionData);
    
    return conversionData;
  }

  // Send conversion data to backend
  private async sendConversionToBackend(conversionData: any): Promise<void> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 150));
      console.log('Conversion tracked:', conversionData.id);
    } catch (error) {
      console.error('Failed to send conversion data:', error);
    }
  }

  // Get click statistics
  getClickStats() {
    const totalClicks = this.clicks.length;
    const cleanClicks = this.clicks.filter(c => c.fraudStatus === 'clean').length;
    const suspiciousClicks = this.clicks.filter(c => c.fraudStatus === 'suspicious').length;
    const blockedClicks = this.clicks.filter(c => c.fraudStatus === 'blocked').length;

    return {
      totalClicks,
      cleanClicks,
      suspiciousClicks,
      blockedClicks,
      fraudRate: totalClicks > 0 ? ((suspiciousClicks + blockedClicks) / totalClicks * 100).toFixed(2) : '0'
    };
  }

  // Get recent clicks
  getRecentClicks(limit: number = 10): ClickData[] {
    return this.clicks
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }

  // Clear tracking cookie
  clearTrackingCookie(): void {
    document.cookie = `${this.cookiePrefix}tracking=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  // Generate tracking URL
  generateTrackingUrl(offerId: string, affiliateId: string, subId?: string): string {
    const baseUrl = 'https://track.affwish.com/click';
    const params = new URLSearchParams({
      offer_id: offerId,
      affiliate_id: affiliateId,
      ...(subId && { sub_id: subId })
    });
    
    return `${baseUrl}?${params.toString()}`;
  }
}

export const clickTrackingService = new ClickTrackingService();