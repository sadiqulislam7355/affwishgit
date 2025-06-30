import React, { useState } from 'react';
import { Users, Target, DollarSign, TrendingUp, AlertTriangle, Globe, Plus } from 'lucide-react';
import MetricCard from './MetricCard';
import AddOfferModal from '../Modals/AddOfferModal';
import AddAffiliateModal from '../Modals/AddAffiliateModal';
import PostbackModal from '../Modals/PostbackModal';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const AdminDashboard: React.FC = () => {
  const [showAddOffer, setShowAddOffer] = useState(false);
  const [showAddAffiliate, setShowAddAffiliate] = useState(false);
  const [showPostback, setShowPostback] = useState(false);

  const revenueData = [
    { name: 'Jan', revenue: 12400, conversions: 450 },
    { name: 'Feb', revenue: 15600, conversions: 520 },
    { name: 'Mar', revenue: 18900, conversions: 680 },
    { name: 'Apr', revenue: 22100, conversions: 750 },
    { name: 'May', revenue: 25300, conversions: 820 },
    { name: 'Jun', revenue: 28600, conversions: 920 }
  ];

  const topOffers = [
    { name: 'Dating App Install', conversions: 1240, revenue: '$24,800', cvr: '12.4%' },
    { name: 'Crypto Trading Platform', conversions: 890, revenue: '$35,600', cvr: '8.9%' },
    { name: 'VPN Service Trial', conversions: 760, revenue: '$15,200', cvr: '15.2%' },
    { name: 'Online Casino', conversions: 650, revenue: '$32,500', cvr: '6.5%' }
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
          <button 
            onClick={() => setShowPostback(true)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span>Postback</span>
          </button>
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

      {/* Top Offers */}
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
                <p className="text-sm text-gray-500">{offer.conversions} conversions</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{offer.revenue}</p>
                <p className="text-sm text-emerald-600">{offer.cvr} CVR</p>
              </div>
            </div>
          ))}
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
    </div>
  );
};

export default AdminDashboard;