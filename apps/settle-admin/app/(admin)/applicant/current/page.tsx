"use client";

import { Center, Stack, Text } from "@mantine/core";

export default function CurrentApplicantsPage() {
  return (
    <Center h="100%">
      <Stack align="center" gap="md">
        <Text size="xl" fw={600}>
          Current Applicants
        </Text>
        <Text size="sm" c="dimmed">
          View and manage current applicants here
        </Text>
      </Stack>
    </Center>
  );
}
