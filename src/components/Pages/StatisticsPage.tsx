import React, { useState } from 'react';
import { BarChart3, TrendingUp, Calendar, Download, Filter, Eye } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const StatisticsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState('7d');
  const [selectedOffer, setSelectedOffer] = useState('all');

  const performanceData = [
    { name: 'Mon', clicks: 420, conversions: 45, earnings: 1125, epc: 2.68 },
    { name: 'Tue', clicks: 380, conversions: 38, earnings: 950, epc: 2.50 },
    { name: 'Wed', clicks: 520, conversions: 62, earnings: 1550, epc: 2.98 },
    { name: 'Thu', clicks: 460, conversions: 51, earnings: 1275, epc: 2.77 },
    { name: 'Fri', clicks: 610, conversions: 73, earnings: 1825, epc: 2.99 },
    { name: 'Sat', clicks: 340, conversions: 29, earnings: 725, epc: 2.13 },
    { name: 'Sun', clicks: 280, conversions: 22, earnings: 550, epc: 1.96 }
  ];

  const offerPerformance = [
    { name: 'Dating App', clicks: 1240, conversions: 89, earnings: 2225, cvr: 7.18 },
    { name: 'Crypto Platform', clicks: 890, conversions: 67, earnings: 2680, cvr: 7.53 },
    { name: 'VPN Service', clicks: 1560, conversions: 78, earnings: 1170, cvr: 5.00 },
    { name: 'Online Casino', clicks: 320, conversions: 25, earnings: 1250, cvr: 7.81 }
  ];

  const trafficSources = [
    { name: 'Social Media', value: 45, earnings: 3250, color: '#3B82F6' },
    { name: 'Email Marketing', value: 30, earnings: 2100, color: '#10B981' },
    { name: 'SEO', value: 15, earnings: 1050, color: '#F97316' },
    { name: 'PPC', value: 10, earnings: 700, color: '#EF4444' }
  ];

  const totalStats = {
    totalClicks: performanceData.reduce((sum, day) => sum + day.clicks, 0),
    totalConversions: performanceData.reduce((sum, day) => sum + day.conversions, 0),
    totalEarnings: performanceData.reduce((sum, day) => sum + day.earnings, 0),
    avgEPC: 0
  };

  totalStats.avgEPC = totalStats.totalClicks > 0 ? totalStats.totalEarnings / totalStats.totalClicks : 0;
  const avgCVR = ((totalStats.totalConversions / totalStats.totalClicks) * 100).toFixed(2);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Performance Statistics</h1>
          <p className="text-gray-600">Detailed analytics and performance insights</p>
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
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalStats.totalConversions}</p>
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
              <Eye className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Earnings</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">${totalStats.totalEarnings.toLocaleString()}</p>
              <p className="text-sm text-emerald-600 mt-1">+25.7% vs last period</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Daily Performance</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg">Earnings</button>
              <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">Clicks</button>
              <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">Conversions</button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
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
                <span className="font-medium">${source.earnings}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Offer Performance */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Offer Performance</h3>
          <div className="flex items-center space-x-4">
            <select 
              value={selectedOffer}
              onChange={(e) => setSelectedOffer(e.target.value)}
              className="text-sm border border-gray-300 rounded-lg px-3 py-1"
            >
              <option value="all">All Offers</option>
              <option value="dating">Dating Offers</option>
              <option value="finance">Finance Offers</option>
              <option value="gaming">Gaming Offers</option>
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
                <th className="text-left py-3 px-4 font-medium text-gray-900">Offer</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Clicks</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Conversions</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">CVR</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Earnings</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">EPC</th>
              </tr>
            </thead>
            <tbody>
              {offerPerformance.map((offer, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xs">#{index + 1}</span>
                      </div>
                      <span className="font-medium text-gray-900">{offer.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-900">{offer.clicks.toLocaleString()}</td>
                  <td className="py-4 px-4 text-gray-900">{offer.conversions}</td>
                  <td className="py-4 px-4 font-medium text-emerald-600">{offer.cvr.toFixed(2)}%</td>
                  <td className="py-4 px-4 font-semibold text-gray-900">${offer.earnings.toLocaleString()}</td>
                  <td className="py-4 px-4 font-medium text-gray-900">${(offer.earnings / offer.clicks).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EPC Trend */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">EPC Trend Analysis</h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg">Daily</button>
            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">Weekly</button>
            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">Monthly</button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="epc" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Insights */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <div className="text-2xl font-bold text-emerald-600">${totalStats.avgEPC.toFixed(2)}</div>
            <div className="text-sm text-emerald-700">Average EPC</div>
            <div className="text-xs text-emerald-600 mt-1">+8.2% vs last period</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-600">{Math.round(totalStats.totalClicks / 7)}</div>
            <div className="text-sm text-blue-700">Daily Avg Clicks</div>
            <div className="text-xs text-blue-600 mt-1">+12.5% vs last period</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="text-2xl font-bold text-orange-600">{Math.round(totalStats.totalConversions / 7)}</div>
            <div className="text-sm text-orange-700">Daily Avg Conversions</div>
            <div className="text-xs text-orange-600 mt-1">+18.3% vs last period</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;