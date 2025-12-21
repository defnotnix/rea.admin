import { Avatar, Badge, Group, Stack, Text } from "@mantine/core";

export const columns = [
  {
    accessor: "title",
    title: "Product",
    width: 300,
    render: (record: any) => (
      <Group wrap="nowrap">
        <Avatar size="md" src={record.thumbnail} />
        <div>
          <Text size="xs" fw={600}>
            {record.title}
          </Text>
          <Text size="xs" opacity={0.6}>
            {record.brand}
          </Text>
        </div>
      </Group>
    ),
    sortable: true,
  },

  {
    accessor: "price",
    title: "Price",
    render: (record: any) => (
      <Stack gap={0}>
        <Text size="xs" fw={600}>
          ${record.price}
        </Text>
        <Text size="xs" opacity={0.5}>
          -{record.discountPercentage}% off
        </Text>
      </Stack>
    ),
    sortable: true,
  },

  {
    accessor: "rating",
    title: "Rating",
    render: (record: any) => (
      <Badge size="xs" color={record.rating > 4.5 ? "green" : "yellow"}>
        {record.rating}
      </Badge>
    ),
    sortable: true,
  },

  {
    accessor: "stock",
    title: "Stock",
    render: (record: any) => (
      <Badge
        size="xs"
        color={record.stock > 10 ? "blue" : "red"}
        variant="light"
      >
        {record.stock} left
      </Badge>
    ),
    sortable: true,
  },

  {
    accessor: "category",
    title: "Category",
    render: (record: any) => (
      <Badge size="xs" variant="light">
        {record.category}
      </Badge>
    ),
    sortable: true,
  },

  {
    accessor: "availabilityStatus",
    title: "Availability",
    render: (record: any) => (
      <Badge
        size="xs"
        color={record.availabilityStatus === "Low Stock" ? "orange" : "green"}
      >
        {record.availabilityStatus}
      </Badge>
    ),
    sortable: true,
  },

  {
    accessor: "sku",
    title: "SKU",
  },

  {
    accessor: "warrantyInformation",
    title: "Warranty",
  },

  {
    accessor: "shippingInformation",
    title: "Shipping",
  },
];
