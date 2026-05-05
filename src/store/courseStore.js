import { create } from "zustand";
import { api } from "@/services/api";

export const useCourseStore = create((set) => ({

  courses:       [],   // all user roadmaps (for My Roadmaps tab)
  activeCourse:  null, // currently open roadmap detail
  generating:    false,
  loading:       false,
  error:         null,

  // Called after user picks a recommended course OR enters a custom prompt
  // recommendation mode: generateRoadmap({ mode: "recommendation", input: { title, complexity, goal, time_commitment } })
  // prompt mode:         generateRoadmap({ mode: "prompt", input: { prompt, complexity, goal, time_commitment } })
  generateRoadmap: async (payload) => {
    set({ generating: true, error: null });
    try {
      const course = await api.generateRoadmap(payload);
      set((state) => ({
        courses:      [course, ...state.courses],
        activeCourse: course,
        generating:   false,
      }));
      return course;
    } catch (err) {
      set({ error: err.message, generating: false });
      throw err;
    }
  },

  // Called when user opens a roadmap from My Roadmaps
  loadCourse: async (courseId) => {
    set({ loading: true, error: null });
    try {
      const course = await api.getCourse(courseId);
      set({ activeCourse: course, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  clearActive: () => set({ activeCourse: null }),
}));
