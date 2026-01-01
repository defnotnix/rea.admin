import { useState, useEffect, useCallback } from "react";
import {
  getMilestonesBySolution,
  createMilestone,
  updateMilestone,
} from "../../../module.api";
import { Milestone } from "../types";

export function useMilestoneManagement(solutionId: string) {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [initialData, setInitialData] = useState<Milestone | null>(null);

  const loadMilestones = useCallback(async () => {
    if (!solutionId) return;

    try {
      setLoading(true);
      console.log("Loading milestones for solution:", solutionId);
      const response = await getMilestonesBySolution(solutionId);

      if (response?.results) {
        console.log("Milestones loaded:", response.results.length);
        setMilestones(response.results);
        setError(null);
      }
    } catch (err: any) {
      console.error("Failed to load milestones:", err);
      setError(err?.message || "Failed to load milestones");
    } finally {
      setLoading(false);
    }
  }, [solutionId]);

  const openMilestoneModal = useCallback(
    (milestone?: Milestone) => {
      if (milestone) {
        setEditingId(milestone.id);
        setInitialData(milestone);
      } else {
        setEditingId(null);
        setInitialData(null);
      }
      setModalOpened(true);
    },
    []
  );

  const closeMilestoneModal = useCallback(() => {
    setModalOpened(false);
    setEditingId(null);
    setInitialData(null);
  }, []);

  const handleMilestoneSubmit = useCallback(
    async (data: any) => {
      try {
        console.log("Submitting milestone:", data);
        if (editingId) {
          // Update existing milestone
          await updateMilestone(editingId, data);
          console.log("Milestone updated");
        } else {
          // Create new milestone
          await createMilestone({
            ...data,
            solution: solutionId,
          });
          console.log("Milestone created");
        }

        // Reload milestones
        await loadMilestones();
        closeMilestoneModal();
        setError(null);
      } catch (err: any) {
        console.error("Failed to save milestone:", err);
        setError(err?.message || "Failed to save milestone");
        throw err;
      }
    },
    [editingId, solutionId, loadMilestones, closeMilestoneModal]
  );

  useEffect(() => {
    if (solutionId) {
      loadMilestones();
    }
  }, [solutionId, loadMilestones]);

  return {
    milestones,
    loading,
    error,
    modalOpened,
    editingId,
    initialData,
    openMilestoneModal,
    closeMilestoneModal,
    handleMilestoneSubmit,
    refreshMilestones: loadMilestones,
  };
}
