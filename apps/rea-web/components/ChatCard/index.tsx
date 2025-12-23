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
} from "@mantine/core";
import { ChatMessage, useChatStore } from "@/modules/app/chat/chat.store";
import { USERS } from "@/modules/app/chat/chat.mock";

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
import {
  upvoteMessageApi,
  downvoteMessageApi,
  deleteMessageApi,
  markAsSolutionApi,
} from "@/modules/app/chat/chat.api";

interface MessageItemProps {
  message: ChatMessage;
}

// Individual message component
function MessageItem({ message }: MessageItemProps) {
  const { upvoteMessage, downvoteMessage, deleteMessage, updateMessage } =
    useChatStore();
  const { hovered, ref } = useHover();
  const [isLoading, setIsLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleUpvote = async () => {
    setIsLoading(true);
    try {
      upvoteMessage(message.messageId);
      await upvoteMessageApi(message.messageId);
    } catch (error) {
      console.error("Failed to upvote:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownvote = async () => {
    setIsLoading(true);
    try {
      downvoteMessage(message.messageId);
      await downvoteMessageApi(message.messageId);
    } catch (error) {
      console.error("Failed to downvote:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      deleteMessage(message.messageId, "current-user");
      await deleteMessageApi(message.messageId, "current-user");
    } catch (error) {
      console.error("Failed to delete:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsSolution = async () => {
    setIsLoading(true);
    try {
      updateMessage(message.messageId, { isSolution: true });
      await markAsSolutionApi(message.messageId);
    } catch (error) {
      console.error("Failed to mark as solution:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (message.isDeleted) {
    return null;
  }

  const user = USERS[message.userId as keyof typeof USERS];
  const userName = user?.name || `User ${message.userId.slice(0, 8)}`;
  const userInitials = user?.initials || message.userId.slice(0, 2).toUpperCase();

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
                    {message.isSolution && (
                      <Badge size="xs" color="green" variant="light">
                        Solution
                      </Badge>
                    )}
                  </Group>
                  <Text size="xs" c="dimmed">
                    {new Date(message.createdAt).toLocaleDateString()}
                  </Text>
                </Group>

                {/* Message Text */}
                <Text size="xs" mb="md" style={{ lineHeight: 1.6 }}>
                  {message.messageText}
                </Text>

                {/* Vote Controls */}
                <Group gap={4}>
                  <Badge
                    color="gray"
                    size="sm"
                    variant="light"
                    onClick={handleUpvote}
                    style={{ cursor: "pointer" }}
                    leftSection={<ThumbsUpIcon weight="fill" />}
                  >
                    {message.upvoteCount}
                  </Badge>

                  <Badge
                    color="gray"
                    size="sm"
                    variant="light"
                    leftSection={<ThumbsDownIcon weight="fill" />}
                    onClick={handleDownvote}
                    style={{ cursor: "pointer" }}
                  >
                    {message.downvoteCount}
                  </Badge>
                </Group>

                {(hovered || menuOpen) && (
                  <Paper pos="absolute" top={0} right={0} p={0} withBorder>
                    <Group gap={0}>
                      {/* <ActionIcon variant="subtle" size="sm">
                        <SmileyIcon weight="fill" size={16} />
                      </ActionIcon>

                      {!message.isSolution && (
                        <ActionIcon
                          variant="subtle"
                          size="sm"
                          onClick={handleMarkAsSolution}
                          disabled={isLoading}
                          title="Mark as solution"
                        >
                          <CheckCircleIcon weight="fill" size={16} />
                        </ActionIcon>
                      )} */}

                      <Menu shadow="md" opened={menuOpen} onChange={setMenuOpen}>
                        <Menu.Target>
                          <ActionIcon variant="subtle" size="sm">
                            <DotsThreeVerticalIcon weight="bold" size={16} />
                          </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                          <Menu.Item
                            leftSection={<TrashIcon size={14} />}
                            onClick={handleDelete}
                            disabled={isLoading}
                            color="red"
                          >
                            Delete
                          </Menu.Item>
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
  messages: ChatMessage[];
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
        <MessageItem key={message.messageId} message={message} />
      ))}
    </Stack>
  );
}

// Keep ChatCard as alias for backwards compatibility
export const ChatCard = ChatThread;
