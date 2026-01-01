"use client";

import { useState } from "react";
import { ActionIcon, Group, TextInput, Tooltip } from "@mantine/core";
import {
  AtIcon,
  PlusIcon,
  SmileyIcon,
  StickerIcon,
  PaperPlaneIcon,
} from "@phosphor-icons/react";
import { useChatStore } from "@/modules/app/chat/chat.store";
import * as chatApi from "@/modules/app/chat/chat.api";
import { notifications } from "@mantine/notifications";

interface ChatInputProps {
  threadId: string;
  token: string | null;
  userId?: string;
}

export function ChatInput({ threadId, token, userId }: ChatInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { addMessage, setError } = useChatStore();

  const handleSendMessage = async () => {
    if (!inputValue.trim()) {
      notifications.show({
        title: "Error",
        message: "Message cannot be empty",
        color: "red",
        autoClose: 3000,
      });
      return;
    }

    if (inputValue.length < 10) {
      notifications.show({
        title: "Error",
        message: "Message must be at least 10 characters long",
        color: "red",
        autoClose: 3000,
      });
      return;
    }

    if (!token) {
      notifications.show({
        title: "Error",
        message: "You must be logged in to send messages",
        color: "red",
        autoClose: 3000,
      });
      return;
    }

    setIsLoading(true);
    try {
      // Call the API to send the message
      const newMessage = await chatApi.createMessage(
        {
          thread: threadId,
          message: inputValue,
          is_solution: false,
        },
        token
      );

      // Add message to store
      addMessage(newMessage);

      // Clear input
      setInputValue("");

      notifications.show({
        title: "Success",
        message: "Message sent successfully",
        color: "green",
        autoClose: 2000,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to send message";
      setError(errorMessage);
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const isButtonDisabled = isLoading || !inputValue.trim() || inputValue.length < 10 || !token;

  return (
    <Tooltip
      label={!token ? "You must be logged in to send messages" : inputValue.length < 10 ? "Message must be at least 10 characters" : ""}
      disabled={!isButtonDisabled || isLoading}
    >
      <TextInput
        size="lg"
        value={inputValue}
        onChange={(e) => setInputValue(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading || !token}
        leftSection={
          <ActionIcon color="white" variant="subtle" size="lg">
            <PlusIcon size={20} />
          </ActionIcon>
        }
        rightSectionWidth={130}
        rightSection={
          <Group gap={0} justify="flex-end">
            <ActionIcon color="white" variant="subtle" size="lg">
              <AtIcon weight="bold" size={18} />
            </ActionIcon>
            <ActionIcon color="white" variant="subtle" size="lg">
              <StickerIcon weight="fill" size={18} />
            </ActionIcon>
            <ActionIcon color="white" variant="subtle" size="lg">
              <SmileyIcon weight="fill" size={18} />
            </ActionIcon>
            <ActionIcon
              color="blue"
              variant="subtle"
              onClick={handleSendMessage}
              disabled={isButtonDisabled}
              loading={isLoading}
              size="lg"
            >
              <PaperPlaneIcon weight="fill" size={18} />
            </ActionIcon>
          </Group>
        }
        placeholder={token ? "Message must be at least 10 characters..." : "Login to send messages"}
      />
    </Tooltip>
  );
}
