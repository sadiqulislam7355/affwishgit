import React, { useState } from 'react';
import { X, Link, Play, CheckCircle, AlertCircle } from 'lucide-react';
import { postbackService } from '../../services/postbackService';
import { apiService } from '../../services/api';

interface PostbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const PostbackModal: React.FC<PostbackModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    method: 'GET',
    parameters: [{ key: '', value: '' }]
  });
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const parameters = formData.parameters.reduce((acc, param) => {
        if (param.key && param.value) {
          acc[param.key] = param.value;
        }
        return acc;
      }, {} as Record<string, string>);

      const postbackData = {
        name: formData.name,
        url: formData.url,
        method: formData.method as 'GET' | 'POST',
        parameters,
        status: 'active' as const,
        createdAt: new Date().toISOString(),
        fireCount: 0
      };

      const response = await apiService.createPostback(postbackData);
      
      if (response.success) {
        // Also add to postback service
        postbackService.addPostbackConfig(postbackData);
        
        setSuccess(true);
        setTimeout(() => {
          onSuccess();
          onClose();
          resetForm();
        }, 1500);
      }
    } catch (error) {
      console.error('Failed to create postback:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      url: '',
      method: 'GET',
      parameters: [{ key: '', value: '' }]
    });
    setTestResult(null);
    setSuccess(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleParameterChange = (index: number, field: 'key' | 'value', value: string) => {
    const newParameters = [...formData.parameters];
    newParameters[index][field] = value;
    setFormData(prev => ({ ...prev, parameters: newParameters }));
  };

  const addParameter = () => {
    setFormData(prev => ({
      ...prev,
      parameters: [...prev.parameters, { key: '', value: '' }]
    }));
  };

  const removeParameter = (index: number) => {
    setFormData(prev => ({
      ...prev,
      parameters: prev.parameters.filter((_, i) => i !== index)
    }));
  };

  const testPostback = async () => {
    if (!formData.url) return;
    
    setIsTesting(true);
    try {
      const parameters = formData.parameters.reduce((acc, param) => {
        if (param.key && param.value) {
          acc[param.key] = param.value;
        }
        return acc;
      }, {} as Record<string, string>);

      const result = await postbackService.testPostback(formData.url, parameters);
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
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Postback Created Successfully!</h3>
          <p className="text-gray-600">Your postback configuration has been saved and activated.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Configure Postback</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Postback Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Conversion Postback"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Postback URL *
              </label>
              <div className="relative">
                <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/postback"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                HTTP Method
              </label>
              <select
                name="method"
                value={formData.method}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
              </select>
            </div>
          </div>

          {/* Parameters */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Parameters
              </label>
              <button
                type="button"
                onClick={addParameter}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Parameter
              </button>
            </div>
            
            <div className="space-y-3">
              {formData.parameters.map((param, index) => (
                <div key={index} className="flex space-x-3">
                  <input
                    type="text"
                    placeholder="Parameter name (e.g., click_id)"
                    value={param.key}
                    onChange={(e) => handleParameterChange(index, 'key', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Value (use {click_id}, {affiliate_id}, etc.)"
                    value={param.value}
                    onChange={(e) => handleParameterChange(index, 'value', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {formData.parameters.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeParameter(index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Available Macros */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Available Macros:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
              <div><code className="bg-white px-1 rounded">{'{click_id}'}</code> - Unique click identifier</div>
              <div><code className="bg-white px-1 rounded">{'{affiliate_id}'}</code> - Affiliate ID</div>
              <div><code className="bg-white px-1 rounded">{'{offer_id}'}</code> - Offer ID</div>
              <div><code className="bg-white px-1 rounded">{'{conversion_value}'}</code> - Conversion value</div>
              <div><code className="bg-white px-1 rounded">{'{timestamp}'}</code> - Event timestamp</div>
              <div><code className="bg-white px-1 rounded">{'{ip_address}'}</code> - User IP address</div>
              <div><code className="bg-white px-1 rounded">{'{user_agent}'}</code> - User agent string</div>
              <div><code className="bg-white px-1 rounded">{'{country}'}</code> - User country</div>
            </div>
          </div>

          {/* Test Postback */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-700">Test Postback</h4>
              <button
                type="button"
                onClick={testPostback}
                disabled={!formData.url || isTesting}
                className="flex items-center space-x-2 px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Play className="w-4 h-4" />
                <span>{isTesting ? 'Testing...' : 'Test'}</span>
              </button>
            </div>

            {testResult && (
              <div className={`p-3 rounded-lg ${testResult.success ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'}`}>
                <div className="flex items-center space-x-2">
                  {testResult.success ? (
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className={`text-sm font-medium ${testResult.success ? 'text-emerald-800' : 'text-red-800'}`}>
                    {testResult.success ? 'Postback test successful!' : 'Postback test failed'}
                  </span>
                </div>
                {testResult.responseTime && (
                  <p className="text-sm text-gray-600 mt-1">Response time: {testResult.responseTime}ms</p>
                )}
                {testResult.error && (
                  <p className="text-sm text-red-600 mt-1">{testResult.error}</p>
                )}
                {testResult.url && (
                  <p className="text-xs text-gray-500 mt-1 break-all">URL: {testResult.url}</p>
                )}
              </div>
            )}
          </div>

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
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Creating...' : 'Create Postback'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostbackModal;