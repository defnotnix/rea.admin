import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Message } from "../types";

export interface ChatStore {
  // State
  messages: Message[];
  loading: boolean;
  error: string | null;
  syncing: boolean;

  // Actions
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  updateMessage: (messageId: string, updates: Partial<Message>) => void;

  // Vote actions (optimistic)
  upvoteMessage: (messageId: string) => void;
  downvoteMessage: (messageId: string) => void;

  // State setters
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSyncing: (syncing: boolean) => void;

  // Reset
  reset: () => void;
}

export const useChatStore = create<ChatStore>()(
  devtools((set, get) => ({
    // Initial state
    messages: [],
    loading: false,
    error: null,
    syncing: false,

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

    // Upvote message (optimistic)
    upvoteMessage: (messageId) =>
      set((state) => ({
        messages: state.messages.map((msg) =>
          msg.id === messageId
            ? {
                ...msg,
                upvote_count: msg.upvote_count + 1,
                total_votes: msg.total_votes + 1,
              }
            : msg
        ),
        error: null,
      })),

    // Downvote message (optimistic)
    downvoteMessage: (messageId) =>
      set((state) => ({
        messages: state.messages.map((msg) =>
          msg.id === messageId
            ? {
                ...msg,
                downvote_count: msg.downvote_count + 1,
                total_votes: msg.total_votes - 1,
              }
            : msg
        ),
        error: null,
      })),

    // Set loading state
    setLoading: (loading) => set({ loading }),

    // Set error state
    setError: (error) => set({ error }),

    // Set syncing state
    setSyncing: (syncing) => set({ syncing }),

    // Reset
    reset: () =>
      set({
        messages: [],
        loading: false,
        error: null,
        syncing: false,
      }),
  }), { name: "ChatStore" })
);

// Selectors for easier access
export const useMessages = () => useChatStore((state) => state.messages);
export const useLoading = () => useChatStore((state) => state.loading);
export const useError = () => useChatStore((state) => state.error);
export const useSyncing = () => useChatStore((state) => state.syncing);
