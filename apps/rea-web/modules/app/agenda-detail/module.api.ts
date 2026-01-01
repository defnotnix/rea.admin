import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

export const getAgendaById = async (id: string | number) => {
  if (!id) {
    throw new Error("No agenda ID provided");
  }

  try {
    const response = await axios.get(`${API_BASE}/api/agendas/${id}/`);
    return response.data;
  } catch (error: any) {
    console.error(`Failed to fetch agenda ${id}:`, error);
    throw new Error(
      error?.response?.data?.detail ||
        error?.message ||
        "Failed to fetch agenda"
    );
  }
};

export const getThreadsByAgenda = async (agendaId: string) => {
  try {
    const response = await axios.get(`${API_BASE}/api/threads/by_agenda/`, {
      params: { agenda_id: agendaId },
    });
    return response.data;
  } catch (error: any) {
    console.error(`Failed to fetch threads for agenda ${agendaId}:`, error);
    throw new Error(
      error?.response?.data?.detail ||
        error?.message ||
        "Failed to fetch threads"
    );
  }
};

export const getSolutionsByAgenda = async (agendaId: string, params?: any) => {
  try {
    const response = await axios.get(`${API_BASE}/api/solutions/`, {
      params: { agenda_id: agendaId, ...params },
    });
    return response.data;
  } catch (error: any) {
    console.error(`Failed to fetch solutions for agenda ${agendaId}:`, error);
    throw new Error(
      error?.response?.data?.detail ||
        error?.message ||
        "Failed to fetch solutions"
    );
  }
};

export const getMessagesByThread = async (threadId: string, params?: any) => {
  const apiParams: any = { thread: threadId };

  if (params?.page) apiParams.page = params.page;
  if (params?.page_size) apiParams.page_size = params.page_size;

  try {
    const response = await axios.get(`${API_BASE}/api/messages/`, {
      params: apiParams,
    });
    return response.data;
  } catch (error: any) {
    console.error(`Failed to fetch messages for thread ${threadId}:`, error);
    throw new Error(
      error?.response?.data?.detail ||
        error?.message ||
        "Failed to fetch messages"
    );
  }
};

export const createMessage = async (data: any) => {
  try {
    const response = await axios.post(`${API_BASE}/api/messages/`, data);
    return response.data;
  } catch (error: any) {
    console.error("Failed to create message:", error);
    throw new Error(
      error?.response?.data?.detail ||
        error?.message ||
        "Failed to send message"
    );
  }
};

export const toggleVote = async (data: any) => {
  const response = await axios.post(`${API_BASE}/api/votes/toggle/`, data);
  return response.data;
};

export const getThreadById = async (threadId: string) => {
  const response = await axios.get(`${API_BASE}/api/threads/${threadId}/`);
  return response.data;
};

export const createThread = async (data: any) => {
  const response = await axios.post(`${API_BASE}/api/threads/`, data);
  return response.data;
};

export const updateThread = async (id: string, data: any) => {
  const response = await axios.patch(`${API_BASE}/api/threads/${id}/`, data);
  return response.data;
};

export const deleteThread = async (id: string) => {
  const response = await axios.delete(`${API_BASE}/api/threads/${id}/`);
  return response.data;
};

export const deleteMessage = async (id: string, deletedBy: string) => {
  const response = await axios.patch(`${API_BASE}/api/messages/${id}/`, {
    is_deleted: true,
    deleted_by: deletedBy,
  });
  return response.data;
};

export const createSolution = async (data: any) => {
  const response = await axios.post(`${API_BASE}/api/solutions/`, data);
  return response.data;
};

export const updateSolution = async (id: string, data: any) => {
  const response = await axios.patch(`${API_BASE}/api/solutions/${id}/`, data);
  return response.data;
};

export const getSolutionById = async (id: string) => {
  const response = await axios.get(`${API_BASE}/api/solutions/${id}/`);
  return response.data;
};

export const getMilestonesBySolution = async (solutionId: string) => {
  const response = await axios.get(`${API_BASE}/api/milestones/`, {
    params: { solution_id: solutionId },
  });
  return response.data;
};

export const createMilestone = async (data: any) => {
  const response = await axios.post(`${API_BASE}/api/milestones/`, data);
  return response.data;
};

export const updateMilestone = async (id: string, data: any) => {
  const response = await axios.patch(`${API_BASE}/api/milestones/${id}/`, data);
  return response.data;
};
