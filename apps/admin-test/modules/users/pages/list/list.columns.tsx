import { Avatar, Badge, Group, Stack, Text } from "@mantine/core";

export const columns = [
  {
    accessor: "full_name",
    title: "User",
    width: 250,
    render: (record: any) => (
      <Group wrap="nowrap">
        <Avatar name={record.full_name} size="sm" color="brand" />
        <div>
          <Text size="sm" fw={600}>
            {record.full_name}
          </Text>
          <Text size="xs" opacity={0.6}>
            {record.email}
          </Text>
        </div>
      </Group>
    ),
    sortable: true,
  },
  {
    accessor: "phone_number",
    title: "Phone",
  
  },
  {
    accessor: "profession",
    title: "Profession",
   
  },
  {
    accessor: "is_moderator",
    title: "Role",
    render: (record: any) => (
      <Badge color={record.is_moderator ? "blue" : "gray"} size="xs">
        {record.is_moderator ? "Moderator" : "Citizen"}
      </Badge>
    ),
    sortable: true,
  },
  {
    accessor: "is_verified",
    title: "Verified",
    render: (record: any) => (
      <Badge color={record.is_verified ? "green" : "yellow"} size="xs">
        {record.is_verified ? "Yes" : "No"}
      </Badge>
    ),
    sortable: true,
  },
  {
    accessor: "is_active",
    title: "Status",
    render: (record: any) => (
      <Badge color={record.is_active ? "green" : "red"} size="xs">
        {record.is_active ? "Active" : "Inactive"}
      </Badge>
    ),
    sortable: true,
  },
 
];
