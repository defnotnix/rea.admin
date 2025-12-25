"use client";

import { useState } from "react";
import { DataTableShell } from "@settle/admin";
import { moduleInfo } from "../../module.config";
import {
  ChatCircleIcon,
  TableIcon,
  CheckIcon,
} from "@phosphor-icons/react";
import { Badge, Modal, Button, Group } from "@mantine/core";
import { DataTableWrapper, ListHandler, FormHandler } from "@settle/core";
import { getChatMessages } from "../../module.api";
import { columns } from "./list.columns";
import { formConfig } from "../../form/form.config";
import { ChatFormFields } from "../../form";

export function _List() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <DataTableWrapper
        queryKey={"rea.chat.list"}
        queryGetFn={getChatMessages}
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
              label: "All Messages",
              leftSection: <TableIcon weight="duotone" />,
            },
            {
              label: "Solutions",
              leftSection: <CheckIcon weight="duotone" />,
              rightSection: <Badge size="xs">156</Badge>,
            },
            {
              label: "Comments",
              leftSection: <ChatCircleIcon weight="duotone" />,
              rightSection: <Badge size="xs">342</Badge>,
            },
          ]}
          filterList={[
            {
              label: "Message Type",
              type: "select",
              options: ["All", "Solutions", "Comments"],
            },
            {
              label: "Status",
              type: "select",
              options: ["Active", "Deleted"],
            },
            {
              label: "Vote Range",
              type: "select",
              options: ["Any", "Positive", "Negative"],
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
          <ChatFormFields />
          <Group justify="flex-end" mt="md">
            <Button type="submit">Create {moduleInfo.label}</Button>
          </Group>
        </FormHandler>
      </Modal>
    </>
  );
}
