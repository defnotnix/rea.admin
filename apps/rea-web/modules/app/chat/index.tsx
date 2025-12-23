"use client";

import { useRef, useEffect, useState } from "react";
import { useParams } from "next/navigation";
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
} from "@mantine/core";
import { AgendaRender } from "./components/AgendaRender";
import { AgendaDetails } from "./components/AgendaDetails";
import { ChatInput } from "./components/ChatInput";
import { ChatRender } from "./components/ChatRender";
import { useChatStore } from "./chat.store";
import {
  BellIcon,
  CaretLeftIcon,
  MagnifyingGlassIcon,
  PaperclipIcon,
  PingPongIcon,
} from "@phosphor-icons/react";

// Chat titles mapping
const CHAT_TITLES: Record<string, string> = {
  "650e8400-e29b-41d4-a716-446655440001": "Power & Energy Crisis",
  "650e8400-e29b-41d4-a716-446655440002": "Road Infrastructure",
  "650e8400-e29b-41d4-a716-446655440003": "Air Pollution",
  "650e8400-e29b-41d4-a716-446655440004": "Water Scarcity",
  "650e8400-e29b-41d4-a716-446655440005": "Education Quality",
  "650e8400-e29b-41d4-a716-446655440006": "Healthcare Access",
  "650e8400-e29b-41d4-a716-446655440007": "Unemployment",
  "650e8400-e29b-41d4-a716-446655440008": "Corruption",
  "650e8400-e29b-41d4-a716-446655440009": "Natural Disasters",
  "650e8400-e29b-41d4-a716-446655440010": "Child Labor",
};

export function ModuleAppChat() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const messages = useChatStore((state) => state.messages);
  const chatId = params?.id as string | undefined;
  const chatTitle = chatId ? CHAT_TITLES[chatId] : "Unknown";
  const [showAgendaDetails, setShowAgendaDetails] = useState(true);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop =
          scrollContainerRef.current.scrollHeight;
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [messages]);

  return (
    <>
      <Box pos="sticky" top={60} className={styles.chatHeader}>
        <Group h={50} justify="space-between" px="md" gap={0}>
          <Group gap="xs">
            <ActionIcon size="sm" variant="subtle">
              <CaretLeftIcon />
            </ActionIcon>

            <Breadcrumbs separatorMargin={8}>
              <Text size="xs" opacity={0.5}>
                Agenda Discussion{" "}
              </Text>
              <Text size="xs" fw={600}>
                {chatTitle}
              </Text>
            </Breadcrumbs>
          </Group>

          <Group gap={0}>
            <TextInput
              leftSection={<MagnifyingGlassIcon />}
              mr="xs"
              size="xs"
              placeholder={`Search ${chatTitle}`}
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
            title="No office-bearer, representative, or affiliated member of the Party shall engage in, facilitate, or conceal any act of corruption"
            clauseNumber="Section 6 - Clause 23"
            description="Read the full clause"
            selectedByCount={2}
            selectedTime="7 days ago"
            mode="Focused discussion Mode"
            onClose={() => setShowAgendaDetails(false)}
          />
        </Box>
      )}

      <div
        ref={scrollContainerRef}
        style={{
          height: `calc(100vh - ${showAgendaDetails ? 280 : 180}px)`,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Stack gap={0}>
          <ChatRender />
        </Stack>
      </div>

      <Container size="md">
        <div
          style={{
            height: 60,
          }}
        >
          <ChatInput />
        </div>
      </Container>
    </>
  );
}
