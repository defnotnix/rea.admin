"use client";

import { navItems } from "@/config/nav";
import { useAgendas } from "@/modules/app/app.hooks";
import {
  Avatar,
  Group,
  NavLink,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Loader,
  TextInput,
  Divider,
  ActionIcon,
} from "@mantine/core";

import classes from "./navbar.module.css";
import classesNav from "./navbar.navlink.module.css";
import {
  AcornIcon,
  GearSixIcon,
  HashIcon,
  LayoutIcon,
  SunIcon,
} from "@phosphor-icons/react";
import { usePathname, useRouter } from "next/navigation";

export function LayoutAppNavbar() {
  // * DEFINITIONS

  const Router = useRouter();
  const Pathname = usePathname();
  const { data: agendas = [], isLoading } = useAgendas();

  // * CONTEXT

  // * STATE

  // * PRELOADS

  // * FUNCTIONS

  // * RENDERS

  return (
    <>
      <Stack px="xl" py="sm">
        <Stack gap={0}>
          {navItems.map((navgroup: any, index: number) => {
            return (
              <NavLink
                active={Pathname == navgroup.value}
                classNames={classesNav}
                leftSection={
                  !navgroup.children && navgroup.icon ? (
                    <navgroup.icon weight="fill" />
                  ) : null
                }
                key={index}
                label={navgroup.label}
                childrenOffset={0}
                defaultOpened={navgroup.opened}
                styles={
                  navgroup?.children?.length > 0
                    ? {
                        label: {
                          color: "rgba(255, 255, 255, 0.4)",
                          fontSize: 12,
                        },
                        chevron: {
                          color: "rgba(255, 255, 255, 0.4)",
                          fontSize: 12,
                        },
                      }
                    : {}
                }
              >
                {navgroup.children && navgroup.children.length > 0 ? (
                  <>
                    {navgroup.children.map((navinfo: any, index: number) => (
                      <NavLink
                        active={Pathname == navinfo.value}
                        classNames={classesNav}
                        key={index}
                        href={navinfo.value}
                        label={navinfo.label.replace(" ", "-")}
                        leftSection={<HashIcon weight="bold" />}
                      />
                    ))}
                  </>
                ) : null}
              </NavLink>
            );
          })}

          <Divider my="md" opacity={0.3} />

          {/* Discussion Threads Section */}
          <NavLink
            classNames={classesNav}
            label="National Agendas"
            childrenOffset={0}
            defaultOpened={true}
            styles={{
              label: {
                color: "rgba(255, 255, 255, 0.4)",
                fontSize: 12,
              },
              chevron: {
                color: "rgba(255, 255, 255, 0.4)",
                fontSize: 12,
              },
            }}
          >
            {isLoading ? (
              <Group justify="center" py="md">
                <Loader size="sm" />
              </Group>
            ) : (
              agendas.map((agenda: any, index: number) => (
                <NavLink
                  active={Pathname == `/app/chat/${agenda.agendaId}`}
                  classNames={classesNav}
                  key={index}
                  href={`/app/chat/${agenda.agendaId}`}
                  label={
                    agenda.title.substring(0, 30) +
                    (agenda.title.length > 30 ? "..." : "")
                  }
                  leftSection={<HashIcon weight="bold" />}
                />
              ))
            )}
          </NavLink>
        </Stack>
      </Stack>

      <Paper
        m={12}
        px="md"
        py="sm"
        style={{
          position: "absolute",
          bottom: 0,
          width: "calc(100% - 24px)",
        }}
      >
        <Group wrap="nowrap" justify="space-between">
          <Group>
            <Avatar />
            <div>
              <Text size="sm">Anamol Maharjan</Text>
              <Text size="xs">Online</Text>
            </div>
          </Group>

          <ActionIcon variant="subtle">
            <GearSixIcon />
          </ActionIcon>
        </Group>
      </Paper>
    </>
  );
}
