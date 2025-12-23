"use client";

import { Center, Stack, Text } from "@mantine/core";

export default function AdminAccountsPage() {
  return (
    <Center h="100%">
      <Stack align="center" gap="md">
        <Text size="xl" fw={600}>
          Admin Accounts
        </Text>
        <Text size="sm" c="dimmed">
          Manage admin user accounts here
        </Text>
      </Stack>
    </Center>
  );
}
