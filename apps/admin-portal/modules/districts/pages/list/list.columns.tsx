import { Badge, Group, Stack, Text } from "@mantine/core";

export const columns = [
  {
    accessor: "name",
    title: "District Name",
  

    sortable: true,
  },
  {
    accessor: "code",
    title: "District Code",
  

    sortable: true,
  },
  {
    accessor: "population",
    title: "Population",

    sortable: true,
  },

  {
    accessor: "agenda_count",
    title: "Agenda Discussions",
   
  },
];
