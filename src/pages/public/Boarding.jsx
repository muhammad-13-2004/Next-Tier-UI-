import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Boarding1 from "../../components/boarding/Boarding1";
import Boarding2 from "../../components/boarding/Boarding2";
import Boarding3 from "../../components/boarding/Boarding3";
import Boarding4 from "../../components/boarding/Boarding4";
import { useOnboarding } from "@/hooks/useOnboarding";
import { useAuthStore } from "@/store/authStore";
import { useOnboardingStore } from "@/store/onboardingStore";

export default function Boarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const user = useAuthStore((s) => s.user);
  const accessToken = useAuthStore((s) => s.accessToken);
  const syncOnboardingStatus = useAuthStore((s) => s.syncOnboardingStatus);
  const isCompleted = useOnboardingStore((s) => s.isCompleted);

  const {
    setInterests,
    setLearningStyles,
    setTimeCommitment,
    setGoal,
    recommendations,
    loading,
    error,
    submitAndRecommend,
    pickCourse,
    handleSkip,
    reset,
  } = useOnboarding();

  useEffect(() => {
    let cancelled = false;

    const verifyAccess = async () => {
      if (!user) {
        setCheckingStatus(false);
        return;
      }

      const { completed } = await syncOnboardingStatus(user, accessToken);

      if (!cancelled && completed) {
        navigate("/dashboard", { replace: true });
        return;
      }

      if (!cancelled) {
        setCheckingStatus(false);
      }
    };

    if (isCompleted === true) {
      navigate("/dashboard", { replace: true });
      return;
    }

    if (isCompleted === false) {
      setCheckingStatus(false);
      return;
    }

    verifyAccess();

    return () => {
      cancelled = true;
    };
  }, [user, accessToken, isCompleted, syncOnboardingStatus, navigate]);

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const handleNext1 = (data) => {
    setInterests(data.interests);
    next();
  };

  const handleNext2 = (data) => {
    setLearningStyles(data.learnStyle ?? []);
    setTimeCommitment(data.weeklyTime ?? null);
    next();
  };

  const handleNext3 = async (data) => {
    setGoal(data.goal);
    setStep(5);
    await submitAndRecommend();
  };

  const handleRetry = () => {
    submitAndRecommend();
  };

  const handleBackFromRecommendations = () => {
    reset();
    setStep(3);
  };

  if (checkingStatus) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-500">
        <Loader2 className="h-8 w-8 animate-spin" aria-label="Loading" />
      </div>
    );
  }

  if (step === 1) return <Boarding1 onNext={handleNext1} skipBoarding={handleSkip} />;
  if (step === 2) return <Boarding2 onNext={handleNext2} onBack={back} />;
  if (step === 3) return <Boarding3 onNext={handleNext3} onBack={back} />;

  if (step === 5) {
    return (
      <Boarding4
        recommendations={recommendations}
        status={loading ? "loading" : "idle"}
        error={error}
        onRetry={handleRetry}
        onBack={handleBackFromRecommendations}
        onStartCourse={pickCourse}
      />
    );
  }

  return null;
}
