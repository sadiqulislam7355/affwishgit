import React, { useState } from 'react';
import { Users, Target, DollarSign, TrendingUp, AlertTriangle, Globe, Plus, Settings, Shield, UserCheck, Link2 } from 'lucide-react';
import MetricCard from './MetricCard';
import AddOfferModal from '../Modals/AddOfferModal';
import AddAffiliateModal from '../Modals/AddAffiliateModal';
import PostbackModal from '../Modals/PostbackModal';
import FraudConfigModal from '../Modals/FraudConfigModal';
import UserManagementModal from '../Modals/UserManagementModal';
import NetworkIntegrationModal from '../Modals/NetworkIntegrationModal';
import ConversionManagementModal from '../Modals/ConversionManagementModal';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const AdminDashboard: React.FC = () => {
  const [showAddOffer, setShowAddOffer] = useState(false);
  const [showAddAffiliate, setShowAddAffiliate] = useState(false);
  const [showPostback, setShowPostback] = useState(false);
  const [showFraudConfig, setShowFraudConfig] = useState(false);
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [showNetworkIntegration, setShowNetworkIntegration] = useState(false);
  const [showConversionManagement, setShowConversionManagement] = useState(false);

  const revenueData = [
    { name: 'Jan', revenue: 12400, conversions: 450 },
    { name: 'Feb', revenue: 15600, conversions: 520 },
    { name: 'Mar', revenue: 18900, conversions: 680 },
    { name: 'Apr', revenue: 22100, conversions: 750 },
    { name: 'May', revenue: 25300, conversions: 820 },
    { name: 'Jun', revenue: 28600, conversions: 920 }
  ];

  const topOffers = [
    { name: 'Dating App Install', conversions: 1240, revenue: '$24,800', cvr: '12.4%', scrubRate: '5%' },
    { name: 'Crypto Trading Platform', conversions: 890, revenue: '$35,600', cvr: '8.9%', scrubRate: '8%' },
    { name: 'VPN Service Trial', conversions: 760, revenue: '$15,200', cvr: '15.2%', scrubRate: '3%' },
    { name: 'Online Casino', conversions: 650, revenue: '$32,500', cvr: '6.5%', scrubRate: '12%' }
  ];

  const pendingConversions = [
    { id: '1', offer: 'Dating App', affiliate: 'Marketing Pro', value: '$25.00', timestamp: '2 hours ago', fraudScore: 15 },
    { id: '2', offer: 'Crypto Platform', affiliate: 'Digital Expert', value: '$40.00', timestamp: '4 hours ago', fraudScore: 25 },
    { id: '3', offer: 'VPN Service', affiliate: 'Growth Hacker', value: '$15.00', timestamp: '6 hours ago', fraudScore: 8 }
  ];

  const handleModalSuccess = () => {
    console.log('Operation completed successfully');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Network Administration</h1>
          <p className="text-gray-600">Complete control over your CPA network operations</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowAddOffer(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Offer</span>
          </button>
          <button 
            onClick={() => setShowAddAffiliate(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Affiliate</span>
          </button>
          <div className="relative group">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Settings className="w-4 h-4" />
              <span>Admin Tools</span>
            </button>
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <button 
                onClick={() => setShowUserManagement(true)}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
              >
                <UserCheck className="w-4 h-4" />
                <span>User Management</span>
              </button>
              <button 
                onClick={() => setShowNetworkIntegration(true)}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
              >
                <Link2 className="w-4 h-4" />
                <span>Network Integrations</span>
              </button>
              <button 
                onClick={() => setShowPostback(true)}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
              >
                <Globe className="w-4 h-4" />
                <span>Global Postbacks</span>
              </button>
              <button 
                onClick={() => setShowFraudConfig(true)}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
              >
                <Shield className="w-4 h-4" />
                <span>Fraud Detection</span>
              </button>
              <button 
                onClick={() => setShowConversionManagement(true)}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
              >
                <Target className="w-4 h-4" />
                <span>Conversion Management</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value="$127,450"
          change={{ value: 15.3, type: 'increase' }}
          icon={DollarSign}
          color="emerald"
        />
        <MetricCard
          title="Active Users"
          value="342"
          change={{ value: 8.2, type: 'increase' }}
          icon={Users}
          color="blue"
        />
        <MetricCard
          title="Live Offers"
          value="156"
          change={{ value: 12.5, type: 'increase' }}
          icon={Target}
          color="orange"
        />
        <MetricCard
          title="Pending Conversions"
          value="23"
          change={{ value: 2.1, type: 'decrease' }}
          icon={AlertTriangle}
          color="red"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
            <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
              <option>Last 6 months</option>
              <option>Last 3 months</option>
              <option>Last month</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Conversions</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="conversions" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Management Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Offers with Scrub Rates */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Top Performing Offers</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Manage All</button>
          </div>
          <div className="space-y-4">
            {topOffers.map((offer, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{offer.name}</h4>
                  <p className="text-sm text-gray-500">{offer.conversions} conversions • Scrub: {offer.scrubRate}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{offer.revenue}</p>
                  <p className="text-sm text-emerald-600">{offer.cvr} CVR</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Conversions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Pending Conversions</h3>
            <button 
              onClick={() => setShowConversionManagement(true)}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Manage All
            </button>
          </div>
          <div className="space-y-4">
            {pendingConversions.map((conversion) => (
              <div key={conversion.id} className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">{conversion.offer}</h4>
                    <p className="text-sm text-gray-500">{conversion.affiliate} • {conversion.timestamp}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{conversion.value}</p>
                  <p className={`text-xs ${
                    conversion.fraudScore < 20 ? 'text-emerald-600' : 
                    conversion.fraudScore < 50 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    Risk: {conversion.fraudScore}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            onClick={() => setShowUserManagement(true)}
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <UserCheck className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-gray-900">Manage Users</span>
          </button>
          <button 
            onClick={() => setShowNetworkIntegration(true)}
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
          >
            <Link2 className="w-5 h-5 text-emerald-600" />
            <span className="font-medium text-gray-900">Network Setup</span>
          </button>
          <button 
            onClick={() => setShowFraudConfig(true)}
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors"
          >
            <Shield className="w-5 h-5 text-orange-600" />
            <span className="font-medium text-gray-900">Fraud Settings</span>
          </button>
          <button 
            onClick={() => setShowConversionManagement(true)}
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
          >
            <Target className="w-5 h-5 text-purple-600" />
            <span className="font-medium text-gray-900">Conversions</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      <AddOfferModal 
        isOpen={showAddOffer} 
        onClose={() => setShowAddOffer(false)} 
        onSuccess={handleModalSuccess}
      />
      <AddAffiliateModal 
        isOpen={showAddAffiliate} 
        onClose={() => setShowAddAffiliate(false)} 
        onSuccess={handleModalSuccess}
      />
      <PostbackModal 
        isOpen={showPostback} 
        onClose={() => setShowPostback(false)} 
        onSuccess={handleModalSuccess}
      />
      <FraudConfigModal 
        isOpen={showFraudConfig} 
        onClose={() => setShowFraudConfig(false)} 
        onSuccess={handleModalSuccess}
      />
      <UserManagementModal 
        isOpen={showUserManagement} 
        onClose={() => setShowUserManagement(false)} 
        onSuccess={handleModalSuccess}
      />
      <NetworkIntegrationModal 
        isOpen={showNetworkIntegration} 
        onClose={() => setShowNetworkIntegration(false)} 
        onSuccess={handleModalSuccess}
      />
      <ConversionManagementModal 
        isOpen={showConversionManagement} 
        onClose={() => setShowConversionManagement(false)} 
        onSuccess={handleModalSuccess}
      />
    </div>
  );
};

export default AdminDashboard;