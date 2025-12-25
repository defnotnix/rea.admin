"use client";

import { Group, Button } from "@mantine/core";
import { FormHandler } from "@settle/core";
import { FormShell } from "@settle/admin";
import { moduleInfo } from "../../module.config";
import { AgendaFormFields } from "../../form";
import { formConfig as baseFormConfig } from "../../form/form.config";

const formConfig = {
  ...baseFormConfig,
  method: "PUT" as const,
};

interface EditAgendaProps {
  id: string;
}

export function EditAgenda({ id }: EditAgendaProps) {
  return (
    <FormShell
      moduleInfo={moduleInfo}
      title={`Edit ${moduleInfo.label}`}
    >
      <FormHandler {...formConfig} formType="edit">
        <AgendaFormFields />
        <Group justify="flex-end" mt="xl">
          <Button type="submit">
            Save Changes
          </Button>
        </Group>
      </FormHandler>
    </FormShell>
  );
}
