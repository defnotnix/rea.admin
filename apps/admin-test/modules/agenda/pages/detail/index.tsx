"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Stack,
  Container,
  Button,
  Group,
  Tabs,
  Loader,
  Center,
  Alert,
} from "@mantine/core";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import { getAgendaById } from "../../module.api";
import { AgendaOverview } from "./components/AgendaOverview";
import { ChatThreads } from "./components/ChatThreads";
import { ThreadMessages } from "./components/ThreadMessages";
import { Solutions } from "./components/Solutions";
import { StatusHistory } from "./components/StatusHistory";

interface AgendaDetailProps {
  id: string;
  currentUserId?: string;
}

export function AgendaDetail({ id, currentUserId }: AgendaDetailProps) {
  const router = useRouter();
  const [agenda, setAgenda] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>("overview");

  useEffect(() => {
    loadAgenda();
  }, [id]);

  const loadAgenda = async () => {
    try {
      setLoading(true);
      const data = await getAgendaById(id);
      setAgenda(data);
      setError(null);
    } catch (err: any) {
      setError(err?.message || "Failed to load agenda");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader />
      </Center>
    );
  }

  if (error || !agenda) {
    return (
      <Stack gap="xl" p="sm">
        <Group justify="space-between" px="md">
          <Button
            variant="subtle"
            onClick={() => router.back()}
            leftSection={<ArrowLeftIcon />}
          >
            Back
          </Button>
        </Group>
        <Container>
          <Alert color="red" title="Error">
            {error || "Agenda not found"}
          </Alert>
        </Container>
      </Stack>
    );
  }

  return (
    <Stack gap="xl" p="sm">
      {/* Header with Back Button */}
      <Group justify="space-between" px="md">
        <Button
          variant="subtle"
          onClick={() => router.back()}
          leftSection={<ArrowLeftIcon />}
        >
          Back
        </Button>
        <div>
          <h1 style={{ margin: 0, fontSize: "24px", fontWeight: 600 }}>
            {agenda.title}
          </h1>
        </div>
      </Group>

      <Container size="xl">
        {selectedThread ? (
          <Stack gap="lg">
            <Button
              variant="subtle"
              size="sm"
              onClick={() => setSelectedThread(null)}
            >
              ← Back to Threads
            </Button>
            <ThreadMessages
              threadId={selectedThread}
              currentUserId={currentUserId}
              onClose={() => setSelectedThread(null)}
            />
          </Stack>
        ) : (
          <Tabs value={activeTab} onChange={setActiveTab}>
            <Tabs.List>
              <Tabs.Tab value="overview">Overview</Tabs.Tab>
              <Tabs.Tab value="discussions">Discussions</Tabs.Tab>
              <Tabs.Tab value="solutions">Solutions</Tabs.Tab>
              <Tabs.Tab value="history">Status History</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="overview" pt="lg">
              <Stack gap="lg">
                <AgendaOverview agenda={agenda} />
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="discussions" pt="lg">
              <Stack gap="lg">
                <ChatThreads
                  agendaId={id}
                  onThreadSelect={(threadId) => {
                    setSelectedThread(threadId);
                  }}
                />
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="solutions" pt="lg">
              <Stack gap="lg">
                <Solutions agendaId={id} userId={currentUserId} />
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="history" pt="lg">
              <Stack gap="lg">
                <StatusHistory agendaId={id} />
              </Stack>
            </Tabs.Panel>
          </Tabs>
        )}
      </Container>
    </Stack>
  );
}
