"use client";

import {
  Popover,
  Stack,
  Text,
  Group,
  Button,
  Badge,
  ThemeIcon,
  ScrollArea,
  ActionIcon,
  rem,
} from "@mantine/core";
import { Bell, Check, X } from "@phosphor-icons/react";
import { useState } from "react";

export interface Notification {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  category?: string;
  read?: boolean;
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: "filled" | "light" | "default";
    color?: string;
  }>;
}

interface NotificationsPopoverProps {
  notifications?: Notification[];
  onMarkAsRead?: (id: string) => void;
  onDismiss?: (id: string) => void;
}

export function NotificationsPopover({
  notifications = [],
  onMarkAsRead,
  onDismiss,
}: NotificationsPopoverProps) {
  const [opened, setOpened] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const NotificationItem = ({
    notification,
  }: {
    notification: Notification;
  }) => (
    <Group
      justify="space-between"
      align="flex-start"
      p="sm"
      gap="xs"
      wrap="nowrap"
      style={{
        borderBottom: "1px solid var(--mantine-color-gray-2)",
      }}
    >
      <Stack gap={4} flex={1} style={{ minWidth: 0 }}>
        <Group justify="space-between" align="flex-start" gap="xs">
          <div style={{ flex: 1, minWidth: 0 }}>
            <Text size="sm" fw={notification.read ? 400 : 600} truncate>
              {notification.title}
            </Text>
            {notification.category && (
              <Badge size="sm" variant="light" mt={4}>
                {notification.category}
              </Badge>
            )}
          </div>
          {!notification.read && (
            <ThemeIcon size="sm" radius="full" variant="filled" color="blue">
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "currentColor",
                }}
              />
            </ThemeIcon>
          )}
        </Group>

        {notification.description && (
          <Text size="xs" c="dimmed" lineClamp={2}>
            {notification.description}
          </Text>
        )}

        <Text size="xs" c="dimmed">
          {notification.timestamp}
        </Text>

        {notification.actions && notification.actions.length > 0 && (
          <Group gap={6} mt={4}>
            {notification.actions.map((action, idx) => (
              <Button
                key={idx}
                size="xs"
                variant={action.variant || "light"}
                color={action.color}
                onClick={() => {
                  action.onClick();
                  onMarkAsRead?.(notification.id);
                }}
              >
                {action.label}
              </Button>
            ))}
          </Group>
        )}
      </Stack>

      <ActionIcon
        size="sm"
        variant="subtle"
        color="gray"
        onClick={() => onDismiss?.(notification.id)}
        title="Dismiss"
      >
        <X size={14} />
      </ActionIcon>
    </Group>
  );

  return (
    <Popover
      position="bottom"
      withArrow
      shadow="md"
      opened={opened}
      onChange={setOpened}
    >
      <Popover.Target>
        <ActionIcon
          size={30}
          variant="light"
          pos="relative"
          title="Notifications"
          onClick={() => setOpened(!opened)}
        >
          <Bell size={18} />
          {unreadCount > 0 && (
            <Badge
              pos="absolute"
              top={-6}
              right={-6}
              size="sm"
              color="red"
              variant="filled"
              p={2}
            >
              {unreadCount}
            </Badge>
          )}
        </ActionIcon>
      </Popover.Target>

      <Popover.Dropdown p={0} style={{ overflow: "hidden" }}>
        <Stack gap={0} style={{ width: 400, maxHeight: 600 }}>
          {/* Header */}
          <Group
            justify="space-between"
            p="md"
            style={{ borderBottom: "1px solid var(--mantine-color-gray-2)" }}
          >
            <Text fw={600} size="sm">
              Notifications
            </Text>
            {unreadCount > 0 && (
              <Text
                size="xs"
                c="blue"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  notifications.forEach((n) => {
                    if (!n.read) onMarkAsRead?.(n.id);
                  });
                }}
              >
                Mark all as read
              </Text>
            )}
          </Group>

          {/* Notifications List */}
          {notifications.length > 0 ? (
            <ScrollArea style={{ flex: 1 }}>
              <Stack gap={0}>
                {notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                  />
                ))}
              </Stack>
            </ScrollArea>
          ) : (
            <Stack align="center" justify="center" p="xl">
              <Check size={24} />
              <Text size="sm" c="dimmed" ta="center">
                No notifications yet
              </Text>
            </Stack>
          )}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}
