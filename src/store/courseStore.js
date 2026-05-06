import { create } from "zustand";
import { api } from "@/services/api";

const normalizeCourse = (payload) => {
  if (!payload) return null;

  const base = payload.roadmap ?? payload;
  const slug = base.slug ?? base.id;

  if (!base || !slug) return null;

  return {
    ...base,
    slug,
    course_id: payload.course_id ?? base.course_id ?? base.courseId ?? null,
  };
};

const extractCourseList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.courses)) return payload.courses;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

export const useCourseStore = create((set) => ({

  courses:       [],   // all user roadmaps (for My Roadmaps tab)
  activeCourse:  null, // currently open roadmap detail
  generating:    false,
  loading:       false,
  error:         null,

  loadCourses: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.browseCourses();
      const rawCourses = extractCourseList(response);
      const normalized = rawCourses.map(normalizeCourse).filter(Boolean);
      set({ courses: normalized, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Called after user picks a recommended course OR enters a custom prompt
  // recommendation mode: generateRoadmap({ mode: "recommendation", input: { title, complexity, goal, time_commitment } })
  // prompt mode:         generateRoadmap({ mode: "prompt", input: { prompt, complexity, goal, time_commitment } })
  generateRoadmap: async (payload) => {
    set({ generating: true, error: null });
    try {
      const response = await api.generateRoadmap(payload);
      const course = normalizeCourse(response);

      if (!course) throw new Error("Invalid roadmap response.");

      set((state) => ({
        courses: [course, ...state.courses.filter((c) => c.slug !== course.slug)],
        activeCourse: course,
        generating: false,
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
      const response = await api.getCourse(courseId);
      const course = normalizeCourse(response);
      if (!course) throw new Error("Invalid course response.");
      set({ activeCourse: course, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  clearActive: () => set({ activeCourse: null }),
}));
