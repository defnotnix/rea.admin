"use client";

import { useState, useMemo } from "react";
import {
  Stack,
  Button,
  Group,
  Text,
  Loader,
  Center,
  SimpleGrid,
  Card,
  Badge,
  Progress,
  Grid,
  Divider,
  ScrollArea,
  TextInput,
} from "@mantine/core";
import {
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { useSolutionManagement } from "../../hooks";
import { SolutionFormModal, DeleteSolutionModal } from "../modals";
import { Solution } from "../../types";

interface SolutionsTabProps {
  agendaId: string;
}

export function SolutionsTab({ agendaId }: SolutionsTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    solutions,
    loading,
    error,
    pagination,
    loadMoreSolutions,
    modalOpened,
    editingId,
    initialData,
    openSolutionModal,
    closeSolutionModal,
    handleSolutionSubmit,
    deleteModalOpened,
    solutionToDelete,
    isDeletingSolution,
    openDeleteModal,
    closeDeleteModal,
    handleDeleteSolution,
  } = useSolutionManagement(agendaId);

  const filteredSolutions = useMemo(() => {
    if (!searchQuery.trim()) return solutions;
    const query = searchQuery.toLowerCase();
    return solutions.filter(
      (solution) =>
        solution.title.toLowerCase().includes(query) ||
        solution.description?.toLowerCase().includes(query) ||
        solution.summary?.toLowerCase().includes(query) ||
        solution.status?.toLowerCase().includes(query)
    );
  }, [solutions, searchQuery]);

  return (
    <Stack gap="xs">
      <Group gap={0}>
        <Button
          radius={0}
          justify="flex-start"
          flex={1}
          variant="light"
          fw={600}
        >
          Pinned Solutions
        </Button>
        <TextInput
          leftSection={<MagnifyingGlassIcon size={14} />}
          placeholder="Search solutions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          //  onClearButtonClick={() => setSearchQuery("")}
          //clearable
          style={{ flex: 1 }}
        />
        <Button size="sm" radius={0} onClick={() => openSolutionModal()}>
          + New Solution
        </Button>
      </Group>

      <ScrollArea
        h={{ base: "calc(100vh - 260px)", lg: "calc(100vh - 180px)" }}
        scrollbarSize={10}
      >
        {loading ? (
          <Center py="lg">
            <Loader size="sm" />
          </Center>
        ) : filteredSolutions.length === 0 ? (
          <Text size="sm" c="dimmed" ta="center" py="xl">
            {searchQuery.trim()
              ? "No solutions match your search."
              : "No solutions proposed yet. Create one to propose a solution."}
          </Text>
        ) : (
          <>
            <SimpleGrid px="sm" cols={{ base: 1, sm: 2, lg: 3 }} spacing="xs">
              {filteredSolutions.map((solution) => (
                <SolutionCard
                  key={solution.id}
                  solution={solution}
                  onEdit={() => openSolutionModal(solution)}
                  onDelete={() => openDeleteModal(solution.id)}
                />
              ))}
            </SimpleGrid>

            {pagination.next && !searchQuery.trim() && (
              <Center py="lg">
                <Button
                  variant="light"
                  onClick={loadMoreSolutions}
                  loading={loading}
                >
                  Load More Solutions
                </Button>
              </Center>
            )}
          </>
        )}
      </ScrollArea>

      {/* Modals */}
      <SolutionFormModal
        opened={modalOpened}
        onClose={closeSolutionModal}
        onSubmit={handleSolutionSubmit}
        editingId={editingId}
        initialData={initialData}
      />

      <DeleteSolutionModal
        opened={deleteModalOpened}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteSolution}
        isLoading={isDeletingSolution}
      />

      {error && (
        <Text size="sm" c="red">
          {error}
        </Text>
      )}
    </Stack>
  );
}

interface SolutionCardProps {
  solution: Solution;
  onEdit: () => void;
  onDelete: () => void;
}

