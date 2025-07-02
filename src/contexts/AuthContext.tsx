import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, getCurrentUserProfile } from '../lib/supabase';
import { Database } from '../types/database';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  impersonate: (tenantId: string, email: string) => Promise<void>;
  stopImpersonation: () => void;
  isImpersonating: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isImpersonating, setIsImpersonating] = useState(false);
  const [originalUser, setOriginalUser] = useState<{ user: User | null; profile: Profile | null } | null>(null);

  const refreshProfile = async () => {
    if (user) {
      const userProfile = await getCurrentUserProfile();
      setProfile(userProfile);
    }
  };

  const impersonate = async (tenantId: string, email: string) => {
    try {
      if (!user || !profile) return;

      // Store original user data
      setOriginalUser({ user, profile });
      
      // Get the target user profile
      const { data: targetProfile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email)
        .single();

      if (error) throw error;

      // Create a mock user object for impersonation
      const mockUser: User = {
        ...user,
        id: targetProfile.id,
        email: targetProfile.email,
        user_metadata: {
          ...user.user_metadata,
          full_name: targetProfile.full_name,
          role: targetProfile.role
        }
      };

      setUser(mockUser);
      setProfile(targetProfile);
      setIsImpersonating(true);
    } catch (error) {
      console.error('Impersonation failed:', error);
      throw error;
    }
  };

  const stopImpersonation = () => {
    if (originalUser) {
      setUser(originalUser.user);
      setProfile(originalUser.profile);
      setOriginalUser(null);
      setIsImpersonating(false);
    }
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        refreshProfile();
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await refreshProfile();
      } else {
        setProfile(null);
        setIsImpersonating(false);
        setOriginalUser(null);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [user]);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setIsImpersonating(false);
    setOriginalUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile, 
      loading, 
      logout,
      refreshProfile,
      impersonate,
      stopImpersonation,
      isImpersonating
    }}>
      {children}
    </AuthContext.Provider>
  );
};