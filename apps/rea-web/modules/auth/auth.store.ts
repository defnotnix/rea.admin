import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import {
  registerUser,
  loginUser,
  loginWithGoogle as apiLoginWithGoogle,
  logoutUser,
  type RegisterPayload,
} from "./auth.api";

export interface User {
  userId: string;
  full_name: string;
  email: string;
  phone_number: string;
  profession?: string;
  district_id: string;
  is_moderator: boolean;
  is_verified: boolean;
  is_active: boolean;
}

export interface AuthState {
  // State
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;

  // Actions
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterPayload) => Promise<void>;
  loginWithGoogle: (credential: string) => Promise<void>;
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
        token: null,
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

        // Set token
        setToken: (token) =>
          set({
            token,
            error: null,
          }),

        // Set loading
        setLoading: (loading) => set({ loading }),

        // Set error
        setError: (error) => set({ error }),

        // Clear error
        clearError: () => set({ error: null }),

        // Register
        register: async (data) => {
          set({ loading: true, error: null });
          try {
            const response = await registerUser(data);
            set({
              user: response.user,
              token: response.token,
              isAuthenticated: true,
              loading: false,
              error: null,
            });
          } catch (error) {
            set({
              error:
                error instanceof Error
                  ? error.message
                  : "Registration failed",
              loading: false,
            });
            throw error;
          }
        },

        // Login
        login: async (email, password) => {
          set({ loading: true, error: null });
          try {
            const response = await loginUser(email, password);
            set({
              user: response.user,
              token: response.token,
              isAuthenticated: true,
              loading: false,
              error: null,
            });
          } catch (error) {
            set({
              error:
                error instanceof Error ? error.message : "Login failed",
              loading: false,
            });
            throw error;
          }
        },

        // Google Sign-In
        loginWithGoogle: async (credential) => {
          set({ loading: true, error: null });
          try {
            const response = await apiLoginWithGoogle(credential);
            set({
              user: response.user,
              token: response.token,
              isAuthenticated: true,
              loading: false,
              error: null,
            });
          } catch (error) {
            set({
              error:
                error instanceof Error
                  ? error.message
                  : "Google sign-in failed",
              loading: false,
            });
            throw error;
          }
        },

        // Logout
        logout: () => {
          const token = get().token;
          if (token) {
            logoutUser(token); // Fire and forget
          }
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            loading: false,
            error: null,
          });
        },

        // Reset
        reset: () =>
          set({
            user: null,
            token: null,
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
