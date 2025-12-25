import { moduleApiCall } from "@settle/core";

export const moduleApi = {
  // Agenda endpoints
  getAgendas: async () => {
    return await moduleApiCall.getRecords({
      endpoint: "/api/agendas/",
    });
  },

  getAgendaById: async (id: string) => {
    return await moduleApiCall.getSingleRecord({
      endpoint: "/api/agendas/",
      id,
    });
  },

  createAgenda: async (data: any) => {
    return await moduleApiCall.createRecord({
      endpoint: "/api/agendas/",
      body: data,
    });
  },

  updateAgenda: async (id: string, data: any) => {
    return await moduleApiCall.editRecord({
      endpoint: "/api/agendas/",
      id,
      body: data,
    });
  },

  deleteAgenda: async (id: string) => {
    return await moduleApiCall.deleteRecord({
      endpoint: "/api/agendas/",
      id,
    });
  },

  // Agenda Status History
  getAgendaStatusHistory: async (agendaId: string) => {
    return await moduleApiCall.getRecords({
      endpoint: `/api/agendas/${agendaId}/status_history/`,
    });
  },

  // Chat Threads
  getThreadsByAgenda: async (agendaId: string) => {
    return await moduleApiCall.getRecords({
      endpoint: "/api/threads/by_agenda/",
      params: { agenda: agendaId },
    });
  },

  getThreadById: async (threadId: string) => {
    return await moduleApiCall.getSingleRecord({
      endpoint: "/api/threads/",
      id: threadId,
    });
  },

  createThread: async (data: any) => {
    return await moduleApiCall.createRecord({
      endpoint: "/api/threads/",
      body: data,
    });
  },

  // Messages / Chat
  getMessagesByThread: async (threadId: string) => {
    return await moduleApiCall.getRecords({
      endpoint: "/api/messages/",
      params: { thread: threadId },
    });
  },

  getMessageById: async (id: string) => {
    return await moduleApiCall.getSingleRecord({
      endpoint: "/api/messages/",
      id,
    });
  },

  createMessage: async (data: any) => {
    return await moduleApiCall.createRecord({
      endpoint: "/api/messages/",
      body: data,
    });
  },

  updateMessage: async (id: string, data: any) => {
    return await moduleApiCall.editRecord({
      endpoint: "/api/messages/",
      id,
      body: data,
    });
  },

  deleteMessage: async (id: string, deletedBy: string) => {
    return await moduleApiCall.editRecord({
      endpoint: "/api/messages/",
      id,
      body: {
        is_deleted: true,
        deleted_by: deletedBy,
      },
    });
  },

  // Votes
  getVotesForMessage: async (messageId: string) => {
    return await moduleApiCall.getRecords({
      endpoint: "/api/votes/for_message/",
      params: { message: messageId },
    });
  },

  toggleVote: async (data: any) => {
    return await moduleApiCall.createRecord({
      endpoint: "/api/votes/toggle/",
      body: data,
    });
  },

  // Solutions
  getSolutionsByAgenda: async (agendaId: string) => {
    return await moduleApiCall.getRecords({
      endpoint: "/api/solutions/",
      params: { agenda: agendaId },
    });
  },

  getSolutionById: async (id: string) => {
    return await moduleApiCall.getSingleRecord({
      endpoint: "/api/solutions/",
      id,
    });
  },

  createSolution: async (data: any) => {
    return await moduleApiCall.createRecord({
      endpoint: "/api/solutions/",
      body: data,
    });
  },

  updateSolution: async (id: string, data: any) => {
    return await moduleApiCall.editRecord({
      endpoint: "/api/solutions/",
      id,
      body: data,
    });
  },

  // Milestones
  getMilestonesBySolution: async (solutionId: string) => {
    return await moduleApiCall.getRecords({
      endpoint: "/api/milestones/",
      params: { solution: solutionId },
    });
  },

  createMilestone: async (data: any) => {
    return await moduleApiCall.createRecord({
      endpoint: "/api/milestones/",
      body: data,
    });
  },

  updateMilestone: async (id: string, data: any) => {
    return await moduleApiCall.editRecord({
      endpoint: "/api/milestones/",
      id,
      body: data,
    });
  },
};

// Export individual functions for backwards compatibility
export const getAgendas = moduleApi.getAgendas;
export const getAgendaById = moduleApi.getAgendaById;
export const createAgenda = moduleApi.createAgenda;
export const updateAgenda = moduleApi.updateAgenda;
export const deleteAgenda = moduleApi.deleteAgenda;
export const getAgendaStatusHistory = moduleApi.getAgendaStatusHistory;
export const getThreadsByAgenda = moduleApi.getThreadsByAgenda;
export const getThreadById = moduleApi.getThreadById;
export const createThread = moduleApi.createThread;
export const getMessagesByThread = moduleApi.getMessagesByThread;
export const getMessageById = moduleApi.getMessageById;
export const createMessage = moduleApi.createMessage;
export const updateMessage = moduleApi.updateMessage;
export const deleteMessage = moduleApi.deleteMessage;
export const getVotesForMessage = moduleApi.getVotesForMessage;
export const toggleVote = moduleApi.toggleVote;
export const getSolutionsByAgenda = moduleApi.getSolutionsByAgenda;
export const getSolutionById = moduleApi.getSolutionById;
export const createSolution = moduleApi.createSolution;
export const updateSolution = moduleApi.updateSolution;
export const getMilestonesBySolution = moduleApi.getMilestonesBySolution;
export const createMilestone = moduleApi.createMilestone;
export const updateMilestone = moduleApi.updateMilestone;
