import { useEffect } from "react";
import { useLessonStore } from "@/stores/lessonStore";

// This hook is the bridge between the lesson screen
// and the store. It handles the automatic content load
// on mount and exposes tab-switching logic cleanly.

export function useLesson(lesson) {
  const {
    content, quiz, challenge,
    contentLoading, quizLoading, challengeLoading,
    openLesson, loadContent, loadQuiz, loadChallenge, completeLesson,
  } = useLessonStore();

  // Open and load content automatically when lesson changes
  useEffect(() => {
    if (!lesson) return;
    openLesson(lesson);
    loadContent(lesson.id);
  }, [lesson?.id]);

  // Tab handlers — load on demand
  const onQuizTabOpen     = () => loadQuiz(lesson?.id);
  const onChallengeTabOpen= () => loadChallenge(lesson?.id);

  const onComplete = async ({ quiz_score, xp_earned, user_id }) => {
    return completeLesson(lesson?.id, { quiz_score, xp_earned, user_id });
  };

  return {
    content, quiz, challenge,
    contentLoading, quizLoading, challengeLoading,
    onQuizTabOpen, onChallengeTabOpen, onComplete,
  };
}