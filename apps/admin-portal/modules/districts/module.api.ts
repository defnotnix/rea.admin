"use client";
import { moduleApiCall } from "@settle/core";

export const getDistricts = async (params?: any) => {
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
    endpoint: "/api/districts/",
    params: Object.keys(apiParams).length > 0 ? apiParams : undefined,
  });
};

export const getDistrictById = async (id: string) => {
  return await moduleApiCall.getSingleRecord({
    endpoint: "/api/districts/",
    id,
  });
};

export const createDistrict = async (data: any) => {
  return await moduleApiCall.createRecord({
    endpoint: "/api/districts/",
    body: data,
  });
};

export const updateDistrict = async (id: string, data: any) => {
  return await moduleApiCall.editRecord({
    endpoint: "/api/districts/",
    id,
    body: data,
  });
};

export const deleteDistrict = async (id: string) => {
  return await moduleApiCall.deleteRecord({
    endpoint: "/api/districts/",
    id,
  });
};
