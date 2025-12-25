import { moduleApiCall } from "@settle/core";

export const moduleApi = {
  getChatMessages: async () => {
    return await moduleApiCall.getRecords({
      endpoint: "/api/messages/",
    });
  },

  getMessagesByProblem: async (problemId: string) => {
    return await moduleApiCall.getRecords({
      endpoint: "/api/messages/",
      params: { problem: problemId },
    });
  },

  getMessageById: async (id: string) => {
    return await moduleApiCall.getSingleRecord({
      endpoint: "/api/messages/",
      id,
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

  getSolutions: async () => {
    return await moduleApiCall.getRecords({
      endpoint: "/api/solutions/",
    });
  },

  getSolutionsByProblem: async (problemId: string) => {
    return await moduleApiCall.getRecords({
      endpoint: "/api/solutions/",
      params: { problem: problemId },
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
};

// Export individual functions for backwards compatibility
export const getChatMessages = moduleApi.getChatMessages;
export const getMessagesByProblem = moduleApi.getMessagesByProblem;
export const getMessageById = moduleApi.getMessageById;
export const deleteMessage = moduleApi.deleteMessage;
export const getSolutions = moduleApi.getSolutions;
export const getSolutionsByProblem = moduleApi.getSolutionsByProblem;
export const createMessage = moduleApi.createMessage;
export const updateMessage = moduleApi.updateMessage;
