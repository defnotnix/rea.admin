"use client";

import { Avatar, Group, Indicator, Paper, Stack, Text } from "@mantine/core";

export function LayoutAppAside() {
  const AvatarRow = ({ count = 7, showMore = false }) => (
    <Group gap={8} wrap="wrap">
      {Array.from({ length: count }).map((_, index) => (
        <Avatar key={index} radius="md" size="md" bg="#ffffff00">
          {" "}
        </Avatar>
      ))}
      {showMore && (
        <Paper
          p={8}
          radius="md"
          bg="dark.6"
          component="button"
          style={{
            cursor: "pointer",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 40,
            height: 40,
          }}
        >
          <Text size="sm" fw={600} c="dimmed">
            + 24
          </Text>
        </Paper>
      )}
    </Group>
  );

  return (
    <Stack h="100%" px="xl" py="lg" gap="xl" justify="space-between">
      {/* TOP 3 SECTIONS */}
      <Stack gap="lg">
        {/* MODERATORS SECTION */}
        <Stack gap="sm">
          <Text size="xs" fw={700} tt="uppercase" c="dimmed">
            Moderators
          </Text>
          <AvatarRow count={7} showMore={false} />
        </Stack>

        {/* INFLUENCERS SECTION */}
        <Stack gap="sm">
          <Text size="xs" fw={700} tt="uppercase" c="dimmed">
            Influencers
          </Text>
          <AvatarRow count={14} showMore={true} />
        </Stack>

        {/* MEMBERS SECTION */}
        <Stack gap="sm">
          <Text size="xs" fw={700} tt="uppercase" c="dimmed">
            Members
          </Text>
          <AvatarRow count={14} showMore={true} />
        </Stack>
      </Stack>

      {/* BOTTOM SECTION - OFFLINE */}
      <Stack gap="sm">
        <Text size="xs" fw={700} tt="uppercase" c="dimmed">
          Offline
        </Text>
        <Group gap={8} wrap="wrap">
          {Array.from({ length: 14 }).map((_, index) => (
            <Avatar key={index} radius="md" size="md" bg="dark.6" opacity={0.4}>
              {" "}
            </Avatar>
          ))}
          <Paper
            p={8}
            radius="md"
            bg="dark.6"
            component="button"
            style={{
              cursor: "pointer",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 40,
              height: 40,
            }}
          >
            <Text size="sm" fw={600} c="dimmed">
              + 24
            </Text>
          </Paper>
        </Group>
      </Stack>
    </Stack>
  );
}
