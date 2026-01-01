"use client";

import { TextInput, Stack, Select } from "@mantine/core";

export function DistrictFormFields() {
  return (
    <Stack gap="md" p="md">
      <TextInput
        label="District Name"
        placeholder="Enter district name"
        required
        name="name"
      />
      <TextInput
        label="Division"
        placeholder="Enter division"
        required
        name="division"
      />
      <TextInput
        label="Population"
        placeholder="Enter population"
        type="number"
        name="population"
      />
      <Select
        label="Status"
        placeholder="Select status"
        data={[
          { value: "active", label: "Active" },
          { value: "inactive", label: "Inactive" },
        ]}
        defaultValue="active"
        required
        name="status"
      />
    </Stack>
  );
}
