"use client";

import { Modal, Stack, Button, Group, Text } from "@mantine/core";

interface DeleteSolutionModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isLoading: boolean;
}

export function DeleteSolutionModal({
  opened,
  onClose,
  onConfirm,
  isLoading,
}: DeleteSolutionModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Delete Solution"
      centered
    >
      <Stack gap="md">
        <Text>
          Are you sure you want to delete this solution? This action cannot be
          undone.
        </Text>
        <Group justify="flex-end">
          <Button
            variant="default"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            color="red"
            onClick={onConfirm}
            loading={isLoading}
          >
            Delete
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
