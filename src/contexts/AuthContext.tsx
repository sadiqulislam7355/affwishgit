import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService } from '../services/api';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'affiliate';
  status: 'active' | 'pending' | 'suspended' | 'banned';
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  profile: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: any) => Promise<void>;
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
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isImpersonating, setIsImpersonating] = useState(false);
  const [originalUser, setOriginalUser] = useState<{ user: User | null; profile: User | null } | null>(null);

  const refreshProfile = async () => {
    if (user) {
      try {
        const response = await apiService.getUserProfile(user.id);
        if (response.success && response.data) {
          setProfile(response.data);
        }
      } catch (error) {
        console.error('Failed to refresh profile:', error);
      }
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Demo login logic - replace with actual API call
      if (email === 'admin@affwish.com' && password === 'Admin123!@#') {
        const adminUser = {
          id: '00000000-0000-0000-0000-000000000001',
          email: 'admin@affwish.com',
          name: 'AFFWISH Administrator',
          role: 'admin' as const,
          status: 'active' as const,
          company: 'AFFWISH Network',
          website: 'https://affwish.com'
        };
        
        setUser(adminUser);
        setProfile(adminUser);
        localStorage.setItem('currentUser', JSON.stringify(adminUser));
        localStorage.setItem('sessionToken', 'demo_admin_token');
      } else if (email === 'affiliate@affwish.com' && password === 'Affiliate123!@#') {
        const affiliateUser = {
          id: '00000000-0000-0000-0000-000000000002',
          email: 'affiliate@affwish.com',
          name: 'Top Affiliate Marketer',
          role: 'affiliate' as const,
          status: 'active' as const,
          company: 'Marketing Pro LLC',
          website: 'https://marketingpro.com'
        };
        
        setUser(affiliateUser);
        setProfile(affiliateUser);
        localStorage.setItem('currentUser', JSON.stringify(affiliateUser));
        localStorage.setItem('sessionToken', 'demo_affiliate_token');
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: any) => {
    try {
      setLoading(true);
      
      // Demo registration - in production, this would call the API
      const newUser = {
        id: `user_${Date.now()}`,
        email: userData.email,
        name: userData.fullName,
        role: 'affiliate' as const,
        status: 'pending' as const,
        ...userData
      };
      
      // Auto-login after registration
      setUser(newUser);
      setProfile(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      localStorage.setItem('sessionToken', `demo_token_${Date.now()}`);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('sessionToken');
      
      setUser(null);
      setProfile(null);
      setIsImpersonating(false);
      setOriginalUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const impersonate = async (tenantId: string, email: string) => {
    try {
      if (!user || !profile) return;

      // Store original user data
      setOriginalUser({ user, profile });
      
      // Demo impersonation - in production, this would call the API
      const targetUser = {
        id: '00000000-0000-0000-0000-000000000002',
        email: 'affiliate@affwish.com',
        name: 'Top Affiliate Marketer',
        role: 'affiliate' as const,
        status: 'active' as const,
        company: 'Marketing Pro LLC'
      };

      setUser(targetUser);
      setProfile(targetUser);
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

  // Check for existing session on app load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const sessionToken = localStorage.getItem('sessionToken');
        const currentUser = localStorage.getItem('currentUser');
        
        if (sessionToken && currentUser) {
          const userData = JSON.parse(currentUser);
          setUser(userData);
          setProfile(userData);
        }
      } catch (error) {
        console.error('Session validation error:', error);
        localStorage.removeItem('sessionToken');
        localStorage.removeItem('currentUser');
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile, 
      loading, 
      login,
      register,
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