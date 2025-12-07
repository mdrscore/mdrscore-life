import { create } from 'zustand';
import api from '@/lib/axios';

interface UserProfile {
  id: string;
  email?: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  gender?: string;
  date_of_birth?: string;
  height_cm?: number;
  weight_kg?: number;
  target_sleep_hours?: number;
  target_water_ml?: number;
  [key: string]: any;
}

interface UserState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  init: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<boolean>;
  uploadAvatar: (file: File) => Promise<boolean>;
  updateAccountSettings: (data: { email?: string; password?: string }) => Promise<boolean>;
  deleteAccount: () => Promise<boolean>;
  resetUser: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  profile: null,
  loading: false,
  error: null,

  init: async () => {
    set({ loading: true, error: null });
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('mdr_token') : null;
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await get().fetchProfile();
      } else {
        set({ profile: null, loading: false });
      }
    } catch (err: any) {
      set({ profile: null, loading: false, error: err.response?.data?.message ?? 'Init gagal' });
    }
  },

  fetchProfile: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/api/me');
      if (response.data?.status === 'sukses' && response.data?.data) {
        set({ profile: response.data.data, loading: false });
      } else {
        set({ profile: null, loading: false });
      }
    } catch (err: any) {
      const msg = err.response?.data?.message ?? err.message ?? 'Fetch profile gagal';
      if (err.response?.status === 401) {
        localStorage.removeItem('mdr_token');
        delete api.defaults.headers.common['Authorization'];
        set({ profile: null, loading: false, error: 'Unauthorized' });
      } else {
        set({ profile: null, loading: false, error: msg });
      }
    }
  },

  updateProfile: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await api.patch('/api/me/profile', data);
      const newData = response.data?.data ?? null;
      set((state) => ({
        profile: state.profile ? { ...state.profile, ...(newData || {}) } : newData,
        loading: false,
      }));
      return true;
    } catch (err: any) {
      set({
        error: err.response?.data?.message || err.message || 'Update profile gagal',
        loading: false,
      });
      return false;
    }
  },

  uploadAvatar: async (file) => {
    set({ loading: true, error: null });
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await api.post('/api/me/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const avatar_url = response.data?.data?.avatar_url ?? null;
      set((state) => ({
        profile: state.profile ? { ...state.profile, avatar_url } : state.profile,
        loading: false,
      }));
      return !!avatar_url;
    } catch (err: any) {
      set({
        error: err.response?.data?.message || err.message || 'Upload avatar gagal',
        loading: false,
      });
      return false;
    }
  },

  updateAccountSettings: async (data) => {
    set({ loading: true, error: null });
    try {
      await api.patch('/api/me/account', data);
      if (data.email) {
        await get().fetchProfile();
      }
      set({ loading: false });
      return true;
    } catch (err: any) {
      set({
        error: err.response?.data?.message || err.message || 'Update account gagal',
        loading: false,
      });
      return false;
    }
  },

  deleteAccount: async () => {
    set({ loading: true, error: null });
    try {
      await api.delete('/api/me');
      localStorage.removeItem('mdr_token');
      delete api.defaults.headers.common['Authorization'];
      set({ profile: null, loading: false });
      return true;
    } catch (err: any) {
      set({
        error: err.response?.data?.message || err.message || 'Hapus akun gagal',
        loading: false,
      });
      return false;
    }
  },

  resetUser: () => set({ profile: null, error: null, loading: false }),
}));
