import { Badge, Stack, Text, Tooltip } from "@mantine/core";

const statusColors: { [key: string]: string } = {
  pending: "yellow",
  approved: "blue",
  rejected: "red",
  solved: "green",
};

const getTimeAgo = (date: string): string => {
  const now = new Date();
  const past = new Date(date);
  const diff = now.getTime() - past.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return "now";
};

export const columns = [
  {
    accessor: "title",
    title: "Problem",
    width: 300,
    render: (record: any) => (
      <Stack gap={0}>
        <Text size="sm" fw={600} lineClamp={2}>
          {record.title}
        </Text>
        <Text size="xs" opacity={0.6}>
          {record.category || "General"}
        </Text>
      </Stack>
    ),
    sortable: true,
  },
  {
    accessor: "status",
    title: "Status",
    render: (record: any) => (
      <Badge
        color={statusColors[record.status] || "gray"}
        size="sm"
        capitalize
      >
        {record.status}
      </Badge>
    ),
    sortable: true,
  },
  {
    accessor: "priority",
    title: "Priority",
    render: (record: any) => (
      <Badge size="sm" variant="light">
        {record.priority || "Medium"}
      </Badge>
    ),
    sortable: true,
  },
  {
    accessor: "created_by",
    title: "Created By",
    render: (record: any) => (
      <Text size="sm">{record.created_by || "Anonymous"}</Text>
    ),
  },
  {
    accessor: "created_at",
    title: "Created",
    render: (record: any) => (
      <Tooltip label={new Date(record.created_at).toLocaleString()}>
        <Text size="xs">{getTimeAgo(record.created_at)}</Text>
      </Tooltip>
    ),
    sortable: true,
  },
];
