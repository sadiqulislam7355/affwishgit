import React, { useState, useEffect } from 'react';
import { X, Shield, Settings, CheckCircle, AlertTriangle } from 'lucide-react';
import { fraudDetectionService } from '../../services/fraudDetection';

interface FraudConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const FraudConfigModal: React.FC<FraudConfigModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState('');
  const [config, setConfig] = useState({
    apiKey: '',
    endpoint: '',
    threshold: 70,
    autoBlock: true,
    checkClicks: true,
    checkConversions: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const availableProviders = fraudDetectionService.getProviders();
      setProviders(availableProviders);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const configSuccess = await fraudDetectionService.configureProvider(selectedProvider, {
        ...config,
        enabled: true
      });
      
      if (configSuccess) {
        setSuccess(true);
        setTimeout(() => {
          onSuccess();
          onClose();
          resetForm();
        }, 1500);
      }
    } catch (error) {
      console.error('Failed to configure fraud detection:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedProvider('');
    setConfig({
      apiKey: '',
      endpoint: '',
      threshold: 70,
      autoBlock: true,
      checkClicks: true,
      checkConversions: true
    });
    setTestResult(null);
    setSuccess(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const testFraudDetection = async () => {
    setIsTesting(true);
    try {
      const result = await fraudDetectionService.checkIP('192.168.1.1', selectedProvider);
      setTestResult(result);
    } catch (error) {
      setTestResult({ success: false, error: error.message });
    } finally {
      setIsTesting(false);
    }
  };

  if (!isOpen) return null;

  if (success) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-md w-full p-8 text-center">
          <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Fraud Detection Configured!</h3>
          <p className="text-gray-600">Your fraud detection system is now active and monitoring traffic.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Fraud Detection Configuration</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Provider Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fraud Detection Provider *
            </label>
            <select
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select Provider</option>
              {providers.map((provider: any) => (
                <option key={provider.name} value={provider.name}>
                  {provider.name}
                </option>
              ))}
            </select>
          </div>

          {selectedProvider && (
            <>
              {/* API Configuration */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    API Key *
                  </label>
                  <input
                    type="password"
                    name="apiKey"
                    value={config.apiKey}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your API key"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    API Endpoint (optional)
                  </label>
                  <input
                    type="url"
                    name="endpoint"
                    value={config.endpoint}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://api.provider.com/v1"
                  />
                </div>
              </div>

              {/* Fraud Settings */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Detection Settings</span>
                </h4>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Risk Threshold: {config.threshold}%
                  </label>
                  <input
                    type="range"
                    name="threshold"
                    min="0"
                    max="100"
                    value={config.threshold}
                    onChange={handleChange}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Low Risk (0%)</span>
                    <span>High Risk (100%)</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="autoBlock"
                      checked={config.autoBlock}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Auto-block high-risk traffic</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="checkClicks"
                      checked={config.checkClicks}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Check clicks for fraud</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="checkConversions"
                      checked={config.checkConversions}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Check conversions for fraud</span>
                  </label>
                </div>
              </div>

              {/* Test Fraud Detection */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium text-gray-700">Test Configuration</h4>
                  <button
                    type="button"
                    onClick={testFraudDetection}
                    disabled={isTesting}
                    className="flex items-center space-x-2 px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Shield className="w-4 h-4" />
                    <span>{isTesting ? 'Testing...' : 'Test'}</span>
                  </button>
                </div>

                {testResult && (
                  <div className={`p-3 rounded-lg ${testResult.blocked ? 'bg-red-50 border border-red-200' : 'bg-emerald-50 border border-emerald-200'}`}>
                    <div className="flex items-center space-x-2">
                      {testResult.blocked ? (
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                      )}
                      <span className={`text-sm font-medium ${testResult.blocked ? 'text-red-800' : 'text-emerald-800'}`}>
                        Risk Score: {testResult.score}% ({testResult.risk} risk)
                      </span>
                    </div>
                    {testResult.reasons && testResult.reasons.length > 0 && (
                      <ul className="text-sm text-gray-600 mt-2 ml-7">
                        {testResult.reasons.map((reason: string, index: number) => (
                          <li key={index}>• {reason}</li>
                        ))}
                      </ul>
                    )}
                    {testResult.responseTime && (
                      <p className="text-xs text-gray-500 mt-2">Response time: {testResult.responseTime}ms</p>
                    )}
                  </div>
                )}
              </div>
            </>
          )}

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !selectedProvider}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Saving...' : 'Save Configuration'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FraudConfigModal;