"use client";

import { Modal, Stack, Text, LoadingOverlay } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { PropDataTableModalShell } from "../DataTableModalShell.type";
import { useDataTableModalShellContext } from "../DataTableModalShell.context";
import { DataTableWrapper } from "@settle/core";

type ModalHandlerProps = Pick<
  PropDataTableModalShell,
  | "modalWidth"
  | "onCreateApi"
  | "onEditApi"
  | "onCreateSuccess"
  | "onEditSuccess"
  | "onEditTrigger"
  | "transformOnCreate"
  | "transformOnEdit"
  | "validator"
  | "idAccessor"
  | "createFormComponent"
  | "editFormComponent"
> & {
  moduleName?: string;
  moduleTerm?: string;
};

export function ModalHandler({
  modalWidth = "md",
  onCreateApi,
  onEditApi,
  onCreateSuccess,
  onEditSuccess,
  onEditTrigger,
  transformOnCreate,
  transformOnEdit,
  validator,
  idAccessor = "id",
  createFormComponent,
  editFormComponent,
  moduleName = "Item",
  moduleTerm = "Item",
}: ModalHandlerProps) {
  const {
    isCreateModalOpen,
    isEditModalOpen,
    activeEditRecord,
    editLoading,
    closeCreateModal,
    closeEditModal,
    setEditLoading,
  } = useDataTableModalShellContext();

  const { refetch } = DataTableWrapper.useDataTableContext();

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (formData: any) => {
      if (validator) {
        validator.parse(formData);
      }

      const dataToSubmit = transformOnCreate ? transformOnCreate(formData) : formData;
      return onCreateApi?.(dataToSubmit);
    },
    onSuccess: (res) => {
      notifications.show({
        title: "Success",
        message: `${moduleTerm} created successfully`,
        color: "green",
      });
      onCreateSuccess?.(res);
      closeCreateModal();
      refetch();
    },
    onError: (err: any) => {
      if (err.name === "ZodError") {
        const firstError = err.errors[0];
        notifications.show({
          title: "Validation Error",
          message: `${firstError.path.join(".")}: ${firstError.message}`,
          color: "red",
        });
      } else {
        notifications.show({
          title: "Error",
          message: `Failed to create ${moduleTerm}`,
          color: "red",
        });
      }
    },
  });

  // Edit mutation
  const editMutation = useMutation({
    mutationFn: async (formData: any) => {
      if (validator) {
        validator.parse(formData);
      }

      const dataToSubmit = transformOnEdit ? transformOnEdit(formData) : formData;
      return onEditApi?.(formData[idAccessor], dataToSubmit);
    },
    onSuccess: (res) => {
      notifications.show({
        title: "Success",
        message: `${moduleTerm} updated successfully`,
        color: "green",
      });
      onEditSuccess?.(res);
      closeEditModal();
      refetch();
    },
    onError: (err: any) => {
      if (err.name === "ZodError") {
        const firstError = err.errors[0];
        notifications.show({
          title: "Validation Error",
          message: `${firstError.path.join(".")}: ${firstError.message}`,
          color: "red",
        });
      } else {
        notifications.show({
          title: "Error",
          message: `Failed to update ${moduleTerm}`,
          color: "red",
        });
      }
    },
  });

  const handleCreateFormSubmit = (formData: any) => {
    createMutation.mutate(formData);
  };

  const handleEditFormSubmit = (formData: any) => {
    editMutation.mutate(formData);
  };

  return (
    <>
      {/* Create Modal */}
      <Modal
        opened={isCreateModalOpen}
        onClose={closeCreateModal}
        title={
          <Text tt="uppercase" size="xs" fw={700}>
            New {moduleTerm}
          </Text>
        }
        size={modalWidth}
      >
        <Stack gap="lg">
          {createFormComponent ? (
            <div>{createFormComponent}</div>
          ) : (
            <Text size="sm" color="dimmed">
              No form component provided
            </Text>
          )}
        </Stack>
      </Modal>

      {/* Edit Modal */}
      <Modal
        opened={isEditModalOpen}
        onClose={closeEditModal}
        title={
          <Text tt="uppercase" size="xs" fw={700}>
            Edit {moduleTerm}
          </Text>
        }
        size={modalWidth}
      >
        <Stack gap="lg" pos="relative">
          <LoadingOverlay visible={editLoading} />
          {editFormComponent && activeEditRecord ? (
            <div>{editFormComponent}</div>
          ) : (
            <Text size="sm" color="dimmed">
              No form component provided
            </Text>
          )}
        </Stack>
      </Modal>
    </>
  );
}
