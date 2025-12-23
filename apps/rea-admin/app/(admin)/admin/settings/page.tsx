"use client";

import { Container, Stack, Text, Card, Badge, Group } from "@mantine/core";
import { Gear } from "@phosphor-icons/react";

export default function SettingsPage() {
  return (
    <Container size="xl" py="lg">
      <Stack gap="xl">
        <div>
          <Text size="lg" fw={600} mb="xs">
            System Settings
          </Text>
          <Text size="sm" c="dimmed">
            Configure system-wide settings and preferences
          </Text>
        </div>

        <Card p="lg" radius="md" withBorder>
          <Group justify="center" py="xl">
            <Gear size={32} weight="thin" opacity={0.5} />
          </Group>
          <Text align="center" c="dimmed">
            System Settings module coming soon. This will allow you to configure system-wide settings and preferences.
          </Text>
        </Card>
      </Stack>
    </Container>
  );
}
