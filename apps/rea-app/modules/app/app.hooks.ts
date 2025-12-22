"use client";

import { useQuery } from "@tanstack/react-query";
import { getAgendas, getAgendaBySlug, Agenda } from "./app.api";

/**
 * Hook to fetch all agendas with TanStack Query
 * @returns Query result with agendas data, loading, and error states
 */
export function useAgendas() {
  return useQuery({
    queryKey: ["agendas"],
    queryFn: getAgendas,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
}

/**
 * Hook to fetch a single agenda by slug with TanStack Query
 * @param slug - Agenda slug
 * @returns Query result with agenda data, loading, and error states
 */
export function useAgendaBySlug(slug: string | null) {
  return useQuery({
    queryKey: ["agendas", slug],
    queryFn: () => getAgendaBySlug(slug!),
    enabled: !!slug, // Only run query if slug is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
}
