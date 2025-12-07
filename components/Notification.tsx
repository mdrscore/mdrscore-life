"use client";

import { useEffect } from "react";
import { CheckCircle2, XCircle, AlertTriangle, X } from "lucide-react";

type NotificationType = "success" | "error" | "warning";

interface NotificationProps {
  type: NotificationType;
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export default function Notification({ type, message, isVisible, onClose }: NotificationProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const styles = {
    success: "bg-emerald-50 border-emerald-200 text-emerald-800",
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
  };

  const icons = {
    success: <CheckCircle2 className="w-6 h-6 text-emerald-500" />,
    error: <XCircle className="w-6 h-6 text-red-500" />,
    warning: <AlertTriangle className="w-6 h-6 text-amber-500" />,
  };

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm px-4">
      <div 
        className={`
          relative flex items-center gap-4 p-4 rounded-2xl shadow-xl border 
          backdrop-blur-md animate-in slide-in-from-top-5 fade-in duration-300
          ${styles[type]}
        `}
      >
        <div className="shrink-0">
          {icons[type]}
        </div>
        <div className="flex-1">
          <p className="font-bold text-sm leading-tight">{message}</p>
        </div>
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-black/5 transition-colors"
        >
          <X size={16} className="opacity-50" />
        </button>
      </div>
    </div>
  );
}