import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Users, FileText, ImageIcon, MessageSquare } from 'lucide-react';

interface Stats {
  pages: number;
  messages: number;
  showcases: number;
  unread_messages: number;
}

export default function DashboardOverview() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [adminName, setAdminName] = useState<string>('Admin');

  useEffect(() => {
    api.get('/dashboard/stats').then(res => setStats(res.data.data)).catch(console.error);
    api.get('/auth/me').then(res => setAdminName(res.data.data.name || 'Admin')).catch(console.error);
  }, []);

  if (!stats) return (
    <div className="flex h-[60vh] items-center justify-center">
      <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-primary to-primary-container p-8 rounded-2xl shadow-xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-black mb-2 tracking-tight">Welcome back, {adminName}! 👋</h1>
          <p className="text-primary-fixed-dim/90 font-medium">Here's what's happening with your website today.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Pages" value={stats.pages} icon={FileText} color="from-blue-500 to-blue-600" />
        <StatCard title="Showcase Projects" value={stats.showcases} icon={ImageIcon} color="from-purple-500 to-purple-600" />
        <StatCard title="Total Messages" value={stats.messages} icon={MessageSquare} color="from-emerald-500 to-emerald-600" />
        <StatCard title="Unread Messages" value={stats.unread_messages} icon={Users} color="from-orange-500 to-red-500" />
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: any) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={24} />
      </div>
      <div className="ml-5">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">{title}</h3>
        <p className="text-3xl font-black text-gray-900 mt-1">{value}</p>
      </div>
    </div>
  );
}
