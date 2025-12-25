"use client";

import { DataTableModalShell } from "@settle/admin";
import { moduleInfo } from "../../module.config";
import {
  UsersIcon,
  TableIcon,
  CheckIcon,
  UserIcon,
} from "@phosphor-icons/react";
import { Badge } from "@mantine/core";
import { DataTableWrapper } from "@settle/core";
import { getUsers, createUser, updateUser, deleteUser } from "../../module.api";
import { columns } from "./list.columns";
import { formConfig } from "../../form/form.config";
import { UserFormFields } from "../../form";

export function _List() {
  return (
    <DataTableWrapper
      queryKey={"rea.users.list"}
      queryGetFn={getUsers}
      dataKey="results"
    >
      <DataTableModalShell
        moduleInfo={moduleInfo}
        sustained={true}
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
        onCreateApi={createUser}
        onEditApi={updateUser}
        onDeleteApi={deleteUser}
        modalWidth="lg"
        createFormComponent={<UserFormFields />}
        editFormComponent={<UserFormFields />}
        modalFormConfig={formConfig}
      />
    </DataTableWrapper>
  );
}
