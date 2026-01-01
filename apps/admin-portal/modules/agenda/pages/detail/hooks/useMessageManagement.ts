import { useState, useEffect, useCallback } from "react";
import {
  getMessagesByThread,
  createMessage,
  toggleVote,
} from "../../../module.api";
import { Message } from "../types";
import { useUser } from "../../../../auth/auth.store";
import { useChatStore } from "./useChatStore";

export function useMessageManagement(threadId: string) {
  const user = useUser();
  const { setMessages: setStoreMessages, setLoading: setStoreLoading, setError: setStoreError } = useChatStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    total_pages: 0,
    total_items: 0,
    current_page: 1,
    page_size: 20,
    has_next: false,
    has_previous: false,
  });

  const loadMessages = useCallback(
    async (page = 1) => {
      try {
        setLoading(true);
        setStoreLoading(true);
        console.log("Loading messages for thread:", threadId, "page:", page);
        const response = await getMessagesByThread(threadId, { page });

        if (response?.results) {
          console.log("Messages loaded successfully:", response.results.length, "messages");
          setMessages(response.results);
          // Sync to store for optimistic updates
          setStoreMessages(response.results);
          setPagination(response.pagination || {});
          setError(null);
          setStoreError(null);
        }
      } catch (err: any) {
        console.error("Failed to load messages:", err);
        const errorMsg = err?.message || "Failed to load messages";
        setError(errorMsg);
        setStoreError(errorMsg);
      } finally {
        setLoading(false);
        setStoreLoading(false);
      }
    },
    [threadId, setStoreMessages, setStoreLoading, setStoreError]
  );

  const loadMoreMessages = useCallback(async () => {
    if (!pagination.has_previous || loadingMore) return;

    try {
      setLoadingMore(true);
      const nextPage = pagination.current_page + 1;
      console.log("Loading more messages, page:", nextPage);
      const response = await getMessagesByThread(threadId, { page: nextPage });

      if (response?.results) {
        // Prepend older messages to the beginning
        const updatedMessages = [...response.results, ...messages];
        setMessages(updatedMessages);
        // Sync to store
        setStoreMessages(updatedMessages);
        setPagination(response.pagination || {});
        console.log("Loaded", response.results.length, "more messages");
      }
    } catch (err: any) {
      console.error("Failed to load more messages:", err);
      const errorMsg = err?.message || "Failed to load more messages";
      setError(errorMsg);
      setStoreError(errorMsg);
    } finally {
      setLoadingMore(false);
    }
  }, [threadId, pagination, loadingMore, messages, setStoreMessages, setStoreError]);

  const handleSendMessage = useCallback(
    async (messageText: string) => {
      if (!messageText.trim()) return;

      try {
        console.log("Creating message for thread:", threadId);
        const result = await createMessage({
          thread: threadId,
          message: messageText,
        });
        console.log("Message created successfully:", result);

        // Reload ALL messages to get the new one from the API
        console.log("Reloading all messages to sync with server");
        await loadMessages(1);
        setError(null);
        setStoreError(null);
      } catch (err: any) {
        console.error("Failed to send message:", err);
        const errorMsg = err?.message || "Failed to send message";
        setError(errorMsg);
        setStoreError(errorMsg);
        throw err;
      }
    },
    [threadId, loadMessages, setStoreError]
  );

  const handleToggleVote = useCallback(
    async (messageId: string, voteType: "upvote" | "downvote") => {
      if (!user?.userId) return;

      try {
        await toggleVote({
          message_id: messageId,
          vote_type: voteType,
        });

        // Refresh messages to get updated vote counts
        await loadMessages(pagination.current_page);
      } catch (err: any) {
        console.error("Failed to toggle vote:", err);
        setError(err?.message || "Failed to vote");
      }
    },
    [user, loadMessages, pagination.current_page]
  );

  useEffect(() => {
    if (threadId) {
      loadMessages(1);
    }
  }, [threadId, loadMessages]);

  return {
    messages,
    loading,
    loadingMore,
    error,
    pagination,
    loadMoreMessages,
    handleSendMessage,
    handleToggleVote,
    refreshMessages: () => loadMessages(1),
  };
}
