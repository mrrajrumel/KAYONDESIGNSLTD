import { create } from 'zustand';
import api from '../services/api';

interface SettingsState {
  siteName: string;
  siteDescription: string;
  logo: string;
  favicon: string;
  isLoading: boolean;
  fetchSettings: () => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  siteName: 'Kayon Designs Ltd',
  siteDescription: '',
  logo: '',
  favicon: '',
  isLoading: false,
  fetchSettings: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/settings/public');
      if (response.data?.data) {
        set({
          siteName: response.data.data.site_name || 'Kayon Designs Ltd',
          siteDescription: response.data.data.site_description || '',
          logo: response.data.data.logo || '',
          favicon: response.data.data.favicon || '',
        });
      }
    } catch (error) {
      console.error('Failed to fetch settings', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));