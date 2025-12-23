import { useAuthStore } from "../auth.store";

export function useAuth() {
  const {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    loginWithGoogle,
    logout,
    clearError,
  } = useAuthStore();

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    loginWithGoogle,
    logout,
    clearError,
  };
}
