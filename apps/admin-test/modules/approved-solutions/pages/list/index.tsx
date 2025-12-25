"use client";

import { useState } from "react";
import { DataTableShell } from "@settle/admin";
import { moduleInfo } from "../../module.config";
import {
  CheckIcon,
  TableIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@phosphor-icons/react";
import { Badge, Modal, Button, Group } from "@mantine/core";
import { DataTableWrapper, ListHandler, FormHandler } from "@settle/core";
import { getApprovedSolutions } from "../../module.api";
import { columns } from "./list.columns";
import { formConfig } from "../../form/form.config";
import { ApprovedSolutionFormFields } from "../../form";

export function _List() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <DataTableWrapper
        queryKey={"rea.approved-solutions.list"}
        queryGetFn={getApprovedSolutions}
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
              label: "Published",
              leftSection: <EyeIcon weight="duotone" />,
              rightSection: <Badge size="xs">89</Badge>,
            },
            {
              label: "Draft",
              leftSection: <EyeSlashIcon weight="duotone" />,
              rightSection: <Badge size="xs">23</Badge>,
            },
          ]}
          filterList={[
            {
              label: "Status",
              type: "select",
              options: ["Published", "Draft"],
            },
            {
              label: "District",
              type: "select",
              options: [],
            },
            {
              label: "Date Approved",
              type: "date",
            },
          ]}
          hideFilters
        />
      </DataTableWrapper>

      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`New ${moduleInfo.label}`}
        size="lg"
      >
        <FormHandler {...formConfig} formType="new" onSubmitSuccess={() => setIsModalOpen(false)}>
          <ApprovedSolutionFormFields />
          <Group justify="flex-end" mt="md">
            <Button type="submit">Create {moduleInfo.label}</Button>
          </Group>
        </FormHandler>
      </Modal>
    </>
  );
}
