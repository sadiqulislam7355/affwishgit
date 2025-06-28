export interface PostbackEvent {
  id: string;
  type: 'conversion' | 'click' | 'lead';
  affiliateId: string;
  offerId: string;
  clickId: string;
  conversionValue?: number;
  timestamp: string;
  data: Record<string, any>;
}

export interface PostbackConfig {
  id: string;
  name: string;
  url: string;
  method: 'GET' | 'POST';
  parameters: Record<string, string>;
  status: 'active' | 'inactive';
  affiliateId?: string;
  offerId?: string;
  retryAttempts: number;
  timeout: number;
}

class PostbackService {
  private queue: PostbackEvent[] = [];
  private processing = false;
  private configs: PostbackConfig[] = [];

  async firePostback(config: PostbackConfig, event: PostbackEvent): Promise<any> {
    const startTime = Date.now();
    
    try {
      // Replace macros in URL and parameters
      const processedUrl = this.replaceMacros(config.url, event);
      const processedParams = this.replaceParamMacros(config.parameters, event);

      // Build final URL with parameters
      const finalUrl = this.buildFinalUrl(processedUrl, processedParams, config.method);
      
      console.log(`Firing postback: ${config.name}`, {
        url: finalUrl,
        method: config.method,
        event: event.type
      });

      // Simulate HTTP request
      await this.makeHttpRequest(finalUrl, config.method, processedParams);
      
      const responseTime = Date.now() - startTime;
      
      return { 
        success: true, 
        response: 'OK', 
        responseTime,
        url: finalUrl
      };
    } catch (error) {
      console.error('Postback failed:', error);
      return { 
        success: false, 
        error: error.message,
        responseTime: Date.now() - startTime
      };
    }
  }

