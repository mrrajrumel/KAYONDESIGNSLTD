import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProtectedRoute from './components/Admin/ProtectedRoute';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { useSettingsStore } from './store/useSettingsStore';
import React, { useEffect, Suspense } from 'react';
import DynamicPage from './components/DynamicPage';

const AdminLogin = React.lazy(() => import('./pages/Admin/AdminLogin'));
const AdminLayout = React.lazy(() => import('./layouts/AdminLayout'));

function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300); // Slight delay to ensure content renders first
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-surface font-sans">
      <ScrollToHash />
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}

export default function App() {
  const fetchSettings = useSettingsStore(state => state.fetchSettings);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return (
    <HelmetProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          {/* Public Routes - Use MainLayout with public Navbar/Footer */}
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/:slug" element={<MainLayout><DynamicPage /></MainLayout>} />

          {/* Admin Login - No Navbar/Footer */}
          <Route path="/secure-admin-panel-login" element={
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
              <AdminLogin />
            </Suspense>
          } />

          {/* Admin Dashboard - Uses AdminLayout (No public Navbar/Footer) */}
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute>
                <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Dashboard...</div>}>
                  <AdminLayout />
                </Suspense>
              </ProtectedRoute>
            } 
          />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}
