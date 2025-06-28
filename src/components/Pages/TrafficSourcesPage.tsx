import React, { useState } from 'react';
import { Globe, TrendingUp, Users, Eye, Edit, Trash2, Plus, Search, Filter, BarChart3 } from 'lucide-react';

const TrafficSourcesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSource, setSelectedSource] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const trafficSources = [
    {
      id: '1',
      name: 'Facebook Ads',
      type: 'Social Media',
      status: 'active',
      clicks: 15420,
      conversions: 342,
      revenue: '$8,550',
      cvr: '2.22%',
      epc: '$0.55',
      cost: '$3,200',
      roi: '167%',
      lastActive: '2 hours ago'
    },
    {
      id: '2',
      name: 'Google Ads',
      type: 'Search',
      status: 'active',
      clicks: 12890,
      conversions: 298,
      revenue: '$7,450',
      cvr: '2.31%',
      epc: '$0.58',
      cost: '$2,800',
      roi: '166%',
      lastActive: '1 hour ago'
    },
    {
      id: '3',
      name: 'Email Campaign',
      type: 'Email',
      status: 'active',
      clicks: 8760,
      conversions: 156,
      revenue: '$3,900',
      cvr: '1.78%',
      epc: '$0.45',
      cost: '$1,200',
      roi: '225%',
      lastActive: '30 minutes ago'
    },
    {
      id: '4',
      name: 'YouTube Ads',
      type: 'Video',
      status: 'paused',
      clicks: 5430,
      conversions: 89,
      revenue: '$2,225',
      cvr: '1.64%',
      epc: '$0.41',
      cost: '$1,500',
      roi: '48%',
      lastActive: '2 days ago'
    },
    {
      id: '5',
      name: 'Native Ads',
      type: 'Display',
      status: 'active',
      clicks: 9870,
      conversions: 187,
      revenue: '$4,675',
      cvr: '1.89%',
      epc: '$0.47',
      cost: '$1,800',
      roi: '160%',
      lastActive: '4 hours ago'
    }
  ];

  const filteredSources = trafficSources.filter(source =>
    source.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    source.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStats = {
    totalClicks: trafficSources.reduce((sum, source) => sum + source.clicks, 0),
    totalConversions: trafficSources.reduce((sum, source) => sum + source.conversions, 0),
    totalRevenue: trafficSources.reduce((sum, source) => sum + parseFloat(source.revenue.replace('$', '').replace(',', '')), 0),
    totalCost: trafficSources.reduce((sum, source) => sum + parseFloat(source.cost.replace('$', '').replace(',', '')), 0)
  };

  const avgCVR = ((totalStats.totalConversions / totalStats.totalClicks) * 100).toFixed(2);
  const avgEPC = (totalStats.totalRevenue / totalStats.totalClicks).toFixed(2);
  const totalROI = (((totalStats.totalRevenue - totalStats.totalCost) / totalStats.totalCost) * 100).toFixed(0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Traffic Sources</h1>
          <p className="text-gray-600">Monitor and optimize your traffic source performance</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Source</span>
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Export Report
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
              <Globe className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversions</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalStats.totalConversions.toLocaleString()}</p>
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
              <BarChart3 className="w-6 h-6 text-orange-600" />
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
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Traffic Source Performance</h3>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search sources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Traffic Sources Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Source</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Clicks</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Conversions</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">CVR</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Revenue</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">ROI</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSources.map((source) => (
                <tr key={source.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <Globe className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{source.name}</p>
                        <p className="text-sm text-gray-500">Last active: {source.lastActive}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                      {source.type}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      source.status === 'active' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {source.status.charAt(0).toUpperCase() + source.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-medium text-gray-900">{source.clicks.toLocaleString()}</td>
                  <td className="py-4 px-4 font-medium text-gray-900">{source.conversions}</td>
                  <td className="py-4 px-4 font-medium text-emerald-600">{source.cvr}</td>
                  <td className="py-4 px-4 font-semibold text-gray-900">{source.revenue}</td>
                  <td className="py-4 px-4">
                    <span className={`font-medium ${
                      parseFloat(source.roi.replace('%', '')) > 100 
                        ? 'text-emerald-600' 
                        : 'text-red-600'
                    }`}>
                      {source.roi}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedSource(source)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Traffic Source Performance Comparison</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSources.slice(0, 6).map((source) => (
            <div key={source.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{source.name}</h4>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  source.status === 'active' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {source.status}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Clicks:</span>
                  <span className="font-medium">{source.clicks.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Conversions:</span>
                  <span className="font-medium">{source.conversions}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">CVR:</span>
                  <span className="font-medium text-emerald-600">{source.cvr}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Revenue:</span>
                  <span className="font-medium">{source.revenue}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">ROI:</span>
                  <span className={`font-medium ${
                    parseFloat(source.roi.replace('%', '')) > 100 
                      ? 'text-emerald-600' 
                      : 'text-red-600'
                  }`}>
                    {source.roi}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Source Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Traffic Source</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Source Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Facebook Ads"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Source Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select Type</option>
                  <option value="social">Social Media</option>
                  <option value="search">Search</option>
                  <option value="email">Email</option>
                  <option value="display">Display</option>
                  <option value="video">Video</option>
                  <option value="native">Native</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tracking URL</label>
                <input
                  type="url"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/track"
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Source
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Source Details Modal */}
      {selectedSource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{selectedSource.name} Details</h3>
              <button
                onClick={() => setSelectedSource(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Users className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Source Type</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedSource.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Total Clicks</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedSource.clicks.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Conversions</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedSource.conversions}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Conversion Rate</label>
                  <p className="text-lg font-semibold text-emerald-600">{selectedSource.cvr}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Revenue</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedSource.revenue}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Cost</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedSource.cost}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">EPC</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedSource.epc}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">ROI</label>
                  <p className={`text-lg font-semibold ${
                    parseFloat(selectedSource.roi.replace('%', '')) > 100 
                      ? 'text-emerald-600' 
                      : 'text-red-600'
                  }`}>
                    {selectedSource.roi}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setSelectedSource(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Edit Source
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrafficSourcesPage;