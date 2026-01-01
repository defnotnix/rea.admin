"use client";

import { DataTableModalShell } from "@settle/admin";
import { moduleInfo } from "../../module.config";
import {
  BookmarkIcon,
  TableIcon,
  CheckIcon,
  XIcon,
} from "@phosphor-icons/react";
import { Badge } from "@mantine/core";
import { DataTableWrapper } from "@settle/core";
import { useRouter } from "next/navigation";
import {
  getAgendas,
  createAgenda,
  updateAgenda,
  deleteAgenda,
} from "../../module.api";
import { columns } from "./list.columns";
import { formConfig } from "../../form/form.config";
import { AgendaFormFields } from "../../form";

export function _List() {
  const router = useRouter();

  // This function is called by DataTableWrapper after fetching data
  // It extracts pagination metadata from the new API response format
  const handlePaginationResponse = (response: any) => {
    // Handle new API response format with pagination object
    if (response?.pagination && typeof response.pagination === "object") {
      const pagination = response.pagination;
      return {
        pages: pagination.total_pages || 1,
        totalItems: pagination.total_items || 0,
      };
    }

    // Fallback for old format (count, next, previous)
    if (response && typeof response.count === "number") {
      const count = response.count;
      const resultsLength = Array.isArray(response.results)
        ? response.results.length
        : 0;
      const pageSize = resultsLength > 0 ? Math.max(resultsLength, 25) : 25;
      const pages = Math.ceil(count / pageSize);

      return {
        pages,
        totalItems: count,
      };
    }

    // Default fallback
    return {
      pages: 1,
      totalItems: 0,
    };
  };

  return (
    <DataTableWrapper
      queryKey={"rea.agendas.list"}
      queryGetFn={getAgendas}
      dataKey="results"
      enableServerQuery={true}
      paginationResponseFn={handlePaginationResponse}
    >
      <DataTableModalShell
        moduleInfo={moduleInfo}
        columns={columns}
        hasServerSearch={true}
        tabs={[
          {
            label: "All",
            leftSection: <TableIcon weight="duotone" />,
          },
          {
            label: "Pending",
            leftSection: <BookmarkIcon weight="duotone" />,
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
            options: ["Pending", "Approved", "Rejected", "Archived"],
          },
          {
            label: "District",
            type: "select",
            options: [],
          },
        ]}
        onCreateApi={createAgenda}
        onEditApi={updateAgenda}
        onDeleteApi={deleteAgenda}
        modalWidth="lg"
        hasReviewPage={true}
        createFormComponent={({ isCreate }) => (
          <AgendaFormFields isCreate={isCreate} />
        )}
        editFormComponent={({ isCreate }) => (
          <AgendaFormFields isCreate={isCreate} />
        )}
        modalFormConfig={formConfig}
      />
    </DataTableWrapper>
  );
}
