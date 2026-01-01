"use client";

import { useParams } from "next/navigation";
import { Stack, Center, Text } from "@mantine/core";
import { useChatStore } from "@/modules/app/chat/chat.store";
import { ChatThread } from "@/components/ChatCard";

interface ThreadsTabProps {
  agendaId?: string;
}

export function ThreadsTab({ agendaId: propAgendaId }: ThreadsTabProps = {}) {
  const { getMessagesByChatId, messages: storeMessages } = useChatStore();
  const params = useParams();

  // Get agendaId from props, params, or URL
  const agendaId = propAgendaId || (params?.id as string);

  // Use store messages (with mock data as default)
  const messages = storeMessages && storeMessages.length > 0 ? storeMessages : [];

  if (messages.length === 0) {
    return (
      <Center>
        <Text c="dimmed">No chats available</Text>
      </Center>
    );
  }

  // If specific agendaId provided, show only that agenda's chats
  if (agendaId) {
    const agendaMessages = getMessagesByChatId(agendaId);

    if (agendaMessages.length === 0) {
      return (
        <Center>
          <Text c="dimmed">Chat not found</Text>
        </Center>
      );
    }

    return (
      <Stack gap="lg">
        <ChatThread messages={agendaMessages} />
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
