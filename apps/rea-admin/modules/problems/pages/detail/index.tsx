"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  Stack,
  LoadingOverlay,
  Container,
  Button,
  Group,
  Grid,
} from "@mantine/core";
import { getProblemById } from "../../module.api";
import { getMessagesByProblem } from "../../../chat/module.api";
import { moduleInfo } from "../../module.config";
import { ProblemInfoCard } from "./components/ProblemInfoCard";
import { ActionBar } from "./components/ActionBar";
import { AnalyticsCard } from "./components/AnalyticsCard";
import { ChatSection } from "./components/ChatSection";
import { ArrowLeftIcon } from "@phosphor-icons/react";

interface ProblemDetailProps {
  id: string;
}

export function ProblemDetail({ id }: ProblemDetailProps) {
  const router = useRouter();

  const {
    data: problem,
    isLoading: problemLoading,
    error: problemError,
  } = useQuery({
    queryKey: ["rea.problems.detail", id],
    queryFn: () => getProblemById(id),
    initialData: {},
  });

  const { data: messages, isLoading: messagesLoading } = useQuery({
    queryKey: ["rea.chat.list", id],
    queryFn: () => getMessagesByProblem(id),
    enabled: !!problem,
  });

  // if (problemLoading) {
  //   return (
  //     <Container>
  //       <LoadingOverlay visible />
  //     </Container>
  //   );
  // }

  // if (problemError) {
  //   return (
  //     <Container>
  //       <Stack gap="md" align="center" py="xl">
  //         <div>
  //           Error loading problem:{" "}
  //           {problemError instanceof Error
  //             ? problemError.message
  //             : "Unknown error"}
  //         </div>
  //         <Button variant="default" onClick={() => router.back()}>
  //           Go Back
  //         </Button>
  //       </Stack>
  //     </Container>
  //   );
  // }

  // if (!problem) {
  //   return (
  //     <Container>
  //       <Stack gap="md" align="center" py="xl">
  //         <div>Problem not found</div>
  //         <Button variant="default" onClick={() => router.back()}>
  //           Go Back
  //         </Button>
  //       </Stack>
  //     </Container>
  //   );
  // }

  return (
    <Stack gap="xl" p="sm">
      {/* Header with Back Button */}
      <Group justify="space-between" px="md">
        <Group>
          <Button
            variant="subtle"
            onClick={() => router.back()}
            leftSection={<ArrowLeftIcon />}
          >
            Back
          </Button>
          <div>
            <h1 style={{ margin: 0, fontSize: "24px", fontWeight: 600 }}>
              {problem.title}
            </h1>
          </div>
        </Group>
        <ActionBar
          problem={problem}
          onSuccess={() => router.push("/admin/problems")}
        />
      </Group>

      <Grid gutter="xs">
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Stack gap="xs">
            {/* Problem Details Card */}
            <ProblemInfoCard problem={problem} />

            {/* Action Bar */}

            {/* Analytics Card */}
            <AnalyticsCard problem={problem} />
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 8 }}>
          {/* Chat Section */}
          {messagesLoading ? (
            <LoadingOverlay visible />
          ) : (
            <ChatSection problemId={id} messages={messages?.data || []} />
          )}
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
