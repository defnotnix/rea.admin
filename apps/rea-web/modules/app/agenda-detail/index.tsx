"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Stack, Center, Loader, Alert, Button } from "@mantine/core";
import { getAgendaById } from "./module.api";
import { useChatStore } from "@/modules/app/chat/chat.store";
import { useAuthStore } from "@/modules/auth/auth.store";
import { ChatRender } from "@/modules/app/chat/components/ChatRender";
import { ChatInput } from "@/modules/app/chat/components/ChatInput";
import { AgendaDetails } from "@/modules/app/chat/components/AgendaDetails";
import { ErrorBoundary } from "./components/ErrorBoundary";

interface Agenda {
  id: string;
  title: string;
  description?: string;
  status?: string;
  view_count?: number;
  solution_count?: number;
  has_chat?: boolean;
  submitted_by_name?: string;
  created_at?: string;
  approved_at?: string;
}

export function ModuleAppAgendaDetail() {
  const params = useParams();
  const id = params?.id as string;

  const [agenda, setAgenda] = useState<Agenda | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [showAgendaDetails, setShowAgendaDetails] = useState(true);

  const { setMessages, fetchThreads, threads } = useChatStore();
  const { token, user } = useAuthStore();

  useEffect(() => {
    if (id) {
      loadAgendaAndThreads();
    }
  }, [id]);

  const loadAgendaAndThreads = async () => {
    try {
      if (!id) {
        setError("No agenda ID provided");
        setLoading(false);
        return;
      }

      setLoading(true);
      console.log("Loading agenda with ID:", id);

      // Load agenda details
      const agendaData = await getAgendaById(id);
      console.log("Agenda loaded successfully:", agendaData);

      if (!agendaData) {
        setError("Agenda not found");
        setAgenda(null);
        setLoading(false);
        return;
      }

      setAgenda(agendaData);

      // Load threads and messages for this agenda
      await fetchThreads(id);

      // Set first thread as selected if available
      const agendaThreads = threads || [];
      if (agendaThreads.length > 0) {
        setSelectedThreadId(agendaThreads[0].id);
      } else {
        console.warn("No threads found for agenda:", id);
      }

      setError(null);
    } catch (err: any) {
      console.error("Error loading agenda:", err);
      const errorMsg = err?.message || err?.toString() || "Failed to load agenda";
      setError(errorMsg);
      setAgenda(null);
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

  if (!agenda && !loading) {
    return (
      <Stack gap="md" px="md" py="md">
        <Alert color="red" title="Error">
          {error || "Agenda not found"}
        </Alert>
        <Button onClick={() => loadAgendaAndThreads()} variant="light">
          Retry
        </Button>
      </Stack>
    );
  }

  // If still loading or no agenda, don't render the full page
  if (!agenda) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader />
      </Center>
    );
  }

  return (
    <ErrorBoundary>
      <Stack gap={0} h="100vh">
        {/* Sticky Agenda Details */}
        {showAgendaDetails && (
          <Stack gap={0} style={{ flexShrink: 0, borderBottom: "1px solid #e9ecef" }}>
            <AgendaDetails
              title={agenda.title}
              description={agenda.description}
              onClose={() => setShowAgendaDetails(false)}
            />
          </Stack>
        )}

        {/* Scrollable Chat Area */}
        <Stack gap={0} style={{ flex: 1, overflow: "hidden" }}>
          {error && (
            <Alert color="yellow" title="Warning" mx="md" mt="md">
              {error}
            </Alert>
          )}

          <Stack gap={0} p="md" style={{ flex: 1, overflow: "auto" }}>
            {selectedThreadId ? (
              <ChatRender threadId={selectedThreadId} />
            ) : (
              <Center h="100%">
                <p>No discussions available for this agenda yet</p>
              </Center>
            )}
          </Stack>

          {/* Chat Input at Bottom */}
          {selectedThreadId && (
            <Stack gap={0} p="md" style={{ flexShrink: 0, borderTop: "1px solid #e9ecef" }}>
              <ChatInput
                threadId={selectedThreadId}
                token={token}
                userId={user?.userId}
              />
            </Stack>
          )}
        </Stack>
      </Stack>
    </ErrorBoundary>
  );
}
