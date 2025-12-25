import {
  ChartDonutIcon,
  InfoIcon,
  ScrollIcon,
  UserIcon,
  UsersIcon,
  MapPinIcon,
  ChatCircleIcon,
  CheckCircleIcon,
} from "@phosphor-icons/react";

import { PropAdminNavItems } from "@settle/admin";

export const navItems: PropAdminNavItems[] = [
  {
    label: "Home",
    icon: ChartDonutIcon,
    value: "/home",
    roles: ["admin"],
  },
  {
    label: "System Configuration",
  },
  {
    label: "Districts",
    icon: MapPinIcon,
    value: "/districts",
    roles: ["admin"],
  },
  {
    label: "Users & Roles",
    icon: UsersIcon,
    value: "/users",
    roles: ["admin"],
  },
  {
    label: "Content Management",
  },
  {
    label: "Agenda",
    icon: ScrollIcon,
    value: "/agenda",
    roles: ["admin"],
    children: [
      {
        label: "All Agenda",
        value: "/agenda",
      },
      {
        label: "Create Agenda",
        value: "/agenda/new",
      },
    ],
  },
  {
    label: "Chat & Discussion",
    icon: ChatCircleIcon,
    value: "/chat",
    roles: ["admin"],
  },
  {
    label: "Approved Solutions",
    icon: CheckCircleIcon,
    value: "/approved-solutions",
    roles: ["admin"],
  },
  {
    label: "Administration",
  },
  {
    label: "About",
    icon: InfoIcon,
    value: "/about",
    roles: ["admin"],
  },
];
