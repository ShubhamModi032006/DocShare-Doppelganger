import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Layout from './components/layout/Layout';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import UploadPage from './pages/UploadPage';
import FilesPage from './pages/FilesPage';
import LinksPage from './pages/LinksPage';
import SharedFilePage from './pages/SharedFilePage';
import AuditLogPage from './pages/AuditLogPage';
import AdminPanel from './pages/AdminPanel';
import SettingsPage from './pages/SettingsPage';

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Shared file access — no auth required */}
      <Route path="/shared/:token" element={<SharedFilePage />} />

      {/* Protected routes wrapped in layout */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Layout><DashboardPage /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/files" element={
        <ProtectedRoute>
          <Layout><FilesPage /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/upload" element={
        <ProtectedRoute allowedRoles={['Administrator', 'Partner']}>
          <Layout><UploadPage /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/links" element={
        <ProtectedRoute>
          <Layout><LinksPage /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/audit" element={
        <ProtectedRoute allowedRoles={['Administrator']}>
          <Layout><AuditLogPage /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={['Administrator']}>
          <Layout><AdminPanel /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/settings" element={
        <ProtectedRoute>
          <Layout><SettingsPage /></Layout>
        </ProtectedRoute>
      } />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <AppRoutes />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: {
                background: '#0F172A',
                color: '#fff',
                borderRadius: '12px',
                fontSize: '14px',
                border: '1px solid rgba(201, 162, 39, 0.3)',
              },
              success: {
                iconTheme: { primary: '#C9A227', secondary: '#0F172A' },
              },
              error: {
                iconTheme: { primary: '#ef4444', secondary: '#fff' },
              },
            }}
          />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
