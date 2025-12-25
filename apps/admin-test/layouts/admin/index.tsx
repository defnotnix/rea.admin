"use client";

import { navItems } from "@/config/nav";
import { AdminShell } from "@settle/admin";
import { PropsWithChildren } from "react";

export function LayoutAdmin({ children }: PropsWithChildren) {
  return (
    <>
      <AdminShell navItems={navItems}>{children}</AdminShell>
    </>
  );
}
