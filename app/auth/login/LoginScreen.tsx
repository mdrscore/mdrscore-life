"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { User, Lock, ArrowRight, Loader2, AlertTriangle } from "lucide-react";
import { useAuthStore } from "../../../stores/useAuthStore";
import "../../../styles/auth.css";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login, loading, error } = useAuthStore();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) return; 
    
    const success = await login(email, password);
    if (success) {
      router.refresh();
      router.push("/welcome");
    }
  };

  return (
    <div className="auth-container">
      <div className="glowing-orb orb-1"></div>
      <div className="glowing-orb orb-2"></div>
      <div className="glowing-orb orb-3"></div>
      <div className="glowing-orb orb-4"></div>

      <div className="liquid-glass-card w-full max-w-[400px] md:max-w-[420px] p-8 md:p-10 rounded-[40px] mx-4 flex flex-col items-center">
        
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="relative w-16 h-16 mb-4 drop-shadow-2xl hover:scale-110 transition-transform duration-500 ease-in-out">
            <Image src="/mdrscore-logo.png" alt="Logo" fill className="object-contain" priority />
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">Selamat Datang</h1>
          <p className="text-sm text-slate-600 font-bold mt-1">Masuk untuk melanjutkan</p>
        </div>

        <form onSubmit={handleLogin} className="w-full space-y-5">
          
          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 z-10 text-slate-500 group-focus-within:text-purple-600 transition-colors duration-300">
              <User className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <input
              type="text"
              placeholder="Email / Username"
              className="input-modern w-full pl-14 pr-4 py-4 rounded-2xl text-slate-800 text-sm md:text-base font-bold outline-none placeholder:text-slate-400 placeholder:font-medium"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 z-10 text-slate-500 group-focus-within:text-purple-600 transition-colors duration-300">
              <Lock className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <input
              type="password"
              placeholder="Password"
              className="input-modern w-full pl-14 pr-4 py-4 rounded-2xl text-slate-800 text-sm md:text-base font-bold outline-none placeholder:text-slate-400 placeholder:font-medium"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-red-50/90 border border-red-200 backdrop-blur-sm animate-pulse">
              <AlertTriangle size={18} className="text-red-600 shrink-0" />
              <p className="text-xs text-red-700 font-extrabold leading-tight">{error}</p>
            </div>
          )}

          <button disabled={loading} className="group w-full mt-2 py-4 rounded-2xl bg-slate-900 text-white font-bold text-base shadow-xl shadow-slate-900/20 hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {loading ? <Loader2 size={20} className="animate-spin text-white/90" /> : <><span>Masuk Sekarang</span><ArrowRight size={20} className="group-hover:translate-x-1 transition-transform text-purple-300" /></>}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/40 w-full text-center">
          <p className="text-xs text-slate-600 font-bold">
            Belum punya akun? <a href="/auth/register" className="text-purple-700 font-black hover:text-purple-900 hover:underline transition">Daftar</a>
          </p>
        </div>
      </div>
    </div>
  );
}