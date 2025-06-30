import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { apiService } from '../services/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  impersonate: (tenantId: string, userEmail: string) => Promise<void>;
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
  const [isImpersonating, setIsImpersonating] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiService.login(email, password);
      
      if (response.success) {
        let role: UserRole = 'affiliate';
        
        if (email.includes('admin')) {
          role = 'admin';
        }

        const mockUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          name: role === 'admin' ? 'Network Admin' : 'Top Affiliate',
          email,
          role,
          status: 'active',
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
  };

  const switchRole = (role: UserRole) => {
    if (user) {
      setUser({ ...user, role });
    }
  };

  const impersonate = async (tenantId: string, userEmail: string) => {
    if (user && user.role === 'admin') {
      const role: UserRole = userEmail.includes('admin') ? 'admin' : 'affiliate';
      const impersonatedUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: role === 'admin' ? 'Network Admin' : 'Impersonated User',
        email: userEmail,
        role,
        status: 'active',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };
      
      setUser(impersonatedUser);
      setIsImpersonating(true);
    }
  };

  const stopImpersonation = () => {
    if (isImpersonating) {
      const adminUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: 'Network Admin',
        email: 'admin@affwish.com',
        role: 'admin',
        status: 'active',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };
      
      setUser(adminUser);
      setIsImpersonating(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      switchRole,
      impersonate,
      stopImpersonation,
      isImpersonating
    }}>
      {children}
    </AuthContext.Provider>
  );
};