"use client";

import {
  Container,
  Group,
  Text,
  Box,
  Button,
  ThemeIcon,
  ActionIcon,
  Divider,
} from "@mantine/core";
import { BellIcon, Moon, Sun } from "@phosphor-icons/react";
import { useState } from "react";
import { useMantineColorScheme } from "@mantine/core";
import Link from "next/link";
import { HeroSection } from "./HeroSection";
import { BottomSection } from "./BottomSection";
import styles from "./home.module.css";

interface Agenda {
  id: number;
  title: string;
  category: string;
  status: string;
  phase: string;
  description: string;
  views: number;
  likes: number;
  shares: number;
}

export function ModuleHome() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const agendas: Agenda[] = [
    {
      id: 1,
      title: "Constitutional Reform & Renewal Summit",
      category: "Politics",
      status: "ONGOING",
      phase: "Phase 2: Solution Draft Discussion",
      description:
        "A high-impact strategy session to reimagine the constitution for a new era-stronger amidst and built for the issues we care about today. Innovative ideas...",
      views: 22133,
      likes: 3.2,
      shares: 34,
    },
    {
      id: 2,
      title: "Environmental Protection Initiative",
      category: "Environment",
      status: "ONGOING",
      phase: "Phase 1: Problem Identification",
      description:
        "Collaborative effort to address environmental challenges across the nation...",
      views: 15420,
      likes: 2.8,
      shares: 28,
    },
    {
      id: 3,
      title: "Education System Modernization",
      category: "Education",
      status: "ONGOING",
      phase: "Phase 3: Implementation Planning",
      description:
        "Designing a comprehensive educational framework for the 21st century...",
      views: 18900,
      likes: 4.1,
      shares: 45,
    },
    {
      id: 4,
      title: "Nationwide Digital Complaint & Service Delay Reform",
      category: "Technology",
      status: "ONGOING",
      phase: "Phase 2: Solution Draft Discussion",
      description:
        "Building a unified digital platform for citizen grievances...",
      views: 12500,
      likes: 2.3,
      shares: 18,
    },
    {
      id: 5,
      title: "National Waste Management & Recycling Standardization",
      category: "Environment",
      status: "ONGOING",
      phase: "Phase 1: Problem Identification",
      description:
        "Comprehensive waste management strategy for all municipalities...",
      views: 14200,
      likes: 3.0,
      shares: 22,
    },
    {
      id: 6,
      title: "Public Transport Modernization & Integrated Network",
      category: "Infrastructure",
      status: "ONGOING",
      phase: "Phase 2: Solution Draft Discussion",
      description: "Creating an efficient public transportation ecosystem...",
      views: 16800,
      likes: 3.5,
      shares: 32,
    },
  ];

  const [selectedAgenda, setSelectedAgenda] = useState<Agenda>(agendas[0]);

  return (
    <>
      {/* Header Navigation */}
      <Box className={styles.header}>
        <Container size="xl">
          <Group h={60} justify="space-between" gap="md">
            <Group gap="xs">
              <Text fw={700} size="xs">
                Rastriya Ekikaran Abhiyan
              </Text>
              <Text size="xs" opacity={0.6}>
                By the people. For the Nation.
              </Text>
            </Group>

            <Group gap="md">
              <ActionIcon
                variant="subtle"
                size="lg"
                onClick={() => toggleColorScheme()}
                title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </ActionIcon>
              <ThemeIcon variant="subtle" size="lg">
                <BellIcon size={20} />
              </ThemeIcon>
              <Link href="/login">
                <Button size="sm" variant="filled">
                  Sign In / Register
                </Button>
              </Link>
            </Group>
          </Group>
        </Container>
      </Box>

      <Divider opacity={0.5} />

      {/* Hero Section */}
      <HeroSection agendas={agendas} selectedAgenda={selectedAgenda} />

      {/* Bottom Section */}
      <BottomSection
        agendas={agendas}
        selectedAgenda={selectedAgenda}
        onSelectAgenda={setSelectedAgenda}
      />
    </>
  );
}
