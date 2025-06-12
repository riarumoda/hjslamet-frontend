"use client";

import { fetchData } from "@/lib/api";
import { Member, RegisterRequest, Token } from "@/types";
import { useParams, useRouter } from "next/navigation";
import type React from "react";

import { toast } from "sonner";

import { createContext, useContext, useEffect, useRef, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  member: Member | null; // Assuming Member is a type that extends User
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginAdmin: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateProfile: (data: Partial<Member>) => Promise<void>;
  changePassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<void>;
  deleteAccount: () => Promise<void>;
  getAccessToken: () => string | undefined;
  getRefreshToken: () => string | undefined;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  member: null, // Assuming Member is a type that extends User
  isLoading: true,
  login: async () => { },
  loginAdmin: async () => ({ success: false, message: "Not implemented" }),
  register: async () => ({ success: false, message: "Not implemented" }),
  logout: () => { },
  updateProfile: async () => { },
  changePassword: async () => { },
  deleteAccount: async () => { },
  getAccessToken: () => undefined,
  getRefreshToken: () => undefined,
});

const isTokenExpired = (expiration: number): boolean => {
  return Date.now() >= expiration;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [member, setMember] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const param = useParams();

  const router = useRouter();
  useEffect(() => {
    const checkAuth = async () => {
      const tokenStr = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");
      const memberStr = localStorage.getItem("member");

      // Jika belum pernah login, jangan redirect atau tampilkan error
      if (!tokenStr || !userStr || !memberStr) {
        setIsLoading(false);
        return;
      }

      if (member && member.isBanned) {
        toast.error("Your account has been banned. Please contact support.", {
          richColors: true,
        });
        setUser(null);
        setMember(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("member");
        router.replace("/account/banned");
        setIsLoading(false);
        return;
      }

      let tokenData: Token;

      try {
        tokenData = JSON.parse(tokenStr);
      } catch {
        toast.error("Your session has expired. Please log in again.", {
          richColors: true,
        });
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("member");
        router.replace("/auth/login");
        setIsLoading(false);
        return;
      }

      const { token, refreshToken, tokenExpiration } = tokenData;

      if (!token || isTokenExpired(tokenExpiration)) {
        try {
          const response = await fetchData("auth/refresh", false, "POST", {
            refreshToken: refreshToken,
          });
          if (response) {
            const newToken: Token = {
              token: response.token,
              refreshToken: response.refreshToken,
              tokenExpiration: response.expiration,
            };
            localStorage.setItem("token", JSON.stringify(newToken));
            const responseUser = await fetchData("user/me", true, "GET", null);
            const newUser: User = {
              id: responseUser.id,
              name: responseUser.name,
              email: responseUser.email,
            };
            const newMember: Member = {
              name: responseUser.name,
              email: responseUser.email,
              pnumber: responseUser.phone || "",
              address: responseUser.address || "",
              isBanned: responseUser.isBanned || false,
            };
            setMember(newMember);
            setUser(newUser);
            if (member && member.isBanned) {
              toast.error(
                "Your account has been banned. Please contact support.",
                {
                  richColors: true,
                }
              );
              setUser(null);
              setMember(null);
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              localStorage.removeItem("member");
              router.replace("/account/banned");
              setIsLoading(false);
              return;
            }
            localStorage.setItem("user", JSON.stringify(newUser));
            localStorage.setItem("member", JSON.stringify(newMember));
            param.returnUrl && router.replace(param.returnUrl.toString());
          }
        } catch (e) {
          toast.error("Your session has expired. Please log in again.", {
            richColors: true,
          });
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("member");
          router.replace("/auth/login");
          setIsLoading(false);
          return;
        }
        setIsLoading(false);
        return;
      } else {
        setUser(JSON.parse(userStr));
        setMember(JSON.parse(memberStr));
        if (member && member.isBanned) {
          toast.error("Your account has been banned. Please contact support.", {
            richColors: true,
          });
          setUser(null);
          setMember(null);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          localStorage.removeItem("member");
          router.replace("/account/banned");
          setIsLoading(false);
          return;
        }
      }

      setIsLoading(false);
    };
    checkAuth();
  }, [router, param.returnUrl]);

  // Mock login function
  const login = async (email: string, password: string) => {
    // In a real app, this would make an API call to your Java backend
    return new Promise<void>(async (resolve, reject) => {
      // Simulate successful login
      if (email && password) {
        try {
          var response = await fetchData("auth/login/member", false, "POST", {
            email: email,
            password: password,
          });
          const newToken: Token = {
            token: response.token,
            refreshToken: response.refreshToken,
            tokenExpiration: response.expiration,
          };
          localStorage.setItem("token", JSON.stringify(newToken));

          var responseUser = await fetchData("user/me", true, "GET", null);
          const newUser = {
            id: responseUser.id,
            name: responseUser.name,
            email: responseUser.email,
          };
          setUser(newUser);
          const newMember: Member = {
            name: responseUser.name,
            email: responseUser.email,
            pnumber: responseUser.phone || "",
            address: responseUser.address || "",
            isBanned: responseUser.isBanned || false,
          };
          setMember(newMember);
          localStorage.setItem("user", JSON.stringify(newUser));
          localStorage.setItem("member", JSON.stringify(newMember));
        } catch (error) {
          console.error("Error fetching user data:", error);
          reject(new Error("Failed to fetch user data"));
          return;
        }
        resolve();
      } else {
        reject(new Error("Invalid credentials"));
      }
    });
  };

  // Mock register function
  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; message: string }> => {
    // In a real app, this would make an API call to your Java backend
    return new Promise<{ success: boolean; message: string }>(
      async (resolve, reject) => {
        // Simulate successful registration
        if (name && email && password) {
          const newUser: RegisterRequest = {
            name: name,
            email: email,
            password: password,
          };
          const response = await fetchData(
            "auth/register/member",
            false,
            "POST",
            newUser
          );
          if (!response) {
            reject({
              success: false,
              message: "Registration Failed." + response,
            });
            return;
          }
          return resolve({
            success: true,
            message: "Registration successful. Please log in.",
          });
        } else {
          reject(new Error("Invalid registration data"));
        }
      }
    );
  };

  /**
   * Melakukan proses login admin dengan mengirimkan email dan password ke backend.
   * Jika berhasil, token akan disimpan ke localStorage dalam bentuk objek `admin`.
   *
   * @param email - Alamat email admin
   * @param password - Kata sandi admin
   * @returns Promise<boolean> - Mengembalikan true jika login berhasil, atau throw error jika gagal
   * @throws Error - Jika terjadi kesalahan selama proses login (misalnya kredensial salah atau error server)
   */
  const loginAdmin = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; message: string }> => {
    // Validasi input
    if (!email || !password) {
      return {
        success: false,
        message: "Email and password must not be empty.",
      };
    }

    try {
      // Mengirim request login ke backend
      const response = await fetchData("auth/login/admin", false, "POST", {
        email,
        password,
      });

      if (!response.token) {
        return {
          success: false,
          message: "Please check your email and password.",
        };
      }

      // Mengambil data user setelah login berhasil
      const responseUser = await fetchData("user/me-admin", true, "GET", null);

      const newUser = {
        id: responseUser.id,
        name: responseUser.name,
        email: responseUser.email,
      };

      // Simpan user ke state dan localStorage
      setUser(newUser); // Pastikan setUser berasal dari context/state management
      localStorage.setItem("user", JSON.stringify(newUser));

      // Simpan token dan informasi kadaluarsa ke localStorage
      const tokenWithMeta: Token = {
        token: response.token,
        refreshToken: response.refreshToken,
        tokenExpiration: response.expiration, // token berlaku selama 1 jam
      };

      localStorage.setItem("token", JSON.stringify(tokenWithMeta));

      return { success: true, message: "Login successful." };
    } catch (error) {
      return {
        success: false,
        message: "Please check your email and password.",
      };
    }
  };

  // Logout function
  const logout = async () => {
    const res = await fetchData("auth/logout", false, "POST", {
      token: getRefreshToken(),
    });
    if (!res.success) {
      console.error("Logout failed:", res.message);
      return;
    }
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Update profile function
  const updateProfile = async (data: Partial<Member>) => {
    // In a real app, this would make an API call to your Java backend
    return new Promise<void>(async (resolve, reject) => {
      // Simulate successful login
      try {
        const newUser2 = {
          name: data.name,
          email: data.email,
          phoneNumber: data.pnumber,
        };

        var response = await fetchData("user/update-profile", "PUT", newUser2, getAccessToken());

        var responseUser = await fetchData("user/me", "GET", null, getAccessToken());
        const newUser = {
          id: responseUser.id,
          name: responseUser.name,
          email: responseUser.email,
        };
        setUser(newUser);
        const newMember: Member = {
          name: responseUser.name,
          email: responseUser.email,
          pnumber: responseUser.phoneNumber || "",
          address: responseUser.address || "",
          isBanned: responseUser.isBanned || false,
        };
        setMember(newMember);
        localStorage.setItem("user", JSON.stringify(newUser));
        localStorage.setItem("member", JSON.stringify(newMember));
      } catch (error) {
        console.error("Error fetching user data:", error);
        reject(new Error("Failed to fetch user data"));
        return;
      }
      resolve();
    });
  };

  // Change password function
  const changePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    // In a real app, this would make an API call to your Java backend
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Simulate password change validation
        if (currentPassword && newPassword) {
          // In a real app, you would validate the current password
          
          resolve();
        } else {
          reject(new Error("Invalid password data"));
        }
      }, 1000);
    });
  };

  // Delete account function
  const deleteAccount = async () => {
    // In a real app, this would make an API call to your Java backend
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (user) {
          setUser(null);
          localStorage.removeItem("user");
          localStorage.removeItem("cart"); // Also clear cart data
          resolve();
        } else {
          reject(new Error("No user logged in"));
        }
      }, 1500);
    });
  };

  const getRefreshToken = () => {
    const tokenString = localStorage.getItem("token");
    let refreshToken: string | undefined = undefined;
    if (tokenString) {
      try {
        const parsedToken: Token = JSON.parse(tokenString);
        refreshToken = parsedToken.refreshToken;
      } catch (error) {
        console.error("Failed to parse token from localStorage:", error);
      }
    }
    return refreshToken;
  };

  const getAccessToken = () => {
    const tokenString = localStorage.getItem("token");
    let accessToken: string | undefined = undefined;
    if (tokenString) {
      try {
        const parsedToken: Token = JSON.parse(tokenString);
        accessToken = parsedToken.token;
      } catch (error) {
        console.error("Failed to parse token from localStorage:", error);
      }
    }
    return accessToken;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        member, // Assuming Member extends User
        isLoading,
        login,
        register,
        loginAdmin,
        logout,
        updateProfile,
        changePassword,
        deleteAccount,
        getAccessToken,
        getRefreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
