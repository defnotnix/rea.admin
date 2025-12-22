"use client";

import { Group, Stack, Text } from "@mantine/core";
import { getRecords } from "./module.api";
import { useQuery } from "@tanstack/react-query";
import { AnnouncementPost } from "@/components/AnnouncementPost";

export function ModuleAppAnnouncements() {
  // * DEFINITIONS

  // * STATES

  const { data, refetch } = useQuery({
    queryKey: ["app/announcements"],
    queryFn: getRecords,
  });

  // * CONTEXT

  // * FUNCTIONS

  // * COMPONENTS

  return (
    <>
      <Text ta="center" size="2rem">
        Announcement Board
      </Text>

      <Stack py="xl" gap="md">
        <AnnouncementPost />
      </Stack>
    </>
  );
}
