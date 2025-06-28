// Local data store for demo functionality
import { User, Offer, Affiliate, Postback, FraudAlert, Tenant } from '../types';

class DataStore {
  private offers: Offer[] = [
    {
      id: '1',
      name: 'Premium Dating App',
      description: 'High-converting dating app with premium features',
      advertiser: 'Dating Corp',
      advertiserId: 'adv_1',
      payout: 25.00,
      payoutType: 'CPA',
      category: 'Dating',
      status: 'active',
      countries: ['US', 'CA', 'UK'],
      devices: ['Mobile', 'Desktop'],
      trafficSources: ['Social', 'Email'],
      url: 'https://example.com/dating-offer',
      previewUrl: 'https://example.com/dating-preview',
      caps: { daily: 100, weekly: 500, monthly: 2000 },
      createdAt: new Date().toISOString(),
      conversionFlow: 'Registration + Email Verification',
      restrictions: 'No adult traffic, no incentivized traffic'
    },
    {
      id: '2',
      name: 'Crypto Trading Platform',
      description: 'Advanced cryptocurrency trading platform',
      advertiser: 'Crypto Exchange',
      advertiserId: 'adv_2',
      payout: 40.00,
      payoutType: 'CPA',
      category: 'Finance',
      status: 'active',
      countries: ['US', 'AU', 'DE'],
      devices: ['Desktop', 'Mobile'],
      trafficSources: ['Search', 'Display'],
      url: 'https://example.com/crypto-offer',
      caps: { daily: 50, weekly: 300, monthly: 1200 },
      createdAt: new Date().toISOString(),
      conversionFlow: 'Registration + KYC Verification + First Deposit',
      restrictions: 'Must be 18+, restricted countries apply'
    }
  ];

  private affiliates: Affiliate[] = [
    {
      id: '1',
      name: 'John Marketing Pro',
      email: 'john@marketingpro.com',
      phone: '+1-555-0123',
      company: 'Marketing Pro LLC',
      website: 'https://marketingpro.com',
      country: 'US',
      paymentMethod: 'paypal',
      paymentDetails: 'john@marketingpro.com',
      trafficSources: ['Social Media', 'Email Marketing'],
      experience: 'advanced',
      status: 'active',
      createdAt: new Date().toISOString(),
      totalEarnings: 15420.50,
      conversions: 342,
      clicks: 12450
    },
    {
      id: '2',
      name: 'Sarah Digital Expert',
      email: 'sarah@digitalexpert.com',
      phone: '+1-555-0456',
      company: 'Digital Expert Agency',
      website: 'https://digitalexpert.com',
      country: 'CA',
      paymentMethod: 'bank',
      paymentDetails: 'Bank Account: ****1234',
      trafficSources: ['SEO', 'PPC'],
      experience: 'expert',
      status: 'active',
      createdAt: new Date().toISOString(),
      totalEarnings: 23150.75,
      conversions: 456,
      clicks: 18920
    }
  ];

  private postbacks: Postback[] = [
    {
      id: '1',
      name: 'Conversion Postback',
      url: 'https://example.com/postback?click_id={click_id}&status=conversion',
      method: 'GET',
      parameters: {
        affiliate_id: '{affiliate_id}',
        offer_id: '{offer_id}',
        conversion_value: '{conversion_value}',
        timestamp: '{timestamp}'
      },
      status: 'active',
      createdAt: new Date().toISOString(),
      fireCount: 1250
    }
  ];

  private fraudAlerts: FraudAlert[] = [
    {
      id: '1',
      type: 'bot_detected',
      severity: 'high',
      description: 'Bot traffic detected from suspicious IP range',
      affectedCampaign: 'Dating App Campaign',
      timestamp: new Date().toISOString(),
      status: 'open',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (compatible; bot/1.0)'
    },
    {
      id: '2',
      type: 'proxy_detected',
      severity: 'medium',
      description: 'Proxy/VPN traffic detected',
      affectedCampaign: 'Crypto Platform Campaign',
      timestamp: new Date().toISOString(),
      status: 'investigating',
      ipAddress: '10.0.0.50'
    }
  ];

