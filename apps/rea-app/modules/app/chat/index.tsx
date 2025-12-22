"use client";

import { useRef, useEffect } from "react";
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

export function ModuleAppChat() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const messages = useChatStore((state) => state.messages);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [messages]);

  return (
    <>
      <Box pos="sticky" top={60} bg="dark.8">
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
                Power & Energy Crisis
              </Text>
            </Breadcrumbs>
          </Group>

          <Group gap={0}>
            <TextInput
              leftSection={<MagnifyingGlassIcon />}
              mr="xs"
              size="xs"
              placeholder="Search Power & Energy Crisis"
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

      <div
        ref={scrollContainerRef}
        style={{
          height: "calc(100vh - 180px)",
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
