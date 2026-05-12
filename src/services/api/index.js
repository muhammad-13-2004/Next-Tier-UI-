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
  getCoursebyId:   (courseId) => apiClient.get(`/get-coursebyId/${courseId}`),

  // Lessons
  generateContent:   (payload) => apiClient.post("/generate-content", payload),
  generateQuiz:      (payload) => apiClient.post("/generate-quiz", payload),
  // generateChallenge: (lessonId) => apiClient.post(`/lessons/${lessonId}/generate-challenge`),
  completeLesson:    (payload) => apiClient.post("/complete-lesson", payload),

  // AI Tutor
  tutorChat:    (payload)  => apiClient.post("/ai-tutor",payload),

};
