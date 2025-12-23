"use client";

import {
  TextInput,
  PasswordInput,
  Select,
  Checkbox,
  Stack,
  Switch,
  Grid,
  Button,
  Group,
} from "@mantine/core";

export function UserFormFields() {
  return (
    <Stack gap="md" p="md">
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
      <Switch
        label="Moderator"
        description="Grant moderator privileges"
        name="is_moderator"
      />
      <Grid>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Checkbox label="Is Verified" name="is_verified" />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Checkbox label="Is Active" defaultChecked name="is_active" />
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
