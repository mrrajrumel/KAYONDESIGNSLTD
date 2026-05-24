import { useEffect, useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { Save } from 'lucide-react';

export default function SettingsManager() {
  const [settings, setSettings] = useState({
    site_name: '',
    site_description: '',
    contact_email: '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await api.get('/settings');
      if (res.data.data) {
        setSettings({
          site_name: res.data.data.site_name || '',
          site_description: res.data.data.site_description || '',
          contact_email: res.data.data.contact_email || '',
          phone: res.data.data.phone || '',
          address: res.data.data.address || '',
        });
      }
    } catch (err) {
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/settings', settings);
      toast.success('Settings saved successfully');
    } catch (err) {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Global Website Settings</h3>
      </div>
      <div className="p-6">
        <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
            <input 
              type="text" 
              value={settings.site_name} 
              onChange={e => setSettings({...settings, site_name: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Site Description</label>
            <textarea 
              rows={3}
              value={settings.site_description} 
              onChange={e => setSettings({...settings, site_description: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-primary focus:border-primary"
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
              <input 
                type="email" 
                value={settings.contact_email} 
                onChange={e => setSettings({...settings, contact_email: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input 
                type="text" 
                value={settings.phone} 
                onChange={e => setSettings({...settings, phone: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input 
              type="text" 
              value={settings.address} 
              onChange={e => setSettings({...settings, address: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-primary focus:border-primary"
            />
          </div>
          <div className="pt-4">
            <button 
              type="submit" 
              disabled={saving}
              className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded font-medium hover:bg-primary/90 disabled:opacity-50"
            >
              <Save size={18} /> {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
