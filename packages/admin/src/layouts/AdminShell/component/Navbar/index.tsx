import type { ComponentType, ReactNode } from "react";
import { usePathname } from "next/navigation";
import {
  Avatar,
  Divider,
  Group,
  Kbd,
  Menu,
  NavLink,
  Paper,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import {
  CaretUpDownIcon,
  LineVerticalIcon,
  MagnifyingGlassIcon,
  PlanetIcon,
} from "@phosphor-icons/react";
import { useHover } from "@mantine/hooks";

import { PropAdminNavItems, PropAdminNavSideNav } from "../../AdminShell.type";

// styles
import classes from "./Navbar.module.css";
import classesNavLink from "./Navbar.NavLink.module.css";

type IconComponent = ComponentType<{ size?: number; weight?: string }>;

type AdminShellNavbarProps = PropAdminNavSideNav & {
  navItems?: PropAdminNavItems[];
};

type AdminNavbarItemProps = {
  item: PropAdminNavItems;
  isChild?: boolean;
  pathname: string;
  renderNavItems: (items: PropAdminNavItems[], isChild?: boolean) => ReactNode;
};

function AdminNavbarItem({
  item,
  isChild = false,
  pathname,
  renderNavItems,
}: AdminNavbarItemProps) {
  const { hovered, ref } = useHover<any>();

  const active = item.value ? pathname === item.value : false;
  const isParentActive =
    item.value && !isChild ? pathname.includes(item.value) : active;

  // Section label (no link, no value)
  if (!item.value) {
    return (
      <div
        style={{
          position: "relative",
        }}
      >
        {isChild && <div className={classes.navLabelDot} />}

        <Text
          px="xs"
          pl={isChild ? "36px" : "xs"}
          my="xs"
          opacity={0.3}
          fw={400}
          tt="uppercase"
          size="xs"
        >
          {item.label || ""}
        </Text>
      </div>
    );
  }

  const hasChildren = !!item.children && item.children.length > 0;

  return (
    <NavLink
      ref={ref}
      active={isChild ? active : isParentActive}
      label={item.label || ""}
      leftSection={
        isChild ? (
          <LineVerticalIcon
            weight="bold"
            color={
              active || hovered ? "var(--mantine-color-brand-5)" : "transparent"
            }
            size={14}
          />
        ) : (
          item.icon && <item.icon weight="duotone" size={14} />
        )
      }
      classNames={classesNavLink}
      childrenOffset={0}
      px="xs"
      py={6}
      styles={{
        root: {
          // parent with active child list shouldn't show the default active bg
          ...(!isChild &&
            isParentActive &&
            hasChildren && {
              background: "none",
              borderColor: "transparent",
            }),
        },
      }}
    >
      {hasChildren && (
        <>
          <div className={classes.navLeftLine} />
          {renderNavItems(item.children!, true)}
        </>
      )}
    </NavLink>
  );
}

export function AdminShellNavbar({
  navItems = [],
  navModules: _navModules, // kept for type compatibility if needed
}: AdminShellNavbarProps) {
  const pathname = usePathname();

  const renderNavItems = (
    items: PropAdminNavItems[],
    isChild = false
  ): ReactNode =>
    items.map((item, index) => (
      <AdminNavbarItem
        key={index}
        item={item}
        isChild={isChild}
        pathname={pathname}
        renderNavItems={renderNavItems}
      />
    ));

  return (
    <Stack gap={"xs"} py="sm">
      <TextInput
        mx="sm"
        size="sm"
        placeholder="Navigation Search"
        radius="md"
        leftSection={<MagnifyingGlassIcon />}
        rightSectionWidth={40}
        rightSection={<Kbd size="xs">⌘+K</Kbd>}
        styles={{
          input: {
            background: "none",
            fontSize: "var(--mantine-font-size-xs)",
          },
        }}
      />

      <Stack px="sm" gap={0}>
        {renderNavItems(navItems)}
      </Stack>
    </Stack>
  );
}
