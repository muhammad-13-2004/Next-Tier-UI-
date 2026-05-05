import { useDashboardStore } from "@/store/dashboardStore";

export function useDashboard() {
  const store = useDashboardStore();

  return {
    ...store,
  };
}
