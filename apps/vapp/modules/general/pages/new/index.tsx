"use client";

import React, { useState } from "react";
//next

//mantine
import {
  Button,
  Container,
  Group,
  MultiSelect,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
//vf
import { FormWrapper } from "@settle/core";
import { triggerNotification } from "@settle/admin";
//icons

//styles

//components

const formConfig = {
  formName: "general-form",
  initial: {
    name: "hello world",
    select: "x",
    multiselect: ["x"],
  },
  validation: [],
  steps: 4,
  disabledSteps: [2],
};

function Form() {
  const form = FormWrapper.useForm();

  return (
    <>
      <Stack p="md" gap="xs">
        <TextInput
          label="Name"
          placeholder="Name"
          description="Name"
          {...form.getInputProps("name")}
        />
        <SimpleGrid spacing="xs" cols={2}>
          <Select
            data={["x", "y", "z"]}
            label="Select"
            placeholder="Select"
            description="Select"
            {...form.getInputProps("select")}
          />
          <MultiSelect
            data={["x", "y", "z"]}
            label="MultiSelect"
            placeholder="MultiSelect"
            description="MultiSelect"
            {...form.getInputProps("multiselect")}
          />
        </SimpleGrid>
      </Stack>
    </>
  );
}

function ModuleNew() {
  const form = FormWrapper.useForm();
  const { current, handleStepNext, handleStepBack, handleSubmit, isLoading } =
    FormWrapper.useFormProps();

  return (
    <>
      <Container size="sm" py={32}>
        <Stack>
          <Text size="xl">A test form indeed</Text>
          <Paper mih={500} withBorder>
            <Form />
          </Paper>
          <Group justify="space-betwene">
            <Text size="xs">
              Current: {current + 1}/{formConfig.steps}
            </Text>
            <Group gap="xs" justify="flex-end">
              <Button onClick={handleStepBack}>Back</Button>
              <Button onClick={handleStepNext}>Next</Button>
              <Button onClick={handleSubmit}>Submit</Button>
            </Group>
          </Group>
        </Stack>
      </Container>
    </>
  );
}

export function _New() {
  return (
    <>
      <FormWrapper
        queryKey="general.new"
        testMode
        {...formConfig}
        notifications={triggerNotification.form}
        apiSubmitFn={(formdata, id) => {}}
        submitFormat="formdata"
        stepValidationFn={async (current, formdata) => {
          if (current == 1) {
            return {
              name: "This field is required.",
            };
          } else {
            return false;
          }
        }}
      >
        <ModuleNew />
      </FormWrapper>
    </>
  );
}
