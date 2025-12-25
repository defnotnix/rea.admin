import { LoginPageContainer } from "./pages/LoginPage";
import { LoginForm } from "./forms/LoginForm";
import { useAuthStore, useUser, useIsAuthenticated, useAuthLoading, useAuthError } from "./auth.store";
import { loginUser, logoutUser, verifyToken } from "./auth.api";
import type { User, AuthState } from "./auth.store";
import type { LoginFormData } from "./forms/schemas";

export const ModuleAuth = {
  LoginPageContainer,
  LoginForm,
  useAuthStore,
  useUser,
  useIsAuthenticated,
  useAuthLoading,
  useAuthError,
  loginUser,
  logoutUser,
  verifyToken,
};

export { LoginPageContainer, LoginForm };
export { useAuthStore, useUser, useIsAuthenticated, useAuthLoading, useAuthError };
export { loginUser, logoutUser, verifyToken };
export type { User, AuthState };
export type { LoginFormData };
