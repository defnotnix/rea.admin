"use client";

import { useForm } from "@mantine/form";
import {
  TextInput,
  Textarea,
  Select,
  Button,
  Stack,
  Group,
  Text,
  Alert,
  Stepper,
  Box,
  Progress,
} from "@mantine/core";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  agendaApplyFormConfig,
  stepSchemas,
  type AgendaApplyFormData,
} from "./form.config";
import { submitAgendaApplication } from "../../module.api";
import { CheckCircle, Warning } from "@phosphor-icons/react";

const DISTRICTS = [
  { value: "kathmandu", label: "Kathmandu" },
  { value: "bhaktapur", label: "Bhaktapur" },
  { value: "lalitpur", label: "Lalitpur" },
  { value: "kavre", label: "Kavre" },
  { value: "nuwakot", label: "Nuwakot" },
  { value: "rasuwa", label: "Rasuwa" },
  { value: "dhading", label: "Dhading" },
  { value: "chitwan", label: "Chitwan" },
  { value: "makwanpur", label: "Makwanpur" },
  { value: "sindhupalchok", label: "Sindhupalchok" },
];

export function AgendaApplyForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<AgendaApplyFormData>({
    initialValues: agendaApplyFormConfig.initial,
  });

  const mutation = useMutation({
    mutationFn: submitAgendaApplication,
    onSuccess: () => {
      setSubmitSuccess(true);
      setSubmitError(null);
      form.reset();
      setActiveStep(0);
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    },
    onError: (error) => {
      setSubmitError(
        error instanceof Error ? error.message : "Failed to submit application"
      );
      setSubmitSuccess(false);
    },
  });

  const handleNextStep = () => {
    // Get the schema for the current step
    const currentStepSchema =
      stepSchemas[activeStep as keyof typeof stepSchemas];

    // Extract the values for the current step
    const stepValues = getFieldsForStep(activeStep).reduce(
      (acc, field) => {
        acc[field] = form.values[field];
        return acc;
      },
      {} as Record<string, any>
    );

    // Validate the current step
    const result = currentStepSchema.safeParse(stepValues);

    if (result.success) {
      setActiveStep((prev) => prev + 1);
      setSubmitError(null);
    } else {
      // Set errors from validation result
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as string;
        form.setFieldError(fieldName, issue.message);
      });
    }
  };

  const handlePreviousStep = () => {
    setActiveStep((prev) => prev - 1);
    setSubmitError(null);
  };

  const handleSubmit: any = form.onSubmit((values) => {
    mutation.mutate(values);
  });

  const getFieldsForStep = (step: number): (keyof AgendaApplyFormData)[] => {
    switch (step) {
      case 0:
        return ["title"];
      case 1:
        return ["problemStatement"];
      case 2:
        return ["description"];
      case 3:
        return ["district"];
      default:
        return [];
    }
  };

  const progress = ((activeStep + 1) / 4) * 100;

  return (
    <Stack gap="lg">
      {submitSuccess && (
        <Alert
          icon={<CheckCircle size={16} />}
          title="Success!"
          color="green"
          variant="light"
        >
          Your agenda application has been submitted successfully. Thank you for
          bringing this issue to the forum!
        </Alert>
      )}

      {submitError && (
        <Alert
          icon={<Warning size={16} />}
          title="Error"
          color="red"
          variant="light"
        >
          {submitError}
        </Alert>
      )}

      <Box>
        <Stepper
          iconSize={32}
          size="xs"
          active={activeStep}
          onStepClick={setActiveStep}
        >
          <Stepper.Step label="Title" description="Problem title" />
          <Stepper.Step label="Statement" description="Problem statement" />
          <Stepper.Step label="Details" description="Full description" />
          <Stepper.Step label="Location" description="Affected district" />
        </Stepper>

       
      </Box>

      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          {/* Step 0: Title */}
          {activeStep === 0 && (
            <div>
              <Text size="sm" fw={500} mb="xs">
                Problem Title
              </Text>
              <Text size="xs" c="dimmed" mb="md">
                Enter a clear, concise title for the problem you want to raise
              </Text>
              <TextInput
                placeholder="e.g., Pothole Crisis in Main Roads"
                {...form.getInputProps("title")}
                disabled={mutation.isPending}
              />
              {form.errors.title && (
                <Text c="red" size="sm" mt={4}>
                  {form.errors.title}
                </Text>
              )}
            </div>
          )}

          {/* Step 1: Problem Statement */}
          {activeStep === 1 && (
            <div>
              <Text size="sm" fw={500} mb="xs">
                Problem Statement
              </Text>
              <Text size="xs" c="dimmed" mb="md">
                Summarize what the core problem is in 20-500 characters
              </Text>
              <Textarea
                placeholder="What is the core problem you want to discuss?"
                minRows={4}
                {...form.getInputProps("problemStatement")}
                disabled={mutation.isPending}
              />
              {form.errors.problemStatement && (
                <Text c="red" size="sm" mt={4}>
                  {form.errors.problemStatement}
                </Text>
              )}
            </div>
          )}

          {/* Step 2: Description */}
          {activeStep === 2 && (
            <div>
              <Text size="sm" fw={500} mb="xs">
                Detailed Description
              </Text>
              <Text size="xs" c="dimmed" mb="md">
                Provide comprehensive context, background, and details about the
                problem
              </Text>
              <Textarea
                placeholder="Provide more context, background information, and details about the problem"
                minRows={6}
                {...form.getInputProps("description")}
                disabled={mutation.isPending}
              />
              {form.errors.description && (
                <Text c="red" size="sm" mt={4}>
                  {form.errors.description}
                </Text>
              )}
            </div>
          )}

          {/* Step 3: District */}
          {activeStep === 3 && (
            <div>
              <Text size="sm" fw={500} mb="xs">
                District / Location
              </Text>
              <Text size="xs" c="dimmed" mb="md">
                Select the primary district or location affected by this issue
              </Text>
              <Select
                placeholder="Select the primary district or location affected"
                data={DISTRICTS}
                searchable
                {...form.getInputProps("district")}
                disabled={mutation.isPending}
              />
              {form.errors.district && (
                <Text c="red" size="sm" mt={4}>
                  {form.errors.district}
                </Text>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <Group justify="space-between" mt="xl">
            <Button
              variant="outline"
              onClick={handlePreviousStep}
              disabled={activeStep === 0 || mutation.isPending}
            >
              Back
            </Button>

            {activeStep === 3 ? (
              <Button
                type="submit"
                loading={mutation.isPending}
                onClick={handleSubmit}
              >
                Submit Application
              </Button>
            ) : (
              <Button onClick={handleNextStep} disabled={mutation.isPending}>
                Next
              </Button>
            )}
          </Group>
        </Stack>
      </form>
    </Stack>
  );
}
