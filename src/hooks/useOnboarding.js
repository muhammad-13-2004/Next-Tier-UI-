import { useNavigate } from "react-router-dom";
import { useOnboardingStore } from "@/store/onboardingStore";
import { useCourseStore } from "@/store/courseStore";
import { useAuthStore } from "@/store/authStore";


// The final action triggers recommend + save + generate in sequence.

export function useOnboarding() {

  const navigate = useNavigate();
  const { user } = useAuthStore();
  const store = useOnboardingStore();
  const { generateRoadmap } = useCourseStore();


  const pickCourse = async (courseSlug) => {
    if (!user?.id || !courseSlug) return;

    store.setLoading(true);
    store.setError(null);

    try {
      // 1. Save preferences to DB
      await store.confirmAndSave(user.id);

      // 2. Generate roadmap for the chosen course
      const selectedCourse = store.recommendations.find((c) => c.slug === courseSlug);
      const course = await generateRoadmap({
        mode: "recommendation",
        input: {
          title: selectedCourse?.title ?? courseSlug,
          complexity: selectedCourse?.complexity ?? selectedCourse?.level ?? "beginner",
          goal: store.goal,
          time_commitment: store.timeCommitment,
        },
      });

      const firstLessonId = course?.modules?.[0]?.lessons?.[0]?.id;
      const resolvedSlug = course?.slug ?? courseSlug;

      // 3. Clean up onboarding state
      store.reset();

      // 4. Navigate to the generated roadmap
      if (firstLessonId && resolvedSlug) {
        navigate(`/dashboard/roadmaps/${resolvedSlug}/${firstLessonId}`);
      } else {
        navigate("/dashboard/roadmaps");
      }
    } catch (err) {
      store.setError(err?.message ?? "Could not start this roadmap.");
      store.setLoading(false);
    }
  };

  const handleSkip = async () => {
    await store.skip(user.id);
    navigate("/dashboard");
  };

  return {
    // State
    ...store,
    // Actions per screen
    onScreen1Submit: store.submitAndRecommend.bind(null, user?.id),
    pickCourse,
    handleSkip,
  };
}
