"use client";

import { Center, Stack, Text } from "@mantine/core";

export default function HomePage() {
  return (
    <Center h="100%">
      <Stack align="center" gap="md">
        <Text size="xl" fw={600}>
          Welcome to Settle Admin
        </Text>
        <Text size="sm" c="dimmed">
          Select an option from the navigation menu to continue
        </Text>
      </Stack>
    </Center>
  );
}
