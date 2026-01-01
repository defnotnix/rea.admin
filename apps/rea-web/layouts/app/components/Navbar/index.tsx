"use client";

import { navItems } from "@/config/nav";
import {
  Avatar,
  Group,
  NavLink,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Divider,
  Badge,
} from "@mantine/core";

import classes from "./navbar.module.css";
import classesNav from "./navbar.navlink.module.css";
import { HashIcon } from "@phosphor-icons/react";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAgendas } from "@/modules/app/agenda-list/module.api";

export function LayoutAppNavbar() {
  // * DEFINITIONS

  const Router = useRouter();
  const Pathname = usePathname();

  // * CONTEXT

  // * STATE
  const { data: allAgendas, isLoading } = useQuery({
    queryKey: ["navbar/agendas"],
    queryFn: getAgendas,
  });

  const nationalAgendas = allAgendas?.filter((a) => a.type === "nation") || [];
  const districtAgendas =
    allAgendas?.filter((a) => a.type === "district") || [];

  // * PRELOADS

  // * FUNCTIONS

  // * RENDERS

  return (
    <Stack h="100%" justify="space-between" px="xl" py="md">
      <Stack gap={0}>
        {/* SOCIAL UPDATES SECTION */}
        <Stack gap={8} mb="xl">
          <Text size="xs" fw={600} c="dimmed">
            SOCIAL UPDATES
          </Text>
          <SimpleGrid cols={5} spacing={8}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Avatar
                key={i}
                size="100%"
                h={40}
                radius="md"
                style={{
                  backgroundColor: "#ffffff11",
                }}
              >
                {" "}
              </Avatar>
            ))}
          </SimpleGrid>
        </Stack>

        {/* GENERAL SECTION */}
        <NavLink
          label="GENERAL"
          childrenOffset={0}
          defaultOpened={true}
          style={{
            paddingLeft: 0,
          }}
          styles={{
            label: {
              color: "rgba(255, 255, 255, 0.5)",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: 0.5,
            },
            chevron: {
              color: "rgba(255, 255, 255, 0.4)",
            },
          }}
        >
          {navItems.map((navgroup: any, index: number) => {
            return (
              <NavLink
                onClick={() => {
                  Router.push(navgroup.value);
                }}
                active={Pathname == navgroup.value}
                classNames={classesNav}
                leftSection={
                  navgroup.icon ? <navgroup.icon weight="fill" /> : null
                }
                key={index}
                label={navgroup.label}
                childrenOffset={0}
              >
                {navgroup.children && navgroup.children.length > 0
                  ? navgroup.children.map(
                      (navinfo: any, childIndex: number) => (
                        <NavLink
                          active={Pathname == navinfo.value}
                          classNames={classesNav}
                          key={childIndex}
                          href={navinfo.value}
                          label={navinfo.label.replace(" ", "-")}
                          leftSection={<HashIcon weight="bold" />}
                        />
                      )
                    )
                  : null}
              </NavLink>
            );
          })}
        </NavLink>

        <Divider my="md" opacity={0.2} />

        {/* NATIONAL AGENDAS SECTION */}
        <NavLink
          label="NATIONAL AGENDAS"
          childrenOffset={0}
          defaultOpened={false}
          style={{
            paddingLeft: 0,
          }}
          styles={{
            label: {
              color: "white",
              fontSize: 12,
              letterSpacing: 0.5,
            },
            chevron: {
              color: "rgba(255, 255, 255, 0.4)",
            },
          }}
        >
          {isLoading
            ? [1, 2, 3].map((item) => (
                <NavLink
                  key={item}
                  classNames={classesNav}
                  label={`Loading...`}
                  leftSection={<HashIcon weight="bold" />}
                  disabled
                />
              ))
            : nationalAgendas
                .slice(0, 5)
                .map((agenda) => (
                  <NavLink
                    key={agenda.agendaId}
                    classNames={classesNav}
                    href={`/app/agenda/${agenda.agendaId}`}
                    label={agenda.title}
                    leftSection={<HashIcon weight="bold" />}
                  />
                ))}
        </NavLink>

        {/* DISTRICT LEVEL AGENDAS SECTION */}
        <NavLink
          label="DISTRICT LEVEL AGENDAS"
          childrenOffset={0}
          defaultOpened={false}
          style={{
            paddingLeft: 0,
          }}
          styles={{
            label: {
              color: "white",
              fontSize: 12,
              letterSpacing: 0.5,
            },
            chevron: {
              color: "rgba(255, 255, 255, 0.4)",
            },
          }}
        >
          {isLoading
            ? [1, 2, 3].map((item) => (
                <NavLink
                  key={item}
                  classNames={classesNav}
                  label={`Loading...`}
                  leftSection={<HashIcon weight="bold" />}
                  disabled
                />
              ))
            : districtAgendas
                .slice(0, 5)
                .map((agenda) => (
                  <NavLink
                    key={agenda.agendaId}
                    classNames={classesNav}
                    href={`/app/agenda/${agenda.agendaId}`}
                    label={agenda.title}
                    leftSection={<HashIcon weight="bold" />}
                  />
                ))}
        </NavLink>

        {/* RANDOM SECTION */}
        <NavLink
          label="RANDOM"
          childrenOffset={0}
          defaultOpened={false}
          style={{
            paddingLeft: 0,
          }}
          styles={{
            label: {
              color: "white",
              fontSize: 12,
              letterSpacing: 0.5,
            },
            chevron: {
              color: "rgba(255, 255, 255, 0.4)",
            },
          }}
        >
          <NavLink
            classNames={classesNav}
            href="/app/random"
            label="Random Chat"
            leftSection={<HashIcon weight="bold" />}
          />
        </NavLink>
      </Stack>

      {/* ANNOUNCEMENT CARD */}
      <Paper
        p="md"
        radius="md"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Stack gap="sm">
          <Text size="sm" fw={600} lh={1.4}>
            Sudan Gurung & Team goes for an Emergency meeting with the President
            on the escalating corruption cases across Nepal.
          </Text>
          <Group justify="space-between">
            <Text size="xs" c="dimmed">
              12 minutes ago
            </Text>
            <Badge
              size="sm"
              variant="light"
              onClick={() => Router.push("/app/social")}
              style={{ cursor: "pointer" }}
            >
              @sudangroup.official
            </Badge>
          </Group>
        </Stack>
      </Paper>
    </Stack>
  );
}
