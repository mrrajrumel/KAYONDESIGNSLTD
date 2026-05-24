import { Save } from 'lucide-react';
import useApi from '../../hooks/useApi';
import { useState, useEffect } from 'react';
import api from '../../services/api';
import { WebsiteSettings } from '../../types';

export default function SettingsManager() {
  const { data, loading } = useApi<WebsiteSettings>({ initialUrl: '/settings' });
  const [settings, setSettings] = useState<Partial<WebsiteSettings>>({
    site_name: '',
    site_description: '',
    contact_email: '',
    phone: '',
    address: '',
    logo: '',
    favicon: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data.length) {
      const initialSettings = data[0];
      setSettings({
        site_name: initialSettings.site_name || '',
        site_description: initialSettings.site_description || '',
        contact_email: initialSettings.contact_email || '',
        phone: initialSettings.phone || '',
        address: initialSettings.address || '',
        logo: initialSettings.logo || '',
        favicon: initialSettings.favicon || '',
      });
    }
  }, [data]);

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
        <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
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
            </div>

            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-3">Website Logo</label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-white border border-gray-300 rounded flex items-center justify-center overflow-hidden">
                    {settings.logo ? <img src={settings.logo} className="max-w-full max-h-full object-contain" /> : <span className="text-xs text-gray-400">No Logo</span>}
                  </div>
                  <input 
                    type="text" 
                    placeholder="Logo URL"
                    value={settings.logo}
                    onChange={e => setSettings({...settings, logo: e.target.value})}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded focus:ring-primary focus:border-primary text-sm"
                  />
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-3">Favicon</label>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white border border-gray-300 rounded flex items-center justify-center overflow-hidden">
                    {settings.favicon ? <img src={settings.favicon} className="w-8 h-8 object-contain" /> : <span className="text-[10px] text-gray-400">Icon</span>}
                  </div>
                  <input 
                    type="text" 
                    placeholder="Favicon URL"
                    value={settings.favicon}
                    onChange={e => setSettings({...settings, favicon: e.target.value})}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded focus:ring-primary focus:border-primary text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
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
