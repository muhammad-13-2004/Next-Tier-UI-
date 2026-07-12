import { create } from "zustand";
import { api } from "@/services/api";
import {
  isOnboardingCompletedFromDashboard,
  isOnboardingCompletedFromUser,
  persistOnboardingCompleted,
} from "@/services/onboardingStatus";
import { useAuthStore } from "@/store/authStore";
import { useOnboardingStore } from "@/store/onboardingStore";

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

  loadDashboard: async ({ force = false } = {}) => {
    if (get().loading) return;
    if (get().hasLoaded && !force) return;

    set({ loading: true, error: null });

    try {
      const data = await api.getDashboard();

      const courses = Array.isArray(data?.courses)
        ? data.courses.map((course) => ({
            ...course,
            progress: course.progress_percentage ?? course.progress ?? 0,
          }))
        : [];

      set({
        profile: data?.profile ?? null,
        stats: data?.stats ?? initialStats,
        courses,
        loading: false,
        hasLoaded: true,
      });

      if (isOnboardingCompletedFromDashboard(data)) {
        useOnboardingStore.getState().setCompleted(true);

        const user = useAuthStore.getState().user;
        if (user && !isOnboardingCompletedFromUser(user)) {
          persistOnboardingCompleted(user)
            .then((updatedUser) => {
              useAuthStore.getState().setUser(updatedUser);
            })
            .catch(() => {});
        }
      }
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
