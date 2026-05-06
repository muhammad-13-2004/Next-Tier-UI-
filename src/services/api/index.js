import apiClient from "./client";

export const api = {

  // Onboarding
  recommendCourses: (payload) => apiClient.post("/recommend-courses", payload),
  savePreferences:  (payload) => apiClient.post("/save-preferences",  payload),
  skipOnboarding:   (payload) => apiClient.post("/skip-onboarding",   payload),

  // Dashboard
  getDashboard: () => apiClient.get("/get-dashboard"),

  // Courses
  generateRoadmap: (payload) => apiClient.post("/generate-roadmap", payload),
  getCourses:       () => apiClient.get(`/courses`),
  getCoursebyId:   (courseId) => apiClient.get(`/courses/${courseId}`),
  // browseCourses:   (params)   => apiClient.get("/browse-courses", { params }),

  // Lessons
  generateContent:   (lessonId) => apiClient.post(`/lessons/${lessonId}/generate-content`),
  generateQuiz:      (lessonId) => apiClient.post(`/lessons/${lessonId}/generate-quiz`),
  generateChallenge: (lessonId) => apiClient.post(`/lessons/${lessonId}/generate-challenge`),
  completeLesson:    (lessonId, payload) => apiClient.post(`/lessons/${lessonId}/complete`, payload),

  // AI Tutor
  tutorChat:    (payload)  => apiClient.post("/ai-tutor",payload),

};