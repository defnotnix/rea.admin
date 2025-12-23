"use client";

import { TextInput, PasswordInput, Select, Checkbox, Stack, Button, Group } from "@mantine/core";

export function UserForm() {
  return (
    <Stack gap="md">
      <TextInput
        label="Full Name"
        placeholder="Enter full name"
        required
        name="full_name"
      />
      <TextInput
        label="Email"
        placeholder="Enter email"
        type="email"
        required
        name="email"
      />
      <TextInput
        label="Phone Number"
        placeholder="Enter phone number"
        required
        name="phone_number"
      />
      <PasswordInput
        label="Password"
        placeholder="Enter password"
        required
        name="password_hash"
      />
      <TextInput
        label="Profession"
        placeholder="Enter profession (optional)"
        name="profession"
      />
      <Select
        label="District"
        placeholder="Select district"
        data={[]}
        required
        name="district_id"
      />
      <Checkbox
        label="Is Moderator"
        name="is_moderator"
      />
      <Checkbox
        label="Is Verified"
        name="is_verified"
      />
      <Checkbox
        label="Is Active"
        defaultChecked
        name="is_active"
      />
      <Group justify="flex-end" mt="md">
        <Button type="submit">Create User</Button>
      </Group>
    </Stack>
  );
}
