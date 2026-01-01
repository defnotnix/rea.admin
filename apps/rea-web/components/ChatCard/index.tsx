"use client";

import { useState, useEffect } from "react";
import {
  Card,
  Stack,
  Text,
  Group,
  Badge,
  Divider,
  Button,
  Avatar,
  Container,
  Paper,
  ActionIcon,
  Menu,
  Tooltip,
} from "@mantine/core";
import { Message, useChatStore } from "@/modules/app/chat/chat.store";
import { useAuthStore } from "@/modules/auth/auth.store";
import classes from "./chat.module.css";
import {
  DotsThreeVerticalIcon,
  SmileyIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@phosphor-icons/react";
import { useHover } from "@mantine/hooks";
import * as chatApi from "@/modules/app/chat/chat.api";
import { notifications } from "@mantine/notifications";

interface MessageItemProps {
  message: Message;
}

// Individual message component
function MessageItem({ message }: MessageItemProps) {
  const { upvoteMessage, downvoteMessage, deleteMessage, updateMessage } =
    useChatStore();
  const { user: currentUser, token } = useAuthStore();
  const { hovered, ref } = useHover();
  const [isLoading, setIsLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleUpvote = async () => {
    if (!token) {
      notifications.show({
        title: "Error",
        message: "You must be logged in to vote",
        color: "red",
        autoClose: 3000,
      });
      return;
    }

    setIsLoading(true);
    try {
      upvoteMessage(message.id);
      await chatApi.toggleVote(message.id, 1, token);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to upvote";
      notifications.show({
        title: "Error",
        message: errorMessage,
        color: "red",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownvote = async () => {
    if (!token) {
      notifications.show({
        title: "Error",
        message: "You must be logged in to vote",
        color: "red",
        autoClose: 3000,
      });
      return;
    }

    setIsLoading(true);
    try {
      downvoteMessage(message.id);
      await chatApi.toggleVote(message.id, -1, token);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to downvote";
      notifications.show({
        title: "Error",
        message: errorMessage,
        color: "red",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!message.can_delete) {
      notifications.show({
        title: "Error",
        message: "You don't have permission to delete this message",
        color: "red",
        autoClose: 3000,
      });
      return;
    }

    if (!token) {
      notifications.show({
        title: "Error",
        message: "You must be logged in to delete messages",
        color: "red",
        autoClose: 3000,
      });
      return;
    }

    setIsLoading(true);
    try {
      deleteMessage(message.id);
      await chatApi.deleteMessage(message.id, token);
      notifications.show({
        title: "Success",
        message: "Message deleted",
        color: "green",
        autoClose: 2000,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to delete message";
      notifications.show({
        title: "Error",
        message: errorMessage,
        color: "red",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsSolution = async () => {
    if (!message.can_edit) {
      notifications.show({
        title: "Error",
        message: "You don't have permission to edit this message",
        color: "red",
        autoClose: 3000,
      });
      return;
    }

    if (!token) {
      notifications.show({
        title: "Error",
        message: "You must be logged in",
        color: "red",
        autoClose: 3000,
      });
      return;
    }

    setIsLoading(true);
    try {
      updateMessage(message.id, { is_solution: true });
      await chatApi.updateMessage(message.id, { is_solution: true }, token);
      notifications.show({
        title: "Success",
        message: "Marked as solution",
        color: "green",
        autoClose: 2000,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to mark as solution";
      notifications.show({
        title: "Error",
        message: errorMessage,
        color: "red",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (message.is_deleted) {
    return (
      <Container size="md" py="lg">
        <Text size="xs" c="dimmed" fs="italic">
          This message has been deleted
        </Text>
      </Container>
    );
  }

  const author = message.author;
  const userName = author.full_name || `User`;
  // Get initials from full_name
  const userInitials =
    author.full_name
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  return (
    <div className={classes.messageItem} ref={ref}>
      <Container size="md" py="lg">
        <Group wrap="nowrap" align="flex-start">
          {mounted && (
            <Avatar
              color="orange"
              size="sm"
              variant="filled"
              name={userInitials}
            />
          )}
          <div style={{ width: "100%" }}>
            {mounted && (
              <>
                <Group justify="space-between" mb="xs">
                  <Group gap="xs">
                    <Text size="xs" fw={600}>
                      {userName}
                    </Text>
                    {author.is_verified && (
                      <Badge size="xs" color="blue" variant="light">
                        Verified
                      </Badge>
                    )}
                    {author.is_moderator && (
                      <Badge size="xs" color="purple" variant="light">
                        Moderator
                      </Badge>
                    )}
                    {message.is_solution && (
                      <Badge size="xs" color="green" variant="light">
                        Solution
                      </Badge>
                    )}
                  </Group>
                  <Text size="xs" c="dimmed">
                    {new Date(message.created_at).toLocaleDateString()}
                  </Text>
                </Group>

                {/* Author Details */}
                {author.profession && (
                  <Text size="xs" c="dimmed" mb="md">
                    {author.profession}
                    {author.district_name && ` • ${author.district_name}`}
                  </Text>
                )}

                {/* Message Text */}
                <Text size="xs" mb="md" style={{ lineHeight: 1.6 }}>
                  {message.message}
                </Text>

                {/* Vote Controls */}
                <Group gap={4}>
                  <Tooltip label={message.current_user_vote === 1 ? "Remove upvote" : "Upvote"}>
                    <Badge
                      color={message.current_user_vote === 1 ? "blue" : "gray"}
                      size="sm"
                      variant="light"
                      onClick={handleUpvote}
                      style={{ cursor: "pointer" }}
                      leftSection={<ThumbsUpIcon weight="fill" size={12} />}
                      disabled={isLoading || !token}
                    >
                      {message.upvote_count}
                    </Badge>
                  </Tooltip>

                  <Tooltip label={message.current_user_vote === -1 ? "Remove downvote" : "Downvote"}>
                    <Badge
                      color={message.current_user_vote === -1 ? "red" : "gray"}
                      size="sm"
                      variant="light"
                      leftSection={<ThumbsDownIcon weight="fill" size={12} />}
                      onClick={handleDownvote}
                      style={{ cursor: "pointer" }}
                      disabled={isLoading || !token}
                    >
                      {message.downvote_count}
                    </Badge>
                  </Tooltip>
                </Group>

                {(hovered || menuOpen) && (
                  <Paper pos="absolute" top={0} right={0} p={0} withBorder>
                    <Group gap={0}>
                      <Menu shadow="md" opened={menuOpen} onChange={setMenuOpen}>
                        <Menu.Target>
                          <ActionIcon variant="subtle" size="sm">
                            <DotsThreeVerticalIcon weight="bold" size={16} />
                          </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                          {message.can_edit && !message.is_solution && (
                            <Menu.Item
                              leftSection={<CheckCircleIcon size={14} />}
                              onClick={handleMarkAsSolution}
                              disabled={isLoading}
                            >
                              Mark as Solution
                            </Menu.Item>
                          )}
                          {message.can_delete && (
                            <Menu.Item
                              leftSection={<TrashIcon size={14} />}
                              onClick={handleDelete}
                              disabled={isLoading}
                              color="red"
                            >
                              Delete
                            </Menu.Item>
                          )}
                          {!message.can_edit && !message.can_delete && (
                            <Menu.Item disabled>
                              No actions available
                            </Menu.Item>
                          )}
                        </Menu.Dropdown>
                      </Menu>
                    </Group>
                  </Paper>
                )}
              </>
            )}
          </div>
        </Group>
      </Container>
    </div>
  );
}

interface ChatThreadProps {
  messages: Message[];
}

// Chat thread component - displays all messages for one chat
export function ChatThread({ messages }: ChatThreadProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || messages.length === 0) {
    return null;
  }

  return (
    <Stack gap={0}>
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </Stack>
  );
}

// Keep ChatCard as alias for backwards compatibility
export const ChatCard = ChatThread;
