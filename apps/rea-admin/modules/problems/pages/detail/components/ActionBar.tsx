"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Group,
  Button,
  Stack,
  Textarea,
  Modal,
  TextInput,
} from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import {
  approveProblem,
  rejectProblem,
  solveProblem,
  deleteProblem,
} from "../../../module.api";
import { PenIcon, TrashIcon } from "@phosphor-icons/react";

interface ActionBarProps {
  problem: any;
  onSuccess?: () => void;
}

export function ActionBar({ problem, onSuccess }: ActionBarProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [
    approveModalOpened,
    { open: openApproveModal, close: closeApproveModal },
  ] = useDisclosure(false);
  const [
    rejectModalOpened,
    { open: openRejectModal, close: closeRejectModal },
  ] = useDisclosure(false);
  const [solveModalOpened, { open: openSolveModal, close: closeSolveModal }] =
    useDisclosure(false);
  const [rejectReason, setRejectReason] = useState("");
  const [solutionData, setSolutionData] = useState("");

  // Approve mutation
  const { mutate: approve, isPending: isApproving } = useMutation({
    mutationFn: () => approveProblem(problem.id, {}),
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Problem approved successfully",
        color: "green",
      });
      queryClient.invalidateQueries({
        queryKey: ["rea.problems.detail", problem.id],
      });
      closeApproveModal();
    },
    onError: (error) => {
      notifications.show({
        title: "Error",
        message:
          error instanceof Error ? error.message : "Failed to approve problem",
        color: "red",
      });
    },
  });

  // Reject mutation
  const { mutate: reject, isPending: isRejecting } = useMutation({
    mutationFn: () => rejectProblem(problem.id, rejectReason || ""),
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Problem rejected successfully",
        color: "green",
      });
      queryClient.invalidateQueries({
        queryKey: ["rea.problems.detail", problem.id],
      });
      closeRejectModal();
    },
    onError: (error) => {
      notifications.show({
        title: "Error",
        message:
          error instanceof Error ? error.message : "Failed to reject problem",
        color: "red",
      });
    },
  });

  // Solve mutation
  const { mutate: solve, isPending: isSolving } = useMutation({
    mutationFn: () =>
      solveProblem(
        problem.id,
        solutionData ? { solution_reference: solutionData } : {}
      ),
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Problem marked as solved",
        color: "green",
      });
      queryClient.invalidateQueries({
        queryKey: ["rea.problems.detail", problem.id],
      });
      closeSolveModal();
    },
    onError: (error) => {
      notifications.show({
        title: "Error",
        message:
          error instanceof Error ? error.message : "Failed to solve problem",
        color: "red",
      });
    },
  });

  // Delete mutation
  const { mutate: deleteProb, isPending: isDeleting } = useMutation({
    mutationFn: () => deleteProblem(problem.id),
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Problem deleted successfully",
        color: "green",
      });
      router.push("/admin/problems");
    },
    onError: (error) => {
      notifications.show({
        title: "Error",
        message:
          error instanceof Error ? error.message : "Failed to delete problem",
        color: "red",
      });
    },
  });

  const handleEdit = () => {
    router.push(`/admin/problems/${problem.id}/edit`);
  };

  const handleDelete = () => {
    if (
      confirm(
        "Are you sure you want to delete this problem? This action cannot be undone."
      )
    ) {
      deleteProb();
    }
  };

  return (
    <>
      <Group justify="flex-end" gap={2}>
        <Button
          variant="default"
          onClick={handleEdit}
          leftSection={<PenIcon />}
        >
          Edit Problem
        </Button>

        {problem.status === "pending" && (
          <>
            <Button
              color="green"
              onClick={openApproveModal}
              loading={isApproving}
            >
              Approve
            </Button>
            <Button color="red" onClick={openRejectModal} loading={isRejecting}>
              Reject
            </Button>
          </>
        )}

        {problem.status === "approved" && (
          <Button color="blue" onClick={openSolveModal} loading={isSolving}>
            Mark as Solved
          </Button>
        )}

        <Button
          color="red"
          variant="light"
          onClick={handleDelete}
          loading={isDeleting}
          leftSection={<TrashIcon />}
        >
          Delete
        </Button>
      </Group>

      {/* Approve Modal */}
      <Modal
        opened={approveModalOpened}
        onClose={closeApproveModal}
        title="Approve Problem"
      >
        <Stack gap="md">
          <p>Are you sure you want to approve this problem?</p>
          <Group justify="flex-end">
            <Button variant="default" onClick={closeApproveModal}>
              Cancel
            </Button>
            <Button
              color="green"
              onClick={() => approve()}
              loading={isApproving}
            >
              Approve
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* Reject Modal */}
      <Modal
        opened={rejectModalOpened}
        onClose={closeRejectModal}
        title="Reject Problem"
      >
        <Stack gap="md">
          <Textarea
            label="Rejection Reason"
            placeholder="Enter the reason for rejection..."
            value={rejectReason}
            onChange={(e) => setRejectReason(e.currentTarget.value)}
            minRows={4}
          />
          <Group justify="flex-end">
            <Button variant="default" onClick={closeRejectModal}>
              Cancel
            </Button>
            <Button
              color="red"
              onClick={() => reject()}
              loading={isRejecting}
              disabled={!rejectReason}
            >
              Reject
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* Solve Modal */}
      <Modal
        opened={solveModalOpened}
        onClose={closeSolveModal}
        title="Mark as Solved"
      >
        <Stack gap="md">
          <TextInput
            label="Solution Reference (Optional)"
            placeholder="Enter solution ID or reference..."
            value={solutionData}
            onChange={(e) => setSolutionData(e.currentTarget.value)}
          />
          <Group justify="flex-end">
            <Button variant="default" onClick={closeSolveModal}>
              Cancel
            </Button>
            <Button color="blue" onClick={() => solve()} loading={isSolving}>
              Mark as Solved
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
