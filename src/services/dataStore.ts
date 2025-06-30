import { Offer, Affiliate, Postback } from '../types';

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
      trackingUrl: 'https://track.affwish.com/click?offer_id=1&affiliate_id={affiliate_id}&click_id={click_id}',
      caps: { daily: 100, weekly: 500, monthly: 2000 },
      createdAt: new Date().toISOString(),
      conversionFlow: 'Registration + Email Verification',
      restrictions: 'No adult traffic, no incentivized traffic',
      globalPostbackEnabled: true,
      adminSettings: {
        requireApproval: false,
        scrubRate: 5,
        throttleRate: 10,
        autoApprove: true,
        holdPeriod: 7
      }
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
      trackingUrl: 'https://track.affwish.com/click?offer_id=2&affiliate_id={affiliate_id}&click_id={click_id}',
      caps: { daily: 50, weekly: 300, monthly: 1200 },
      createdAt: new Date().toISOString(),
      conversionFlow: 'Registration + KYC Verification + First Deposit',
      restrictions: 'Must be 18+, restricted countries apply',
      globalPostbackEnabled: true,
      adminSettings: {
        requireApproval: true,
        scrubRate: 8,
        throttleRate: 15,
        autoApprove: false,
        holdPeriod: 14
      }
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

  private postbacks: Postback[] = [];

  // Offers
  getOffers(): Offer[] {
    return [...this.offers];
  }

  addOffer(offer: Omit<Offer, 'id'>): Offer {
    const newOffer: Offer = {
      ...offer,
      id: Date.now().toString(),
      trackingUrl: `https://track.affwish.com/click?offer_id=${Date.now()}&affiliate_id={affiliate_id}&click_id={click_id}`
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
}

export const dataStore = new DataStore();