"use client";

import {
  ActionIcon,
  AppShell,
  Group,
  useMantineColorScheme,
} from "@mantine/core";

import { MoonIcon, SunIcon } from "@phosphor-icons/react";

import classes from "./site.module.css";
import { LayoutSiteHaeder } from "../../components/header";

export function LayoutSite({ children }: { children: React.ReactNode }) {
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
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>

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
