/**
 * Type definitions for chat module aligned with backend API schema
 * References: /api/messages/, /api/threads/, /api/votes/ endpoints
 */

export interface MessageAuthor {
  id: string;
  email: string;
  full_name: string;
  district?: string;
  district_name?: string;
  profession?: string;
  is_verified: boolean;
  is_moderator: boolean;
}

export interface Message {
  id: string;
  thread: string;
  author: MessageAuthor;
  message: string;
  is_solution: boolean;
  upvote_count: number;
  downvote_count: number;
  total_votes: number;
  current_user_vote: "upvote" | "downvote" | null;
  can_edit: boolean;
  can_delete: boolean;
  is_deleted: boolean;
  created_at: string; // ISO 8601
  updated_at: string; // ISO 8601
}

export interface Thread {
  id: string;
  title?: string;
  agenda?: string;
  agenda_title?: string;
  message_count?: number;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Vote {
  id: string;
  message: string;
  voter: string;
  value: 1 | -1;
  created_at: string;
  updated_at: string;
}

export interface PaginationInfo {
  total_pages: number;
  total_items: number;
  current_page: number;
  page_size: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface VoteToggleResponse {
  message_id: string;
  vote_value: 1 | -1;
  upvote_count: number;
  downvote_count: number;
  total_votes: number;
  message: string;
}

export interface VoteStatusResponse {
  message_id: string;
  upvote_count: number;
  downvote_count: number;
  total_votes: number;
  current_user_vote: 1 | -1 | null;
}

export interface CreateMessagePayload {
  thread: string;
  message: string;
  is_solution?: boolean;
}

export interface UpdateMessagePayload {
  message?: string;
  is_solution?: boolean;
}

export interface CreateThreadPayload {
  title: string;
  description?: string;
  agenda: string;
}

export interface CreateVotePayload {
  message_id: string;
  value: 1 | -1;
}

// Pending change tracking for optimistic updates
export interface PendingChange {
  messageId: string;
  type: "upvote" | "downvote" | "delete" | "add" | "update";
  timestamp: number;
  payload?: Record<string, any>;
}

export interface ChatStoreState {
  // State
  messages: Message[];
  threads: Thread[];
  loading: boolean;
  error: string | null;
  currentThreadId: string | null;
  currentAgendaId: string | null;
  isSyncing: boolean;
  lastSyncTime: Record<string, number>;
  pendingChanges: PendingChange[];
  pagination: Record<string, PaginationInfo>;

  // Actions
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  updateMessage: (messageId: string, updates: Partial<Message>) => void;
  deleteMessage: (messageId: string) => void;

  // Vote actions (optimistic)
  upvoteMessage: (messageId: string) => void;
  downvoteMessage: (messageId: string) => void;
  removeVote: (messageId: string) => void;

  // Thread management
  setThreads: (threads: Thread[]) => void;
  setCurrentThreadId: (threadId: string | null) => void;
  setCurrentAgendaId: (agendaId: string | null) => void;
  getMessagesByThreadId: (threadId: string) => Message[];

  // Loading & Error
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setIsSyncing: (syncing: boolean) => void;

  // Sync management
  fetchThreads: (agendaId: string) => Promise<void>;
  fetchMessages: (threadId: string, page?: number) => Promise<void>;
  syncChanges: () => Promise<void>;
  addPendingChange: (change: PendingChange) => void;
  removePendingChange: (messageId: string) => void;
  clearPendingChanges: () => void;
  setPagination: (threadId: string, pagination: PaginationInfo) => void;

  // Reset
  clearMessages: () => void;
  reset: () => void;
}
