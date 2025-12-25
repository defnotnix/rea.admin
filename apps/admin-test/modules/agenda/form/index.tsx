"use client";

import { TextInput, Stack, Select, Textarea } from "@mantine/core";

export function AgendaFormFields() {
  return (
    <Stack gap="md" p="md">
      <TextInput
        label="Title"
        placeholder="Enter agenda title"
        required
        name="title"
      />
      <Textarea
        label="Description"
        placeholder="Enter agenda description"
        required
        minRows={4}
        name="description"
      />
      <TextInput
        label="Date"
        placeholder="Enter agenda date (YYYY-MM-DD)"
        type="date"
        required
        name="date"
      />
      <TextInput
        label="Location"
        placeholder="Enter location"
        required
        name="location"
      />
      <Select
        label="Status"
        placeholder="Select status"
        data={[
          { value: "active", label: "Active" },
          { value: "inactive", label: "Inactive" },
          { value: "archived", label: "Archived" },
        ]}
        defaultValue="active"
        required
        name="status"
      />
    </Stack>
  );
}
