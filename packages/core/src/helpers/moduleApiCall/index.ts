import { apiDispatch } from "@vframework/core";

async function getRecords({
  endpoint,
  paginationProps = {},
  params = {},
}: {
  endpoint: string;
  paginationProps?: any;
  params?: any;
}): Promise<any> {
  const res: any = await apiDispatch.get({
    endpoint,
    params: {
      ...paginationProps,
      ...params,
    },
  });

  return res.err ? [] : res.data;
}

async function getSingleRecord() {}

async function editRecord() {}

async function deleteRecord() {}

async function createRecoed() {}

async function createGroupRecords() {}

export const moduleApiCall = {
  getRecords,
};
