import { useState, useEffect } from "react";
import {
  getSolutionsByAgenda,
  createSolution,
  updateSolution,
} from "../../../module.api";
import { Solution } from "../types";
import { SolutionFormData } from "../schemas";

export function useSolutionManagement(agendaId: string) {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    count: 0,
    next: null as string | null,
    previous: null as string | null,
  });

  // Modal states
  const [modalOpened, setModalOpened] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [initialData, setInitialData] = useState<SolutionFormData>({
    title: "",
    summary: "",
  });

  // Delete modal states
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [solutionToDelete, setSolutionToDelete] = useState<string | null>(null);
  const [isDeletingSolution, setIsDeletingSolution] = useState(false);

  // Load solutions on mount or when agendaId changes
  useEffect(() => {
    if (agendaId) {
      setCurrentPage(1);
      loadSolutions(1);
    }
  }, [agendaId]);

  const loadSolutions = async (page = 1) => {
    try {
      setLoading(true);
      const data = await getSolutionsByAgenda(agendaId, { page });

      // Handle both paginated and non-paginated response formats
      const isArray = Array.isArray(data);
      const results = isArray ? data : (data?.results || []);
      const paginationData = isArray ? { count: 0, next: null, previous: null } : {
        count: data?.count || 0,
        next: data?.next || null,
        previous: data?.previous || null,
      };

      setSolutions(results);
      setCurrentPage(page);
      setPagination(paginationData);
      setError(null);
    } catch (err: any) {
      console.error("Failed to load solutions:", err);
      setError(err?.message || "Failed to load solutions");
      setSolutions([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreSolutions = async () => {
    if (!pagination.next || loading) return;

    try {
      setLoading(true);
      const nextPage = currentPage + 1;
      const data = await getSolutionsByAgenda(agendaId, { page: nextPage });

      // Handle both paginated and non-paginated response formats
      const isArray = Array.isArray(data);
      const results = isArray ? data : (data?.results || []);
      const paginationData = isArray ? { count: 0, next: null, previous: null } : {
        count: data?.count || 0,
        next: data?.next || null,
        previous: data?.previous || null,
      };

      setSolutions((prev) => [...prev, ...results]);
      setCurrentPage(nextPage);
      setPagination(paginationData);
      setError(null);
    } catch (err: any) {
      console.error("Failed to load more solutions:", err);
      setError(err?.message || "Failed to load more solutions");
    } finally {
      setLoading(false);
    }
  };

  const openSolutionModal = (solution?: Solution) => {
    if (solution) {
      setEditingId(solution.id);
      setInitialData({
        title: solution.title,
        summary: solution.description || "",
      });
    } else {
      setEditingId(null);
      setInitialData({ title: "", summary: "" });
    }
    setModalOpened(true);
  };

  const closeSolutionModal = () => {
    setModalOpened(false);
    setInitialData({ title: "", summary: "" });
    setEditingId(null);
  };

  const handleSolutionSubmit = async (data: SolutionFormData) => {
    if (!data.title.trim()) return;

    try {
      if (editingId) {
        await updateSolution(editingId, {
          title: data.title,
          description: data.summary,
        });
      } else {
        await createSolution({
          title: data.title,
          description: data.summary,
          agenda_id: agendaId,
        });
      }
      await loadSolutions();
      closeSolutionModal();
      setError(null);
    } catch (err: any) {
      setError(err?.message || "Failed to save solution");
    }
  };

  const openDeleteModal = (solutionId: string) => {
    setSolutionToDelete(solutionId);
    setDeleteModalOpened(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpened(false);
    setSolutionToDelete(null);
  };

  const handleDeleteSolution = async () => {
    if (!solutionToDelete) return;

    try {
      setIsDeletingSolution(true);
      // Note: API doesn't have deleteSolution yet
      // TODO: Implement delete endpoint or soft delete in backend
      await loadSolutions();
      closeDeleteModal();
      setError(null);
    } catch (err: any) {
      setError(err?.message || "Failed to delete solution");
    } finally {
      setIsDeletingSolution(false);
    }
  };

  const refreshSolutions = () => loadSolutions();

  return {
    // Data
    solutions,
    loading,
    error,

    // Pagination
    pagination,
    loadMoreSolutions,

    // Modal state
    modalOpened,
    editingId,
    initialData,

    // Modal functions
    openSolutionModal,
    closeSolutionModal,
    handleSolutionSubmit,

    // Delete modal state
    deleteModalOpened,
    solutionToDelete,
    isDeletingSolution,

    // Delete modal functions
    openDeleteModal,
    closeDeleteModal,
    handleDeleteSolution,

    // Utilities
    refreshSolutions,
  };
}
