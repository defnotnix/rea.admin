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
} from "@mantine/core";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import { TrashIcon } from "@phosphor-icons/react";
import { getAgendaById, deleteAgenda } from "../../module.api";
import { ThreadsTab, SolutionsTab, VotingTab } from "./components/tabs";
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
    <Stack gap={0}>
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
      <Grid gutter="xs" p="sm">
        {/* Left Column - Overview Card */}
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Card shadow="sm" padding="lg" radius="xs" withBorder>
            <Stack gap="sm">
              <div>
                <Text size="sm" c="dimmed" fw={500} tt="uppercase">
                  Title
                </Text>
                <Text fw={600} size="lg">
                  {agenda.title}
                </Text>
              </div>

              {agenda.description && (
                <>
                  <Divider />
                  <div>
                    <Text size="sm" c="dimmed" fw={500} tt="uppercase">
                      Description
                    </Text>
                    <Text size="sm">{agenda.description}</Text>
                  </div>
                </>
              )}

              {agenda.created_by && (
                <>
                  <Divider />
                  <div>
                    <Text size="sm" c="dimmed" fw={500} tt="uppercase">
                      Created By
                    </Text>
                    <Text size="sm">{agenda.created_by.name}</Text>
                  </div>
                </>
              )}

              {agenda.created_at && (
                <>
                  <Divider />
                  <div>
                    <Text size="sm" c="dimmed" fw={500} tt="uppercase">
                      Created
                    </Text>
                    <Text size="sm">
                      {new Date(agenda.created_at).toLocaleDateString()}
                    </Text>
                  </div>
                </>
              )}
            </Stack>
          </Card>
        </Grid.Col>

        {/* Right Column - Tabs */}
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Paper radius={0}>
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
              </Tabs.List>

              <Tabs.Panel value="threads" p="md">
                <ThreadsTab agendaId={id} />
              </Tabs.Panel>

              <Tabs.Panel value="solutions" p="md">
                <SolutionsTab agendaId={id} />
              </Tabs.Panel>

              <Tabs.Panel value="voting" p="md">
                <VotingTab agendaId={id} />
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
    </Stack>
  );
}
