"use client";

import { Badge, Box, Card, Container, Group, Stack, Text } from "@mantine/core";
import {
  CheckCircleIcon,
  LightbulbFilamentIcon,
  MapPinIcon,
  QuestionIcon,
} from "@phosphor-icons/react";
import { AgendaApplyForm } from "./forms/apply/form";

export function ModuleAppAgendaApply() {
  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        {/* Header Section */}
        <Box>
          <Text size="xl" fw={700} mb="xs">
            Apply for New Agenda
          </Text>
          <Text size="sm" c="dimmed">
            Submit a new problem or issue that you want the community to discuss
            and collaborate on finding solutions.
          </Text>
        </Box>

        {/* Form Card */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section withBorder inheritPadding py="md">
            <Group justify="space-between" align="center">
              <Text fw={600} size="md">
                Problem Details
              </Text>
              <Badge variant="light" size="sm">
                4 Steps
              </Badge>
            </Group>
          </Card.Section>

          <Card.Section inheritPadding py="md">
            <AgendaApplyForm />
          </Card.Section>

          {/* Guidelines Section */}
          <Card.Section withBorder inheritPadding py="md">
            <Stack gap="sm">
              <Text fw={600} size="sm">
                Guidelines for Submission:
              </Text>
              <Group gap="sm" grow align="flex-start">
                <Stack gap="xs">
                  <Group gap="xs">
                    <LightbulbFilamentIcon
                      size={16}
                      style={{ flexShrink: 0 }}
                    />
                    <Text size="sm">
                      Be clear and specific about the problem
                    </Text>
                  </Group>
                  <Group gap="xs">
                    <QuestionIcon size={16} style={{ flexShrink: 0 }} />
                    <Text size="sm">
                      Include relevant context and background
                    </Text>
                  </Group>
                </Stack>
                <Stack gap="xs">
                  <Group gap="xs">
                    <MapPinIcon size={16} style={{ flexShrink: 0 }} />
                    <Text size="sm">
                      Mention the affected district or location
                    </Text>
                  </Group>
                  <Group gap="xs">
                    <CheckCircleIcon size={16} style={{ flexShrink: 0 }} />
                    <Text size="sm">
                      Explain the impact and importance of the issue
                    </Text>
                  </Group>
                </Stack>
              </Group>
            </Stack>
          </Card.Section>
        </Card>
      </Stack>
    </Container>
  );
}
