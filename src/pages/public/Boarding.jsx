import { useState, useEffect } from "react"
import Boarding1 from "../../components/boarding/Boarding1"
import Boarding2 from "../../components/boarding/Boarding2"
import Boarding3 from "../../components/boarding/Boarding3"
import Boarding5 from "../../components/boarding/Boarding5"
import { useOnboardingRecommendations } from "@/hooks/useOnboardingRecommendations"

export default function Boarding() {
  const [step, setStep] = useState(1)
  const {
    recommendations,
    status,
    error,
    fetchRecommendations,
    resetRecommendations,
  } = useOnboardingRecommendations()

  const [preferences, setPreferences] = useState({
    interests: [],
    vibe: "",
    learnStyle: [],
    weeklyTime: "",
    goal: "",
  })

  const updatePrefs = (newData) => {
    setPreferences((prev) => ({ ...prev, ...newData }))
  }

  const next = () => setStep((s) => s + 1)
  const back = () => setStep((s) => s - 1)

  useEffect(() => {
    if (Object.values(preferences).some((v) => (Array.isArray(v) ? v.length : v))) {
      localStorage.setItem("userPreferences", JSON.stringify(preferences))
    }
  }, [preferences])

  const handleNext1 = (data) => { updatePrefs(data); next() }
  const handleNext2 = (data) => { updatePrefs(data); next() }

  const handleNext3 = (data) => {
    const updatedPreferences = { ...preferences, ...data }
    updatePrefs(data)
    setStep(5)
    fetchRecommendations(updatedPreferences)
  }

  const handleRetry = () => {
    fetchRecommendations(preferences)
  }

  const handleBackFromRecommendations = () => {
    resetRecommendations()
    setStep(3)
  }

  if (step === 1) return <Boarding1 onNext={handleNext1} />
  if (step === 2) return <Boarding2 onNext={handleNext2} onBack={back} />
  if (step === 3) return <Boarding3 onNext={handleNext3} onBack={back} />
  if (step === 5) {
    return (
      <Boarding5
        recommendations={recommendations}
        status={status}
        error={error}
        onRetry={handleRetry}
        onBack={handleBackFromRecommendations}
      />
    )
  }

  return null
}
