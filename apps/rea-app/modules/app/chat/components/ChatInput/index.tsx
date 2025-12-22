"use client";

import { useState } from "react";
import { ActionIcon, Group, TextInput } from "@mantine/core";
import {
  AtIcon,
  GifIcon,
  PlusIcon,
  SmileyIcon,
  StickerIcon,
  PaperPlaneIcon,
} from "@phosphor-icons/react";
import { useChatStore } from "@/modules/app/chat/chat.store";
import { sendMessage } from "@/modules/app/chat/chat.api";

interface ChatInputProps {
  chatId?: string;
  userId?: string;
}

export function ChatInput({ chatId = "650e8400-e29b-41d4-a716-446655440001", userId = "current-user" }: ChatInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { addMessage } = useChatStore();

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    setIsLoading(true);
    try {
      // Call the API to send the message
      const newMessage = await sendMessage(chatId, inputValue, userId);

      // Add message to store
      addMessage(newMessage);

      // Clear input
      setInputValue("");
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <TextInput
      size="lg"
      value={inputValue}
      onChange={(e) => setInputValue(e.currentTarget.value)}
      onKeyDown={handleKeyDown}
      disabled={isLoading}
      leftSection={
        <ActionIcon color="white" variant="subtle">
          <PlusIcon />
        </ActionIcon>
      }
      rightSectionWidth={130}
      rightSection={
        <Group gap={0} justify="flex-end">
          <ActionIcon color="white" variant="subtle">
            <AtIcon weight="bold" />
          </ActionIcon>
          <ActionIcon color="white" variant="subtle">
            <StickerIcon weight="fill" />
          </ActionIcon>
          <ActionIcon color="white" variant="subtle">
            <SmileyIcon weight="fill" />
          </ActionIcon>
          <ActionIcon
            color="blue"
            variant="subtle"
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
            loading={isLoading}
          >
            <PaperPlaneIcon weight="fill" />
          </ActionIcon>
        </Group>
      }
      placeholder="Chat here.."
    />
  );
}
