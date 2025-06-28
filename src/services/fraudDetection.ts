export interface FraudCheckResult {
  score: number;
  risk: 'low' | 'medium' | 'high';
  reasons: string[];
  blocked: boolean;
  provider?: string;
  responseTime?: number;
}

export interface FraudProvider {
  name: string;
  enabled: boolean;
  apiKey?: string;
  endpoint?: string;
  threshold?: number;
}

class FraudDetectionService {
  private providers: FraudProvider[] = [
    { 
      name: 'IPQualityScore', 
      enabled: false,
      endpoint: 'https://ipqualityscore.com/api/json/ip',
      threshold: 75
    },
    { 
      name: 'Anura', 
      enabled: false,
      endpoint: 'https://api.anura.io/v1/direct',
      threshold: 70
    },
    { 
      name: 'FraudScore', 
      enabled: false,
      endpoint: 'https://api.fraudscore.io/v1/check',
      threshold: 80
    }
  ];

  private fraudRules = {
    maxClicksPerIP: 10,
    maxConversionsPerIP: 3,
    suspiciousUserAgents: ['bot', 'crawler', 'spider'],
    blockedCountries: ['XX', 'ZZ'],
    proxyDetection: true,
    vpnDetection: true
  };

  async checkIP(ip: string, provider?: string): Promise<FraudCheckResult> {
    const startTime = Date.now();
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300));

    const score = Math.random() * 100;
    const risk = score > 70 ? 'high' : score > 40 ? 'medium' : 'low';
    const reasons = [];

    // Simulate fraud detection logic
    if (score > 70) {
      reasons.push('High risk IP detected');
      if (Math.random() > 0.5) reasons.push('Proxy/VPN detected');
      if (Math.random() > 0.7) reasons.push('Bot activity detected');
    } else if (score > 40) {
      reasons.push('Moderate risk indicators');
      if (Math.random() > 0.6) reasons.push('Suspicious geolocation');
    }

    // Check against known patterns
    if (this.isKnownBadIP(ip)) {
      reasons.push('IP in blacklist');
    }

    return {
      score: Math.round(score),
      risk,
      reasons,
      blocked: risk === 'high',
      provider: provider || 'Internal',
      responseTime: Date.now() - startTime
    };
  }

  async checkClick(clickData: any): Promise<FraudCheckResult> {
    const { ip, userAgent, referrer, timestamp, affiliateId } = clickData;
    
    await new Promise(resolve => setTimeout(resolve, 150));

    let score = 0;
    const reasons = [];

    // User Agent Analysis
    if (userAgent) {
      const lowerUA = userAgent.toLowerCase();
      if (this.fraudRules.suspiciousUserAgents.some(bot => lowerUA.includes(bot))) {
        score += 40;
        reasons.push('Bot user agent detected');
      }
      
      if (lowerUA.length < 20) {
        score += 20;
        reasons.push('Suspicious user agent length');
      }
    } else {
      score += 30;
      reasons.push('Missing user agent');
    }

    // Referrer Analysis
    if (!referrer || referrer === '') {
      score += 15;
      reasons.push('Missing referrer');
    }

    // IP Analysis
    if (ip) {
      const ipCheck = await this.checkIP(ip);
      score += ipCheck.score * 0.3;
      reasons.push(...ipCheck.reasons);
    }

    // Time-based checks
    if (this.isRapidFire(timestamp, affiliateId)) {
      score += 25;
      reasons.push('Rapid click pattern detected');
    }

    const risk = score > 70 ? 'high' : score > 40 ? 'medium' : 'low';

    return {
      score: Math.round(score),
      risk,
      reasons,
      blocked: risk === 'high'
    };
  }

  async configureProvider(providerName: string, config: Partial<FraudProvider>): Promise<boolean> {
    const providerIndex = this.providers.findIndex(p => p.name === providerName);
    if (providerIndex !== -1) {
      this.providers[providerIndex] = { 
        ...this.providers[providerIndex], 
        ...config 
      };
      
      // Test the configuration
      if (config.enabled && config.apiKey) {
        try {
          await this.testProviderConnection(providerName);
          return true;
        } catch (error) {
          console.error(`Failed to configure ${providerName}:`, error);
          return false;
        }
      }
      return true;
    }
    return false;
  }

  private async testProviderConnection(providerName: string): Promise<boolean> {
    // Simulate API connection test
    await new Promise(resolve => setTimeout(resolve, 500));
    return Math.random() > 0.1; // 90% success rate for demo
  }

  private isKnownBadIP(ip: string): boolean {
    // Simulate checking against blacklist
    const badIPs = ['192.168.1.100', '10.0.0.50', '172.16.0.10'];
    return badIPs.includes(ip);
  }

  private isRapidFire(timestamp: string, affiliateId: string): boolean {
    // Simulate rapid fire detection
    return Math.random() > 0.8; // 20% chance for demo
  }

  getProviders(): FraudProvider[] {
    return [...this.providers];
  }

  updateFraudRules(rules: Partial<typeof this.fraudRules>): void {
    this.fraudRules = { ...this.fraudRules, ...rules };
  }

  getFraudRules() {
    return { ...this.fraudRules };
  }

  // Real-time monitoring
  async startMonitoring(): Promise<void> {
    console.log('Fraud monitoring started');
    // In production, this would start background monitoring
  }

  async stopMonitoring(): Promise<void> {
    console.log('Fraud monitoring stopped');
  }
}

export const fraudDetectionService = new FraudDetectionService();