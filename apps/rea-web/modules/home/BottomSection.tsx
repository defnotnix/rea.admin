"use client";

import {
  Container,
  Group,
  Stack,
  Text,
  Box,
  Button,
  Paper,
  Badge,
  ActionIcon,
} from "@mantine/core";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRight,
  X,
} from "@phosphor-icons/react";
import { useState, useRef } from "react";
import { Carousel } from "@mantine/carousel";
import styles from "./home.module.css";
import OSMNepalMap from "./NepalMap";

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

interface BottomSectionProps {
  agendas: Agenda[];
  selectedAgenda: Agenda;
  onSelectAgenda: (agenda: Agenda) => void;
}

export function BottomSection({
  agendas,
  selectedAgenda,
  onSelectAgenda,
}: BottomSectionProps) {
  const [isMapInteractive, setIsMapInteractive] = useState(false);
  const carouselRef = useRef<any>(null);

  return (
    <section className={styles.bottomSection}>
      {/* Full-screen Map Background */}
      <Box className={styles.bottomMapBackdrop}>
        <OSMNepalMap
          isInteractive={isMapInteractive}
          onInteractiveChange={setIsMapInteractive}
        />
      </Box>

      {/* Floating Detail Cards - Top Right of Map */}
      <div className={styles.mapFloatingCards}>
        <Paper className={styles.agendaCardFloating} radius="lg">
          <Stack gap="xs">
            <Text size="xs" opacity={0.6} fw={500}>
              Ongoing
            </Text>
            <Text fw={700} size="sm">
              {selectedAgenda.phase}
            </Text>
          </Stack>
        </Paper>

        {/* Interactive Mode Button */}
        {isMapInteractive && (
          <Button
            variant="filled"
            size="sm"
            leftSection={<X size={16} />}
            onClick={() => setIsMapInteractive(false)}
            radius="lg"
          >
            Exit Map Mode
          </Button>
        )}
      </div>

      {/* Bottom Agendas Carousel */}
      <Container size="xl" className={styles.bottomAgendasContainer}>
        <Stack gap="md">
          <Group justify="space-between">
            <Text size="sm">
              Explore more agendas • Double-click map to interact
            </Text>

            <Paper>
              <Group gap={0}>
                <ActionIcon
                  color="white"
                  variant="subtle"
                  onClick={() => carouselRef.current?.prev()}
                >
                  <ArrowLeftIcon size={20} />
                </ActionIcon>
                <ActionIcon
                  color="white"
                  variant="subtle"
                  onClick={() => carouselRef.current?.next()}
                >
                  <ArrowRightIcon size={20} />
                </ActionIcon>
              </Group>
            </Paper>
          </Group>
          <Carousel
            ref={carouselRef}
            withControls={false}
            slideSize={{ base: "100%", sm: "50%", md: "25%" }}
            slideGap={8}
            withIndicators
            height={240}
            py="xl"
            emblaOptions={{
              loop: true,
              dragFree: false,
              align: "start",
            }}
            styles={{
              indicator: {
                height: 2,
                width: 10,
              },
            }}
          >
            {agendas.map((agenda) => (
              <Carousel.Slide key={agenda.id}>
                <Paper
                  className={`${styles.bottomAgendaItem} ${
                    selectedAgenda.id === agenda.id ? styles.active : ""
                  }`}
                  p="md"
                  radius="md"
                  onClick={() => onSelectAgenda(agenda)}
                  role="button"
                  tabIndex={0}
                  style={{ cursor: "pointer", height: "100%" }}
                >
                  <Stack gap="lg" h="100%">
                    <Box>
                      <Text fw={700} size="xl" lineClamp={2}>
                        {agenda.title}
                      </Text>
                    </Box>

                    <Group grow gap="md" mt="auto">
                      <Stack gap="xs">
                        <Text size="xs" opacity={0.6} fw={500}>
                          People onboard.
                        </Text>
                        <Text fw={700} size="lg">
                          {agenda.views.toLocaleString()}
                        </Text>
                      </Stack>
                      <Stack gap="xs">
                        <Text size="xs" opacity={0.6} fw={500}>
                          Influencers Onboard
                        </Text>
                        <Group gap={4}>
                          <Text fw={700} size="sm">
                            Sudan Gurung
                          </Text>
                          <Text size="xs" opacity={0.6}>
                            & 43 more
                          </Text>
                        </Group>
                      </Stack>
                    </Group>

                    <Group gap="xs" align="center">
                      <Badge size="xs" variant="light">
                        {agenda.status}
                      </Badge>
                      <Text size="xs" opacity={0.6}>
                        {agenda.phase.split(":")[0]}
                      </Text>
                    </Group>
                  </Stack>
                </Paper>
              </Carousel.Slide>
            ))}
          </Carousel>
        </Stack>
      </Container>
    </section>
  );
}
