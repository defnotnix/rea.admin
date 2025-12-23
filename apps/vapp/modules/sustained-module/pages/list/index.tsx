"use client";

import { DataTableShell } from "@settle/admin";
import { moduleInfo } from "../../module.config";
import {
  PauseIcon,
  StarIcon,
  TableIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import { Badge } from "@mantine/core";
import { DataTableWrapper, ListHandler } from "@settle/core";
import { getRecords } from "../../module.api";
import { columns } from "./list.columns";

//next

//mantine

//mantine

//icons

//styles

//components

//vf

//api

export function _List() {
  // * DEFINITIONS

  // * CONTEXT

  // * STATE

  // * FUNCTIONS

  // * COMPONENTS

  // * ANIMATIONS

  return (
    <>
      <DataTableWrapper
        queryKey={"vf.sustained-module.list"}
        queryGetFn={getRecords}
        dataKey="products"
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
              label: "Active",
              leftSection: <UsersIcon weight="duotone" />,
              rightSection: <Badge size="xs">34</Badge>,
            },
            {
              label: "Inactive",
              leftSection: <PauseIcon weight="duotone" />,
            },
          ]}
          hideFilters
          filterList={[
            {
              label: "Waranty",
              type: "select",
              options: [
                "1-3 months",
                "3-6 months",
                "6-12 months",
                "1-2 years",
                "2-5 years",
                "5+ years",
              ],
            },
            {
              label: "Date of Entry",
              type: "date",
            },
            {
              label: "SKU",
              type: "text",
            },
            {
              label: "Status",
              type: "select",
              options: ["Active", "Inactive"],
            },
            {
              label: "Rating",
              type: "number",
              icon: StarIcon,
            },
          ]}
        />
      </DataTableWrapper>
    </>
  );
}
