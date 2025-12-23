import { Badge, Group, Stack, Text } from "@mantine/core";

export const columns = [
  {
    accessor: "district_name",
    title: "District Name",
    width: 250,
    render: (record: any) => (
      <Group wrap="nowrap">
        <div>
          <Text size="sm" fw={600}>
            {record.district_name}
          </Text>
          <Text size="xs" opacity={0.6}>
            {record.district_code}
          </Text>
        </div>
      </Group>
    ),
    sortable: true,
  },
  {
    accessor: "population",
    title: "Population",
    render: (record: any) => (
      <Text size="sm">
        {record.population ? record.population.toLocaleString() : "-"}
      </Text>
    ),
    sortable: true,
  },
  {
    accessor: "is_active",
    title: "Status",
    render: (record: any) => (
      <Badge color={record.is_active ? "green" : "red"} size="sm">
        {record.is_active ? "Active" : "Inactive"}
      </Badge>
    ),
    sortable: true,
  },
  {
    accessor: "description",
    title: "Description",
    width: 300,
    render: (record: any) => (
      <Text size="xs" opacity={0.7} lineClamp={2}>
        {record.description || "-"}
      </Text>
    ),
  },
  {
    accessor: "created_at",
    title: "Created",
    render: (record: any) => (
      <Text size="xs">
        {new Date(record.created_at).toLocaleDateString()}
      </Text>
    ),
    sortable: true,
  },
];
