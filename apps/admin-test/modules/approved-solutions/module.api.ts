import { moduleApiCall } from "@settle/core";

export const moduleApi = {
  getApprovedSolutions: async () => {
    return await moduleApiCall.getRecords({
      endpoint: "/api/solutions/",
    });
  },

  getApprovedSolutionById: async (id: string) => {
    return await moduleApiCall.getSingleRecord({
      endpoint: "/api/solutions/",
      id,
    });
  },

  getSolutionsByProblem: async (problemId: string) => {
    return await moduleApiCall.getRecords({
      endpoint: "/api/solutions/",
      params: { problem: problemId },
    });
  },

  approveSolution: async (messageId: string, data: any) => {
    return await moduleApiCall.createRecord({
      endpoint: "/api/solutions/",
      body: {
        original_message_id: messageId,
        ...data,
      },
    });
  },

  publishSolution: async (id: string) => {
    return await moduleApiCall.editRecord({
      endpoint: "/api/solutions/",
      id,
      body: {
        is_published: true,
      },
    });
  },

  unpublishSolution: async (id: string) => {
    return await moduleApiCall.editRecord({
      endpoint: "/api/solutions/",
      id,
      body: {
        is_published: false,
      },
    });
  },

  getTrendingSolutions: async () => {
    return await moduleApiCall.getRecords({
      endpoint: "/api/solutions/",
      params: { ordering: "-votes" },
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
};

// Export individual functions for backwards compatibility
export const getApprovedSolutions = moduleApi.getApprovedSolutions;
export const getApprovedSolutionById = moduleApi.getApprovedSolutionById;
export const getSolutionsByProblem = moduleApi.getSolutionsByProblem;
export const approveSolution = moduleApi.approveSolution;
export const publishSolution = moduleApi.publishSolution;
export const unpublishSolution = moduleApi.unpublishSolution;
export const getTrendingSolutions = moduleApi.getTrendingSolutions;
export const createSolution = moduleApi.createSolution;
export const updateSolution = moduleApi.updateSolution;
