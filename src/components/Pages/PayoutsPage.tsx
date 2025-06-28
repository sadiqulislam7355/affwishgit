import React, { useState } from 'react';
import { DollarSign, Calendar, Users, TrendingUp, Download, Eye, CheckCircle, XCircle, Clock, Filter, Search } from 'lucide-react';

const PayoutsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');

  const payoutRequests = [
    {
      id: 'payout_001',
      affiliate: 'John Marketing Pro',
      email: 'john@marketingpro.com',
      amount: 2450.00,
      method: 'PayPal',
      status: 'pending',
      requestedAt: '2024-01-15',
      period: 'Jan 1-15, 2024',
      conversions: 98,
      notes: ''
    },
    {
      id: 'payout_002',
      affiliate: 'Sarah Digital Expert',
      email: 'sarah@digitalexpert.com',
      amount: 3120.00,
      method: 'Bank Transfer',
      status: 'approved',
      requestedAt: '2024-01-14',
      period: 'Jan 1-14, 2024',
      conversions: 156,
      notes: 'Approved for processing'
    },
    {
      id: 'payout_003',
      affiliate: 'Mike Performance',
      email: 'mike@performance.com',
      amount: 1890.00,
      method: 'PayPal',
      status: 'paid',
      requestedAt: '2024-01-12',
      period: 'Dec 16-31, 2023',
      conversions: 76,
      notes: 'Payment completed'
    },
    {
      id: 'payout_004',
      affiliate: 'Lisa Growth Hacker',
      email: 'lisa@growthhack.com',
      amount: 890.00,
      method: 'Crypto',
      status: 'rejected',
      requestedAt: '2024-01-10',
      period: 'Dec 1-15, 2023',
      conversions: 35,
      notes: 'Insufficient minimum threshold'
    }
  ];

  const filteredPayouts = payoutRequests.filter(payout => {
    const matchesSearch = payout.affiliate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payout.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payout.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || payout.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'paid': return 'bg-emerald-100 text-emerald-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'approved': return CheckCircle;
      case 'paid': return CheckCircle;
      case 'rejected': return XCircle;
      default: return Clock;
    }
  };

  const totalStats = {
    totalRequests: payoutRequests.length,
    pendingAmount: payoutRequests.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0),
    paidAmount: payoutRequests.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0),
    pendingCount: payoutRequests.filter(p => p.status === 'pending').length
  };

  const handleApprove = (payoutId: string) => {
    console.log('Approving payout:', payoutId);
    // In production, this would call an API
  };

  const handleReject = (payoutId: string) => {
    console.log('Rejecting payout:', payoutId);
    // In production, this would call an API
  };

  const handleMarkPaid = (payoutId: string) => {
    console.log('Marking as paid:', payoutId);
    // In production, this would call an API
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payout Management</h1>
          <p className="text-gray-600">Process and manage affiliate payout requests</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Bulk Actions
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Requests</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalStats.pendingCount}</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Amount</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">${totalStats.pendingAmount.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Paid This Month</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">${totalStats.paidAmount.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Requests</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalStats.totalRequests}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-4">
            {['all', 'pending', 'approved', 'paid', 'rejected'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search payouts..."
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

        {/* Payouts Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Affiliate</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Method</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Period</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Requested</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayouts.map((payout) => {
                const StatusIcon = getStatusIcon(payout.status);
                return (
                  <tr key={payout.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {payout.affiliate.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{payout.affiliate}</p>
                          <p className="text-sm text-gray-500">{payout.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-semibold text-gray-900">${payout.amount.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">{payout.conversions} conversions</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                        {payout.method}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-900">{payout.period}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <StatusIcon className="w-4 h-4 text-gray-400" />
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(payout.status)}`}>
                          {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-900">
                      {new Date(payout.requestedAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        {payout.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(payout.id)}
                              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleReject(payout.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {payout.status === 'approved' && (
                          <button
                            onClick={() => handleMarkPaid(payout.id)}
                            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          >
                            <DollarSign className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredPayouts.length === 0 && (
          <div className="text-center py-12">
            <DollarSign className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No payout requests found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || activeTab !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'No payout requests have been submitted yet.'
              }
            </p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span className="font-medium text-gray-900">Approve All Pending</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <DollarSign className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-gray-900">Process Payments</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors">
            <Download className="w-5 h-5 text-orange-600" />
            <span className="font-medium text-gray-900">Export Report</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
            <Calendar className="w-5 h-5 text-purple-600" />
            <span className="font-medium text-gray-900">Schedule Payouts</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayoutsPage;