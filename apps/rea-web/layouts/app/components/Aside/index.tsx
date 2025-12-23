"use client";

import {
  Avatar,
  Group,
  Indicator,
  Paper,
  Stack,
  Text,
} from "@mantine/core";

export function LayoutAppAside() {
  return (
    <Stack px="xl" py="lg" gap="lg">
      <Stack gap="xs">
        <Text size="xs" fw={700} tt="uppercase" c="dimmed">
          Moderators
        </Text>
        <Group gap={8} wrap="wrap">
          {Array.from({ length: 7 }).map((_, index) => (
            <Indicator
              size={8}
              color="green"
              position="bottom-end"
              withBorder
              key={index}
            >
              <Avatar
                src={
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=" +
                  Math.random()
                }
                radius="sm"
                size="sm"
              />
            </Indicator>
          ))}
        </Group>
      </Stack>

      <Stack gap="xs">
        <Text size="xs" fw={700} tt="uppercase" c="dimmed">
          Influencers
        </Text>
        <Group gap={4} wrap="wrap">
          {Array.from({ length: 21 }).map((_, index) => (
            <Avatar
              src={
                "https://api.dicebear.com/7.x/avataaars/svg?seed=" +
                Math.random()
              }
              key={index}
              radius="xl"
              size="xs"
            />
          ))}
          <Paper
            p={4}
            radius="sm"
            bg="dark.6"
            component="button"
            style={{
              cursor: "pointer",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 32,
              height: 32,
            }}
          >
            <Text size="xs" fw={600} c="dimmed">
              + 24
            </Text>
          </Paper>
        </Group>
      </Stack>

      <Stack gap="xs">
        <Text size="xs" fw={700} tt="uppercase" c="dimmed">
          Members
        </Text>
        <Group gap={4} wrap="wrap">
          {Array.from({ length: 21 }).map((_, index) => (
            <Avatar
              src={
                "https://api.dicebear.com/7.x/avataaars/svg?seed=" +
                Math.random()
              }
              key={index}
              radius="xl"
              size="xs"
            />
          ))}
          <Paper
            p={4}
            radius="sm"
            bg="dark.6"
            component="button"
            style={{
              cursor: "pointer",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 32,
              height: 32,
            }}
          >
            <Text size="xs" fw={600} c="dimmed">
              + 24
            </Text>
          </Paper>
        </Group>
      </Stack>

      <Stack gap="xs" mt="auto">
        <Text size="xs" fw={700} tt="uppercase" c="dimmed">
          Offline
        </Text>
        <Group gap={4} wrap="wrap">
          {Array.from({ length: 21 }).map((_, index) => (
            <Avatar
              src={
                "https://api.dicebear.com/7.x/avataaars/svg?seed=" +
                Math.random()
              }
              opacity={0.4}
              key={index}
              radius="xl"
              size="xs"
            />
          ))}
          <Paper
            p={4}
            radius="sm"
            bg="dark.6"
            component="button"
            style={{
              cursor: "pointer",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 32,
              height: 32,
            }}
          >
            <Text size="xs" fw={600} c="dimmed">
              + 24
            </Text>
          </Paper>
        </Group>
      </Stack>
    </Stack>
  );
}
