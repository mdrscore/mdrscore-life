"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LogOut, User, Sparkles, ArrowRight, LayoutDashboard, Loader2 } from "lucide-react";
import { useUserStore } from "../../stores/useUserStore";
import { useAuthStore } from "../../stores/useAuthStore";
import "../../styles/auth.css";

export default function WelcomeScreen() {
  const router = useRouter();
  const { profile, fetchProfile, loading } = useUserStore();
  const { logout } = useAuthStore();

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (!loading && !profile) {
      router.replace("/auth/login");
    }
  }, [loading, profile, router]);

  const handleLogout = async () => {
    await logout();
    router.replace("/auth/login");
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="auth-container relative overflow-hidden">
      <div className="glowing-orb orb-1"></div>
      <div className="glowing-orb orb-2"></div>
      <div className="glowing-orb orb-3"></div>

      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center backdrop-blur-sm bg-white/10 border-b border-white/20">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8">
            <Image src="/mdrscore-logo.png" alt="Logo" fill className="object-contain" />
          </div>
          <span className="font-black text-slate-800 text-lg tracking-tight">MDRScore</span>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 hover:bg-white/60 border border-white/50 text-slate-700 font-bold text-sm transition-all"
        >
          <LogOut size={16} />
          <span>Keluar</span>
        </button>
      </nav>

      <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center text-center mt-20">
        
        <div className="mb-6 p-4 rounded-full bg-white/30 backdrop-blur-md border border-white/50 shadow-xl animate-bounce-slow">
          <Sparkles className="w-8 h-8 text-purple-600" />
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
          Selamat Datang, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
            {profile.full_name || profile.username || "User"}
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl mb-10 leading-relaxed">
          Akun Anda telah siap. Siap untuk memulai perjalanan pengembangan diri Anda dengan MDRScore?
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
          
          <button 
            onClick={() => router.push('/dashboard')}
            className="group relative p-6 rounded-3xl bg-white/40 backdrop-blur-md border border-white/60 shadow-xl hover:-translate-y-2 transition-all duration-300 text-left"
          >
            <div className="p-3 bg-blue-100 rounded-2xl w-fit mb-4 text-blue-600">
              <LayoutDashboard size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
              Masuk Dashboard 
              <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-sm text-slate-500 font-medium">
              Lihat statistik, grafik perkembangan, dan skor harian Anda.
            </p>
          </button>

          <button 
            onClick={() => router.push('/dashboard/profile')}
            className="group relative p-6 rounded-3xl bg-white/40 backdrop-blur-md border border-white/60 shadow-xl hover:-translate-y-2 transition-all duration-300 text-left"
          >
            <div className="p-3 bg-purple-100 rounded-2xl w-fit mb-4 text-purple-600">
              <User size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
              Lengkapi Profil
              <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-sm text-slate-500 font-medium">
              Atur avatar, data fisik, dan preferensi akun Anda.
            </p>
          </button>

        </div>
      </div>
    </div>
  );
}