"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { User, Mail, Lock, ArrowRight, Loader2, AlertTriangle, CheckCircle2, AtSign, MailCheck } from "lucide-react";
import { useAuthStore } from "../../../stores/useAuthStore";
import "../../../styles/auth.css";

export default function RegisterScreen() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [fieldError, setFieldError] = useState<"fullName" | "username" | "email" | "password" | "confirmPassword" | null>(null);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  
  const router = useRouter();
  const { register, loading, error: storeError } = useAuthStore();

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError("");
    setFieldError(null);

    if (!fullName.trim()) {
      setLocalError("Nama lengkap wajib diisi.");
      setFieldError("fullName");
      return;
    }
    if (!username.trim()) {
      setLocalError("Username wajib diisi.");
      setFieldError("username");
      return;
    }
    if (username.includes(" ")) {
      setLocalError("Username tidak boleh mengandung spasi.");
      setFieldError("username");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setLocalError("Format email tidak valid.");
      setFieldError("email");
      return;
    }
    if (!password || password.length < 6) {
      setLocalError("Password minimal 6 karakter.");
      setFieldError("password");
      return;
    }
    if (password !== confirmPassword) {
      setLocalError("Konfirmasi password tidak cocok.");
      setFieldError("confirmPassword");
      return;
    }

    const result = await register({
      full_name: fullName,
      username,
      email,
      password,
    });

    if (result.success) {
      if (result.requireVerify) {
        setShowVerifyModal(true);
      } else {
        router.push("/dashboard");
      }
    }
  };

  if (showVerifyModal) {
    return (
      <div className="auth-container">
         <div className="glowing-orb orb-1"></div>
         <div className="liquid-glass-card w-full max-w-md p-10 rounded-3xl mx-4 flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <MailCheck size={40} />
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">Cek Email Anda</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Kami telah mengirimkan link verifikasi ke <strong>{email}</strong>.<br/>
              Silakan klik link tersebut untuk mengaktifkan akun Anda.
            </p>
            <button 
              onClick={() => router.push('/auth/login')}
              className="px-8 py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-black transition-all"
            >
              Kembali ke Login
            </button>
         </div>
      </div>
    );
  }

  const displayError = localError || storeError;

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
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">Buat Akun</h1>
          <p className="text-sm text-slate-600 font-bold mt-1">Mulai perjalanan baru Anda</p>
        </div>

        <form onSubmit={handleRegister} className="w-full space-y-4">
          
          <div className="relative group">
            <div className={`absolute left-5 top-1/2 -translate-y-1/2 z-10 transition-colors duration-300 ${fieldError === 'fullName' ? 'text-red-500' : 'text-slate-500 group-focus-within:text-purple-600'}`}>
              <User className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <input
              type="text"
              placeholder="Nama Lengkap"
              className={`input-modern w-full pl-14 pr-4 py-3.5 rounded-2xl text-slate-800 text-sm font-bold outline-none placeholder:text-slate-400 placeholder:font-medium ${fieldError === 'fullName' ? 'input-error' : ''}`}
              value={fullName}
              onChange={e => { setFullName(e.target.value); if(fieldError === 'fullName') setFieldError(null); }}
            />
          </div>
          
          <div className="relative group">
            <div className={`absolute left-5 top-1/2 -translate-y-1/2 z-10 transition-colors duration-300 ${fieldError === 'username' ? 'text-red-500' : 'text-slate-500 group-focus-within:text-purple-600'}`}>
              <AtSign className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <input
              type="text"
              placeholder="Username"
              className={`input-modern w-full pl-14 pr-4 py-3.5 rounded-2xl text-slate-800 text-sm font-bold outline-none placeholder:text-slate-400 placeholder:font-medium ${fieldError === 'username' ? 'input-error' : ''}`}
              value={username}
              onChange={e => { setUsername(e.target.value); if(fieldError === 'username') setFieldError(null); }}
            />
          </div>

          <div className="relative group">
            <div className={`absolute left-5 top-1/2 -translate-y-1/2 z-10 transition-colors duration-300 ${fieldError === 'email' ? 'text-red-500' : 'text-slate-500 group-focus-within:text-purple-600'}`}>
              <Mail className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <input
              type="email"
              placeholder="Email"
              className={`input-modern w-full pl-14 pr-4 py-3.5 rounded-2xl text-slate-800 text-sm font-bold outline-none placeholder:text-slate-400 placeholder:font-medium ${fieldError === 'email' ? 'input-error' : ''}`}
              value={email}
              onChange={e => { setEmail(e.target.value); if(fieldError === 'email') setFieldError(null); }}
            />
          </div>

          <div className="relative group">
            <div className={`absolute left-5 top-1/2 -translate-y-1/2 z-10 transition-colors duration-300 ${fieldError === 'password' ? 'text-red-500' : 'text-slate-500 group-focus-within:text-purple-600'}`}>
              <Lock className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <input
              type="password"
              placeholder="Password"
              className={`input-modern w-full pl-14 pr-4 py-3.5 rounded-2xl text-slate-800 text-sm font-bold outline-none placeholder:text-slate-400 placeholder:font-medium ${fieldError === 'password' ? 'input-error' : ''}`}
              value={password}
              onChange={e => { setPassword(e.target.value); if(fieldError === 'password') setFieldError(null); }}
            />
          </div>

          <div className="relative group">
            <div className={`absolute left-5 top-1/2 -translate-y-1/2 z-10 transition-colors duration-300 ${fieldError === 'confirmPassword' ? 'text-red-500' : 'text-slate-500 group-focus-within:text-purple-600'}`}>
              <CheckCircle2 className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <input
              type="password"
              placeholder="Konfirmasi Password"
              className={`input-modern w-full pl-14 pr-4 py-3.5 rounded-2xl text-slate-800 text-sm font-bold outline-none placeholder:text-slate-400 placeholder:font-medium ${fieldError === 'confirmPassword' ? 'input-error' : ''}`}
              value={confirmPassword}
              onChange={e => { setConfirmPassword(e.target.value); if(fieldError === 'confirmPassword') setFieldError(null); }}
            />
          </div>

          {displayError && (
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-red-50/90 border border-red-200 backdrop-blur-sm animate-pulse">
              <AlertTriangle size={18} className="text-red-600 shrink-0" />
              <p className="text-xs text-red-700 font-extrabold leading-tight">{displayError}</p>
            </div>
          )}

          <button disabled={loading} className="group w-full mt-2 py-4 rounded-2xl bg-slate-900 text-white font-bold text-base shadow-xl shadow-slate-900/20 hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {loading ? <Loader2 size={20} className="animate-spin text-white/90" /> : <><span>Daftar Sekarang</span><ArrowRight size={20} className="group-hover:translate-x-1 transition-transform text-purple-300" /></>}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/40 w-full text-center">
          <p className="text-xs text-slate-600 font-bold">
            Sudah punya akun? <a href="/auth/login" className="text-purple-700 font-black hover:text-purple-900 hover:underline transition">Masuk</a>
          </p>
        </div>
      </div>
    </div>
  );
}