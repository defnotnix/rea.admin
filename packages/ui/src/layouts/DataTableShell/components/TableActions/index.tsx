"use client";

import { Button, Divider, Group, Paper, Stack, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { EyeIcon, PenIcon, TrashIcon, XIcon } from "@phosphor-icons/react";

import { Router } from "next/dist/client/router";
import { usePathname, useRouter } from "next/navigation";
import { PropDataTableShellActions } from "../../DataTableShell.type";
import { useContext } from "../../DataTableShell.context";

export function DataTableShellTableActions({
  idAccessor = "id",
  sustained,
}: PropDataTableShellActions) {
  // * CONTEXT

  const { selectedRecords, setSelectedRecords } = useContext();

  const Router = useRouter();
  const Pathname = usePathname();

  const handleDelete = () => {
    modals.openConfirmModal({
      title: (
        <Text size="sm">Are you sure you want to delete selected item/s?</Text>
      ),
      styles: {
        header: {
          background: "var(--mantine-color-red-1)",
        },
        inner: {
          padding: "var(--mantine-spacing-sm)",
        },
      },

      overlayProps: {
        backgroundOpacity: 0.55,
        blur: 3,
      },
      children: (
        <Stack py="md">
          <Text size="sm">
            You are about to permanently delete{" "}
            <Text span fw={600}>
              {selectedRecords.length}
            </Text>{" "}
            item{selectedRecords.length === 1 ? "" : "s"}. This action cannot be
            undone.
          </Text>

          <Text size="xs" c="dimmed">
            To confirm, click on{" "}
            <Text span fw={600}>
              DELETE
            </Text>{" "}
            button below.
          </Text>
        </Stack>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        // TODO: delete records
        console.log("delete records");
      },
    });
  };

  return (
    <>
      {selectedRecords.length > 0 && (
        <Paper
          bg="dark.9"
          pos="absolute"
          bottom={8}
          left="50%"
          style={{ transform: "translateX(-50%)" }}
          radius="md"
          withBorder
          shadow="md"
        >
          <Group gap={0}>
            <Text py="xs" pl="md" c="white" size="xs">
              {selectedRecords.length} selected
            </Text>
            <Divider mx="xs" opacity={0.1} orientation="vertical" />
            <Button
              leftSection={<EyeIcon />}
              size="xs"
              variant="subtle"
              color="gray"
            >
              Review
            </Button>
            <Button
              leftSection={<PenIcon />}
              size="xs"
              variant="subtle"
              color="brand.4"
              onClick={() => {
                console.log(selectedRecords);

                if (!sustained) {
                  const ids = selectedRecords
                    .map((e: any) => {
                      return e[idAccessor];
                    })
                    .join(",");
                  Router.push(`${Pathname}/edit?ids=${ids}`);
                }
              }}
            >
              Edit
            </Button>
            <Button
              onClick={handleDelete}
              leftSection={<TrashIcon />}
              size="xs"
              variant="subtle"
              color="red.6"
            >
              Delete
            </Button>
            <Button
              leftSection={<XIcon />}
              size="xs"
              variant="subtle"
              color="gray"
              onClick={() => setSelectedRecords([])}
            >
              Clear
            </Button>
          </Group>
        </Paper>
      )}
    </>
  );
}
