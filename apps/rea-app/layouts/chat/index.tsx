"use client";

import {
  ActionIcon,
  AppShell,
  Grid,
  Group,
  useMantineColorScheme,
  Stack,
} from "@mantine/core";

import { MoonIcon, SunIcon } from "@phosphor-icons/react";

import classes from "./site.module.css";
import { LayoutSiteHaeder } from "../../components/header";
import { LayoutMainNavbar } from "@/components/navbar";
import { LayoutMainAside } from "@/components/aside";

export function LayoutChatUI({ children }: { children: React.ReactNode }) {
  const { setColorScheme } = useMantineColorScheme();

  return (
    <>
      <AppShell
        p={0}
        header={{
          height: 60,
        }}
      >
        <AppShell.Header
          style={{
            background: "none",
            border: "none",
          }}
        >
          <LayoutSiteHaeder />
        </AppShell.Header>

        <AppShell.Main>
          <Grid gutter={{ base: 8, xs: 8, md: 12, lg: 16 }} m={0} style={{ width: "100%", height: "100%" }}>
            <Grid.Col span={{ base: 0, xs: 0, sm: 0, md: 2.5, lg: 2.5 }}>
              <LayoutMainNavbar />
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 12, sm: 12, md: 6.5, lg: 6.5 }}>
              <Stack gap={0}>
                {children}
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 12, sm: 12, md: 2.5, lg: 2.5 }}>
              <LayoutMainAside />
            </Grid.Col>
          </Grid>
        </AppShell.Main>
      </AppShell>

      <div className={classes.backdrop} />

      <Group pos="fixed" bottom={16} right={16}>
        <ActionIcon
          aria-label="Toggle color scheme"
          onClick={() => {
            const current =
              document.documentElement.getAttribute(
                "data-mantine-color-scheme"
              ) ?? "light";
            setColorScheme(current === "dark" ? "light" : "dark");
          }}
        >
          <span className={classes.iconLight} aria-hidden="true">
            <MoonIcon />
          </span>
          <span className={classes.iconDark} aria-hidden="true">
            <SunIcon />
          </span>
        </ActionIcon>
      </Group>
    </>
  );
}
