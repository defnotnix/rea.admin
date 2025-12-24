"use client";

import { Card, Stack, Group, Text, Badge, Divider } from "@mantine/core";

const statusColors: { [key: string]: string } = {
  pending: "yellow",
  approved: "blue",
  rejected: "red",
  solved: "green",
};

interface ProblemInfoCardProps {
  problem: any;
}

export function ProblemInfoCard({ problem }: ProblemInfoCardProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  return (
    <Card withBorder padding="lg" radius="md">
      <Stack gap="md">
        {/* Title and Status */}
        <Group justify="space-between">
          <div>
            <Text size="sm" c="dimmed" fw={500}>
              Title
            </Text>
            <Text size="lg" fw={600}>
              {problem.title}
            </Text>
          </div>
          <Badge color={statusColors[problem.status] || "gray"} size="lg">
            {problem.status}
          </Badge>
        </Group>

        <Divider />

        {/* Description */}
        <div>
          <Text size="sm" c="dimmed" fw={500}>
            Description
          </Text>
          <Text size="sm" style={{ whiteSpace: "pre-wrap", marginTop: "8px" }}>
            {problem.description}
          </Text>
        </div>

        <Divider />

        {/* District and Submission Info */}
        <Group grow>
          <div>
            <Text size="sm" c="dimmed" fw={500}>
              District
            </Text>
            <Text size="sm">{problem.district_name || "Unknown"}</Text>
          </div>
          <div>
            <Text size="sm" c="dimmed" fw={500}>
              Submitted By
            </Text>
            <Text size="sm">{problem.submitted_by_name || "Anonymous"}</Text>
          </div>
        </Group>

        {/* Timestamps */}
        <Group grow>
          <div>
            <Text size="sm" c="dimmed" fw={500}>
              Submitted At
            </Text>
            <Text size="xs">{formatDate(problem.submitted_at)}</Text>
          </div>
          {problem.rejection_reason && (
            <div>
              <Text size="sm" c="dimmed" fw={500}>
                Rejection Reason
              </Text>
              <Text size="xs" c="red">
                {problem.rejection_reason}
              </Text>
            </div>
          )}
        </Group>
      </Stack>
    </Card>
  );
}
