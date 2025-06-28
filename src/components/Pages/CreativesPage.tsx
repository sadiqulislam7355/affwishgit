import React, { useState } from 'react';
import { Image, Video, FileText, Globe, Plus, Search, Filter, Download, Eye, Edit, Trash2, Upload } from 'lucide-react';

const CreativesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCreative, setSelectedCreative] = useState<any>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const creatives = [
    {
      id: '1',
      name: 'Dating App Banner 728x90',
      type: 'banner',
      format: 'JPG',
      dimensions: '728x90',
      fileSize: '45 KB',
      offer: 'Premium Dating App',
      offerId: 'offer_1',
      status: 'approved',
      clicks: 2450,
      conversions: 89,
      cvr: '3.63%',
      createdAt: '2024-01-10',
      previewUrl: 'https://via.placeholder.com/728x90/3B82F6/FFFFFF?text=Dating+App+Banner',
      downloadUrl: '#'
    },
    {
      id: '2',
      name: 'Crypto Platform Video Ad',
      type: 'video',
      format: 'MP4',
      dimensions: '1920x1080',
      fileSize: '2.3 MB',
      offer: 'Crypto Trading Platform',
      offerId: 'offer_2',
      status: 'approved',
      clicks: 1890,
      conversions: 156,
      cvr: '8.25%',
      createdAt: '2024-01-08',
      previewUrl: 'https://via.placeholder.com/400x225/10B981/FFFFFF?text=Video+Ad',
      downloadUrl: '#'
    },
    {
      id: '3',
      name: 'VPN Service Text Ad',
      type: 'text',
      format: 'TXT',
      dimensions: 'N/A',
      fileSize: '1 KB',
      offer: 'VPN Service Trial',
      offerId: 'offer_3',
      status: 'approved',
      clicks: 3200,
      conversions: 128,
      cvr: '4.00%',
      createdAt: '2024-01-05',
      previewUrl: '',
      downloadUrl: '#',
      textContent: 'Secure your internet connection with our premium VPN service. Get 30 days free trial now!'
    },
    {
      id: '4',
      name: 'Dating App Landing Page',
      type: 'landing_page',
      format: 'HTML',
      dimensions: 'Responsive',
      fileSize: '125 KB',
      offer: 'Premium Dating App',
      offerId: 'offer_1',
      status: 'pending',
      clicks: 0,
      conversions: 0,
      cvr: '0.00%',
      createdAt: '2024-01-12',
      previewUrl: 'https://via.placeholder.com/400x600/F97316/FFFFFF?text=Landing+Page',
      downloadUrl: '#'
    },
    {
      id: '5',
      name: 'Crypto Square Banner 300x300',
      type: 'banner',
      format: 'PNG',
      dimensions: '300x300',
      fileSize: '78 KB',
      offer: 'Crypto Trading Platform',
      offerId: 'offer_2',
      status: 'rejected',
      clicks: 0,
      conversions: 0,
      cvr: '0.00%',
      createdAt: '2024-01-09',
      previewUrl: 'https://via.placeholder.com/300x300/EF4444/FFFFFF?text=Rejected+Banner',
      downloadUrl: '#'
    }
  ];

  const filteredCreatives = creatives.filter(creative => {
    const matchesSearch = creative.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         creative.offer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || creative.type === activeTab || creative.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'banner': return Image;
      case 'video': return Video;
      case 'text': return FileText;
      case 'landing_page': return Globe;
      default: return FileText;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-emerald-100 text-emerald-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalStats = {
    totalCreatives: creatives.length,
    approvedCreatives: creatives.filter(c => c.status === 'approved').length,
    totalClicks: creatives.reduce((sum, c) => sum + c.clicks, 0),
    totalConversions: creatives.reduce((sum, c) => sum + c.conversions, 0)
  };

  const avgCVR = totalStats.totalClicks > 0 
    ? ((totalStats.totalConversions / totalStats.totalClicks) * 100).toFixed(2)
    : '0.00';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Creative Assets</h1>
          <p className="text-gray-600">Manage and optimize your marketing creatives</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowUploadModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Creative</span>
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
              <p className="text-sm font-medium text-gray-600">Total Creatives</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalStats.totalCreatives}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Image className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalStats.approvedCreatives}</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-lg">
              <Eye className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Clicks</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalStats.totalClicks.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <Eye className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average CVR</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{avgCVR}%</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-4">
            {['all', 'banner', 'video', 'text', 'landing_page', 'approved', 'pending', 'rejected'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace('_', ' ')}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search creatives..."
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

        {/* Creatives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCreatives.map((creative) => {
            const TypeIcon = getTypeIcon(creative.type);
            return (
              <div key={creative.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                {/* Preview */}
                <div className="aspect-video bg-gray-100 flex items-center justify-center relative">
                  {creative.type === 'text' ? (
                    <div className="p-4 text-center">
                      <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 line-clamp-3">{creative.textContent}</p>
                    </div>
                  ) : creative.previewUrl ? (
                    <img 
                      src={creative.previewUrl} 
                      alt={creative.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <TypeIcon className="w-12 h-12 text-gray-400" />
                  )}
                  
                  {/* Status Badge */}
                  <span className={`absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(creative.status)}`}>
                    {creative.status.charAt(0).toUpperCase() + creative.status.slice(1)}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <TypeIcon className="w-4 h-4 text-gray-500" />
                    <span className="text-xs text-gray-500 uppercase">{creative.format}</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500">{creative.dimensions}</span>
                  </div>
                  
                  <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">{creative.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{creative.offer}</p>
                  
                  {/* Performance Stats */}
                  {creative.status === 'approved' && creative.clicks > 0 && (
                    <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                      <div>
                        <span className="text-gray-500">Clicks:</span>
                        <span className="font-medium ml-1">{creative.clicks.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">CVR:</span>
                        <span className="font-medium ml-1 text-emerald-600">{creative.cvr}</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedCreative(creative)}
                      className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Eye className="w-4 h-4 mx-auto" />
                    </button>
                    <button className="px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="px-3 py-2 text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCreatives.length === 0 && (
          <div className="text-center py-12">
            <Image className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No creatives found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || activeTab !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by uploading your first creative.'
              }
            </p>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Creative</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Creative Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Banner 728x90"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Creative Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select Type</option>
                  <option value="banner">Banner</option>
                  <option value="video">Video</option>
                  <option value="text">Text Ad</option>
                  <option value="landing_page">Landing Page</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Associated Offer</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select Offer</option>
                  <option value="offer_1">Premium Dating App</option>
                  <option value="offer_2">Crypto Trading Platform</option>
                  <option value="offer_3">VPN Service Trial</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Drag and drop your file here, or click to browse
                  </p>
                  <input type="file" className="hidden" />
                </div>
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Creative Details Modal */}
      {selectedCreative && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{selectedCreative.name}</h3>
              <button
                onClick={() => setSelectedCreative(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Eye className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                {selectedCreative.type === 'text' ? (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-900">{selectedCreative.textContent}</p>
                  </div>
                ) : (
                  <img 
                    src={selectedCreative.previewUrl} 
                    alt={selectedCreative.name}
                    className="w-full rounded-lg"
                  />
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Type</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedCreative.type.replace('_', ' ')}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Format</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedCreative.format}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Dimensions</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedCreative.dimensions}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">File Size</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedCreative.fileSize}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Associated Offer</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedCreative.offer}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedCreative.status)}`}>
                    {selectedCreative.status.charAt(0).toUpperCase() + selectedCreative.status.slice(1)}
                  </span>
                </div>
                {selectedCreative.status === 'approved' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Clicks</label>
                      <p className="text-lg font-semibold text-gray-900">{selectedCreative.clicks.toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">CVR</label>
                      <p className="text-lg font-semibold text-emerald-600">{selectedCreative.cvr}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setSelectedCreative(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreativesPage;