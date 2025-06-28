export interface PayoutCalculation {
  affiliateId: string;
  period: string;
  totalRevenue: number;
  totalConversions: number;
  fixedPayouts: number;
  revSharePayouts: number;
  totalPayout: number;
  deductions: number;
  netPayout: number;
  payoutBreakdown: PayoutItem[];
}

export interface PayoutItem {
  offerId: string;
  offerName: string;
  conversions: number;
  payoutType: 'fixed' | 'revshare';
  rate: number; // Fixed amount or percentage
  revenue?: number; // For revshare
  totalPayout: number;
}

export interface PayoutRequest {
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

class PayoutService {
  private payoutRequests: PayoutRequest[] = [];
  private payoutHistory: PayoutCalculation[] = [];

  // Calculate payout for affiliate
  calculatePayout(affiliateId: string, startDate: string, endDate: string): PayoutCalculation {
    // Mock conversion data - in production, this would come from database
    const conversions = this.getMockConversions(affiliateId, startDate, endDate);
    
    let totalRevenue = 0;
    let totalConversions = 0;
    let fixedPayouts = 0;
    let revSharePayouts = 0;
    const payoutBreakdown: PayoutItem[] = [];

    // Group conversions by offer
    const offerGroups = conversions.reduce((groups, conversion) => {
      if (!groups[conversion.offerId]) {
        groups[conversion.offerId] = [];
      }
      groups[conversion.offerId].push(conversion);
      return groups;
    }, {} as Record<string, any[]>);

    // Calculate payouts for each offer
    Object.entries(offerGroups).forEach(([offerId, offerConversions]) => {
      const offer = this.getMockOffer(offerId);
      const conversionCount = offerConversions.length;
      const offerRevenue = offerConversions.reduce((sum, conv) => sum + conv.value, 0);
      
      totalConversions += conversionCount;
      totalRevenue += offerRevenue;

      let offerPayout = 0;

      if (offer.payoutType === 'RevShare') {
        // Revenue share calculation
        const percentage = offer.revSharePercentage || 50;
        offerPayout = (offerRevenue * percentage) / 100;
        revSharePayouts += offerPayout;
      } else {
        // Fixed payout calculation
        offerPayout = conversionCount * offer.payout;
        fixedPayouts += offerPayout;
      }

      payoutBreakdown.push({
        offerId,
        offerName: offer.name,
        conversions: conversionCount,
        payoutType: offer.payoutType === 'RevShare' ? 'revshare' : 'fixed',
        rate: offer.payoutType === 'RevShare' ? (offer.revSharePercentage || 50) : offer.payout,
        revenue: offer.payoutType === 'RevShare' ? offerRevenue : undefined,
        totalPayout: offerPayout
      });
    });

    const totalPayout = fixedPayouts + revSharePayouts;
    
    // Calculate deductions (taxes, fees, etc.)
    const deductions = this.calculateDeductions(affiliateId, totalPayout);
    const netPayout = totalPayout - deductions;

    const calculation: PayoutCalculation = {
      affiliateId,
      period: `${startDate} to ${endDate}`,
      totalRevenue,
      totalConversions,
      fixedPayouts,
      revSharePayouts,
      totalPayout,
      deductions,
      netPayout,
      payoutBreakdown
    };

    return calculation;
  }

  // Calculate deductions (taxes, fees, etc.)
  private calculateDeductions(affiliateId: string, totalPayout: number): number {
    // Mock deduction calculation
    const affiliate = this.getMockAffiliate(affiliateId);
    let deductions = 0;

    // Tax deduction
    if (affiliate.taxInfo?.taxRate) {
      deductions += (totalPayout * affiliate.taxInfo.taxRate) / 100;
    }

    // Processing fee (2% for example)
    deductions += totalPayout * 0.02;

    return Math.round(deductions * 100) / 100;
  }

  // Request payout
  async requestPayout(
    affiliateId: string, 
    amount: number, 
    method: 'paypal' | 'bank' | 'crypto',
    payoutType: 'fixed' | 'revshare' = 'fixed',
    revShareDetails?: { percentage: number; revenue: number }
  ): Promise<PayoutRequest> {
    const payoutRequest: PayoutRequest = {
      id: 'payout_' + Date.now(),
      affiliateId,
      amount,
      method,
      status: 'pending',
      requestedAt: new Date().toISOString(),
      payoutType,
      revShareDetails
    };

    this.payoutRequests.push(payoutRequest);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return payoutRequest;
  }

