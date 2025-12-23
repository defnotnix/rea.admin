"use client";

import { usePathname } from "next/navigation";
import {
  Anchor,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Group,
  Menu,
  Stack,
  Text,
} from "@mantine/core";
import {
  ArrowClockwiseIcon,
  CaretDownIcon,
  PlusIcon,
} from "@phosphor-icons/react";

import { DataTableWrapper } from "@settle/core";
import { PropDataTableHeader } from "../../DataTableShell.type";
import { useModalForm } from "../../context/ModalFormContext";

export function DataTableShellHeader({
  bread,
  moduleInfo,
  newButtonHref,
  sustained = false,
  onNewClick,
}: PropDataTableHeader) {
  // * CONTEXT

  const pathname = usePathname();
  const { refetch } = DataTableWrapper.useDataTableContext();
  const finalHref = newButtonHref || `${pathname}/new`;

  let modalContext: ReturnType<typeof useModalForm> | undefined;
  try {
    modalContext = useModalForm();
  } catch (e) {
    // Modal context not available
    modalContext = undefined;
  }

  const handleNewClick = sustained
    ? (onNewClick || modalContext?.openModal)
    : undefined;

  return (
    <Stack p="lg" gap="sm">
      {bread && (
        <Breadcrumbs opacity={0.5}>
          {bread.map((breaditem: any, index: number) =>
            breaditem.link ? (
              <Anchor c="dark" size="10px" key={index} href={breaditem.link}>
                {breaditem.label}
              </Anchor>
            ) : (
              <Text c="dark" key={index} size="10px">
                {breaditem.label}
              </Text>
            )
          )}
        </Breadcrumbs>
      )}

      <Group justify="space-between">
        <div>
          <Text size="xl">{moduleInfo.label}</Text>
          <Text size="xs" opacity={0.5}>
            {moduleInfo.description}
          </Text>
        </div>

        <Group gap={4}>
          <Menu>
            <Menu.Target>
              <Button
                rightSection={<CaretDownIcon />}
                size="xs"
                variant="subtle"
                color="dark"
              >
                More Actions
              </Button>
            </Menu.Target>
            <Menu.Dropdown>{/* future actions */}</Menu.Dropdown>
          </Menu>

          <Button
            leftSection={<ArrowClockwiseIcon />}
            size="xs"
            variant="light"
            color="dark"
            onClick={() => {
              refetch();
            }}
          >
            Reload Data
          </Button>

          <ButtonGroup>
            {sustained && handleNewClick ? (
              <Button
                onClick={handleNewClick}
                size="xs"
                leftSection={<PlusIcon />}
              >
                New {moduleInfo.label}
              </Button>
            ) : (
              <Button
                component="a"
                href={finalHref}
                size="xs"
                leftSection={<PlusIcon />}
              >
                New {moduleInfo.label}
              </Button>
            )}

            <Menu>
              <Menu.Target>
                <Button size="xs" px={8} ml={1}>
                  <CaretDownIcon />
                </Button>
              </Menu.Target>
              <Menu.Dropdown>{/* future actions */}</Menu.Dropdown>
            </Menu>
          </ButtonGroup>
        </Group>
      </Group>
    </Stack>
  );
}
