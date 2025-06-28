import React from 'react';
import { Target, Users, DollarSign, TrendingUp, Globe, Eye } from 'lucide-react';
import MetricCard from './MetricCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdvertiserDashboard: React.FC = () => {
  const campaignData = [
    { name: 'Week 1', spend: 12400, conversions: 520, leads: 890 },
    { name: 'Week 2', spend: 15600, conversions: 680, leads: 1120 },
    { name: 'Week 3', spend: 18900, conversions: 750, leads: 1340 },
    { name: 'Week 4', spend: 22100, conversions: 920, leads: 1580 }
  ];

  const trafficSources = [
    { name: 'Social Media', value: 35, leads: 1240 },
    { name: 'Email Marketing', value: 28, leads: 980 },
    { name: 'Search Ads', value: 22, leads: 770 },
    { name: 'Display', value: 15, leads: 525 }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F97316', '#EF4444'];

  const activeOffers = [
    {
      name: 'Premium Investment Course',
      status: 'Active',
      payout: '$45.00',
      conversions: 320,
      spend: '$14,400',
      affiliates: 28,
      conversionRate: '12.5%'
    },
    {
      name: 'Crypto Trading Masterclass',
      status: 'Active',
      payout: '$60.00',
      conversions: 180,
      spend: '$10,800',
      affiliates: 15,
      conversionRate: '8.9%'
    },
    {
      name: 'Real Estate Investing Guide',
      status: 'Paused',
      payout: '$35.00',
      conversions: 95,
      spend: '$3,325',
      affiliates: 8,
      conversionRate: '15.2%'
    }
  ];

  const topAffiliates = [
    { name: 'Marketing Pro', conversions: 85, revenue: '$3,825', rating: 4.9 },
    { name: 'Digital Expert', conversions: 72, revenue: '$3,240', rating: 4.8 },
    { name: 'Growth Hacker', conversions: 58, revenue: '$2,610', rating: 4.7 },
    { name: 'Performance King', conversions: 45, revenue: '$2,025', rating: 4.6 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Advertiser Dashboard</h1>
          <p className="text-gray-600">Manage your campaigns and track affiliate performance</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Create Offer
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Campaign Report
          </button>
        </div>
      </div>

      {/* Campaign Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Spend"
          value="$68,900"
          change={{ value: 18.2, type: 'increase' }}
          icon={DollarSign}
          color="red"
        />
        <MetricCard
          title="Active Affiliates"
          value="156"
          change={{ value: 12.3, type: 'increase' }}
          icon={Users}
          color="blue"
        />
        <MetricCard
          title="Conversions"
          value="2,870"
          change={{ value: 25.7, type: 'increase' }}
          icon={Target}
          color="emerald"
        />
        <MetricCard
          title="Avg. Conversion Rate"
          value="11.8%"
          change={{ value: 3.4, type: 'increase' }}
          icon={TrendingUp}
          color="orange"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Campaign Performance</h3>
            <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
              <option>Last 4 weeks</option>
              <option>Last 3 months</option>
              <option>Last 6 months</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={campaignData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="spend" stroke="#EF4444" strokeWidth={3} />
              <Line type="monotone" dataKey="conversions" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Traffic Sources</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={trafficSources}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name} ${value}%`}
              >
                {trafficSources.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Active Offers */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Active Offers</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Manage All Offers</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Offer Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Payout</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Conversions</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Total Spend</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Active Affiliates</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">CVR</th>
              </tr>
            </thead>
            <tbody>
              {activeOffers.map((offer, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <Target className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-gray-900">{offer.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      offer.status === 'Active' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {offer.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-semibold text-gray-900">{offer.payout}</td>
                  <td className="py-4 px-4 text-gray-900">{offer.conversions}</td>
                  <td className="py-4 px-4 font-semibold text-red-600">{offer.spend}</td>
                  <td className="py-4 px-4 text-gray-900">{offer.affiliates}</td>
                  <td className="py-4 px-4 font-semibold text-emerald-600">{offer.conversionRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Affiliates and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Top Performing Affiliates</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {topAffiliates.map((affiliate, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{affiliate.name}</h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{affiliate.conversions} conversions</span>
                      <span className="text-xs text-yellow-600">★ {affiliate.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{affiliate.revenue}</p>
                  <p className="text-xs text-gray-500">Revenue generated</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Campaign Tools</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <Target className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-900">Create New Offer</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
              <Eye className="w-5 h-5 text-emerald-600" />
              <span className="font-medium text-gray-900">Upload Creatives</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors">
              <Globe className="w-5 h-5 text-orange-600" />
              <span className="font-medium text-gray-900">Traffic Analytics</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-gray-900">Performance Reports</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertiserDashboard;