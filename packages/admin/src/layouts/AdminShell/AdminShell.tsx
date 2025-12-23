"use client";

//mantine
import {
  ActionIcon,
  AppShell,
  Breadcrumbs,
  Card,
  Divider,
  Group,
  Paper,
  Text,
} from "@mantine/core";
//hooks
import { useDisclosure } from "@mantine/hooks";
import { AdminShellNavbar } from "./component/Navbar";
//props
import { PropAdminNavLayout } from "./AdminShell.type";

import "mantine-datatable/styles.layer.css";
import { AdminShellHeader } from "./component/Header";
import { CaretLeftIcon } from "@phosphor-icons/react";

export function AdminShell({
  children,
  navItems = [],
  navModules,
  essentials,
  softwareInfo,
  onLogout,
}: PropAdminNavLayout) {
  // * STATES

  const [opened, { toggle }] = useDisclosure();

  return (
    <>
      <AppShell
        navbar={{
          width: 300,
          breakpoint: "sm",
          // collapsed: { mobile: !opened },
        }}
        // header={{ height: 40 }}
      >
        <AppShell.Navbar
          style={{
            background: "none",
          }}
        >
          <AdminShellNavbar navItems={navItems} navModules={navModules} />
        </AppShell.Navbar>

        <AppShell.Main bg="gray.0">{children}</AppShell.Main>
      </AppShell>
    </>
  );
}
