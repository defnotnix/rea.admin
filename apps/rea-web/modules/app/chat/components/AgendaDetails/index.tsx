"use client";

import {
  Box,
  Group,
  Stack,
  Text,
  Badge,
  ThemeIcon,
  ActionIcon,
  Container,
} from "@mantine/core";
import { Clock, MapPin, Users, X } from "@phosphor-icons/react";
import styles from "./agendaDetails.module.css";

export interface AgendaDetailsProps {
  title: string;
  description?: string;
  clauseNumber?: string;
  selectedByCount?: number;
  selectedTime?: string;
  location?: string;
  mode?: "Focused discussion Mode" | "Open discussion" | string;
  onClose?: () => void;
}

export function AgendaDetails({
  title,
  description,
  clauseNumber,
  selectedByCount,
  selectedTime,
  location,
  mode = "Focused discussion Mode",
  onClose,
}: AgendaDetailsProps) {
  return (
    <Box className={styles.agendaDetailsContainer}>
      <Container size="md" h="100%">
        <Group justify="space-between" align="flex-start" h="100%" wrap="nowrap">
       

          {/* Center Section - Content */}
          <Stack gap={6} flex={1} justify="center" ml="md" mr="md">
            {clauseNumber && (
              <Text size="xs" c="dimmed">
                {clauseNumber}
              </Text>
            )}
            <Text size="sm" fw={600} lineClamp={2}>
              {title}
            </Text>
            {description && (
              <Text size="xs" c="dimmed" lineClamp={2}>
                {description}
              </Text>
            )}

            {/* Metadata Row */}
            <Group gap="md" mt={4}>
              {selectedByCount && (
                <Group gap={4} style={{ cursor: "default" }}>
                  <ThemeIcon size="xs" variant="light" color="blue" radius="xl">
                    <Users size={12} />
                  </ThemeIcon>
                  <Text size="xs" c="dimmed">
                    Selected by {selectedByCount} public vote
                  </Text>
                </Group>
              )}

              {selectedTime && (
                <Group gap={4} style={{ cursor: "default" }}>
                  <ThemeIcon size="xs" variant="light" radius="xl">
                    <Clock size={12} />
                  </ThemeIcon>
                  <Text size="xs" c="dimmed">
                    {selectedTime}
                  </Text>
                </Group>
              )}

              {location && (
                <Group gap={4} style={{ cursor: "default" }}>
                  <ThemeIcon size="xs" variant="light" radius="xl">
                    <MapPin size={12} />
                  </ThemeIcon>
                  <Text size="xs" c="dimmed">
                    {location}
                  </Text>
                </Group>
              )}
            </Group>
          </Stack>

          {/* Right Section - Action Icons */}
          {onClose && (
            <ActionIcon
              size="sm"
              variant="subtle"
              color="gray"
              onClick={onClose}
              title="Close agenda details"
            >
              <X size={16} />
            </ActionIcon>
          )}
        </Group>
      </Container>
    </Box>
  );
}
