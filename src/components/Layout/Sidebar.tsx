import React from 'react';
import { 
  BarChart3, 
  Users, 
  Target, 
  Settings, 
  CreditCard,
  Link,
  FileText
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const getMenuItems = () => {
    const baseItems = [
      { icon: BarChart3, label: 'Dashboard', path: '/dashboard' },
    ];

    switch (user?.role) {
      case 'admin':
        return [
          ...baseItems,
          { icon: Target, label: 'Offers', path: '/offers' },
          { icon: Users, label: 'Affiliates', path: '/affiliates' },
          { icon: Link, label: 'SmartLinks', path: '/smartlinks' },
          { icon: Settings, label: 'Settings', path: '/settings' }
        ];
      
      case 'affiliate':
        return [
          ...baseItems,
          { icon: Target, label: 'Available Offers', path: '/offers' },
          { icon: Link, label: 'My Links', path: '/links' },
          { icon: BarChart3, label: 'Statistics', path: '/stats' },
          { icon: FileText, label: 'Creatives', path: '/creatives' },
          { icon: CreditCard, label: 'Payments', path: '/payments' },
          { icon: Settings, label: 'Profile', path: '/profile' }
        ];
      
      default:
        return baseItems;
    }
  };

  const menuItems = getMenuItems();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">AFFWISH</h1>
            <p className="text-xs text-gray-500 capitalize">{user?.role?.replace('_', ' ')}</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const isActive = isActivePath(item.path);
            return (
              <li key={index}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors group ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'group-hover:text-blue-600'}`} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
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