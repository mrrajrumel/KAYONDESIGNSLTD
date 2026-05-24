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

  useEffect(() => {
    api.get('/dashboard/stats').then(res => setStats(res.data.data)).catch(console.error);
  }, []);

  if (!stats) return <div className="p-4">Loading stats...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Total Pages" value={stats.pages} icon={FileText} color="bg-blue-500" />
      <StatCard title="Showcase Projects" value={stats.showcases} icon={ImageIcon} color="bg-purple-500" />
      <StatCard title="Total Messages" value={stats.messages} icon={MessageSquare} color="bg-green-500" />
      <StatCard title="Unread Messages" value={stats.unread_messages} icon={Users} color="bg-red-500" />
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: any) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white ${color}`}>
        <Icon size={24} />
      </div>
      <div className="ml-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
