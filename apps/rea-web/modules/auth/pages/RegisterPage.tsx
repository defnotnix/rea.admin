"use client";

import { Container, Paper, Title, Text, Stack, LoadingOverlay } from "@mantine/core";
import { RegisterForm } from "../forms/RegisterForm";
import { useAuthStore } from "../auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function RegisterPageContainer() {
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
    <Container size={500} my={40}>
      <Stack gap="lg">
        <Stack gap="xs" ta="center">
          <Title order={2}>Join Nepal Ekikaran Abhiyan</Title>
          <Text size="sm" c="dimmed">
            Create your account to participate in shaping Nepal's future
          </Text>
        </Stack>

        <Paper withBorder shadow="md" p={30} radius="md" pos="relative">
          {loading && <LoadingOverlay visible />}
          <RegisterForm />
        </Paper>
      </Stack>
    </Container>
  );
}
