import { useQuery } from "@tanstack/react-query";

import { QueryKeys } from "@/types/api-types";

import { fetchHomeSummary } from "../api/home-api";

export const homeKeys = {
  all: [QueryKeys.HOME] as const,
  summary: () => [...homeKeys.all, "summary"] as const,
};

export const useHomeSummaryQuery = () => {
  return useQuery({
    queryKey: homeKeys.summary(),
    queryFn: fetchHomeSummary,
    select: (data) => data.data,
  });
};
