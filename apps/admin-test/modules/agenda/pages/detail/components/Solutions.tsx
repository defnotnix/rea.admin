"use client";

import { useState, useEffect } from "react";
import {
  Card,
  Stack,
  Group,
  Text,
  Button,
  Badge,
  Loader,
  Box,
  Alert,
  TextInput,
  Textarea,
  Modal,
  Select,
} from "@mantine/core";
import { Plus } from "@phosphor-icons/react";
import { FormHandler } from "@settle/core";
import { getSolutionsByAgenda } from "../../../module.api";
import { solutionFormConfig } from "../form-configs";

interface SolutionsProps {
  agendaId: string;
  userId?: string;
  onSolutionSelect?: (solutionId: string) => void;
}

export function Solutions({
  agendaId,
  userId,
  onSolutionSelect,
}: SolutionsProps) {
  const [solutions, setSolutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openNew, setOpenNew] = useState(false);

  useEffect(() => {
    loadSolutions();
  }, [agendaId]);

  const loadSolutions = async () => {
    try {
      setLoading(true);
      const data = await getSolutionsByAgenda(agendaId);
      setSolutions(data?.results || []);
      setError(null);
    } catch (err: any) {
      setError(err?.message || "Failed to load solutions");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSuccess = async () => {
    setOpenNew(false);
    await loadSolutions();
  };

  const statusColor = {
    draft: "gray",
    proposed: "blue",
    reviewed: "yellow",
    approved: "green",
    rejected: "red",
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        <Group justify="space-between">
          <Text size="lg" fw={600}>
            Solutions
          </Text>
          <Button
            size="xs"
            leftSection={<Plus size={14} />}
            onClick={() => setOpenNew(true)}
          >
            Propose Solution
          </Button>
        </Group>

        {error && (
          <Alert color="red" title="Error">
            {error}
          </Alert>
        )}

        {loading ? (
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "2rem",
            }}
          >
            <Loader />
          </Box>
        ) : solutions.length === 0 ? (
          <Text size="sm" opacity={0.6}>
            No solutions proposed yet. Be the first to propose one.
          </Text>
        ) : (
          <Stack gap="xs">
            {solutions.map((solution) => (
              <Card
                key={solution.id}
                padding="md"
                radius="sm"
                style={{ cursor: "pointer", border: "1px solid #e9ecef" }}
                onClick={() => onSolutionSelect?.(solution.id)}
              >
                <Group justify="space-between" align="flex-start">
                  <Stack gap="xs" style={{ flex: 1 }}>
                    <Group justify="space-between">
                      <Text size="sm" fw={500}>
                        {solution.title}
                      </Text>
                      <Badge
                        color={statusColor[solution.status] || "gray"}
                        size="sm"
                      >
                        {solution.status}
                      </Badge>
                    </Group>
                    <Text size="xs" opacity={0.7}>
                      {solution.description}
                    </Text>
                    <Group gap="xs">
                      <Text size="xs" opacity={0.6}>
                        Proposed by {solution.proposed_by?.name || "Unknown"}
                      </Text>
                      {solution.milestones_count > 0 && (
                        <Badge size="sm" variant="light">
                          {solution.milestones_count} milestones
                        </Badge>
                      )}
                    </Group>
                  </Stack>
                </Group>
              </Card>
            ))}
          </Stack>
        )}
      </Stack>

      <Modal
        opened={openNew}
        onClose={() => setOpenNew(false)}
        title="Propose a Solution"
      >
        <FormHandler
          {...solutionFormConfig}
          formType="new"
          onSubmitSuccess={handleCreateSuccess}
        >
          <Stack gap="md">
            <TextInput
              name="title"
              label="Solution Title"
              placeholder="What is your solution?"
              required
            />
            <Textarea
              name="description"
              label="Description"
              placeholder="Describe your solution in detail..."
              minRows={4}
              required
            />
            <Select
              name="status"
              label="Status"
              data={[
                { value: "draft", label: "Draft" },
                { value: "proposed", label: "Proposed" },
              ]}
            />
            <Group justify="flex-end">
              <Button
                variant="default"
                onClick={() => setOpenNew(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Propose</Button>
            </Group>
          </Stack>
        </FormHandler>
      </Modal>
    </Card>
  );
}
