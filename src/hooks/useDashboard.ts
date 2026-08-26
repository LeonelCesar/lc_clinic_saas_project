import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "../services/dashboard.service";

export const dashboardQueryKeys = {
  all: ["dashboard"] as const,

  overview: () =>
    [...dashboardQueryKeys.all, "overview"] as const,
};

export function useDashboard() {
  return useQuery({
    queryKey:
      dashboardQueryKeys.overview(),

    queryFn: () =>
      getDashboardData(),

    staleTime: 30_000,

    refetchOnWindowFocus: false,
  });
}