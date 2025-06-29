import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LoginForm from './components/Auth/LoginForm';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Pages/Dashboard';
import OffersPage from './components/Pages/OffersPage';
import AffiliatesPage from './components/Pages/AffiliatesPage';
import AdvertisersPage from './components/Pages/AdvertisersPage';
import TenantsPage from './components/Pages/TenantsPage';
import AnalyticsPage from './components/Pages/AnalyticsPage';
import PayoutsPage from './components/Pages/PayoutsPage';
import SettingsPage from './components/Pages/SettingsPage';
import SmartLinksPage from './components/Pages/SmartLinksPage';
import FraudDetectionPage from './components/Pages/FraudDetectionPage';
import CreativesPage from './components/Pages/CreativesPage';
import StatisticsPage from './components/Pages/StatisticsPage';
import ProfilePage from './components/Pages/ProfilePage';
import BillingPage from './components/Pages/BillingPage';
import TrafficSourcesPage from './components/Pages/TrafficSourcesPage';
import MyLinksPage from './components/Pages/MyLinksPage';
import PaymentsPage from './components/Pages/PaymentsPage';
import MyOffersPage from './components/Pages/MyOffersPage';
import CampaignStatsPage from './components/Pages/CampaignStatsPage';
import AccountPage from './components/Pages/AccountPage';
import RoleSwitcher from './components/RoleSwitcher';

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <LoginForm />;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          {/* Common Routes */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Super Admin Routes */}
          {user.role === 'super_admin' && (
            <>
              <Route path="/tenants" element={<TenantsPage />} />
              <Route path="/users" element={<AffiliatesPage />} />
              <Route path="/branding" element={<SettingsPage />} />
              <Route path="/security" element={<FraudDetectionPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </>
          )}
          
          {/* Admin Routes */}
          {(user.role === 'admin' || user.role === 'super_admin') && (
            <>
              <Route path="/offers" element={<OffersPage />} />
              <Route path="/affiliates" element={<AffiliatesPage />} />
              <Route path="/advertisers" element={<AdvertisersPage />} />
              <Route path="/smartlinks" element={<SmartLinksPage />} />
              <Route path="/fraud" element={<FraudDetectionPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/payouts" element={<PayoutsPage />} />
            </>
          )}
          
          {/* Affiliate Routes */}
          {user.role === 'affiliate' && (
            <>
              <Route path="/offers" element={<OffersPage />} />
              <Route path="/links" element={<MyLinksPage />} />
              <Route path="/stats" element={<StatisticsPage />} />
              <Route path="/creatives" element={<CreativesPage />} />
              <Route path="/payments" element={<PaymentsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </>
          )}
          
          {/* Advertiser Routes */}
          {user.role === 'advertiser' && (
            <>
              <Route path="/offers" element={<MyOffersPage />} />
              <Route path="/stats" element={<CampaignStatsPage />} />
              <Route path="/creatives" element={<CreativesPage />} />
              <Route path="/traffic" element={<TrafficSourcesPage />} />
              <Route path="/billing" element={<BillingPage />} />
              <Route path="/account" element={<AccountPage />} />
            </>
          )}
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
      <RoleSwitcher />
      <Toaster position="top-right" />
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;