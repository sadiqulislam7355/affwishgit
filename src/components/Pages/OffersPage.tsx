import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, MoreVertical, Target, DollarSign, TrendingUp, Eye, Edit, Trash2 } from 'lucide-react';
import { apiService } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import AddOfferModal from '../Modals/AddOfferModal';

interface Offer {
  id: string;
  name: string;
  advertiser: string;
  payout: number;
  payout_type: 'CPA' | 'CPI' | 'CPL' | 'RevShare';
  category: string;
  status: 'active' | 'paused' | 'expired';
  countries: string[];
  devices: string[];
  conversions?: number;
  clicks?: number;
  conversion_rate?: number;
  epc?: number;
  created_at: string;
  offer_url: string;
  tracking_url: string;
  global_postback_enabled: boolean;
}

const OffersPage: React.FC = () => {
  const { profile } = useAuth();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    setLoading(true);
    try {
      const response = await apiService.getOffers();
      if (response.success && response.data) {
        setOffers(response.data);
      }
    } catch (error) {
      console.error('Failed to load offers:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const handleEdit = (offer: Offer) => {
    setSelectedOffer(offer);
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    if (selectedOffer) {
      try {
        const response = await apiService.updateOffer(selectedOffer.id, selectedOffer);
        if (response.success) {
          await loadOffers();
          setShowEditModal(false);
          setSelectedOffer(null);
          alert('Offer updated successfully');
        }
      } catch (error) {
        console.error('Failed to update offer:', error);
        alert('Failed to update offer');
      }
    }
  };

  const handleDelete = async (offerId: string) => {
    if (confirm('Are you sure you want to delete this offer?')) {
      try {
        const response = await apiService.deleteOffer(offerId);
        if (response.success) {
          await loadOffers();
          alert('Offer deleted successfully');
        }
      } catch (error) {
        console.error('Failed to delete offer:', error);
        alert('Failed to delete offer');
      }
    }
  };

  const handleStatusChange = async (offerId: string, newStatus: 'active' | 'paused' | 'expired') => {
    try {
      const offer = offers.find(o => o.id === offerId);
      if (offer) {
        const response = await apiService.updateOffer(offerId, { ...offer, status: newStatus });
        if (response.success) {
          await loadOffers();
          alert(`${offer.name} has been ${newStatus}`);
        }
      }
    } catch (error) {
      console.error('Failed to update offer status:', error);
      alert('Failed to update offer status');
    }
  };

  const totalStats = {
    totalOffers: offers.length,
    activeOffers: offers.filter(o => o.status === 'active').length,
    totalConversions: offers.reduce((sum, o) => sum + (o.conversions || 0), 0),
    avgEPC: offers.length > 0 ? offers.reduce((sum, o) => sum + (o.epc || 0), 0) / offers.length : 0
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-2xl mx-auto mb-4 animate-pulse"></div>
          <p className="text-gray-600">Loading offers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {profile?.role === 'admin' ? 'Manage Offers' : 'Available Offers'}
          </h1>
          <p className="text-gray-600">
            {profile?.role === 'admin' 
              ? 'Manage and monitor your advertising offers' 
              : 'Browse and promote available offers'
            }
          </p>
        </div>
        {profile?.role === 'admin' && (
          <button 
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Offer
          </button>
        )}
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
                  Countries
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Global Postback
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
                          {offer.countries?.slice(0, 3).join(', ')} • {offer.devices?.join(', ')}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {offer.advertiser}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(offer.payout)}
                    <div className="text-xs text-gray-500">{offer.payout_type}</div>
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
                    {offer.countries?.slice(0, 2).join(', ')}
                    {offer.countries && offer.countries.length > 2 && ` +${offer.countries.length - 2}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      offer.global_postback_enabled 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {offer.global_postback_enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => setSelectedOffer(offer)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {profile?.role === 'admin' && (
                        <>
                          <button
                            onClick={() => handleEdit(offer)}
                            className="text-gray-600 hover:text-gray-900 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(offer.id)}
                            className="text-red-600 hover:text-red-900 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <div className="relative group">
                            <button className="text-gray-400 hover:text-gray-600 transition-colors">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                            <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                              {offer.status === 'active' ? (
                                <button
                                  onClick={() => handleStatusChange(offer.id, 'paused')}
                                  className="w-full text-left px-3 py-2 text-sm text-yellow-600 hover:bg-yellow-50"
                                >
                                  Pause
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleStatusChange(offer.id, 'active')}
                                  className="w-full text-left px-3 py-2 text-sm text-green-600 hover:bg-green-50"
                                >
                                  Activate
                                </button>
                              )}
                            </div>
                          </div>
                        </>
                      )}
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

      {/* Add Offer Modal */}
      <AddOfferModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)} 
        onSuccess={() => {
          loadOffers();
          setShowAddModal(false);
        }}
      />

      {/* Edit Modal */}
      {showEditModal && selectedOffer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Offer</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Offer Name</label>
                <input
                  type="text"
                  value={selectedOffer.name}
                  onChange={(e) => setSelectedOffer({...selectedOffer, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Advertiser</label>
                <input
                  type="text"
                  value={selectedOffer.advertiser}
                  onChange={(e) => setSelectedOffer({...selectedOffer, advertiser: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payout</label>
                <input
                  type="number"
                  step="0.01"
                  value={selectedOffer.payout}
                  onChange={(e) => setSelectedOffer({...selectedOffer, payout: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={selectedOffer.category}
                  onChange={(e) => setSelectedOffer({...selectedOffer, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Dating">Dating</option>
                  <option value="Finance">Finance</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Software">Software</option>
                  <option value="Health">Health</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={selectedOffer.status}
                  onChange={(e) => setSelectedOffer({...selectedOffer, status: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="expired">Expired</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Global Postback</label>
                <select
                  value={selectedOffer.global_postback_enabled ? 'enabled' : 'disabled'}
                  onChange={(e) => setSelectedOffer({...selectedOffer, global_postback_enabled: e.target.value === 'enabled'})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="enabled">Enabled</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Offer URL</label>
                <input
                  type="url"
                  value={selectedOffer.offer_url}
                  onChange={(e) => setSelectedOffer({...selectedOffer, offer_url: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Tracking URL</label>
                <input
                  type="url"
                  value={selectedOffer.tracking_url}
                  onChange={(e) => setSelectedOffer({...selectedOffer, tracking_url: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Offer Details Modal */}
      {selectedOffer && !showEditModal && (
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
                    {formatCurrency(selectedOffer.payout)} ({selectedOffer.payout_type})
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Category</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedOffer.category}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Countries</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedOffer.countries?.join(', ')}</p>
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
                  <label className="text-sm font-medium text-gray-500">Devices</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedOffer.devices?.join(', ')}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Created</label>
                  <p className="text-lg font-semibold text-gray-900">{formatDate(selectedOffer.created_at)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Global Postback</label>
                  <p className={`text-lg font-semibold ${selectedOffer.global_postback_enabled ? 'text-emerald-600' : 'text-gray-600'}`}>
                    {selectedOffer.global_postback_enabled ? 'Enabled' : 'Disabled'}
                  </p>
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
              {profile?.role === 'admin' && (
                <button 
                  onClick={() => {
                    setShowEditModal(true);
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Edit Offer
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OffersPage;