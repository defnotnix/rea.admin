"use client";

import { Container, Stack, Grid, Card, Text, Group, ThemeIcon, Badge, SimpleGrid } from "@mantine/core";
import {
  Users,
  MapPin,
  SquaresFour,
  Chats,
  CheckCircle,
  Clock,
  Warning,
} from "@phosphor-icons/react";

const stats = [
  {
    title: "Total Districts",
    value: "24",
    icon: MapPin,
    color: "blue",
  },
  {
    title: "Total Users",
    value: "1,248",
    icon: Users,
    color: "green",
  },
  {
    title: "Active Problems",
    value: "48",
    icon: SquaresFour,
    color: "orange",
  },
  {
    title: "Chat Messages",
    value: "542",
    icon: Chats,
    color: "purple",
  },
];

const recentActivities = [
  {
    label: "New Problem",
    description: "Water supply issue in District A",
    time: "2 hours ago",
    icon: Warning,
  },
  {
    label: "Solution Approved",
    description: "3 solutions published",
    time: "5 hours ago",
    icon: CheckCircle,
  },
  {
    label: "User Registered",
    description: "125 new citizens joined",
    time: "1 day ago",
    icon: Users,
  },
  {
    label: "Moderator Assigned",
    description: "New moderator for District B",
    time: "2 days ago",
    icon: Clock,
  },
];

export default function Home() {
  return (
    <Container size="xl" py="lg">
      <Stack gap="xl">
        {/* Header */}
        <div>
          <Text size="lg" fw={600} mb="xs">
            Dashboard
          </Text>
          <Text size="sm" c="dimmed">
            Welcome to REA Admin Portal. Here's what's happening in your system.
          </Text>
        </div>

        {/* Stats Grid */}
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} p="lg" radius="md" withBorder>
                <Group justify="space-between" mb="md">
                  <Text size="sm" fw={500} c="dimmed">
                    {stat.title}
                  </Text>
                  <ThemeIcon color={stat.color} variant="light" radius="md" size="lg">
                    <Icon weight="duotone" size={20} />
                  </ThemeIcon>
                </Group>
                <Text size="xl" fw={700}>
                  {stat.value}
                </Text>
              </Card>
            );
          })}
        </SimpleGrid>

        {/* Main Content */}
        <Grid gutter="lg">
          {/* Recent Activity */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card p="lg" radius="md" withBorder>
              <Group justify="space-between" mb="md">
                <Text size="md" fw={600}>
                  Recent Activity
                </Text>
                <Badge variant="light">Last 7 days</Badge>
              </Group>
              <Stack gap="md">
                {recentActivities.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <Group key={index} justify="space-between" align="flex-start">
                      <Group gap="md">
                        <ThemeIcon color="blue" variant="light" radius="md" size="lg">
                          <Icon weight="duotone" size={16} />
                        </ThemeIcon>
                        <div>
                          <Text size="sm" fw={500}>
                            {activity.label}
                          </Text>
                          <Text size="xs" c="dimmed">
                            {activity.description}
                          </Text>
                        </div>
                      </Group>
                      <Text size="xs" c="dimmed">
                        {activity.time}
                      </Text>
                    </Group>
                  );
                })}
              </Stack>
            </Card>
          </Grid.Col>

          {/* Quick Stats */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="lg">
              <Card p="lg" radius="md" withBorder>
                <Group justify="space-between" mb="md">
                  <Text size="sm" fw={500}>
                    Pending Review
                  </Text>
                  <Badge color="yellow">12</Badge>
                </Group>
                <Text size="xs" c="dimmed">
                  Problems awaiting moderation
                </Text>
              </Card>

              <Card p="lg" radius="md" withBorder>
                <Group justify="space-between" mb="md">
                  <Text size="sm" fw={500}>
                    Moderators
                  </Text>
                  <Badge color="blue">24</Badge>
                </Group>
                <Text size="xs" c="dimmed">
                  Active across all districts
                </Text>
              </Card>

              <Card p="lg" radius="md" withBorder>
                <Group justify="space-between" mb="md">
                  <Text size="sm" fw={500}>
                    Solved
                  </Text>
                  <Badge color="green">156</Badge>
                </Group>
                <Text size="xs" c="dimmed">
                  Problems with approved solutions
                </Text>
              </Card>
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
}
