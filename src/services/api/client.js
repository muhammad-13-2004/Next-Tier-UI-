import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const apiClient = axios.create({
  baseURL: "https://oasrvhtgkgqelbhufuxa.supabase.co/functions/v1",
  timeout: 120000,
  headers: { "Content-Type": "application/json" },
});

// Attached token automatically on every request
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (!token) throw new Error("Missing auth token. Please login again.");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Centralised error handling
apiClient.interceptors.response.use(
  (res) => res.data,          
  (err) => {
    const message = err.response?.data?.error ?? err.message;
    return Promise.reject(new Error(message));
  }
);

export default apiClient;
