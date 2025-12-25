"use client";

import {
  Card,
  Stack,
  Group,
  Text,
  Badge,
  Button,
  ActionIcon,
  Menu,
} from "@mantine/core";
import { DotsThreeVertical, PencilIcon } from "@phosphor-icons/react";

interface AgendaOverviewProps {
  agenda: any;
  onEdit?: () => void;
}

export function AgendaOverview({ agenda, onEdit }: AgendaOverviewProps) {
  const statusColor = {
    draft: "gray",
    submitted: "blue",
    approved: "green",
    rejected: "red",
    closed: "gray",
  }[agenda.status] || "gray";

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        <Group justify="space-between" align="flex-start">
          <div>
            <Text size="xs" opacity={0.6} mb={4}>
              Status
            </Text>
            <Badge color={statusColor} size="lg">
              {agenda.status}
            </Badge>
          </div>
          {onEdit && (
            <Menu position="bottom-end">
              <Menu.Target>
                <ActionIcon variant="subtle">
                  <DotsThreeVertical size={16} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item onClick={onEdit} leftSection={<PencilIcon size={14} />}>
                  Edit
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </Group>

        <div>
          <Text size="xs" opacity={0.6} mb={4}>
            Title
          </Text>
          <Text size="lg" fw={600}>
            {agenda.title}
          </Text>
        </div>

        <Group grow>
          <div>
            <Text size="xs" opacity={0.6} mb={4}>
              Submitted By
            </Text>
            <Text size="sm">{agenda.submitted_by?.name || "-"}</Text>
          </div>
          {agenda.reviewed_by && (
            <div>
              <Text size="xs" opacity={0.6} mb={4}>
                Reviewed By
              </Text>
              <Text size="sm">{agenda.reviewed_by?.name || "-"}</Text>
            </div>
          )}
        </Group>

        <div>
          <Text size="xs" opacity={0.6} mb={4}>
            Description
          </Text>
          <Text size="sm" style={{ whiteSpace: "pre-wrap" }}>
            {agenda.description}
          </Text>
        </div>

        {agenda.location && (
          <div>
            <Text size="xs" opacity={0.6} mb={4}>
              Location
            </Text>
            <Text size="sm">{agenda.location}</Text>
          </div>
        )}
      </Stack>
    </Card>
  );
}
