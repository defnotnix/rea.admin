"use client";
import { moduleApiCall } from "@settle/core";

export const getUsers = async (params?: any) => {
  // Extract only the params the API expects
  const apiParams: any = {};

  if (params?.page) apiParams.page = params.page;
  if (params?.pageSize) apiParams.page_size = params.pageSize;
  if (params?.search) apiParams.search = params.search;
  if (params?.filters && Array.isArray(params.filters) && params.filters.length > 0) {
    // Process filters if needed
    params.filters.forEach((filter: any) => {
      if (filter.value) {
        apiParams[filter.field || filter.label] = filter.value;
      }
    });
  }

  return await moduleApiCall.getRecords({
    endpoint: "/api/users/",
    params: Object.keys(apiParams).length > 0 ? apiParams : undefined,
  });
};

export const getUserById = async (id: string | number) => {
  return await moduleApiCall.getSingleRecord({
    endpoint: "/api/users/",
    id: String(id),
  });
};

export const createUser = async (data: any) => {
  return await moduleApiCall.createRecord({
    endpoint: "/api/users/",
    body: data,
  });
};

export const updateUser = async (id: string | number, data: any) => {
  return await moduleApiCall.editRecord({
    endpoint: "/api/users/",
    id: String(id),
    body: data,
  });
};

export const deleteUser = async (id: string | number) => {
  return await moduleApiCall.deleteRecord({
    endpoint: "/api/users/",
    id: String(id),
  });
};

export const getModeratorsByDistrict = async (districtId: string) => {
  return await moduleApiCall.getRecords({
    endpoint: "/api/users/",
    params: { district: districtId, role: "moderator" },
  });
};
