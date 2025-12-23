"use client";

import { TextInput } from "@mantine/core";
import { FormHandler } from "@settle/core";
import { formConfig } from "../../forms/main/form.config";

export function _New() {
  return (
    <FormHandler {...formConfig}>
      <>
        <TextInput />
      </>
    </FormHandler>
  );
}
