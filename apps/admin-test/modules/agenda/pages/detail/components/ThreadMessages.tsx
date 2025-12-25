"use client";

import { useState, useEffect } from "react";
import {
  Card,
  Stack,
  Group,
  Text,
  Loader,
  Box,
  Alert,
  Textarea,
  Button,
  ActionIcon,
  Menu,
  Badge,
} from "@mantine/core";
import { ThumbsUp, DotsThreeVertical, Trash } from "@phosphor-icons/react";
import { FormHandler } from "@settle/core";
import {
  getMessagesByThread,
  deleteMessage,
  toggleVote,
} from "../../../module.api";
import { messageFormConfig } from "../form-configs";

interface ThreadMessagesProps {
  threadId: string;
  currentUserId?: string;
  onClose?: () => void;
}

export function ThreadMessages({
  threadId,
  currentUserId,
  onClose,
}: ThreadMessagesProps) {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadMessages();
  }, [threadId]);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const data = await getMessagesByThread(threadId);
      setMessages(data?.results || []);
      setError(null);
    } catch (err: any) {
      setError(err?.message || "Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const handlePostSuccess = async () => {
    await loadMessages();
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      await deleteMessage(messageId, currentUserId);
      await loadMessages();
    } catch (err: any) {
      setError(err?.message || "Failed to delete message");
    }
  };

  const handleVote = async (messageId: string) => {
    try {
      await toggleVote({
        message: messageId,
        voter: currentUserId,
        vote_type: "up",
      });
      await loadMessages();
    } catch (err: any) {
      setError(err?.message || "Failed to vote");
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        <Group justify="space-between">
          <Text size="lg" fw={600}>
            Discussion Messages
          </Text>
          {onClose && (
            <Button variant="subtle" size="xs" onClick={onClose}>
              Close
            </Button>
          )}
        </Group>

        {error && (
          <Alert color="red" title="Error">
            {error}
          </Alert>
        )}

        {loading ? (
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "2rem",
            }}
          >
            <Loader />
          </Box>
        ) : (
          <>
            {messages.length === 0 ? (
              <Text size="sm" opacity={0.6}>
                No messages yet. Be the first to start the conversation!
              </Text>
            ) : (
              <Stack gap="md" style={{ maxHeight: "400px", overflowY: "auto" }}>
                {messages.map((message) => (
                  <Card
                    key={message.id}
                    padding="sm"
                    radius="sm"
                    style={{ backgroundColor: "#f8f9fa" }}
                  >
                    <Stack gap="xs">
                      <Group justify="space-between" align="flex-start">
                        <Stack gap={2}>
                          <Text size="sm" fw={500}>
                            {message.author?.name || "Unknown"}
                          </Text>
                          <Text size="xs" opacity={0.6}>
                            {new Date(message.created_at).toLocaleDateString()}{" "}
                            at{" "}
                            {new Date(message.created_at).toLocaleTimeString()}
                          </Text>
                        </Stack>
                        {currentUserId === message.author?.id && (
                          <Menu position="bottom-end">
                            <Menu.Target>
                              <ActionIcon variant="subtle" size="xs">
                                <DotsThreeVertical size={14} />
                              </ActionIcon>
                            </Menu.Target>
                            <Menu.Dropdown>
                              <Menu.Item
                                onClick={() => handleDeleteMessage(message.id)}
                                leftSection={<Trash size={14} />}
                                color="red"
                              >
                                Delete
                              </Menu.Item>
                            </Menu.Dropdown>
                          </Menu>
                        )}
                      </Group>

                      <Text size="sm">{message.content}</Text>

                      <Group gap="xs">
                        <ActionIcon
                          variant="subtle"
                          size="xs"
                          onClick={() => handleVote(message.id)}
                        >
                          <ThumbsUp size={14} />
                        </ActionIcon>
                        <Badge size="sm" variant="light">
                          {message.vote_count || 0} votes
                        </Badge>
                      </Group>
                    </Stack>
                  </Card>
                ))}
              </Stack>
            )}

            <FormHandler
              {...messageFormConfig}
              formType="new"
              onSubmitSuccess={handlePostSuccess}
            >
              <Stack gap="sm">
                <Textarea
                  name="content"
                  label="Add Message"
                  placeholder="Share your thoughts..."
                  minRows={3}
                  required
                />
                <Button type="submit">Post Message</Button>
              </Stack>
            </FormHandler>
          </>
        )}
      </Stack>
    </Card>
  );
}
