import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard, Files, Upload, Share2, Shield,
  Users, ClipboardList, LogOut, Menu, X, ChevronLeft,
  Bell, Search, Settings, FileText, Lock
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', roles: ['Administrator', 'Partner', 'Client'] },
  { label: 'My Files', icon: Files, path: '/files', roles: ['Administrator', 'Partner', 'Client'] },
  { label: 'Upload File', icon: Upload, path: '/upload', roles: ['Administrator', 'Partner'] },
  { label: 'Shared Links', icon: Share2, path: '/links', roles: ['Administrator', 'Partner'] },
  { label: 'Audit Logs', icon: ClipboardList, path: '/audit', roles: ['Administrator'] },
  { label: 'Admin Panel', icon: Shield, path: '/admin', roles: ['Administrator'] },
];

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const { sidebarOpen, setSidebarOpen } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNav = navItems.filter(item => item.roles.includes(user?.role));

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/[0.06]">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #C9A227, #E4B93A)' }}>
          <Lock className="w-4 h-4 text-[#0F172A]" />
        </div>
        {sidebarOpen && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-white font-bold text-lg font-poppins"
          >
            DocShare
          </motion.span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {filteredNav.map((item) => {
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${isActive
                  ? 'sidebar-active font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
                }`}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-[#C9A227]' : ''}`} />
              {sidebarOpen && (
                <span className="text-sm truncate">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="px-3 py-4 border-t border-white/[0.06]">
        <Link
          to="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all duration-200 mb-1"
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          {sidebarOpen && <span className="text-sm">Settings</span>}
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/[0.08] transition-all duration-200"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {sidebarOpen && <span className="text-sm">Log Out</span>}
        </button>
        {sidebarOpen && (
          <div className="mt-3 px-3 py-3 rounded-xl bg-white/[0.04] border border-white/[0.04]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-[#0F172A]" style={{ background: 'linear-gradient(135deg, #C9A227, #E4B93A)' }}>
                {user?.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-medium truncate">{user?.name}</p>
                <p className="text-slate-400 text-xs truncate">{user?.role}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-shrink-0 relative z-20">
        <motion.aside
          animate={{ width: sidebarOpen ? 240 : 72 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="flex flex-col bg-[#0F172A] overflow-hidden border-r border-white/[0.06]"
          style={{ minWidth: sidebarOpen ? 240 : 72 }}
        >
          <SidebarContent />
        </motion.aside>
        {/* Collapse toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#C9A227] rounded-full flex items-center justify-center shadow-md z-30 hover:scale-110 transition-transform"
        >
          <motion.div animate={{ rotate: sidebarOpen ? 0 : 180 }}>
            <ChevronLeft className="w-3 h-3 text-[#0F172A]" />
          </motion.div>
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ duration: 0.3 }}
              className="fixed left-0 top-0 h-full w-64 bg-[#0F172A] z-50 lg:hidden flex flex-col"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 flex-shrink-0 z-10">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-slate-600 hover:text-[#0F172A]"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 w-64 border border-gray-200 focus-within:border-[#C9A227]/40 focus-within:bg-white transition-all">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search files, links..."
                className="bg-transparent text-sm outline-none text-[#0F172A] placeholder-slate-400 w-full"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Notification bell */}
            <button className="relative p-2 text-slate-500 hover:text-[#0F172A] hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C9A227] rounded-full pulse-gold"></span>
            </button>
            {/* Avatar */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-[#0F172A] shadow-md" style={{ background: 'linear-gradient(135deg, #C9A227, #E4B93A)' }}>
                {user?.avatar}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-[#0F172A]">{user?.name}</p>
                <p className="text-xs text-slate-500">{user?.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
