"use client";

import { Container, Stack, Text, Card, Group, ThemeIcon, SimpleGrid } from "@mantine/core";
import { Info, Heart, Users } from "@phosphor-icons/react";

export default function AboutPage() {
  return (
    <Container size="xl" py="lg">
      <Stack gap="xl">
        <div>
          <Text size="lg" fw={600} mb="xs">
            About REA
          </Text>
          <Text size="sm" c="dimmed">
            Regional Equity Administration System
          </Text>
        </div>

        <Card p="lg" radius="md" withBorder>
          <Stack gap="md">
            <div>
              <Text size="md" fw={600} mb="xs">
                REA Admin Portal
              </Text>
              <Text size="sm" c="dimmed">
                The Regional Equity Administration (REA) system provides a comprehensive platform for managing civic issues,
                citizen feedback, and collaborative problem-solving across districts.
              </Text>
            </div>

            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md" mt="md">
              <div>
                <Group gap="xs" mb="xs">
                  <ThemeIcon color="blue" variant="light">
                    <Users size={20} />
                  </ThemeIcon>
                  <Text size="sm" fw={600}>
                    Community Driven
                  </Text>
                </Group>
                <Text size="xs" c="dimmed">
                  Empowering citizens to report and solve community issues
                </Text>
              </div>

              <div>
                <Group gap="xs" mb="xs">
                  <ThemeIcon color="green" variant="light">
                    <Info size={20} />
                  </ThemeIcon>
                  <Text size="sm" fw={600}>
                    Transparent
                  </Text>
                </Group>
                <Text size="xs" c="dimmed">
                  Open and transparent system for tracking solutions
                </Text>
              </div>

              <div>
                <Group gap="xs" mb="xs">
                  <ThemeIcon color="purple" variant="light">
                    <Heart size={20} />
                  </ThemeIcon>
                  <Text size="sm" fw={600}>
                    Inclusive
                  </Text>
                </Group>
                <Text size="xs" c="dimmed">
                  Promoting equity and inclusion in governance
                </Text>
              </div>
            </SimpleGrid>
          </Stack>
        </Card>

        <Card p="lg" radius="md" withBorder bg="gray.0">
          <Stack gap="sm">
            <Text size="sm" fw={600}>
              System Information
            </Text>
            <Group justify="space-between">
              <Text size="xs" c="dimmed">
                Version
              </Text>
              <Text size="xs" fw={500}>
                v1.0.0
              </Text>
            </Group>
            <Group justify="space-between">
              <Text size="xs" c="dimmed">
                Environment
              </Text>
              <Text size="xs" fw={500}>
                Production
              </Text>
            </Group>
            <Group justify="space-between">
              <Text size="xs" c="dimmed">
                Last Updated
              </Text>
              <Text size="xs" fw={500}>
                {new Date().toLocaleDateString()}
              </Text>
            </Group>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
