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
import { useEffect, useState } from "react";

export function LoginPageContainer() {
  const { isAuthenticated, loading } = useAuthStore();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && !loading) {
      //router.push("/home");
    }
  }, [isAuthenticated, loading, router]);

  // if (isAuthenticated && !loading) {
  //   return null;
  // }

  // Only render form after hydration to avoid hydration mismatch
  return (
    <Container size={420} my={80}>
      <Stack gap="lg">
        <Stack gap="xs" ta="center">
          <Title order={2}>Admin Login</Title>
          <Text size="sm" c="dimmed">
            Sign in to your admin account to continue
          </Text>
        </Stack>

        <Paper withBorder shadow="md" p={30} radius="md" pos="relative">
          {loading && <LoadingOverlay visible />}
          {isMounted && <LoginForm />}
        </Paper>
      </Stack>
    </Container>
  );
}
