"use client";

import { TextInput, Stack, Select, Textarea } from "@mantine/core";

export function ChatFormFields() {
  return (
    <Stack gap="md" p="md">
      <TextInput
        label="Problem ID"
        placeholder="Enter problem ID"
        required
        name="problem_id"
      />
      <TextInput
        label="User ID"
        placeholder="Enter user ID"
        required
        name="user_id"
      />
      <Textarea
        label="Message Content"
        placeholder="Enter message content"
        required
        minRows={4}
        name="content"
      />
      <Select
        label="Message Type"
        placeholder="Select message type"
        data={[
          { value: "comment", label: "Comment" },
          { value: "solution", label: "Solution" },
        ]}
        defaultValue="comment"
        required
        name="message_type"
      />
      <Select
        label="Status"
        placeholder="Select status"
        data={[
          { value: "active", label: "Active" },
          { value: "deleted", label: "Deleted" },
        ]}
        defaultValue="active"
        required
        name="status"
      />
    </Stack>
  );
}
