"use client";

import { useState } from "react";
import {
  Button,
  Card,
  Container,
  Divider,
  Group,
  Stack,
  Text,
  ActionIcon,
  TextInput,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { DotIcon, PlusIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";

interface Agenda {
  id: string;
  title: string;
  peopleOnboard: string;
  moderators: string;
  status: "ONGOING" | "UPCOMING" | "COMPLETED";
  date: string;
  isHighlighted?: boolean;
}

const AGENDAS_DATA: Record<string, Agenda[]> = {
  rastriya: [
    {
      id: "1",
      title: "Constitutional Reform & Renewal Summit",
      peopleOnboard: "22,134",
      moderators: "Sudan Grg. & 3 More",
      status: "ONGOING",
      date: "12 May, 2025",
      isHighlighted: true,
    },
    {
      id: "2",
      title: "Nationwide Digital Complaint & Service Delay Reform",
      peopleOnboard: "18,920",
      moderators: "Rajendra Patel & 2 More",
      status: "ONGOING",
      date: "12 May, 2025",
      isHighlighted: false,
    },
    {
      id: "3",
      title: "National Waste Management & Recycling Standardization",
      peopleOnboard: "15,670",
      moderators: "Amrita Singh & 1 More",
      status: "ONGOING",
      date: "12 May, 2025",
      isHighlighted: false,
    },
    {
      id: "4",
      title: "Public Transport Modernization & Integrated",
      peopleOnboard: "12,450",
      moderators: "Vikram Kumar & 4 More",
      status: "UPCOMING",
      date: "15 May, 2025",
      isHighlighted: false,
    },
    {
      id: "5",
      title: "National Waste Management & Recycling Standardization",
      peopleOnboard: "15,670",
      moderators: "Amrita Singh & 1 More",
      status: "ONGOING",
      date: "12 May, 2025",
      isHighlighted: false,
    },
    {
      id: "6",
      title: "Public Transport Modernization & Integrated",
      peopleOnboard: "12,450",
      moderators: "Vikram Kumar & 4 More",
      status: "UPCOMING",
      date: "15 May, 2025",
      isHighlighted: false,
    },
  ],
  district: [
    {
      id: "5",
      title: "District Education Enhancement Program",
      peopleOnboard: "8,900",
      moderators: "Local Admin & 2 More",
      status: "ONGOING",
      date: "10 May, 2025",
      isHighlighted: true,
    },
    {
      id: "6",
      title: "District Healthcare Initiative",
      peopleOnboard: "6,500",
      moderators: "Health Officer & 1 More",
      status: "ONGOING",
      date: "14 May, 2025",
      isHighlighted: false,
    },
    {
      id: "7",
      title: "Rural Infrastructure Development",
      peopleOnboard: "5,300",
      moderators: "Engineer & 3 More",
      status: "UPCOMING",
      date: "20 May, 2025",
      isHighlighted: false,
    },
  ],
  general: [
    {
      id: "8",
      title: "General Community Welfare Program",
      peopleOnboard: "3,200",
      moderators: "Community Lead & 1 More",
      status: "ONGOING",
      date: "08 May, 2025",
      isHighlighted: true,
    },
    {
      id: "9",
      title: "Youth Empowerment Initiative",
      peopleOnboard: "2,100",
      moderators: "Youth Coordinator",
      status: "COMPLETED",
      date: "05 May, 2025",
      isHighlighted: false,
    },
  ],
};

const TAB_CONFIG = [
  { key: "rastriya", label: "Rastriya Agendas" },
  { key: "district", label: "District Agendas" },
  { key: "general", label: "General Agendas" },
];

export function ModuleHome() {
  const [activeTab, setActiveTab] = useState<string>("rastriya");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [emblaApi, setEmblaApi] = useState<any>(null);

  const currentAgendas = AGENDAS_DATA[activeTab] || [];

  // Filter agendas based on search query
  const filteredAgendas = searchQuery.trim() === ""
    ? currentAgendas
    : currentAgendas.filter((agenda) =>
        agenda.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handlePrevCards = () => {
    emblaApi?.scrollPrev();
  };

  const handleNextCards = () => {
    emblaApi?.scrollNext();
  };

  const handleTabChange = (tabKey: string) => {
    setActiveTab(tabKey);
    setSearchQuery("");
    if (emblaApi) {
      emblaApi.scrollTo(0);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ONGOING":
        return "var(--mantine-color-blue-5)";
      case "UPCOMING":
        return "var(--mantine-color-yellow-5)";
      case "COMPLETED":
        return "var(--mantine-color-green-5)";
      default:
        return "var(--mantine-color-blue-5)";
    }
  };

  return (
    <>
      <Container>
        <Group justify="space-between">
          <Group h={50} gap="xs">
            {TAB_CONFIG.map((tab) => (
              <Button
                key={tab.key}
                size="xs"
                variant={activeTab === tab.key ? "filled" : "subtle"}
                onClick={() => handleTabChange(tab.key)}
                style={{
                  backgroundColor:
                    activeTab === tab.key
                      ? "rgba(255,255,255,.1)"
                      : "transparent",
                  border:
                    activeTab === tab.key
                      ? "1px solid rgba(255,255,255,.2)"
                      : "none",
                  color:
                    activeTab === tab.key ? "white" : "rgba(255,255,255,.6)",
                  fontWeight: activeTab === tab.key ? 600 : 400,
                  transition: "all 200ms ease",
                }}
              >
                {tab.label}
              </Button>
            ))}
          </Group>
          <Button size="xs" variant="light" leftSection={<PlusIcon />}>
            Submit your Agenda Request.
          </Button>
        </Group>
        <Divider opacity={0.5} />
      </Container>

      <Container h={"calc(100vh - 400px)"}></Container>

      <Container
        h={260}
        style={{
          overflow: "visible",
          position: "relative",
        }}
      >
        <Group justify="space-between" align="flex-start" mb="md">
          <Text size="xs">Active Agendas</Text>
          <Group gap="sm">
            <TextInput
              placeholder="Search by name..."
              size="xs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
              leftSection={<MagnifyingGlassIcon size={14} />}
              style={{ width: 200 }}
            />
            <Group gap="xs">
              <ActionIcon
                size="sm"
                variant="subtle"
                onClick={handlePrevCards}
                disabled={filteredAgendas.length === 0}
              >
                ←
              </ActionIcon>
              <ActionIcon
                size="sm"
                variant="subtle"
                onClick={handleNextCards}
                disabled={filteredAgendas.length === 0}
              >
                →
              </ActionIcon>
            </Group>
          </Group>
        </Group>

        {filteredAgendas.length === 0 ? (
          <Text size="sm" c="dimmed" ta="center" py="xl">
            No agendas found matching "{searchQuery}"
          </Text>
        ) : (
          <Carousel
            slideGap={4}
            slideSize={"25%"}
            getEmblaApi={setEmblaApi}
          >
            {filteredAgendas.map((agenda) => (
              <Carousel.Slide key={agenda.id}>
              <Card
                radius="md"
                p="xl"
                h={agenda.isHighlighted ? 400 : 200}
                bg={agenda.isHighlighted ? "#EEECE7" : "rgba(255,255,255,.08)"}
                mt={agenda.isHighlighted ? 0 : 58}
              >
                <Stack
                  gap="md"
                  justify={
                    agenda.isHighlighted ? "space-between" : "flex-start"
                  }
                >
                  <Text
                    size={agenda.isHighlighted ? "lg" : "sm"}
                    fw={600}
                    c={agenda.isHighlighted ? "dark.9" : "white"}
                    lineClamp={2}
                  >
                    {agenda.title}
                  </Text>

                  {agenda.isHighlighted && (
                    <Group wrap="nowrap" gap="lg">
                      <div>
                        <Text c="dimmed" size="10px">
                          People onboard.
                        </Text>
                        <Text size="sm" c="dark.9" fw={600}>
                          {agenda.peopleOnboard}
                        </Text>
                      </div>

                      <div>
                        <Text c="dimmed" size="10px">
                          Moderators Involved
                        </Text>
                        <Text size="sm" c="dark.9" fw={600}>
                          {agenda.moderators}
                        </Text>
                      </div>
                    </Group>
                  )}

                  <Group gap="sm">
                    <Group gap={2}>
                      <Text
                        c={getStatusColor(agenda.status)}
                        size="10px"
                        fw={500}
                      >
                        {agenda.status}
                      </Text>
                    </Group>
                    <Text
                      size="10px"
                      c={agenda.isHighlighted ? "dark.9" : "dimmed"}
                    >
                      {agenda.date}
                    </Text>
                  </Group>
                </Stack>
              </Card>
              </Carousel.Slide>
            ))}
          </Carousel>
        )}
      </Container>
    </>
  );
}
