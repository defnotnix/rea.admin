"use client";

import { createContext, useContext, useEffect } from "react";
import { useAuthStore } from "./auth.store";
import { verifyToken } from "./auth.api";

interface AuthContextType {
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { token, setUser, logout, setLoading } = useAuthStore();

  // Verify token on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        setLoading(true);
        try {
          const user = await verifyToken(token);
          setUser(user);
        } catch (error) {
          console.error("Token verification failed:", error);
          logout();
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [token, setUser, logout, setLoading]);

  return (
    <AuthContext.Provider value={{ checkAuth: async () => {} }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
}
