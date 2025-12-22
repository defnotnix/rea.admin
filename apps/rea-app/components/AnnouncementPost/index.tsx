"use client";

import { Avatar, Button, Group, Image, Stack, Text } from "@mantine/core";
import { ThumbsDownIcon, ThumbsUpIcon } from "@phosphor-icons/react";

export function AnnouncementPost() {
  return (
    <>
      <div>
        <Stack>
          <Group justify="space-between" gap={0}>
            <Group>
              <Avatar size="sm" />
              <Text size="xs">@thecouncilofgenz</Text>
            </Group>

            <Group>
              <Text size="xs">General Announcement</Text>
              <Text size="xs">12 minutes ago.</Text>
            </Group>

            <Text size="md">
              An inspiring event will take place at Tundikhel Ground on January
              1st, 2026. Let us unite as one community and pause for a moment of
              silence in honor of the brave martyrs who sacrificed their lives
              for the movement. Their courage lights our path, and their legacy
              continues to guide us forward.
            </Text>

            <Image
              src={
                "https://media.desenio.com/site_images/685c87728fdef2fa155dd41d_1789925067_17469-8.jpg?auto=compress%2Cformat&fit=max&w=3840"
              }
            />

            <Group>
              <Button leftSection={<ThumbsUpIcon />}>2.2K</Button>
              <Button leftSection={<ThumbsDownIcon />}>2.2K</Button>
            </Group>
          </Group>
        </Stack>
      </div>
    </>
  );
}
