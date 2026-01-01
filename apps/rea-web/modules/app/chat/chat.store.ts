/**
 * Chat Store - Zustand-based state management
 * Aligned with backend API schema and supports optimistic updates
 */

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import {
  Message,
  Thread,
  PaginationInfo,
  PendingChange,
  ChatStoreState,
} from "./types";
import * as chatApi from "./chat.api";

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function createPaginationInfo(): PaginationInfo {
  return {
    total_pages: 0,
    total_items: 0,
    current_page: 1,
    page_size: 20,
    has_next: false,
    has_previous: false,
  };
}

function getPaginationKey(threadId: string): string {
  return `pagination:${threadId}`;
}

// ============================================================================
// ZUSTAND STORE
// ============================================================================

export const useChatStore = create<ChatStoreState>()(
  devtools(
    persist(
      (set, get) => ({
        // ====================================================================
        // INITIAL STATE
        // ====================================================================
        messages: [],
        threads: [],
        loading: false,
        error: null,
        currentThreadId: null,
        currentAgendaId: null,
        isSyncing: false,
        lastSyncTime: {},
        pendingChanges: [],
        pagination: {},

        // ====================================================================
        // MESSAGE ACTIONS
        // ====================================================================

        setMessages: (messages) =>
          set({ messages, error: null }),

        addMessage: (message) =>
          set((state) => ({
            messages: [...state.messages, message],
            error: null,
          })),

        updateMessage: (messageId, updates) =>
          set((state) => ({
            messages: state.messages.map((msg) =>
              msg.id === messageId
                ? {
                    ...msg,
                    ...updates,
                    updated_at: new Date().toISOString(),
                  }
                : msg
            ),
            error: null,
          })),

        deleteMessage: (messageId) =>
          set((state) => ({
            messages: state.messages.map((msg) =>
              msg.id === messageId
                ? {
                    ...msg,
                    is_deleted: true,
                    updated_at: new Date().toISOString(),
                  }
                : msg
            ),
            pendingChanges: [
              ...state.pendingChanges,
              {
                messageId,
                type: "delete",
                timestamp: Date.now(),
              },
            ],
            error: null,
          })),

        // ====================================================================
        // VOTE ACTIONS (OPTIMISTIC)
        // ====================================================================

        upvoteMessage: (messageId) =>
          set((state) => ({
            messages: state.messages.map((msg) =>
              msg.id === messageId
                ? {
                    ...msg,
                    upvote_count: msg.upvote_count + 1,
                    total_votes: msg.total_votes + 1,
                    current_user_vote: msg.current_user_vote === 1 ? null : 1,
                    updated_at: new Date().toISOString(),
                  }
                : msg
            ),
            pendingChanges: [
              ...state.pendingChanges,
              {
                messageId,
                type: "upvote",
                timestamp: Date.now(),
              },
            ],
            error: null,
          })),

        downvoteMessage: (messageId) =>
          set((state) => ({
            messages: state.messages.map((msg) =>
              msg.id === messageId
                ? {
                    ...msg,
                    downvote_count: msg.downvote_count + 1,
                    total_votes: msg.total_votes - 1,
                    current_user_vote: msg.current_user_vote === -1 ? null : -1,
                    updated_at: new Date().toISOString(),
                  }
                : msg
            ),
            pendingChanges: [
              ...state.pendingChanges,
              {
                messageId,
                type: "downvote",
                timestamp: Date.now(),
              },
            ],
            error: null,
          })),

        removeVote: (messageId) =>
          set((state) => ({
            messages: state.messages.map((msg) =>
              msg.id === messageId
                ? {
                    ...msg,
                    current_user_vote: null,
                    updated_at: new Date().toISOString(),
                  }
                : msg
            ),
            error: null,
          })),

        // ====================================================================
        // THREAD MANAGEMENT
        // ====================================================================

        setThreads: (threads) =>
          set({ threads, error: null }),

        setCurrentThreadId: (threadId) =>
          set({ currentThreadId: threadId }),

        setCurrentAgendaId: (agendaId) =>
          set({ currentAgendaId: agendaId }),

        getMessagesByThreadId: (threadId) => {
          const state = get();
          return state.messages.filter(
            (msg) => msg.thread === threadId && !msg.is_deleted
          );
        },

        // ====================================================================
        // LOADING & ERROR
        // ====================================================================

        setLoading: (loading) => set({ loading }),

        setError: (error) => set({ error }),

        setIsSyncing: (syncing) => set({ isSyncing: syncing }),

        // ====================================================================
        // PAGINATION
        // ====================================================================

        setPagination: (threadId, pagination) =>
          set((state) => ({
            pagination: {
              ...state.pagination,
              [getPaginationKey(threadId)]: pagination,
            },
          })),

        // ====================================================================
        // SYNC MANAGEMENT
        // ====================================================================

        fetchThreads: async (agendaId) => {
          set({ loading: true, error: null });
          try {
            const threads = await chatApi.getThreadsByAgenda(agendaId);
            set({
              threads,
              currentAgendaId: agendaId,
              loading: false,
            });
          } catch (error) {
            set({
              error:
                error instanceof Error
                  ? error.message
                  : "Failed to fetch threads",
              loading: false,
            });
          }
        },

        fetchMessages: async (threadId, page = 1) => {
          set({ loading: true, error: null });
          try {
            const response = await chatApi.getMessagesByThread(threadId, page);
            const state = get();

            // Merge with existing messages (for pagination)
            let allMessages = [...state.messages];
            if (page === 1) {
              // First page - replace all messages for this thread
              allMessages = allMessages.filter((msg) => msg.thread !== threadId);
            }
            allMessages = [...allMessages, ...response.results];

            set({
              messages: allMessages,
              currentThreadId: threadId,
              lastSyncTime: {
                ...state.lastSyncTime,
                [threadId]: Date.now(),
              },
              loading: false,
            });

            // Update pagination
            get().setPagination(threadId, {
              total_pages: Math.ceil(response.count / 20),
              total_items: response.count,
              current_page: page,
              page_size: 20,
              has_next: response.next !== null,
              has_previous: response.previous !== null,
            });
          } catch (error) {
            set({
              error:
                error instanceof Error
                  ? error.message
                  : "Failed to fetch messages",
              loading: false,
            });
          }
        },

        syncChanges: async () => {
          const state = get();
          if (state.pendingChanges.length === 0) return;

          set({ isSyncing: true });
          const failedChanges: PendingChange[] = [];

          for (const change of state.pendingChanges) {
            try {
              const message = state.messages.find(
                (msg) => msg.id === change.messageId
              );
              if (!message) continue;

              if (change.type === "upvote" || change.type === "downvote") {
                const value = change.type === "upvote" ? (1 as const) : (-1 as const);
                await chatApi.toggleVote(change.messageId, value, null);
              } else if (change.type === "delete") {
                await chatApi.deleteMessage(change.messageId, null);
              }
            } catch (error) {
              console.error(
                `Failed to sync ${change.type} for ${change.messageId}`
              );
              failedChanges.push(change);
            }
          }

          set({
            pendingChanges: failedChanges,
            isSyncing: false,
          });
        },

        addPendingChange: (change) =>
          set((state) => ({
            pendingChanges: [...state.pendingChanges, change],
          })),

        removePendingChange: (messageId) =>
          set((state) => ({
            pendingChanges: state.pendingChanges.filter(
              (change) => change.messageId !== messageId
            ),
          })),

        clearPendingChanges: () => set({ pendingChanges: [] }),

        // ====================================================================
        // RESET
        // ====================================================================

        clearMessages: () => set({ messages: [], error: null }),

        reset: () =>
          set({
            messages: [],
            threads: [],
            loading: false,
            error: null,
            currentThreadId: null,
            currentAgendaId: null,
            isSyncing: false,
            lastSyncTime: {},
            pendingChanges: [],
            pagination: {},
          }),
      }),
      {
        name: "chat-store",
      }
    ),
    { name: "ChatStore" }
  )
);

// ============================================================================
// SELECTORS FOR EASY ACCESS
// ============================================================================

export const useChatMessages = () =>
  useChatStore((state) => state.messages);

export const useChatThreads = () =>
  useChatStore((state) => state.threads);

export const useChatLoading = () =>
  useChatStore((state) => state.loading);

export const useChatError = () =>
  useChatStore((state) => state.error);

export const useCurrentThreadId = () =>
  useChatStore((state) => state.currentThreadId);

export const useCurrentAgendaId = () =>
  useChatStore((state) => state.currentAgendaId);

export const useChatIsSyncing = () =>
  useChatStore((state) => state.isSyncing);

export const usePendingChanges = () =>
  useChatStore((state) => state.pendingChanges);

export const useMessagesByThreadId = (threadId: string) =>
  useChatStore((state) =>
    state.messages.filter(
      (msg) => msg.thread === threadId && !msg.is_deleted
    )
  );

export const useThreadPagination = (threadId: string) =>
  useChatStore((state) =>
    state.pagination[getPaginationKey(threadId)] || createPaginationInfo()
  );
