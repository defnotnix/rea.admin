"use client";

import { Box, Container, Stack } from "@mantine/core";
import { PropFormShell } from "./FormShell.type";
import { FormShellHeader } from "./components/Header";
import { FormShellStepper } from "./components/Stepper";
import { Context as FormShellContext } from "./FormShell.context";
import { FormWrapper } from "@settle/core";

function FormShellContent({
  bread,
  moduleInfo,
  title,
  children,
  steps = [],
  disabledSteps = [],
  showStepper = true,
}: PropFormShell) {
  const contextValue = {
    selectedRecords: [],
    setSelectedRecords: () => {},
  };

  const formProps = FormWrapper.useFormProps();
  const currentStep = formProps?.current || 0;

  return (
    <FormShellContext.Provider value={contextValue}>
      <Stack gap={0} h="100vh">
        {/* Header */}
        <FormShellHeader bread={bread} moduleInfo={moduleInfo} title={title} />

        {/* Stepper */}
        {showStepper && steps.length > 0 && (
          <FormShellStepper
            steps={steps}
            currentStep={currentStep}
            disabledSteps={disabledSteps}
          />
        )}

        {/* Form Content */}
        <Box component="div" flex={1}>
          <Container size="xl" py="lg">
            {children}
          </Container>
        </Box>
      </Stack>
    </FormShellContext.Provider>
  );
}

export function FormShell({
  bread,
  moduleInfo,
  title,
  children,
  steps = [],
  disabledSteps = [],
  showStepper = true,
}: PropFormShell) {
  return (
    <FormShellContent
      bread={bread}
      moduleInfo={moduleInfo}
      title={title}
      children={children}
      steps={steps}
      disabledSteps={disabledSteps}
      showStepper={showStepper}
    />
  );
}
