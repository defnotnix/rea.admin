"use client";

import {
  ActionIcon,
  Avatar,
  Button,
  Group,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import { BellIcon } from "@phosphor-icons/react";

export function LayoutMainAside() {
  return (
    <>
      <Stack py="md">
        <Stack gap="xs">
          <Text size="xs">Online </Text>
          <Group gap={2}>
            {Array.from({ length: 18 }).map((_, index) => (
              <Avatar key={index} radius="xl" size="md" />
            ))}
            <Text size="xs" c="dimmed">
              + 233 more
            </Text>
          </Group>
        </Stack>

        <Stack gap="xs">
          <Text size="xs">Offline </Text>
          <Group gap={2}>
            {Array.from({ length: 18 }).map((_, index) => (
              <Avatar key={index} radius="xl" size="md" />
            ))}
            <Text size="xs" c="dimmed">
              + 2233 more
            </Text>
          </Group>
        </Stack>
      </Stack>
    </>
  );
}
