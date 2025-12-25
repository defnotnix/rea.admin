"use client";

import { Group, Button } from "@mantine/core";
import { FormHandler } from "@settle/core";
import { FormShell } from "@settle/admin";
import { moduleInfo } from "../../module.config";
import { AgendaFormFields } from "../../form";
import { formConfig } from "../../form/form.config";

export function NewAgenda() {
  return (
    <FormShell
      moduleInfo={moduleInfo}
      title={`New ${moduleInfo.label}`}
    >
      <FormHandler {...formConfig} formType="new">
        <AgendaFormFields />
        <Group justify="flex-end" mt="xl">
          <Button type="submit">
            Create {moduleInfo.label}
          </Button>
        </Group>
      </FormHandler>
    </FormShell>
  );
}
