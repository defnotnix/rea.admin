"use client";

import { useState } from "react";
import { Card, Stack, Group, Tabs, Button, Textarea, LoadingOverlay } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { deleteMessage } from "../../../../chat/module.api";
import { ChatMessageRow } from "./ChatMessageRow";

interface ChatSectionProps {
  problemId: string;
  messages: any[];
}

export function ChatSection({ problemId, messages }: ChatSectionProps) {
  const [activeTab, setActiveTab] = useState<string | null>("all");
  const [replyMessage, setReplyMessage] = useState("");
  const queryClient = useQueryClient();

  // Filter messages based on type
  const filteredMessages = () => {
    switch (activeTab) {
      case "solutions":
        return messages.filter((m) => m.is_solution === true);
      case "comments":
        return messages.filter((m) => m.is_solution !== true);
      default:
        return messages;
    }
  };

  // Delete message mutation
  const { mutate: deleteMsg, isPending: isDeletingMsg } = useMutation({
    mutationFn: (messageId: string) => deleteMessage(messageId, "admin"),
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Message deleted successfully",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["rea.chat.list", problemId] });
    },
    onError: (error) => {
      notifications.show({
        title: "Error",
        message: error instanceof Error ? error.message : "Failed to delete message",
        color: "red",
      });
    },
  });

  // Reply mutation (placeholder - API function may need to be created)
  const { mutate: sendReply, isPending: isSendingReply } = useMutation({
    mutationFn: async (text: string) => {
      // This would call an API endpoint to create a new message
      // For now, we'll just simulate it
      return { success: true };
    },
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Reply sent successfully",
        color: "green",
      });
      setReplyMessage("");
      queryClient.invalidateQueries({ queryKey: ["rea.chat.list", problemId] });
    },
    onError: (error) => {
      notifications.show({
        title: "Error",
        message: error instanceof Error ? error.message : "Failed to send reply",
        color: "red",
      });
    },
  });

  const handleDeleteMessage = (messageId: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      deleteMsg(messageId);
    }
  };

  const handleSendReply = () => {
    if (!replyMessage.trim()) {
      notifications.show({
        title: "Error",
        message: "Please enter a message",
        color: "red",
      });
      return;
    }
    sendReply(replyMessage);
  };

  return (
    <Card withBorder padding="lg" radius="md">
      <Card.Section inheritPadding py="md" withBorder>
        <Group justify="space-between">
          <h3 style={{ margin: 0, fontSize: "18px" }}>
            Messages ({messages.length})
          </h3>
        </Group>
      </Card.Section>

      <Stack gap="md">
        {/* Tabs */}
        <Tabs value={activeTab} onTabChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab value="all">
              All Messages ({messages.length})
            </Tabs.Tab>
            <Tabs.Tab value="solutions">
              Solutions ({messages.filter((m) => m.is_solution).length})
            </Tabs.Tab>
            <Tabs.Tab value="comments">
              Comments ({messages.filter((m) => !m.is_solution).length})
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>

        {/* Messages List */}
        <Stack gap="sm" style={{ maxHeight: "500px", overflowY: "auto" }}>
          {filteredMessages().length === 0 ? (
            <div style={{ padding: "20px", textAlign: "center", color: "gray" }}>
              No messages in this category
            </div>
          ) : (
            filteredMessages().map((message) => (
              <ChatMessageRow
                key={message.id || message.messageId}
                message={message}
                onDelete={() => handleDeleteMessage(message.id || message.messageId)}
              />
            ))
          )}
        </Stack>

        {/* Reply Form */}
        <Stack gap="sm" pt="md" style={{ borderTop: "1px solid var(--mantine-color-gray-2)" }}>
          <Textarea
            label="Admin Reply"
            placeholder="Type your response here..."
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.currentTarget.value)}
            minRows={3}
            disabled={isSendingReply}
          />
          <Group justify="flex-end">
            <Button
              onClick={handleSendReply}
              loading={isSendingReply}
              disabled={!replyMessage.trim()}
            >
              Send Reply
            </Button>
          </Group>
        </Stack>
      </Stack>
    </Card>
  );
}
