"use client";

import { useRef, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./chat.module.css";
import {
  ActionIcon,
  Box,
  Breadcrumbs,
  Container,
  Divider,
  Group,
  Stack,
  Text,
  TextInput,
  Loader,
  Center,
  Alert,
} from "@mantine/core";
import { AgendaRender } from "./components/AgendaRender";
import { AgendaDetails } from "./components/AgendaDetails";
import { ChatInput } from "./components/ChatInput";
import { ChatRender } from "./components/ChatRender";
import { useChatStore } from "./chat.store";
import { useAuthStore } from "@/modules/auth/auth.store";
import {
  BellIcon,
  CaretLeftIcon,
  MagnifyingGlassIcon,
  PaperclipIcon,
  WarningIcon,
} from "@phosphor-icons/react";

export function ModuleAppChat() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const params = useParams();
  const agendaId = params?.id as string | undefined;

  // Get auth state
  const { user, token, isAuthenticated } = useAuthStore();

  // Get chat state
  const { threads, currentThreadId, setCurrentThreadId, fetchThreads, loading, error } = useChatStore();
  const [showAgendaDetails, setShowAgendaDetails] = useState(true);

  // Fetch threads when agenda changes
  useEffect(() => {
    if (!agendaId) return;
    fetchThreads(agendaId);
  }, [agendaId, fetchThreads]);

  // Auto-scroll to bottom when currentThreadId changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop =
          scrollContainerRef.current.scrollHeight;
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [currentThreadId]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <Center h="100vh">
        <Loader />
      </Center>
    );
  }

  const currentThread = threads.find((t) => t.id === currentThreadId);
  const threadTitle = currentThread?.title || "Discussion";

  return (
    <>
      <Box pos="sticky" top={60} className={styles.chatHeader}>
        <Group h={50} justify="space-between" px="md" gap={0}>
          <Group gap="xs">
            <ActionIcon size="sm" variant="subtle" onClick={() => router.back()}>
              <CaretLeftIcon />
            </ActionIcon>

            <Breadcrumbs separatorMargin={8}>
              <Text size="xs" opacity={0.5}>
                Discussion
              </Text>
              <Text size="xs" fw={600}>
                {threadTitle}
              </Text>
            </Breadcrumbs>
          </Group>

          <Group gap={0}>
            <TextInput
              leftSection={<MagnifyingGlassIcon />}
              mr="xs"
              size="xs"
              placeholder={`Search discussion`}
            />
            <ActionIcon variant="subtle">
              <BellIcon />
            </ActionIcon>
            <ActionIcon variant="subtle">
              <PaperclipIcon />
            </ActionIcon>
          </Group>
        </Group>
        <Divider opacity={0.3} />
      </Box>

      {showAgendaDetails && (
        <Box pos="sticky" top={110} style={{ zIndex: 10 }}>
          <AgendaDetails
            title={currentThread?.title || "Discussion"}
            description="Share your thoughts and participate in the discussion"
            onClose={() => setShowAgendaDetails(false)}
          />
        </Box>
      )}

      {error && (
        <Alert icon={<WarningIcon />} title="Error" color="red" mx="md" mt="md">
          {error}
        </Alert>
      )}

      <div
        ref={scrollContainerRef}
        style={{
          height: `calc(100vh - ${showAgendaDetails ? 280 : 180}px)`,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {loading ? (
          <Center h="100%">
            <Loader />
          </Center>
        ) : currentThreadId ? (
          <Stack gap={0}>
            <ChatRender threadId={currentThreadId} />
          </Stack>
        ) : (
          <Center h="100%" c="dimmed">
            <Text>Select a discussion to begin</Text>
          </Center>
        )}
      </div>

      {currentThreadId && (
        <Container size="md">
          <div style={{ height: 60 }}>
            <ChatInput threadId={currentThreadId} token={token} userId={user?.userId} />
          </div>
        </Container>
      )}
    </>
  );
}
