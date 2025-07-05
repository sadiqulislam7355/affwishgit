import React, { useState } from 'react';
import { X, Globe, DollarSign, Target, Calendar, CheckCircle, Settings } from 'lucide-react';
import { apiService } from '../../services/api';
import { trackingSoftwareTemplates, cpaNetworkTemplates } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

interface AddOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddOfferModal: React.FC<AddOfferModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    advertiser: '',
    payout: '',
    payoutType: 'CPA',
    revSharePercentage: '',
    category: '',
    offerUrl: '',
    previewUrl: '',
    countries: '',
    devices: '',
    trafficSources: '',
    dailyCap: '',
    weeklyCap: '',
    monthlyCap: '',
    expiresAt: '',
    conversionFlow: '',
    restrictions: '',
    postbackUrl: '',
    globalPostbackEnabled: true,
    trackingTemplate: '',
    // Admin Settings
    requireApproval: false,
    scrubRate: '0',
    throttleRate: '0',
    autoApprove: true,
    holdPeriod: '0'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Generate tracking URL based on template
      let trackingUrl = '';
      if (formData.trackingTemplate && trackingSoftwareTemplates[formData.trackingTemplate]) {
        trackingUrl = trackingSoftwareTemplates[formData.trackingTemplate].trackingUrl;
      } else if (formData.trackingTemplate && cpaNetworkTemplates[formData.trackingTemplate]) {
        trackingUrl = cpaNetworkTemplates[formData.trackingTemplate].trackingUrl;
      } else {
        trackingUrl = `https://track.affwish.com/click?offer_id={offer_id}&affiliate_id={affiliate_id}&click_id={click_id}`;
      }

      const offerData = {
        name: formData.name,
        description: formData.description || null,
        advertiser: formData.advertiser,
        advertiser_id: `adv_${Date.now()}`,
        payout: parseFloat(formData.payout),
        payout_type: formData.payoutType,
        rev_share_percentage: formData.payoutType === 'RevShare' ? parseFloat(formData.revSharePercentage) : null,
        category: formData.category,
        status: 'active',
        countries: formData.countries ? formData.countries.split(',').map(c => c.trim()) : [],
        devices: formData.devices ? formData.devices.split(',').map(d => d.trim()) : [],
        traffic_sources: formData.trafficSources ? formData.trafficSources.split(',').map(t => t.trim()) : [],
        offer_url: formData.offerUrl,
        preview_url: formData.previewUrl || null,
        tracking_url: trackingUrl,
        postback_url: formData.postbackUrl || null,
        global_postback_enabled: formData.globalPostbackEnabled,
        caps: {
          daily: formData.dailyCap ? parseInt(formData.dailyCap) : null,
          weekly: formData.weeklyCap ? parseInt(formData.weeklyCap) : null,
          monthly: formData.monthlyCap ? parseInt(formData.monthlyCap) : null,
        },
        expires_at: formData.expiresAt || null,
        conversion_flow: formData.conversionFlow || null,
        restrictions: formData.restrictions || null,
        require_approval: formData.requireApproval,
        scrub_rate: parseFloat(formData.scrubRate),
        throttle_rate: parseFloat(formData.throttleRate),
        auto_approve: formData.autoApprove,
        hold_period: parseInt(formData.holdPeriod),
        created_by: user?.id
      };

      const response = await apiService.createOffer(offerData);

      if (!response.success) {
        throw new Error(response.error);
      }

      setSuccess(true);
      toast.success('Offer created successfully!');
      
      setTimeout(() => {
        onSuccess();
        onClose();
        resetForm();
      }, 1500);
    } catch (error: any) {
      console.error('Failed to create offer:', error);
      toast.error(error.message || 'Failed to create offer');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      advertiser: '',
      payout: '',
      payoutType: 'CPA',
      revSharePercentage: '',
      category: '',
      offerUrl: '',
      previewUrl: '',
      countries: '',
      devices: '',
      trafficSources: '',
      dailyCap: '',
      weeklyCap: '',
      monthlyCap: '',
      expiresAt: '',
      conversionFlow: '',
      restrictions: '',
      postbackUrl: '',
      globalPostbackEnabled: true,
      trackingTemplate: '',
      requireApproval: false,
      scrubRate: '0',
      throttleRate: '0',
      autoApprove: true,
      holdPeriod: '0'
    });
    setSuccess(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  if (!isOpen) return null;

  if (success) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-md w-full p-8 text-center">
          <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Offer Created Successfully!</h3>
          <p className="text-gray-600">Your new offer has been added to the network with tracking URLs.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add New Offer</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Offer Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Premium Dating App"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Advertiser *
                </label>
                <input
                  type="text"
                  name="advertiser"
                  value={formData.advertiser}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Dating Corp"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payout Type *
                </label>
                <select
                  name="payoutType"
                  value={formData.payoutType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="CPA">CPA - Cost Per Action</option>
                  <option value="CPI">CPI - Cost Per Install</option>
                  <option value="CPL">CPL - Cost Per Lead</option>
                  <option value="RevShare">RevShare - Revenue Share</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {formData.payoutType === 'RevShare' ? 'Revenue Share %' : 'Payout Amount'} *
                </label>
                <div className="relative">
                  {formData.payoutType === 'RevShare' ? (
                    <input
                      type="number"
                      step="0.1"
                      name="revSharePercentage"
                      value={formData.revSharePercentage}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="50.0"
                      required
                    />
                  ) : (
                    <>
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="number"
                        step="0.01"
                        name="payout"
                        value={formData.payout}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="25.00"
                        required
                      />
                    </>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Dating">Dating</option>
                  <option value="Finance">Finance</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Health">Health</option>
                  <option value="Software">Software</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Education">Education</option>
                  <option value="Travel">Travel</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expires At
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="date"
                    name="expiresAt"
                    value={formData.expiresAt}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tracking Template Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tracking Configuration</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tracking Software Template
              </label>
              <select
                name="trackingTemplate"
                value={formData.trackingTemplate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Custom/Default</option>
                <optgroup label="Tracking Software">
                  {Object.entries(trackingSoftwareTemplates).map(([key, template]) => (
                    <option key={key} value={key}>{template.name}</option>
                  ))}
                </optgroup>
                <optgroup label="CPA Networks">
                  {Object.entries(cpaNetworkTemplates).map(([key, template]) => (
                    <option key={key} value={key}>{template.name}</option>
                  ))}
                </optgroup>
              </select>
              <p className="text-sm text-gray-500 mt-1">
                Select a template to auto-generate tracking URLs with proper macros
              </p>
            </div>
          </div>

          {/* URLs and Tracking */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">URLs & Tracking</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Offer URL *
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="url"
                    name="offerUrl"
                    value={formData.offerUrl}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/offer"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preview URL
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="url"
                    name="previewUrl"
                    value={formData.previewUrl}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/preview"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Postback URL (Optional)
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="url"
                    name="postbackUrl"
                    value={formData.postbackUrl}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://advertiser.com/postback"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="globalPostbackEnabled"
                  checked={formData.globalPostbackEnabled}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="text-sm text-gray-700">
                  Enable global postback URL for this offer
                </label>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="High-converting dating app with premium features..."
            />
          </div>

          {/* Targeting */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Targeting & Restrictions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Countries (comma separated)
                </label>
                <input
                  type="text"
                  name="countries"
                  value={formData.countries}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="US, CA, UK, AU"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Devices (comma separated)
                </label>
                <input
                  type="text"
                  name="devices"
                  value={formData.devices}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Mobile, Desktop, Tablet"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Traffic Sources (comma separated)
                </label>
                <input
                  type="text"
                  name="trafficSources"
                  value={formData.trafficSources}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Social, Email, Search, Display"
                />
              </div>
            </div>
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
              {isLoading ? 'Creating...' : 'Create Offer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOfferModal;