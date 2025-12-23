import { demoAgendas } from "@/demoData/agenda";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

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
}

/**
 * Fetch all agendas/discussion threads
 * @returns Promise<Agenda[]>
 */
export async function getAgendas(): Promise<Agenda[]> {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const res = await fetch(`${API_BASE}/agendas`);
    // if (!res.ok) throw new Error(`Failed to fetch agendas: ${res.status}`);
    // return res.json();

    // Mock delay to simulate network request
    await new Promise((resolve) => setTimeout(resolve, 500));
    return demoAgendas;
  } catch (error) {
    console.error("Failed to fetch agendas:", error);
    throw error;
  }
}

/**
 * Fetch a single agenda by slug
 * @param slug - Agenda slug
 * @returns Promise<Agenda>
 */
export async function getAgendaBySlug(slug: string): Promise<Agenda> {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const res = await fetch(`${API_BASE}/agendas/${slug}`);
    // if (!res.ok) throw new Error(`Failed to fetch agenda: ${res.status}`);
    // return res.json();

    const agenda = demoAgendas.find((a) => a.slug === slug);
    if (!agenda) throw new Error(`Agenda not found: ${slug}`);

    // Mock delay to simulate network request
    await new Promise((resolve) => setTimeout(resolve, 500));
    return agenda;
  } catch (error) {
    console.error("Failed to fetch agenda by slug:", error);
    throw error;
  }
}
