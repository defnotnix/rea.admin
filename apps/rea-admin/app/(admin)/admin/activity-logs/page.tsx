"use client";

import { Container, Stack, Text, Card, Badge, Group } from "@mantine/core";
import { Clock } from "@phosphor-icons/react";

export default function ActivityLogsPage() {
  return (
    <Container size="xl" py="lg">
      <Stack gap="xl">
        <div>
          <Text size="lg" fw={600} mb="xs">
            Activity Logs
          </Text>
          <Text size="sm" c="dimmed">
            View system activity and audit trail
          </Text>
        </div>

        <Card p="lg" radius="md" withBorder>
          <Group justify="center" py="xl">
            <Clock size={32} weight="thin" opacity={0.5} />
          </Group>
          <Text align="center" c="dimmed">
            Activity Logs module coming soon. This will show a detailed audit trail of all system activities.
          </Text>
        </Card>
      </Stack>
    </Container>
  );
}
