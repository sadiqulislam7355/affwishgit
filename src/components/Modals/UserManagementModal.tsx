import React, { useState } from 'react';
import { X, Users, UserCheck, UserX, Eye, Edit, Trash2, Plus, Search } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface UserManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const UserManagementModal: React.FC<UserManagementModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { impersonate } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const users = [
    {
      id: '1',
      name: 'John Marketing Pro',
      email: 'john@marketingpro.com',
      role: 'affiliate',
      status: 'active',
      lastLogin: '2 hours ago',
      totalEarnings: '$15,420',
      conversions: 342
    },
    {
      id: '2',
      name: 'Sarah Digital Expert',
      email: 'sarah@digitalexpert.com',
      role: 'affiliate',
      status: 'active',
      lastLogin: '1 day ago',
      totalEarnings: '$23,150',
      conversions: 456
    },
    {
      id: '3',
      name: 'Mike Performance',
      email: 'mike@performance.com',
      role: 'advertiser',
      status: 'pending',
      lastLogin: 'Never',
      totalEarnings: '$0',
      conversions: 0
    },
    {
      id: '4',
      name: 'Lisa Manager',
      email: 'lisa@company.com',
      role: 'manager',
      status: 'suspended',
      lastLogin: '1 week ago',
      totalEarnings: '$5,200',
      conversions: 89
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || user.role === activeTab || user.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleImpersonate = async (user: any) => {
    try {
      await impersonate('demo-tenant', user.email);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Impersonation failed:', error);
    }
  };

  const handleStatusChange = (userId: string, newStatus: string) => {
    console.log(`Changing user ${userId} status to ${newStatus}`);
    // In production, this would call an API
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Search and Filters */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex space-x-2">
                {['all', 'affiliate', 'advertiser', 'manager', 'active', 'pending', 'suspended'].map((tab) => (
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
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Add User</span>
            </button>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">User</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Role</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Last Login</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Performance</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium">{user.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        user.role === 'affiliate' ? 'bg-blue-100 text-blue-800' :
                        user.role === 'advertiser' ? 'bg-emerald-100 text-emerald-800' :
                        user.role === 'manager' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        user.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
                        user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-900">{user.lastLogin}</td>
                    <td className="py-4 px-4">
                      <div className="text-sm">
                        <p className="font-medium text-gray-900">{user.totalEarnings}</p>
                        <p className="text-gray-500">{user.conversions} conversions</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleImpersonate(user)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Impersonate"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditUser(user)}
                          className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <div className="relative group">
                          <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                            <UserCheck className="w-4 h-4" />
                          </button>
                          <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                            <button
                              onClick={() => handleStatusChange(user.id, 'active')}
                              className="w-full text-left px-3 py-2 text-sm text-emerald-600 hover:bg-emerald-50"
                            >
                              Activate
                            </button>
                            <button
                              onClick={() => handleStatusChange(user.id, 'suspended')}
                              className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              Suspend
                            </button>
                          </div>
                        </div>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Stats */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Total Users</span>
              </div>
              <p className="text-2xl font-bold text-blue-900 mt-2">{users.length}</p>
            </div>
            <div className="bg-emerald-50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <UserCheck className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-900">Active Users</span>
              </div>
              <p className="text-2xl font-bold text-emerald-900 mt-2">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <UserX className="w-5 h-5 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-900">Pending</span>
              </div>
              <p className="text-2xl font-bold text-yellow-900 mt-2">
                {users.filter(u => u.status === 'pending').length}
              </p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <UserX className="w-5 h-5 text-red-600" />
                <span className="text-sm font-medium text-red-900">Suspended</span>
              </div>
              <p className="text-2xl font-bold text-red-900 mt-2">
                {users.filter(u => u.status === 'suspended').length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagementModal;