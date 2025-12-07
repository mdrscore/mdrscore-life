import { create } from 'zustand';
import api from '@/lib/axios';

interface AuthState {
  user: any | null;
  loading: boolean;
  error: string | null;
  init: () => Promise<void>;
  login: (identifier: string, password: string) => Promise<boolean>;
  register: (data: any) => Promise<{ success: boolean; requireVerify?: boolean }>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: false,
  error: null,

  init: async () => {
    set({ loading: true, error: null });
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('mdr_token') : null;
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const res = await api.get('/api/me');
        set({ user: res.data.data ?? null, loading: false });
      } else {
        set({ user: null, loading: false });
      }
    } catch (err: any) {
      set({ user: null, loading: false, error: err.response?.data?.message ?? 'Init gagal' });
    }
  },

  login: async (identifier, password) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post('/api/login', {
        email: identifier,
        password,
      });

      const { token, user } = res.data;

      if (token) {
        localStorage.setItem('mdr_token', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }

      set({ user: user ?? null, loading: false });
      return true;
    } catch (err: any) {
      set({
        error: err.response?.data?.message || 'Login gagal',
        loading: false,
      });
      return false;
    }
  },

  register: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post('/api/register', data);
      set({ loading: false });
      return {
        success: true,
        requireVerify: res.data?.data?.require_verify ?? false,
      };
    } catch (err: any) {
      set({
        error: err.response?.data?.message || 'Registrasi gagal',
        loading: false,
      });
      return { success: false };
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      localStorage.removeItem('mdr_token');
      delete api.defaults.headers.common['Authorization'];
      set({ user: null, loading: false });
    } catch {
      set({ user: null, loading: false });
    }
  },
}));
