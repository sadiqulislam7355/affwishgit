import React from 'react';
import { 
  BarChart3, 
  Users, 
  Target, 
  Shield, 
  Settings, 
  CreditCard,
  Globe,
  Link,
  PieChart,
  AlertTriangle,
  FileText,
  Palette,
  Database
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const getMenuItems = () => {
    const baseItems = [
      { icon: BarChart3, label: 'Dashboard', href: '#dashboard' },
    ];

    switch (user?.role) {
      case 'super_admin':
        return [
          ...baseItems,
          { icon: Database, label: 'Tenants', href: '#tenants' },
          { icon: Users, label: 'All Users', href: '#users' },
          { icon: Palette, label: 'White-Label', href: '#branding' },
          { icon: Shield, label: 'Global Security', href: '#security' },
          { icon: Settings, label: 'System Settings', href: '#settings' }
        ];
      
      case 'admin':
        return [
          ...baseItems,
          { icon: Target, label: 'Offers', href: '#offers' },
          { icon: Users, label: 'Affiliates', href: '#affiliates' },
          { icon: Users, label: 'Advertisers', href: '#advertisers' },
          { icon: Link, label: 'SmartLinks', href: '#smartlinks' },
          { icon: Shield, label: 'Fraud Detection', href: '#fraud' },
          { icon: PieChart, label: 'Analytics', href: '#analytics' },
          { icon: CreditCard, label: 'Payouts', href: '#payouts' },
          { icon: Settings, label: 'Network Settings', href: '#settings' }
        ];
      
      case 'affiliate':
        return [
          ...baseItems,
          { icon: Target, label: 'Available Offers', href: '#offers' },
          { icon: Link, label: 'My Links', href: '#links' },
          { icon: BarChart3, label: 'Statistics', href: '#stats' },
          { icon: FileText, label: 'Creatives', href: '#creatives' },
          { icon: CreditCard, label: 'Payments', href: '#payments' },
          { icon: Settings, label: 'Profile', href: '#profile' }
        ];
      
      case 'advertiser':
        return [
          ...baseItems,
          { icon: Target, label: 'My Offers', href: '#offers' },
          { icon: BarChart3, label: 'Campaign Stats', href: '#stats' },
          { icon: FileText, label: 'Creatives', href: '#creatives' },
          { icon: Users, label: 'Traffic Sources', href: '#traffic' },
          { icon: CreditCard, label: 'Billing', href: '#billing' },
          { icon: Settings, label: 'Account', href: '#account' }
        ];
      
      default:
        return baseItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">AFFWISH</h1>
            <p className="text-xs text-gray-500 capitalize">{user?.role?.replace('_', ' ')}</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors group"
              >
                <item.icon className="w-5 h-5 group-hover:text-blue-600" />
                <span className="font-medium">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 px-3 py-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">
              {user?.name?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;