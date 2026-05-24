import { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Settings, Image as ImageIcon, Users, LogOut, Menu as MenuIcon, Briefcase, Mail, List, History } from 'lucide-react';
import api from '../services/api';
import DashboardOverview from '../pages/Admin/DashboardOverview';
import PageManager from '../pages/Admin/PageManager';
import ShowcaseManager from '../pages/Admin/ShowcaseManager';
import CategoryManager from '../pages/Admin/CategoryManager';
import UserManager from '../pages/Admin/UserManager';
import MediaManager from '../pages/Admin/MediaManager';
import MessageManager from '../pages/Admin/MessageManager';
import SettingsManager from '../pages/Admin/SettingsManager';
import ActivityLogManager from '../pages/Admin/ActivityLogManager';
import MenuManager from '../pages/Admin/MenuManager';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // ignore
    } finally {
      localStorage.removeItem('admin_token');
      navigate('/secure-admin-panel-login');
    }
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Pages', path: '/admin/pages', icon: FileText },
    { name: 'Menus', path: '/admin/menus', icon: MenuIcon },
    { name: 'Categories', path: '/admin/categories', icon: List },
    { name: 'Showcases', path: '/admin/showcases', icon: Briefcase },
    { name: 'Media', path: '/admin/media', icon: ImageIcon },
    { name: 'Messages', path: '/admin/messages', icon: Mail },
    { name: 'Admins', path: '/admin/users', icon: Users },
    { name: 'Activity Logs', path: '/admin/logs', icon: History },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`bg-surface border-r border-outline-variant transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} flex flex-col fixed md:relative z-20 h-full`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-outline-variant">
          {sidebarOpen && <span className="font-bold text-primary truncate">Admin Panel</span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-on-surface hover:bg-gray-100 rounded">
            <MenuIcon size={20} />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                location.pathname === item.path 
                  ? 'bg-primary/10 text-primary border-r-4 border-primary' 
                  : 'text-on-surface-variant hover:bg-gray-100 hover:text-on-surface'
              }`}
            >
              <item.icon size={20} className="min-w-[20px]" />
              {sidebarOpen && <span className="ml-3 truncate">{item.name}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-outline-variant">
          <button 
            onClick={handleLogout}
            className="flex items-center text-red-600 hover:text-red-700 w-full px-2 py-2"
          >
            <LogOut size={20} className="min-w-[20px]" />
            {sidebarOpen && <span className="ml-3 font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen ml-20 md:ml-0 transition-all duration-300">
        <header className="h-16 bg-white shadow-sm flex items-center px-6 sticky top-0 z-10">
          <h2 className="text-xl font-semibold text-gray-800 capitalize">
            {location.pathname === '/admin' ? 'Dashboard' : location.pathname.split('/').pop()}
          </h2>
        </header>
        <div className="flex-1 p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/pages" element={<PageManager />} />
            <Route path="/menus" element={<MenuManager />} />
            <Route path="/categories" element={<CategoryManager />} />
            <Route path="/showcases" element={<ShowcaseManager />} />
            <Route path="/media" element={<MediaManager />} />
            <Route path="/messages" element={<MessageManager />} />
            <Route path="/settings" element={<SettingsManager />} />
            <Route path="/users" element={<UserManager />} />
            <Route path="/logs" element={<ActivityLogManager />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
