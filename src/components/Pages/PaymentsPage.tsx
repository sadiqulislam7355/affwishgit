import React, { useState } from 'react';
import { CreditCard, DollarSign, Calendar, Download, Eye, Plus, CheckCircle } from 'lucide-react';

const PaymentsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('earnings');
  const [showRequestModal, setShowRequestModal] = useState(false);

  const earnings = [
    {
      id: '1',
      offer: 'Premium Dating App',
      conversions: 45,
      payout: '$25.00',
      totalEarnings: '$1,125.00',
      date: '2024-01-15',
      status: 'approved'
    },
    {
      id: '2',
      offer: 'Crypto Trading Platform',
      conversions: 32,
      payout: '$40.00',
      totalEarnings: '$1,280.00',
      date: '2024-01-14',
      status: 'approved'
    },
    {
      id: '3',
      offer: 'VPN Service Trial',
      conversions: 67,
      payout: '$15.00',
      totalEarnings: '$1,005.00',
      date: '2024-01-13',
      status: 'pending'
    }
  ];

  const paymentHistory = [
    {
      id: 'pay_001',
      amount: '$2,450.00',
      method: 'PayPal',
      status: 'completed',
      date: '2024-01-15',
      reference: 'PP-12345678',
      period: 'Jan 1-15, 2024'
    },
    {
      id: 'pay_002',
      amount: '$3,120.00',
      method: 'Bank Transfer',
      status: 'completed',
      date: '2024-01-01',
      reference: 'BT-87654321',
      period: 'Dec 16-31, 2023'
    },
    {
      id: 'pay_003',
      amount: '$2,890.00',
      method: 'PayPal',
      status: 'processing',
      date: '2023-12-15',
      reference: 'PP-11223344',
      period: 'Dec 1-15, 2023'
    }
  ];

  const totalEarnings = earnings.reduce((sum, earning) => 
    sum + parseFloat(earning.totalEarnings.replace('$', '').replace(',', '')), 0
  );

  const pendingEarnings = earnings
    .filter(e => e.status === 'pending')
    .reduce((sum, earning) => 
      sum + parseFloat(earning.totalEarnings.replace('$', '').replace(',', '')), 0
    );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-800';
      case 'approved': return 'bg-emerald-100 text-emerald-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payments & Earnings</h1>
          <p className="text-gray-600">Track your earnings and manage payment requests</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowRequestModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Request Payout</span>
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Export Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">${totalEarnings.toFixed(2)}</p>
              <p className="text-sm text-gray-500">Total Earnings</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">${pendingEarnings.toFixed(2)}</p>
              <p className="text-sm text-gray-500">Pending Earnings</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">$8,460</p>
              <p className="text-sm text-gray-500">Total Paid</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4">
        {['earnings', 'payments', 'settings'].map((tab) => (
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

      {/* Earnings Tab */}
      {activeTab === 'earnings' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Earnings</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Offer</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Date</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Conversions</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Payout</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Total</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {earnings.map((earning) => (
                  <tr key={earning.id} className="border-b border-gray-100">
                    <td className="py-4 px-6">
                      <div className="font-medium text-gray-900">{earning.offer}</div>
                    </td>
                    <td className="py-4 px-6 text-gray-900">
                      {new Date(earning.date).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-gray-900">{earning.conversions}</td>
                    <td className="py-4 px-6 font-medium text-gray-900">{earning.payout}</td>
                    <td className="py-4 px-6 font-semibold text-emerald-600">{earning.totalEarnings}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(earning.status)}`}>
                        {earning.status.charAt(0).toUpperCase() + earning.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Payments Tab */}
      {activeTab === 'payments' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Payment History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Payment ID</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Amount</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Method</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Period</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Date</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment) => (
                  <tr key={payment.id} className="border-b border-gray-100">
                    <td className="py-4 px-6">
                      <div className="font-mono text-sm text-gray-900">{payment.id}</div>
                      <div className="text-xs text-gray-500">{payment.reference}</div>
                    </td>
                    <td className="py-4 px-6 font-semibold text-gray-900">{payment.amount}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">{payment.method}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-900">{payment.period}</td>
                    <td className="py-4 px-6 text-gray-900">
                      {new Date(payment.date).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(payment.status)}`}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment Methods</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">PP</span>
                  </div>
                  <div>
                    <p className="font-medium">PayPal</p>
                    <p className="text-sm text-gray-500">affiliate@example.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 text-xs bg-emerald-100 text-emerald-800 rounded-full">Primary</span>
                  <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                    Edit
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-8 bg-gray-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">BT</span>
                  </div>
                  <div>
                    <p className="font-medium">Bank Transfer</p>
                    <p className="text-sm text-gray-500">****1234</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                    Edit
                  </button>
                </div>
              </div>
            </div>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Add Payment Method
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Payout</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="50">$50</option>
                  <option value="100">$100</option>
                  <option value="250">$250</option>
                  <option value="500">$500</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Frequency</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Save Settings
            </button>
          </div>
        </div>
      )}

      {/* Request Payout Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Payout</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                  defaultValue={pendingEarnings.toFixed(2)}
                />
                <p className="text-xs text-gray-500 mt-1">Available: ${pendingEarnings.toFixed(2)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="paypal">PayPal (affiliate@example.com)</option>
                  <option value="bank">Bank Transfer (****1234)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Any additional notes..."
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowRequestModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowRequestModal(false)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Request Payout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentsPage;