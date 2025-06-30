import React, { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Users, DollarSign, TrendingUp, Eye, Mail, Phone, Edit, Ban, UserX, UserCheck } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Affiliate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  totalEarnings: number;
  conversions: number;
  clicks: number;
  conversionRate: number;
  joinedDate: string;
  paymentMethod: string;
  country: string;
}

const mockAffiliates: Affiliate[] = [
  {
    id: '1',
    name: 'John Marketing Pro',
    email: 'john@marketingpro.com',
    phone: '+1-555-0123',
    company: 'Marketing Pro LLC',
    status: 'active',
    totalEarnings: 15420.50,
    conversions: 342,
    clicks: 12450,
    conversionRate: 2.75,
    joinedDate: '2024-01-15',
    paymentMethod: 'PayPal',
    country: 'US'
  },
  {
    id: '2',
    name: 'Sarah Digital Expert',
    email: 'sarah@digitalexpert.com',
    phone: '+1-555-0456',
    company: 'Digital Expert Agency',
    status: 'active',
    totalEarnings: 23150.75,
    conversions: 456,
    clicks: 18920,
    conversionRate: 2.41,
    joinedDate: '2024-02-20',
    paymentMethod: 'Bank Transfer',
    country: 'CA'
  },
  {
    id: '3',
    name: 'Mike Performance King',
    email: 'mike@performance.com',
    phone: '+1-555-0789',
    company: 'Performance Marketing Inc',
    status: 'pending',
    totalEarnings: 0,
    conversions: 0,
    clicks: 0,
    conversionRate: 0,
    joinedDate: '2024-03-10',
    paymentMethod: 'PayPal',
    country: 'UK'
  },
  {
    id: '4',
    name: 'Lisa Growth Hacker',
    email: 'lisa@growthhack.com',
    phone: '+1-555-0321',
    company: 'Growth Hack Solutions',
    status: 'suspended',
    totalEarnings: 8750.25,
    conversions: 189,
    clicks: 7890,
    conversionRate: 2.39,
    joinedDate: '2024-01-05',
    paymentMethod: 'Crypto',
    country: 'AU'
  }
];

export default function AffiliatesPage() {
  const { impersonate } = useAuth();
  const [affiliates, setAffiliates] = useState<Affiliate[]>(mockAffiliates);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedAffiliate, setSelectedAffiliate] = useState<Affiliate | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const filteredAffiliates = affiliates.filter(affiliate => {
    const matchesSearch = affiliate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         affiliate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (affiliate.company && affiliate.company.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || affiliate.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'suspended':
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

  const handleStatusChange = (affiliateId: string, newStatus: 'active' | 'suspended' | 'pending') => {
    setAffiliates(prev => prev.map(affiliate => 
      affiliate.id === affiliateId 
        ? { ...affiliate, status: newStatus }
        : affiliate
    ));
    
    const affiliate = affiliates.find(a => a.id === affiliateId);
    if (affiliate) {
      alert(`${affiliate.name} has been ${newStatus === 'suspended' ? 'banned' : newStatus === 'active' ? 'activated' : 'set to pending'}`);
    }
  };

  const handleImpersonate = async (affiliate: Affiliate) => {
    try {
      await impersonate('demo-tenant', affiliate.email);
      alert(`Now impersonating ${affiliate.name}`);
    } catch (error) {
      console.error('Impersonation failed:', error);
      alert('Impersonation failed');
    }
  };

  const handleEdit = (affiliate: Affiliate) => {
    setSelectedAffiliate(affiliate);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (selectedAffiliate) {
      setAffiliates(prev => prev.map(affiliate => 
        affiliate.id === selectedAffiliate.id 
          ? selectedAffiliate
          : affiliate
      ));
      setShowEditModal(false);
      setSelectedAffiliate(null);
      alert('Affiliate updated successfully');
    }
  };

  const totalStats = {
    totalAffiliates: affiliates.length,
    activeAffiliates: affiliates.filter(a => a.status === 'active').length,
    totalEarnings: affiliates.reduce((sum, a) => sum + a.totalEarnings, 0),
    avgConversionRate: affiliates.length > 0 
      ? affiliates.reduce((sum, a) => sum + a.conversionRate, 0) / affiliates.length 
      : 0
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Affiliates</h1>
          <p className="text-gray-600">Manage and monitor your affiliate partners</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Add Affiliate
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Affiliates</p>
              <p className="text-2xl font-bold text-gray-900">{totalStats.totalAffiliates}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Affiliates</p>
              <p className="text-2xl font-bold text-gray-900">{totalStats.activeAffiliates}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Earnings</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalStats.totalEarnings)}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{totalStats.avgConversionRate.toFixed(1)}%</p>
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
                placeholder="Search affiliates..."
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
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Affiliates Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Affiliate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Earnings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conversions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conversion Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAffiliates.map((affiliate) => (
                <tr key={affiliate.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                          <span className="text-sm font-medium text-white">
                            {affiliate.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{affiliate.name}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-2">
                          <Mail className="w-3 h-3" />
                          {affiliate.email}
                        </div>
                        {affiliate.phone && (
                          <div className="text-sm text-gray-500 flex items-center gap-2">
                            <Phone className="w-3 h-3" />
                            {affiliate.phone}
                          </div>
                        )}
                        {affiliate.company && (
                          <div className="text-sm text-gray-500">{affiliate.company}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(affiliate.status)}`}>
                      {affiliate.status.charAt(0).toUpperCase() + affiliate.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(affiliate.totalEarnings)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="font-medium">{affiliate.conversions}</div>
                      <div className="text-xs text-gray-500">{affiliate.clicks.toLocaleString()} clicks</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="font-medium text-green-600">{affiliate.conversionRate}%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                        {affiliate.paymentMethod}
                      </span>
                      <span className="ml-2 text-xs text-gray-500">{affiliate.country}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(affiliate.joinedDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleImpersonate(affiliate)}
                        className="text-blue-600 hover:text-blue-900 transition-colors p-1 rounded"
                        title="Impersonate"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(affiliate)}
                        className="text-gray-600 hover:text-gray-900 transition-colors p-1 rounded"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      {affiliate.status === 'active' ? (
                        <button
                          onClick={() => handleStatusChange(affiliate.id, 'suspended')}
                          className="text-red-600 hover:text-red-900 transition-colors p-1 rounded"
                          title="Ban"
                        >
                          <Ban className="w-4 h-4" />
                        </button>
                      ) : affiliate.status === 'suspended' ? (
                        <button
                          onClick={() => handleStatusChange(affiliate.id, 'active')}
                          className="text-green-600 hover:text-green-900 transition-colors p-1 rounded"
                          title="Activate"
                        >
                          <UserCheck className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStatusChange(affiliate.id, 'active')}
                          className="text-green-600 hover:text-green-900 transition-colors p-1 rounded"
                          title="Approve"
                        >
                          <UserCheck className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAffiliates.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No affiliates found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by adding your first affiliate.'
              }
            </p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && selectedAffiliate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Affiliate</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={selectedAffiliate.name}
                  onChange={(e) => setSelectedAffiliate({...selectedAffiliate, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={selectedAffiliate.email}
                  onChange={(e) => setSelectedAffiliate({...selectedAffiliate, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={selectedAffiliate.phone || ''}
                  onChange={(e) => setSelectedAffiliate({...selectedAffiliate, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                  type="text"
                  value={selectedAffiliate.company || ''}
                  onChange={(e) => setSelectedAffiliate({...selectedAffiliate, company: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={selectedAffiliate.status}
                  onChange={(e) => setSelectedAffiliate({...selectedAffiliate, status: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                  <option value="inactive">Inactive</option>
                </select>
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
    </div>
  );
}