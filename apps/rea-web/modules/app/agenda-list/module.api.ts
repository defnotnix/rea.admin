// API calls for agenda listing
import { demoAgendas } from "@/demoData/agenda";

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

export async function getAgendas(): Promise<Agenda[]> {
  // TODO: Replace with actual API call
  return demoAgendas;
}

export async function searchAgendas(query: string): Promise<Agenda[]> {
  const agendas = await getAgendas();
  const lowerQuery = query.toLowerCase();

  return agendas.filter(
    (agenda) =>
      agenda.title.toLowerCase().includes(lowerQuery) ||
      agenda.description.toLowerCase().includes(lowerQuery) ||
      agenda.problemStatement.toLowerCase().includes(lowerQuery)
  );
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
    avgDiscussionsPerAgenda: Math.round(totalDiscussions / agendas.length),
    avgParticipantsPerAgenda: Math.round(totalParticipants / agendas.length),
  };
}
