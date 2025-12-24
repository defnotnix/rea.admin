"use client";

import { Group, Stack, Text, Badge, ActionIcon, Tooltip, Card } from "@mantine/core";
import { ThumbsUpIcon, ThumbsDownIcon, TrashIcon } from "@phosphor-icons/react";

interface ChatMessageRowProps {
  message: any;
  onDelete: () => void;
}

export function ChatMessageRow({ message, onDelete }: ChatMessageRowProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  const getAuthorName = () => {
    return message.author_name || message.userName || "Anonymous";
  };

  return (
    <Card withBorder padding="sm" radius="md" bg="gray.0">
      <Stack gap="xs">
        {/* Header */}
        <Group justify="space-between">
          <Group>
            <Group gap="xs">
              <Text size="sm" fw={600}>
                {getAuthorName()}
              </Text>
              {message.is_solution && (
                <Badge size="xs" color="green">
                  Solution
                </Badge>
              )}
              {message.is_deleted && (
                <Badge size="xs" color="red">
                  Deleted
                </Badge>
              )}
            </Group>
          </Group>
          <Text size="xs" c="dimmed">
            {formatDate(message.created_at || message.createdAt)}
          </Text>
        </Group>

        {/* Message Content */}
        <Text
          size="sm"
          style={{
            whiteSpace: "pre-wrap",
            opacity: message.is_deleted ? 0.6 : 1,
            textDecoration: message.is_deleted ? "line-through" : "none",
          }}
        >
          {message.message_text || message.messageText || ""}
        </Text>

        {/* Footer - Votes and Actions */}
        <Group justify="space-between">
          <Group gap="xs">
            <Tooltip label="Upvotes">
              <Group gap="4">
                <ActionIcon variant="subtle" size="xs" color="gray">
                  <ThumbsUpIcon size={16} />
                </ActionIcon>
                <Text size="xs">{message.upvote_count || message.upvoteCount || 0}</Text>
              </Group>
            </Tooltip>

            <Tooltip label="Downvotes">
              <Group gap="4">
                <ActionIcon variant="subtle" size="xs" color="gray">
                  <ThumbsDownIcon size={16} />
                </ActionIcon>
                <Text size="xs">{message.downvote_count || message.downvoteCount || 0}</Text>
              </Group>
            </Tooltip>
          </Group>

          <Tooltip label="Delete message">
            <ActionIcon
              size="sm"
              color="red"
              variant="subtle"
              onClick={onDelete}
            >
              <TrashIcon size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Stack>
    </Card>
  );
}
