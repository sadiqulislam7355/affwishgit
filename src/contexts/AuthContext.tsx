import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { apiService } from '../services/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
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

  const login = async (email: string, password: string) => {
    try {
      const response = await apiService.login(email, password);
      
      if (response.success) {
        // Determine role based on email for demo
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
  };

  const switchRole = (role: UserRole) => {
    if (user) {
      setUser({ ...user, role });
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      switchRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};