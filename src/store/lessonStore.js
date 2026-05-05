import { create } from "zustand";
import { api } from "@/services/api";

// Lesson store manages the three lazy-loaded layers.
// Content loads on lesson open.
// Quiz and challenge load only when tab is clicked.

export const useLessonStore = create((set, get) => ({

  activeLesson: null,
  content:      null,
  quiz:         null,
  challenge:    null,

  contentLoading:   false,
  quizLoading:      false,
  challengeLoading: false,
  error:            null,

  openLesson: (lesson) => {
    // Reset previous lesson data when opening a new one
    set({ activeLesson: lesson, content: null, quiz: null, challenge: null });
  },

  // Called automatically when lesson screen mounts
  loadContent: async (lessonId) => {
    if (get().content) return; // already loaded
    set({ contentLoading: true });
    try {
      const data = await api.getContent(lessonId);
      set({ content: data.content, contentLoading: false });
    } catch (err) {
      set({ error: err.message, contentLoading: false });
    }
  },

  // Called when user clicks Quiz tab — not before
  loadQuiz: async (lessonId) => {
    if (get().quiz) return;
    set({ quizLoading: true });
    try {
      const data = await api.getQuiz(lessonId);
      set({ quiz: data.quiz, quizLoading: false });
    } catch (err) {
      set({ error: err.message, quizLoading: false });
    }
  },

  // Called when user clicks Challenge tab — not before
  loadChallenge: async (lessonId) => {
    if (get().challenge) return;
    set({ challengeLoading: true });
    try {
      const data = await api.getChallenge(lessonId);
      set({ challenge: data.challenge, challengeLoading: false });
    } catch (err) {
      set({ error: err.message, challengeLoading: false });
    }
  },

  completeLesson: async (lessonId, payload) => {
    const result = await api.complete(lessonId, payload);
    return result; // { new_xp, new_streak, module_unlocked, course_complete }
  },

  reset: () => set({ activeLesson: null, content: null, quiz: null, challenge: null }),
}));