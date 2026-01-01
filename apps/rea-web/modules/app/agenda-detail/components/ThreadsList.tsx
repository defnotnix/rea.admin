"use client";

import {
  Stack,
  Card,
  Group,
  Text,
  Button,
  Badge,
  Modal,
  TextInput,
  Textarea,
} from "@mantine/core";
import { ChatDots, Plus } from "@phosphor-icons/react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createThread, type Thread } from "../module.api";

interface ThreadsListProps {
  threads: Thread[];
  onSelectThread: (threadId: string) => void;
  agendaId: string;
}

export function ThreadsList({
  threads,
  onSelectThread,
  agendaId,
}: ThreadsListProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [threadTitle, setThreadTitle] = useState("");

  const createThreadMutation = useMutation({
    mutationFn: (title: string) => createThread(agendaId, title),
    onSuccess: (newThread) => {
      if (newThread) {
        setThreadTitle("");
        setIsCreateModalOpen(false);
        // Optionally select the new thread
        // onSelectThread(newThread.id);
      }
    },
  });

  const handleCreateThread = () => {
    if (threadTitle.trim()) {
      createThreadMutation.mutate(threadTitle);
    }
  };

  if (threads.length === 0) {
    return (
      <Stack gap="md" align="center" justify="center" py="xl">
        <ChatDots size={32} opacity={0.5} />
        <Text c="dimmed">No discussions yet</Text>
        <Button
          leftSection={<Plus size={16} />}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Start a Discussion
        </Button>

        <Modal
          opened={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Start New Discussion"
        >
          <Stack gap="md">
            <TextInput
              label="Discussion Title"
              placeholder="Enter discussion title"
              value={threadTitle}
              onChange={(e) => setThreadTitle(e.currentTarget.value)}
              minLength={3}
              maxLength={255}
            />
            <Group justify="flex-end">
              <Button
                variant="light"
                onClick={() => setIsCreateModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateThread}
                loading={createThreadMutation.isPending}
              >
                Create
              </Button>
            </Group>
          </Stack>
        </Modal>
      </Stack>
    );
  }

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Text fw={600}>Discussions ({threads.length})</Text>
        <Button
          size="sm"
          leftSection={<Plus size={16} />}
          onClick={() => setIsCreateModalOpen(true)}
        >
          New Discussion
        </Button>
      </Group>

      {threads.map((thread) => (
        <Card
          key={thread.id}
          shadow="sm"
          padding="md"
          radius="md"
          withBorder
          style={{ cursor: "pointer" }}
          onClick={() => onSelectThread(thread.id)}
        >
          <Stack gap="sm">
            <Group justify="space-between" align="flex-start">
              <div style={{ flex: 1 }}>
                <Text fw={600}>{thread.title}</Text>
                <Text size="sm" c="dimmed">
                  {thread.createdBy && `Started by ${thread.createdBy}`}
                </Text>
              </div>
              <Badge size="sm" variant="light">
                {thread.messageCount || 0} messages
              </Badge>
            </Group>
            <Button
              variant="light"
              size="sm"
              fullWidth
              onClick={() => onSelectThread(thread.id)}
            >
              View Discussion
            </Button>
          </Stack>
        </Card>
      ))}

      <Modal
        opened={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Start New Discussion"
      >
        <Stack gap="md">
          <TextInput
            label="Discussion Title"
            placeholder="Enter discussion title"
            value={threadTitle}
            onChange={(e) => setThreadTitle(e.currentTarget.value)}
            minLength={3}
            maxLength={255}
          />
          <Group justify="flex-end">
            <Button
              variant="light"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateThread}
              loading={createThreadMutation.isPending}
              disabled={!threadTitle.trim()}
            >
              Create
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
}
