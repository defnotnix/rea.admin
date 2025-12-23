import { Avatar, Badge, Group, Stack, Text, Tooltip } from "@mantine/core";
import { ThumbsUp, ThumbsDown } from "@phosphor-icons/react";

export const columns = [
  {
    accessor: "author_name",
    title: "Author",
    width: 200,
    render: (record: any) => (
      <Group wrap="nowrap">
        <Avatar name={record.author_name} size="md" color="brand" />
        <div>
          <Text size="sm" fw={600}>
            {record.author_name}
          </Text>
          <Text size="xs" opacity={0.6}>
            {record.user_id?.substring(0, 8)}
          </Text>
        </div>
      </Group>
    ),
  },
  {
    accessor: "message_text",
    title: "Message",
    width: 400,
    render: (record: any) => (
      <Stack gap={4}>
        <Text size="sm" lineClamp={2}>
          {record.message_text}
        </Text>
        {record.is_solution && (
          <Badge color="green" size="xs" variant="light">
            Solution
          </Badge>
        )}
      </Stack>
    ),
  },
  {
    accessor: "upvote_count",
    title: "Votes",
    render: (record: any) => (
      <Group gap="xs" wrap="nowrap">
        <Tooltip label="Upvotes">
          <Group gap={4}>
            <ThumbsUp size={14} />
            <Text size="xs">{record.upvote_count}</Text>
          </Group>
        </Tooltip>
        <Tooltip label="Downvotes">
          <Group gap={4}>
            <ThumbsDown size={14} />
            <Text size="xs">{record.downvote_count}</Text>
          </Group>
        </Tooltip>
      </Group>
    ),
    sortable: true,
  },
  {
    accessor: "is_solution",
    title: "Type",
    render: (record: any) => (
      <Badge
        color={record.is_solution ? "green" : "blue"}
        size="sm"
        variant="light"
      >
        {record.is_solution ? "Solution" : "Comment"}
      </Badge>
    ),
    sortable: true,
  },
  {
    accessor: "is_deleted",
    title: "Status",
    render: (record: any) => (
      <Badge
        color={record.is_deleted ? "red" : "green"}
        size="sm"
      >
        {record.is_deleted ? "Deleted" : "Active"}
      </Badge>
    ),
    sortable: true,
  },
  {
    accessor: "created_at",
    title: "Date",
    render: (record: any) => (
      <Text size="xs">
        {new Date(record.created_at).toLocaleDateString()}
      </Text>
    ),
    sortable: true,
  },
];
