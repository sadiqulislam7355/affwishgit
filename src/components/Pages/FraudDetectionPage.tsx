import React, { useState } from 'react';
import { Shield, AlertTriangle, Eye, Settings, Play, CheckCircle, XCircle, Filter, Search, TrendingUp } from 'lucide-react';

const FraudDetectionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [showConfigModal, setShowConfigModal] = useState(false);

  const fraudAlerts = [
    {
      id: '1',
      type: 'bot_detected',
      severity: 'high',
      title: 'Bot Traffic Detected',
      description: 'Suspicious bot activity detected from IP range 192.168.1.x',
      affectedCampaign: 'Dating App Campaign',
      timestamp: '2024-01-15 14:30:00',
      status: 'open',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (compatible; bot/1.0)',
      clicks: 450,
      conversions: 0,
      fraudScore: 95
    },
    {
      id: '2',
      type: 'proxy_detected',
      severity: 'medium',
      title: 'Proxy/VPN Traffic',
      description: 'High volume of traffic from proxy servers detected',
      affectedCampaign: 'Crypto Platform Campaign',
      timestamp: '2024-01-15 13:15:00',
      status: 'investigating',
      ipAddress: '10.0.0.50',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      clicks: 280,
      conversions: 12,
      fraudScore: 68
    },
    {
      id: '3',
      type: 'click_flooding',
      severity: 'high',
      title: 'Click Flooding Attack',
      description: 'Abnormal click patterns detected from multiple IPs',
      affectedCampaign: 'VPN Service Campaign',
      timestamp: '2024-01-15 12:00:00',
      status: 'resolved',
      ipAddress: 'Multiple',
      userAgent: 'Various',
      clicks: 1250,
      conversions: 5,
      fraudScore: 88
    },
    {
      id: '4',
      type: 'duplicate_conversion',
      severity: 'medium',
      title: 'Duplicate Conversions',
      description: 'Multiple conversions from same user detected',
      affectedCampaign: 'Online Casino Campaign',
      timestamp: '2024-01-15 11:30:00',
      status: 'open',
      ipAddress: '172.16.0.10',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      clicks: 45,
      conversions: 8,
      fraudScore: 72
    }
  ];

  const fraudProviders = [
    {
      id: '1',
      name: 'IPQualityScore',
      status: 'active',
      apiKey: 'ey***************',
      threshold: 75,
      checksToday: 2450,
      blocked: 89,
      accuracy: '94.2%'
    },
    {
      id: '2',
      name: 'Anura',
      status: 'inactive',
      apiKey: '',
      threshold: 70,
      checksToday: 0,
      blocked: 0,
      accuracy: 'N/A'
    },
    {
      id: '3',
      name: 'FraudScore',
      status: 'active',
      apiKey: 'fs***************',
      threshold: 80,
      checksToday: 1890,
      blocked: 156,
      accuracy: '91.8%'
    }
  ];

  const recentBlocks = [
    {
      id: '1',
      ipAddress: '192.168.1.100',
      reason: 'Bot detected',
      timestamp: '2 minutes ago',
      provider: 'IPQualityScore',
      score: 95
    },
    {
      id: '2',
      ipAddress: '10.0.0.75',
      reason: 'Proxy/VPN',
      timestamp: '5 minutes ago',
      provider: 'FraudScore',
      score: 82
    },
    {
      id: '3',
      ipAddress: '172.16.0.25',
      reason: 'High risk country',
      timestamp: '8 minutes ago',
      provider: 'IPQualityScore',
      score: 78
    }
  ];

  const filteredAlerts = fraudAlerts.filter(alert =>
    alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.affectedCampaign.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'investigating': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalStats = {
    totalAlerts: fraudAlerts.length,
    openAlerts: fraudAlerts.filter(a => a.status === 'open').length,
    totalBlocked: fraudAlerts.reduce((sum, alert) => sum + (alert.status === 'resolved' ? alert.clicks : 0), 0),
    avgFraudScore: Math.round(fraudAlerts.reduce((sum, alert) => sum + alert.fraudScore, 0) / fraudAlerts.length)
  };

  const handleTestProvider = (providerId: string) => {
    console.log('Testing fraud provider:', providerId);
    // Simulate test
    alert('Fraud detection test completed successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fraud Detection</h1>
          <p className="text-gray-600">Monitor and prevent fraudulent traffic in real-time</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowConfigModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>Configure</span>
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
              <p className="text-sm font-medium text-gray-600">Active Alerts</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalStats.openAlerts}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Blocked</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalStats.totalBlocked.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-lg">
              <Shield className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Fraud Score</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalStats.avgFraudScore}%</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Detection Rate</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">94.2%</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4">
        {['overview', 'alerts', 'providers', 'settings'].map((tab) => (
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

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Blocks</h3>
            <div className="space-y-4">
              {recentBlocks.map((block) => (
                <div key={block.id} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-900">{block.ipAddress}</p>
                      <p className="text-sm text-gray-500">{block.reason} • {block.timestamp}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-red-600">{block.score}%</p>
                    <p className="text-xs text-gray-500">{block.provider}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Provider Status</h3>
            <div className="space-y-4">
              {fraudProviders.map((provider) => (
                <div key={provider.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      provider.status === 'active' ? 'bg-emerald-500' : 'bg-gray-400'
                    }`}></div>
                    <div>
                      <p className="font-medium text-gray-900">{provider.name}</p>
                      <p className="text-sm text-gray-500">
                        {provider.checksToday.toLocaleString()} checks today • {provider.blocked} blocked
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{provider.accuracy}</p>
                    <button
                      onClick={() => handleTestProvider(provider.id)}
                      className="text-xs text-blue-600 hover:text-blue-700"
                    >
                      Test
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Alerts Tab */}
      {activeTab === 'alerts' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Fraud Alerts</h3>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search alerts..."
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

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Alert</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Severity</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Campaign</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Fraud Score</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Time</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAlerts.map((alert) => (
                  <tr key={alert.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{alert.title}</p>
                        <p className="text-sm text-gray-500">{alert.description}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getSeverityColor(alert.severity)}`}>
                        {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-900">{alert.affectedCampaign}</td>
                    <td className="py-4 px-4">
                      <span className={`font-medium ${
                        alert.fraudScore > 80 ? 'text-red-600' : 
                        alert.fraudScore > 60 ? 'text-yellow-600' : 'text-emerald-600'
                      }`}>
                        {alert.fraudScore}%
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(alert.status)}`}>
                        {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-500">
                      {new Date(alert.timestamp).toLocaleString()}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedAlert(alert)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {alert.status === 'open' && (
                          <>
                            <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                              <XCircle className="w-4 h-4" />
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
        </div>
      )}

      {/* Providers Tab */}
      {activeTab === 'providers' && (
        <div className="space-y-6">
          {fraudProviders.map((provider) => (
            <div key={provider.id} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${
                    provider.status === 'active' ? 'bg-emerald-500' : 'bg-gray-400'
                  }`}></div>
                  <h3 className="text-lg font-semibold text-gray-900">{provider.name}</h3>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    provider.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {provider.status.charAt(0).toUpperCase() + provider.status.slice(1)}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleTestProvider(provider.id)}
                    className="flex items-center space-x-2 px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    <span>Test</span>
                  </button>
                  <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Configure
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{provider.checksToday.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Checks Today</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{provider.blocked}</div>
                  <div className="text-sm text-gray-500">Blocked</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{provider.threshold}%</div>
                  <div className="text-sm text-gray-500">Threshold</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">{provider.accuracy}</div>
                  <div className="text-sm text-gray-500">Accuracy</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Fraud Detection Settings</h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Global Threshold</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="75"
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Low (0%)</span>
                  <span>High (100%)</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Auto-Block Threshold</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="90"
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Disabled (0%)</span>
                  <span>Strict (100%)</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Real-time Monitoring</p>
                  <p className="text-sm text-gray-500">Monitor traffic in real-time for fraud patterns</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Auto-Block High Risk</p>
                  <p className="text-sm text-gray-500">Automatically block traffic above threshold</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Email Alerts</p>
                  <p className="text-sm text-gray-500">Send email notifications for high-risk alerts</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
            
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Save Settings
            </button>
          </div>
        </div>
      )}

      {/* Alert Details Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{selectedAlert.title}</h3>
              <button
                onClick={() => setSelectedAlert(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Eye className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Severity</label>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getSeverityColor(selectedAlert.severity)}`}>
                    {selectedAlert.severity.charAt(0).toUpperCase() + selectedAlert.severity.slice(1)}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedAlert.status)}`}>
                    {selectedAlert.status.charAt(0).toUpperCase() + selectedAlert.status.slice(1)}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">IP Address</label>
                  <p className="font-mono text-sm">{selectedAlert.ipAddress}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Fraud Score</label>
                  <p className={`text-lg font-semibold ${
                    selectedAlert.fraudScore > 80 ? 'text-red-600' : 
                    selectedAlert.fraudScore > 60 ? 'text-yellow-600' : 'text-emerald-600'
                  }`}>
                    {selectedAlert.fraudScore}%
                  </p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Description</label>
                <p className="text-gray-900 mt-1">{selectedAlert.description}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">User Agent</label>
                <p className="text-sm bg-gray-50 p-2 rounded font-mono">{selectedAlert.userAgent}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Clicks</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedAlert.clicks}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Conversions</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedAlert.conversions}</p>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setSelectedAlert(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              {selectedAlert.status === 'open' && (
                <>
                  <button className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                    Resolve
                  </button>
                  <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    Block IP
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Configuration Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Configure Fraud Detection</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select Provider</option>
                  <option value="ipqualityscore">IPQualityScore</option>
                  <option value="anura">Anura</option>
                  <option value="fraudscore">FraudScore</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter API key"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Threshold (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  defaultValue="75"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowConfigModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowConfigModal(false)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FraudDetectionPage;