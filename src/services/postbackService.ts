export interface PostbackConfig {
  name: string;
  url: string;
  method: 'GET' | 'POST';
  parameters: Record<string, string>;
  status: 'active' | 'inactive';
  createdAt: string;
  fireCount: number;
}

export interface PostbackTestResult {
  success: boolean;
  responseTime?: number;
  error?: string;
  url?: string;
}

class PostbackService {
  private configs: PostbackConfig[] = [];

  addPostbackConfig(config: PostbackConfig) {
    this.configs.push(config);
  }

  async testPostback(url: string, parameters: Record<string, string> = {}): Promise<PostbackTestResult> {
    const startTime = Date.now();
    
    try {
      // Build URL with parameters
      const urlObj = new URL(url);
      Object.entries(parameters).forEach(([key, value]) => {
        urlObj.searchParams.set(key, value);
      });
      
      const testUrl = urlObj.toString();
      
      // Make the request
      const response = await fetch(testUrl, {
        method: 'GET',
        headers: {
          'User-Agent': 'AFFWISH-Postback-Test/1.0'
        }
      });
      
      const responseTime = Date.now() - startTime;
      
      return {
        success: response.ok,
        responseTime,
        url: testUrl
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        url
      };
    }
  }

  async firePostback(config: PostbackConfig, data: Record<string, any>): Promise<boolean> {
    try {
      const url = new URL(config.url);
      
      // Replace macros in parameters
      const processedParams = this.replaceMacros(config.parameters, data);
      
      // Add parameters to URL
      Object.entries(processedParams).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
      
      const method = config.method || 'GET';
      const requestOptions: RequestInit = {
        method,
        headers: {
          'User-Agent': 'AFFWISH-Network/1.0'
        }
      };
      
      if (method === 'POST') {
        requestOptions.body = JSON.stringify(processedParams);
        requestOptions.headers = {
          ...requestOptions.headers,
          'Content-Type': 'application/json'
        };
      }
      
      const response = await fetch(url.toString(), requestOptions);
      return response.ok;
    } catch (error) {
      console.error('Postback failed:', error);
      return false;
    }
  }

  private replaceMacros(parameters: Record<string, string>, data: Record<string, any>): Record<string, string> {
    const result: Record<string, string> = {};
    
    Object.entries(parameters).forEach(([key, value]) => {
      let processedValue = value;
      
      // Replace common macros
      const macros = {
        '{click_id}': data.clickId || '',
        '{affiliate_id}': data.affiliateId || '',
        '{offer_id}': data.offerId || '',
        '{conversion_value}': data.conversionValue || '',
        '{payout}': data.payout || '',
        '{status}': data.status || '',
        '{timestamp}': data.timestamp || Date.now().toString(),
        '{ip_address}': data.ipAddress || '',
        '{user_agent}': data.userAgent || '',
        '{country}': data.country || ''
      };
      
      Object.entries(macros).forEach(([macro, replacement]) => {
        processedValue = processedValue.replace(new RegExp(macro.replace(/[{}]/g, '\\$&'), 'g'), replacement);
      });
      
      result[key] = processedValue;
    });
    
    return result;
  }

  getConfigs(): PostbackConfig[] {
    return [...this.configs];
  }

  removeConfig(name: string): boolean {
    const index = this.configs.findIndex(config => config.name === name);
    if (index > -1) {
      this.configs.splice(index, 1);
      return true;
    }
    return false;
  }
}

export const postbackService = new PostbackService();