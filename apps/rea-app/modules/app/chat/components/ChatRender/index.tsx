"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { Stack, Loader, Center, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { getRecords } from "@/modules/app/chat/chat.api";
import { useChatStore, ChatMessage } from "@/modules/app/chat/chat.store";
import { ChatThread } from "@/components/ChatCard";

interface ChatRenderProps {
  chatId?: string;
}

export function ChatRender({ chatId: propChatId }: ChatRenderProps = {}) {
  const { setMessages, getMessagesByChatId } = useChatStore();
  const params = useParams();

  // Get chatId from props, params, or URL
  const chatId = propChatId || (params?.id as string);

  const {
    data: messages,
    isLoading,
    error,
  } = useQuery<ChatMessage[]>({
    queryKey: ["chats"],
    queryFn: getRecords,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Sync fetched data to store
  useEffect(() => {
    if (messages) {
      setMessages(messages);
    }
  }, [messages, setMessages]);

  if (isLoading) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  if (error) {
    return (
      <Center>
        <Text c="red">
          {error instanceof Error ? error.message : "Failed to load chats"}
        </Text>
      </Center>
    );
  }

  if (!messages || messages.length === 0) {
    return (
      <Center>
        <Text c="dimmed">No chats available</Text>
      </Center>
    );
  }

  // If specific chatId provided, show only that chat
  if (chatId) {
    const chatMessages = getMessagesByChatId(chatId);

    if (chatMessages.length === 0) {
      return (
        <Center>
          <Text c="dimmed">Chat not found</Text>
        </Center>
      );
    }

    return (
      <Stack gap="lg">
        <ChatThread messages={chatMessages} />
      </Stack>
    );
  }

  // Otherwise, show all chats (for chat list view)
  const chatIds = Array.from(new Set(messages.map((msg) => msg.chatId)));

  return (
    <>
      {chatIds.map((id) => {
        const threadMessages = getMessagesByChatId(id);
        return <ChatThread key={id} messages={threadMessages} />;
      })}
    </>
  );
}
