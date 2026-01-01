"use client";

import { useState } from "react";
import {
  Stack,
  Button,
  Group,
  Text,
  Loader,
  Center,
  Card,
  Badge,
  Grid,
  Modal,
  TextInput,
  Textarea,
  Select,
  SimpleGrid,
  Divider,
} from "@mantine/core";
import {
  CheckCircleIcon,
  TrashIcon,
  PencilIcon,
  FlagIcon,
} from "@phosphor-icons/react";
import { useMilestoneManagement } from "../../hooks";
import { Milestone } from "../../types";

interface MilestonesTabProps {
  agendaId?: string;
  solutionId?: string;
}

type MilestoneFormData = {
  title: string;
  description: string;
  due_date: string;
  status: "pending" | "in_progress" | "completed" | "cancelled";
};

export function MilestonesTab({ agendaId, solutionId }: MilestonesTabProps) {
  const [formData, setFormData] = useState<MilestoneFormData>({
    title: "",
    description: "",
    due_date: "",
    status: "pending",
  });

  const {
    milestones,
    loading,
    error,
    modalOpened,
    editingId,
    initialData,
    openMilestoneModal,
    closeMilestoneModal,
    handleMilestoneSubmit,
    refreshMilestones,
  } = useMilestoneManagement(solutionId || "");

  const statusColors: Record<string, string> = {
    pending: "gray",
    in_progress: "blue",
    completed: "green",
    cancelled: "red",
  };

  const statusLabels: Record<string, string> = {
    pending: "Pending",
    in_progress: "In Progress",
    completed: "Completed",
    cancelled: "Cancelled",
  };

  const handleOpenModal = (milestone?: Milestone) => {
    if (milestone) {
      setFormData({
        title: milestone.title,
        description: milestone.description || "",
        due_date: milestone.due_date || "",
        status: milestone.status,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        due_date: "",
        status: "pending",
      });
    }
    openMilestoneModal(milestone);
  };

  const handleSubmit = async () => {
    try {
      await handleMilestoneSubmit(formData);
      setFormData({
        title: "",
        description: "",
        due_date: "",
        status: "pending",
      });
    } catch (err) {
      console.error("Error submitting milestone:", err);
    }
  };

  if (!solutionId) {
    return (
      <Center h={200}>
        <Text size="sm" c="dimmed">
          Select a solution to view milestones
        </Text>
      </Center>
    );
  }

  if (loading) {
    return (
      <Center h={200}>
        <Loader size="sm" />
      </Center>
    );
  }

  return (
    <Stack gap="md" p="md">
      {error && (
        <Card withBorder bg="red.0" p="md">
          <Text size="sm" c="red">
            {error}
          </Text>
        </Card>
      )}

      {/* Header */}
      <Group justify="space-between" align="center">
        <Group gap="xs">
          <FlagIcon size={16} weight="fill" />
          <Text fw={600}>Solution Milestones</Text>
        </Group>
        <Button
          size="sm"
          onClick={() => handleOpenModal()}
        >
          Add Milestone
        </Button>
      </Group>

      <Divider />

      {/* Milestones List */}
      {milestones.length === 0 ? (
        <Center h={150}>
          <Stack gap="xs" align="center">
            <Text size="sm" c="dimmed">
              No milestones yet
            </Text>
            <Button
              variant="light"
              size="sm"
              onClick={() => handleOpenModal()}
            >
              Create First Milestone
            </Button>
          </Stack>
        </Center>
      ) : (
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
          {milestones.map((milestone) => (
            <Card key={milestone.id} withBorder p="md">
              <Stack gap="sm">
                {/* Header */}
                <Group justify="space-between" align="flex-start" wrap="nowrap">
                  <Stack gap="xs" style={{ flex: 1 }}>
                    <Text fw={600} size="sm" lineClamp={2}>
                      {milestone.title}
                    </Text>
                    <Badge
                      size="sm"
                      variant="light"
                      color={statusColors[milestone.status]}
                    >
                      {statusLabels[milestone.status]}
                    </Badge>
                  </Stack>
                  <Group gap={4}>
                    <Button
                      variant="subtle"
                      size="xs"
                      p={4}
                      onClick={() => handleOpenModal(milestone)}
                    >
                      <PencilIcon size={14} />
                    </Button>
                  </Group>
                </Group>

                {/* Description */}
                {milestone.description && (
                  <>
                    <Divider />
                    <Text size="xs" c="dimmed" lineClamp={3}>
                      {milestone.description}
                    </Text>
                  </>
                )}

                {/* Details */}
                <Divider />
                <Stack gap="xs">
                  {milestone.due_date && (
                    <Group justify="space-between" gap="xs">
                      <Text size="xs" c="dimmed">
                        Due Date
                      </Text>
                      <Text size="xs" fw={500}>
                        {new Date(milestone.due_date).toLocaleDateString()}
                      </Text>
                    </Group>
                  )}

                  {milestone.completed_at && (
                    <Group justify="space-between" gap="xs">
                      <Text size="xs" c="dimmed">
                        Completed
                      </Text>
                      <Group gap={4}>
                        <CheckCircleIcon size={14} color="green" weight="fill" />
                        <Text size="xs" fw={500}>
                          {new Date(milestone.completed_at).toLocaleDateString()}
                        </Text>
                      </Group>
                    </Group>
                  )}

                  <Group justify="space-between" gap="xs">
                    <Text size="xs" c="dimmed">
                      Created
                    </Text>
                    <Text size="xs" fw={500}>
                      {new Date(milestone.created_at).toLocaleDateString()}
                    </Text>
                  </Group>
                </Stack>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      )}

      {/* Form Modal */}
      <Modal
        opened={modalOpened}
        onClose={closeMilestoneModal}
        title={editingId ? "Edit Milestone" : "Create Milestone"}
        centered
      >
        <Stack gap="md">
          <TextInput
            label="Title"
            placeholder="Enter milestone title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.currentTarget.value })
            }
            required
          />

          <Textarea
            label="Description"
            placeholder="Enter milestone description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.currentTarget.value })
            }
            minRows={3}
          />

          <TextInput
            label="Due Date"
            type="date"
            value={formData.due_date}
            onChange={(e) =>
              setFormData({ ...formData, due_date: e.currentTarget.value })
            }
          />

          <Select
            label="Status"
            value={formData.status}
            onChange={(value) =>
              setFormData({
                ...formData,
                status: (value || "pending") as typeof formData.status,
              })
            }
            data={[
              { value: "pending", label: "Pending" },
              { value: "in_progress", label: "In Progress" },
              { value: "completed", label: "Completed" },
              { value: "cancelled", label: "Cancelled" },
            ]}
          />

          <Group justify="flex-end" gap="sm">
            <Button variant="light" onClick={closeMilestoneModal}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {editingId ? "Update" : "Create"} Milestone
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
}
