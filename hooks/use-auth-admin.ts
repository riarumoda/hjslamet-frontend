import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ToastContainer";

/**
 * Cek apakah token sudah expired berdasarkan timestamp expiration
 */
const isTokenExpired = (expiration: number | null | undefined): boolean => {
  if (!expiration) return true;
  return Date.now() >= expiration;
};

/**
 * Hook proteksi admin route berdasarkan token yang disimpan di localStorage.
 * Membaca dari key 'token' dan 'user' di localStorage.
 * Jika token tidak valid atau expired, akan redirect ke halaman login.
 */
export const useAuthAdmin = () => {
  const router = useRouter();
  const toastShownRef = useRef(false);

  useEffect(() => {
    const tokenStr = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (!tokenStr || !userStr) {
      if (!toastShownRef.current) {
        toast({
          message: "Your session has expired. Please log in again.",
          type: "error",
          duration: 3000,
        });
        toastShownRef.current = true;
      }
      router.replace("/admin/auth");
      return;
    }

    let tokenData: {
      token?: string;
      refreshToken?: string;
      tokenExpiration?: number;
    };

    try {
      tokenData = JSON.parse(tokenStr);
    } catch {
      if (!toastShownRef.current) {
        toast({
          message: "Your session has expired. Please log in again.",
          type: "error",
          duration: 3000,
        });
        toastShownRef.current = true;
      }
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.replace("/admin/auth");
      return;
    }

    const { token, tokenExpiration } = tokenData;

    if (!token || isTokenExpired(tokenExpiration)) {
      if (!toastShownRef.current) {
        toast({
          message: "Your session has expired. Please log in again.",
          type: "error",
          duration: 3000,
        });
        toastShownRef.current = true;
      }
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.replace("/admin/auth");
      return;
    }
  }, [router]);
};