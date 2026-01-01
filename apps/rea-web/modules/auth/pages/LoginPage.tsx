"use client";

import {
  Container,
  Paper,
  Title,
  Text,
  Stack,
  LoadingOverlay,
} from "@mantine/core";
import { LoginForm } from "../forms/LoginForm";
import { useAuthStore } from "../auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function LoginPageContainer() {
  const { isAuthenticated, loading } = useAuthStore();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && !loading) {
      router.push("/app");
    }
  }, [isAuthenticated, loading, router]);

  if (isAuthenticated && !loading) {
    return null;
  }

  return (
    <Container size={420} my={80}>
      <Stack gap="lg">
        <Stack gap="xs" ta="center">
          <Title order={2}>Welcome Back</Title>
          <Text size="sm" c="dimmed">
            Sign in to continue participating in Nepal's democratic discussions
          </Text>
        </Stack>

        <Paper withBorder shadow="md" p={30} radius="md" pos="relative">
          {loading && <LoadingOverlay visible />}
          <LoginForm />
        </Paper>
      </Stack>
    </Container>
  );
}