  private tenants: Tenant[] = [
    {
      id: '1',
      name: 'AdVantage Networks',
      domain: 'advantage-networks.com',
      logo: 'https://via.placeholder.com/150x50/3B82F6/FFFFFF?text=AdVantage',
      theme: {
        primaryColor: '#3B82F6',
        secondaryColor: '#10B981'
      },
      settings: {
        allowSelfRegistration: true,
        requireApproval: true,
        defaultPayoutTerms: 'Net-15'
      },
      createdAt: new Date().toISOString(),
      status: 'active',
      revenue: 45600,
      affiliates: 2340,
      admin: 'john@advantage.com'
    },
    {
      id: '2',
      name: 'Global CPA Hub',
      domain: 'globalcpahub.com',
      logo: 'https://via.placeholder.com/150x50/10B981/FFFFFF?text=GlobalCPA',
      theme: {
        primaryColor: '#10B981',
        secondaryColor: '#F97316'
      },
      settings: {
        allowSelfRegistration: false,
        requireApproval: true,
        defaultPayoutTerms: 'Net-30'
      },
      createdAt: new Date().toISOString(),
      status: 'active',
      revenue: 32100,
      affiliates: 1560,
      admin: 'sarah@globalcpa.com'
    }
  ];

  // Offers
  getOffers(): Offer[] {
    return [...this.offers];
  }

  addOffer(offer: Omit<Offer, 'id'>): Offer {
    const newOffer: Offer = {
      ...offer,
      id: Date.now().toString()
    };
    this.offers.push(newOffer);
    return newOffer;
  }

  updateOffer(id: string, updates: Partial<Offer>): Offer | null {
    const index = this.offers.findIndex(o => o.id === id);
    if (index !== -1) {
      this.offers[index] = { ...this.offers[index], ...updates };
      return this.offers[index];
    }
    return null;
  }

  deleteOffer(id: string): boolean {
    const index = this.offers.findIndex(o => o.id === id);
    if (index !== -1) {
      this.offers.splice(index, 1);
      return true;
    }
    return false;
  }

  // Affiliates
  getAffiliates(): Affiliate[] {
    return [...this.affiliates];
  }

  addAffiliate(affiliate: Omit<Affiliate, 'id'>): Affiliate {
    const newAffiliate: Affiliate = {
      ...affiliate,
      id: Date.now().toString(),
      totalEarnings: 0,
      conversions: 0,
      clicks: 0
    };
    this.affiliates.push(newAffiliate);
    return newAffiliate;
  }

  updateAffiliate(id: string, updates: Partial<Affiliate>): Affiliate | null {
    const index = this.affiliates.findIndex(a => a.id === id);
    if (index !== -1) {
      this.affiliates[index] = { ...this.affiliates[index], ...updates };
      return this.affiliates[index];
    }
    return null;
  }

  deleteAffiliate(id: string): boolean {
    const index = this.affiliates.findIndex(a => a.id === id);
    if (index !== -1) {
      this.affiliates.splice(index, 1);
      return true;
    }
    return false;
  }

  // Postbacks
  getPostbacks(): Postback[] {
    return [...this.postbacks];
  }

  addPostback(postback: Omit<Postback, 'id'>): Postback {
    const newPostback: Postback = {
      ...postback,
      id: Date.now().toString(),
      fireCount: 0
    };
    this.postbacks.push(newPostback);
    return newPostback;
  }

  updatePostback(id: string, updates: Partial<Postback>): Postback | null {
    const index = this.postbacks.findIndex(p => p.id === id);
    if (index !== -1) {
      this.postbacks[index] = { ...this.postbacks[index], ...updates };
      return this.postbacks[index];
    }
    return null;
  }

  deletePostback(id: string): boolean {
    const index = this.postbacks.findIndex(p => p.id === id);
    if (index !== -1) {
      this.postbacks.splice(index, 1);
      return true;
    }
    return false;
  }

  // Fraud Alerts
  getFraudAlerts(): FraudAlert[] {
    return [...this.fraudAlerts];
  }

  addFraudAlert(alert: Omit<FraudAlert, 'id'>): FraudAlert {
    const newAlert: FraudAlert = {
      ...alert,
      id: Date.now().toString()
    };
    this.fraudAlerts.push(newAlert);
    return newAlert;
  }

  // Tenants
  getTenants(): Tenant[] {
    return [...this.tenants];
  }

  addTenant(tenant: Omit<Tenant, 'id'>): Tenant {
    const newTenant: Tenant = {
      ...tenant,
      id: Date.now().toString()
    };
    this.tenants.push(newTenant);
    return newTenant;
  }

  updateTenant(id: string, updates: Partial<Tenant>): Tenant | null {
    const index = this.tenants.findIndex(t => t.id === id);
    if (index !== -1) {
      this.tenants[index] = { ...this.tenants[index], ...updates };
      return this.tenants[index];
    }
    return null;
  }

  // Analytics
  getAnalytics() {
    return {
      totalRevenue: 127450,
      totalClicks: 45620,
      totalConversions: 3420,
      activeAffiliates: 342,
      activeOffers: 156,
      conversionRate: 11.2,
      averageEPC: 2.67
    };
  }
}

export const dataStore = new DataStore();