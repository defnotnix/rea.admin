"use client";

import {
  Card,
  SimpleGrid,
  Stack,
  Text,
  Group,
  Badge,
  RingProgress,
  ThemeIcon,
  Progress,
} from "@mantine/core";
import {
  EyeIcon,
  ChatCenteredDotsIcon,
  CheckIcon,
  CaretUpIcon,
  CaretDownIcon,
  CalendarIcon,
  ClockIcon,
} from "@phosphor-icons/react";

interface AnalyticsCardProps {
  problem: any;
}

interface StatMetricProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  trend?: number;
  trendLabel?: string;
  color?: string;
}

function StatMetric({
  icon,
  label,
  value,
  trend,
  trendLabel,
  color = "blue",
}: StatMetricProps) {
  const isTrendUp = trend !== undefined && trend >= 0;

  return (
    <Card
      withBorder
      padding="lg"
      radius="md"
      className="hover:shadow-md transition-shadow"
    >
      <Group justify="space-between" align="flex-start" mb="md">
        <ThemeIcon variant="light" size="lg" radius="md" color={color}>
          {icon}
        </ThemeIcon>
        {trend !== undefined && (
          <Group gap={4} align="center">
            {isTrendUp ? (
              <CaretUpIcon
                size={16}
                color="var(--mantine-color-green-6)"
                weight="bold"
              />
            ) : (
              <CaretDownIcon
                size={16}
                color="var(--mantine-color-red-6)"
                weight="bold"
              />
            )}
            <Text size="xs" fw={600} c={isTrendUp ? "green" : "red"}>
              {isTrendUp ? "+" : ""}
              {trend}%
            </Text>
          </Group>
        )}
      </Group>

      <Stack gap={6}>
        <Text size="xs" c="dimmed" fw={500}>
          {label}
        </Text>
        <Text size="xl" fw={700}>
          {value}
        </Text>
        {trendLabel && (
          <Text size="xs" c="dimmed">
            {trendLabel}
          </Text>
        )}
      </Stack>
    </Card>
  );
}

interface CompanyMetricProps {
  icon: React.ReactNode;
  company: string;
  category: string;
  revenue: string;
  revenueChange: number;
  engagement: number;
  color?: string;
}

function CompanyMetric({
  icon,
  company,
  category,
  revenue,
  revenueChange,
  engagement,
  color = "blue",
}: CompanyMetricProps) {
  const isPositive = revenueChange >= 0;

  return (
    <Card
      withBorder
      padding="lg"
      radius="md"
      className="hover:shadow-md transition-shadow"
    >
      <Group justify="space-between" align="flex-start" mb="md">
        <Group gap="md" align="flex-start">
          <ThemeIcon variant="light" size="lg" radius="md" color={color}>
            {icon}
          </ThemeIcon>
          <Stack gap={2}>
            <Text fw={600} size="sm">
              {company}
            </Text>
            <Text size="xs" c="dimmed">
              {category}
            </Text>
          </Stack>
        </Group>
      </Group>

      <SimpleGrid cols={2} spacing="md">
        <Stack gap={4}>
          <Text size="xs" c="dimmed" fw={500}>
            Recurring Revenue
          </Text>
          <Group gap={6} align="center">
            <Text size="lg" fw={700}>
              {revenue}
            </Text>
            <Group gap={2}>
              {isPositive ? (
                <CaretUpIcon
                  size={14}
                  color="var(--mantine-color-green-6)"
                  weight="bold"
                />
              ) : (
                <CaretDownIcon
                  size={14}
                  color="var(--mantine-color-red-6)"
                  weight="bold"
                />
              )}
              <Text size="xs" fw={600} c={isPositive ? "green" : "red"}>
                {isPositive ? "+" : ""}
                {revenueChange}%
              </Text>
            </Group>
          </Group>
        </Stack>

        <Stack gap={4}>
          <Group justify="space-between" align="center">
            <Text size="xs" c="dimmed" fw={500}>
              Engagement
            </Text>
            <Text size="xs" fw={600}>
              {engagement}
            </Text>
          </Group>
          <Progress value={engagement} radius="md" size="sm" color={color} />
        </Stack>
      </SimpleGrid>
    </Card>
  );
}

interface TimeMetricProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  trend: number;
  trendLabel: string;
  color?: string;
}

function TimeMetric({
  label,
  value,
  icon,
  trend,
  trendLabel,
  color = "blue",
}: TimeMetricProps) {
  const isTrendUp = trend >= 0;

  return (
    <Card
      withBorder
      padding="lg"
      radius="md"
      className="hover:shadow-md transition-shadow"
    >
      <Group justify="space-between" align="flex-start" mb="md">
        <Text size="xs" c="dimmed" fw={500}>
          {label}
        </Text>
        <Group gap={4} align="center">
          {isTrendUp ? (
            <CaretUpIcon
              size={16}
              color="var(--mantine-color-green-6)"
              weight="bold"
            />
          ) : (
            <CaretDownIcon
              size={16}
              color="var(--mantine-color-red-6)"
              weight="bold"
            />
          )}
          <Text size="xs" fw={600} c={isTrendUp ? "green" : "red"}>
            {isTrendUp ? "+" : ""}
            {trend}%
          </Text>
        </Group>
      </Group>

      <Text size="xl" fw={700} mb="xs">
        {value}
      </Text>
      <Text size="xs" c="dimmed">
        {trendLabel}
      </Text>
    </Card>
  );
}

export function AnalyticsCard({ problem }: AnalyticsCardProps) {
  const daysSinceSubmission = Math.floor(
    (Date.now() - new Date(problem.submitted_at).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <Stack gap="xs">
      {/* Key Metrics Grid */}
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xs">
        <StatMetric
          icon={<EyeIcon size={20} weight="fill" />}
          label="Views"
          value={problem.view_count || 0}
          trend={23}
          trendLabel="last week"
          color="blue"
        />
        <StatMetric
          icon={<CheckIcon size={20} weight="fill" />}
          label="Solutions"
          value={problem.solution_count || 0}
          trend={-18}
          trendLabel="last week"
          color="orange"
        />
        <StatMetric
          icon={<ChatCenteredDotsIcon size={20} weight="fill" />}
          label="Comments"
          value={problem.comment_count || 0}
          trend={15}
          trendLabel="last week"
          color="teal"
        />
      </SimpleGrid>

      {/* Engagement Info Card */}
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
        <Card withBorder padding="lg" radius="md">
          <Group justify="space-between" align="flex-start" mb="md">
            <ThemeIcon variant="light" size="lg" radius="md" color="violet">
              <CalendarIcon size={20} weight="fill" />
            </ThemeIcon>
          </Group>
          <Stack gap={6}>
            <Text size="xs" c="dimmed" fw={500}>
              Submission Timeline
            </Text>
            <Text size="lg" fw={700}>
              {new Date(problem.submitted_at).toLocaleDateString()}
            </Text>
          </Stack>
        </Card>

        <Card withBorder padding="lg" radius="md">
          <Group justify="space-between" align="flex-start" mb="md">
            <ThemeIcon variant="light" size="lg" radius="md" color="cyan">
              <ClockIcon size={20} weight="fill" />
            </ThemeIcon>
          </Group>
          <Stack gap={6}>
            <Text size="xs" c="dimmed" fw={500}>
              Days Since Submission
            </Text>
            <Text size="lg" fw={700}>
              {daysSinceSubmission} days
            </Text>
          </Stack>
        </Card>
      </SimpleGrid>
    </Stack>
  );
}
