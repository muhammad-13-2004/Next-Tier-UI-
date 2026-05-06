import { create } from "zustand";
import { api } from "@/services/api";

const initialStats = {
  total_courses: 0,
  active_courses: 0,
  completed_courses: 0,
};

export const useDashboardStore = create((set, get) => ({
  profile: null,
  stats: initialStats,
  courses: [],
  loading: false,
  error: null,
  hasLoaded: false,

  loadDashboard: async () => {
    if (get().loading) return;

    set({ loading: true, error: null });

    try {
      const data = await api.getDashboard();

      set({
        profile: data?.profile ?? null,
        stats: data?.stats ?? initialStats,
        courses: Array.isArray(data?.courses) ? data.courses : [],
        loading: false,
        hasLoaded: true,
      });
    } catch (err) {
      set({
        error: err.message,
        loading: false,
        hasLoaded: true,
      });
    }
  },

  resetDashboard: () =>
    set({
      profile: null,
      stats: initialStats,
      courses: [],
      loading: false,
      error: null,
      hasLoaded: false,
    }),
}));
