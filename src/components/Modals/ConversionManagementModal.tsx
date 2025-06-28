import React, { useState } from 'react';
import { X, CheckCircle, XCircle, Clock, Filter, Search, Eye, MessageSquare } from 'lucide-react';

interface ConversionManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ConversionManagementModal: React.FC<ConversionManagementModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConversion, setSelectedConversion] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);

  const conversions = [
    {
      id: 'conv_001',
      clickId: 'click_12345',
      offer: 'Dating App Install',
      affiliate: 'Marketing Pro',
      value: 25.00,
      payout: 20.00,
      status: 'pending',
      timestamp: '2024-01-15 14:30:00',
      fraudScore: 15,
      ipAddress: '192.168.1.100',
      country: 'US',
      device: 'Mobile',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)',
      scrubbed: false,
      throttled: false,
      adminNotes: ''
    },
    {
      id: 'conv_002',
      clickId: 'click_12346',
      offer: 'Crypto Trading Platform',
      affiliate: 'Digital Expert',
      value: 40.00,
      payout: 32.00,
      status: 'pending',
      timestamp: '2024-01-15 13:15:00',
      fraudScore: 35,
      ipAddress: '10.0.0.50',
      country: 'CA',
      device: 'Desktop',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      scrubbed: false,
      throttled: false,
      adminNotes: ''
    },
    {
      id: 'conv_003',
      clickId: 'click_12347',
      offer: 'VPN Service Trial',
      affiliate: 'Growth Hacker',
      value: 15.00,
      payout: 12.00,
      status: 'approved',
      timestamp: '2024-01-15 12:00:00',
      fraudScore: 8,
      ipAddress: '172.16.0.10',
      country: 'UK',
      device: 'Desktop',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      scrubbed: false,
      throttled: false,
      adminNotes: 'Clean conversion, approved automatically'
    },
    {
      id: 'conv_004',
      clickId: 'click_12348',
      offer: 'Online Casino',
      affiliate: 'Performance King',
      value: 50.00,
      payout: 40.00,
      status: 'rejected',
      timestamp: '2024-01-15 11:30:00',
      fraudScore: 85,
      ipAddress: '192.168.1.200',
      country: 'US',
      device: 'Mobile',
      userAgent: 'Bot/1.0',
      scrubbed: true,
      throttled: false,
      adminNotes: 'High fraud score, suspicious user agent'
    }
  ];

  const filteredConversions = conversions.filter(conversion => {
    const matchesSearch = conversion.offer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conversion.affiliate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conversion.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || conversion.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleApprove = (conversionId: string) => {
    console.log('Approving conversion:', conversionId);
    // In production, this would call an API
    onSuccess();
  };

  const handleReject = (conversionId: string, reason: string) => {
    console.log('Rejecting conversion:', conversionId, 'Reason:', reason);
    // In production, this would call an API
    onSuccess();
  };

  const handleScrub = (conversionId: string) => {
    console.log('Scrubbing conversion:', conversionId);
    // In production, this would call an API
    onSuccess();
  };

  const handleViewDetails = (conversion: any) => {
    setSelectedConversion(conversion);
    setShowDetails(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-emerald-100 text-emerald-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'scrubbed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFraudScoreColor = (score: number) => {
    if (score < 20) return 'text-emerald-600';
    if (score < 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-7xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Conversion Management</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Filters and Search */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search conversions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex space-x-2">
                {['all', 'pending', 'approved', 'rejected', 'scrubbed'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                      activeTab === tab
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Advanced Filters</span>
            </button>
          </div>

          {/* Conversions Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Conversion ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Offer</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Affiliate</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Value</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Fraud Score</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Timestamp</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredConversions.map((conversion) => (
                  <tr key={conversion.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-sm text-gray-900">{conversion.id}</span>
                        {conversion.scrubbed && (
                          <span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">Scrubbed</span>
                        )}
                        {conversion.throttled && (
                          <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">Throttled</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{conversion.offer}</p>
                        <p className="text-sm text-gray-500">{conversion.country} • {conversion.device}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-900">{conversion.affiliate}</td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-semibold text-gray-900">${conversion.value.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">Payout: ${conversion.payout.toFixed(2)}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(conversion.status)}`}>
                        {conversion.status.charAt(0).toUpperCase() + conversion.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`font-medium ${getFraudScoreColor(conversion.fraudScore)}`}>
                        {conversion.fraudScore}%
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-500">
                      {new Date(conversion.timestamp).toLocaleString()}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewDetails(conversion)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {conversion.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(conversion.id)}
                              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                              title="Approve"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleReject(conversion.id, 'Manual review')}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Reject"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleScrub(conversion.id)}
                              className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                              title="Scrub"
                            >
                              <Clock className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Stats */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-900">Pending</span>
              </div>
              <p className="text-2xl font-bold text-yellow-900 mt-2">
                {conversions.filter(c => c.status === 'pending').length}
              </p>
            </div>
            <div className="bg-emerald-50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-900">Approved</span>
              </div>
              <p className="text-2xl font-bold text-emerald-900 mt-2">
                {conversions.filter(c => c.status === 'approved').length}
              </p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <XCircle className="w-5 h-5 text-red-600" />
                <span className="text-sm font-medium text-red-900">Rejected</span>
              </div>
              <p className="text-2xl font-bold text-red-900 mt-2">
                {conversions.filter(c => c.status === 'rejected').length}
              </p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-medium text-orange-900">Scrubbed</span>
              </div>
              <p className="text-2xl font-bold text-orange-900 mt-2">
                {conversions.filter(c => c.scrubbed).length}
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Total Value</span>
              </div>
              <p className="text-2xl font-bold text-blue-900 mt-2">
                ${conversions.reduce((sum, c) => sum + c.value, 0).toFixed(0)}
              </p>
            </div>
          </div>
        </div>

        {/* Conversion Details Modal */}
        {showDetails && selectedConversion && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Conversion Details</h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Conversion ID</label>
                    <p className="font-mono text-sm">{selectedConversion.id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Click ID</label>
                    <p className="font-mono text-sm">{selectedConversion.clickId}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">IP Address</label>
                    <p className="text-sm">{selectedConversion.ipAddress}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Fraud Score</label>
                    <p className={`text-sm font-medium ${getFraudScoreColor(selectedConversion.fraudScore)}`}>
                      {selectedConversion.fraudScore}%
                    </p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">User Agent</label>
                  <p className="text-sm bg-gray-50 p-2 rounded">{selectedConversion.userAgent}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Admin Notes</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Add notes about this conversion..."
                    defaultValue={selectedConversion.adminNotes}
                  />
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleApprove(selectedConversion.id)}
                    className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(selectedConversion.id, 'Manual review')}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleScrub(selectedConversion.id)}
                    className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    Scrub
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversionManagementModal;