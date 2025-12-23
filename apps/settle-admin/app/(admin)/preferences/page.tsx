"use client";

import { Center, Stack, Text } from "@mantine/core";

export default function PreferencesPage() {
  return (
    <Center h="100%">
      <Stack align="center" gap="md">
        <Text size="xl" fw={600}>
          Software Preferences
        </Text>
        <Text size="sm" c="dimmed">
          Configure system preferences and settings here
        </Text>
      </Stack>
    </Center>
  );
}