  // Approve payout
  async approvePayout(payoutId: string, notes?: string): Promise<boolean> {
    const payout = this.payoutRequests.find(p => p.id === payoutId);
    if (!payout) return false;

    payout.status = 'approved';
    payout.processedAt = new Date().toISOString();
    payout.notes = notes;

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return true;
  }

  // Reject payout
  async rejectPayout(payoutId: string, reason: string): Promise<boolean> {
    const payout = this.payoutRequests.find(p => p.id === payoutId);
    if (!payout) return false;

    payout.status = 'rejected';
    payout.processedAt = new Date().toISOString();
    payout.notes = reason;

    //Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return true;
  }

  // Mark payout as paid
  async markAsPaid(payoutId: string): Promise<boolean> {
    const payout = this.payoutRequests.find(p => p.id === payoutId);
    if (!payout) return false;

    payout.status = 'paid';
    if (!payout.processedAt) {
      payout.processedAt = new Date().toISOString();
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return true;
  }

  // Get payout requests
  getPayoutRequests(status?: string): PayoutRequest[] {
    if (status) {
      return this.payoutRequests.filter(p => p.status === status);
    }
    return [...this.payoutRequests];
  }

  // Get affiliate payout history
  getAffiliatePayoutHistory(affiliateId: string): PayoutRequest[] {
    return this.payoutRequests.filter(p => p.affiliateId === affiliateId);
  }

  // Get payout statistics
  getPayoutStats() {
    const totalRequests = this.payoutRequests.length;
    const pendingRequests = this.payoutRequests.filter(p => p.status === 'pending').length;
    const approvedRequests = this.payoutRequests.filter(p => p.status === 'approved').length;
    const paidRequests = this.payoutRequests.filter(p => p.status === 'paid').length;
    const rejectedRequests = this.payoutRequests.filter(p => p.status === 'rejected').length;
    
    const totalAmount = this.payoutRequests.reduce((sum, p) => sum + p.amount, 0);
    const paidAmount = this.payoutRequests
      .filter(p => p.status === 'paid')
      .reduce((sum, p) => sum + p.amount, 0);

    return {
      totalRequests,
      pendingRequests,
      approvedRequests,
      paidRequests,
      rejectedRequests,
      totalAmount,
      paidAmount
    };
  }

  // Mock data generators
  private getMockConversions(affiliateId: string, startDate: string, endDate: string) {
    // Generate mock conversions for the period
    const conversions = [];
    const conversionCount = Math.floor(Math.random() * 50) + 10;
    
    for (let i = 0; i < conversionCount; i++) {
      conversions.push({
        id: 'conv_' + i,
        offerId: ['offer_1', 'offer_2', 'offer_3'][Math.floor(Math.random() * 3)],
        value: Math.random() * 100 + 20,
        timestamp: new Date().toISOString()
      });
    }
    
    return conversions;
  }

  private getMockOffer(offerId: string) {
    const offers = {
      offer_1: {
        name: 'Dating App Install',
        payout: 25,
        payoutType: 'CPA',
        revSharePercentage: undefined
      },
      offer_2: {
        name: 'Crypto Trading Platform',
        payout: 0,
        payoutType: 'RevShare',
        revSharePercentage: 60
      },
      offer_3: {
        name: 'VPN Service Trial',
        payout: 15,
        payoutType: 'CPA',
        revSharePercentage: undefined
      }
    };
    
    return offers[offerId] || offers.offer_1;
  }

  private getMockAffiliate(affiliateId: string) {
    return {
      id: affiliateId,
      taxInfo: {
        taxRate: 10, // 10% tax rate
        w9Submitted: true
      }
    };
  }

  // Generate payout report
  generatePayoutReport(affiliateId: string, period: string): any {
    const calculation = this.calculatePayout(affiliateId, '2024-01-01', '2024-01-31');
    
    return {
      affiliate: this.getMockAffiliate(affiliateId),
      calculation,
      generatedAt: new Date().toISOString(),
      reportId: 'report_' + Date.now()
    };
  }
}

export const payoutService = new PayoutService();