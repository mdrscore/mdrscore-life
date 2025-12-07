"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LogOut, User, Activity, Trophy, ChevronRight, Settings, Bell } from "lucide-react";

export default function DashboardScreen() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push("/auth/login");
        return;
      }
      
      try {
        // Fetch data profil dari Backend API
        const res = await fetch("http://localhost:3000/api/me", {
          headers: { Authorization: `Bearer ${session.access_token}` },
        });
        const json = await res.json();
        
        if (json.status === 'sukses') {
          setUser(json.data);
        }
      } catch (error) {
        console.error("Gagal memuat data user", error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Selamat Pagi";
    if (hour < 15) return "Selamat Siang";
    if (hour < 18) return "Selamat Sore";
    return "Selamat Malam";
  };

  if (loading) return null; // Atau bisa return loading skeleton

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Navbar Glass */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 drop-shadow-md">
              <Image src="/mdrscore-logo.png" alt="Logo" fill className="object-contain" />
            </div>
            <span className="font-black text-slate-800 text-xl tracking-tighter hidden md:block">
              MDRScore<span className="text-indigo-600">.</span>
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2.5 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-indigo-600 transition-all">
              <Bell size={20} strokeWidth={2.5} />
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 active:scale-95 transition-all"
            >
              <LogOut size={16} />
              <span className="hidden md:inline">Keluar</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-10">
        
        {/* Header Section */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-slate-500 font-bold text-sm uppercase tracking-wider mb-2">
              {getGreeting()}
            </p>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              {user?.full_name || user?.username || 'User'}
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
             <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
             <span className="text-sm font-bold text-slate-600">System Online</span>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1 */}
          <div className="group relative p-6 rounded-[2rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
            <div className="absolute top-6 right-6 p-2 rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <User size={20} strokeWidth={2.5} />
            </div>
            <div className="mt-4">
              <h3 className="text-slate-400 font-bold text-xs uppercase tracking-wider mb-1">Akun</h3>
              <p className="text-slate-800 font-black text-xl truncate pr-8">{user?.email}</p>
              <div className="mt-4 inline-flex items-center text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                Member Basic
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative p-6 rounded-[2rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
            <div className="absolute top-6 right-6 p-2 rounded-full bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Trophy size={20} strokeWidth={2.5} />
            </div>
            <div className="mt-4">
              <h3 className="text-slate-400 font-bold text-xs uppercase tracking-wider mb-1">MDR Score</h3>
              <p className="text-slate-800 font-black text-3xl">0 <span className="text-base text-slate-400 font-medium">pts</span></p>
              <div className="mt-3 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full w-[10%] rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative p-6 rounded-[2rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300">
            <div className="absolute top-6 right-6 p-2 rounded-full bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Activity size={20} strokeWidth={2.5} />
            </div>
            <div className="mt-4">
              <h3 className="text-slate-400 font-bold text-xs uppercase tracking-wider mb-1">Status</h3>
              <p className="text-slate-800 font-black text-xl">Menunggu Data</p>
              <div className="mt-4 inline-flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                Lengkapi Profil
              </div>
            </div>
          </div>
        </div>

        {/* CTA / Action Section */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 text-white p-8 md:p-12 shadow-2xl shadow-slate-900/30">
          
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/30 rounded-full blur-[100px] -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-600/30 rounded-full blur-[80px] -ml-20 -mb-20"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
                Lengkapi Profil Anda
              </h2>
              <p className="text-slate-300 font-medium text-lg leading-relaxed">
                Tambahkan data fisik, target tidur, dan preferensi lainnya agar kami bisa memberikan analisis yang akurat untuk Anda.
              </p>
            </div>
            
            <button 
              onClick={() => router.push('/dashboard/profile')}
              className="group whitespace-nowrap px-8 py-5 bg-white text-slate-900 font-bold text-lg rounded-2xl shadow-xl hover:scale-105 hover:bg-indigo-50 active:scale-95 transition-all duration-300 flex items-center gap-3"
            >
              <span>Edit Profil</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}