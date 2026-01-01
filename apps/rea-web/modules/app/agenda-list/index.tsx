"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import styles from "./agenda-list.module.css";
import {
  Container,
  Stack,
  Group,
  Text,
  TextInput,
  Box,
  Divider,
  SimpleGrid,
  ActionIcon,
  Button,
  Select,
  Skeleton,
  Alert,
} from "@mantine/core";
import { MagnifyingGlass, CaretLeft, Warning } from "@phosphor-icons/react";
import { getAgendas } from "./module.api";
import { AgendaCard } from "./components/AgendaCard";

export function ModuleAppAgendaList() {

  const [agendaType, setAgendaType] = useState<"all" | "nation" | "district">(
    "all"
  );
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: allAgendas = [],
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ["agendas"],
    queryFn: getAgendas,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });

  // Get unique districts
  const districts = useMemo(() => {
    const uniqueDistricts = new Set(
      allAgendas
        .filter((a) => a.type === "district" && a.district)
        .map((a) => a.district as string)
    );
    return Array.from(uniqueDistricts).sort();
  }, [allAgendas]);

  const filteredAgendas = useMemo(() => {
    let result = allAgendas;

    // Filter by type
    if (agendaType !== "all") {
      result = result.filter((a) => a.type === agendaType);
    }

    // Filter by district if applicable
    if (agendaType === "district" && selectedDistrict) {
      result = result.filter((a) => a.district === selectedDistrict);
    }

    // Filter by active agendas only
    result = result.filter((a) => a.isActive);

    // Filter by search
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        (agenda) =>
          agenda.title.toLowerCase().includes(lowerQuery) ||
          agenda.description.toLowerCase().includes(lowerQuery) ||
          agenda.problemStatement.toLowerCase().includes(lowerQuery)
      );
    }

    return result;
  }, [allAgendas, agendaType, selectedDistrict, searchQuery]);

  return (
    <Stack gap={0} h="100%">
      {/* Header Section */}
      <Box pos="sticky" top={60} className={styles.headerSection} style={{ zIndex: 100 }}>
        <Group h={50} justify="space-between" px="md" gap={0}>
          <Group gap="xs">
            <ActionIcon size="sm" variant="subtle">
              <CaretLeft size={20} />
            </ActionIcon>

            <Group gap="xs">
              <Text size="xs" opacity={0.5}>
                Agenda
              </Text>
              <Text size="xs" fw={600}>
                Discussion Forum
              </Text>
            </Group>
          </Group>

          <TextInput
            leftSection={<MagnifyingGlass size={16} />}
            placeholder="Search agendas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            size="xs"
            style={{ width: 250 }}
          />
        </Group>
        <Divider opacity={0.3} />

        {/* Type and District Filters */}
        <Group
          gap="md"
          px="md"
          py="sm"
          justify="space-between"
          align="flex-end"
        >
          <Group gap="xs">
            <Text size="sm" fw={500}>
              Type:
            </Text>
            <Button
              size="xs"
              variant={agendaType === "all" ? "filled" : "light"}
              onClick={() => {
                setAgendaType("all");
                setSelectedDistrict(null);
              }}
            >
              All
            </Button>
            <Button
              size="xs"
              variant={agendaType === "nation" ? "filled" : "light"}
              onClick={() => {
                setAgendaType("nation");
                setSelectedDistrict(null);
              }}
            >
              National Agenda
            </Button>
            <Button
              size="xs"
              variant={agendaType === "district" ? "filled" : "light"}
              onClick={() => setAgendaType("district")}
            >
              District-Level Agenda
            </Button>
          </Group>

          {agendaType === "district" && districts.length > 0 && (
            <Select
              placeholder="Select district"
              data={districts}
              value={selectedDistrict}
              onChange={setSelectedDistrict}
              searchable
              clearable
              size="xs"
              style={{ minWidth: 180 }}
              styles={{
                input: {
                  background: "none",
                  border: "none",
                },
              }}
            />
          )}
        </Group>
      </Box>

      {/* Error Alert */}
      {isError && (
        <Alert icon={<Warning size={16} />} color="red" title="Error loading agendas">
          {error instanceof Error ? error.message : "Failed to load agendas. Please try again."}
          The app will display demo data instead.
        </Alert>
      )}

      {/* Agendas Grid */}
      <Container size="lg" py="md" style={{ flex: 1, overflowY: "auto" }}>
        {isLoading ? (
          <SimpleGrid spacing="xs" cols={{ base: 1, md: 2, lg: 3 }}>
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} height={250} radius="md" />
            ))}
          </SimpleGrid>
        ) : filteredAgendas.length === 0 ? (
          <Stack gap="md" align="center" justify="center" py="xl">
            <Text c="dimmed">
              {searchQuery
                ? "No agendas match your search."
                : "No agendas found."}
            </Text>
          </Stack>
        ) : (
          <SimpleGrid spacing="xs" cols={{ base: 1, md: 2, lg: 3 }}>
            {filteredAgendas.map((agenda, index) => (
              <AgendaCard agenda={agenda} key={agenda.agendaId || index} />
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Stack>
  );
}
