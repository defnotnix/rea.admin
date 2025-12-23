"use client";

import { useEffect, useState } from "react";
import {
  ActionIcon,
  Button,
  Group,
  Text,
  Menu,
  Avatar,
  UnstyledButton,
  rem,
  useMantineColorScheme,
} from "@mantine/core";
import { SignOut, User as UserIcon, Moon, Sun } from "@phosphor-icons/react";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useRouter } from "next/navigation";
import { NotificationsPopover } from "./NotificationsPopover";
import { AnnouncementShowcase } from "./AnnouncementShowcase";

export function LayoutAppHeader() {
  const [mounted, setMounted] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <>
      <Group h={60} justify="space-between" px={"xl"}>
        <Text size="sm" style={{ minWidth: 150 }}>
          Nepal Ekikaran Abhiyan{" "}
          <span
            style={{
              opacity: 0.3,
            }}
          >
            Together again.
          </span>
        </Text>

        <AnnouncementShowcase announcements={[]} />

        <Group gap={4} justify="flex-end">
          <NotificationsPopover notifications={[]} />

          {mounted && (
            <ActionIcon
              size={30}
              variant="light"
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
            >
              {colorScheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </ActionIcon>
          )}

          {isAuthenticated && user ? (
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <UnstyledButton>
                  <Group gap="xs">
                    <Avatar radius="xl" size={30} color="blue">
                      {user.full_name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Text size="sm" fw={500}>
                      {user.full_name}
                    </Text>
                  </Group>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Account</Menu.Label>
                <Menu.Item
                  leftSection={
                    <UserIcon style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Profile
                </Menu.Item>

                <Menu.Divider />

                <Menu.Item
                  color="red"
                  leftSection={
                    <SignOut style={{ width: rem(14), height: rem(14) }} />
                  }
                  onClick={handleLogout}
                >
                  Sign Out
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Button size="xs" onClick={handleLogin}>
              Sign In / Register
            </Button>
          )}
        </Group>
      </Group>
    </>
  );
}
