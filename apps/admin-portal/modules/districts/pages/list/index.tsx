"use client";

import { useState } from "react";
import { DataTableShell } from "@settle/admin";
import { moduleInfo } from "../../module.config";
import {
  MapPinIcon,
  TableIcon,
  UsersIcon,
  CheckIcon,
} from "@phosphor-icons/react";
import { Badge, Modal, Button, Group } from "@mantine/core";
import { DataTableWrapper, ListHandler, FormHandler } from "@settle/core";
import { getDistricts } from "../../module.api";
import { columns } from "./list.columns";
import { formConfig } from "../../form/form.config";
import { DistrictFormFields } from "../../form";

export function _List() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle new API response format with pagination object
  const handlePaginationResponse = (response: any) => {
    if (response?.pagination && typeof response.pagination === "object") {
      return {
        pages: response.pagination.total_pages || 1,
        totalItems: response.pagination.total_items || 0,
      };
    }
    return { pages: 1, totalItems: 0 };
  };

  return (
    <>
      <DataTableWrapper
        testMode
        queryKey={"rea.districts.list"}
        queryGetFn={getDistricts}
        dataKey="results"
        enableServerQuery={true}
        paginationResponseFn={handlePaginationResponse}
      >
        <DataTableShell
          bread={moduleInfo.bread}
          moduleInfo={moduleInfo}
          columns={columns}
          sustained={true}
          hasServerSearch={true}
          onNewClick={() => setIsModalOpen(true)}
          filterList={[
            {
              label: "Status",
              type: "select",
              options: ["Active", "Inactive"],
            },
            {
              label: "Population Range",
              type: "select",
              options: ["<100K", "100K-500K", "500K-1M", "1M+"],
            },
          ]}
        />
      </DataTableWrapper>

      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`New ${moduleInfo.label}`}
        size="lg"
      >
        <FormHandler
          {...formConfig}
          formType="new"
          onSubmitSuccess={() => setIsModalOpen(false)}
        >
          <DistrictFormFields />
          <Group justify="flex-end" mt="md">
            <Button type="submit">Create {moduleInfo.label}</Button>
          </Group>
        </FormHandler>
      </Modal>
    </>
  );
}
