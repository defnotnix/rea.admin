"use client";

import { useState } from "react";
import {
  Group,
  Textarea,
  Button,
  Stack,
  Text,
  ActionIcon,
  TextInput,
} from "@mantine/core";
import { PaperPlaneRight, AtIcon, SmileyIcon } from "@phosphor-icons/react";

interface MessageFormProps {
  onSubmit: (message: string) => Promise<void>;
  disabled?: boolean;
}

export function MessageForm({ onSubmit, disabled }: MessageFormProps) {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (!message.trim()) return;

    try {
      setSending(true);
      setError(null);
      console.log("Sending message:", message);
      await onSubmit(message);
      console.log("Message sent successfully");
      setMessage("");
    } catch (err: any) {
      console.error("Error sending message:", err);
      setError(err?.message || "Failed to send message");
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="xs" px="sm">
        {error && (
          <Text size="sm" c="red">
            {error}
          </Text>
        )}
        <Group align="flex-end" gap="xs">
          <TextInput
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.currentTarget.value)}
            disabled={disabled || sending}
            style={{ flex: 1 }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !disabled && !sending) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            rightSectionWidth={160}
            rightSection={
              <Button
                w={160}
                type="submit"
                disabled={disabled || !message.trim() || sending}
                loading={sending}
                leftSection={<PaperPlaneRight size={16} weight="fill" />}
                size="sm"
              >
                Send
              </Button>
            }
          />
        </Group>
        <Text size="xs" c="dimmed">
          Press Enter to send, Shift+Enter for new line
        </Text>
      </Stack>
    </form>
  );
}
