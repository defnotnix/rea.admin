"use client";

import React from "react";
//next

//mantine
import {
  ActionIcon,
  Badge,
  Center,
  Container,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";

import Module from "module";
//vf
import { DataTableWrapper, moduleApiCall } from "@settle/core";

//icons

//styles

//components

function ModuleTable() {
  //context
  const { data, isLoading } = DataTableWrapper.useDataTableContext();

  // store

  const {
    search,
    filters,
    page,
    pageSize,
    setSearch,
    addFilter,
    removeFilter,
    resetSearch,
  } = DataTableWrapper.useDataTableWrapperStore((state: any) => state);

  if (isLoading) {
    return (
      <Center py={100}>
        <Loader size="xs" />
      </Center>
    );
  }

  return (
    <>
      <Container size="xs">
        <Stack gap={2} py="xl">
          <TextInput
            label="Search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            rightSection={
              <ActionIcon
                onClick={() => {
                  addFilter({
                    key: "name",
                    value: search,
                  });
                  resetSearch();
                }}
              >
                +
              </ActionIcon>
            }
          />
          Search {search}
          <Group gap="xs">
            {filters.map((filter: any, index: number) => {
              return (
                <Badge
                  key={index}
                  size="md"
                  rightSection={
                    <ActionIcon
                      onClick={() => {
                        removeFilter(index);
                      }}
                    >
                      X
                    </ActionIcon>
                  }
                >
                  {filter.key}: {filter.value}
                </Badge>
              );
            })}
          </Group>
          {data.map((datainfo: any, index: number) => {
            return (
              <Paper key={index} withBorder p="md">
                <Text size="xs">{datainfo.brand}</Text>
                <Text size="xl">{datainfo.title}</Text>
              </Paper>
            );
          })}
        </Stack>
      </Container>
    </>
  );
}

export function _List() {
  // * DEFINITIONS

  // * CONTEXT

  // * STATE

  // * FUNCTIONS

  // * COMPONENTS

  // * ANIMATIONS

  return (
    <>
      <DataTableWrapper
        testMode
        queryKey="general.list"
        queryGetFn={async () => {
          return await moduleApiCall.getRecords({
            endpoint: "/products",
          });
        }}
        // data Extraction
        dataKey="products"
        // Pagination
        paginationDataKey="pagination"
        paginationResponseFn={(response) => {
          return {
            pages: 10,
          };
        }}
        //server
        // enableServerQuery
      >
        <ModuleTable />
      </DataTableWrapper>
    </>
  );
}
