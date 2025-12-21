"use client";

import {
  ActionIcon,
  Button,
  Container,
  Divider,
  Group,
  Text,
  TextInput,
  ThemeIcon,
} from "@mantine/core";
import {
  BellIcon,
  MagnifyingGlassIcon,
  NotificationIcon,
  SunIcon,
} from "@phosphor-icons/react";

export function LayoutSiteHaeder() {
  return (
    <>
      <Container>
        <Group justify="space-between" h={60}>
          <Group gap={8}>
            <ThemeIcon variant="subtle">
              <SunIcon />
            </ThemeIcon>
            <Text size="xs" c="white">
              Rastriya Ekikaran Abhiyan
            </Text>
            <Text size="xs" c="white" opacity={0.4}>
              By the people, For the Nation.
            </Text>
          </Group>

          <Group gap={4}>
            <ActionIcon radius="sm" variant="light" size={36}>
              <BellIcon />
            </ActionIcon>
            <Button radius="sm" fw={400}>
              Sign In / Register
            </Button>
          </Group>
        </Group>

        <Divider opacity={0.5} />
      </Container>
    </>
  );
}
