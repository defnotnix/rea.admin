"use client";

import { Modal, Stack, TextInput, Textarea, Group } from "@mantine/core";
import { FormWrapper } from "@settle/core";
import { FormSubmitButton } from "@settle/admin";
import { SolutionFormData } from "../../schemas";

interface SolutionFormModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (data: SolutionFormData) => Promise<void>;
  editingId: string | null;
  initialData?: SolutionFormData;
}

export function SolutionFormModal({
  opened,
  onClose,
  onSubmit,
  editingId,
  initialData,
}: SolutionFormModalProps) {
  const handleClose = () => {
    onClose();
  };

  const handleSubmitSuccess = async (res: any) => {
    handleClose();
  };

  const handleSubmitError = (err: any) => {
    console.error("Form submission error:", err);
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={editingId ? "Edit Solution" : "Create New Solution"}
      centered
      closeOnClickOutside={false}
    >
      <FormWrapper
        queryKey={`solution.${editingId || "create"}`}
        formName={`solution-${editingId || "create"}`}
        mode="uncontrolled"
        initial={
          initialData || {
            title: "",
            summary: "",
          }
        }
        steps={1}
        validation={[]}
        disabledSteps={[]}
        apiSubmitFn={async (data: SolutionFormData) => {
          await onSubmit(data);
        }}
        transformFnSubmit={(formdata) => formdata}
        formClearOnSuccess={true}
        submitSuccessFn={handleSubmitSuccess}
        submitErrorFn={handleSubmitError}
        notifications={{
          isLoading: () => {},
          isSuccess: () => {},
          isWarning: () => {},
          isError: () => {},
          isValidationError: () => {},
          isValidationStepError: () => {},
          isInfo: () => {},
        }}
      >
        <SolutionFormFields />
      </FormWrapper>
    </Modal>
  );
}

function SolutionFormFields() {
  const form = FormWrapper.useForm();

  return (
    <Stack gap="md" p="md">
      <TextInput
        label="Solution Title"
        placeholder="Enter solution title"
        required
        {...form.getInputProps("title")}
      />

      <Textarea
        label="Summary"
        placeholder="Enter solution summary"
        minRows={4}
        {...form.getInputProps("summary")}
      />

      <Group justify="flex-end" mt="md">
        <FormSubmitButton />
      </Group>
    </Stack>
  );
}
