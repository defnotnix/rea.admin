import { Avatar, Badge, Group, Stack, Text, ActionIcon, Menu } from "@mantine/core";
import { Eye, EyeSlash, DotsThreeVertical } from "@phosphor-icons/react";

export const columns = [
  {
    accessor: "problem_title",
    title: "Problem",
    width: 300,
    render: (record: any) => (
      <Stack gap={2}>
        <Text size="sm" fw={600} lineClamp={2}>
          {record.problem_title}
        </Text>
        <Text size="xs" opacity={0.6}>
          {record.district_name}
        </Text>
      </Stack>
    ),
    sortable: true,
  },
  {
    accessor: "ai_draft_title",
    title: "Solution Title",
    width: 280,
    render: (record: any) => (
      <Text size="sm" fw={500} lineClamp={2}>
        {record.ai_draft_title || "AI Generated Solution"}
      </Text>
    ),
  },
  {
    accessor: "author_name",
    title: "Solution Author",
    render: (record: any) => (
      <Group wrap="nowrap">
        <Avatar name={record.author_name} size="sm" color="brand" />
        <Text size="sm">{record.author_name}</Text>
      </Group>
    ),
  },
  {
    accessor: "is_published",
    title: "Published",
    render: (record: any) => (
      <Badge
        color={record.is_published ? "green" : "gray"}
        size="sm"
        leftSection={record.is_published ? <Eye size={12} /> : <EyeSlash size={12} />}
      >
        {record.is_published ? "Published" : "Draft"}
      </Badge>
    ),
    sortable: true,
  },
  {
    accessor: "approved_at",
    title: "Approved",
    render: (record: any) => (
      <Text size="xs">
        {new Date(record.approved_at).toLocaleDateString()}
      </Text>
    ),
    sortable: true,
  },
];
