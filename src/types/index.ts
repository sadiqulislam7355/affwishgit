export type UserRole = 'admin' | 'affiliate';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'pending' | 'suspended';
  createdAt: string;
  lastLogin?: string;
}

export interface Offer {
  id: string;
  name: string;
  description: string;
  advertiser: string;
  advertiserId: string;
  payout: number;
  payoutType: 'CPA' | 'CPI' | 'CPL' | 'RevShare';
  revSharePercentage?: number;
  category: string;
  status: 'active' | 'paused' | 'expired';
  countries: string[];
  devices: string[];
  trafficSources: string[];
  url: string;
  previewUrl?: string;
  trackingUrl?: string;
  caps: {
    daily?: number;
    weekly?: number;
    monthly?: number;
  };
  createdAt: string;
  expiresAt?: string;
  conversionFlow: string;
  restrictions?: string;
  postbackUrl?: string;
  globalPostbackEnabled: boolean;
  adminSettings?: {
    requireApproval: boolean;
    scrubRate: number;
    throttleRate: number;
    autoApprove: boolean;
    holdPeriod: number;
  };
}

export interface Affiliate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  country: string;
  paymentMethod: 'paypal' | 'bank' | 'crypto' | 'check';
  paymentDetails: string;
  trafficSources: string[];
  experience: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  status: 'active' | 'pending' | 'suspended';
  createdAt: string;
  notes?: string;
  totalEarnings: number;
  conversions: number;
  clicks: number;
}

export interface SmartLink {
  id: string;
  name: string;
  url: string;
  shortUrl: string;
  status: 'active' | 'paused';
  offers: string[];
  clicks: number;
  conversions: number;
  revenue: number;
  cvr: number;
  epc: number;
  countries: string[];
  devices: string[];
  createdAt: string;
}

export interface Postback {
  id: string;
  name: string;
  url: string;
  method: 'GET' | 'POST';
  parameters: Record<string, string>;
  status: 'active' | 'inactive';
  createdAt: string;
  fireCount: number;
}