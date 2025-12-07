import { create } from 'zustand';
import { supabase } from '@/lib/supabaseClient';

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

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useUserStore = create<UserState>((set, get) => ({
  profile: null,
  loading: true,
  error: null,

  fetchProfile: async () => {
    set({ loading: true });
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session || !API_URL) {
        set({ profile: null, loading: false });
        return;
      }

      const res = await fetch(`${API_URL}/api/me`, {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      const json = await res.json();
      if (json.status === 'sukses') {
        set({ profile: json.data, loading: false });
      } else {
        set({ profile: null, loading: false });
      }

    } catch (err) {
      console.error(err);
      set({ profile: null, loading: false });
    }
  },

  updateProfile: async (data) => {
    set({ loading: true, error: null });
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session || !API_URL) throw new Error("Sesi tidak valid");

      const res = await fetch(`${API_URL}/api/me/profile`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}` 
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      set((state) => ({
        profile: state.profile ? { ...state.profile, ...json.data } : json.data,
        loading: false
      }));
      return true;

    } catch (err: any) {
      set({ error: err.message, loading: false });
      return false;
    }
  },

  uploadAvatar: async (file) => {
    set({ loading: true, error: null });
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session || !API_URL) throw new Error("Sesi tidak valid");

      const formData = new FormData();
      formData.append('avatar', file);

      const res = await fetch(`${API_URL}/api/me/avatar`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${session.access_token}` },
        body: formData,
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      set((state) => ({
        profile: state.profile ? { ...state.profile, avatar_url: json.data.avatar_url } : null,
        loading: false
      }));
      return true;

    } catch (err: any) {
      set({ error: err.message, loading: false });
      return false;
    }
  },

  updateAccountSettings: async (data) => {
    set({ loading: true, error: null });
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session || !API_URL) throw new Error("Sesi tidak valid");

      const res = await fetch(`${API_URL}/api/me/account`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}` 
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      set({ loading: false });
      return true;

    } catch (err: any) {
      set({ error: err.message, loading: false });
      return false;
    }
  },

  deleteAccount: async () => {
    set({ loading: true, error: null });
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session || !API_URL) throw new Error("Sesi tidak valid");

      const res = await fetch(`${API_URL}/api/me`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      set({ profile: null, loading: false });
      return true;

    } catch (err: any) {
      set({ error: err.message, loading: false });
      return false;
    }
  },

  resetUser: () => set({ profile: null, error: null, loading: false }),
}));