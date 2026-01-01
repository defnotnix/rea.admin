import { Badge } from "@mantine/core";

const getRelativeTime = (dateString: string): string => {
  if (!dateString) return "-";

  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 14) {
    if (diffDays === 0) {
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMins = Math.floor(diffMs / (1000 * 60));
        return diffMins === 0 ? "Just now" : `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
      }
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    }
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  }

  return date.toLocaleDateString();
};

export const columns = [
  {
    accessor: "title",
    title: "Title",
    sortable: true,
  },
  {
    accessor: "district_name",
    title: "District",
    sortable: true,
  },
  {
    accessor: "submitted_by_name",
    title: "Submitted By",
    sortable: true,
  },
  {
    accessor: "status",
    title: "Status",
    render: (record: any) => {
      const statusColors: Record<string, string> = {
        pending: "yellow",
        approved: "green",
        rejected: "red",
        archived: "gray",
      };
      return (
        <Badge color={statusColors[record.status] || "gray"} size="xs">
          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
        </Badge>
      );
    },
    sortable: true,
  },
  {
    accessor: "view_count",
    title: "Views",
    sortable: true,
  },
  {
    accessor: "solution_count",
    title: "Solutions",
    sortable: true,
  },
  {
    accessor: "created_at",
    title: "Created At",
    sortable: true,
    render: (record: any) => {
      return getRelativeTime(record.created_at);
    },
  },
  {
    accessor: "approved_at",
    title: "Approved At",
    sortable: true,
    render: (record: any) => {
      return getRelativeTime(record.approved_at);
    },
  },
];
