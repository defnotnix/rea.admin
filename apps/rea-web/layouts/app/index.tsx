"use client";

import { AppShell, Container, Group, SimpleGrid, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { LayoutAppNavbar } from "./components/Navbar";
import { LayoutAppAside } from "./components/Aside";
import { LayoutAppHeader } from "./components/Header";

export function LayoutApp({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <>
      <AppShell
        p={0}
        header={{
          height: 60,
        }}
        navbar={{
          width: 350,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        aside={{
          width: 350,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
      >
        <AppShell.Header
          bg="#0A0A10"
          style={{
            borderColor: "#ffffff11",
          }}
        >
          <LayoutAppHeader />
        </AppShell.Header>

        <AppShell.Navbar
          bg="none"
          style={{
            borderColor: "#ffffff11",
          }}
        >
          <LayoutAppNavbar />
        </AppShell.Navbar>
        <AppShell.Aside
          bg="none"
          style={{
            borderColor: "#ffffff11",
          }}
        >
          <LayoutAppAside />
        </AppShell.Aside>

        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </>
  );
}
