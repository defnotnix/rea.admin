"use client";

import { useRouter } from "next/navigation";
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
import { getAgendas } from "../../module.api";
import { columns } from "./list.columns";

export function _List() {
  const router = useRouter();

  const handleReview = (selectedRecords: any[]) => {
    if (selectedRecords.length > 0) {
      const id = selectedRecords[0].id;
      router.push(`/admin/agenda/${id}`);
    }
  };

  return (
    <>
      <DataTableWrapper
        queryKey={"admin.agenda.list"}
        queryGetFn={getAgendas}
        dataKey="data"
      >
        <DataTableShell
          onReview={handleReview}
          moduleInfo={moduleInfo}
          columns={columns}
          tabs={[
            {
              label: "All",
              leftSection: <TableIcon weight="duotone" />,
            },
            {
              label: "Pending",
              leftSection: <ClockIcon weight="duotone" />,
              rightSection: <Badge size="xs">0</Badge>,
            },
            {
              label: "Approved",
              leftSection: <CheckIcon weight="duotone" />,
              rightSection: <Badge size="xs">0</Badge>,
            },
            {
              label: "Rejected",
              leftSection: <XIcon weight="duotone" />,
              rightSection: <Badge size="xs">0</Badge>,
            },
          ]}
          filterList={[
            {
              label: "Status",
              type: "select",
              options: ["Pending", "Approved", "Rejected"],
            },
            {
              label: "Priority",
              type: "select",
              options: ["Low", "Medium", "High"],
            },
            {
              label: "Date Range",
              type: "date",
            },
          ]}
        />
      </DataTableWrapper>
    </>
  );
}
