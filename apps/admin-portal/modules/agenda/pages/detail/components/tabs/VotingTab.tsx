"use client";

import { Stack, Text, Card } from "@mantine/core";
import { useVotingData } from "../../hooks";

interface VotingTabProps {
  agendaId: string;
}

export function VotingTab({ agendaId }: VotingTabProps) {
  const { votingHistory, loading, error } = useVotingData(agendaId);

  return (
    <Stack gap="md">
      <Text size="sm" c="dimmed" fw={500} tt="uppercase">
        Voting Histories
      </Text>

      <Text size="sm" c="dimmed">
        Voting history information will appear here as users vote on solutions
        and comments.
      </Text>

      <Card padding="md" radius="sm" withBorder>
        <Stack gap="md">
          <Text size="sm" fw={500}>
            Recent Activity
          </Text>
          <Text size="xs" c="dimmed">
            {votingHistory.length === 0
              ? "No voting activity yet. Voting will be recorded as users interact with solutions and discussions."
              : `Total votes: ${votingHistory.length}`}
          </Text>
        </Stack>
      </Card>

      {error && (
        <Text size="sm" c="red">
          {error}
        </Text>
      )}
    </Stack>
  );
}
