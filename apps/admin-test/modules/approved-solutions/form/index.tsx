"use client";

import { TextInput, Stack, Select, Textarea } from "@mantine/core";

export function ApprovedSolutionFormFields() {
  return (
    <Stack gap="md" p="md">
      <TextInput
        label="Problem ID"
        placeholder="Enter problem ID"
        required
        name="problem_id"
      />
      <TextInput
        label="Chat Message ID"
        placeholder="Enter chat message ID"
        required
        name="chat_message_id"
      />
      <TextInput
        label="Title"
        placeholder="Enter solution title"
        required
        name="title"
      />
      <Textarea
        label="Description"
        placeholder="Enter solution description"
        required
        minRows={4}
        name="description"
      />
      <Select
        label="Status"
        placeholder="Select status"
        data={[
          { value: "published", label: "Published" },
          { value: "draft", label: "Draft" },
        ]}
        defaultValue="draft"
        required
        name="status"
      />
      <TextInput
        label="Approved By (User ID)"
        placeholder="Enter user ID who approved"
        name="approved_by"
      />
    </Stack>
  );
}
