"use client";

import {
  ActionIcon,
  Avatar,
  Badge,
  Group,
  Paper,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { ThumbsDownIcon, ThumbsUpIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { useChatStore } from "../../hooks/useChatStore";
import { Message } from "../../types";
import { useUser } from "../../../../../auth/auth.store";

interface MessageCardProps {
  message: Message;
  onVote: (messageId: string, voteType: "upvote" | "downvote") => void;
}

export function MessageCard({ message, onVote }: MessageCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { upvoteMessage, downvoteMessage } = useChatStore();
  const user = useUser();

  const isCurrentUserVotedUp = message.current_user_vote === "upvote";
  const isCurrentUserVotedDown = message.current_user_vote === "downvote";
  const isOwnMessage = user?.userId === message.author.id;

  const handleUpvote = async () => {
    setIsLoading(true);
    try {
      upvoteMessage(message.id);
      await onVote(message.id, "upvote");
    } catch (error) {
      console.error("Failed to upvote:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownvote = async () => {
    setIsLoading(true);
    try {
      downvoteMessage(message.id);
      await onVote(message.id, "downvote");
    } catch (error) {
      console.error("Failed to downvote:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (message.is_deleted) {
    return (
      <Paper p="xs" radius="sm" bg="gray.0" withBorder>
        <Text size="sm" c="dimmed" fs="italic">
          This message has been deleted
        </Text>
      </Paper>
    );
  }

  return (
    <Group gap="xs" wrap="nowrap" align="flex-start" justify={isOwnMessage ? "flex-end" : "flex-start"} w="100%">
      {/* Avatar - only show for other users */}
      {!isOwnMessage && (
        <Avatar name={message.author.full_name} size="sm" color="blue" />
      )}

      {/* Message Container */}
      <Stack gap={0} style={{ maxWidth: "70%" }}>
        {/* Author Info - only show for other users */}
        {!isOwnMessage && (
          <Group gap="xs" mb="xs">
            <Text size="xs" fw={600}>
              {message.author.full_name}
            </Text>
            {message.author.is_moderator && (
              <Badge size="xs" variant="light" color="blue">
                Moderator
              </Badge>
            )}
            {message.author.is_verified && (
              <Badge size="xs" variant="light" color="green">
                Verified
              </Badge>
            )}
            {message.is_solution && (
              <Badge size="xs" variant="light" color="violet">
                Solution
              </Badge>
            )}
          </Group>
        )}

        {/* Message Bubble */}
        <Paper
          p="sm"
          radius="md"
          bg={isOwnMessage ? "blue.6" : "gray.1"}
          withBorder={!isOwnMessage}
          style={{
            border: isOwnMessage ? "none" : "1px solid #e9ecef",
          }}
        >
          <Stack gap="xs">
            {/* Message Content */}
            <Text
              size="sm"
              style={{
                whiteSpace: "pre-wrap",
                lineHeight: 1.6,
              }}
              c={isOwnMessage ? "white" : "dark"}
            >
              {message.message}
            </Text>

            {/* Timestamp */}
            <Group gap="xs" justify="space-between">
              <Text size="xs" c={isOwnMessage ? "rgba(255,255,255,0.7)" : "dimmed"}>
                {message.author.district_name && `${message.author.district_name} • `}
                {new Date(message.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </Group>
          </Stack>
        </Paper>

        {/* Vote Actions - below message bubble */}
        {!isOwnMessage && (
          <Group gap="xs" mt="xs" ml="sm">
            <Group gap={2}>
              <Tooltip label="Upvote this message">
                <ActionIcon
                  variant={isCurrentUserVotedUp ? "filled" : "subtle"}
                  color={isCurrentUserVotedUp ? "blue" : "gray"}
                  size="xs"
                  onClick={handleUpvote}
                  disabled={isLoading}
                  loading={isLoading}
                >
                  <ThumbsUpIcon
                    size={14}
                    weight={isCurrentUserVotedUp ? "fill" : "regular"}
                  />
                </ActionIcon>
              </Tooltip>
              <Text size="xs" fw={500}>
                {message.upvote_count}
              </Text>
            </Group>

            <Group gap={2}>
              <Tooltip label="Downvote this message">
                <ActionIcon
                  variant={isCurrentUserVotedDown ? "filled" : "subtle"}
                  color={isCurrentUserVotedDown ? "red" : "gray"}
                  size="xs"
                  onClick={handleDownvote}
                  disabled={isLoading}
                  loading={isLoading}
                >
                  <ThumbsDownIcon
                    size={14}
                    weight={isCurrentUserVotedDown ? "fill" : "regular"}
                  />
                </ActionIcon>
              </Tooltip>
              <Text size="xs" fw={500}>
                {message.downvote_count}
              </Text>
            </Group>
          </Group>
        )}
      </Stack>

      {/* Avatar - only show for own messages on right */}
      {isOwnMessage && (
        <Avatar name={message.author.full_name} size="sm" color="blue" />
      )}
    </Group>
  );
}
