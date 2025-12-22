"use client";

import { ActionIcon, Button, Group, Text } from "@mantine/core";
import { BellIcon } from "@phosphor-icons/react";

export function LayoutAppHeader() {
  return (
    <>
      <Group h={60} justify="space-between" px={"xl"}>
        <Text size="sm">
          Nepal Ekikaran Abhiyan{" "}
          <span
            style={{
              opacity: 0.3,
            }}
          >
            Nepal is coming together and rising anew.
          </span>
        </Text>

        <Group gap={4} justify="flex-end">
          <ActionIcon size={30} variant="light">
            <BellIcon />
          </ActionIcon>
          <Button size="xs">Sign In / Register</Button>
        </Group>
      </Group>
    </>
  );
}
