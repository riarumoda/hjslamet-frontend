"use client"

import { fetchData } from "@/lib/api"
import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  loginAdmin: (email: string, password: string) => Promise<{ success: boolean; message: string }> 
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  loginAdmin: async () => ({ success: false, message: "Not implemented" }),
  register: async () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error)
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  // Mock login function
  const login = async (email: string, password: string) => {
    // In a real app, this would make an API call to your Java backend
    return new Promise<void>((resolve, reject) => {
      setTimeout(async () => {
        // Simulate successful login
        if (email && password) {
          try {
            var response = await fetchData("auth/login/admin", "POST", { 
              "email": email, "password": password 
            });
            const token = response.token;
            
            var responseUser = await fetchData("user/me-admin", "GET", null, token);
            const newUser = {
              id: responseUser.id,
              name: responseUser.name,
              email: responseUser.email,
            }
            setUser(newUser)
            localStorage.setItem("user", JSON.stringify(newUser));
            localStorage.setItem("token", JSON.stringify(response));
          } catch (error) {
            console.error("Error fetching user data:", error)
            reject(new Error("Failed to fetch user data"))
            return
          }
          resolve()
        } else {
          reject(new Error("Invalid credentials"))
        }
      }, 1000)
    })
  }

  // Mock register function
  const register = async (name: string, email: string, password: string) => {
    // In a real app, this would make an API call to your Java backend
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Simulate successful registration
        if (name && email && password) {
          const newUser = {
            id: "user-" + Date.now(),
            name,
            email,
          }
          setUser(newUser)
          localStorage.setItem("user", JSON.stringify(newUser))
          resolve()
        } else {
          reject(new Error("Invalid registration data"))
        }
      }, 1000)
    })
  }

  /**
   * Melakukan proses login admin dengan mengirimkan email dan password ke backend.
   * Jika berhasil, token akan disimpan ke localStorage dalam bentuk objek `admin`.
   *
   * @param email - Alamat email admin
   * @param password - Kata sandi admin
   * @returns Promise<boolean> - Mengembalikan true jika login berhasil, atau throw error jika gagal
   * @throws Error - Jika terjadi kesalahan selama proses login (misalnya kredensial salah atau error server)
   */
  const loginAdmin = async (email: string, password: string): Promise<{ success: boolean; message: string }>  => {
    // Validasi input
    if (!email || !password) {
      return { success: false, message: "Email and password must not be empty." };
    }

    try {
      // Mengirim request login ke backend
      const response = await fetchData("auth/login/admin", "POST", { email, password });

      if (!response.token) {
        return { success: false, message: "Please check your email and password." };
      }

      const token = response.token;

      // Mengambil data user setelah login berhasil
      const responseUser = await fetchData("user/me-admin", "GET", null, token);

      const newUser = {
        id: responseUser.id,
        name: responseUser.name,
        email: responseUser.email,
      };

      // Simpan user ke state dan localStorage
      setUser(newUser); // Pastikan setUser berasal dari context/state management
      localStorage.setItem("user", JSON.stringify(newUser));

      // Simpan token dan informasi kadaluarsa ke localStorage
      const tokenWithMeta = {
        token: response.token,
        refreshToken: response.refreshToken,
        tokenExpiration: Date.now() + 3600000, // token berlaku selama 1 jam
      };

      localStorage.setItem("token", JSON.stringify(tokenWithMeta));

      return { success: true, message: "Login successful." };
    } catch (error) {
      return { success: false, message: "Please check your email and password." };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        loginAdmin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
