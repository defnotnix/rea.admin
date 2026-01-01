export interface Agenda {
  id: string;
  title: string;
  description?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
  created_by?: { id: string; name: string };
  [key: string]: any;
}

export interface Thread {
  id: string;
  title?: string;
  agenda?: string;
  agenda_title?: string;
  message_count?: number;
  created_by?: string;
  created_at?: string;
  [key: string]: any;
}

export interface Solution {
  id: string;
  title: string;
  summary?: string;
  description?: string;
  status?: string;
  priority?: string;
  estimated_budget?: string | number;
  feasibility_score?: number;
  support_count?: number;
  is_featured?: boolean;
  proposed_by_name?: string;
  agenda_title?: string;
  created_at?: string;
  [key: string]: any;
}

export interface VotingHistoryEntry {
  id: string;
  solution_id: string;
  user_id: string;
  vote_type: "support" | "oppose";
  created_at: string;
  [key: string]: any;
}

export interface MessageAuthor {
  id: string;
  email: string;
  full_name: string;
  district?: string;
  district_name?: string;
  profession?: string;
  is_verified: boolean;
  is_moderator: boolean;
  [key: string]: any;
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
  created_at: string;
  updated_at: string;
  [key: string]: any;
}

export interface Milestone {
  id: string;
  solution: string;
  title: string;
  description?: string;
  due_date?: string;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  completed_at?: string;
  created_at: string;
  updated_at: string;
  [key: string]: any;
}
