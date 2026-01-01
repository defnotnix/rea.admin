"use client";

import { Modal, Stack, TextInput, Group, Button } from "@mantine/core";
import { FormWrapper } from "@settle/core";
import { FormSubmitButton } from "@settle/admin";
import { ThreadFormData } from "../../schemas";

interface ThreadFormModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (data: ThreadFormData) => Promise<void>;
  editingId: string | null;
  initialData?: ThreadFormData;
}

export function ThreadFormModal({
  opened,
  onClose,
  onSubmit,
  editingId,
  initialData,
}: ThreadFormModalProps) {
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
    top={0}
      opened={opened}
      onClose={handleClose}
      title={editingId ? "Edit Thread" : "Create New Thread"}
      centered
      closeOnClickOutside={false}
    >
      <FormWrapper
        queryKey={`thread.${editingId || "create"}`}
        formName={`thread-${editingId || "create"}`}
        mode="uncontrolled"
        initial={
          initialData || {
            title: "",
          }
        }
        steps={1}
        validation={[]}
        disabledSteps={[]}
        apiSubmitFn={async (data: ThreadFormData) => {
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
        <ThreadFormFields />
      </FormWrapper>
    </Modal>
  );
}

function ThreadFormFields() {
  const form = FormWrapper.useForm();

  return (
    <Stack gap="md" p="md">
      <TextInput
        label="Thread Title"
        placeholder="Enter thread title"
        required
        {...form.getInputProps("title")}
      />

      <Group justify="flex-end" mt="md">
        <FormSubmitButton />
      </Group>
    </Stack>
  );
}
