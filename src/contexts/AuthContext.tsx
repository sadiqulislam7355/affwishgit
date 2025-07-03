import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Database, Auth } from '../lib/database';

interface User {
  id: string;
  email: string;
  full_name: string;
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
        const userProfile = await Database.queryOne(
          'SELECT * FROM profiles WHERE id = ?',
          [user.id]
        );
        setProfile(userProfile);
      } catch (error) {
        console.error('Failed to refresh profile:', error);
      }
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      const result = await Auth.login(email, password);
      
      if (!result) {
        throw new Error('Invalid email or password');
      }

      const { user: loggedInUser, sessionToken } = result;
      
      // Store session token in localStorage
      localStorage.setItem('sessionToken', sessionToken);
      
      setUser(loggedInUser);
      setProfile(loggedInUser);
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
      
      const userId = await Auth.register(userData);
      
      // Auto-login after registration
      await login(userData.email, userData.password);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const sessionToken = localStorage.getItem('sessionToken');
      if (sessionToken) {
        await Auth.deleteSession(sessionToken);
        localStorage.removeItem('sessionToken');
      }
      
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
      
      // Get the target user profile
      const targetProfile = await Database.queryOne(
        'SELECT * FROM profiles WHERE email = ?',
        [email]
      );

      if (!targetProfile) {
        throw new Error('User not found');
      }

      setUser(targetProfile);
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

  // Check for existing session on app load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const sessionToken = localStorage.getItem('sessionToken');
        
        if (sessionToken) {
          const session = await Auth.validateSession(sessionToken);
          
          if (session) {
            setUser(session);
            setProfile(session);
          } else {
            localStorage.removeItem('sessionToken');
          }
        }
      } catch (error) {
        console.error('Session validation error:', error);
        localStorage.removeItem('sessionToken');
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