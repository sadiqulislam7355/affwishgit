import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, Calendar, Download, Filter, Eye } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const AnalyticsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const performanceData = [
    { name: 'Week 1', clicks: 12400, conversions: 520, revenue: 13000, cost: 8500 },
    { name: 'Week 2', clicks: 15600, conversions: 680, revenue: 17000, cost: 10200 },
    { name: 'Week 3', clicks: 18900, conversions: 750, revenue: 18750, cost: 11800 },
    { name: 'Week 4', clicks: 22100, conversions: 920, revenue: 23000, cost: 13500 }
  ];

  const dailyData = [
    { name: 'Mon', clicks: 3200, conversions: 145, revenue: 3625 },
    { name: 'Tue', clicks: 2800, conversions: 128, revenue: 3200 },
    { name: 'Wed', clicks: 3600, conversions: 162, revenue: 4050 },
    { name: 'Thu', clicks: 3100, conversions: 139, revenue: 3475 },
    { name: 'Fri', clicks: 4200, conversions: 189, revenue: 4725 },
    { name: 'Sat', clicks: 2900, conversions: 131, revenue: 3275 },
    { name: 'Sun', clicks: 2300, conversions: 106, revenue: 2650 }
  ];

  const trafficSources = [
    { name: 'Social Media', value: 35, clicks: 15680, color: '#3B82F6' },
    { name: 'Search Ads', value: 28, clicks: 12544, color: '#10B981' },
    { name: 'Email Marketing', value: 20, clicks: 8960, color: '#F97316' },
    { name: 'Display Ads', value: 12, clicks: 5376, color: '#EF4444' },
    { name: 'Direct Traffic', value: 5, clicks: 2240, color: '#8B5CF6' }
  ];

  const geoData = [
    { country: 'United States', clicks: 18500, conversions: 740, revenue: '$18,500', flag: '🇺🇸' },
    { country: 'Canada', clicks: 8200, conversions: 328, revenue: '$8,200', flag: '🇨🇦' },
    { country: 'United Kingdom', clicks: 6800, conversions: 272, revenue: '$6,800', flag: '🇬🇧' },
    { country: 'Australia', clicks: 4900, conversions: 196, revenue: '$4,900', flag: '🇦🇺' },
    { country: 'Germany', clicks: 3600, conversions: 144, revenue: '$3,600', flag: '🇩🇪' }
  ];

  const topOffers = [
    { name: 'Premium Dating App', clicks: 8420, conversions: 421, revenue: '$10,525', cvr: '5.0%', epc: '$1.25' },
    { name: 'Crypto Trading Platform', clicks: 6890, conversions: 275, revenue: '$11,000', cvr: '4.0%', epc: '$1.60' },
    { name: 'VPN Service Trial', clicks: 9560, conversions: 287, revenue: '$4,305', cvr: '3.0%', epc: '$0.45' },
    { name: 'Online Casino', clicks: 5430, conversions: 163, revenue: '$8,150', cvr: '3.0%', epc: '$1.50' }
  ];

  const topAffiliates = [
    { name: 'Marketing Pro', clicks: 5680, conversions: 284, revenue: '$7,100', cvr: '5.0%' },
    { name: 'Digital Expert', clicks: 4920, conversions: 197, revenue: '$4,925', cvr: '4.0%' },
    { name: 'Growth Hacker', clicks: 6240, conversions: 187, revenue: '$4,675', cvr: '3.0%' },
    { name: 'Performance King', clicks: 3890, conversions: 155, revenue: '$3,875', cvr: '4.0%' }
  ];

  const totalStats = {
    totalClicks: performanceData.reduce((sum, week) => sum + week.clicks, 0),
    totalConversions: performanceData.reduce((sum, week) => sum + week.conversions, 0),
    totalRevenue: performanceData.reduce((sum, week) => sum + week.revenue, 0),
    totalCost: performanceData.reduce((sum, week) => sum + week.cost, 0)
  };

  const avgCVR = ((totalStats.totalConversions / totalStats.totalClicks) * 100).toFixed(2);
  const avgEPC = (totalStats.totalRevenue / totalStats.totalClicks).toFixed(2);
  const totalROI = (((totalStats.totalRevenue - totalStats.totalCost) / totalStats.totalCost) * 100).toFixed(0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Comprehensive performance insights and data analysis</p>
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
            <option value="1y">Last year</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Clicks</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalStats.totalClicks.toLocaleString()}</p>
              <p className="text-sm text-emerald-600 mt-1">+12.5% vs last period</p>
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
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalStats.totalConversions.toLocaleString()}</p>
              <p className="text-sm text-emerald-600 mt-1">+18.3% vs last period</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{avgCVR}%</p>
              <p className="text-sm text-emerald-600 mt-1">+2.1% vs last period</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">${totalStats.totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-emerald-600 mt-1">+25.7% vs last period</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Performance Trends</h3>
            <div className="flex space-x-2">
              {['revenue', 'clicks', 'conversions'].map((metric) => (
                <button
                  key={metric}
                  onClick={() => setSelectedMetric(metric)}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                    selectedMetric === metric
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {metric.charAt(0).toUpperCase() + metric.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey={selectedMetric} 
                stroke="#3B82F6" 
                fill="#3B82F680" 
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Traffic Sources</h3>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={trafficSources}
                cx="50%"
                cy="50%"
                outerRadius={100}
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
          <div className="mt-4 space-y-2">
            {trafficSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: source.color }}
                  ></div>
                  <span>{source.name}</span>
                </div>
                <span className="font-medium">{source.clicks.toLocaleString()} clicks</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Performance */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Daily Performance (Last 7 Days)</h3>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="clicks" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="conversions" fill="#10B981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Geographic Performance */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Geographic Performance</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All Countries</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Country</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Clicks</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Conversions</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Revenue</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">CVR</th>
              </tr>
            </thead>
            <tbody>
              {geoData.map((country, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{country.flag}</span>
                      <span className="font-medium text-gray-900">{country.country}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-900">{country.clicks.toLocaleString()}</td>
                  <td className="py-4 px-4 text-gray-900">{country.conversions}</td>
                  <td className="py-4 px-4 font-semibold text-emerald-600">{country.revenue}</td>
                  <td className="py-4 px-4 font-medium text-gray-900">
                    {((country.conversions / country.clicks) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Top Performing Offers</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {topOffers.map((offer, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">#{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{offer.name}</h4>
                    <p className="text-sm text-gray-500">{offer.clicks.toLocaleString()} clicks • {offer.conversions} conversions</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{offer.revenue}</p>
                  <p className="text-sm text-emerald-600">CVR: {offer.cvr}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Top Performing Affiliates</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {topAffiliates.map((affiliate, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">#{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{affiliate.name}</h4>
                    <p className="text-sm text-gray-500">{affiliate.clicks.toLocaleString()} clicks • {affiliate.conversions} conversions</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{affiliate.revenue}</p>
                  <p className="text-sm text-emerald-600">CVR: {affiliate.cvr}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced Analytics */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Advanced Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">${avgEPC}</div>
            <div className="text-sm text-gray-500">Average EPC</div>
            <div className="text-xs text-emerald-600 mt-1">+8.2% vs last period</div>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{totalROI}%</div>
            <div className="text-sm text-gray-500">Return on Investment</div>
            <div className="text-xs text-emerald-600 mt-1">+15.3% vs last period</div>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">4.2</div>
            <div className="text-sm text-gray-500">Average Quality Score</div>
            <div className="text-xs text-emerald-600 mt-1">+0.3 vs last period</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;