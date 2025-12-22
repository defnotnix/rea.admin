"use client";

import {
  ActionIcon,
  Avatar,
  Button,
  Group,
  Indicator,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import { BellIcon } from "@phosphor-icons/react";

export function LayoutAppAside() {
  return (
    <>
      {/* <Stack px="xl">
        <Group h={60} gap={4} justify="flex-end">
          <ActionIcon size={30} variant="light">
            <BellIcon />
          </ActionIcon>
          <Button size="xs">Sign In / Register</Button>
        </Group>

        <Stack gap="xs">
          <Text size="xs" fw={600}>
            Moderator{" "}
          </Text>
          <Group gap={8}>
            {Array.from({ length: 8 }).map((_, index) => (
              <Indicator
                size={10}
                color="green"
                position="bottom-end"
                withBorder
                key={index}
              >
                <Avatar
                  src={
                    "https://testingbot.com/free-online-tools/random-avatar/200?img=" +
                    (index + 1)
                  }
                  radius="sm"
                  size="md"
                />
              </Indicator>
            ))}
          </Group>
        </Stack>

        <Stack gap="xs">
          <Text size="xs" fw={600}>
            Online{" "}
          </Text>
          <Group gap={4}>
            {Array.from({ length: 24 }).map((_, index) => (
              <Avatar
                src={
                  "https://testingbot.com/free-online-tools/random-avatar/200?img=" +
                  (index + 1)
                }
                key={index}
                radius="xl"
                size="md"
              />
            ))}
          </Group>
        </Stack>

        <Stack gap="xs">
          <Text size="xs" fw={600} opacity={0.2}>
            Offline{" "}
          </Text>
          <Group gap={4}>
            {Array.from({ length: 24 }).map((_, index) => (
              <Avatar
                src={
                  "https://testingbot.com/free-online-tools/random-avatar/200?img=" +
                  (index + 1)
                }
                opacity={0.5}
                key={index}
                radius="xl"
                size="md"
              />
            ))}
          </Group>
        </Stack>
      </Stack> */}
    </>
  );
}
