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
import { useState, useEffect } from "react";
import { useMantineColorScheme } from "@mantine/core";
import Link from "next/link";
import { HeroSection } from "./HeroSection";
import { BottomSection } from "./BottomSection";
import styles from "./home.module.css";
import { getAgendas, type Agenda } from "./home.api";

export function ModuleHome() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const [agendas, setAgendas] = useState<Agenda[]>([]);
  const [selectedAgenda, setSelectedAgenda] = useState<Agenda | null>(null);

  // useEffect(() => {
  //   const fetchAgendas = async () => {
  //     try {
  //       const data = await getAgendas();
  //       console.log(data)
  //       setAgendas(data);
  //       if (data.length > 0) {
  //         setSelectedAgenda(data[0]);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching agendas:", error);
  //     }
  //   };

  //   fetchAgendas();
  // }, []);

  return (
    <>
      {/* Header Navigation */}
      <Box className={styles.header}>
        <Container size="xl">
          <Group h={60} justify="space-between" gap="md">
            <Group gap="md">
              <Text fw={700} size="xs" lh={1}>
                Rastriya
                <br /> Ekikaran Abhiyan
              </Text>
              <Text size="xs" opacity={0.6} lh={1}>
                Nepal is coming
                <br />
                together and rising anew.
              </Text>
            </Group>

            <Group gap="md">
              <Text ta="right" size="xs" opacity={0.6} lh={1}>
                Join 225,000+ passionate individuals on our
                <br />
                collaborative party platform and help shape a better Nepal.
              </Text>
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
      {/* {selectedAgenda && (
        <HeroSection agendas={[]} selectedAgenda={selectedAgenda} />
      )} */}

       <HeroSection  />

      {/* Bottom Section */}
      {/* {selectedAgenda && (
        <BottomSection
          agendas={agendas}
          selectedAgenda={selectedAgenda}
          onSelectAgenda={setSelectedAgenda}
        />
      )} */}
    </>
  );
}
