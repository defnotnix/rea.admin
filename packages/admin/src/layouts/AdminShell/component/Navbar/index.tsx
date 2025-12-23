import type { ComponentType, ReactNode } from "react";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ActionIcon,
  Avatar,
  Card,
  Divider,
  Group,
  Kbd,
  Menu,
  NavLink,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  Highlight,
} from "@mantine/core";
import {
  AvocadoIcon,
  CaretUpDownIcon,
  LayoutIcon,
  LineVerticalIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@phosphor-icons/react";
import { useHover } from "@mantine/hooks";

import { PropAdminNavItems, PropAdminNavSideNav } from "../../AdminShell.type";
import { UserInfoPopover } from "./components/UserInfoPopover";

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
  searchQuery?: string;
  shouldShow?: boolean;
};

function AdminNavbarItem({
  item,
  isChild = false,
  pathname,
  renderNavItems,
  searchQuery = "",
  shouldShow = true,
}: AdminNavbarItemProps) {
  const Router = useRouter();
  const { hovered, ref } = useHover<any>();

  const active = item.value ? pathname === item.value : false;
  const isParentActive =
    item.value && !isChild ? pathname.includes(item.value) : active;

  // Check if item matches search query
  const matchesSearch =
    !searchQuery ||
    item.label.toLowerCase().includes(searchQuery.toLowerCase());

  // Section label (no link, no value)
  if (!item.value) {
    if (!matchesSearch && !shouldShow) return null;

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
          fw={500}
          size="xs"
        >
          {item.label || ""}
        </Text>
      </div>
    );
  }

  const hasChildren = !!item.children && item.children.length > 0;

  // Check if any children match the search
  const hasMatchingChildren =
    hasChildren &&
    item.children!.some((child) => {
      const childMatches = child.label
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      if (childMatches) return true;
      if (child.children) {
        return child.children.some((grandchild) =>
          grandchild.label.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      return false;
    });

  // Show item if: no search query, item matches, any children match, or it's active
  const shouldDisplay =
    !searchQuery || matchesSearch || hasMatchingChildren || isParentActive;

  if (!shouldDisplay) return null;

  return (
    <NavLink
      ref={ref}
      active={isChild ? active : isParentActive}
      onClick={() => {
        Router.push(item.value || "");
      }}
      label={
        searchQuery && matchesSearch ? (
          <Highlight
            highlight={searchQuery}
            size="inherit"
            fw={600}
            component="span"
          >
            {item.label || ""}
          </Highlight>
        ) : (
          item.label || ""
        )
      }
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
          item.icon && (
            <item.icon
              color={
                active
                  ? `var(--mantine-color-brand-6)`
                  : "var(--mantine-color-gray-6)"
              }
              weight="fill"
              size={14}
            />
          )
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
  const [searchQuery, setSearchQuery] = useState("");

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
        searchQuery={searchQuery}
      />
    ));

  return (
    <Stack
      gap={0}
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      {/* Top Section */}
      <Stack gap={8} py="xs" style={{ flexShrink: 0 }}>
        <Group justify="space-between" px="md">
          <Group gap="xs" py="sm">
            <Text fw={900} size="md">
              St.
            </Text>
            <Text fw={600} size="md">
              Settle.Inc Admin
            </Text>
          </Group>

          <LayoutIcon weight="duotone" />
        </Group>

        <Card radius="md" mx="sm" p="xs" withBorder>
          <Group wrap="nowrap" justify="space-between">
            <Group gap={"xs"}>
              <Avatar size="xs" variant="filled" color="dark.9">
                <AvocadoIcon weight="fill" />
              </Avatar>
              <div>
                <Text fw={600} size="xs">
                  General Admin
                </Text>
              </div>
            </Group>
            <ActionIcon size="xs" variant="subtle">
              <CaretUpDownIcon />
            </ActionIcon>
          </Group>
        </Card>

        <TextInput
          mx="sm"
          size="sm"
          placeholder="Navigation Search"
          radius="md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          leftSection={<MagnifyingGlassIcon />}
          rightSectionWidth={48}
          rightSection={<Kbd size="xs">⌘+K</Kbd>}
          styles={{
            input: {
              fontSize: "var(--mantine-font-size-xs)",
            },
          }}
        />
      </Stack>

      {/* Middle Section with Scrollbar */}
      <ScrollArea style={{ flex: 1, minHeight: 0 }}>
        <Stack px="sm" gap={0} pb="md">
          {renderNavItems(navItems)}
        </Stack>
      </ScrollArea>

      {/* Bottom Section */}
      <Stack gap={0} style={{ flexShrink: 0 }} pb="sm">
        <Group grow gap={4} px="sm" py="xs">
          <ActionIcon>
            <PlusIcon />
          </ActionIcon>
          <ActionIcon>
            <PlusIcon />
          </ActionIcon>
          <ActionIcon>
            <PlusIcon />
          </ActionIcon>
          <ActionIcon>
            <PlusIcon />
          </ActionIcon>
        </Group>

        <UserInfoPopover />
      </Stack>
    </Stack>
  );
}
