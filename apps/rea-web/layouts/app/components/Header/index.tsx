"use client";

import { useEffect, useState } from "react";
import {
  ActionIcon,
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
    <Group h={60} gap={0} justify="space-between" wrap="nowrap">
      {/* LEFT SECTION - Navbar width (350px) */}
      <Group
        h="100%"
        gap="xl"
        px="xl"
        wrap="nowrap"
        style={{ width: 350, flex: "0 0 350px" }}
      >
        <div>
          <Text size="sm" fw={700}>
            Nepal Ekikaran Abhiyan
          </Text>
        </div>
      </Group>

      {/* CENTER SECTION - Announcement & Tagline */}
      <Group h="100%" justify="space-between" style={{ flex: 1 }}>
        <AnnouncementShowcase announcements={[]} />

        <Group gap={4}>
          <Text size="xs" c="white" fw={900}>
            nea
          </Text>
          <Text size="xs" c="dimmed" fw={900}>
            /home
          </Text>
        </Group>
      </Group>

      {/* RIGHT SECTION - Aside width (350px) */}
      <Group
        h="100%"
        gap="sm"
        px="xl"
        justify="flex-end"
        wrap="nowrap"
        style={{ width: 350, flex: "0 0 350px" }}
      >
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
          <Menu shadow="md" width={200} position="bottom-end">
            <Menu.Target>
              <UnstyledButton>
                <Group gap={8}>
                  <div style={{ textAlign: "right" }}>
                    <Text size="sm" fw={500}>
                      {user.full_name}
                    </Text>
                    <Text size="xs" c="dimmed">
                      Online
                    </Text>
                  </div>
                  <Avatar radius="xl" size={32} color="blue">
                    {user.full_name.charAt(0).toUpperCase()}
                  </Avatar>
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
          <ActionIcon size={30} variant="light" onClick={handleLogin}>
            Sign In
          </ActionIcon>
        )}
      </Group>
    </Group>
  );
}
