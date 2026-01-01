"use client";

import {
  Container,
  Stack,
  Text,
  Card,
  Group,
  Table,
  Badge,
  SimpleGrid,
} from "@mantine/core";
import { BarChart, LineChart } from "@mantine/charts";

export function _Home() {
  // Mock data for charts
  const tpsChartData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i.toString().padStart(2, "0")}:00`,
    TPS: Math.floor(Math.random() * 2 + 0.5),
  }));

  const gasChartData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i.toString().padStart(2, "0")}:00`,
    "Gas Spent": Number((Math.random() * 0.0001 + 0.00008).toFixed(6)),
  }));

  const dailyTransactionsData = Array.from({ length: 7 }, (_, i) => ({
    day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
    transactions: Math.floor(Math.random() * 200000 + 100000),
  }));

  // Mock transactions data
  const transactions = [
    {
      id: "#7103744",
      type: "Mint",
      hash: "0xdc2..09d8",
      status: "Confirmed",
      time: "a few seconds ago",
      amount: "0.000174994 ETH",
    },
    {
      id: "#8217712",
      type: "Mint",
      hash: "0xdc2..09d8",
      status: "Confirmed",
      time: "a few seconds ago",
      amount: "0.000174994 ETH",
    },
    {
      id: "#9088771",
      type: "Mint",
      hash: "0xdc2..09d8",
      status: "Confirmed",
      time: "a few seconds ago",
      amount: "0.000174994 ETH",
    },
    {
      id: "#8888912",
      type: "Mint",
      hash: "0xdc2..09d8",
      status: "Confirmed",
      time: "a few seconds ago",
      amount: "0.000174994 ETH",
    },
  ];

  const dappsData = [
    { name: "Redbrick", active: 42, building: 23 },
    { name: "Zora", active: 38, building: 15 },
    { name: "Moonshot", active: 35, building: 20 },
  ];

  return (
    <div
      style={{
        padding: "var(--mantine-spacing-md)",
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
      }}
    >
      <Container size="xl" py="xl">
        <Stack gap="xs">
          {/* Analytics Header */}
          <div>
            <Text size="lg" fw={700} mb={4}>
              Analytics
            </Text>
          </div>

          {/* Main Stats Grid */}
          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="xs">
            {/* Daily Transactions */}
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Stack gap="md">
                <Group justify="space-between" align="flex-start">
                  <div>
                    <Text size="sm" opacity={0.6} mb={4}>
                      Daily Transactions
                    </Text>
                    <Text size="xl" fw={700}>
                      141,305
                    </Text>
                  </div>
                  <Badge size="lg" variant="light">
                    24h
                  </Badge>
                </Group>
                <BarChart
                  h={100}
                  data={dailyTransactionsData}
                  dataKey="day"
                  series={[{ name: "transactions", color: "green" }]}
                  withTooltip
                  withLegend={false}
                  withXAxis={false}
                  withYAxis={false}
                />
              </Stack>
            </Card>

            {/* dApps */}
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Stack gap="xs">
                <Group justify="space-between" align="flex-start">
                  <div>
                    <Text size="sm" opacity={0.6} mb={4}>
                      dApps
                    </Text>
                    <Text size="xl" fw={700}>
                      65
                    </Text>
                  </div>
                  <Badge size="lg" variant="light">
                    24h
                  </Badge>
                </Group>
                <div style={{ display: "flex", gap: "4px", height: "40px" }}>
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: "100%",
                        backgroundColor:
                          i % 3 === 0
                            ? "#4caf50"
                            : i % 3 === 1
                              ? "#ffc107"
                              : "#e0e0e0",
                        borderRadius: "2px",
                      }}
                    />
                  ))}
                </div>
                <Group justify="space-between" gap="xl">
                  <div>
                    <Text size="xs" opacity={0.6}>
                      Active: 42
                    </Text>
                  </div>
                  <div>
                    <Text size="xs" opacity={0.6}>
                      Building: 23
                    </Text>
                  </div>
                </Group>
                <Stack gap="xs">
                  {dappsData.map((d) => (
                    <Group key={d.name} justify="space-between" gap="xs">
                      <Group gap="xs">
                        <div
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            backgroundColor: "#4caf50",
                          }}
                        />
                        <Text size="xs">{d.name}</Text>
                      </Group>
                    </Group>
                  ))}
                </Stack>
              </Stack>
            </Card>

            {/* Latest Block */}
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Stack gap="md">
                <Group justify="space-between" align="flex-start">
                  <div>
                    <Text size="sm" opacity={0.6} mb={4}>
                      Latest Block
                    </Text>
                    <Text size="xl" fw={700}>
                      7,103,148
                    </Text>
                  </div>
                  <Badge size="lg" variant="light">
                    View all
                  </Badge>
                </Group>
                <Stack gap="xs">
                  <Group justify="space-between">
                    <Text size="xs" opacity={0.7}>
                      0x0b3413d3382d2...
                    </Text>
                    <Text size="xs" fw={600}>
                      0.21 ETH
                    </Text>
                  </Group>
                  <Group justify="space-between">
                    <Text size="xs" opacity={0.7}>
                      0x68d95c56478...
                    </Text>
                    <Badge size="sm" color="green">
                      Confirmed
                    </Badge>
                  </Group>
                </Stack>
              </Stack>
            </Card>

            {/* Gas Spent */}
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Stack gap="md">
                <Group justify="space-between" align="flex-start">
                  <div>
                    <Text size="sm" opacity={0.6} mb={4}>
                      Gas Spent
                    </Text>
                    <Text size="xl" fw={700}>
                      0.00013877 ETH
                    </Text>
                  </div>
                  <Badge size="lg" variant="light">
                    24h
                  </Badge>
                </Group>
                <div
                  style={{
                    height: "100px",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "4px",
                  }}
                />
              </Stack>
            </Card>
          </SimpleGrid>

          {/* Charts Section */}
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
            {/* TPS Chart */}
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Stack gap="md">
                <Group justify="space-between" align="flex-start">
                  <div>
                    <Text size="sm" opacity={0.6} mb={4}>
                      TPS
                    </Text>
                    <Text size="xl" fw={700}>
                      1.61 TX/s
                    </Text>
                  </div>
                  <Badge size="lg" variant="light">
                    24h
                  </Badge>
                </Group>
                <LineChart
                  h={200}
                  data={tpsChartData}
                  dataKey="time"
                  series={[{ name: "TPS", color: "green" }]}
                  withTooltip
                  withLegend={false}
                  withXAxis
                  withYAxis={false}
                  yAxisProps={{ domain: [0, 3] }}
                />
              </Stack>
            </Card>

            {/* Gas Spent Chart */}
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Stack gap="md">
                <Group justify="space-between" align="flex-start">
                  <div>
                    <Text size="sm" opacity={0.6} mb={4}>
                      Gas Spent
                    </Text>
                    <Text size="xl" fw={700}>
                      0.00013877 ETH
                    </Text>
                  </div>
                  <Badge size="lg" variant="light">
                    24h
                  </Badge>
                </Group>
                <LineChart
                  h={200}
                  data={gasChartData}
                  dataKey="time"
                  series={[{ name: "Gas Spent", color: "blue" }]}
                  withTooltip
                  withLegend={false}
                  withXAxis
                  withYAxis={false}
                />
              </Stack>
            </Card>
          </SimpleGrid>

          {/* Recent Transactions */}
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack gap="md">
              <div>
                <Text size="lg" fw={700} mb={4}>
                  Recent Transactions
                </Text>
              </div>

              <div style={{ overflowX: "auto" }}>
                <Table striped highlightOnHover>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Type</Table.Th>
                      <Table.Th>Transaction Hash</Table.Th>
                      <Table.Th>Amount</Table.Th>
                      <Table.Th>Status</Table.Th>
                      <Table.Th>Time</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {transactions.map((tx) => (
                      <Table.Tr key={tx.id}>
                        <Table.Td>
                          <Text size="sm" fw={500}>
                            {tx.type}
                          </Text>
                        </Table.Td>
                        <Table.Td>
                          <Text size="sm" opacity={0.7}>
                            {tx.hash}
                          </Text>
                        </Table.Td>
                        <Table.Td>
                          <Text size="sm" fw={500}>
                            {tx.amount}
                          </Text>
                        </Table.Td>
                        <Table.Td>
                          <Badge color="green" size="sm">
                            {tx.status}
                          </Badge>
                        </Table.Td>
                        <Table.Td>
                          <Text size="sm" opacity={0.6}>
                            {tx.time}
                          </Text>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </div>
            </Stack>
          </Card>
        </Stack>
      </Container>
    </div>
  );
}
