"use client";

import { Center, Stack, Text } from "@mantine/core";

export default function AboutPage() {
  return (
    <Center h="100%">
      <Stack align="center" gap="md">
        <Text size="xl" fw={600}>
          About
        </Text>
        <Text size="sm" c="dimmed">
          Information about Settle Admin application
        </Text>
      </Stack>
    </Center>
  );
}
