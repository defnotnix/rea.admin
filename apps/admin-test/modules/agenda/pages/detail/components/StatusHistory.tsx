"use client";

import { useState, useEffect } from "react";
import {
  Card,
  Stack,
  Text,
  Timeline,
  Loader,
  Box,
  Alert,
} from "@mantine/core";
import { getAgendaStatusHistory } from "../../../module.api";

interface StatusHistoryProps {
  agendaId: string;
}

export function StatusHistory({ agendaId }: StatusHistoryProps) {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadHistory();
  }, [agendaId]);

  const loadHistory = async () => {
    try {
      setLoading(true);
      const data = await getAgendaStatusHistory(agendaId);
      setHistory(data?.results || []);
      setError(null);
    } catch (err: any) {
      setError(err?.message || "Failed to load status history");
    } finally {
      setLoading(false);
    }
  };

  const statusColor = {
    draft: "gray",
    submitted: "blue",
    approved: "green",
    rejected: "red",
    closed: "gray",
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        <Text size="lg" fw={600}>
          Status History
        </Text>

        {error && (
          <Alert color="red" title="Error">
            {error}
          </Alert>
        )}

        {loading ? (
          <Box style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
            <Loader />
          </Box>
        ) : history.length === 0 ? (
          <Text size="sm" opacity={0.6}>
            No status changes yet.
          </Text>
        ) : (
          <Timeline active={history.length} bulletSize={24} lineWidth={2}>
            {history.map((entry, index) => (
              <Timeline.Item
                key={entry.id}
                bullet={<Box style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: statusColor[entry.new_status] || "gray",
                }} />}
              >
                <Stack gap={4}>
                  <Text size="sm" fw={500}>
                    Changed to <strong>{entry.new_status}</strong>
                  </Text>
                  {entry.notes && (
                    <Text size="xs" opacity={0.7}>
                      {entry.notes}
                    </Text>
                  )}
                  <Text size="xs" opacity={0.5}>
                    by {entry.changed_by?.name || "System"} on{" "}
                    {new Date(entry.changed_at).toLocaleDateString()} at{" "}
                    {new Date(entry.changed_at).toLocaleTimeString()}
                  </Text>
                </Stack>
              </Timeline.Item>
            ))}
          </Timeline>
        )}
      </Stack>
    </Card>
  );
}
