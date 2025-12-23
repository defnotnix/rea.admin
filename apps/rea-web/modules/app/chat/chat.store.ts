import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { generateAllMockMessages } from "./chat.mock";

export interface ChatMessage {
  messageId: string;
  chatId: string;
  userId: string;
  messageText: string;
  isSolution: boolean;
  upvoteCount: number;
  downvoteCount: number;
  totalVotes: number;
  isDeleted: boolean;
  deletedBy?: string;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PendingChange {
  messageId: string;
  type: "upvote" | "downvote" | "delete" | "add";
  timestamp: number;
}

export interface ChatStore {
  // State
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  currentChatId: string | null;
  isSyncing: boolean;
  lastSyncTime: Record<string, number>; // Map of chatId -> timestamp
  pendingChanges: PendingChange[]; // Changes waiting to sync

  // Actions
  setMessages: (messages: ChatMessage[]) => void;
  addMessage: (message: ChatMessage) => void;
  updateMessage: (messageId: string, updates: Partial<ChatMessage>) => void;
  deleteMessage: (messageId: string, deletedBy: string) => void;
  removeMessage: (messageId: string) => void;

  // Vote actions (optimistic)
  upvoteMessage: (messageId: string) => void;
  downvoteMessage: (messageId: string) => void;
  removeVote: (messageId: string, voteType: "up" | "down") => void;

  // Chat management
  setCurrentChatId: (chatId: string) => void;
  getMessagesByChatId: (chatId: string) => ChatMessage[];
  clearMessages: () => void;

  // Loading & Error
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setIsSyncing: (syncing: boolean) => void;

  // Sync management
  fetchMessages: (chatId: string) => Promise<void>;
  syncChanges: (chatId: string) => Promise<void>;
  addPendingChange: (change: PendingChange) => void;
  removePendingChange: (messageId: string) => void;
  clearPendingChanges: () => void;

  // Reload/Reset
  reload: () => void;
  reset: () => void;
}

// API helper (update with your actual API endpoint)
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

async function fetchChatMessages(chatId: string): Promise<ChatMessage[]> {
  try {
    const res = await fetch(`${API_BASE}/chats/${chatId}/messages`);
    if (!res.ok) throw new Error(`Failed to fetch messages: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    throw error;
  }
}

async function syncVoteChange(
  messageId: string,
  voteType: "upvote" | "downvote" | "removeVote",
  direction?: "up" | "down"
): Promise<void> {
  try {
    const res = await fetch(`${API_BASE}/messages/${messageId}/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: voteType, direction }),
    });
    if (!res.ok) throw new Error(`Failed to sync vote: ${res.status}`);
  } catch (error) {
    console.error("Failed to sync vote:", error);
    throw error;
  }
}

