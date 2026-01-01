"use client";

import { Stack, Button, Group, Text, Loader, Center } from "@mantine/core";
import { useThreadManagement } from "../../hooks";
import { ChatWindow } from "../chat";

interface ThreadsTabProps {
  agendaId: string;
}

export function ThreadsTab({ agendaId }: ThreadsTabProps) {
  const { thread, loading } = useThreadManagement(agendaId);

  if (loading) {
    return (
      <Center h={400}>
        <Loader size="md" />
      </Center>
    );
  }

  if (!thread) {
    return (
      <Text size="sm" c="dimmed" ta="center" py="xl">
        No discussion thread yet. Start a conversation to engage with team
        members.
      </Text>
    );
  }

  return (
    <Stack gap="xs">
      {/* Thread Header */}
      <Group gap={0}>
        <Button
          radius={0}
          justify="flex-start"
          flex={1}
          variant="light"
          size="sm"
        >
          {thread.title || `Discussion Thread: ${thread.id}`}
        </Button>
      </Group>

      {/* Chat Window */}
      <ChatWindow threadId={thread.id} />
    </Stack>
  );
}
