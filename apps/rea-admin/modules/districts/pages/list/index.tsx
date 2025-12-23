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
import { formConfig } from "../../forms/main/form.config";
import { DistrictFormFields } from "../../form";

export function _List() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <DataTableWrapper
        queryKey={"rea.districts.list"}
        queryGetFn={getDistricts}
        dataKey="data"
      >
        <DataTableShell
          bread={moduleInfo.bread}
          moduleInfo={moduleInfo}
          columns={columns}
          sustained={true}
          onNewClick={() => setIsModalOpen(true)}
          tabs={[
            {
              label: "All",
              leftSection: <TableIcon weight="duotone" />,
            },
            {
              label: "Active",
              leftSection: <CheckIcon weight="duotone" />,
              rightSection: <Badge size="xs">24</Badge>,
            },
            {
              label: "Inactive",
              leftSection: <MapPinIcon weight="duotone" />,
            },
          ]}
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
        <FormHandler {...formConfig} onSubmitSuccess={() => setIsModalOpen(false)}>
          <DistrictFormFields />
          <Group justify="flex-end" mt="md">
            <Button type="submit">Create {moduleInfo.label}</Button>
          </Group>
        </FormHandler>
      </Modal>
    </>
  );
}
