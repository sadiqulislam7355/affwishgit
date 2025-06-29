import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AdminDashboard from '../Dashboard/AdminDashboard';
import AffiliateDashboard from '../Dashboard/AffiliateDashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'affiliate':
      return <AffiliateDashboard />;
    default:
      return <AdminDashboard />;
  }
};

export default Dashboard;