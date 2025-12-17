"use client";

import {
  ActionIcon,
  Avatar,
  Button,
  Group,
  Menu,
  Paper,
  Text,
} from "@mantine/core";
import {
  CaretUpDownIcon,
  DotsNineIcon,
  DotsSixIcon,
  PlanetIcon,
} from "@phosphor-icons/react";

export function AdminShellHeader() {
  return (
    <Group gap={0}>
      <Group w={260} gap={0} px="sm" h={48}>
        <ActionIcon variant="subtle" color="dark">
          <DotsNineIcon weight="bold" />
        </ActionIcon>
        <Menu position="right">
          <Menu.Target>
            <Paper withBorder px="xs" py={8} radius="md">
              <Group justify="space-between" gap="xs">
                <Group>
                  <Avatar bg="dark.9" size="xs" radius="sm">
                    <PlanetIcon color="white" weight="fill" />
                  </Avatar>
                  <div>
                    <Text size="xs">vFramework Test</Text>
                  </div>
                </Group>
                <CaretUpDownIcon />
              </Group>
            </Paper>
          </Menu.Target>
          <Menu.Dropdown>xyz</Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  );
}
