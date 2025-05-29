"use client"
import { useState, useEffect } from "react";

export type ToastType = "success" | "error" | "info" | "warning";

type ToastData = {
  id: number;
  message: string;
  duration?: number;
  type?: ToastType;
};

let toastHandler: ((toast: ToastData) => void) | null = null;

export function toast({
  message,
  type = "info",
  duration = 3000,
}: {
  message: string;
  type?: ToastType;
  duration?: number;
}) {
  toastHandler?.({
    id: Date.now(),
    message,
    duration,
    type,
  });
}

const typeClassMap: Record<ToastType, string> = {
  success: "bg-green-600",
  error: "bg-red-600",
  info: "bg-blue-600",
  warning: "bg-yellow-600 text-black",
};

const ToastContainer = () => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    toastHandler = (toast) => {
      setToasts((prev) => [...prev, toast]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, toast.duration || 3000);
    };

    return () => {
      toastHandler = null;
    };
  }, []);

  return (
    <div className="fixed top-8 right-8 z-50 space-y-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`text-white px-5 py-3 rounded-lg shadow-lg animate-fade-in ${typeClassMap[t.type || "info"]}`}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
