"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { User, Mail, Lock, ArrowRight, Loader2, CheckCircle2, AtSign } from "lucide-react";
import { useAuthStore } from "../../../stores/useAuthStore";
import Notification from "../../../components/Notification";
import "../../../styles/auth.css";

export default function RegisterScreen() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notification, setNotification] = useState<{ type: "success" | "error" | "warning"; message: string; show: boolean }>({
    type: "success",
    message: "",
    show: false
  });

  const router = useRouter();
  const { register, loading } = useAuthStore();

  const showNotification = (type: "success" | "error" | "warning", message: string) => {
    setNotification({ type, message, show: true });
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setNotification(prev => ({ ...prev, show: false }));

    if (!fullName || !username || !email || !password) {
      showNotification("warning", "Semua kolom wajib diisi.");
      return;
    }
    if (username.includes(" ")) {
      showNotification("warning", "Username tidak boleh mengandung spasi.");
      return;
    }
    if (!email.includes("@")) {
      showNotification("warning", "Format email tidak valid.");
      return;
    }
    if (password.length < 6) {
      showNotification("warning", "Password minimal 6 karakter.");
      return;
    }
    if (password !== confirmPassword) {
      showNotification("error", "Konfirmasi password tidak cocok.");
      return;
    }

    const result = await register({
      full_name: fullName,
      username,
      email,
      password,
    });

    if (result.success) {
      showNotification("success", "Registrasi berhasil! Mengalihkan...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1200);
    } else {
      const errorMsg = useAuthStore.getState().error;
      showNotification("error", errorMsg || "Terjadi kesalahan saat mendaftar.");
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
          
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="relative w-16 h-16 mb-4 drop-shadow-2xl">
              <Image src="/mdrscore-logo.png" alt="Logo" fill className="object-contain" />
            </div>
            <h1 className="text-2xl font-black text-slate-800">Buat Akun</h1>
          </div>

          <form onSubmit={handleRegister} className="w-full space-y-4">
            <div className="relative group">
              <div className="input-icon">
                <User className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <input type="text" placeholder="Nama Lengkap" className="input-modern w-full pl-14 pr-4 py-3 rounded-2xl outline-none"
                value={fullName} onChange={e => setFullName(e.target.value)} />
            </div>
            
            <div className="relative group">
              <div className="input-icon">
                <AtSign className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <input type="text" placeholder="Username" className="input-modern w-full pl-14 pr-4 py-3 rounded-2xl outline-none"
                value={username} onChange={e => setUsername(e.target.value)} />
            </div>

            <div className="relative group">
              <div className="input-icon">
                <Mail className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <input type="email" placeholder="Email" className="input-modern w-full pl-14 pr-4 py-3 rounded-2xl outline-none"
                value={email} onChange={e => setEmail(e.target.value)} />
            </div>

            <div className="relative group">
              <div className="input-icon">
                <Lock className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <input type="password" placeholder="Password" className="input-modern w-full pl-14 pr-4 py-3 rounded-2xl outline-none"
                value={password} onChange={e => setPassword(e.target.value)} />
            </div>

            <div className="relative group">
              <div className="input-icon">
                <CheckCircle2 className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <input type="password" placeholder="Konfirmasi Password" className="input-modern w-full pl-14 pr-4 py-3 rounded-2xl outline-none"
                value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            </div>

            <button disabled={loading} className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold flex justify-center gap-2 hover:scale-[1.02] transition-all">
              {loading ? <Loader2 className="animate-spin" /> : <>Daftar <ArrowRight /></>}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/40 w-full text-center">
            <p className="text-xs text-slate-600 font-bold">
              Sudah punya akun? <a href="/auth/login" className="text-indigo-600 hover:underline">Masuk</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