async function syncDeleteMessage(messageId: string): Promise<void> {
  try {
    const res = await fetch(`${API_BASE}/messages/${messageId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error(`Failed to delete message: ${res.status}`);
  } catch (error) {
    console.error("Failed to delete message:", error);
    throw error;
  }
}

export const useChatStore = create<ChatStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        messages: generateAllMockMessages(),
        loading: false,
        error: null,
        currentChatId: null,
        isSyncing: false,
        lastSyncTime: {},
        pendingChanges: [],

        // Set messages
        setMessages: (messages) => set({ messages, error: null }),

        // Add a single message
        addMessage: (message) =>
          set((state) => ({
            messages: [...state.messages, message],
            error: null,
          })),

        // Update a message
        updateMessage: (messageId, updates) =>
          set((state) => ({
            messages: state.messages.map((msg) =>
              msg.messageId === messageId
                ? {
                    ...msg,
                    ...updates,
                    updatedAt: new Date(),
                  }
                : msg
            ),
            error: null,
          })),

        // Soft delete (mark as deleted)
        deleteMessage: (messageId, deletedBy) =>
          set((state) => ({
            messages: state.messages.map((msg) =>
              msg.messageId === messageId
                ? {
                    ...msg,
                    isDeleted: true,
                    deletedBy,
                    deletedAt: new Date(),
                    updatedAt: new Date(),
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

        // Hard delete (remove from store)
        removeMessage: (messageId) =>
          set((state) => ({
            messages: state.messages.filter(
              (msg) => msg.messageId !== messageId
            ),
            error: null,
          })),

        // Upvote message (optimistic)
        upvoteMessage: (messageId) =>
          set((state) => ({
            messages: state.messages.map((msg) =>
              msg.messageId === messageId
                ? {
                    ...msg,
                    upvoteCount: msg.upvoteCount + 1,
                    totalVotes: msg.totalVotes + 1,
                    updatedAt: new Date(),
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

        // Downvote message (optimistic)
        downvoteMessage: (messageId) =>
          set((state) => ({
            messages: state.messages.map((msg) =>
              msg.messageId === messageId
                ? {
                    ...msg,
                    downvoteCount: msg.downvoteCount + 1,
                    totalVotes: msg.totalVotes - 1,
                    updatedAt: new Date(),
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

        // Remove a vote
        removeVote: (messageId, voteType) =>
          set((state) => ({
            messages: state.messages.map((msg) =>
              msg.messageId === messageId
                ? {
                    ...msg,
                    upvoteCount:
                      voteType === "up"
                        ? Math.max(0, msg.upvoteCount - 1)
                        : msg.upvoteCount,
                    downvoteCount:
                      voteType === "down"
                        ? Math.max(0, msg.downvoteCount - 1)
                        : msg.downvoteCount,
                    totalVotes:
                      voteType === "up"
                        ? msg.totalVotes - 1
                        : msg.totalVotes + 1,
                    updatedAt: new Date(),
                  }
                : msg
            ),
            error: null,
          })),

        // Set current chat
        setCurrentChatId: (chatId) => set({ currentChatId: chatId }),

        // Get messages for specific chat
        getMessagesByChatId: (chatId) => {
          const state = get();
          return state.messages.filter(
            (msg) => msg.chatId === chatId && !msg.isDeleted
          );
        },

        // Clear all messages
        clearMessages: () => set({ messages: [], error: null }),

        // Set loading state
        setLoading: (loading) => set({ loading }),

        // Set error state
        setError: (error) => set({ error }),

        // Set syncing state
        setIsSyncing: (syncing) => set({ isSyncing: syncing }),

        // Fetch fresh messages from API
        fetchMessages: async (chatId) => {
          set({ loading: true, error: null });
          try {
            const messages = await fetchChatMessages(chatId);
            set({
              messages,
              lastSyncTime: {
                ...get().lastSyncTime,
                [chatId]: Date.now(),
              },
              loading: false,
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

        // Sync pending changes to API
        syncChanges: async (chatId) => {
          const state = get();
          if (state.pendingChanges.length === 0) return;

          set({ isSyncing: true });
          const failedChanges: PendingChange[] = [];

          for (const change of state.pendingChanges) {
            try {
              if (change.type === "upvote") {
                await syncVoteChange(change.messageId, "upvote");
              } else if (change.type === "downvote") {
                await syncVoteChange(change.messageId, "downvote");
              } else if (change.type === "delete") {
                await syncDeleteMessage(change.messageId);
              }
            } catch (error) {
              console.error(`Failed to sync ${change.type} for ${change.messageId}`);
              failedChanges.push(change);
            }
          }

          set({
            pendingChanges: failedChanges, // Keep only failed changes for retry
            isSyncing: false,
            lastSyncTime: {
              ...get().lastSyncTime,
              [chatId]: Date.now(),
            },
          });
        },

        // Add a pending change
        addPendingChange: (change) =>
          set((state) => ({
            pendingChanges: [...state.pendingChanges, change],
          })),

        // Remove a pending change
        removePendingChange: (messageId) =>
          set((state) => ({
            pendingChanges: state.pendingChanges.filter(
              (change) => change.messageId !== messageId
            ),
          })),

        // Clear all pending changes
        clearPendingChanges: () => set({ pendingChanges: [] }),

        // Reload (clear and reset state)
        reload: () =>
          set({
            messages: [],
            loading: false,
            error: null,
            currentChatId: null,
            isSyncing: false,
            lastSyncTime: {},
            pendingChanges: [],
          }),

        // Complete reset
        reset: () =>
          set({
            messages: [],
            loading: false,
            error: null,
            currentChatId: null,
            isSyncing: false,
            lastSyncTime: {},
            pendingChanges: [],
          }),
      }),
      {
        name: "chat-store", // localStorage key
      }
    ),
    { name: "ChatStore" }
  )
);

// Selectors for easier access
export const useChatMessages = () => useChatStore((state) => state.messages);
export const useChatLoading = () => useChatStore((state) => state.loading);
export const useChatError = () => useChatStore((state) => state.error);
export const useCurrentChatId = () =>
  useChatStore((state) => state.currentChatId);
export const useChatIsSyncing = () => useChatStore((state) => state.isSyncing);
export const usePendingChanges = () =>
  useChatStore((state) => state.pendingChanges);
export const useMessagesByChatId = (chatId: string) =>
  useChatStore((state) =>
    state.messages.filter((msg) => msg.chatId === chatId && !msg.isDeleted)
  );
