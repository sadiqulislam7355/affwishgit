import React, { useState } from 'react';
import { Link, Copy, Eye, Edit, Trash2, Plus, Search, Filter, BarChart3, ExternalLink } from 'lucide-react';

const MyLinksPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLink, setSelectedLink] = useState<any>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const myLinks = [
    {
      id: '1',
      name: 'Dating App - Facebook Campaign',
      offer: 'Premium Dating App',
      offerId: 'offer_1',
      trackingUrl: 'https://track.affwish.com/click?offer_id=1&affiliate_id=123&sub_id=fb_campaign',
      shortUrl: 'https://aff.ws/abc123',
      clicks: 2450,
      conversions: 58,
      revenue: '$1,450',
      cvr: '2.37%',
      epc: '$0.59',
      status: 'active',
      createdAt: '2024-01-10',
      lastClick: '2 hours ago',
      subId: 'fb_campaign',
      trafficSource: 'Facebook Ads'
    },
    {
      id: '2',
      name: 'Crypto Platform - Email List',
      offer: 'Crypto Trading Platform',
      offerId: 'offer_2',
      trackingUrl: 'https://track.affwish.com/click?offer_id=2&affiliate_id=123&sub_id=email_list',
      shortUrl: 'https://aff.ws/def456',
      clicks: 1890,
      conversions: 42,
      revenue: '$1,680',
      cvr: '2.22%',
      epc: '$0.89',
      status: 'active',
      createdAt: '2024-01-08',
      lastClick: '1 hour ago',
      subId: 'email_list',
      trafficSource: 'Email Marketing'
    },
    {
      id: '3',
      name: 'VPN Service - YouTube',
      offer: 'VPN Service Trial',
      offerId: 'offer_3',
      trackingUrl: 'https://track.affwish.com/click?offer_id=3&affiliate_id=123&sub_id=youtube_desc',
      shortUrl: 'https://aff.ws/ghi789',
      clicks: 3200,
      conversions: 96,
      revenue: '$1,440',
      cvr: '3.00%',
      epc: '$0.45',
      status: 'active',
      createdAt: '2024-01-05',
      lastClick: '30 minutes ago',
      subId: 'youtube_desc',
      trafficSource: 'YouTube'
    },
    {
      id: '4',
      name: 'Dating App - Instagram Stories',
      offer: 'Premium Dating App',
      offerId: 'offer_1',
      trackingUrl: 'https://track.affwish.com/click?offer_id=1&affiliate_id=123&sub_id=ig_stories',
      shortUrl: 'https://aff.ws/jkl012',
      clicks: 1560,
      conversions: 28,
      revenue: '$700',
      cvr: '1.79%',
      epc: '$0.45',
      status: 'paused',
      createdAt: '2024-01-03',
      lastClick: '2 days ago',
      subId: 'ig_stories',
      trafficSource: 'Instagram'
    }
  ];

  const filteredLinks = myLinks.filter(link =>
    link.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.offer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.trafficSource.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStats = {
    totalClicks: myLinks.reduce((sum, link) => sum + link.clicks, 0),
    totalConversions: myLinks.reduce((sum, link) => sum + link.conversions, 0),
    totalRevenue: myLinks.reduce((sum, link) => sum + parseFloat(link.revenue.replace('$', '').replace(',', '')), 0)
  };

  const avgCVR = ((totalStats.totalConversions / totalStats.totalClicks) * 100).toFixed(2);
  const avgEPC = (totalStats.totalRevenue / totalStats.totalClicks).toFixed(2);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // In production, show a toast notification
    alert('Link copied to clipboard!');
  };

  const handleCreateLink = () => {
    setShowCreateModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Links</h1>
          <p className="text-gray-600">Manage your tracking links and monitor performance</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleCreateLink}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Link</span>
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Export Links
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
              <BarChart3 className="w-6 h-6 text-emerald-600" />
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
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">${totalStats.totalRevenue.toFixed(0)}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Links Management */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">My Tracking Links</h3>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search links..."
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

        {/* Links Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Link Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Offer</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
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
                        <Link className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{link.name}</p>
                        <p className="text-sm text-gray-500">{link.trafficSource} • Created {link.createdAt}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{link.offer}</p>
                      <p className="text-sm text-gray-500">Sub ID: {link.subId}</p>
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

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            onClick={handleCreateLink}
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <Plus className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-gray-900">Create New Link</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
            <BarChart3 className="w-5 h-5 text-emerald-600" />
            <span className="font-medium text-gray-900">View Analytics</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors">
            <ExternalLink className="w-5 h-5 text-orange-600" />
            <span className="font-medium text-gray-900">Bulk Actions</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
            <Copy className="w-5 h-5 text-purple-600" />
            <span className="font-medium text-gray-900">Export Links</span>
          </button>
        </div>
      </div>

      {/* Create Link Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Link</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Facebook Campaign #1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Offer</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Choose an offer</option>
                  <option value="1">Premium Dating App</option>
                  <option value="2">Crypto Trading Platform</option>
                  <option value="3">VPN Service Trial</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sub ID (Optional)</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., fb_campaign_001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Traffic Source</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select source</option>
                  <option value="facebook">Facebook Ads</option>
                  <option value="google">Google Ads</option>
                  <option value="email">Email Marketing</option>
                  <option value="youtube">YouTube</option>
                  <option value="instagram">Instagram</option>
                  <option value="other">Other</option>
                </select>
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
                Create Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Link Details Modal */}
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
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Offer</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedLink.offer}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Traffic Source</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedLink.trafficSource}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Total Clicks</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedLink.clicks.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Conversions</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedLink.conversions}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Conversion Rate</label>
                  <p className="text-lg font-semibold text-emerald-600">{selectedLink.cvr}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Revenue</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedLink.revenue}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Tracking URL</label>
                <div className="flex items-center space-x-2 mt-1">
                  <input
                    type="text"
                    value={selectedLink.trackingUrl}
                    readOnly
                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm"
                  />
                  <button
                    onClick={() => copyToClipboard(selectedLink.trackingUrl)}
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Short URL</label>
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
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setSelectedLink(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Edit Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyLinksPage;