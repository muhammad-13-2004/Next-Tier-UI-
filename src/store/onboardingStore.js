import { create } from "zustand";
import { api } from "@/services/api";

export const useOnboardingStore = create((set, get) => ({

  // Step data collected across 3 screens
  interests:       [],
  learningStyles:  [],
  timeCommitment:  null,
  goal:            null,

  // Recommendation state
  recommendations: [],
  loading:         false,
  error:           null,

  setInterests:      (v) => set({ interests: v }),
  setLearningStyles: (v) => set({ learningStyles: v }),
  setTimeCommitment: (v) => set({ timeCommitment: v }),
  setGoal:           (v) => set({ goal: v }),
  setLoading:        (v) => set({ loading: v }),
  setError:          (v) => set({ error: v }),


  // recommendCourses 
  submitAndRecommend: async (userId) => {
    const { interests, learningStyles, timeCommitment, goal } = get();
    set({ loading: true, error: null });
    try {
      const data = await api.recommendCourses({
        user_id: userId,
        interests,
        learning_styles: learningStyles,
        time_commitment: timeCommitment,
        goal,
      });
      set({ recommendations: data.recommendations, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Saves preferences
  confirmAndSave: async (userId) => {
    const { interests, learningStyles, timeCommitment, goal } = get();
    await api.savePreferences({
      user_id: userId,
      interests,
      learning_styles: learningStyles,
      time_commitment: timeCommitment,
      goal,
      onboarding_completed: true,
    });
  },

  skip: async (userId) => {
    await api.savePreferences({
      user_id: userId,
      interests: null,
      learning_styles: null,
      time_commitment: null,
      goal: null,
      onboarding_completed: false,
    });
  },

  reset: () => set({
    interests: [], learningStyles: [], timeCommitment: null,
    goal: null, recommendations: [], loading: false, error: null,
  }),
}));
