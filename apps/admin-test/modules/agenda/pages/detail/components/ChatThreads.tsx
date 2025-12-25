"use client";

import { useState, useEffect } from "react";
import {
  Card,
  Stack,
  Group,
  Text,
  Button,
  Badge,
  Loader,
  Box,
  Alert,
  Modal,
  TextInput,
} from "@mantine/core";
import { Plus } from "@phosphor-icons/react";
import { FormHandler } from "@settle/core";
import { getThreadsByAgenda } from "../../../module.api";
import { threadFormConfig } from "../form-configs";

interface ChatThreadsProps {
  agendaId: string;
  onThreadSelect?: (threadId: string) => void;
}

export function ChatThreads({ agendaId, onThreadSelect }: ChatThreadsProps) {
  const [threads, setThreads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openNewThread, setOpenNewThread] = useState(false);

  useEffect(() => {
    loadThreads();
  }, [agendaId]);

  const loadThreads = async () => {
    try {
      setLoading(true);
      const data = await getThreadsByAgenda(agendaId);
      setThreads(data?.results || []);
      setError(null);
    } catch (err: any) {
      setError(err?.message || "Failed to load threads");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSuccess = async () => {
    setOpenNewThread(false);
    await loadThreads();
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        <Group justify="space-between">
          <Text size="lg" fw={600}>
            Discussion Threads
          </Text>
          <Button
            size="xs"
            leftSection={<Plus size={14} />}
            onClick={() => setOpenNewThread(true)}
          >
            New Thread
          </Button>
        </Group>

        {error && (
          <Alert color="red" title="Error">
            {error}
          </Alert>
        )}

        {loading ? (
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "2rem",
            }}
          >
            <Loader />
          </Box>
        ) : threads.length === 0 ? (
          <Text size="sm" opacity={0.6}>
            No discussion threads yet. Create one to start a conversation.
          </Text>
        ) : (
          <Stack gap="xs">
            {threads.map((thread) => (
              <Card
                key={thread.id}
                padding="md"
                radius="sm"
                style={{ cursor: "pointer", border: "1px solid #e9ecef" }}
                onClick={() => onThreadSelect?.(thread.id)}
              >
                <Group justify="space-between" align="flex-start">
                  <Stack gap="xs" style={{ flex: 1 }}>
                    <Text size="sm" fw={500}>
                      {thread.title}
                    </Text>
                    <Group gap="xs">
                      <Badge size="sm" variant="light">
                        {thread.message_count || 0} messages
                      </Badge>
                      <Text size="xs" opacity={0.6}>
                        Created by {thread.created_by?.name || "Unknown"}
                      </Text>
                    </Group>
                  </Stack>
                </Group>
              </Card>
            ))}
          </Stack>
        )}
      </Stack>

      <Modal
        opened={openNewThread}
        onClose={() => setOpenNewThread(false)}
        title="Create New Discussion Thread"
      >
        <FormHandler
          {...threadFormConfig}
          formType="new"
          onSubmitSuccess={handleCreateSuccess}
        >
          <Stack gap="md">
            <TextInput
              name="title"
              label="Thread Title"
              placeholder="What would you like to discuss?"
              autoFocus
              required
            />
            <Group justify="flex-end">
              <Button
                variant="default"
                onClick={() => setOpenNewThread(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Create Thread</Button>
            </Group>
          </Stack>
        </FormHandler>
      </Modal>
    </Card>
  );
}
