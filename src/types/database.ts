export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          role: 'admin' | 'affiliate'
          status: 'active' | 'pending' | 'suspended' | 'banned'
          company: string | null
          website: string | null
          phone: string | null
          country: string | null
          address: string | null
          city: string | null
          zip_code: string | null
          timezone: string | null
          payment_method: 'paypal' | 'bank' | 'crypto' | 'check' | null
          payment_details: Json | null
          traffic_sources: string[] | null
          experience_level: string | null
          bio: string | null
          avatar_url: string | null
          email_verified: boolean | null
          created_at: string | null
          updated_at: string | null
          last_login: string | null
        }
        Insert: {
          id: string
          email: string
          full_name: string
          role?: 'admin' | 'affiliate'
          status?: 'active' | 'pending' | 'suspended' | 'banned'
          company?: string | null
          website?: string | null
          phone?: string | null
          country?: string | null
          address?: string | null
          city?: string | null
          zip_code?: string | null
          timezone?: string | null
          payment_method?: 'paypal' | 'bank' | 'crypto' | 'check' | null
          payment_details?: Json | null
          traffic_sources?: string[] | null
          experience_level?: string | null
          bio?: string | null
          avatar_url?: string | null
          email_verified?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          last_login?: string | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          role?: 'admin' | 'affiliate'
          status?: 'active' | 'pending' | 'suspended' | 'banned'
          company?: string | null
          website?: string | null
          phone?: string | null
          country?: string | null
          address?: string | null
          city?: string | null
          zip_code?: string | null
          timezone?: string | null
          payment_method?: 'paypal' | 'bank' | 'crypto' | 'check' | null
          payment_details?: Json | null
          traffic_sources?: string[] | null
          experience_level?: string | null
          bio?: string | null
          avatar_url?: string | null
          email_verified?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          last_login?: string | null
        }
      }
      offers: {
        Row: {
          id: string
          name: string
          description: string | null
          advertiser: string
          advertiser_id: string | null
          payout: number
          payout_type: 'CPA' | 'CPI' | 'CPL' | 'RevShare'
          rev_share_percentage: number | null
          category: string
          status: 'active' | 'paused' | 'expired'
          countries: string[] | null
          devices: string[] | null
          traffic_sources: string[] | null
          offer_url: string
          preview_url: string | null
          tracking_url: string | null
          postback_url: string | null
          global_postback_enabled: boolean | null
          caps: Json | null
          restrictions: string | null
          conversion_flow: string | null
          expires_at: string | null
          require_approval: boolean | null
          scrub_rate: number | null
          throttle_rate: number | null
          auto_approve: boolean | null
          hold_period: number | null
          created_by: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          advertiser: string
          advertiser_id?: string | null
          payout: number
          payout_type?: 'CPA' | 'CPI' | 'CPL' | 'RevShare'
          rev_share_percentage?: number | null
          category: string
          status?: 'active' | 'paused' | 'expired'
          countries?: string[] | null
          devices?: string[] | null
          traffic_sources?: string[] | null
          offer_url: string
          preview_url?: string | null
          tracking_url?: string | null
          postback_url?: string | null
          global_postback_enabled?: boolean | null
          caps?: Json | null
          restrictions?: string | null
          conversion_flow?: string | null
          expires_at?: string | null
          require_approval?: boolean | null
          scrub_rate?: number | null
          throttle_rate?: number | null
          auto_approve?: boolean | null
          hold_period?: number | null
          created_by?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          advertiser?: string
          advertiser_id?: string | null
          payout?: number
          payout_type?: 'CPA' | 'CPI' | 'CPL' | 'RevShare'
          rev_share_percentage?: number | null
          category?: string
          status?: 'active' | 'paused' | 'expired'
          countries?: string[] | null
          devices?: string[] | null
          traffic_sources?: string[] | null
          offer_url?: string
          preview_url?: string | null
          tracking_url?: string | null
          postback_url?: string | null
          global_postback_enabled?: boolean | null
          caps?: Json | null
          restrictions?: string | null
          conversion_flow?: string | null
          expires_at?: string | null
          require_approval?: boolean | null
          scrub_rate?: number | null
          throttle_rate?: number | null
          auto_approve?: boolean | null
          hold_period?: number | null
          created_by?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      affiliates: {
        Row: {
          id: string
          user_id: string | null
          affiliate_id: string
          manager_id: string | null
          notes: string | null
          tags: string[] | null
          total_earnings: number | null
          total_clicks: number | null
          total_conversions: number | null
          conversion_rate: number | null
          epc: number | null
          last_activity: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          affiliate_id: string
          manager_id?: string | null
          notes?: string | null
          tags?: string[] | null
          total_earnings?: number | null
          total_clicks?: number | null
          total_conversions?: number | null
          conversion_rate?: number | null
          epc?: number | null
          last_activity?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          affiliate_id?: string
          manager_id?: string | null
          notes?: string | null
          tags?: string[] | null
          total_earnings?: number | null
          total_clicks?: number | null
          total_conversions?: number | null
          conversion_rate?: number | null
          epc?: number | null
          last_activity?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      postbacks: {
        Row: {
          id: string
          name: string
          url: string
          method: string | null
          parameters: Json | null
          headers: Json | null
          status: string | null
          offer_id: string | null
          created_by: string | null
          fire_count: number | null
          last_fired: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          url: string
          method?: string | null
          parameters?: Json | null
          headers?: Json | null
          status?: string | null
          offer_id?: string | null
          created_by?: string | null
          fire_count?: number | null
          last_fired?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          url?: string
          method?: string | null
          parameters?: Json | null
          headers?: Json | null
          status?: string | null
          offer_id?: string | null
          created_by?: string | null
          fire_count?: number | null
          last_fired?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      clicks: {
        Row: {
          id: string
          click_id: string
          offer_id: string | null
          affiliate_id: string | null
          ip_address: string | null
          user_agent: string | null
          country: string | null
          device: string | null
          browser: string | null
          os: string | null
          referrer: string | null
          landing_page: string | null
          sub_id: string | null
          sub_id_2: string | null
          sub_id_3: string | null
          sub_id_4: string | null
          sub_id_5: string | null
          fraud_score: number | null
          is_fraud: boolean | null
          is_converted: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          click_id: string
          offer_id?: string | null
          affiliate_id?: string | null
          ip_address?: string | null
          user_agent?: string | null
          country?: string | null
          device?: string | null
          browser?: string | null
          os?: string | null
          referrer?: string | null
          landing_page?: string | null
          sub_id?: string | null
          sub_id_2?: string | null
          sub_id_3?: string | null
          sub_id_4?: string | null
          sub_id_5?: string | null
          fraud_score?: number | null
          is_fraud?: boolean | null
          is_converted?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          click_id?: string
          offer_id?: string | null
          affiliate_id?: string | null
          ip_address?: string | null
          user_agent?: string | null
          country?: string | null
          device?: string | null
          browser?: string | null
          os?: string | null
          referrer?: string | null
          landing_page?: string | null
          sub_id?: string | null
          sub_id_2?: string | null
          sub_id_3?: string | null
          sub_id_4?: string | null
          sub_id_5?: string | null
          fraud_score?: number | null
          is_fraud?: boolean | null
          is_converted?: boolean | null
          created_at?: string | null
        }
      }
      conversions: {
        Row: {
          id: string
          conversion_id: string
          click_id: string | null
          offer_id: string | null
          affiliate_id: string | null
          payout: number
          revenue: number | null
          status: 'pending' | 'approved' | 'rejected' | 'held' | null
          conversion_value: number | null
          currency: string | null
          transaction_id: string | null
          customer_id: string | null
          ip_address: string | null
          user_agent: string | null
          postback_sent: boolean | null
          postback_response: string | null
          approved_at: string | null
          approved_by: string | null
          rejection_reason: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          conversion_id: string
          click_id?: string | null
          offer_id?: string | null
          affiliate_id?: string | null
          payout: number
          revenue?: number | null
          status?: 'pending' | 'approved' | 'rejected' | 'held' | null
          conversion_value?: number | null
          currency?: string | null
          transaction_id?: string | null
          customer_id?: string | null
          ip_address?: string | null
          user_agent?: string | null
          postback_sent?: boolean | null
          postback_response?: string | null
          approved_at?: string | null
          approved_by?: string | null
          rejection_reason?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          conversion_id?: string
          click_id?: string | null
          offer_id?: string | null
          affiliate_id?: string | null
          payout?: number
          revenue?: number | null
          status?: 'pending' | 'approved' | 'rejected' | 'held' | null
          conversion_value?: number | null
          currency?: string | null
          transaction_id?: string | null
          customer_id?: string | null
          ip_address?: string | null
          user_agent?: string | null
          postback_sent?: boolean | null
          postback_response?: string | null
          approved_at?: string | null
          approved_by?: string | null
          rejection_reason?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      payments: {
        Row: {
          id: string
          affiliate_id: string | null
          amount: number
          currency: string | null
          payment_method: 'paypal' | 'bank' | 'crypto' | 'check'
          payment_details: Json | null
          status: string | null
          reference_id: string | null
          transaction_id: string | null
          period_start: string | null
          period_end: string | null
          notes: string | null
          processed_at: string | null
          processed_by: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          affiliate_id?: string | null
          amount: number
          currency?: string | null
          payment_method: 'paypal' | 'bank' | 'crypto' | 'check'
          payment_details?: Json | null
          status?: string | null
          reference_id?: string | null
          transaction_id?: string | null
          period_start?: string | null
          period_end?: string | null
          notes?: string | null
          processed_at?: string | null
          processed_by?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          affiliate_id?: string | null
          amount?: number
          currency?: string | null
          payment_method?: 'paypal' | 'bank' | 'crypto' | 'check'
          payment_details?: Json | null
          status?: string | null
          reference_id?: string | null
          transaction_id?: string | null
          period_start?: string | null
          period_end?: string | null
          notes?: string | null
          processed_at?: string | null
          processed_by?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      fraud_logs: {
        Row: {
          id: string
          click_id: string | null
          ip_address: string
          fraud_score: number | null
          risk_level: string | null
          reasons: string[] | null
          blocked: boolean | null
          provider: string | null
          raw_response: Json | null
          created_at: string | null
        }
        Insert: {
          id?: string
          click_id?: string | null
          ip_address: string
          fraud_score?: number | null
          risk_level?: string | null
          reasons?: string[] | null
          blocked?: boolean | null
          provider?: string | null
          raw_response?: Json | null
          created_at?: string | null
        }
        Update: {
          id?: string
          click_id?: string | null
          ip_address?: string
          fraud_score?: number | null
          risk_level?: string | null
          reasons?: string[] | null
          blocked?: boolean | null
          provider?: string | null
          raw_response?: Json | null
          created_at?: string | null
        }
      }
      settings: {
        Row: {
          id: string
          key: string
          value: Json
          description: string | null
          category: string | null
          created_by: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          key: string
          value: Json
          description?: string | null
          category?: string | null
          created_by?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          key?: string
          value?: Json
          description?: string | null
          category?: string | null
          created_by?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_tracking_url: {
        Args: {
          p_offer_id: string
          p_affiliate_id: string
          p_sub_id?: string
        }
        Returns: string
      }
      generate_affiliate_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      user_role: 'admin' | 'affiliate'
      user_status: 'active' | 'pending' | 'suspended' | 'banned'
      offer_status: 'active' | 'paused' | 'expired'
      payout_type: 'CPA' | 'CPI' | 'CPL' | 'RevShare'
      payment_method: 'paypal' | 'bank' | 'crypto' | 'check'
      conversion_status: 'pending' | 'approved' | 'rejected' | 'held'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}