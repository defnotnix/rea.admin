// API calls for agenda listing
import { demoAgendas } from "@/demoData/agenda";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001";

// Backend response types
interface BackendAgenda {
  id: string;
  title: string;
  description?: string;
  problem_statement?: string;
  status?: string;
  type?: "nation" | "district";
  district?: string;
  view_count?: number;
  solution_count?: number;
  message_count?: number;
  created_at?: string;
  updated_at?: string;
  is_active?: boolean;
}

interface BackendResponse {
  results?: BackendAgenda[];
  data?: BackendAgenda[];
  agendas?: BackendAgenda[];
}

export interface Agenda {
  agendaId: string;
  title: string;
  slug: string;
  description: string;
  problemStatement: string;
  discussionCount: number;
  participantCount: number;
  upvoteCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  type: "nation" | "district";
  district?: string;
}

// Transform backend agenda to frontend format
function transformBackendAgenda(item: BackendAgenda): Agenda {
  return {
    agendaId: item.id || "",
    title: item.title || "Untitled",
    slug: item.title?.toLowerCase().replace(/\s+/g, "-") || "",
    description: item.description || "",
    problemStatement: item.problem_statement || item.description || "",
    discussionCount: item.message_count || 0,
    participantCount: item.solution_count || 0,
    upvoteCount: item.view_count || 0,
    isActive: item.is_active !== false && item.status !== "archived",
    createdAt: item.created_at ? new Date(item.created_at) : new Date(),
    updatedAt: item.updated_at ? new Date(item.updated_at) : new Date(),
    type: item.type || "nation",
    district: item.district,
  };
}

export async function getAgendas(): Promise<Agenda[]> {
  try {
    // Get authentication token
    const token = typeof window !== "undefined" ? sessionStorage.getItem("token") : null;

    const response = await fetch(`${API_BASE}/api/agendas/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      console.warn(`API returned ${response.status}, falling back to demo data`);
      return demoAgendas;
    }

    const data: BackendResponse = await response.json();

    // Extract agendas array from various possible response formats
    const agendas = data.results || data.data || data.agendas || [];

    if (!Array.isArray(agendas)) {
      console.warn("Unexpected API response format, using demo data");
      return demoAgendas;
    }

    // Transform backend format to frontend format
    return agendas.map(transformBackendAgenda);
  } catch (error) {
    console.error("Failed to fetch agendas from API:", error);
    // Fall back to demo data
    return demoAgendas;
  }
}

export async function getAgendaById(agendaId: string): Promise<Agenda | null> {
  try {
    const token = typeof window !== "undefined" ? sessionStorage.getItem("token") : null;

    const response = await fetch(`${API_BASE}/api/agendas/${agendaId}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      console.warn(`Failed to fetch agenda ${agendaId}`);
      return null;
    }

    const data: BackendAgenda = await response.json();
    return transformBackendAgenda(data);
  } catch (error) {
    console.error(`Failed to fetch agenda ${agendaId}:`, error);
    return null;
  }
}

export async function searchAgendas(query: string): Promise<Agenda[]> {
  try {
    const token = typeof window !== "undefined" ? sessionStorage.getItem("token") : null;

    const response = await fetch(
      `${API_BASE}/api/agendas/?search=${encodeURIComponent(query)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );

    if (!response.ok) {
      const agendas = await getAgendas();
      // Fallback to client-side search
      const lowerQuery = query.toLowerCase();
      return agendas.filter(
        (agenda) =>
          agenda.title.toLowerCase().includes(lowerQuery) ||
          agenda.description.toLowerCase().includes(lowerQuery) ||
          agenda.problemStatement.toLowerCase().includes(lowerQuery)
      );
    }

    const data: BackendResponse = await response.json();
    const agendas = data.results || data.data || data.agendas || [];

    if (!Array.isArray(agendas)) {
      return [];
    }

    return agendas.map(transformBackendAgenda);
  } catch (error) {
    console.error("Search API error:", error);
    const agendas = await getAgendas();
    // Fallback to client-side search
    const lowerQuery = query.toLowerCase();
    return agendas.filter(
      (agenda) =>
        agenda.title.toLowerCase().includes(lowerQuery) ||
        agenda.description.toLowerCase().includes(lowerQuery) ||
        agenda.problemStatement.toLowerCase().includes(lowerQuery)
    );
  }
}

export function getAgendaStats(agendas: Agenda[]) {
  const activeAgendas = agendas.filter((a) => a.isActive);
  const totalDiscussions = agendas.reduce((sum, a) => sum + a.discussionCount, 0);
  const totalParticipants = agendas.reduce((sum, a) => sum + a.participantCount, 0);
  const totalUpvotes = agendas.reduce((sum, a) => sum + a.upvoteCount, 0);

  return {
    totalAgendas: agendas.length,
    activeAgendas: activeAgendas.length,
    totalDiscussions,
    totalParticipants,
    totalUpvotes,
    avgDiscussionsPerAgenda: agendas.length > 0 ? Math.round(totalDiscussions / agendas.length) : 0,
    avgParticipantsPerAgenda: agendas.length > 0 ? Math.round(totalParticipants / agendas.length) : 0,
  };
}
