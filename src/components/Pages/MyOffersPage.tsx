import React, { useState } from 'react';
import { Target, Plus, Edit, Trash2, Eye, Search, Filter, BarChart3, Users, DollarSign } from 'lucide-react';

const MyOffersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const myOffers = [
    {
      id: '1',
      name: 'Premium Investment Course',
      description: 'Comprehensive investment training program',
      payout: '$45.00',
      payoutType: 'CPA',
      status: 'active',
      conversions: 320,
      clicks: 2560,
      revenue: '$14,400',
      affiliates: 28,
      conversionRate: '12.5%',
      epc: '$5.63',
      createdAt: '2024-01-10',
      category: 'Finance',
      countries: ['US', 'CA', 'UK'],
      devices: ['Desktop', 'Mobile']
    },
    {
      id: '2',
      name: 'Crypto Trading Masterclass',
      description: 'Advanced cryptocurrency trading strategies',
      payout: '$60.00',
      payoutType: 'CPA',
      status: 'active',
      conversions: 180,
      clicks: 2025,
      revenue: '$10,800',
      affiliates: 15,
      conversionRate: '8.9%',
      epc: '$5.33',
      createdAt: '2024-01-08',
      category: 'Finance',
      countries: ['US', 'AU', 'DE'],
      devices: ['Desktop', 'Mobile', 'Tablet']
    },
    {
      id: '3',
      name: 'Real Estate Investing Guide',
      description: 'Complete guide to real estate investment',
      payout: '$35.00',
      payoutType: 'CPA',
      status: 'paused',
      conversions: 95,
      clicks: 625,
      revenue: '$3,325',
      affiliates: 8,
      conversionRate: '15.2%',
      epc: '$5.32',
      createdAt: '2024-01-05',
      category: 'Finance',
      countries: ['US', 'CA'],
      devices: ['Desktop']
    }
  ];

  const filteredOffers = myOffers.filter(offer =>
    offer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    offer.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStats = {
    totalOffers: myOffers.length,
    activeOffers: myOffers.filter(o => o.status === 'active').length,
    totalConversions: myOffers.reduce((sum, offer) => sum + offer.conversions, 0),
    totalRevenue: myOffers.reduce((sum, offer) => sum + parseFloat(offer.revenue.replace('$', '').replace(',', '')), 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Offers</h1>
          <p className="text-gray-600">Manage your advertising offers and track performance</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Offer</span>
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Export Data
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Offers</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalStats.totalOffers}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Offers</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalStats.activeOffers}</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-lg">
              <BarChart3 className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Conversions</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalStats.totalConversions}</p>
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
              <p className="text-3xl font-bold text-gray-900 mt-2">${totalStats.totalRevenue.toFixed(0)}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Offers Management */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Offer Performance</h3>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search offers..."
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

        {/* Offers Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Offer</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Payout</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Conversions</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">CVR</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Revenue</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Affiliates</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOffers.map((offer) => (
                <tr key={offer.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <Target className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{offer.name}</p>
                        <p className="text-sm text-gray-500">{offer.category} • Created {offer.createdAt}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      offer.status === 'active' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-semibold text-gray-900">{offer.payout}</td>
                  <td className="py-4 px-4 font-medium text-gray-900">{offer.conversions}</td>
                  <td className="py-4 px-4 font-medium text-emerald-600">{offer.conversionRate}</td>
                  <td className="py-4 px-4 font-semibold text-gray-900">{offer.revenue}</td>
                  <td className="py-4 px-4 text-gray-900">{offer.affiliates}</td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedOffer(offer)}
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

      {/* Create Offer Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Offer</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Offer Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Premium Course"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select Category</option>
                  <option value="finance">Finance</option>
                  <option value="education">Education</option>
                  <option value="health">Health</option>
                  <option value="technology">Technology</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payout Amount</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="25.00"
                />
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
                Create Offer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Offer Details Modal */}
      {selectedOffer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{selectedOffer.name}</h3>
              <button
                onClick={() => setSelectedOffer(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Eye className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Category</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedOffer.category}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Payout</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedOffer.payout}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Conversions</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedOffer.conversions}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Conversion Rate</label>
                  <p className="text-lg font-semibold text-emerald-600">{selectedOffer.conversionRate}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Revenue</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedOffer.revenue}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Active Affiliates</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedOffer.affiliates}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">EPC</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedOffer.epc}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    selectedOffer.status === 'active' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedOffer.status.charAt(0).toUpperCase() + selectedOffer.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <label className="text-sm font-medium text-gray-500">Description</label>
              <p className="text-gray-900 mt-1">{selectedOffer.description}</p>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setSelectedOffer(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Edit Offer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOffersPage;