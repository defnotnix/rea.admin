import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { loginUser, logoutUser, type LoginResponse } from "./auth.api";

export interface User {
  userId: string;
  email: string;
  full_name: string;
  phone_number?: string;
  is_active: boolean;
  is_verified: boolean;
}

export interface AuthState {
  // State
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;

  // Actions
  setUser: (user: User) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        loading: false,
        error: null,

        // Set user
        setUser: (user) =>
          set({
            user,
            isAuthenticated: true,
            error: null,
          }),

        // Set tokens
        setTokens: (accessToken, refreshToken) =>
          set({
            accessToken,
            refreshToken,
            error: null,
          }),

        // Set loading
        setLoading: (loading) => set({ loading }),

        // Set error
        setError: (error) => set({ error }),

        // Clear error
        clearError: () => set({ error: null }),

        // Login
        login: async (email, password) => {
          set({ loading: true, error: null });
          try {
            const response: LoginResponse = await loginUser(email, password);
            // Store tokens in sessionStorage for apiDispatch
            if (typeof window !== "undefined") {
              sessionStorage.setItem("kcatoken", response.access);
              sessionStorage.setItem("kcrtoken", response.refresh);
            }
            set({
              user: response.user,
              accessToken: response.access,
              refreshToken: response.refresh,
              isAuthenticated: true,
              loading: false,
              error: null,
            });
          } catch (error) {
            set({
              error:
                error instanceof Error
                  ? error.message
                  : "Login failed",
              loading: false,
            });
            throw error;
          }
        },

        // Logout
        logout: () => {
          const accessToken = get().accessToken;
          if (accessToken) {
            logoutUser(accessToken); // Fire and forget
          }
          // Clear tokens from sessionStorage
          if (typeof window !== "undefined") {
            sessionStorage.removeItem("kcatoken");
            sessionStorage.removeItem("kcrtoken");
          }
          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            loading: false,
            error: null,
          });
        },

        // Reset
        reset: () =>
          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            loading: false,
            error: null,
          }),
      }),
      {
        name: "auth-store", // localStorage key
      }
    ),
    { name: "AuthStore" }
  )
);

// Selectors
export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);
export const useAuthLoading = () => useAuthStore((state) => state.loading);
export const useAuthError = () => useAuthStore((state) => state.error);
export const useAccessToken = () => useAuthStore((state) => state.accessToken);
export const useRefreshToken = () => useAuthStore((state) => state.refreshToken);
