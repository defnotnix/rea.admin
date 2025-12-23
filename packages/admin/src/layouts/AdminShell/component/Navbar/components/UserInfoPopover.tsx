import { useState } from "react";
import { ActionIcon, Avatar, Group, Menu, Paper, Text } from "@mantine/core";
import {
  CaretUpDownIcon,
  GearIcon,
  MoonIcon,
  PlanetIcon,
  QuestionIcon,
  SignOutIcon,
  SunIcon,
  BellSlashIcon,
  CircleIcon,
} from "@phosphor-icons/react";

import classes from "../Navbar.module.css";

export function UserInfoPopover() {
  const [theme, setTheme] = useState<string | null>("system");

  return (
    <Menu shadow="md" position="right" withArrow>
      <Menu.Target>
        <Paper
          px="xs"
          py={4}
          mx="sm"
          radius="md"
          className={classes.userInfoButton}
          style={{ cursor: "pointer" }}
          withBorder
        >
          <Group wrap="nowrap" justify="space-between">
            <Group gap="sm" wrap="nowrap">
              <Avatar name="Kevin Dukkon" color="initials" size="md" />
              <div style={{ flex: 1, minWidth: 0 }}>
                <Text fw={600} size="xs" truncate>
                  Kevin Dukkon
                </Text>
                <Text size="10px" opacity={0.6} truncate>
                  Admin | kevin@strove.io
                </Text>
              </div>
            </Group>
            <ActionIcon variant="subtle" size="sm">
              <CaretUpDownIcon size={16} />
            </ActionIcon>
          </Group>
        </Paper>
      </Menu.Target>

      <Menu.Dropdown>
        {/* Status Section */}
        <Menu.Item
          leftSection={
            <CircleIcon
              size={16}
              weight="fill"
              style={{ color: "var(--mantine-color-yellow-6)" }}
            />
          }
        >
          <Text size="xs">Set yourself as away</Text>
        </Menu.Item>

        {/* Notifications Section */}
        <Menu.Item leftSection={<BellSlashIcon size={16} />}>
          <Text size="xs">Pause Notifications</Text>
        </Menu.Item>

        <Menu.Divider />

        {/* Help Section */}
        <Menu.Item leftSection={<QuestionIcon size={16} />}>
          <Text size="xs">Help</Text>
        </Menu.Item>

        {/* Settings Section */}
        <Menu.Item leftSection={<GearIcon size={16} />}>
          <Text size="xs">Settings</Text>
        </Menu.Item>

        <Menu.Divider />

        {/* Theme Selection */}
        <Menu.Label>
          <Text size="xs">Theme</Text>
        </Menu.Label>

        <Menu.Item onClick={() => setTheme("light")}>
          <Group gap="xs" justify="space-between">
            <Text size="xs">Light</Text>
            <SunIcon size={14} />
          </Group>
        </Menu.Item>

        <Menu.Item onClick={() => setTheme("dark")}>
          <Group gap="xs" justify="space-between">
            <Text size="xs">Dark</Text>
            <MoonIcon size={14} />
          </Group>
        </Menu.Item>

        <Menu.Item onClick={() => setTheme("system")}>
          <Group gap="xs" justify="space-between">
            <Text size="xs">System</Text>
            <PlanetIcon size={14} />
          </Group>
        </Menu.Item>

        <Menu.Divider />

        {/* Sign Out Section */}
        <Menu.Item leftSection={<SignOutIcon size={16} />}>
          <Text size="xs">Sign out</Text>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
