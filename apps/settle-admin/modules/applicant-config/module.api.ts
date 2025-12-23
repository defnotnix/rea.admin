import { moduleApiCall } from "@settle/core";

const API_ENDPOINT = "/api/categories/";

const getApplicantConfigs = async (params: any = {}) => {
  try {
    const data = await moduleApiCall.getRecords({
      endpoint: API_ENDPOINT,
      params,
    });
    return data;
  } catch (error) {
    console.error("Error fetching applicant configs:", error);
    return { data: [] };
  }
};

const getSingleApplicantConfig = async (id: string | number) => {
  try {
    const data = await moduleApiCall.getSingleRecord({
      endpoint: API_ENDPOINT,
      id,
    });
    return data;
  } catch (error) {
    console.error("Error fetching applicant config:", error);
    throw error;
  }
};

const createApplicantConfig = async (body: any) => {
  try {
    const data = await moduleApiCall.createRecord({
      endpoint: API_ENDPOINT,
      body,
    });
    return data;
  } catch (error) {
    console.error("Error creating applicant config:", error);
    throw error;
  }
};

const updateApplicantConfig = async (id: string | number, body: any) => {
  try {
    const data = await moduleApiCall.editRecord({
      endpoint: API_ENDPOINT,
      id,
      body,
    });
    return data;
  } catch (error) {
    console.error("Error updating applicant config:", error);
    throw error;
  }
};

const deleteApplicantConfig = async (id: string | number) => {
  try {
    const success = await moduleApiCall.deleteRecord({
      endpoint: API_ENDPOINT,
      id,
    });
    return success;
  } catch (error) {
    console.error("Error deleting applicant config:", error);
    throw error;
  }
};

export {
  getApplicantConfigs,
  getSingleApplicantConfig,
  createApplicantConfig,
  updateApplicantConfig,
  deleteApplicantConfig,
};
