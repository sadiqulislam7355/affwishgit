// MySQL Database Configuration and Utilities
// This file replaces Supabase with MySQL for cPanel compatibility

export interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

// Tracking software templates for offer creation
export const trackingSoftwareTemplates = {
  everflow: {
    name: 'Everflow',
    trackingUrl: 'https://track.affwish.com/click?offer_id={offer_id}&affiliate_id={affiliate_id}&click_id={click_id}&sub1={sub1}&sub2={sub2}&sub3={sub3}&sub4={sub4}&sub5={sub5}',
    postbackUrl: 'https://postback.affwish.com/conversion?click_id={click_id}&conversion_id={conversion_id}&payout={payout}&status={status}&offer_id={offer_id}&affiliate_id={affiliate_id}'
  },
  hasoffers: {
    name: 'HasOffers (Tune)',
    trackingUrl: 'https://track.affwish.com/click?offer_id={offer_id}&affiliate_id={affiliate_id}&transaction_id={transaction_id}&sub_id={sub_id}&sub_id2={sub_id2}&sub_id3={sub_id3}&sub_id4={sub_id4}&sub_id5={sub_id5}',
    postbackUrl: 'https://postback.affwish.com/conversion?transaction_id={transaction_id}&offer_id={offer_id}&affiliate_id={affiliate_id}&payout={payout}&status_code={status_code}&conversion_id={conversion_id}'
  },
  affise: {
    name: 'Affise',
    trackingUrl: 'https://track.affwish.com/click?offer_id={offer_id}&affiliate_id={affiliate_id}&click_id={clickid}&sub1={sub1}&sub2={sub2}&sub3={sub3}&sub4={sub4}&sub5={sub5}',
    postbackUrl: 'https://postback.affwish.com/conversion?clickid={clickid}&goal_id={goal_id}&sum={sum}&status={status}&offer_id={offer_id}&affiliate_id={affiliate_id}'
  },
  trackier: {
    name: 'Trackier',
    trackingUrl: 'https://track.affwish.com/click?offer_id={offer_id}&affiliate_id={affiliate_id}&click_id={click_id}&p1={p1}&p2={p2}&p3={p3}&p4={p4}&p5={p5}',
    postbackUrl: 'https://postback.affwish.com/conversion?click_id={click_id}&event_id={event_id}&payout={payout}&status={status}&offer_id={offer_id}&affiliate_id={affiliate_id}'
  },
  voluum: {
    name: 'Voluum',
    trackingUrl: 'https://track.affwish.com/click?offer_id={offer_id}&affiliate_id={affiliate_id}&cid={cid}&var1={var1}&var2={var2}&var3={var3}&var4={var4}&var5={var5}',
    postbackUrl: 'https://postback.affwish.com/conversion?cid={cid}&txid={txid}&payout={payout}&et={et}&offer_id={offer_id}&affiliate_id={affiliate_id}'
  },
  cake: {
    name: 'CAKE',
    trackingUrl: 'https://track.affwish.com/click?offer_id={offer_id}&affiliate_id={affiliate_id}&transaction_id={transaction_id}&s1={s1}&s2={s2}&s3={s3}&s4={s4}&s5={s5}',
    postbackUrl: 'https://postback.affwish.com/conversion?transaction_id={transaction_id}&offer_id={offer_id}&affiliate_id={affiliate_id}&received_amount={received_amount}&disposition={disposition}'
  }
};

// CPA Network templates
export const cpaNetworkTemplates = {
  adbluemedia: {
    name: 'AdBlue Media',
    trackingUrl: 'https://track.affwish.com/click?offer_id={offer_id}&affiliate_id={affiliate_id}&click_id={click_id}&source={source}&campaign={campaign}',
    postbackUrl: 'https://postback.affwish.com/conversion?click_id={click_id}&payout={payout}&status={status}&offer_id={offer_id}&affiliate_id={affiliate_id}'
  },
  maxbounty: {
    name: 'MaxBounty',
    trackingUrl: 'https://track.affwish.com/click?offer_id={offer_id}&affiliate_id={affiliate_id}&mb_adid={mb_adid}&source={source}',
    postbackUrl: 'https://postback.affwish.com/conversion?mb_adid={mb_adid}&payout={payout}&status={status}&offer_id={offer_id}&affiliate_id={affiliate_id}'
  },
  clickbooth: {
    name: 'ClickBooth',
    trackingUrl: 'https://track.affwish.com/click?offer_id={offer_id}&affiliate_id={affiliate_id}&cb_aid={cb_aid}&cb_sid={cb_sid}',
    postbackUrl: 'https://postback.affwish.com/conversion?cb_aid={cb_aid}&payout={payout}&status={status}&offer_id={offer_id}&affiliate_id={affiliate_id}'
  }
};

// Helper function to generate tracking URLs
export const generateTrackingUrl = (offerId: string, affiliateId: string, subId?: string) => {
  const baseUrl = 'https://track.affwish.com/click';
  let url = `${baseUrl}?offer_id=${offerId}&affiliate_id=${affiliateId}&click_id={click_id}`;
  
  if (subId) {
    url += `&sub_id=${subId}`;
  }
  
  return url;
};

// Test connection function (placeholder for MySQL connection test)
export const testDatabaseConnection = async () => {
  try {
    // In production, this would test the MySQL connection
    console.log('Database connection test - would connect to MySQL');
    return true;
  } catch (error) {
    console.error('Database connection test failed:', error);
    return false;
  }
};

// Helper function to get current user profile (mock implementation)
export const getCurrentUserProfile = async () => {
  // This would be replaced with actual MySQL query in production
  const mockUser = localStorage.getItem('currentUser');
  return mockUser ? JSON.parse(mockUser) : null;
};

// Helper function to check if user is admin
export const isAdmin = async () => {
  try {
    const profile = await getCurrentUserProfile();
    return profile?.role === 'admin';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};