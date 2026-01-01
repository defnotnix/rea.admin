"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Stack,
  Button,
  Group,
  Text,
  Divider,
  Badge,
  Grid,
  Loader,
  Center,
  Alert,
  Card,
  Paper,
  Modal,
  Tabs,
  Progress,
  ThemeIcon,
  SimpleGrid,
  ScrollArea,
} from "@mantine/core";
import {
  ArrowLeftIcon,
  TrashIcon,
  EyeIcon,
  ChatIcon,
  CalendarIcon,
  UserIcon,
  HeartIcon,
} from "@phosphor-icons/react";
import { getAgendaById, deleteAgenda } from "../../module.api";
import { ThreadsTab, SolutionsTab, VotingTab, MilestonesTab } from "./components/tabs";
import { Agenda } from "./types";

interface AgendaDetailProps {
  id?: string;
  currentUserId?: string;
}

export function AgendaDetail({ id: propId, currentUserId }: AgendaDetailProps) {
  const router = useRouter();
  const params = useParams();

  const id = propId || (params?.id as string);

  const [agenda, setAgenda] = useState<Agenda | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>("threads");

  useEffect(() => {
    if (id) {
      loadAgenda();
    }
  }, [id]);

  const loadAgenda = async () => {
    try {
      setLoading(true);
      const data = await getAgendaById(id);
      setAgenda(data);
      setError(null);
    } catch (err: any) {
      setError(err?.message || "Failed to load agenda");
      setAgenda(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteAgenda(id);
      router.back();
    } catch (err: any) {
      setError(err?.message || "Failed to delete agenda");
    } finally {
      setDeleting(false);
      setDeleteModalOpened(false);
    }
  };

  if (loading) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader />
      </Center>
    );
  }

  if (error || !agenda) {
    return (
      <Stack gap="md" px="md">
        <Group justify="space-between">
          <Group>
            <Button
              radius={0}
              variant="light"
              leftSection={<ArrowLeftIcon />}
              onClick={() => router.back()}
            >
              Back to Agenda
            </Button>
            <Text size="xs" fw={600}>
              Agenda Profile
            </Text>
          </Group>
        </Group>
        <Divider />
        <Alert color="red" title="Error">
          {error || "Agenda not found"}
        </Alert>
      </Stack>
    );
  }

  return (
    <>
      {/* Header Section */}
      <div>
        <Group justify="space-between">
          <Group>
            <Button
              radius={0}
              variant="light"
              leftSection={<ArrowLeftIcon />}
              onClick={() => router.back()}
            >
              Back to Agenda
            </Button>
            <Text size="xs" fw={600}>
              Agenda Profile
            </Text>
          </Group>

          <Group pr="md" gap="xs">
            <Badge color="teal" variant="dot">
              {agenda.status || "Active"}
            </Badge>

            <Button
              leftSection={<TrashIcon />}
              variant="light"
              size="xs"
              color="red"
              onClick={() => setDeleteModalOpened(true)}
            >
              Delete Agenda
            </Button>
          </Group>
        </Group>
        <Divider />
      </div>

      {/* Main Content Grid */}
      <Grid gutter={0}>
        {/* Left Sidebar */}
        <Grid.Col span={{ base: 12, lg: 3 }} p="xl">
          <Stack gap="lg">
            {/* Title Section */}
            <div>
              <Text size="xs" c="dimmed" fw={600} tt="uppercase" mb="xs">
                Agenda Title
              </Text>
              <Text fw={700} size="md" lineClamp={4}>
                {agenda.title}
              </Text>
            </div>

            <Divider />

            {/* Description */}
            {agenda.description && (
              <div>
                <Text size="xs" c="dimmed" fw={600} tt="uppercase" mb="xs">
                  Description
                </Text>
                <Text size="xs" lineClamp={5}>
                  {agenda.description}
                </Text>
              </div>
            )}

            {agenda.description && <Divider />}

            {/* Statistics */}
            <div>
              <Text size="xs" c="dimmed" fw={600} tt="uppercase" mb="md">
                Statistics
              </Text>
              <Stack gap="sm">
                <Group justify="space-between">
                  <Group gap="xs">
                    <EyeIcon weight="duotone" size={14} />
                    <Text size="xs" fw={500}>
                      Views
                    </Text>
                  </Group>
                  <Text size="sm" fw={700}>
                    {agenda.view_count || 0}
                  </Text>
                </Group>
                <Group justify="space-between">
                  <Group gap="xs">
                    <HeartIcon weight="duotone" size={14} />
                    <Text size="xs" fw={500}>
                      Solutions
                    </Text>
                  </Group>
                  <Text size="sm" fw={700}>
                    {agenda.solution_count || 0}
                  </Text>
                </Group>
                <Group justify="space-between">
                  <Group gap="xs">
                    <ChatIcon weight="duotone" size={14} />
                    <Text size="xs" fw={500}>
                      Discussion
                    </Text>
                  </Group>
                  <Badge
                    size="xs"
                    variant="dot"
                    color={agenda.has_chat ? "green" : "gray"}
                  >
                    {agenda.has_chat ? "Active" : "Inactive"}
                  </Badge>
                </Group>
              </Stack>
            </div>

            <Divider />

            {/* Status */}
            <div>
              <Text size="xs" c="dimmed" fw={600} tt="uppercase" mb="xs">
                Status
              </Text>
              <Badge
                size="sm"
                variant="filled"
                color={
                  agenda.status === "approved"
                    ? "green"
                    : agenda.status === "pending"
                      ? "yellow"
                      : agenda.status === "rejected"
                        ? "red"
                        : "gray"
                }
              >
                {agenda.status || "Active"}
              </Badge>
            </div>

            <Divider />

            {/* Metadata */}
            <div>
              <Text size="xs" c="dimmed" fw={600} tt="uppercase" mb="md">
                Details
              </Text>
              <Stack gap="sm">
                {agenda.submitted_by_name && (
                  <div>
                    <Text size="xs" c="dimmed" fw={500} mb="xs">
                      Submitted By
                    </Text>
                    <Text size="xs" fw={500}>
                      {agenda.submitted_by_name}
                    </Text>
                  </div>
                )}

                {agenda.created_at && (
                  <div>
                    <Text size="xs" c="dimmed" fw={500} mb="xs">
                      Created
                    </Text>
                    <Text size="xs" fw={500}>
                      {new Date(agenda.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Text>
                  </div>
                )}

                {agenda.approved_at && (
                  <div>
                    <Text size="xs" c="dimmed" fw={500} mb="xs">
                      Approved
                    </Text>
                    <Text size="xs" fw={500}>
                      {new Date(agenda.approved_at).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </Text>
                  </div>
                )}
              </Stack>
            </div>
          </Stack>
        </Grid.Col>

        {/* Right Column - Tabs */}
        <Grid.Col span={{ base: 12, lg: 9 }} pr={{ lg: "md" }}>
          <Paper
            radius={0}
            style={{
              borderLeft: "1px solid #e9ecef",
              minHeight: "calc(100vh - 90px)",
            }}
          >
            <Tabs value={activeTab} onChange={setActiveTab}>
              <Tabs.List>
                <Tabs.Tab value="threads">
                  <Text size="xs" fw={600}>
                    Threads
                  </Text>
                </Tabs.Tab>
                <Tabs.Tab value="solutions">
                  <Text size="xs" fw={600}>
                    Solutions
                  </Text>
                </Tabs.Tab>
                <Tabs.Tab value="voting">
                  <Text size="xs" fw={600}>
                    Voting History
                  </Text>
                </Tabs.Tab>
                <Tabs.Tab value="milestones">
                  <Text size="xs" fw={600}>
                    Milestones
                  </Text>
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="threads">
                <ThreadsTab agendaId={id} />
              </Tabs.Panel>

              <Tabs.Panel value="solutions">
                <SolutionsTab agendaId={id} />
              </Tabs.Panel>

              <Tabs.Panel value="voting">
                <VotingTab agendaId={id} />
              </Tabs.Panel>

              <Tabs.Panel value="milestones">
                <MilestonesTab agendaId={id} />
              </Tabs.Panel>
            </Tabs>
          </Paper>
        </Grid.Col>
      </Grid>

      {/* Delete Confirmation Modal */}
      <Modal
        opened={deleteModalOpened}
        onClose={() => setDeleteModalOpened(false)}
        title="Delete Agenda"
        centered
      >
        <Stack gap="md">
          <Text>
            Are you sure you want to delete this agenda? This action cannot be
            undone.
          </Text>
          <Group justify="flex-end">
            <Button
              variant="default"
              onClick={() => setDeleteModalOpened(false)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button color="red" onClick={handleDelete} loading={deleting}>
              Delete
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
