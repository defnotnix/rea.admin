import { useState, useEffect } from "react";
import { VotingHistoryEntry } from "../types";

export function useVotingData(agendaId: string) {
  const [votingHistory, setVotingHistory] = useState<VotingHistoryEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load voting history on mount or when agendaId changes
  useEffect(() => {
    if (agendaId) {
      loadVotingHistory();
    }
  }, [agendaId]);

  const loadVotingHistory = async () => {
    try {
      setLoading(true);
      // TODO: Implement voting history API call when backend is ready
      // const data = await getVotingHistory(agendaId);
      // setVotingHistory(data?.results || []);
      setVotingHistory([]);
      setError(null);
    } catch (err: any) {
      console.error("Failed to load voting history:", err);
      setError(err?.message || "Failed to load voting history");
      setVotingHistory([]);
    } finally {
      setLoading(false);
    }
  };

  const refreshVotingHistory = () => loadVotingHistory();

  return {
    // Data
    votingHistory,
    loading,
    error,

    // Utilities
    refreshVotingHistory,
  };
}
