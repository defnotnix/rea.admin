"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../auth.store";
import { LoadingOverlay, Container } from "@mantine/core";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  requireModerator?: boolean;
}

export function ProtectedRoute({
  children,
  redirectTo = "/login",
  requireModerator = false,
}: ProtectedRouteProps) {
  const { isAuthenticated, user, loading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push(redirectTo);
      } else if (requireModerator && !user?.is_moderator) {
        router.push("/app");
      }
    }
  }, [isAuthenticated, user, loading, redirectTo, requireModerator, router]);

  if (loading) {
    return (
      <Container h="100vh" pos="relative">
        <LoadingOverlay visible />
      </Container>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (requireModerator && !user?.is_moderator) {
    return null;
  }

  return <>{children}</>;
}
