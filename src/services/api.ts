import { dataStore } from './dataStore';
import { Offer, Affiliate, Postback } from '../types';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

class ApiService {
  private delay(ms: number = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Authentication
  async login(email: string, password: string): Promise<ApiResponse<any>> {
    await this.delay();
    return {
      success: true,
      data: { token: 'demo-token', user: { email } },
      message: 'Login successful'
    };
  }

  // Offers
  async getOffers(): Promise<ApiResponse<Offer[]>> {
    await this.delay();
    return {
      success: true,
      data: dataStore.getOffers(),
      message: 'Offers retrieved successfully'
    };
  }

  async createOffer(offerData: Omit<Offer, 'id'>): Promise<ApiResponse<Offer>> {
    await this.delay();
    const offer = dataStore.addOffer(offerData);
    return {
      success: true,
      data: offer,
      message: 'Offer created successfully'
    };
  }

  async updateOffer(id: string, offerData: Partial<Offer>): Promise<ApiResponse<Offer>> {
    await this.delay();
    const offer = dataStore.updateOffer(id, offerData);
    if (offer) {
      return {
        success: true,
        data: offer,
        message: 'Offer updated successfully'
      };
    }
    return {
      success: false,
      data: null as any,
      message: 'Offer not found'
    };
  }

  async deleteOffer(id: string): Promise<ApiResponse<boolean>> {
    await this.delay();
    const success = dataStore.deleteOffer(id);
    return {
      success,
      data: success,
      message: success ? 'Offer deleted successfully' : 'Offer not found'
    };
  }

  // Affiliates
  async getAffiliates(): Promise<ApiResponse<Affiliate[]>> {
    await this.delay();
    return {
      success: true,
      data: dataStore.getAffiliates(),
      message: 'Affiliates retrieved successfully'
    };
  }

  async createAffiliate(affiliateData: Omit<Affiliate, 'id'>): Promise<ApiResponse<Affiliate>> {
    await this.delay();
    const affiliate = dataStore.addAffiliate(affiliateData);
    return {
      success: true,
      data: affiliate,
      message: 'Affiliate created successfully'
    };
  }

  // Postbacks
  async createPostback(postbackData: Omit<Postback, 'id'>): Promise<ApiResponse<Postback>> {
    await this.delay();
    const postback = dataStore.addPostback(postbackData);
    return {
      success: true,
      data: postback,
      message: 'Postback created successfully'
    };
  }
}

export const apiService = new ApiService();