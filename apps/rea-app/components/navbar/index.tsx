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
} from "@mantine/core";

import classes from "./navbar.module.css";
import classesNav from "./navbar.navlink.module.css";
import { HashIcon } from "@phosphor-icons/react";
import { usePathname, useRouter } from "next/navigation";

export function LayoutMainNavbar() {
  // * DEFINITIONS

  const Router = useRouter();
  const Pathname = usePathname();

  // * CONTEXT

  // * STATE

  // * PRELOADS

  // * FUNCTIONS

  // * RENDERS

  return (
    <>
      <Stack py="md">
        <Stack gap={0}>
          {navItems.map((navgroup: any, index: number) => {
            return (
              <NavLink
                active={Pathname == navgroup.value}
                classNames={classesNav}
                leftSection={
                  !navgroup.children ? <navgroup.icon weight="fill" /> : null
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
        </Stack>
      </Stack>
    </>
  );
}
