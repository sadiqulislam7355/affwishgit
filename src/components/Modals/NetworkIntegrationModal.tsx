import React, { useState } from 'react';
import { X, Link2, Globe, Settings, CheckCircle, AlertCircle, Plus } from 'lucide-react';

interface NetworkIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const NetworkIntegrationModal: React.FC<NetworkIntegrationModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [activeTab, setActiveTab] = useState('global');
  const [globalPostbackUrl, setGlobalPostbackUrl] = useState('https://your-domain.com/postback?click_id={click_id}&status={status}');
  const [integrations, setIntegrations] = useState([
    {
      id: '1',
      name: 'Everflow',
      type: 'everflow',
      enabled: true,
      apiUrl: 'https://api.eflow.cx/v1',
      apiKey: 'ey***************',
      postbackUrl: 'https://postback.eflow.cx/postback',
      status: 'connected'
    },
    {
      id: '2',
      name: 'HasOffers',
      type: 'hasoffers',
      enabled: false,
      apiUrl: 'https://api.hasoffers.com/v3',
      apiKey: '',
      postbackUrl: '',
      status: 'disconnected'
    },
    {
      id: '3',
      name: 'CAKE',
      type: 'cake',
      enabled: false,
      apiUrl: 'https://api.getcake.com/v1',
      apiKey: '',
      postbackUrl: '',
      status: 'disconnected'
    },
    {
      id: '4',
      name: 'Tune (HasOffers)',
      type: 'tune',
      enabled: false,
      apiUrl: 'https://api.tune.com/v3',
      apiKey: '',
      postbackUrl: '',
      status: 'disconnected'
    },
    {
      id: '5',
      name: 'Trackier',
      type: 'trackier',
      enabled: false,
      apiUrl: 'https://api.trackier.com/v1',
      apiKey: '',
      postbackUrl: '',
      status: 'disconnected'
    },
    {
      id: '6',
      name: 'CPABuild',
      type: 'cpabuild',
      enabled: false,
      apiUrl: 'https://api.cpabuild.com/v1',
      apiKey: '',
      postbackUrl: '',
      status: 'disconnected'
    }
  ]);

  const [showAddIntegration, setShowAddIntegration] = useState(false);
  const [newIntegration, setNewIntegration] = useState({
    name: '',
    type: 'custom',
    apiUrl: '',
    apiKey: '',
    postbackUrl: ''
  });

  const handleSaveGlobalPostback = () => {
    console.log('Saving global postback URL:', globalPostbackUrl);
    // In production, this would save to backend
    onSuccess();
  };

  const handleToggleIntegration = (id: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === id 
        ? { ...integration, enabled: !integration.enabled }
        : integration
    ));
  };

  const handleTestIntegration = async (integration: any) => {
    console.log('Testing integration:', integration.name);
    // Simulate API test
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert(`${integration.name} integration test successful!`);
  };

  const handleAddIntegration = () => {
    const integration = {
      id: Date.now().toString(),
      ...newIntegration,
      enabled: false,
      status: 'disconnected'
    };
    setIntegrations(prev => [...prev, integration]);
    setNewIntegration({
      name: '',
      type: 'custom',
      apiUrl: '',
      apiKey: '',
      postbackUrl: ''
    });
    setShowAddIntegration(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Network Integrations</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Tabs */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('global')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'global'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Global Postback
            </button>
            <button
              onClick={() => setActiveTab('integrations')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'integrations'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Network Integrations
            </button>
          </div>

          {activeTab === 'global' && (
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Global Postback URL</h3>
                <p className="text-blue-700 text-sm mb-4">
                  This URL will be used for server-to-server conversion tracking across all offers and networks.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Global Postback URL
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="url"
                    value={globalPostbackUrl}
                    onChange={(e) => setGlobalPostbackUrl(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://your-domain.com/postback"
                  />
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Available Macros:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <div><code className="bg-white px-1 rounded">{'{click_id}'}</code> - Unique click identifier</div>
                  <div><code className="bg-white px-1 rounded">{'{affiliate_id}'}</code> - Affiliate ID</div>
                  <div><code className="bg-white px-1 rounded">{'{offer_id}'}</code> - Offer ID</div>
                  <div><code className="bg-white px-1 rounded">{'{payout}'}</code> - Conversion payout</div>
                  <div><code className="bg-white px-1 rounded">{'{status}'}</code> - Conversion status</div>
                  <div><code className="bg-white px-1 rounded">{'{timestamp}'}</code> - Event timestamp</div>
                  <div><code className="bg-white px-1 rounded">{'{ip_address}'}</code> - User IP address</div>
                  <div><code className="bg-white px-1 rounded">{'{country}'}</code> - User country</div>
                </div>
              </div>

              <button
                onClick={handleSaveGlobalPostback}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Global Postback URL
              </button>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Network Integrations</h3>
                <button
                  onClick={() => setShowAddIntegration(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Integration</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {integrations.map((integration) => (
                  <div key={integration.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                          <Link2 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{integration.name}</h4>
                          <p className="text-sm text-gray-500">{integration.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {integration.status === 'connected' ? (
                          <CheckCircle className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-red-500" />
                        )}
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={integration.enabled}
                            onChange={() => handleToggleIntegration(integration.id)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-500">API URL:</span>
                        <p className="text-gray-900 truncate">{integration.apiUrl || 'Not configured'}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Status:</span>
                        <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                          integration.status === 'connected'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {integration.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-4">
                      <button
                        onClick={() => handleTestIntegration(integration)}
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Test
                      </button>
                      <button className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Configure
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Integration Modal */}
              {showAddIntegration && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-xl max-w-md w-full p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Custom Integration</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                          type="text"
                          value={newIntegration.name}
                          onChange={(e) => setNewIntegration(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Custom Network"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">API URL</label>
                        <input
                          type="url"
                          value={newIntegration.apiUrl}
                          onChange={(e) => setNewIntegration(prev => ({ ...prev, apiUrl: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://api.example.com/v1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                        <input
                          type="password"
                          value={newIntegration.apiKey}
                          onChange={(e) => setNewIntegration(prev => ({ ...prev, apiKey: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Your API key"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Postback URL</label>
                        <input
                          type="url"
                          value={newIntegration.postbackUrl}
                          onChange={(e) => setNewIntegration(prev => ({ ...prev, postbackUrl: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://postback.example.com"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-3 mt-6">
                      <button
                        onClick={() => setShowAddIntegration(false)}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddIntegration}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Add Integration
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NetworkIntegrationModal;