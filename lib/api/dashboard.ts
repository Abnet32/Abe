import api from "@/lib/axios";
import type { DashboardSummary } from "@/types";

export const getDashboardSummary = async (): Promise<DashboardSummary> => {
  const response = await api.get<DashboardSummary>("/orders/dashboard/summary");
  return response.data;
};
