"use client";

import {
  TextInput,
  PasswordInput,
  Select,
  Checkbox,
  Stack,
  SimpleGrid,
  Card,
  Group,
  Text,
} from "@mantine/core";

export function UserFormFields() {
  return (
    <>
      <Stack gap="xs" p="md">
        <TextInput
          label="Full Name"
          placeholder="Enter full name"
          required
          name="full_name"
        />
        <SimpleGrid cols={2} spacing="xs">
          <TextInput
            label="Email"
            placeholder="Enter email"
            type="email"
            required
            name="email"
          />
          <PasswordInput
            label="Password"
            placeholder="Enter password"
            required
            name="password_hash"
          />

          <TextInput
            label="Phone Number"
            placeholder="Enter phone number"
            required
            name="phone_number"
          />

          <TextInput
            label="Profession"
            placeholder="Enter profession (optional)"
            name="profession"
          />
        </SimpleGrid>

        <Select
          label="District"
          placeholder="Select district"
          data={[]}
          required
          name="district_id"
        />
      </Stack>

      <Text my="xs" mx="md" opacity={0.5} size="xs">
        User Status & Permissions.
      </Text>

      <SimpleGrid cols={3} px="md" spacing="xs">
        <Card
          padding="md"
          radius="md"
          withBorder
          style={{ cursor: "pointer" }}
          component="label"
        >
          <Checkbox size="xs" mb="sm" name="is_moderator" />

          <Group justify="space-between">
            <div>
              <Text size="xs" fw={500}>
                Moderator Permissions
              </Text>
              <Text size="xs" c="dimmed">
                Grant moderator privileges to this user
              </Text>
            </div>
          </Group>
        </Card>

        <Card
          padding="md"
          radius="md"
          withBorder
          style={{ cursor: "pointer" }}
          component="label"
        >
          <Checkbox size="xs" mb="sm" name="is_verified" />

          <Group justify="space-between">
            <div>
              <Text size="xs" fw={500}>
                Verified
              </Text>
              <Text size="xs" c="dimmed">
                Mark this user as verified
              </Text>
            </div>
          </Group>
        </Card>

        <Card
          padding="md"
          radius="md"
          withBorder
          style={{ cursor: "pointer" }}
          component="label"
        >
          <Checkbox size="xs" mb="sm" name="is_active" defaultChecked />
          <Group justify="space-between">
            <div>
              <Text size="xs" fw={500}>
                Active
              </Text>
              <Text size="xs" c="dimmed">
                Enable or disable user account access
              </Text>
            </div>
          </Group>
        </Card>
      </SimpleGrid>
    </>
  );
}
