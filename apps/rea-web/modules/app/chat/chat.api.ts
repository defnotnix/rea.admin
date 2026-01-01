/**
 * Chat API integration layer
 * Handles all communication with backend endpoints:
 * - /api/threads/
 * - /api/messages/
 * - /api/votes/
 */

import {
  Message,
  Thread,
  PaginatedResponse,
  CreateMessagePayload,
  UpdateMessagePayload,
  CreateThreadPayload,
  VoteToggleResponse,
  VoteStatusResponse,
} from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

interface ApiError {
  detail?: string;
  message?: string;
}

function getAuthHeader(token?: string | null): Record<string, string> {
  if (!token) return {};
  return {
    Authorization: `Token ${token}`,
  };
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const data = (await response.json()) as ApiError;
    throw new Error(data.detail || data.message || `API Error: ${response.status}`);
  }
  return response.json();
}

// ============================================================================
// THREAD ENDPOINTS
// ============================================================================

/**
 * GET /api/threads/by_agenda/{agendaId}
 * List all threads for a specific agenda
 */
export async function getThreadsByAgenda(
  agendaId: string,
  token?: string | null
): Promise<Thread[]> {
  const response = await fetch(`${API_BASE}/api/threads/by_agenda/${agendaId}`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(token),
    },
  });
  return handleResponse<Thread[]>(response);
}

/**
 * GET /api/threads/{id}
 * Get a specific thread
 */
export async function getThreadById(
  threadId: string,
  token?: string | null
): Promise<Thread> {
  const response = await fetch(`${API_BASE}/api/threads/${threadId}`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(token),
    },
  });
  return handleResponse<Thread>(response);
}

/**
 * POST /api/threads/
 * Create a new thread
 */
export async function createThread(
  payload: CreateThreadPayload,
  token: string | null
): Promise<Thread> {
  if (!token) throw new Error("Authentication required");

  const response = await fetch(`${API_BASE}/api/threads/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(token),
    },
    body: JSON.stringify(payload),
  });
  return handleResponse<Thread>(response);
}

/**
 * PATCH /api/threads/{id}/
 * Update a thread
 */
export async function updateThread(
  threadId: string,
  payload: Partial<CreateThreadPayload>,
  token: string | null
): Promise<Thread> {
  if (!token) throw new Error("Authentication required");

  const response = await fetch(`${API_BASE}/api/threads/${threadId}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(token),
    },
    body: JSON.stringify(payload),
  });
  return handleResponse<Thread>(response);
}

/**
 * DELETE /api/threads/{id}/
 * Delete a thread
 */
export async function deleteThread(
  threadId: string,
  token: string | null
): Promise<void> {
  if (!token) throw new Error("Authentication required");

  const response = await fetch(`${API_BASE}/api/threads/${threadId}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(token),
    },
  });

  if (!response.ok) {
    const data = (await response.json()) as ApiError;
    throw new Error(data.detail || data.message || `Failed to delete thread: ${response.status}`);
  }
}

// ============================================================================
// MESSAGE ENDPOINTS
// ============================================================================

/**
 * GET /api/messages/?thread={threadId}&page={page}
 * List messages for a thread with pagination
 */
export async function getMessagesByThread(
  threadId: string,
  page: number = 1,
  limit: number = 20,
  token?: string | null
): Promise<PaginatedResponse<Message>> {
  const params = new URLSearchParams({
    thread: threadId,
    page: page.toString(),
    page_size: limit.toString(),
  });

  const response = await fetch(`${API_BASE}/api/messages/?${params.toString()}`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(token),
    },
  });
  return handleResponse<PaginatedResponse<Message>>(response);
}

/**
 * GET /api/messages/{id}/
 * Get a specific message
 */
export async function getMessageById(
  messageId: string,
  token?: string | null
): Promise<Message> {
  const response = await fetch(`${API_BASE}/api/messages/${messageId}/`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(token),
    },
  });
  return handleResponse<Message>(response);
}

/**
 * POST /api/messages/
 * Create a new message
 * Minimum 10 characters required
 */
export async function createMessage(
  payload: CreateMessagePayload,
  token: string | null
): Promise<Message> {
  if (!token) throw new Error("Authentication required");
  if (payload.message.length < 10) {
    throw new Error("Message must be at least 10 characters long");
  }

  const response = await fetch(`${API_BASE}/api/messages/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(token),
    },
    body: JSON.stringify(payload),
  });
  return handleResponse<Message>(response);
}

/**
 * PATCH /api/messages/{id}/
 * Update a message (author only)
 * Can update: message content, is_solution flag
 */
export async function updateMessage(
  messageId: string,
  payload: UpdateMessagePayload,
  token: string | null
): Promise<Message> {
  if (!token) throw new Error("Authentication required");

  const response = await fetch(`${API_BASE}/api/messages/${messageId}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(token),
    },
    body: JSON.stringify(payload),
  });
  return handleResponse<Message>(response);
}

/**
 * PUT /api/messages/{id}/
 * Full update of a message (author only)
 */
export async function replaceMessage(
  messageId: string,
  payload: UpdateMessagePayload,
  token: string | null
): Promise<Message> {
  if (!token) throw new Error("Authentication required");

  const response = await fetch(`${API_BASE}/api/messages/${messageId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(token),
    },
    body: JSON.stringify(payload),
  });
  return handleResponse<Message>(response);
}

/**
 * DELETE /api/messages/{id}/
 * Soft delete a message (author or moderator)
 */
export async function deleteMessage(
  messageId: string,
  token: string | null
): Promise<void> {
  if (!token) throw new Error("Authentication required");

  const response = await fetch(`${API_BASE}/api/messages/${messageId}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(token),
    },
  });

  if (!response.ok) {
    const data = (await response.json()) as ApiError;
    throw new Error(data.detail || data.message || `Failed to delete message: ${response.status}`);
  }
}

/**
 * GET /api/messages/recent/?limit={n}
 * Get recent messages across all threads
 */
export async function getRecentMessages(
  limit: number = 20,
  token?: string | null
): Promise<Message[]> {
  const params = new URLSearchParams({
    limit: limit.toString(),
  });

  const response = await fetch(`${API_BASE}/api/messages/recent/?${params.toString()}`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(token),
    },
  });
  return handleResponse<Message[]>(response);
}

/**
 * GET /api/messages/poll/?since={timestamp}
 * Poll for new/updated messages since timestamp
 * Useful for real-time updates
 */
export async function pollNewMessages(
  since: string,
  token?: string | null
): Promise<Message[]> {
  const params = new URLSearchParams({
    since,
  });

  const response = await fetch(`${API_BASE}/api/messages/poll/?${params.toString()}`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(token),
    },
  });
  return handleResponse<Message[]>(response);
}

// ============================================================================
// VOTE ENDPOINTS
// ============================================================================

/**
 * POST /api/votes/toggle/
 * Toggle vote on a message (upvote/downvote)
 * Value: 1 for upvote, -1 for downvote
 * Same vote again removes the vote
 */
export async function toggleVote(
  messageId: string,
  value: 1 | -1,
  token: string | null
): Promise<VoteToggleResponse> {
  if (!token) throw new Error("Authentication required");

  const response = await fetch(`${API_BASE}/api/votes/toggle/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(token),
    },
    body: JSON.stringify({
      message_id: messageId,
      value,
    }),
  });
  return handleResponse<VoteToggleResponse>(response);
}

/**
 * GET /api/votes/for_message/?message_id={id}
 * Get vote status for a specific message
 */
export async function getVoteStatus(
  messageId: string,
  token?: string | null
): Promise<VoteStatusResponse> {
  const params = new URLSearchParams({
    message_id: messageId,
  });

  const response = await fetch(`${API_BASE}/api/votes/for_message/?${params.toString()}`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(token),
    },
  });
  return handleResponse<VoteStatusResponse>(response);
}

/**
 * GET /api/votes/my_votes/
 * Get all votes by current user
 */
export async function getMyVotes(token: string | null): Promise<any[]> {
  if (!token) throw new Error("Authentication required");

  const response = await fetch(`${API_BASE}/api/votes/my_votes/`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(token),
    },
  });
  return handleResponse<any[]>(response);
}

/**
 * GET /api/votes/
 * List all votes (with filters)
 */
export async function getVotes(token: string | null): Promise<any[]> {
  if (!token) throw new Error("Authentication required");

  const response = await fetch(`${API_BASE}/api/votes/`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(token),
    },
  });
  return handleResponse<any[]>(response);
}

/**
 * POST /api/votes/
 * Create a new vote
 */
export async function createVote(
  messageId: string,
  value: 1 | -1,
  token: string | null
): Promise<any> {
  if (!token) throw new Error("Authentication required");

  const response = await fetch(`${API_BASE}/api/votes/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(token),
    },
    body: JSON.stringify({
      message: messageId,
      value,
    }),
  });
  return handleResponse<any>(response);
}

/**
 * DELETE /api/votes/{id}/
 * Delete a vote
 */
export async function deleteVote(
  voteId: string,
  token: string | null
): Promise<void> {
  if (!token) throw new Error("Authentication required");

  const response = await fetch(`${API_BASE}/api/votes/${voteId}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(token),
    },
  });

  if (!response.ok) {
    const data = (await response.json()) as ApiError;
    throw new Error(data.detail || data.message || `Failed to delete vote: ${response.status}`);
  }
}
