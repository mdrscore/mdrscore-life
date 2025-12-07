import { create } from 'zustand';
import { supabase } from '@/lib/supabaseClient';
import api from '@/lib/axios';

interface AuthState {
  user: any | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: any) => Promise<{ success: boolean; requireVerify?: boolean }>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post('/api/login', { email, password });
      const { token, user } = res.data;

      if (token) {
        await supabase.auth.setSession({ access_token: token, refresh_token: token });
      }
      
      set({ user, loading: false });
      return true;
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Login gagal", loading: false });
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
        requireVerify: res.data.data.require_verify 
      };
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Registrasi gagal", loading: false });
      return { success: false };
    }
  },

  fetchUser: async () => {
    set({ loading: true });
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        set({ user: null, loading: false });
        return;
      }
      const res = await api.get('/api/me');
      set({ user: res.data.data, loading: false });
    } catch {
      set({ user: null, loading: false });
    }
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  }
}));