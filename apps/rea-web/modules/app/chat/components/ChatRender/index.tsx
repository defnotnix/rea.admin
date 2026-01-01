"use client";

import { useEffect } from "react";
import { Stack, Center, Text, Loader, Button } from "@mantine/core";
import { useChatStore } from "@/modules/app/chat/chat.store";
import { ChatThread } from "@/components/ChatCard";

interface ChatRenderProps {
  threadId: string;
}

export function ChatRender({ threadId }: ChatRenderProps) {
  const { messages, loading, fetchMessages, getMessagesByThreadId, pagination } = useChatStore();
  const threadMessages = getMessagesByThreadId(threadId);
  const paginationKey = `pagination:${threadId}`;
  const paginationInfo = (pagination as any)[paginationKey];

  // Fetch messages when threadId changes
  useEffect(() => {
    if (threadId) {
      fetchMessages(threadId, 1);
    }
  }, [threadId, fetchMessages]);

  if (loading && threadMessages.length === 0) {
    return (
      <Center h="100%">
        <Loader />
      </Center>
    );
  }

  if (threadMessages.length === 0) {
    return (
      <Center h="100%">
        <Text c="dimmed">No messages in this discussion yet. Be the first to contribute!</Text>
      </Center>
    );
  }

  const handleLoadMore = () => {
    const currentPage = paginationInfo?.current_page || 1;
    fetchMessages(threadId, currentPage + 1);
  };

  return (
    <Stack gap="lg">
      {paginationInfo?.has_previous && (
        <Center>
          <Button variant="default" size="sm" onClick={handleLoadMore} loading={loading}>
            Load More Messages
          </Button>
        </Center>
      )}
      <ChatThread messages={threadMessages} />
    </Stack>
  );
}
