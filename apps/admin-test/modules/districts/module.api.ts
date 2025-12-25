"use client";
import { moduleApiCall } from "@settle/core";

export const getDistricts = async () => {
  return await moduleApiCall.getRecords({
    endpoint: "/api/districts/",
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
