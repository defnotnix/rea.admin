/**
 * Example of how to use FormShell with built-in submit/next/back buttons
 *
 * The FormShell now includes:
 * - Submit button (automatically shown)
 * - Previous/Next buttons (for multi-step forms)
 * - Cancel button (optional)
 *
 * No need to add buttons manually in the form content anymore!
 */

"use client";

import { FormShell } from "@settle/admin";
import { FormHandler } from "@settle/core";

interface ExampleFormShellProps {
  moduleInfo: any;
  withStepper?: boolean;
  onSubmit?: () => void;
  onCancel?: () => void;
}

export function FormShellExample({
  moduleInfo,
  withStepper = false,
  onSubmit,
  onCancel,
}: ExampleFormShellProps) {
  const bread = [
    { label: "Admin Portal" },
    { label: "Content Management", link: "/admin" },
    { label: moduleInfo.label },
  ];

  const steps = withStepper
    ? ["Basic Info", "Details", "Review", "Confirm"]
    : [];

  const formProps = FormHandler.useFormContext();

  return (
    <FormShell
      bread={bread}
      moduleInfo={moduleInfo}
      title={`New ${moduleInfo.label}`}
      steps={steps}
      showStepper={withStepper}
      onCancel={onCancel}
      isLoading={false}
      // Footer buttons are now built-in!
      // No need to manually add Submit, Next, Back, Cancel buttons
    >
      {/* Your form fields go here */}
      {/* Example: */}
      {/*
      <Stack gap="md">
        <TextInput name="title" label="Title" placeholder="Enter title" />
        <Textarea name="description" label="Description" />
      </Stack>
      */}
    </FormShell>
  );
}

/**
 * BEFORE (Manual buttons):
 *
 * <Modal>
 *   <FormHandler {...formConfig} formType="new">
 *     <Stack gap="md">
 *       <TextInput name="title" />
 *       <Group justify="flex-end">
 *         <Button variant="default" onClick={onCancel}>Cancel</Button>
 *         <Button type="submit">Submit</Button>  <-- Manual button
 *       </Group>
 *     </Stack>
 *   </FormHandler>
 * </Modal>
 *
 * AFTER (Built-in buttons):
 *
 * <FormShell onCancel={onCancel}>
 *   <Stack gap="md">
 *     <TextInput name="title" />
 *     {/* Buttons are automatically rendered at the bottom! */}
 *   </Stack>
 * </FormShell>
 */
