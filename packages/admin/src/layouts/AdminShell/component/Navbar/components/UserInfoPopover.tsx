import {
  ActionIcon,
  Avatar,
  Group,
  Indicator,
  Menu,
  Paper,
  Text,
} from "@mantine/core";
import {
  BellSlashIcon,
  CaretRightIcon,
  CircleIcon,
  GearIcon,
  MoonIcon,
  PlanetIcon,
  QuestionIcon,
  SignOutIcon,
  SunIcon,
} from "@phosphor-icons/react";
import { useState } from "react";

import classes from "../Navbar.module.css";

export function UserInfoPopover() {
  const [theme, setTheme] = useState<string | null>("system");

  return (
    <Menu shadow="md" position="right" withArrow>
      <Menu.Target>
        <Paper
          bg="white"
          px="md"
          py={"xs"}
          radius={0}
          className={classes.userInfoButton}
          style={{
            cursor: "pointer",
            borderTop: "1px solid var(--mantine-color-gray-3)",
          }}
        >
          <Group wrap="nowrap" justify="space-between">
            <Group gap="sm" wrap="nowrap">
              <Indicator position="bottom-end" withBorder>
                <Avatar
                  radius="sm"
                  variant="filled"
                  name="Kevin Dukkon"
                  color="orange"
                  size="sm"
                />
              </Indicator>
              <div style={{ flex: 1, minWidth: 0 }}>
                <Text fw={600} size="xs" truncate>
                  Kevin Dukkon
                </Text>
                <Text size="10px" opacity={0.6} truncate>
                  Admin | kevin@strove.io
                </Text>
              </div>
            </Group>
            <CaretRightIcon weight="bold" size={14} />
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
