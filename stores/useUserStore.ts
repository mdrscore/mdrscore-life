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
  
  fetchProfile: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<boolean>;
  uploadAvatar: (file: File) => Promise<boolean>;
  updateAccountSettings: (data: { email?: string; password?: string }) => Promise<boolean>;
  deleteAccount: () => Promise<boolean>;
  resetUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  loading: true,
  error: null,

  fetchProfile: async () => {
    set({ loading: true });
    try {
      const response = await api.get('/api/me');
      if (response.data.status === 'sukses') {
        set({ profile: response.data.data, loading: false });
      } else {
        set({ profile: null, loading: false });
      }
    } catch (err) {
      set({ profile: null, loading: false });
    }
  },

  updateProfile: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await api.patch('/api/me/profile', data);
      
      set((state) => ({
        profile: state.profile ? { ...state.profile, ...response.data.data } : response.data.data,
        loading: false
      }));
      return true;

    } catch (err: any) {
      set({ 
        error: err.response?.data?.message || err.message, 
        loading: false 
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
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      set((state) => ({
        profile: state.profile ? { ...state.profile, avatar_url: response.data.data.avatar_url } : null,
        loading: false
      }));
      return true;

    } catch (err: any) {
      set({ 
        error: err.response?.data?.message || err.message, 
        loading: false 
      });
      return false;
    }
  },

  updateAccountSettings: async (data) => {
    set({ loading: true, error: null });
    try {
      await api.patch('/api/me/account', data);
      set({ loading: false });
      return true;

    } catch (err: any) {
      set({ 
        error: err.response?.data?.message || err.message, 
        loading: false 
      });
      return false;
    }
  },

  deleteAccount: async () => {
    set({ loading: true, error: null });
    try {
      await api.delete('/api/me');
      set({ profile: null, loading: false });
      return true;

    } catch (err: any) {
      set({ 
        error: err.response?.data?.message || err.message, 
        loading: false 
      });
      return false;
    }
  },

  resetUser: () => set({ profile: null, error: null, loading: false }),
}));