import { Save, Upload, X } from 'lucide-react';
import useApi from '../../hooks/useApi';
import { useState, useEffect, useRef } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

export default function SettingsManager() {
  const { data, loading } = useApi<any>({ initialUrl: '/settings' });
  const [settings, setSettings] = useState({
    site_name: '',
    site_description: '',
    contact_email: '',
    phone: '',
    address: '',
    logo: '',
    favicon: '',
  });
  const [saving, setSaving] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isUploadingFavicon, setIsUploadingFavicon] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const faviconInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'favicon') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const form = new FormData();
    form.append('files[]', file);

    const isLogo = field === 'logo';
    if (isLogo) setIsUploadingLogo(true);
    else setIsUploadingFavicon(true);

    const toastId = toast.loading(`Uploading ${field}...`);
    
    try {
      const res = await api.post('/media', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const uploadedUrl = res.data.data[0].file_path;
      setSettings(prev => ({ ...prev, [field]: uploadedUrl }));
      toast.success(`${field} uploaded successfully`, { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error(`Failed to upload ${field}`, { id: toastId });
    } finally {
      if (isLogo) {
        setIsUploadingLogo(false);
        if (logoInputRef.current) logoInputRef.current.value = '';
      } else {
        setIsUploadingFavicon(false);
        if (faviconInputRef.current) faviconInputRef.current.value = '';
      }
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
                <div className="flex flex-col gap-4">
                  {settings.logo && (
                    <div className="relative w-48 h-24 bg-white border border-gray-200 rounded-lg overflow-hidden p-2 flex items-center justify-center">
                      <img src={settings.logo} className="max-w-full max-h-full object-contain" alt="Logo" />
                      <button 
                        type="button"
                        onClick={() => setSettings({...settings, logo: ''})}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 shadow"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  )}
                  
                  <div className={`border-2 border-dashed ${settings.logo ? 'border-gray-200 bg-white' : 'border-primary/30 bg-primary/5'} rounded-lg p-4 text-center hover:bg-primary/10 transition-colors cursor-pointer relative`}>
                    <input 
                      type="file" 
                      ref={logoInputRef}
                      onChange={(e) => handleFileUpload(e, 'logo')}
                      accept="image/*"
                      disabled={isUploadingLogo}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    />
                    <div className="flex flex-col items-center text-gray-500 gap-1">
                      {isUploadingLogo ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                      ) : (
                        <>
                          <Upload size={18} className="text-primary" />
                          <span className="text-xs font-medium">{settings.logo ? 'Change Logo' : 'Upload Logo'}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-3">Favicon</label>
                <div className="flex flex-col gap-4">
                  {settings.favicon && (
                    <div className="relative w-16 h-16 bg-white border border-gray-200 rounded-lg overflow-hidden p-2 flex items-center justify-center">
                      <img src={settings.favicon} className="w-8 h-8 object-contain" alt="Favicon" />
                      <button 
                        type="button"
                        onClick={() => setSettings({...settings, favicon: ''})}
                        className="absolute top-1 right-1 bg-red-500 text-white p-0.5 rounded-full hover:bg-red-600 shadow"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  )}

                  <div className={`border-2 border-dashed ${settings.favicon ? 'border-gray-200 bg-white' : 'border-primary/30 bg-primary/5'} rounded-lg p-3 text-center hover:bg-primary/10 transition-colors cursor-pointer relative w-32`}>
                    <input 
                      type="file" 
                      ref={faviconInputRef}
                      onChange={(e) => handleFileUpload(e, 'favicon')}
                      accept="image/*"
                      disabled={isUploadingFavicon}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    />
                    <div className="flex flex-col items-center text-gray-500 gap-1">
                      {isUploadingFavicon ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      ) : (
                        <>
                          <Upload size={16} className="text-primary" />
                          <span className="text-xs font-medium">{settings.favicon ? 'Change' : 'Upload'}</span>
                        </>
                      )}
                    </div>
                  </div>
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
