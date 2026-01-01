"use client";

import { useForm, zodResolver } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Text,
  Alert,
  Anchor,
  Checkbox,
  Group,
} from "@mantine/core";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginSchema, type LoginFormData } from "./schemas";
import { useAuthStore } from "../auth.store";
import { WarningCircle } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function LoginForm() {
  const [rememberMe, setRememberMe] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<LoginFormData>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(loginSchema),
  });

  const { login, error, clearError } = useAuthStore();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: ({ email, password }: LoginFormData) =>
      login(email, password),
    onSuccess: () => {
      router.push("/home");
    },
    onError: (error) => {
      setSubmitError(
        error instanceof Error ? error.message : "Login failed"
      );
    },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    setSubmitError(null);
    clearError();
    try {
      await mutation.mutateAsync(values);
    } catch (err) {
      console.error("Login error:", err);
    }
  });

  const displayError = submitError || error;

  return (
    <Stack gap="lg">
      {displayError && (
        <Alert
          icon={<WarningCircle size={16} />}
          title="Login Failed"
          color="red"
          variant="light"
          withCloseButton
          onClose={() => {
            setSubmitError(null);
            clearError();
          }}
        >
          {displayError}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <TextInput
            label="Email"
            placeholder="your.email@example.com"
            type="email"
            required
            {...form.getInputProps("email")}
            disabled={mutation.isPending}
          />

          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            required
            {...form.getInputProps("password")}
            disabled={mutation.isPending}
          />

          <Group justify="space-between" mt="xs">
            <Checkbox
              label="Remember me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.currentTarget.checked)}
            />
            <Anchor component={Link} href="/forgot-password" size="sm">
              Forgot password?
            </Anchor>
          </Group>

          <Button
            type="submit"
            fullWidth
            loading={mutation.isPending}
            mt="md"
          >
            Sign In
          </Button>
        </Stack>
      </form>

      <Text size="sm" ta="center" c="dimmed">
        Need help?{" "}
        <Anchor component={Link} href="/support" underline="hover">
          Contact Support
        </Anchor>
      </Text>
    </Stack>
  );
}
