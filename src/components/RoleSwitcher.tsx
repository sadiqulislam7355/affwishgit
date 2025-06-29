import React from 'react';
import { UserRole } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Target, Users } from 'lucide-react';

const RoleSwitcher: React.FC = () => {
  const { user, switchRole } = useAuth();

  const roles = [
    { value: 'admin' as UserRole, label: 'Network Admin', icon: Shield, color: 'blue' },
    { value: 'affiliate' as UserRole, label: 'Affiliate', icon: Target, color: 'emerald' },
    { value: 'advertiser' as UserRole, label: 'Advertiser', icon: Users, color: 'orange' }
  ];

  if (!user) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
        <p className="text-sm font-medium text-gray-700 mb-3">Demo Mode - Switch Role:</p>
        <div className="grid grid-cols-1 gap-2">
          {roles.map((role) => {
            const Icon = role.icon;
            const isActive = user.role === role.value;
            
            return (
              <button
                key={role.value}
                onClick={() => switchRole(role.value)}
                className={`flex items-center space-x-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{role.label}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            All features are fully functional in demo mode
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSwitcher;