import { apiService } from './api';

export interface FraudCheckResult {
  isBlocked: boolean;
  fraudScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  reasons: string[];
  provider: string;
}

class FraudService {
  async checkIP(ipAddress: string): Promise<FraudCheckResult> {
    try {
      const response = await apiService.checkFraud(ipAddress);
      
      if (!response.success || !response.data) {
        // Return safe default if fraud check fails
        return {
          isBlocked: false,
          fraudScore: 0,
          riskLevel: 'low',
          reasons: [],
          provider: 'none'
        };
      }

      const data = response.data;
      
      return {
        isBlocked: data.fraud_score > 75,
        fraudScore: data.fraud_score || 0,
        riskLevel: this.getRiskLevel(data.fraud_score || 0),
        reasons: this.extractReasons(data),
        provider: 'ipqualityscore'
      };
    } catch (error) {
      console.error('Fraud check failed:', error);
      
      // Return safe default on error
      return {
        isBlocked: false,
        fraudScore: 0,
        riskLevel: 'low',
        reasons: ['check_failed'],
        provider: 'error'
      };
    }
  }

  private getRiskLevel(score: number): 'low' | 'medium' | 'high' {
    if (score > 75) return 'high';
    if (score > 50) return 'medium';
    return 'low';
  }

  private extractReasons(data: any): string[] {
    const reasons: string[] = [];
    
    if (data.proxy) reasons.push('proxy');
    if (data.vpn) reasons.push('vpn');
    if (data.tor) reasons.push('tor');
    if (data.recent_abuse) reasons.push('recent_abuse');
    if (data.bot_status) reasons.push('bot');
    if (data.mobile) reasons.push('mobile');
    
    return reasons;
  }

  async isIPBlocked(ipAddress: string): Promise<boolean> {
    const result = await this.checkIP(ipAddress);
    return result.isBlocked;
  }

  async logFraudAttempt(ipAddress: string, reason: string): Promise<void> {
    try {
      await apiService.trackClick({
        click_id: `fraud_${Date.now()}`,
        ip_address: ipAddress,
        is_fraud: true,
        fraud_score: 100,
        created_at: new Date().toISOString()
      });
    } catch (error) {
      console.error('Failed to log fraud attempt:', error);
    }
  }
}

export const fraudService = new FraudService();