import React, { useState } from 'react';
import { Database, Users, Globe, Shield, DollarSign, TrendingUp, Plus, UserPlus, CheckCircle } from 'lucide-react';
import MetricCard from './MetricCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from '../../contexts/AuthContext';
import { apiService } from '../../services/api';

const SuperAdminDashboard: React.FC = () => {
  const { impersonate } = useAuth();
  const [showAddTenant, setShowAddTenant] = useState(false);
  const [isImpersonating, setIsImpersonating] = useState(false);

  const tenantGrowthData = [
    { name: 'Jan', tenants: 12, revenue: 45000 },
    { name: 'Feb', tenants: 18, revenue: 67000 },
    { name: 'Mar', tenants: 25, revenue: 89000 },
    { name: 'Apr', tenants: 32, revenue: 112000 },
    { name: 'May', tenants: 41, revenue: 145000 },
    { name: 'Jun', tenants: 48, revenue: 178000 }
  ];

  const planDistribution = [
    { name: 'Starter', value: 35, revenue: 52500 },
    { name: 'Professional', value: 28, revenue: 112000 },
    { name: 'Enterprise', value: 15, revenue: 225000 }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F97316'];

  const topTenants = [
    { 
      id: '1',
      name: 'AdVantage Networks', 
      plan: 'Enterprise', 
      revenue: '$45,600', 
      affiliates: 2340,
      admin: 'john@advantage.com',
      status: 'active'
    },
    { 
      id: '2',
      name: 'Global CPA Hub', 
      plan: 'Professional', 
      revenue: '$32,100', 
      affiliates: 1560,
      admin: 'sarah@globalcpa.com',
      status: 'active'
    },
    { 
      id: '3',
      name: 'Performance Partners', 
      plan: 'Enterprise', 
      revenue: '$38,900', 
      affiliates: 1890,
      admin: 'mike@perfpartners.com',
      status: 'active'
    },
    { 
      id: '4',
      name: 'Digital Marketing Co', 
      plan: 'Professional', 
      revenue: '$28,500', 
      affiliates: 1200,
      admin: 'lisa@digitalmc.com',
      status: 'suspended'
    }
  ];

  const handleImpersonate = async (tenant: any) => {
    setIsImpersonating(true);
    try {
      await impersonate(tenant.id, tenant.admin);
      // The AuthContext will handle the UI update
    } catch (error) {
      console.error('Impersonation failed:', error);
      alert('Impersonation failed. Please try again.');
    } finally {
      setIsImpersonating(false);
    }
  };

  const handleAddTenant = () => {
    setShowAddTenant(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Platform Overview</h1>
          <p className="text-gray-600">Monitor all tenant networks and platform performance</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleAddTenant}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Tenant</span>
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Global Report
          </button>
        </div>
      </div>

      {/* Platform Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Active Tenants"
          value="78"
          change={{ value: 23.1, type: 'increase' }}
          icon={Database}
          color="blue"
        />
        <MetricCard
          title="Total Users"
          value="15,432"
          change={{ value: 18.7, type: 'increase' }}
          icon={Users}
          color="emerald"
        />
        <MetricCard
          title="Monthly Revenue"
          value="$189,450"
          change={{ value: 31.2, type: 'increase' }}
          icon={DollarSign}
          color="orange"
        />
        <MetricCard
          title="System Uptime"
          value="99.98%"
          change={{ value: 0.02, type: 'increase' }}
          icon={Shield}
          color="emerald"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Platform Growth</h3>
            <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
              <option>Last 6 months</option>
              <option>Last 12 months</option>
              <option>All time</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={tenantGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Area 
                yAxisId="left"
                type="monotone" 
                dataKey="tenants" 
                stroke="#3B82F6" 
                fill="#3B82F680" 
                strokeWidth={2}
              />
              <Area 
                yAxisId="right"
                type="monotone" 
                dataKey="revenue" 
                stroke="#10B981" 
                fill="#10B98180" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Plan Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={planDistribution}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {planDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {planDistribution.map((plan, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index] }}
                  ></div>
                  <span>{plan.name}</span>
                </div>
                <span className="font-medium">${plan.revenue.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tenant Management */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Tenant Networks</h3>
          <button 
            onClick={handleAddTenant}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Add New Tenant
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Network</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Plan</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Admin</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Revenue</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Affiliates</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {topTenants.map((tenant) => (
                <tr key={tenant.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <Globe className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-gray-900">{tenant.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      tenant.plan === 'Enterprise' 
                        ? 'bg-purple-100 text-purple-800' 
                        : tenant.plan === 'Professional'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {tenant.plan}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-900">{tenant.admin}</td>
                  <td className="py-4 px-4 font-semibold text-emerald-600">{tenant.revenue}</td>
                  <td className="py-4 px-4 text-gray-900">{tenant.affiliates}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      tenant.status === 'active' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {tenant.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleImpersonate(tenant)}
                        disabled={isImpersonating}
                        className="px-3 py-1 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {isImpersonating ? 'Loading...' : 'Impersonate'}
                      </button>
                      <button className="px-3 py-1 text-xs border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        Manage
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-medium rounded-full">
            All Systems Operational
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span className="font-medium text-gray-900">API Services</span>
            </div>
            <span className="text-emerald-600 font-medium">Operational</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span className="font-medium text-gray-900">Database</span>
            </div>
            <span className="text-emerald-600 font-medium">Operational</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span className="font-medium text-gray-900">Fraud Detection</span>
            </div>
            <span className="text-emerald-600 font-medium">Operational</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="font-medium text-gray-900">Email Service</span>
            </div>
            <span className="text-yellow-600 font-medium">Maintenance</span>
          </div>
        </div>
      </div>

      {/* Add Tenant Modal Placeholder */}
      {showAddTenant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-8 text-center">
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Add Tenant Feature</h3>
            <p className="text-gray-600 mb-4">This feature would open a form to create a new tenant network.</p>
            <button
              onClick={() => setShowAddTenant(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminDashboard;