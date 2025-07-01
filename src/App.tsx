import React, { useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AuthContainer from './components/Auth/AuthContainer';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Pages/Dashboard';
import OffersPage from './components/Pages/OffersPage';
import AffiliatesPage from './components/Pages/AffiliatesPage';
import SettingsPage from './components/Pages/SettingsPage';
import SmartLinksPage from './components/Pages/SmartLinksPage';
import CreativesPage from './components/Pages/CreativesPage';
import StatisticsPage from './components/Pages/StatisticsPage';
import ProfilePage from './components/Pages/ProfilePage';
import MyLinksPage from './components/Pages/MyLinksPage';
import PaymentsPage from './components/Pages/PaymentsPage';

const AppRoutes: React.FC = () => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-2xl mx-auto mb-4 animate-pulse"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return <AuthContainer />;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          {/* Common Routes */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Admin Routes */}
          {profile.role === 'admin' && (
            <>
              <Route path="/offers" element={<OffersPage />} />
              <Route path="/affiliates" element={<AffiliatesPage />} />
              <Route path="/smartlinks" element={<SmartLinksPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </>
          )}
          
          {/* Affiliate Routes */}
          {profile.role === 'affiliate' && (
            <>
              <Route path="/offers" element={<OffersPage />} />
              <Route path="/links" element={<MyLinksPage />} />
              <Route path="/stats" element={<StatisticsPage />} />
              <Route path="/creatives" element={<CreativesPage />} />
              <Route path="/payments" element={<PaymentsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </>
          )}
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
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