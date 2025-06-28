import React from 'react';
import { Target, DollarSign, MousePointer, TrendingUp, Link, Award } from 'lucide-react';
import MetricCard from './MetricCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const AffiliateDashboard: React.FC = () => {
  const performanceData = [
    { name: 'Mon', clicks: 420, conversions: 45, earnings: 1125 },
    { name: 'Tue', clicks: 380, conversions: 38, earnings: 950 },
    { name: 'Wed', clicks: 520, conversions: 62, earnings: 1550 },
    { name: 'Thu', clicks: 460, conversions: 51, earnings: 1275 },
    { name: 'Fri', clicks: 610, conversions: 73, earnings: 1825 },
    { name: 'Sat', clicks: 340, conversions: 29, earnings: 725 },
    { name: 'Sun', clicks: 280, conversions: 22, earnings: 550 }
  ];

  const topOffers = [
    { 
      name: 'Premium Dating App', 
      payout: '$25.00', 
      epc: '$2.45', 
      conversions: 48, 
      earnings: '$1,200',
      category: 'Dating',
      countries: ['US', 'CA', 'UK']
    },
    { 
      name: 'Crypto Trading Platform', 
      payout: '$40.00', 
      epc: '$3.20', 
      conversions: 32, 
      earnings: '$1,280',
      category: 'Finance',
      countries: ['US', 'AU', 'DE']
    },
    { 
      name: 'VPN Service Trial', 
      payout: '$15.00', 
      epc: '$1.80', 
      conversions: 67, 
      earnings: '$1,005',
      category: 'Software',
      countries: ['Global']
    }
  ];

  const recentPayments = [
    { date: '2024-01-15', amount: '$2,450.00', status: 'Paid', method: 'PayPal' },
    { date: '2024-01-01', amount: '$3,120.00', status: 'Paid', method: 'Bank Transfer' },
    { date: '2023-12-15', amount: '$2,890.00', status: 'Paid', method: 'PayPal' },
    { date: '2023-12-01', amount: '$2,650.00', status: 'Processing', method: 'Bank Transfer' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Affiliate Dashboard</h1>
          <p className="text-gray-600">Track your performance and discover new opportunities</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Browse Offers
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Generate Links
          </button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Earnings"
          value="$8,025"
          change={{ value: 12.5, type: 'increase' }}
          icon={DollarSign}
          color="emerald"
        />
        <MetricCard
          title="Clicks This Week"
          value="3,010"
          change={{ value: 8.3, type: 'increase' }}
          icon={MousePointer}
          color="blue"
        />
        <MetricCard
          title="Conversions"
          value="320"
          change={{ value: 15.7, type: 'increase' }}
          icon={Target}
          color="orange"
        />
        <MetricCard
          title="Average EPC"
          value="$2.67"
          change={{ value: 5.2, type: 'increase' }}
          icon={TrendingUp}
          color="emerald"
        />
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Daily Performance</h3>
            <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="earnings" stroke="#10B981" strokeWidth={3} />
              <Line type="monotone" dataKey="conversions" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Weekly Clicks vs Conversions</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="clicks" fill="#3B82F6" radius={[2, 2, 0, 0]} />
              <Bar dataKey="conversions" fill="#10B981" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Offers and Recent Payments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Top Performing Offers</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All Offers</button>
          </div>
          <div className="space-y-4">
            {topOffers.map((offer, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{offer.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{offer.category}</span>
                        <span>•</span>
                        <span>{offer.countries.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                    Get Link
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Payout</p>
                    <p className="font-semibold text-gray-900">{offer.payout}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">EPC</p>
                    <p className="font-semibold text-emerald-600">{offer.epc}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Conversions</p>
                    <p className="font-semibold text-gray-900">{offer.conversions}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Earnings</p>
                    <p className="font-semibold text-emerald-600">{offer.earnings}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Payments</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {recentPayments.map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{payment.amount}</p>
                  <p className="text-sm text-gray-500">{payment.date}</p>
                  <p className="text-xs text-gray-400">{payment.method}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  payment.status === 'Paid' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {payment.status}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
            Request Payout
          </button>
        </div>
      </div>

      {/* Quick Actions and Affiliate Tools */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions & Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <Link className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-gray-900">Link Generator</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
            <Target className="w-5 h-5 text-emerald-600" />
            <span className="font-medium text-gray-900">Browse Offers</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors">
            <Award className="w-5 h-5 text-orange-600" />
            <span className="font-medium text-gray-900">Creatives</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <span className="font-medium text-gray-900">Analytics</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AffiliateDashboard;