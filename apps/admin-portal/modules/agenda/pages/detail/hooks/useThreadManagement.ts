import { useState, useEffect } from "react";
import {
  getThreadsByAgenda,
  createThread,
  updateThread,
  deleteThread,
} from "../../../module.api";
import { Thread } from "../types";
import { ThreadFormData } from "../schemas";

export function useThreadManagement(agendaId: string) {
  const [thread, setThread] = useState<Thread | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [modalOpened, setModalOpened] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [initialData, setInitialData] = useState<ThreadFormData>({ title: "" });

  // Delete modal states
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [threadToDelete, setThreadToDelete] = useState<string | null>(null);
  const [isDeletingThread, setIsDeletingThread] = useState(false);

  // Load thread on mount or when agendaId changes
  useEffect(() => {
    if (agendaId) {
      loadThread();
    }
  }, [agendaId]);

  const loadThread = async () => {
    try {
      setLoading(true);
      const data = await getThreadsByAgenda(agendaId);
      setThread(data || null);
      setError(null);
    } catch (err: any) {
      console.error("Failed to load thread:", err);
      setError(err?.message || "Failed to load thread");
      setThread(null);
    } finally {
      setLoading(false);
    }
  };

  const openThreadModal = (threadData?: Thread) => {
    if (threadData) {
      setEditingId(threadData.id);
      setInitialData({ title: threadData.title || "" });
    } else {
      setEditingId(null);
      setInitialData({ title: "" });
    }
    setModalOpened(true);
  };

  const closeThreadModal = () => {
    setModalOpened(false);
    setInitialData({ title: "" });
    setEditingId(null);
  };

  const handleThreadSubmit = async (data: ThreadFormData) => {
    if (!data.title.trim()) return;

    try {
      if (editingId) {
        await updateThread(editingId, { title: data.title });
      } else {
        await createThread({ title: data.title, agenda_id: agendaId });
      }
      await loadThread();
      closeThreadModal();
      setError(null);
    } catch (err: any) {
      setError(err?.message || "Failed to save thread");
    }
  };

  const openDeleteModal = (threadId: string) => {
    setThreadToDelete(threadId);
    setDeleteModalOpened(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpened(false);
    setThreadToDelete(null);
  };

  const handleDeleteThread = async () => {
    if (!threadToDelete) return;

    try {
      setIsDeletingThread(true);
      await deleteThread(threadToDelete);
      await loadThread();
      closeDeleteModal();
      setError(null);
    } catch (err: any) {
      setError(err?.message || "Failed to delete thread");
    } finally {
      setIsDeletingThread(false);
    }
  };

  const refreshThread = () => loadThread();

  return {
    // Data
    thread,
    loading,
    error,

    // Modal state
    modalOpened,
    editingId,
    initialData,

    // Modal functions
    openThreadModal,
    closeThreadModal,
    handleThreadSubmit,

    // Delete modal state
    deleteModalOpened,
    threadToDelete,
    isDeletingThread,

    // Delete modal functions
    openDeleteModal,
    closeDeleteModal,
    handleDeleteThread,

    // Utilities
    refreshThread,
  };
}
