"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { User, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useAuthStore } from "../../../stores/useAuthStore";
import Notification from "../../../components/Notification";
import "../../../styles/auth.css";

export default function LoginScreen() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState<{ type: "success" | "error" | "warning"; message: string; show: boolean }>({
    type: "success",
    message: "",
    show: false
  });
  
  const router = useRouter();
  const { login, loading } = useAuthStore();

  const showNotification = (type: "success" | "error" | "warning", message: string) => {
    setNotification({ type, message, show: true });
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setNotification(prev => ({ ...prev, show: false }));

    if (!identifier) {
      showNotification("warning", "Silakan masukkan Email atau Username.");
      return;
    }
    if (!password) {
      showNotification("warning", "Silakan masukkan Password.");
      return;
    }
    
    const success = await login(identifier, password);
    
    if (success) {
      showNotification("success", "Login berhasil! Mengalihkan...");
      setTimeout(() => {
        router.refresh();
        router.push("/dashboard"); 
      }, 900);
    } else {
      const errorMsg = useAuthStore.getState().error;
      showNotification("error", errorMsg || "Login gagal. Periksa kembali data Anda.");
    }
  };

  return (
    <>
      <Notification 
        isVisible={notification.show}
        type={notification.type}
        message={notification.message}
        onClose={() => setNotification(prev => ({ ...prev, show: false }))}
      />

      <div className="auth-container">
        <div className="glowing-orb orb-1"></div>
        <div className="glowing-orb orb-2"></div>
        <div className="glowing-orb orb-3"></div>
        <div className="glowing-orb orb-4"></div>
        <div className="glowing-orb orb-5"></div>
        <div className="glowing-orb orb-6"></div>
        <div className="glowing-orb orb-7"></div>
        <div className="glowing-orb orb-8"></div>
        <div className="glowing-orb orb-9"></div>

        <div className="liquid-glass-card w-full max-w-[400px] p-8 rounded-[40px] mx-4 flex flex-col items-center">
          
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="relative w-16 h-16 mb-4 drop-shadow-2xl">
              <Image src="/mdrscore-logo.png" alt="Logo" fill className="object-contain" priority />
            </div>
            <h1 className="text-2xl font-black text-slate-800">Selamat Datang</h1>
          </div>

          <form onSubmit={handleLogin} className="w-full space-y-5" aria-label="form-login">
            <div className="relative group">
              <div className="input-icon" aria-hidden>
                <User className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <input
                type="text"
                placeholder="Email atau Username"
                className="input-modern w-full pl-14 pr-4 py-4 rounded-2xl outline-none"
                value={identifier}
                onChange={e => setIdentifier(e.target.value)}
                disabled={loading}
                autoComplete="username"
                aria-label="email-or-username"
                autoFocus
              />
            </div>

            <div className="relative group">
              <div className="input-icon" aria-hidden>
                <Lock className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <input
                type="password"
                placeholder="Password"
                className="input-modern w-full pl-14 pr-4 py-4 rounded-2xl outline-none"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={loading}
                autoComplete="current-password"
                aria-label="password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold flex justify-center gap-2 hover:scale-[1.02] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin" /> : <>Masuk <ArrowRight /></>}
            </button>
          </form>

          <p className="mt-8 text-xs text-slate-500 font-bold">
            Belum punya akun? <a href="/auth/register" className="text-indigo-600 hover:underline">Daftar</a>
          </p>
        </div>
      </div>
    </>
  );
}
