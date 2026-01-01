"use client";

import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Select,
  Button,
  Stack,
  Text,
  Alert,
  Anchor,
  Divider,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { type RegisterFormData } from "./schemas";
import { useAuthStore } from "../auth.store";
import { getDistricts } from "../auth.api";
import { WarningCircle } from "@phosphor-icons/react";
import { GoogleSignInButton } from "../components/GoogleSignInButton";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function RegisterForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Form state
  const form = useForm<RegisterFormData>({
    initialValues: {
      full_name: "",
      email: "",
      phone_number: "",
      password: "",
      confirm_password: "",
      profession: "",
      district_id: "",
    },
  });

  // Auth store
  const { register, error, clearError } = useAuthStore();
  const router = useRouter();

  // Fetch districts for dropdown
  const { data: districts = [], isLoading: districtsLoading } = useQuery({
    queryKey: ["districts"],
    queryFn: getDistricts,
  });

  const districtOptions = districts.map((d) => ({
    value: d.id,
    label: d.name,
  }));

  // Register mutation
  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      // Auto-redirect to /app after successful registration
      router.push("/app");
    },
    onError: (error) => {
      setSubmitError(
        error instanceof Error ? error.message : "Registration failed"
      );
    },
  });

  // Handle form submission
  const handleSubmit = form.onSubmit(async (values) => {
    setSubmitError(null);
    clearError();
    try {
      await mutation.mutateAsync(values);
    } catch (err) {
      // Error is already set by the mutation
      console.error("Registration error:", err);
    }
  });

  const displayError = submitError || error;

  return (
    <Stack gap="lg">
      {displayError && (
        <Alert
          icon={<WarningCircle size={16} />}
          title="Registration Failed"
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
            label="Full Name"
            placeholder="Enter your full name"
            required
            {...form.getInputProps("full_name")}
            disabled={mutation.isPending}
          />

          <TextInput
            label="Email"
            placeholder="your.email@example.com"
            type="email"
            required
            {...form.getInputProps("email")}
            disabled={mutation.isPending}
          />

          <TextInput
            label="Phone Number"
            placeholder="+977-XXXXXXXXXX"
            required
            {...form.getInputProps("phone_number")}
            disabled={mutation.isPending}
          />

          <Select
            label="District"
            placeholder="Select your district"
            data={districtOptions}
            searchable
            required
            {...form.getInputProps("district_id")}
            disabled={mutation.isPending || districtsLoading}
          />

          <TextInput
            label="Profession (Optional)"
            placeholder="e.g., Teacher, Engineer, Student"
            {...form.getInputProps("profession")}
            disabled={mutation.isPending}
          />

          <PasswordInput
            label="Password"
            placeholder="Create a password"
            required
            {...form.getInputProps("password")}
            disabled={mutation.isPending}
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Re-enter your password"
            required
            {...form.getInputProps("confirm_password")}
            disabled={mutation.isPending}
          />

          <Button
            type="submit"
            fullWidth
            loading={mutation.isPending}
            mt="md"
          >
            Create Account
          </Button>
        </Stack>
      </form>

      <Divider label="OR" labelPosition="center" />

      <GoogleSignInButton />

      <Text size="sm" ta="center" c="dimmed">
        Already have an account?{" "}
        <Anchor component={Link} href="/login" underline="hover">
          Sign in here
        </Anchor>
      </Text>
    </Stack>
  );
}
