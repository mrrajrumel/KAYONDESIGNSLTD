import { useEffect, useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { Edit, Trash2, Plus, X, List, Save } from 'lucide-react';

export default function MenuManager() {
  const [menus, setMenus] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('header');
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({
    label: '',
    url: '',
    is_external: false,
  });

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    setLoading(true);
    try {
      const res = await api.get('/menus');
      const allMenus = res.data.data.data || [];
      setMenus(allMenus);
      
      const currentMenu = allMenus.find((m: any) => m.location === activeTab);
      setMenuItems(currentMenu?.items || []);
    } catch (err) {
      toast.error('Failed to load menus');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const currentMenu = menus.find((m: any) => m.location === activeTab);
    setMenuItems(currentMenu?.items || []);
  }, [activeTab, menus]);

  const openModal = (item: any = null, index: number | null = null) => {
    if (item) {
      setEditingItem({ ...item, index });
      setFormData({
        label: item.label,
        url: item.url,
        is_external: item.is_external || false,
      });
    } else {
      setEditingItem(null);
      setFormData({ label: '', url: '', is_external: false });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      const updated = [...menuItems];
      updated[editingItem.index] = formData;
      setMenuItems(updated);
    } else {
      setMenuItems([...menuItems, formData]);
    }
    setIsModalOpen(false);
  };

  const removeItem = (index: number) => {
    setMenuItems(menuItems.filter((_, i) => i !== index));
  };

  const saveMenu = async () => {
    try {
      const existingMenu = menus.find((m: any) => m.location === activeTab);
      const data = {
        name: activeTab.charAt(0).toUpperCase() + activeTab.slice(1) + ' Menu',
        location: activeTab,
        items: menuItems
      };

      if (existingMenu) {
        await api.put(`/menus/${existingMenu.id}`, data);
      } else {
        await api.post('/menus', data);
      }
      toast.success('Menu saved successfully');
      fetchMenus();
    } catch (err) {
      toast.error('Failed to save menu');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div className="flex gap-4">
            <button 
              onClick={() => setActiveTab('header')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'header' ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
              Header Menu
            </button>
            <button 
              onClick={() => setActiveTab('footer')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'footer' ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
              Footer Menu
            </button>
          </div>
          <button onClick={saveMenu} className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-green-700">
            <Save size={16} /> Save Changes
          </button>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-gray-800 capitalize">{activeTab} Menu Items</h3>
            <button onClick={() => openModal()} className="flex items-center gap-1 text-primary hover:underline text-sm font-medium">
              <Plus size={16} /> Add Link
            </button>
          </div>

          <div className="space-y-3">
            {menuItems.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg group">
                <div className="flex items-center gap-4">
                  <List size={18} className="text-gray-400 cursor-move" />
                  <div>
                    <div className="font-medium text-gray-900">{item.label}</div>
                    <div className="text-xs text-gray-500">{item.url}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openModal(item, idx)} className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Edit size={16} /></button>
                  <button onClick={() => removeItem(idx)} className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
            {menuItems.length === 0 && (
              <div className="text-center py-12 text-gray-400 border-2 border-dashed border-gray-100 rounded-xl">
                No items in this menu yet.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">{editingItem ? 'Edit Link' : 'Add Link'}</h3>
              <button onClick={() => setIsModalOpen(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                <input type="text" value={formData.label} onChange={e => setFormData({...formData, label: e.target.value})} required className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-primary focus:border-primary outline-none" placeholder="e.g. Home" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL / Path</label>
                <input type="text" value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} required className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-primary focus:border-primary outline-none" placeholder="e.g. /services" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={formData.is_external} onChange={e => setFormData({...formData, is_external: e.target.checked})} className="w-4 h-4 text-primary rounded" />
                <span className="text-sm font-medium text-gray-700">Open in New Tab (External)</span>
              </label>
              <div className="pt-4 flex gap-3">
                <button type="submit" className="flex-1 bg-primary text-white py-2 rounded font-medium hover:opacity-90">{editingItem ? 'Update' : 'Add to Menu'}</button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-100 text-gray-700 py-2 rounded font-medium hover:bg-gray-200">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
