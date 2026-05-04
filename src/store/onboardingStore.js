import { create } from "zustand";
import { api } from "@/services/api";
import { useAuthStore } from "@/store/authStore";

const GOAL_MAP = {
  internship: "get an internship",
  portfolio: "build a portfolio",
  fun: "explore for fun",
  career: "switch career path",
};

const VIBE_TO_COMPLEXITY = {
  beginner: "beginner",
  some: "intermediate",
  ready: "advanced",
};

const TIME_MAP = {
  "2h": "2h/week",
  "5h": "5h/week",
  "8h": "8h+/week",
};

const LEARNING_STYLE_MAP = {
  reading: "reading",
  ai: "ai-guided",
  projects: "project-based",
};

const getRecommendationsArray = (response) => {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.recommendations)) return response.recommendations;
  if (Array.isArray(response?.courses)) return response.courses;
  if (Array.isArray(response?.data)) return response.data;
  return [];
};

const normalizeRecommendations = (response) => {
  const data = getRecommendationsArray(response);

  return data.map((item, index) => ({
    id: item?.slug || `${item?.title || "course"}-${index}`,
    title: item?.title || "Untitled Path",
    short_description: item?.short_description || "",
    duration: item?.duration || "",
    demand: item?.demand || "",
    complexity: item?.complexity || "",
    slug: item?.slug || "",
  }));
};

const buildRecommendPayload = (preferences, userId) => ({
  interests: preferences.interests || [],
  learning_style: (preferences.learnStyle || []).map(
    (style) => LEARNING_STYLE_MAP[style] || style,
  ),
  time_commitment: TIME_MAP[preferences.weeklyTime] || preferences.weeklyTime || "",
  goal: GOAL_MAP[preferences.goal] || preferences.goal || "",
  user_id: userId,
  current_level: VIBE_TO_COMPLEXITY[preferences.vibe] || preferences.vibe,
});

export const useOnboardingStore = create((set) => ({
  recommendations: [],
  status: "idle",
  error: null,

  resetRecommendations: () =>
    set({ recommendations: [], status: "idle", error: null }),

  fetchRecommendations: async (preferences) => {
    set({ status: "loading", error: null });

    try {
      const { user, accessToken } = useAuthStore.getState();

      if (!user?.id) {
        throw new Error("User is not logged in.");
      }

      const payload = buildRecommendPayload(preferences, user.id);
      const response = await api.recommendCourses(payload, accessToken);

      set({
        recommendations: normalizeRecommendations(response),
        status: "success",
        error: null,
      });
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Unable to fetch recommendations right now.";

      set({ status: "error", error: message, recommendations: [] });
    }
  },
}));
