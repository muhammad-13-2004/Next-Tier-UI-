import { useOnboardingStore } from "@/store/onboardingStore";

export const useOnboardingRecommendations = () => {
  const recommendations = useOnboardingStore((s) => s.recommendations);
  const status = useOnboardingStore((s) => s.status);
  const error = useOnboardingStore((s) => s.error);
  const fetchRecommendations = useOnboardingStore((s) => s.fetchRecommendations);
  const resetRecommendations = useOnboardingStore((s) => s.resetRecommendations);

  return {
    recommendations,
    status,
    error,
    fetchRecommendations,
    resetRecommendations,
    isLoading: status === "loading",
    isSuccess: status === "success",
    isError: status === "error",
  };
};
