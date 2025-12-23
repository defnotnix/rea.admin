"use client";

import { configThemeMantine } from "@/config/theme";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/modules/auth/AuthProvider";

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [client] = useState(new QueryClient({}));

  return (
    <>
      <MantineProvider theme={configThemeMantine} defaultColorScheme={"dark"}>
        <QueryClientProvider client={client}>
          <AuthProvider>
            <Notifications />
            <ModalsProvider>{children}</ModalsProvider>
          </AuthProvider>
        </QueryClientProvider>
      </MantineProvider>
    </>
  );
}
