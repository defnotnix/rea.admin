import {
  ChartDonutIcon,
  GearIcon,
  InfoIcon,
  ScrollIcon,
  UserIcon,
  UsersIcon,
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
    label: "Management",
  },
  {
    label: "Admin Accounts",
    icon: UserIcon,
    value: "/admin/accounts",
    roles: ["admin"],
  },
  {
    label: "Applicant Management",
    icon: UsersIcon,
    value: "/applicant",
    roles: ["admin"],
    children: [
      {
        label: "Job Category",
        value: "/applicant/job-category",
      },
      {
        label: "Current Applicants",
        value: "/applicant/current",
      },
    ],
  },
  {
    label: "Activity Logs",
    icon: ScrollIcon,
    value: "/activity-logs",
    roles: ["admin"],
  },
  {
    label: "Software Preferences",
    icon: GearIcon,
    value: "/preferences",
    roles: ["admin"],
  },
  {
    label: "About",
    icon: InfoIcon,
    value: "/about",
    roles: ["admin"],
  },
];
