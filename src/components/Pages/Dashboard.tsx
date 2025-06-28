import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import SuperAdminDashboard from '../Dashboard/SuperAdminDashboard';
import AdminDashboard from '../Dashboard/AdminDashboard';
import AffiliateDashboard from '../Dashboard/AffiliateDashboard';
import AdvertiserDashboard from '../Dashboard/AdvertiserDashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case 'super_admin':
      return <SuperAdminDashboard />;
    case 'admin':
      return <AdminDashboard />;
    case 'affiliate':
      return <AffiliateDashboard />;
    case 'advertiser':
      return <AdvertiserDashboard />;
    default:
      return <AdminDashboard />;
  }
};

export default Dashboard;