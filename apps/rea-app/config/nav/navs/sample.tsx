import {
  HouseIcon,
  MegaphoneIcon,
  ScrollIcon,
  FlagIcon,
  MapPinIcon,
  HashIcon,
  FileTextIcon,
} from "@phosphor-icons/react";

export const navItems: any[] = [

  {
    label: "Overview",
    icon: HouseIcon,
    value: "/",
  },
  {
    label: "Announcements",
    icon: MegaphoneIcon,
    value: "/announcements",
  },
  {
    label: "Solution Draft & Revisions",
    icon: FileTextIcon,
    value: "/drafts",
  },
  {
    label: "Agendas",
    icon: ScrollIcon,
    value: "/agendas",
  },
];
