"use client";

import { Center, Stack, Text } from "@mantine/core";

export default function JobCategoryPage() {
  return (
    <Center h="100%">
      <Stack align="center" gap="md">
        <Text size="xl" fw={600}>
          Job Category
        </Text>
        <Text size="sm" c="dimmed">
          Manage job categories here
        </Text>
      </Stack>
    </Center>
  );
}
