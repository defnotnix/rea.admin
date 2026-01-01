"use client";

import { Container, Title, Stack, Center, Text, Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { CaretRight, CaretRightIcon } from "@phosphor-icons/react";

export function ModuleAppHome() {
  const router = useRouter();

  const buttons = [
    {
      title: "View Announcements",
      description: "Browse and participate in ongoing agendas",
      path: "/app/agenda",
    },
    {
      title: "View Agendas",
      description: "Browse and participate in ongoing agendas",
      path: "/app/agenda",
    },
    {
      title: "Request a New Agenda",
      description:
        "Submit problems around your locality which will be discussed",
      path: "/app/agenda-apply",
    },
    {
      title: "Fake News",
      description: "Coming Soon",
      path: null,
      disabled: true,
    },
    {
      title: "Party Mandates",
      description: "Coming soon",
      path: null,
      disabled: true,
    },
  ];

  return (
    <Center style={{ minHeight: "100vh" }} pb="xl">
      <Stack align="center" gap="lg" w="100%" maw={600}>
        <Container size="lg">
          <Title c="white" order={1} size="2rem" fw={600} mb="xl" ta="center">
            Ask. Learn. Participate.
            <br />
            Your Voice Powers Our Path to a Better Nepal.
          </Title>
        </Container>

        <Stack w="100%" gap="xs">
          {buttons.map((btn, index) => (
            <Button
              h="auto"
              key={index}
              variant="light"
              size="lg"
              onClick={() => btn.path && router.push(btn.path)}
              disabled={btn.disabled}
              justify="space-between"
              fullWidth
              rightSection={
                !btn.disabled && <CaretRightIcon size={24} weight="bold" />
              }
            >
              <Stack gap={0} flex={1} align="flex-start" p="lg">
                <Text fw={600} size="xs">
                  {btn.title}
                </Text>
                <Text size="xs" opacity={0.3}>
                  {btn.description}
                </Text>
              </Stack>
            </Button>
          ))}

          <Text size="xs" ta="center" mt="md">
            You can also navigate through using the navigation bar on the left.
          </Text>
        </Stack>
      </Stack>
    </Center>
  );
}
