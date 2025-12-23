"use client";

import { DataTableShell } from "@settle/admin";
import { moduleInfo } from "../../module.config";
import {
  CheckIcon,
  TableIcon,
  ClockIcon,
  XIcon,
} from "@phosphor-icons/react";
import { Badge } from "@mantine/core";
import { DataTableWrapper, ListHandler } from "@settle/core";
import { getProblems } from "../../module.api";
import { columns } from "./list.columns";

export function _List() {
  return (
    <>
      <DataTableWrapper
        queryKey={"rea.problems.list"}
        queryGetFn={getProblems}
        dataKey="data"
      >
        <DataTableShell
          bread={moduleInfo.bread}
          moduleInfo={moduleInfo}
          columns={columns}
          tabs={[
            {
              label: "All",
              leftSection: <TableIcon weight="duotone" />,
            },
            {
              label: "Pending Review",
              leftSection: <ClockIcon weight="duotone" />,
              rightSection: <Badge size="xs">12</Badge>,
            },
            {
              label: "Approved",
              leftSection: <CheckIcon weight="duotone" />,
              rightSection: <Badge size="xs">48</Badge>,
            },
            {
              label: "Rejected",
              leftSection: <XIcon weight="duotone" />,
              rightSection: <Badge size="xs">5</Badge>,
            },
          ]}
          filterList={[
            {
              label: "Status",
              type: "select",
              options: ["Pending", "Approved", "Rejected", "Solved"],
            },
            {
              label: "District",
              type: "select",
              options: [],
            },
            {
              label: "Date Range",
              type: "date",
            },
            {
              label: "Views",
              type: "select",
              options: ["<100", "100-500", "500-1000", "1000+"],
            },
          ]}
        />
      </DataTableWrapper>
    </>
  );
}
