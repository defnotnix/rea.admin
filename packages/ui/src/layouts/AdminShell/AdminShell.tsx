"use client";

//mantine
import { AppShell, Paper } from "@mantine/core";
//hooks
import { useDisclosure } from "@mantine/hooks";
import { AdminShellNavbar } from "./component/Navbar";
//props
import { PropAdminNavLayout } from "./AdminShell.type";

import "mantine-datatable/styles.layer.css";
import { AdminShellHeader } from "./component/Header";

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
          width: 260,
          breakpoint: "sm",
          // collapsed: { mobile: !opened },
        }}
        header={{ height: 40 }}
      >
        <AppShell.Header
          style={{
            background: "none",
            border: "none",
          }}
        >
          <AdminShellHeader />
        </AppShell.Header>

        <AppShell.Navbar
          style={{
            background: "none",
            border: "none",
          }}
        >
          <AdminShellNavbar navItems={navItems} navModules={navModules} />
        </AppShell.Navbar>

        <AppShell.Main>
          <Paper
            withBorder
            radius="md"
            my="sm"
            mr="sm"
            h={{
              lg: "calc(100vh - 54px)",
            }}
            style={{
              overflowY: "scroll",
            }}
          >
            {children}
          </Paper>
        </AppShell.Main>
      </AppShell>
    </>
  );
}
