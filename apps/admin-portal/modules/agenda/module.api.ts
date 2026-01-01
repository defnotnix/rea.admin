import { moduleApiCall } from "@settle/core";
import axios from "axios";

export const moduleApi = {
  // Agenda endpoints
  getAgendas: async (params?: any) => {
    // Extract only the params the API expects
    const apiParams: any = {};

    if (params?.page) apiParams.page = params.page;
    if (params?.pageSize) apiParams.page_size = params.pageSize;
    if (params?.search) apiParams.search = params.search;
    if (params?.status) apiParams.status = params.status;
    if (
      params?.filters &&
      Array.isArray(params.filters) &&
      params.filters.length > 0
    ) {
      // Process filters if needed
      params.filters.forEach((filter: any) => {
        if (filter.value) {
          apiParams[filter.field || filter.label] = filter.value;
        }
      });
    }

    return await moduleApiCall.getRecords({
      endpoint: "/api/agendas/",
      params: Object.keys(apiParams).length > 0 ? apiParams : undefined,
    });
  },

  getAgendaById: async (id: string | number) => {
    return await moduleApiCall.getSingleRecord({
      endpoint: "/api/agendas/",
      id: String(id),
    });
  },

  createAgenda: async (data: any) => {
    return await moduleApiCall.createRecord({
      endpoint: "/api/agendas/",
      body: data,
    });
  },

  updateAgenda: async (id: string | number, data: any) => {
    return await moduleApiCall.editRecord({
      endpoint: "/api/agendas/",
      id: String(id),
      body: data,
    });
  },

  deleteAgenda: async (id: string | number) => {
    return await moduleApiCall.deleteRecord({
      endpoint: "/api/agendas/",
      id: String(id),
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
    const res = await axios.get(
      `/api/threads/by_agenda/?agenda_id=${agendaId}`
    ); // TODO: Replace with moduleApiCall
    console.log(res);
    return res.data;
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

  updateThread: async (id: string, data: any) => {
    return await moduleApiCall.editRecord({
      endpoint: "/api/threads/",
      id,
      body: data,
    });
  },

  deleteThread: async (id: string) => {
    return await moduleApiCall.deleteRecord({
      endpoint: "/api/threads/",
      id,
    });
  },

  // Messages / Chat
  getMessagesByThread: async (threadId: string, params?: any) => {
    const apiParams: any = { thread: threadId };

    if (params?.page) apiParams.page = params.page;
    if (params?.page_size) apiParams.page_size = params.page_size;

    return await moduleApiCall.getRecords({
      endpoint: "/api/messages/",
      params: apiParams,
    });
  },

  getMessageById: async (id: string) => {
    return await moduleApiCall.getSingleRecord({
      endpoint: "/api/messages/",
      id,
    });
  },

  createMessage: async (data: any) => {
    console.log("Creating message with data:", data);
    try {
      const result = await moduleApiCall.createRecord({
        endpoint: "/api/messages/",
        body: data,
      });
      console.log("Message created, API response:", result);
      return result;
    } catch (err: any) {
      console.error("Error from API while creating message:", err);
      throw err;
    }
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
      params: { message_id: messageId },
    });
  },

  toggleVote: async (data: any) => {
    return await moduleApiCall.createRecord({
      endpoint: "/api/votes/toggle/",
      body: data,
    });
  },

  // Solutions
  getSolutionsByAgenda: async (agendaId: string, params?: any) => {
    return await moduleApiCall.getRecords({
      endpoint: "/api/solutions/",
      params: { agenda_id: agendaId, ...params },
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
      params: { solution_id: solutionId },
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
export const updateThread = moduleApi.updateThread;
export const deleteThread = moduleApi.deleteThread;
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
