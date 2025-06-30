export interface PostbackConfig {
  name: string;
  url: string;
  method: 'GET' | 'POST';
  parameters: Record<string, string>;
}

class PostbackService {
  async testPostback(url: string, parameters: Record<string, string>): Promise<any> {
    const startTime = Date.now();
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));
    
    // Simulate occasional failures (5% failure rate)
    if (Math.random() < 0.05) {
      return {
        success: false,
        error: 'Network timeout',
        responseTime: Date.now() - startTime
      };
    }

    // Build test URL with parameters
    const testUrl = this.buildTestUrl(url, parameters);
    
    return {
      success: true,
      response: 'OK',
      responseTime: Date.now() - startTime,
      url: testUrl
    };
  }

  addPostbackConfig(config: PostbackConfig): PostbackConfig {
    // This is handled by apiService.createPostback, so just return the config
    console.log('Postback configuration added:', config.name);
    return config;
  }

  private buildTestUrl(baseUrl: string, params: Record<string, string>): string {
    // Replace test macros
    let processedUrl = baseUrl
      .replace(/{click_id}/g, 'test_click_123')
      .replace(/{affiliate_id}/g, 'test_affiliate_456')
      .replace(/{offer_id}/g, 'test_offer_789')
      .replace(/{conversion_value}/g, '25.00')
      .replace(/{timestamp}/g, new Date().toISOString());

    // Add parameters for GET request simulation
    if (Object.keys(params).length > 0) {
      const processedParams: Record<string, string> = {};
      for (const [key, value] of Object.entries(params)) {
        processedParams[key] = value
          .replace(/{click_id}/g, 'test_click_123')
          .replace(/{affiliate_id}/g, 'test_affiliate_456')
          .replace(/{offer_id}/g, 'test_offer_789')
          .replace(/{conversion_value}/g, '25.00')
          .replace(/{timestamp}/g, new Date().toISOString());
      }
      
      const urlParams = new URLSearchParams(processedParams);
      const separator = processedUrl.includes('?') ? '&' : '?';
      processedUrl = `${processedUrl}${separator}${urlParams.toString()}`;
    }

    return processedUrl;
  }
}

export const postbackService = new PostbackService();