import { apiPost } from "./client";

const API_ENDPOINTS = {
  recommendCourses: "/recommend-courses",
  savePreferences: "/save-preferences",
  getDashboard: "/get-dashboard",
  aiTutor: "/ai-tutor",
  generateContent: "/generate-content",
  generateQuiz: "/generate-quiz",
  generateRoadmap: "/generate-roadmap",
};

export const api = {
  recommendCourses: (payload, token) =>
    apiPost(API_ENDPOINTS.recommendCourses, payload, token),

  savePreferences: (payload, token) =>
    apiPost(API_ENDPOINTS.savePreferences, payload, token),

  getDashboard: (payload, token) =>
    apiPost(API_ENDPOINTS.getDashboard, payload, token),
};

export default api;
