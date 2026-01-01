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
    label: "Agenda Management",
  },
  {
    label: "New Agenda",
    icon: ScrollIcon,
    value: "/agenda",
    roles: ["admin"],
  },
  {
    label: "Agenda",
    icon: ScrollIcon,
    value: "/agenda",
    roles: ["admin"],
  },
  {
    label: "Agenda Requests",
    icon: ScrollIcon,
    value: "/agenda",
    roles: ["admin"],
  },
  {
    label: "Chat & Discussion",
    icon: ChatCircleIcon,
    value: "/chat",
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
    label: "Miscellaneous",
  },

  {
    label: "About",
    icon: InfoIcon,
    value: "/about",
    roles: ["admin"],
  },
];
