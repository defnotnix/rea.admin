"use client";

import {
  Stack,
  Card,
  Group,
  Text,
  Button,
  Textarea,
  Skeleton,
  Alert,
} from "@mantine/core";
import { Warning, SendPlane } from "@phosphor-icons/react";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getThreadMessages, postMessage, type Message } from "../module.api";

interface DiscussionThreadProps {
  threadId: string;
  agendaId: string;
}

export function DiscussionThread({
  threadId,
  agendaId,
}: DiscussionThreadProps) {
  const [messageContent, setMessageContent] = useState("");

  const {
    data: messages = [],
    isLoading: messagesLoading,
    isError: messagesError,
    refetch: refetchMessages,
  } = useQuery({
    queryKey: ["thread-messages", threadId],
    queryFn: () => getThreadMessages(threadId),
    staleTime: 1000 * 30, // 30 seconds
    retry: 2,
  });

  const postMessageMutation = useMutation({
    mutationFn: (content: string) => postMessage(threadId, content),
    onSuccess: (newMessage) => {
      if (newMessage) {
        setMessageContent("");
        // Refetch messages to show the new one
        refetchMessages();
      }
    },
  });

  const handlePostMessage = () => {
    if (messageContent.trim()) {
      postMessageMutation.mutate(messageContent);
    }
  };

  return (
    <Stack gap="md">
      {/* Messages */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        {messagesLoading ? (
          <Stack gap="md">
            <Skeleton height={60} />
            <Skeleton height={60} />
            <Skeleton height={60} />
          </Stack>
        ) : messagesError ? (
          <Alert icon={<Warning size={16} />} color="red">
            Failed to load messages
          </Alert>
        ) : messages.length === 0 ? (
          <Text c="dimmed" ta="center" py="xl">
            No messages yet. Start the conversation!
          </Text>
        ) : (
          <Stack gap="md" style={{ maxHeight: "500px", overflowY: "auto" }}>
            {messages.map((message: Message) => (
              <Card
                key={message.id}
                padding="sm"
                radius="md"
                style={{ backgroundColor: "var(--mantine-color-gray-0)" }}
              >
                <Group justify="space-between" mb="xs">
                  <div>
                    <Text fw={600} size="sm">
                      {message.author.fullName}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {message.author.email}
                    </Text>
                  </div>
                  <Text size="xs" c="dimmed">
                    {new Date(message.createdAt).toLocaleDateString()}
                  </Text>
                </Group>
                <Text size="sm">{message.content}</Text>
              </Card>
            ))}
          </Stack>
        )}
      </Card>

      {/* Message Input */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="md">
          <Textarea
            placeholder="Write your message..."
            value={messageContent}
            onChange={(e) => setMessageContent(e.currentTarget.value)}
            minRows={4}
            maxRows={6}
            maxLength={5000}
          />
          <Group justify="flex-end">
            <Button
              rightSection={<SendPlane size={16} />}
              onClick={handlePostMessage}
              loading={postMessageMutation.isPending}
              disabled={!messageContent.trim()}
            >
              Send Message
            </Button>
          </Group>
          {postMessageMutation.isError && (
            <Alert icon={<Warning size={16} />} color="red">
              Failed to post message
            </Alert>
          )}
        </Stack>
      </Card>
    </Stack>
  );
}
