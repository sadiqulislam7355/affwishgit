import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { apiService } from '../services/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  impersonate: (tenantId: string, userEmail: string) => Promise<void>;
  isImpersonating: boolean;
  stopImpersonation: () => void;
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
  const [isImpersonating, setIsImpersonating] = useState(false);
  const [originalUser, setOriginalUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiService.login(email, password);
      
      if (response.success) {
        // Determine role based on email for demo
        let role: UserRole = 'affiliate';
        
        if (email.includes('superadmin')) {
          role = 'super_admin';
        } else if (email.includes('admin')) {
          role = 'admin';
        } else if (email.includes('advertiser')) {
          role = 'advertiser';
        }

        const mockUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          name: role === 'super_admin' ? 'Super Admin' : 
               role === 'admin' ? 'Network Owner' :
               role === 'affiliate' ? 'Top Affiliate' :
               role === 'advertiser' ? 'Premium Advertiser' : 'Manager',
          email,
          role,
          status: 'active',
          tenant: role !== 'super_admin' ? 'demo-network' : undefined,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        };
        
        setUser(mockUser);
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsImpersonating(false);
    setOriginalUser(null);
  };

  const switchRole = (role: UserRole) => {
    if (user && !isImpersonating) {
      setUser({ ...user, role });
    }
  };

  const impersonate = async (tenantId: string, userEmail: string) => {
    if (!user || user.role !== 'super_admin') {
      throw new Error('Only super admins can impersonate users');
    }

    try {
      const response = await apiService.impersonateUser(tenantId, userEmail);
      
      if (response.success) {
        setOriginalUser(user);
        setIsImpersonating(true);
        
        // Create impersonated user
        const impersonatedUser: User = {
          id: 'impersonated_' + Date.now(),
          name: 'Network Admin (Impersonated)',
          email: userEmail,
          role: 'admin',
          status: 'active',
          tenant: tenantId,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        };
        
        setUser(impersonatedUser);
      }
    } catch (error) {
      console.error('Impersonation failed:', error);
      throw error;
    }
  };

  const stopImpersonation = () => {
    if (isImpersonating && originalUser) {
      setUser(originalUser);
      setIsImpersonating(false);
      setOriginalUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      switchRole, 
      impersonate,
      isImpersonating,
      stopImpersonation
    }}>
      {children}
    </AuthContext.Provider>
  );
};