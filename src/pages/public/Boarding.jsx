import { useState } from "react";
import Boarding1 from "../../components/boarding/Boarding1";
import Boarding2 from "../../components/boarding/Boarding2";
import Boarding3 from "../../components/boarding/Boarding3";
import Boarding4 from "../../components/boarding/Boarding4";
import { useOnboarding } from "@/hooks/useOnboarding";

export default function Boarding() {
  const [step, setStep] = useState(1);

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