  private async makeHttpRequest(url: string, method: string, params: Record<string, string>): Promise<any> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));
    
    // Simulate occasional failures (5% failure rate)
    if (Math.random() < 0.05) {
      throw new Error('Network timeout');
    }

    // In production, make actual HTTP request
    if (method === 'GET') {
      // GET request simulation
      return { status: 200, data: 'OK' };
    } else {
      // POST request simulation
      return { status: 200, data: 'OK' };
    }
  }

  private buildFinalUrl(baseUrl: string, params: Record<string, string>, method: string): string {
    if (method === 'GET' && Object.keys(params).length > 0) {
      const urlParams = new URLSearchParams(params);
      const separator = baseUrl.includes('?') ? '&' : '?';
      return `${baseUrl}${separator}${urlParams.toString()}`;
    }
    return baseUrl;
  }

  private replaceMacros(text: string, event: PostbackEvent): string {
    return text
      .replace(/{click_id}/g, event.clickId)
      .replace(/{affiliate_id}/g, event.affiliateId)
      .replace(/{offer_id}/g, event.offerId)
      .replace(/{conversion_value}/g, event.conversionValue?.toString() || '0')
      .replace(/{timestamp}/g, event.timestamp)
      .replace(/{ip_address}/g, event.data.ipAddress || '')
      .replace(/{user_agent}/g, event.data.userAgent || '')
      .replace(/{country}/g, event.data.country || '')
      .replace(/{device}/g, event.data.device || '')
      .replace(/{source}/g, event.data.source || '');
  }

  private replaceParamMacros(params: Record<string, string>, event: PostbackEvent): Record<string, string> {
    const processed: Record<string, string> = {};
    for (const [key, value] of Object.entries(params)) {
      processed[key] = this.replaceMacros(value, event);
    }
    return processed;
  }

  async queuePostback(event: PostbackEvent): Promise<void> {
    this.queue.push(event);
    console.log(`Postback queued for ${event.type} event:`, event.id);
    
    if (!this.processing) {
      this.processQueue();
    }
  }

  private async processQueue(): Promise<void> {
    this.processing = true;
    console.log('Processing postback queue...');
    
    while (this.queue.length > 0) {
      const event = this.queue.shift();
      if (event) {
        const configs = await this.getPostbacksForEvent(event);
        
        for (const config of configs) {
          if (config.status === 'active') {
            const result = await this.firePostback(config, event);
            
            if (!result.success && config.retryAttempts > 0) {
              // Retry logic
              await this.retryPostback(config, event, config.retryAttempts);
            }
          }
        }
      }
    }
    
    this.processing = false;
    console.log('Postback queue processing completed');
  }

  private async retryPostback(config: PostbackConfig, event: PostbackEvent, attemptsLeft: number): Promise<void> {
    if (attemptsLeft <= 0) return;

    console.log(`Retrying postback ${config.name}, attempts left: ${attemptsLeft}`);
    
    // Wait before retry (exponential backoff)
    const delay = Math.pow(2, config.retryAttempts - attemptsLeft) * 1000;
    await new Promise(resolve => setTimeout(resolve, delay));
    
    const result = await this.firePostback(config, event);
    
    if (!result.success) {
      await this.retryPostback(config, event, attemptsLeft - 1);
    }
  }

  private async getPostbacksForEvent(event: PostbackEvent): Promise<PostbackConfig[]> {
    // Filter postbacks based on event criteria
    return this.configs.filter(config => {
      if (config.affiliateId && config.affiliateId !== event.affiliateId) return false;
      if (config.offerId && config.offerId !== event.offerId) return false;
      return true;
    });
  }

  async testPostback(url: string, parameters: Record<string, string>): Promise<any> {
    const testEvent: PostbackEvent = {
      id: 'test_' + Date.now(),
      type: 'conversion',
      affiliateId: 'test_affiliate_123',
      offerId: 'test_offer_456',
      clickId: 'test_click_' + Date.now(),
      conversionValue: 25.00,
      timestamp: new Date().toISOString(),
      data: {
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0 (Test Browser)',
        country: 'US',
        device: 'Desktop',
        source: 'Test'
      }
    };

    const testConfig: PostbackConfig = {
      id: 'test_config',
      name: 'Test Postback',
      url,
      method: 'GET',
      parameters,
      status: 'active',
      retryAttempts: 0,
      timeout: 5000
    };

    return this.firePostback(testConfig, testEvent);
  }

  addPostbackConfig(config: Omit<PostbackConfig, 'id'>): PostbackConfig {
    const newConfig: PostbackConfig = {
      ...config,
      id: Date.now().toString(),
      retryAttempts: config.retryAttempts || 3,
      timeout: config.timeout || 5000
    };
    
    this.configs.push(newConfig);
    console.log('Postback configuration added:', newConfig.name);
    
    return newConfig;
  }

  updatePostbackConfig(id: string, updates: Partial<PostbackConfig>): PostbackConfig | null {
    const index = this.configs.findIndex(c => c.id === id);
    if (index !== -1) {
      this.configs[index] = { ...this.configs[index], ...updates };
      return this.configs[index];
    }
    return null;
  }

  deletePostbackConfig(id: string): boolean {
    const index = this.configs.findIndex(c => c.id === id);
    if (index !== -1) {
      this.configs.splice(index, 1);
      return true;
    }
    return false;
  }

  getPostbackConfigs(): PostbackConfig[] {
    return [...this.configs];
  }

  // Simulate conversion event
  async simulateConversion(affiliateId: string, offerId: string, conversionValue?: number): Promise<void> {
    const event: PostbackEvent = {
      id: 'conv_' + Date.now(),
      type: 'conversion',
      affiliateId,
      offerId,
      clickId: 'click_' + Date.now(),
      conversionValue: conversionValue || Math.random() * 100,
      timestamp: new Date().toISOString(),
      data: {
        ipAddress: '192.168.1.' + Math.floor(Math.random() * 255),
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        country: ['US', 'CA', 'UK', 'AU'][Math.floor(Math.random() * 4)],
        device: ['Desktop', 'Mobile', 'Tablet'][Math.floor(Math.random() * 3)],
        source: 'organic'
      }
    };

    await this.queuePostback(event);
  }

  // Get postback statistics
  getStatistics() {
    return {
      totalConfigs: this.configs.length,
      activeConfigs: this.configs.filter(c => c.status === 'active').length,
      queueLength: this.queue.length,
      processing: this.processing
    };
  }
}

export const postbackService = new PostbackService();