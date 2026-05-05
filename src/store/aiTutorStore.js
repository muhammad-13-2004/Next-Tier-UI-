import { create } from "zustand";
import { api } from "@/services/api";

const formatTutorObject = (value) => {
  const parts = [];

  if (value.answer) parts.push(`Answer\n${formatTutorReply(value.answer)}`);
  if (Array.isArray(value.key_points) && value.key_points.length) {
    parts.push(
      `Key points\n${value.key_points
        .map((point, index) => `${index + 1}. ${formatTutorReply(point)}`)
        .join("\n")}`
    );
  }
  if (value.example) parts.push(`Example\n${formatTutorReply(value.example)}`);
  if (value.difficulty_level) parts.push(`Difficulty\n${formatTutorReply(value.difficulty_level)}`);

  return parts.length ? parts.join("\n\n") : JSON.stringify(value, null, 2);
};

const formatTutorReply = (value) => {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") return formatTutorObject(value);

  return "I could not read the tutor response. Please try again.";
};

const getTutorReply = (data) => {
  if (typeof data === "string") return data;

  const tutorResponse = data?.data ?? data;
  if (
    tutorResponse?.answer ||
    tutorResponse?.key_points ||
    tutorResponse?.example ||
    tutorResponse?.difficulty_level
  ) {
    return formatTutorObject(tutorResponse);
  }

  const reply =
    data?.reply ??
    data?.response ??
    data?.answer ??
    data?.message ??
    data?.content ??
    data?.data?.reply ??
    data?.data?.response ??
    data;

  return formatTutorReply(reply);
};

export const useAiTutorStore = create((set, get) => ({
  messages: [],
  loading: false,
  error: null,

  sendMessage: async ({ text }) => {
    const message = text?.trim();
    if (!message || get().loading) return;

    const userMessage = { text: message, isUser: true };

    set({
      messages: [...get().messages, userMessage],
      loading: true,
      error: null,
    });

    try {
      const data = await api.tutorChat({
        input: message,
      });

      const aiMessage = {
        text: getTutorReply(data),
        isUser: false,
      };

      set((state) => ({
        messages: [...state.messages, aiMessage],
        loading: false,
      }));
    } catch (err) {
      set({
        error: err.message,
        loading: false,
      });
    }
  },

  clearChat: () => set({ messages: [], error: null, loading: false }),
  newChat: () => set({ messages: [], error: null, loading: false }),
}));
