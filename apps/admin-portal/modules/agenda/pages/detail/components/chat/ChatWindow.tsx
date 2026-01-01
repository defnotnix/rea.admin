"use client";

import { useRef, useEffect } from "react";
import {
  Stack,
  ScrollArea,
  Center,
  Button,
  Loader,
  Text,
  Divider,
} from "@mantine/core";
import { useMessageManagement } from "../../hooks";
import { useChatStore } from "../../hooks/useChatStore";
import { MessageCard } from "./MessageCard";
import { MessageForm } from "./MessageForm";

interface ChatWindowProps {
  threadId: string;
}

export function ChatWindow({ threadId }: ChatWindowProps) {
  // Force thread ID for testing
  const forcedThreadId = "d1c8f1bc-c836-4939-9dee-2a2437b3f218";
  const viewport = useRef<HTMLDivElement>(null);

  // Use chat store for message state
  const messages = useChatStore((state) => state.messages);
  const storeLoading = useChatStore((state) => state.loading);
  const storeError = useChatStore((state) => state.error);
  const setMessages = useChatStore((state) => state.setMessages);
  const addMessage = useChatStore((state) => state.addMessage);
  const setLoading = useChatStore((state) => state.setLoading);
  const setError = useChatStore((state) => state.setError);

  // Use message management hook
  const {
    messages: hookMessages,
    loading: hookLoading,
    error: hookError,
    pagination,
    loadMoreMessages,
    handleSendMessage: hookHandleSendMessage,
    handleToggleVote,
  } = useMessageManagement(forcedThreadId);

  // Sync hook messages to store whenever they change
  useEffect(() => {
    if (hookMessages.length > 0) {
      setMessages(hookMessages);
      setLoading(false);
    }
  }, [hookMessages, setMessages, setLoading]);

  // Sync errors
  useEffect(() => {
    if (hookError) {
      setError(hookError);
    }
  }, [hookError, setError]);

  // Sync loading
  useEffect(() => {
    setLoading(hookLoading);
  }, [hookLoading, setLoading]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (messages.length > 0 && viewport.current) {
      viewport.current.scrollTo({
        top: viewport.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages.length]);

  const handleSendMessage = async (messageText: string) => {
    try {
      // Call hook to send message
      await hookHandleSendMessage(messageText);
      // Messages will be reloaded via the hook
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (storeLoading && messages.length === 0) {
    return (
      <Center h={400}>
        <Loader size="md" />
      </Center>
    );
  }

  return (
    <Stack gap="md" h="calc(100vh - 250px)">
      {/* Messages ScrollArea */}
      <ScrollArea
        viewportRef={viewport}
        h="100%"
        scrollbarSize={8}
        style={{ flex: 1 }}
      >
        <Stack gap="sm" p="sm">
          {/* Load More Button at Top */}
          {pagination.has_previous && (
            <Center py="xs">
              <Button
                variant="subtle"
                size="xs"
                onClick={loadMoreMessages}
              >
                Load older messages
              </Button>
            </Center>
          )}

          {/* Messages List */}
          {messages.length === 0 ? (
            <Center h={200}>
              <Text size="sm" c="dimmed">
                No messages yet. Start the conversation!
              </Text>
            </Center>
          ) : (
            messages.map((message) => (
              <MessageCard
                key={message.id}
                message={message}
                onVote={handleToggleVote}
              />
            ))
          )}

          {storeError && (
            <Text size="sm" c="red" ta="center">
              {storeError}
            </Text>
          )}
        </Stack>
      </ScrollArea>

      {/* Message Form */}
      <Divider />
      <MessageForm
        onSubmit={handleSendMessage}
      />
    </Stack>
  );
}
