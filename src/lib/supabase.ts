import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/database'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'X-Client-Info': 'affwish-network@1.0.0'
    }
  }
})

// Helper function to get current user profile
export const getCurrentUserProfile = async () => {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) {
      console.error('Error getting user:', userError)
      return null
    }
    
    if (!user) return null

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError) {
      console.error('Error getting profile:', profileError)
      return null
    }

    return profile
  } catch (error) {
    console.error('Error in getCurrentUserProfile:', error)
    return null
  }
}

// Helper function to check if user is admin
export const isAdmin = async () => {
  try {
    const profile = await getCurrentUserProfile()
    return profile?.role === 'admin'
  } catch (error) {
    console.error('Error checking admin status:', error)
    return false
  }
}

// Helper function to generate tracking URLs
export const generateTrackingUrl = (offerId: string, affiliateId: string, subId?: string) => {
  const baseUrl = 'https://track.affwish.com/click'
  let url = `${baseUrl}?offer_id=${offerId}&affiliate_id=${affiliateId}&click_id={click_id}`
  
  if (subId) {
    url += `&sub_id=${subId}`
  }
  
  return url
}

// Tracking software templates
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
  },
  linktrust: {
    name: 'LinkTrust',
    trackingUrl: 'https://track.affwish.com/click?offer_id={offer_id}&affiliate_id={affiliate_id}&click_id={click_id}&subid1={subid1}&subid2={subid2}&subid3={subid3}&subid4={subid4}&subid5={subid5}',
    postbackUrl: 'https://postback.affwish.com/conversion?click_id={click_id}&conversion_id={conversion_id}&payout={payout}&status={status}&offer_id={offer_id}&affiliate_id={affiliate_id}'
  },
  hitpath: {
    name: 'HitPath',
    trackingUrl: 'https://track.affwish.com/click?offer_id={offer_id}&affiliate_id={affiliate_id}&hit_id={hit_id}&var1={var1}&var2={var2}&var3={var3}&var4={var4}&var5={var5}',
    postbackUrl: 'https://postback.affwish.com/conversion?hit_id={hit_id}&conversion_id={conversion_id}&payout={payout}&status={status}&offer_id={offer_id}&affiliate_id={affiliate_id}'
  }
}

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
  },
  peerfly: {
    name: 'PeerFly',
    trackingUrl: 'https://track.affwish.com/click?offer_id={offer_id}&affiliate_id={affiliate_id}&pf_aid={pf_aid}&pf_sid={pf_sid}',
    postbackUrl: 'https://postback.affwish.com/conversion?pf_aid={pf_aid}&payout={payout}&status={status}&offer_id={offer_id}&affiliate_id={affiliate_id}'
  },
  cpalead: {
    name: 'CPALead',
    trackingUrl: 'https://track.affwish.com/click?offer_id={offer_id}&affiliate_id={affiliate_id}&cpl_id={cpl_id}&subid={subid}',
    postbackUrl: 'https://postback.affwish.com/conversion?cpl_id={cpl_id}&payout={payout}&status={status}&offer_id={offer_id}&affiliate_id={affiliate_id}'
  }
}

// Test connection function
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('profiles').select('count').limit(1)
    if (error) {
      console.error('Supabase connection test failed:', error)
      return false
    }
    console.log('Supabase connection successful')
    return true
  } catch (error) {
    console.error('Supabase connection test error:', error)
    return false
  }
}