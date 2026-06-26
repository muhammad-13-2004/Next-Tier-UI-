import { create } from "zustand";
import { api } from "@/services/api";

const normalizeStatus = (status) => {
  if (!status) return "saved";
  return String(status).toLowerCase().replace(/_/g, "-");
};

const normalizeModuleStatus = (status) => {
  const normalized = String(status ?? "").toLowerCase().replace(/_/g, "-");
  if (normalized === "completed") return "completed";
  if (normalized === "in-progress") return "in-progress";
  if (normalized === "not-started") return "not-started";
  return "locked";
};

const pickText = (...values) => {
  for (const value of values) {
    if (typeof value === "string" && value.trim().length > 0) return value;
  }
  return "";
};

const formatMinutes = (value) => {
  const minutes = Number(value);
  if (!Number.isFinite(minutes) || minutes <= 0) return "0m";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
};

const normalizeLesson = (lesson, index) => ({
  ...lesson,
  id: lesson?.id ?? `lesson-${index + 1}`,
  position: lesson?.position ?? index + 1,
  status: normalizeModuleStatus(lesson?.status),
  subtitle: pickText(
    lesson?.subtitle,
    lesson?.short_description,
    lesson?.shortDescription,
    lesson?.description
  ),
});

const normalizeModule = (module, index) => {
  const lessons = Array.isArray(module?.lessons) ? module.lessons : [];
  return {
    ...module,
    id: module?.id ?? `module-${index + 1}`,
    title: module?.title ?? `Module ${index + 1}`,
    subtitle: pickText(
      module?.subtitle,
      module?.short_description,
      module?.shortDescription,
      module?.description
    ),
    status: normalizeModuleStatus(module?.status),
    position: module?.position ?? index + 1,
    xp: Number(module?.xp ?? module?.xp_reward ?? 0),
    time: module?.time ?? formatMinutes(module?.estimated_minutes),
    lessons: lessons
      .map(normalizeLesson)
      .sort((a, b) => Number(a?.position ?? 0) - Number(b?.position ?? 0)),
  };
};

const normalizeCourse = (payload) => {
  if (!payload) return null;

  const base = payload.roadmap ?? payload.course ?? payload;
  const id = base.id ?? base.course_id ?? base.courseId;
  const slug = base.slug ?? (id != null ? String(id) : null);

  if (!base || !slug) return null;

  const rawModules = Array.isArray(base.modules)
    ? base.modules
    : Array.isArray(payload?.modules)
    ? payload.modules
    : [];
  const modules = rawModules
    .map(normalizeModule)
    .sort((a, b) => Number(a?.position ?? 0) - Number(b?.position ?? 0));
  const totalModules = base.total_modules ?? modules.length ?? 0;
  const completedModules =
    base.completed_modules ??
    modules.filter((m) => m?.status === "completed").length ??
    0;

  return {
    ...base,
    id: id ?? slug,
    slug,
    status: normalizeStatus(base.status),
    subtitle: pickText(
      base?.subtitle,
      base?.short_description,
      base?.shortDescription,
      base?.description
    ),
    progress: Number(base.progress ?? 0),
    total_modules: totalModules,
    completed_modules: completedModules,
    modules,
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
      const response = await api.getCourses();
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
      const response = await api.getCoursebyId(courseId);
      const course = normalizeCourse(response);
      if (!course) throw new Error("Invalid course response.");
      set((state) => ({
        activeCourse: course,
        courses: [
          course,
          ...state.courses.filter((c) => String(c.slug) !== String(course.slug)),
        ],
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  clearActive: () => set({ activeCourse: null }),
}));
