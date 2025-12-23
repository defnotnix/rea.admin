"use client";

import { Group, Button } from "@mantine/core";
import { FormHandler } from "@settle/core";
import { FormShell } from "@settle/admin";
import { formConfig } from "../../forms/main/form.config";
import { moduleInfo } from "../../module.config";
import { ProblemFormFields } from "../../form";

export function NewProblem() {
  return (
    <FormShell
      bread={moduleInfo.bread}
      moduleInfo={moduleInfo}
      title={`New ${moduleInfo.label}`}
    >
      <FormHandler {...formConfig}>
        <ProblemFormFields />
        <Group justify="flex-end" mt="xl">
          <Button type="submit">
            Create {moduleInfo.label}
          </Button>
        </Group>
      </FormHandler>
    </FormShell>
  );
}
