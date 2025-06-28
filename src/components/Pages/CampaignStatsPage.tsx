import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, Calendar, Filter, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const CampaignStatsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState('7d');
  const [selectedCampaign, setSelectedCampaign] = useState('all');

  const performanceData = [
    { name: 'Mon', clicks: 1420, conversions: 45, revenue: 1125, cost: 850 },
    { name: 'Tue', clicks: 1380, conversions: 38, revenue: 950, cost: 720 },
    { name: 'Wed', clicks: 1520, conversions: 62, revenue: 1550, cost: 980 },
    { name: 'Thu', clicks: 1460, conversions: 51, revenue: 1275, cost: 890 },
    { name: 'Fri', clicks: 1610, conversions: 73, revenue: 1825, cost: 1100 },
    { name: 'Sat', clicks: 1340, conversions: 29, revenue: 725, cost: 650 },
    { name: 'Sun', clicks: 1280, conversions: 22, revenue: 550, cost: 580 }
  ];

  const campaignData = [
    {
      id: '1',
      name: 'Investment Course - Facebook',
      status: 'active',
      clicks: 8420,
      conversions: 245,
      revenue: '$6,125',
      cost: '$4,200',
      roi: '46%',
      cvr: '2.91%',
      cpc: '$0.50',
      epc: '$0.73'
    },
    {
      id: '2',
      name: 'Crypto Course - Google Ads',
      status: 'active',
      clicks: 6890,
      conversions: 198,
      revenue: '$4,950',
      cost: '$3,800',
      roi: '30%',
      cvr: '2.87%',
      cpc: '$0.55',
      epc: '$0.72'
    },
    {
      id: '3',
      name: 'Real Estate - Native Ads',
      status: 'paused',
      clicks: 4560,
      conversions: 89,
      revenue: '$2,225',
      cost: '$2,100',
      roi: '6%',
      cvr: '1.95%',
      cpc: '$0.46',
      epc: '$0.49'
    }
  ];

  const trafficSources = [
    { name: 'Facebook Ads', value: 45, color: '#3B82F6' },
    { name: 'Google Ads', value: 30, color: '#10B981' },
    { name: 'Native Ads', value: 15, color: '#F97316' },
    { name: 'Email', value: 10, color: '#EF4444' }
  ];

  const totalStats = {
    totalClicks: campaignData.reduce((sum, campaign) => sum + campaign.clicks, 0),
    totalConversions: campaignData.reduce((sum, campaign) => sum + campaign.conversions, 0),
    totalRevenue: campaignData.reduce((sum, campaign) => sum + parseFloat(campaign.revenue.replace('$', '').replace(',', '')), 0),
    totalCost: campaignData.reduce((sum, campaign) => sum + parseFloat(campaign.cost.replace('$', '').replace(',', '')), 0)
  };

  const avgCVR = ((totalStats.totalConversions / totalStats.totalClicks) * 100).toFixed(2);
  const totalROI = (((totalStats.totalRevenue - totalStats.totalCost) / totalStats.totalCost) * 100).toFixed(0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campaign Statistics</h1>
          <p className="text-gray-600">Monitor your advertising campaign performance and ROI</p>
        </div>
        <div className="flex space-x-3">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Clicks</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalStats.totalClicks.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversions</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalStats.totalConversions}</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average CVR</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{avgCVR}%</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total ROI</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalROI}%</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Performance Trend</h3>
            <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
              <option>Revenue</option>
              <option>Conversions</option>
              <option>Clicks</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} />
              <Line type="monotone" dataKey="cost" stroke="#EF4444" strokeWidth={2} />
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
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {trafficSources.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Campaign Performance Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Campaign Performance</h3>
          <div className="flex items-center space-x-4">
            <select 
              value={selectedCampaign}
              onChange={(e) => setSelectedCampaign(e.target.value)}
              className="text-sm border border-gray-300 rounded-lg px-3 py-1"
            >
              <option value="all">All Campaigns</option>
              <option value="active">Active Only</option>
              <option value="paused">Paused Only</option>
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Campaign</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Clicks</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Conversions</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">CVR</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Revenue</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Cost</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">ROI</th>
              </tr>
            </thead>
            <tbody>
              {campaignData.map((campaign) => (
                <tr key={campaign.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{campaign.name}</p>
                        <p className="text-sm text-gray-500">CPC: {campaign.cpc} • EPC: {campaign.epc}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      campaign.status === 'active' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-medium text-gray-900">{campaign.clicks.toLocaleString()}</td>
                  <td className="py-4 px-4 font-medium text-gray-900">{campaign.conversions}</td>
                  <td className="py-4 px-4 font-medium text-emerald-600">{campaign.cvr}</td>
                  <td className="py-4 px-4 font-semibold text-gray-900">{campaign.revenue}</td>
                  <td className="py-4 px-4 font-medium text-red-600">{campaign.cost}</td>
                  <td className="py-4 px-4">
                    <span className={`font-medium ${
                      parseFloat(campaign.roi.replace('%', '')) > 20 
                        ? 'text-emerald-600' 
                        : parseFloat(campaign.roi.replace('%', '')) > 0
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}>
                      {campaign.roi}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Daily Performance Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Daily Performance Breakdown</h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg">Revenue</button>
            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">Cost</button>
            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">Profit</button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#10B981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="cost" fill="#EF4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CampaignStatsPage;