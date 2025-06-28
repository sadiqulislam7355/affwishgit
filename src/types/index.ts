export type UserRole = 'super_admin' | 'admin' | 'affiliate' | 'advertiser' | 'manager';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  status: 'active' | 'pending' | 'suspended';
  tenant?: string;
  createdAt: string;
  lastLogin?: string;
  permissions?: string[];
}

export interface Tenant {
  id: string;
  name: string;
  domain: string;
  logo?: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
  };
  settings: {
    allowSelfRegistration: boolean;
    requireApproval: boolean;
    defaultPayoutTerms: string;
    globalPostbackUrl?: string;
    fraudDetection: {
      enabled: boolean;
      provider?: string;
      apiKey?: string;
      threshold: number;
    };
  };
  createdAt: string;
  status: 'active' | 'suspended';
  revenue?: number;
  affiliates?: number;
  admin?: string;
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
  adminSettings: {
    requireApproval: boolean;
    scrubRate: number; // 0-100%
    throttleRate: number; // 0-100%
    autoApprove: boolean;
    holdPeriod: number; // days
  };
  postbackUrl?: string;
  globalPostbackEnabled: boolean;
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
  payoutTerms: 'weekly' | 'biweekly' | 'monthly' | 'net15' | 'net30';
  minimumPayout: number;
  taxInfo?: {
    taxId?: string;
    w9Submitted?: boolean;
    taxRate?: number;
  };
}

export interface Click {
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
}

export interface Conversion {
  id: string;
  clickId: string;
  affiliateId: string;
  offerId: string;
  value: number;
  payout: number;
  status: 'pending' | 'approved' | 'rejected' | 'scrubbed';
  timestamp: string;
  approvedAt?: string;
  rejectedReason?: string;
  fraudScore?: number;
  adminNotes?: string;
  scrubbed: boolean;
  throttled: boolean;
}

export interface Campaign {
  id: string;
  name: string;
  offerId: string;
  affiliateId: string;
  status: 'active' | 'paused' | 'completed';
  clicks: number;
  conversions: number;
  revenue: number;
  epc: number;
  trackingUrl: string;
  createdAt: string;
}

export interface Analytics {
  period: string;
  clicks: number;
  conversions: number;
  revenue: number;
  epc: number;
  ctr: number;
  cvr: number;
}

export interface FraudAlert {
  id: string;
  type: 'suspicious_traffic' | 'bot_detected' | 'proxy_detected' | 'duplicate_conversion';
  severity: 'low' | 'medium' | 'high';
  description: string;
  affectedCampaign?: string;
  timestamp: string;
  status: 'open' | 'investigating' | 'resolved';
  ipAddress?: string;
  userAgent?: string;
}

export interface Postback {
  id: string;
  name: string;
  url: string;
  method: 'GET' | 'POST';
  parameters: Record<string, string>;
  status: 'active' | 'inactive';
  affiliateId?: string;
  offerId?: string;
  createdAt: string;
  lastFired?: string;
  fireCount: number;
  isGlobal: boolean;
  networkIntegration?: 'everflow' | 'hasoffers' | 'cake' | 'tune' | 'trackier' | 'cpabuild' | 'custom';
}

export interface Creative {
  id: string;
  name: string;
  type: 'banner' | 'video' | 'text' | 'landing_page';
  url: string;
  dimensions?: string;
  fileSize?: string;
  offerId: string;
  status: 'approved' | 'pending' | 'rejected';
  createdAt: string;
}

export interface Payout {
  id: string;
  affiliateId: string;
  amount: number;
  method: 'paypal' | 'bank' | 'crypto';
  status: 'pending' | 'approved' | 'paid' | 'rejected';
  requestedAt: string;
  processedAt?: string;
  notes?: string;
  payoutType: 'fixed' | 'revshare';
  revShareDetails?: {
    percentage: number;
    revenue: number;
  };
}

export interface FraudProvider {
  id: string;
  name: string;
  enabled: boolean;
  apiKey: string;
  endpoint: string;
  threshold: number;
  settings: Record<string, any>;
}

export interface NetworkIntegration {
  id: string;
  name: string;
  type: 'everflow' | 'hasoffers' | 'cake' | 'tune' | 'trackier' | 'cpabuild';
  apiUrl: string;
  apiKey: string;
  enabled: boolean;
  postbackUrl: string;
  settings: Record<string, any>;
}