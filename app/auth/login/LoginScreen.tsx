"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { User, Lock, ArrowRight, Loader2, AlertTriangle } from "lucide-react";
import { useAuthStore } from "../../../stores/useAuthStore";
import "../../../styles/auth.css";

export default function LoginScreen() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login, loading, error } = useAuthStore();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) return; 
    
    const success = await login(identifier, password);
    if (success) {
      router.refresh();
      router.push("/dashboard");
    }
  };

  return (
    <div className="auth-container">
      <div className="glowing-orb orb-1"></div>
      <div className="glowing-orb orb-2"></div>
      <div className="liquid-glass-card w-full max-w-[400px] p-8 rounded-[40px] mx-4 flex flex-col items-center">
        
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="relative w-16 h-16 mb-4 drop-shadow-2xl">
            <Image src="/mdrscore-logo.png" alt="Logo" fill className="object-contain" priority />
          </div>
          <h1 className="text-2xl font-black text-slate-800">Selamat Datang</h1>
        </div>

        <form onSubmit={handleLogin} className="w-full space-y-5">
          <div className="relative group">
            <User className="absolute left-5 top-1/2 -translate-y-1/2 z-10 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Email atau Username"
              className="input-modern w-full pl-14 pr-4 py-4 rounded-2xl outline-none"
              value={identifier}
              onChange={e => setIdentifier(e.target.value)}
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 z-10 text-slate-400 w-5 h-5" />
            <input
              type="password"
              placeholder="Password"
              className="input-modern w-full pl-14 pr-4 py-4 rounded-2xl outline-none"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 text-red-600 text-xs font-bold border border-red-100">
              <AlertTriangle size={16} /> {error}
            </div>
          )}

          <button disabled={loading} className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold flex justify-center gap-2 hover:scale-[1.02] transition-all">
            {loading ? <Loader2 className="animate-spin" /> : <>Masuk <ArrowRight /></>}
          </button>
        </form>

        <p className="mt-8 text-xs text-slate-500 font-bold">
          Belum punya akun? <a href="/auth/register" className="text-indigo-600 hover:underline">Daftar</a>
        </p>
      </div>
    </div>
  );
}