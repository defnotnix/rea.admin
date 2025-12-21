"use client";

import {
  Box,
  Container,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  Badge,
  Avatar,
  Button,
  Textarea,
  ScrollArea,
} from "@mantine/core";
import { PaperPlaneRight, MagnifyingGlass } from "@phosphor-icons/react";
import classes from "./global-chat.module.css";

interface Message {
  id: string;
  author: string;
  role?: string;
  content: string;
  timestamp: string;
  avatar?: string;
}

const sampleMessages: Message[] = [
  {
    id: "1",
    author: "Narayan Shrestha",
    role: "Initiator",
    content:
      "Namaste everyone! संविधान Constitutional Reform र Renewable Summit मा solution finalization गर्न तयार छु",
    timestamp: "12 days at 8:16 PM",
    avatar: "NS",
  },
  {
    id: "2",
    author: "Sanjay",
    role: "Contributor",
    content:
      "Namaste को लागि notes यहाँ छ १०-१० निर्दिष्ट meeting notes आ - और सभी उठाई clarity गर्न प्रश्न",
    timestamp: "Yesterday at 7:18 PM",
    avatar: "SJ",
  },
  {
    id: "3",
    author: "Anvith",
    role: "Moderator",
    content:
      "दिन छ। यह point नै यसको anesthesia मा समाधान गर्न चाहि? सदस्य contribution constraints नै final document को लागि संदर्भ?",
    timestamp: "8:18 PM",
    avatar: "AV",
  },
];

export default function GlobalChatPage() {
  return (
    <Box className={classes.container}>
      <Grid gutter={0} m={0} h="100%">
        <Grid.Col
          span={{ base: 12, md: 8 }}
          className={classes.chatSection}
        >
          <Stack gap={0} h="100%">
            {/* Chat Header */}
            <Box className={classes.chatHeader}>
              <Group justify="space-between" align="center">
                <div>
                  <Title order={3} size="h4">
                    party-chat/general-discussion
                  </Title>
                  <Text size="sm" c="dimmed">
                    General discussion and announcements
                  </Text>
                </div>
                <Button
                  variant="light"
                  leftSection={<MagnifyingGlass size={16} />}
                  size="sm"
                >
                  Search
                </Button>
              </Group>
            </Box>

            {/* Messages */}
            <ScrollArea className={classes.messagesArea} type="hover">
              <Stack gap="lg" p="md">
                {sampleMessages.map((msg) => (
                  <Box key={msg.id} className={classes.message}>
                    <Group gap="sm" align="flex-start">
                      <Avatar name={msg.avatar} size="md" />
                      <Stack gap={0} style={{ flex: 1 }}>
                        <Group gap="xs" align="center">
                          <Text fw={500} size="sm">
                            {msg.author}
                          </Text>
                          {msg.role && (
                            <Badge size="xs" variant="light" color="blue">
                              {msg.role}
                            </Badge>
                          )}
                          <Text size="xs" c="dimmed">
                            {msg.timestamp}
                          </Text>
                        </Group>
                        <Text size="sm" className={classes.messageContent}>
                          {msg.content}
                        </Text>
                        <Group gap="xs" mt="xs">
                          <Button
                            variant="subtle"
                            size="xs"
                            color="gray"
                          >
                            👍
                          </Button>
                          <Button
                            variant="subtle"
                            size="xs"
                            color="gray"
                          >
                            👥
                          </Button>
                          <Button
                            variant="subtle"
                            size="xs"
                            color="gray"
                          >
                            ❤️
                          </Button>
                        </Group>
                      </Stack>
                    </Group>
                  </Box>
                ))}
              </Stack>
            </ScrollArea>

            {/* Message Input */}
            <Box className={classes.inputArea}>
              <Group gap="sm" align="flex-end">
                <Textarea
                  placeholder="Message here"
                  className={classes.input}
                  rows={2}
                  autoFocus
                />
                <Button
                  p="md"
                  className={classes.sendButton}
                  rightSection={<PaperPlaneRight size={16} />}
                >
                  Send
                </Button>
              </Group>
            </Box>
          </Stack>
        </Grid.Col>

        {/* Right Sidebar - Agenda */}
        <Grid.Col
          span={{ base: 12, md: 4 }}
          className={classes.agendaSection}
        >
          <Paper className={classes.agendaBox} p="lg" radius="md">
            <Stack gap="md">
              <div>
                <Title order={4} size="h5" mb="xs">
                  Agenda
                </Title>
                <Text size="sm" c="dimmed">
                  Members Discussion Agenda
                </Text>
              </div>

              <Paper className={classes.agendaItem} p="md" radius="md">
                <Group justify="space-between" mb="xs">
                  <Badge variant="light">Section 8 - Clause 23</Badge>
                  <Text size="xs" c="dimmed">
                    Focused discussion Mode
                  </Text>
                </Group>
                <Text size="sm" fw={500} mb="xs">
                  No office-bearer, representative, or affiliated member of the
                  Party shall engage in, facilitate, or conceal any act of ...
                </Text>
                <Text size="xs" c="dimmed">
                  Selected by public vote 2 days ago
                </Text>
              </Paper>

              <Paper className={classes.agendaItem} p="md" radius="md">
                <Group justify="space-between" mb="xs">
                  <Badge variant="light">Section 5 - Clause 12</Badge>
                </Group>
                <Text size="sm" fw={500} mb="xs">
                  Party membership requirements and obligations
                </Text>
                <Text size="xs" c="dimmed">
                  Selected by public vote 3 days ago
                </Text>
              </Paper>

              <Paper className={classes.agendaItem} p="md" radius="md">
                <Group justify="space-between" mb="xs">
                  <Badge variant="light">Section 2 - Clause 5</Badge>
                </Group>
                <Text size="sm" fw={500} mb="xs">
                  Constitutional amendments and reform procedures
                </Text>
                <Text size="xs" c="dimmed">
                  Selected by public vote 5 days ago
                </Text>
              </Paper>
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
