"use client";

import {
  Container,
  Paper,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Divider,
  Group,
  Stack,
  Center,
  Anchor,
  ThemeIcon,
  SimpleGrid,
} from "@mantine/core";
import {
  UserCircleIcon,
  SparkleIcon,
  SunIcon,
  GoogleLogoIcon,
  AppleLogoIcon,
} from "@phosphor-icons/react";

import classes from "./signup.module.css";

export function ModuleSignUp() {
  return (
    <Container size={"xs"} py={{ base: 80, md: 100 }}>
      <Paper bg="none" radius="md" p="xl" shadow="sm">
        <Stack gap="xl">
          {/* Header with Icon */}
          <Center>
            <ThemeIcon size={48} radius="xl" variant="light">
              <SunIcon weight="duotone" size={24} />
            </ThemeIcon>
          </Center>

          {/* Welcome Text */}
          <Stack gap={0} align="center">
            <Text fw={600} size="2rem" ta="center">
              Building a better Nepal, together,
            </Text>
            <Text size="xs" c="dimmed" mt="sm">
              First time here?{" "}
              <Anchor href="#" size="sm" fw={500}>
                Sign up for free
              </Anchor>
            </Text>
          </Stack>

          {/* Form Fields */}
          <Stack gap="xs">
            <TextInput
              size="md"
              classNames={{
                input: classes.input,
              }}
              placeholder="Email Address"
              type="email"
            />
            <PasswordInput
              size="md"
              classNames={{
                input: classes.input,
              }}
              placeholder="Password"
              type="password"
            />
          </Stack>

          {/* Sign In Button */}

          <Stack gap="xs">
            <Button size="md" fs="xs" fullWidth>
              Sign in
            </Button>
            <Button
              fullWidth
              variant="subtle"
              leftSection={<SparkleIcon size={16} />}
            >
              Sign in using magic link
            </Button>
          </Stack>

          {/* Divider */}
          <Group grow>
            <Divider />
            <Text ta="center" size="xs" c="dimmed" inline>
              or
            </Text>
            <Divider />
          </Group>

          {/* Magic Link Button */}

          <SimpleGrid cols={2} spacing="xs">
            <Button
              size="md"
              fullWidth
              color="dark"
              variant="white"
              leftSection={<GoogleLogoIcon weight="bold" size={16} />}
            >
              Sign in using Google
            </Button>
            <Button
              size="md"
              color="dark"
              fullWidth
              variant="white"
              leftSection={<AppleLogoIcon weight="fill" size={16} />}
            >
              Sign in using Apple
            </Button>
          </SimpleGrid>

          {/* Divider */}
          <Divider />

          {/* SSO Section */}
          <Stack gap="xs" align="center">
            <Text size="xs" c="dimmed" ta="center">
              You acknowledge that you have read, and agree to our <br />
              <Anchor href="#" size="xs">
                Terms of Service
              </Anchor>{" "}
              and{" "}
              <Anchor href="#" size="xs">
                Privacy Policy
              </Anchor>
            </Text>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}
