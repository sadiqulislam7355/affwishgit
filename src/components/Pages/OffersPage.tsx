import React, { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Target, DollarSign, TrendingUp, Eye, Edit, Trash2 } from 'lucide-react';

interface Offer {
  id: string;
  name: string;
  advertiser: string;
  payout: number;
  payoutType: 'CPA' | 'CPI' | 'CPL' | 'RevShare';
  category: string;
  status: 'active' | 'paused' | 'expired';
  countries: string[];
  devices: string[];
  conversions: number;
  clicks: number;
  conversionRate: number;
  epc: number;
  createdAt: string;
}

const mockOffers: Offer[] = [
  {
    id: '1',
    name: 'Premium Dating App',
    advertiser: 'Dating Corp',
    payout: 25.00,
    payoutType: 'CPA',
    category: 'Dating',
    status: 'active',
    countries: ['US', 'CA', 'UK'],
    devices: ['Mobile', 'Desktop'],
    conversions: 342,
    clicks: 12450,
    conversionRate: 2.75,
    epc: 0.69,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Crypto Trading Platform',
    advertiser: 'Crypto Exchange',
    payout: 40.00,
    payoutType: 'CPA',
    category: 'Finance',
    status: 'active',
    countries: ['US', 'AU', 'DE'],
    devices: ['Desktop', 'Mobile'],
    conversions: 189,
    clicks: 8920,
    conversionRate: 2.12,
    epc: 0.85,
    createdAt: '2024-01-12'
  },
  {
    id: '3',
    name: 'VPN Service Trial',
    advertiser: 'VPN Corp',
    payout: 15.00,
    payoutType: 'CPA',
    category: 'Software',
    status: 'active',
    countries: ['Global'],
    devices: ['Desktop', 'Mobile', 'Tablet'],
    conversions: 567,
    clicks: 18760,
    conversionRate: 3.02,
    epc: 0.45,
    createdAt: '2024-01-10'
  },
  {
    id: '4',
    name: 'Online Casino',
    advertiser: 'Casino Group',
    payout: 50.00,
    payoutType: 'CPA',
    category: 'Gaming',
    status: 'paused',
    countries: ['US', 'CA'],
    devices: ['Desktop', 'Mobile'],
    conversions: 89,
    clicks: 4560,
    conversionRate: 1.95,
    epc: 0.98,
    createdAt: '2024-01-08'
  }
];

const OffersPage: React.FC = () => {
  const [offers] = useState<Offer[]>(mockOffers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  const filteredOffers = offers.filter(offer => {
    const matchesSearch = offer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.advertiser.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || offer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const totalStats = {
    totalOffers: offers.length,
    activeOffers: offers.filter(o => o.status === 'active').length,
    totalConversions: offers.reduce((sum, o) => sum + o.conversions, 0),
    avgEPC: offers.reduce((sum, o) => sum + o.epc, 0) / offers.length
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Offers</h1>
          <p className="text-gray-600">Manage and monitor your advertising offers</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Add Offer
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Offers</p>
              <p className="text-2xl font-bold text-gray-900">{totalStats.totalOffers}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Offers</p>
              <p className="text-2xl font-bold text-gray-900">{totalStats.activeOffers}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Conversions</p>
              <p className="text-2xl font-bold text-gray-900">{totalStats.totalConversions.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average EPC</p>
              <p className="text-2xl font-bold text-gray-900">${totalStats.avgEPC.toFixed(2)}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Eye className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search offers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>
      </div>

      {/* Offers Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Offer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Advertiser
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payout
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conversions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CVR
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  EPC
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOffers.map((offer) => (
                <tr key={offer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                          <Target className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{offer.name}</div>
                        <div className="text-sm text-gray-500">
                          {offer.countries.join(', ')} • {offer.devices.join(', ')}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {offer.advertiser}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(offer.payout)}
                    <div className="text-xs text-gray-500">{offer.payoutType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                      {offer.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(offer.status)}`}>
                      {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="font-medium">{offer.conversions}</div>
                    <div className="text-xs text-gray-500">{offer.clicks.toLocaleString()} clicks</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    {offer.conversionRate.toFixed(2)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${offer.epc.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => setSelectedOffer(offer)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOffers.length === 0 && (
          <div className="text-center py-12">
            <Target className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No offers found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by adding your first offer.'
              }
            </p>
          </div>
        )}
      </div>

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
                  <label className="text-sm font-medium text-gray-500">Advertiser</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedOffer.advertiser}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Payout</label>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatCurrency(selectedOffer.payout)} ({selectedOffer.payoutType})
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Category</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedOffer.category}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Countries</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedOffer.countries.join(', ')}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedOffer.status)}`}>
                    {selectedOffer.status.charAt(0).toUpperCase() + selectedOffer.status.slice(1)}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Conversions</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedOffer.conversions}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Conversion Rate</label>
                  <p className="text-lg font-semibold text-emerald-600">{selectedOffer.conversionRate.toFixed(2)}%</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">EPC</label>
                  <p className="text-lg font-semibold text-gray-900">${selectedOffer.epc.toFixed(2)}</p>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setSelectedOffer(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Get Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OffersPage;