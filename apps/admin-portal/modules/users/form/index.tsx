"use client";

import {
  TextInput,
  PasswordInput,
  Select,
  Checkbox,
  Stack,
  SimpleGrid,
  Card,
  Text,
  Group,
} from "@mantine/core";
import { FormWrapper } from "@settle/core";
import { FormSubmitButton } from "@settle/admin";

interface UserFormFieldsProps {
  isCreate?: boolean;
}

export function UserFormFields({ isCreate = true }: UserFormFieldsProps) {
  const form = FormWrapper.useForm();

  return (
    <>
      <Stack gap="xs" p="md">
        <TextInput
          label="Full Name"
          placeholder="Enter full name"
          required
          {...form.getInputProps("full_name")}
        />
        <SimpleGrid cols={2} spacing="xs">
          <TextInput
            label="Email"
            placeholder="Enter email"
            type="email"
            required
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Enter password"
            required={!form.values.id}
            {...form.getInputProps("password_hash")}
          />

          <TextInput
            label="Phone Number"
            placeholder="Enter phone number"
            required
            {...form.getInputProps("phone_number")}
          />

          <TextInput
            label="Profession"
            placeholder="Enter profession (optional)"
            {...form.getInputProps("profession")}
          />
        </SimpleGrid>

        <Select
          label="District"
          placeholder="Select district"
          data={[]}
          required
          {...form.getInputProps("district_id")}
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
          <Checkbox
            size="xs"
            mb="sm"
            {...form.getInputProps("is_moderator", {
              type: "checkbox",
            })}
          />

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
          <Checkbox
            size="xs"
            mb="sm"
            {...form.getInputProps("is_verified", {
              type: "checkbox",
            })}
          />

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
          <Checkbox
            size="xs"
            mb="sm"
            defaultChecked={true}
            {...form.getInputProps("is_active", {
              type: "checkbox",
            })}
          />
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

      <FormSubmitButton isCreate={isCreate} />
    </>
  );
}