function SolutionCard({ solution, onEdit, onDelete }: SolutionCardProps) {
  return (
    <Card
      padding="md"
      radius="xs"
      withBorder
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack gap="md" style={{ flex: 1 }}>
        {/* Header with Title and Actions */}
        <Group justify="space-between" align="flex-start" gap="xs">
          <div style={{ flex: 1 }}>
            <Text size="sm" fw={700} lineClamp={2}>
              {solution.title}
            </Text>
          </div>
          <Group gap={4} onClick={(e) => e.stopPropagation()}>
            <Button size="xs" variant="subtle" p={4} onClick={onEdit}>
              <PencilIcon size={14} />
            </Button>
            <Button
              size="xs"
              variant="subtle"
              color="red"
              p={4}
              onClick={onDelete}
            >
              <TrashIcon size={14} />
            </Button>
          </Group>
        </Group>

        {/* Status Badge */}
        <Group gap="xs">
          {solution.is_featured && (
            <Badge size="sm" color="gold" variant="light">
              Featured
            </Badge>
          )}
          <Badge
            size="sm"
            variant="light"
            color={
              solution.status === "approved"
                ? "green"
                : solution.status === "pending"
                  ? "yellow"
                  : solution.status === "rejected"
                    ? "red"
                    : "gray"
            }
          >
            {solution.status || "New"}
          </Badge>
          {solution.priority && (
            <Badge
              size="sm"
              variant="light"
              color={
                solution.priority === "high"
                  ? "red"
                  : solution.priority === "medium"
                    ? "orange"
                    : "blue"
              }
            >
              {solution.priority}
            </Badge>
          )}
        </Group>

        {/* Summary */}
        {(solution.summary || solution.description) && (
          <Text size="xs" c="dimmed" lineClamp={3}>
            {solution.summary || solution.description}
          </Text>
        )}

        {/* Feasibility Score */}
        {solution.feasibility_score !== undefined && (
          <div>
            <Group justify="space-between" mb={6}>
              <Text size="xs" fw={600}>
                Feasibility
              </Text>
              <Text size="xs" fw={700}>
                {solution.feasibility_score}%
              </Text>
            </Group>
            <Progress
              value={solution.feasibility_score}
              color={
                solution.feasibility_score >= 75
                  ? "green"
                  : solution.feasibility_score >= 50
                    ? "blue"
                    : solution.feasibility_score >= 25
                      ? "yellow"
                      : "red"
              }
              size="sm"
              radius="md"
            />
          </div>
        )}

        {/* Budget and Support */}
        <Grid gutter="xs">
          {solution.estimated_budget && (
            <Grid.Col span={{ base: 12, xs: 6 }}>
              <div>
                <Text size="xs" fw={600} c="dimmed">
                  Budget
                </Text>
                <Text size="sm" fw={700}>
                  {typeof solution.estimated_budget === "number"
                    ? `Rs ${(solution.estimated_budget / 1000000).toFixed(1)}M`
                    : `Rs ${(parseFloat(solution.estimated_budget) / 1000000).toFixed(1)}M`}
                </Text>
              </div>
            </Grid.Col>
          )}
          {solution.support_count !== undefined && (
            <Grid.Col span={{ base: 12, xs: 6 }}>
              <div>
                <Text size="xs" fw={600} c="dimmed">
                  Support
                </Text>
                <Text size="sm" fw={700}>
                  {solution.support_count}{" "}
                  <Text component="span" size="xs" c="dimmed">
                    votes
                  </Text>
                </Text>
              </div>
            </Grid.Col>
          )}
        </Grid>

        {/* Footer with Metadata */}
        <Divider />
        <Group justify="space-between" gap="xs">
          <div>
            {solution.proposed_by_name && (
              <Text size="xs" c="dimmed">
                by{" "}
                <Text component="span" fw={600}>
                  {solution.proposed_by_name}
                </Text>
              </Text>
            )}
            {solution.created_at && (
              <Text size="xs" c="dimmed">
                {new Date(solution.created_at).toLocaleDateString()}
              </Text>
            )}
          </div>
        </Group>
      </Stack>
    </Card>
  );
}
