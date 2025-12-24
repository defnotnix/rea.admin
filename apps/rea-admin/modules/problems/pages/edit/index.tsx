"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Group, Button, LoadingOverlay, Stack } from "@mantine/core";
import { FormHandler } from "@settle/core";
import { FormShell } from "@settle/admin";
import { formConfig } from "../../forms/main/form.config";
import { moduleInfo } from "../../module.config";
import { ProblemFormFields } from "../../form";
import { getProblemById } from "../../module.api";

interface EditProblemProps {
  id: string;
}

export function EditProblem({ id }: EditProblemProps) {
  const router = useRouter();

  const { data: problem, isLoading, error } = useQuery({
    queryKey: ["rea.problems.detail", id],
    queryFn: () => getProblemById(id),
  });

  const handleSuccess = () => {
    router.push(`/admin/problems/${id}`);
  };

  if (isLoading) {
    return (
      <FormShell
        bread={moduleInfo.bread}
        moduleInfo={moduleInfo}
        title={`Edit ${moduleInfo.label}`}
      >
        <LoadingOverlay visible />
      </FormShell>
    );
  }

  if (error) {
    return (
      <FormShell
        bread={moduleInfo.bread}
        moduleInfo={moduleInfo}
        title={`Edit ${moduleInfo.label}`}
      >
        <Stack gap="md" align="center" py="xl">
          <div>Error loading problem: {error instanceof Error ? error.message : "Unknown error"}</div>
          <Button variant="default" onClick={() => router.back()}>
            Go Back
          </Button>
        </Stack>
      </FormShell>
    );
  }

  return (
    <FormShell
      bread={moduleInfo.bread}
      moduleInfo={moduleInfo}
      title={`Edit ${moduleInfo.label}`}
    >
      <FormHandler
        {...formConfig}
        initialValues={problem}
        formType="update"
        id={id}
        onSuccess={handleSuccess}
      >
        <ProblemFormFields />
        <Group justify="flex-end" mt="xl">
          <Button variant="default" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit">
            Update {moduleInfo.label}
          </Button>
        </Group>
      </FormHandler>
    </FormShell>
  );
}
