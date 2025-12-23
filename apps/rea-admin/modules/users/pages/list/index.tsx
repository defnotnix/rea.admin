"use client";

import { useState } from "react";
import { Modal, Button, Group } from "@mantine/core";
import { DataTableShell } from "@settle/admin";
import { moduleInfo } from "../../module.config";
import {
  UsersIcon,
  TableIcon,
  CheckIcon,
  UserIcon,
} from "@phosphor-icons/react";
import { Badge } from "@mantine/core";
import { DataTableWrapper, ListHandler } from "@settle/core";
import { getUsers } from "../../module.api";
import { columns } from "./list.columns";
import { FormHandler } from "@settle/core";
import { formConfig } from "../../forms/main/form.config";
import { UserFormFields } from "../../form";

export function _List() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <DataTableWrapper
        queryKey={"rea.users.list"}
        queryGetFn={getUsers}
        dataKey="data"
      >
        <DataTableShell
          bread={moduleInfo.bread}
          moduleInfo={moduleInfo}
          sustained={true}
          onNewClick={() => setIsModalOpen(true)}
          columns={columns}
          tabs={[
            {
              label: "All",
              leftSection: <TableIcon weight="duotone" />,
            },
            {
              label: "Citizens",
              leftSection: <UsersIcon weight="duotone" />,
              rightSection: <Badge size="xs">342</Badge>,
            },
            {
              label: "Moderators",
              leftSection: <UserIcon weight="duotone" />,
              rightSection: <Badge size="xs">24</Badge>,
            },
            {
              label: "Active",
              leftSection: <CheckIcon weight="duotone" />,
            },
          ]}
          filterList={[
            {
              label: "Role",
              type: "select",
              options: ["Citizen", "Moderator"],
            },
            {
              label: "Verification Status",
              type: "select",
              options: ["Verified", "Unverified"],
            },
            {
              label: "Account Status",
              type: "select",
              options: ["Active", "Inactive"],
            },
            {
              label: "Profession",
              type: "text",
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
          onSubmitSuccess={() => setIsModalOpen(false)}
        >
          <UserFormFields />
          <Group justify="flex-end" mt="md">
            <Button type="submit">Create {moduleInfo.label}</Button>
          </Group>
        </FormHandler>
      </Modal>
    </>
  );
}
