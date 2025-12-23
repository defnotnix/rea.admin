"use client";

import { TextInput, Textarea, Select, Stack } from "@mantine/core";

export function ProblemFormFields() {
  return (
    <Stack gap="md" p="md">
      <TextInput
        label="Problem Title"
        placeholder="Enter a clear, concise title for the problem"
        required
        name="title"
      />
      <Textarea
        label="Detailed Description"
        placeholder="Provide detailed information about the problem, including what happened, when, and any relevant context"
        required
        minRows={6}
        name="description"
      />
      <Select
        label="District"
        placeholder="Select the affected district"
        data={[]}
        required
        name="district_id"
      />
      <Select
        label="Status"
        placeholder="Select initial status"
        data={[
          { value: "pending", label: "Pending Review" },
          { value: "approved", label: "Approved" },
        ]}
        defaultValue="pending"
        name="status"
      />
    </Stack>
  );
}
