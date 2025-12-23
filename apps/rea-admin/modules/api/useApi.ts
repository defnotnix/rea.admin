import { useQuery, useMutation, UseQueryResult, UseMutationResult } from "@tanstack/react-query";
import { apiClient } from "./apiClient";

interface UseApiOptions {
  enabled?: boolean;
  retry?: boolean | number;
  cacheTime?: number;
  staleTime?: number;
}

/**
 * Hook for fetching data
 */
export const useApiQuery = <T,>(
  key: (string | number | boolean | unknown)[],
  url: string,
  options?: UseApiOptions
): UseQueryResult<T, Error> => {
  return useQuery<T, Error>({
    queryKey: key,
    queryFn: () => apiClient.get<T>(url),
    ...options,
  });
};

/**
 * Hook for creating data
 */
export const useApiCreate = <T, D = any>(
  mutationKey?: (string | number)[]
): UseMutationResult<T, Error, D> => {
  return useMutation<T, Error, D>();
};

/**
 * Hook for updating data
 */
export const useApiUpdate = <T, D = any>(
  mutationKey?: (string | number)[]
): UseMutationResult<T, Error, D> => {
  return useMutation<T, Error, D>();
};

/**
 * Hook for deleting data
 */
export const useApiDelete = <T, D = any>(
  mutationKey?: (string | number)[]
): UseMutationResult<T, Error, D> => {
  return useMutation<T, Error, D>();
};
