import { useAiTutorStore } from "@/store/aiTutorStore";

export function useAiTutor() {
  const store = useAiTutorStore();

  const sendMessage = (text) =>
    store.sendMessage({
      text,
    });

  return {
    ...store,
    sendMessage,
  };
}
