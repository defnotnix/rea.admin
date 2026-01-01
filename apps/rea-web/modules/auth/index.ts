// Store
export {
  useAuthStore,
  useUser,
  useIsAuthenticated,
  useAuthLoading,
  useAuthError,
} from "./auth.store";
export type { User, AuthState } from "./auth.store";

// API
export * from "./auth.api";

// Hooks
export { useAuth } from "./hooks/useAuth";
export { useRequireAuth } from "./hooks/useRequireAuth";

// Components
export { ProtectedRoute } from "./components/ProtectedRoute";
export { GoogleSignInButton } from "./components/GoogleSignInButton";

// Provider
export { AuthProvider, useAuthContext } from "./AuthProvider";

// Forms
export { LoginForm } from "./forms/LoginForm";
export { RegisterForm } from "./forms/RegisterForm";
export type { LoginFormData, RegisterFormData } from "./forms/schemas";
