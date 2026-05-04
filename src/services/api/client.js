import axios from "axios";

const API_BASE_URL = "https://oasrvhtgkgqelbhufuxa.supabase.co/functions/v1";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

const buildAuthHeaders = (token) => {
  if (!token) {
    throw new Error("Missing auth token. Please login again.");
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};

export const apiPost = async (url, body, token) => {
  const response = await apiClient.post(url, body, {
    headers: buildAuthHeaders(token),
  });

  return response.data;
};

export default apiClient;
