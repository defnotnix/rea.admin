"use client";

import { Container, Group, Stack, Text, Box, Divider, ActionIcon, TextInput } from "@mantine/core";
import { getRecords } from "./module.api";
import { useQuery } from "@tanstack/react-query";
import { AnnouncementPost } from "@/components/AnnouncementPost";
import { MagnifyingGlassIcon, BellIcon } from "@phosphor-icons/react";
import styles from "./announcements.module.css";

export function ModuleAppAnnouncements() {
  // * DEFINITIONS

  // * STATES

  const { data } = useQuery({
    queryKey: ["app/announcements"],
    queryFn: getRecords,
  });

  // * CONTEXT

  // * FUNCTIONS

  // * COMPONENTS

  return (
    <>
      <Box pos="sticky" top={60} className={styles.header}>
        <Group h={50} justify="space-between" px="md" gap={0}>
          <Group gap="xs">
            <Text size="xs" opacity={0.5}>
              Announcements
            </Text>
          </Group>

          <Group gap={0}>
            <TextInput
              leftSection={<MagnifyingGlassIcon />}
              mr="xs"
              size="xs"
              placeholder="Search announcements"
            />
            <ActionIcon variant="subtle">
              <BellIcon />
            </ActionIcon>
          </Group>
        </Group>
        <Divider opacity={0.3} />
      </Box>

      <Container size="sm" py="xl">
        <Stack gap="md">
          {data?.map((announcement) => (
            <AnnouncementPost
              key={announcement.id}
              id={announcement.id}
              author={announcement.author}
              category={announcement.category}
              text={announcement.text}
              timestamp={announcement.timestamp}
              image={announcement.image}
              likes={announcement.likes}
              dislikes={announcement.dislikes}
            />
          ))}
        </Stack>
      </Container>
    </>
  );
}
