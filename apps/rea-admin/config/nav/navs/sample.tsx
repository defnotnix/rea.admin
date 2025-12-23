import {
  ChartDonutIcon,
  GearIcon,
  InfoIcon,
  ScrollIcon,
  UserIcon,
  UsersIcon,
  MapPinIcon,
  ChatCircleIcon,
  CheckCircleIcon,
  QuestionIcon,
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
    value: "/admin/districts",
    roles: ["admin"],
  },
  {
    label: "Users & Roles",
    icon: UsersIcon,
    value: "/admin/users",
    roles: ["admin"],
  },
  {
    label: "Content Management",
  },
  {
    label: "Problems",
    icon: QuestionIcon,
    value: "/admin/problems",
    roles: ["admin"],
    children: [
      {
        label: "All Problems",
        value: "/admin/problems",
      },
      {
        label: "Create Problem",
        value: "/admin/problems/new",
      },
      {
        label: "Pending Review",
        value: "/admin/problems?status=pending",
      },
      {
        label: "Approved",
        value: "/admin/problems?status=approved",
      },
    ],
  },
  {
    label: "Chat & Discussion",
    icon: ChatCircleIcon,
    value: "/admin/chat",
    roles: ["admin"],
  },
  {
    label: "Approved Solutions",
    icon: CheckCircleIcon,
    value: "/admin/approved-solutions",
    roles: ["admin"],
  },
  {
    label: "Administration",
  },
  {
    label: "Activity Logs",
    icon: ScrollIcon,
    value: "/admin/activity-logs",
    roles: ["admin"],
  },
  {
    label: "System Settings",
    icon: GearIcon,
    value: "/admin/settings",
    roles: ["admin"],
  },
  {
    label: "About",
    icon: InfoIcon,
    value: "/about",
    roles: ["admin"],
  },
];
