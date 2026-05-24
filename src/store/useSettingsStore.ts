import { create } from 'zustand';
import api from '../services/api';

interface SettingsState {
  siteName: string;
  logo: string;
  favicon: string;
  isLoading: boolean;
  fetchSettings: () => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  siteName: 'Kayon Designs Ltd',
  logo: '',
  favicon: '',
  isLoading: false,
  fetchSettings: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/settings/public');
      if (response.data) {
        set({
          siteName: response.data.site_name || 'Kayon Designs Ltd',
          logo: response.data.logo || '',
          favicon: response.data.favicon || '',
        });
      }
    } catch (error) {
      console.error('Failed to fetch settings', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));