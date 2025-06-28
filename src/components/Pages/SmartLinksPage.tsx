import React, { useState } from 'react';
import { Link2, Plus, Search, Filter, Globe, Target, TrendingUp, Eye, Edit, Trash2, Copy } from 'lucide-react';

const SmartLinksPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLink, setSelectedLink] = useState<any>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const smartLinks = [
    {
      id: '1',
      name: 'Global Dating SmartLink',
      url: 'https://smartlink.affwish.com/dating',
      shortUrl: 'https://aff.ws/dating',
      status: 'active',
      offers: 12,
      clicks: 8420,
      conversions: 421,
      revenue: '$10,525',
      cvr: '5.0%',
      epc: '$1.25',
      countries: ['US', 'CA', 'UK', 'AU'],
      devices: ['Mobile', 'Desktop'],
      createdAt: '2024-01-10'
    },
    {
      id: '2',
      name: 'Finance SmartLink',
      url: 'https://smartlink.affwish.com/finance',
      shortUrl: 'https://aff.ws/finance',
      status: 'active',
      offers: 8,
      clicks: 6890,
      conversions: 275,
      revenue: '$11,000',
      cvr: '4.0%',
      epc: '$1.60',
      countries: ['US', 'CA', 'DE'],
      devices: ['Desktop', 'Mobile'],
      createdAt: '2024-01-08'
    },
    {
      id: '3',
      name: 'Gaming SmartLink',
      url: 'https://smartlink.affwish.com/gaming',
      shortUrl: 'https://aff.ws/gaming',
      status: 'paused',
      offers: 15,
      clicks: 5430,
      conversions: 163,
      revenue: '$8,150',
      cvr: '3.0%',
      epc: '$1.50',
      countries: ['US', 'UK', 'DE', 'FR'],
      devices: ['Mobile', 'Desktop', 'Tablet'],
      createdAt: '2024-01-05'
    }
  ];

  const filteredLinks = smartLinks.filter(link =>
    link.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStats = {
    totalLinks: smartLinks.length,
    activeLinks: smartLinks.filter(l => l.status === 'active').length,
    totalClicks: smartLinks.reduce((sum, link) => sum + link.clicks, 0),
    totalRevenue: smartLinks.reduce((sum, link) => sum + parseFloat(link.revenue.replace('$', '').replace(',', '')), 0)
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SmartLinks</h1>
          <p className="text-gray-600">Intelligent link routing for maximum conversions</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create SmartLink</span>
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Analytics
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total SmartLinks</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalStats.totalLinks}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Link2 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Links</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalStats.activeLinks}</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-lg">
              <Target className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Clicks</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalStats.totalClicks.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <Eye className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">${totalStats.totalRevenue.toFixed(0)}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* SmartLinks Management */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">SmartLink Performance</h3>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search SmartLinks..."
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

        {/* SmartLinks Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">SmartLink</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Offers</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Clicks</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Conversions</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">CVR</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Revenue</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLinks.map((link) => (
                <tr key={link.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <Link2 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{link.name}</p>
                        <p className="text-sm text-gray-500">{link.shortUrl}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      link.status === 'active' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {link.status.charAt(0).toUpperCase() + link.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-900">{link.offers}</td>
                  <td className="py-4 px-4 font-medium text-gray-900">{link.clicks.toLocaleString()}</td>
                  <td className="py-4 px-4 font-medium text-gray-900">{link.conversions}</td>
                  <td className="py-4 px-4 font-medium text-emerald-600">{link.cvr}</td>
                  <td className="py-4 px-4 font-semibold text-gray-900">{link.revenue}</td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => copyToClipboard(link.shortUrl)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Copy Link"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setSelectedLink(link)}
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
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

      {/* How SmartLinks Work */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">How SmartLinks Work</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Globe className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Intelligent Routing</h4>
            <p className="text-sm text-gray-600">Automatically routes traffic to the best performing offers based on geo, device, and other factors.</p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-emerald-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Real-time Optimization</h4>
            <p className="text-sm text-gray-600">Continuously optimizes traffic distribution to maximize conversion rates and revenue.</p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Performance Tracking</h4>
            <p className="text-sm text-gray-600">Detailed analytics and reporting to track performance across all offers and traffic sources.</p>
          </div>
        </div>
      </div>

      {/* Create SmartLink Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create SmartLink</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SmartLink Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Global Dating SmartLink"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select Category</option>
                  <option value="dating">Dating</option>
                  <option value="finance">Finance</option>
                  <option value="gaming">Gaming</option>
                  <option value="health">Health</option>
                  <option value="software">Software</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Countries</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="US, CA, UK, AU"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Devices</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span className="text-sm">Mobile</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span className="text-sm">Desktop</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Tablet</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create SmartLink
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SmartLink Details Modal */}
      {selectedLink && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{selectedLink.name}</h3>
              <button
                onClick={() => setSelectedLink(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Eye className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">SmartLink URL</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <input
                      type="text"
                      value={selectedLink.shortUrl}
                      readOnly
                      className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm"
                    />
                    <button
                      onClick={() => copyToClipboard(selectedLink.shortUrl)}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Total Offers</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedLink.offers}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Total Clicks</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedLink.clicks.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Conversions</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedLink.conversions}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                    selectedLink.status === 'active' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedLink.status.charAt(0).toUpperCase() + selectedLink.status.slice(1)}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Conversion Rate</label>
                  <p className="text-lg font-semibold text-emerald-600">{selectedLink.cvr}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">EPC</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedLink.epc}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Revenue</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedLink.revenue}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <label className="text-sm font-medium text-gray-500">Target Countries</label>
              <p className="text-gray-900 mt-1">{selectedLink.countries.join(', ')}</p>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setSelectedLink(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Edit SmartLink
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartLinksPage;