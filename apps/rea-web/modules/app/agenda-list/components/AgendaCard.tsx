"use client";

import { Card, Stack, Text, Button, Group, Badge } from "@mantine/core";
import { Users } from "@phosphor-icons/react";
import { useState } from "react";
import type { Agenda } from "../module.api";

interface AgendaCardProps {
  agenda: Agenda;
}

export function AgendaCard({ agenda }: AgendaCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        h="100%"
        style={{
          cursor: "pointer",
          transition: "all 0.2s ease",
          boxShadow: isHovered ? "0 8px 16px rgba(0, 0, 0, 0.15)" : "0 1px 3px rgba(0, 0, 0, 0.12)",
          transform: isHovered ? "translateY(-2px)" : "translateY(0)",
        }}
      >
        <Stack h="100%" justify="space-between" gap="md">
          {/* Header with Title and Type Badge */}
          <div>
            <Group justify="space-between" align="flex-start" mb="sm">
              <Text fw={700} size="lg" lineClamp={3} style={{ flex: 1 }}>
                {agenda.title}
              </Text>
              <Badge
                size="sm"
                variant="light"
                color={agenda.type === "nation" ? "blue" : "grape"}
              >
                {agenda.type === "nation" ? "Nation" : agenda.district}
              </Badge>
            </Group>

            <Text size="sm" c="dimmed" lineClamp={2}>
              {agenda.description}
            </Text>
          </div>

          {/* Footer with Participants */}
          <Group gap="xs">
            <Users size={16} weight="fill" color="var(--mantine-color-gray-6)" />
            <Text size="sm" fw={500}>
              {agenda.participantCount} {agenda.participantCount === 1 ? "participant" : "participants"}
            </Text>
          </Group>
        </Stack>
      </Card>

      {/* Fixed overlay button on bottom-right */}
      {isHovered && (
        <Button
          size="xs"
          variant="filled"
          onClick={() => {
            // TODO: Navigate to agenda detail page
            console.log("View agenda:", agenda.slug);
          }}
          style={{
            position: "absolute",
            bottom: 12,
            right: 12,
            zIndex: 10,
            animation: "fadeIn 0.2s ease",
          }}
        >
          Join Discussion
        </Button>
      )}
    </div>
  );
}
