"use client";

import { Center, Stack, Text } from "@mantine/core";

export default function ActivityLogsPage() {
  return (
    <Center h="100%">
      <Stack align="center" gap="md">
        <Text size="xl" fw={600}>
          Activity Logs
        </Text>
        <Text size="sm" c="dimmed">
          View system activity logs here
        </Text>
      </Stack>
    </Center>
  );
}
