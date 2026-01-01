"use client";

import {
  TextInput,
  Textarea,
  Select,
  Badge,
  Stack,
  SimpleGrid,
  Card,
  Text,
  Group,
} from "@mantine/core";
import { FormWrapper } from "@settle/core";
import { FormSubmitButton } from "@settle/admin";
import { useState, useEffect } from "react";
import { getDistricts } from "../../districts/module.api";

interface AgendaFormFieldsProps {
  isCreate?: boolean;
}

export function AgendaFormFields({ isCreate = true }: AgendaFormFieldsProps) {
  const form = FormWrapper.useForm();
  const [districtOptions, setDistrictOptions] = useState<
    Array<{ value: string; label: string }>
  >([]);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const data = await getDistricts();
        if (data && Array.isArray(data.results)) {
          const districtData = data.results.map((district: any) => ({
            value: district.id,
            label: district.name,
          }));
          setDistrictOptions(districtData);
        }
      } catch (error) {
        console.error("Failed to fetch districts:", error);
      }
    };

    fetchDistricts();
  }, []);

  return (
    <>
      <Stack gap="xs" p="md">
        <TextInput
          label="Title"
          placeholder="Enter agenda title"
          required
          {...form.getInputProps("title")}
        />

        <Textarea
          label="Description"
          placeholder="Enter detailed description"
          minRows={4}
          required
          {...form.getInputProps("description")}
        />

        <Select
          searchable
          label="District"
          placeholder="Select district"
          data={districtOptions}
          {...form.getInputProps("district")}
          required
          clearable
        />

        <TextInput
          label="Submitted By"
          placeholder="Name of submitter"
          required
          {...form.getInputProps("submitted_by_name")}
        />

        <FormSubmitButton isCreate={isCreate} />
      </Stack>
    </>
  );
}
