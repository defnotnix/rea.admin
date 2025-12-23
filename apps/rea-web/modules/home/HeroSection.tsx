"use client";

import {
  Container,
  Group,
  Stack,
  Text,
  Box,
  Button,
  Paper,
  SimpleGrid,
  Grid,
} from "@mantine/core";
import { ArrowUpRight } from "@phosphor-icons/react";
import { useState } from "react";
import styles from "./home.module.css";
import SVGNepalMap from "./SVGNepalMap";

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

interface HeroSectionProps {
  agendas: Agenda[];
  selectedAgenda: Agenda;
}

export function HeroSection({ agendas, selectedAgenda }: HeroSectionProps) {
  return (
    <section className={styles.heroSection}>
      <Box className={styles.mapBackdrop}>
        <SVGNepalMap />
      </Box>
      <Container
        size="xl"
        className={styles.heroContainer}
        style={{
          overflow: "visible",
        }}
      >
        <Grid>
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <div className={styles.heroContent}>
              {/* Left Content */}
              <Stack gap="lg" className={styles.heroLeft}>
                <Box>
                  <Text size="md" opacity={0.6} mb="xs">
                    Building solutions
                    <br /> to problems together.
                  </Text>
                  <Text className={styles.heroTitle}>
                    Where Solutions to Problems are Driven by You the People.
                  </Text>
                </Box>

                <SimpleGrid cols={2} spacing="md">
                  <Text opacity={0.7} size="sm">
                    Rastriya Pariwartan Abhiyan turns public participation into
                    real progress by giving every citizen a structured way to
                    raise issues, refine solutions, and shape the nation's
                    priorities.
                  </Text>

                  <Text size="sm" opacity={0.6}>
                    Verified voices from all 77 districts come together in one
                    transparent space where ideas evolve through open
                    collaboration.
                  </Text>
                </SimpleGrid>
              </Stack>
            </div>

            {/* Right Floating Agenda Cards */}
          </Grid.Col>
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Group justify="flex-end">
              <div className={styles.floatingCards}>
                <Stack gap="sm">
                  <Paper className={styles.agendaCardFloating} radius="lg">
                    <Stack gap="xs">
                      <div>
                        <Text size="xs" opacity={0.6} fw={500} mb={2}>
                          People onboard.
                        </Text>
                        <Text fw={700} size="xl">
                          {selectedAgenda.views.toLocaleString()}
                        </Text>
                      </div>

                      <div>
                        <Text fw={700} size="sm" lineClamp={2} mb={4}>
                          {selectedAgenda.title}
                        </Text>
                        <Text size="xs" opacity={0.65} lineClamp={2}>
                          {selectedAgenda.description}
                        </Text>
                      </div>

                      <Group gap="sm" justify="space-between">
                        <Group gap="xs">
                          <Text size="xs" opacity={0.6}>
                            👍 {selectedAgenda.likes}k
                          </Text>
                          <Text size="xs" opacity={0.6}>
                            🔗 {selectedAgenda.shares}
                          </Text>
                        </Group>
                        <Button
                          variant="filled"
                          size="xs"
                          rightSection={<ArrowUpRight size={14} />}
                          px="sm"
                        >
                          Join
                        </Button>
                      </Group>
                    </Stack>
                  </Paper>

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
                </Stack>
              </div>
            </Group>
          </Grid.Col>
        </Grid>
      </Container>
    </section>
  );
}
