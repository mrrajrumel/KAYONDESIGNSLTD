import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, FileText, Settings, Image as ImageIcon, Users, LogOut,
  Menu as MenuIcon, Briefcase, Mail, List, History, ChevronDown
} from 'lucide-react';
import api from '../services/api';
import DashboardOverview from '../pages/Admin/DashboardOverview';
import PageManager from '../pages/Admin/PageManager';
import ShowcaseManager from '../pages/Admin/ShowcaseManager';
import CategoryManager from '../pages/Admin/CategoryManager';
import UserManager from '../pages/Admin/UserManager';
import MenuManager from '../pages/Admin/MenuManager';
import MediaManager from '../pages/Admin/MediaManager';
import MessageManager from '../pages/Admin/MessageManager';
import SettingsManager from '../pages/Admin/SettingsManager';
import ActivityLogManager from '../pages/Admin/ActivityLogManager';
import React, { useEffect, useState as React_useState, Suspense } from 'react'; // Alias useState

const NavLink = ({ item, sidebarOpen }: { item: any, sidebarOpen: boolean }) => {
  const location = useLocation();
  const isActive = item.path === '/admin' ? location.pathname === item.path : location.pathname.startsWith(item.path);

  return (
    <Link
      to={item.path}
      className={`flex items-center px-4 py-3 mx-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
        isActive
          ? 'bg-primary text-white shadow-md shadow-primary/20'
          : 'text-gray-600 hover:bg-gray-100 hover:text-primary'
      }`}
    >
      <item.icon size={18} className={`min-w-[18px] transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} />
      {sidebarOpen && <span className="ml-3 truncate">{item.name}</span>}
    </Link>
  )
};

const Accordion = ({ title, icon: Icon, children, sidebarOpen }: { title: string, icon: any, children: React.ReactNode, sidebarOpen: boolean }) => {
  const location = useLocation();
  const hasActiveChild = React.Children.toArray(children).some((child: any) =>
    location.pathname.startsWith(child.props.item.path)
  );

  const [isOpen, setIsOpen] = React_useState(hasActiveChild); // Use aliased useState

  useEffect(() => {
    if (sidebarOpen) {
      setIsOpen(hasActiveChild);
    }
  }, [hasActiveChild, sidebarOpen]);

  if (!sidebarOpen) {
    return (
      <div className="py-2 space-y-2">
        {React.Children.map(children, (child: any) => 
          React.cloneElement(child, { sidebarOpen: false })
        )}
      </div>
    );
  }

  return (
    <div>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-3 mx-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-primary rounded-lg transition-colors"
      >
        <div className="flex items-center">
          <Icon size={18} className="min-w-[18px]" />
          <span className="ml-3 truncate">{title}</span>
        </div>
        <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="pl-6 border-l-2 border-gray-100 ml-8 my-1 space-y-1">
          {children}
        </div>
      </div>
    </div>
  )
}

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React_useState(true); // Use aliased useState

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

  const navItems = {
    top: [
      { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    ],
    content: [
      { name: 'Pages', path: '/admin/pages', icon: FileText },
      { name: 'Menus', path: '/admin/menus', icon: MenuIcon },
    ],
    showcase: [
      { name: 'Projects', path: '/admin/showcases', icon: Briefcase },
      { name: 'Categories', path: '/admin/categories', icon: List },
    ],
    site: [
      { name: 'Media', path: '/admin/media', icon: ImageIcon },
      { name: 'Messages', path: '/admin/messages', icon: Mail },
      { name: 'Settings', path: '/admin/settings', icon: Settings },
    ],
    admin: [
      { name: 'Users', path: '/admin/users', icon: Users },
      { name: 'Activity Logs', path: '/admin/logs', icon: History },
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`bg-white border-r border-gray-100 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} flex flex-col fixed md:relative z-20 h-full shadow-lg shadow-gray-200/40`}>
        <div className="h-20 flex items-center justify-between px-6 border-b border-gray-100 bg-white">
          {sidebarOpen && <span className="font-black text-primary tracking-tighter text-xl truncate">Kayon<span className="text-secondary">CMS</span></span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors">
            <MenuIcon size={20} />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 space-y-1">
          <NavLink item={navItems.top[0]} sidebarOpen={sidebarOpen} />
          
          <Accordion title="Showcase" icon={Briefcase} sidebarOpen={sidebarOpen}>
            {navItems.showcase.map((item) => <NavLink key={item.path} item={item} sidebarOpen={sidebarOpen} />)}
          </Accordion>

          <Accordion title="Content" icon={FileText} sidebarOpen={sidebarOpen}>
            {navItems.content.map((item) => <NavLink key={item.path} item={item} sidebarOpen={sidebarOpen} />)}
          </Accordion>
          
          <Accordion title="Site Management" icon={Settings} sidebarOpen={sidebarOpen}>
            {navItems.site.map((item) => <NavLink key={item.path} item={item} sidebarOpen={sidebarOpen} />)}
          </Accordion>

          <Accordion title="Administration" icon={Users} sidebarOpen={sidebarOpen}>
            {navItems.admin.map((item) => <NavLink key={item.path} item={item} sidebarOpen={sidebarOpen} />)}
          </Accordion>
        </nav>

        <div className="p-4 border-t border-outline-variant mt-auto">
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
      <main className="flex-1 flex flex-col min-h-screen ml-20 md:ml-0 transition-all duration-300 bg-[#f8fafd]">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 capitalize tracking-tight">
            {location.pathname === '/admin' ? 'Dashboard' : location.pathname.split('/').pop()}
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-3 py-1.5 rounded-lg transition-colors">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary text-white flex items-center justify-center font-bold text-sm shadow-md">
                KD
              </div>
              <span className="text-sm font-bold text-gray-700 hidden sm:block">Admin</span>
            </div>
          </div>
        </header>
        <div className="flex-1 p-8 overflow-auto">
          <Suspense fallback={<div className="flex h-[60vh] items-center justify-center"><div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" /></div>}>
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
          </Suspense>
        </div>
      </main>
    </div>
  );
}
