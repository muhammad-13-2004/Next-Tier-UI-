import { useState, useEffect } from "react"
import Boarding1 from "../../components/boarding/Boarding1"
import Boarding2 from "../../components/boarding/Boarding2"
import Boarding3 from "../../components/boarding/Boarding3"
import Boarding4 from "../../components/boarding/Boarding4"
import Boarding5 from "../../components/boarding/Boarding5"

export default function Boarding() {
  const [step, setStep] = useState(1)
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

  // Save to localStorage whenever preferences update
  useEffect(() => {
    if (Object.values(preferences).some((v) => (Array.isArray(v) ? v.length : v))) {
      localStorage.setItem("userPreferences", JSON.stringify(preferences))
    }
  }, [preferences])

  const handleNext1 = (data) => { updatePrefs(data); next() }
  const handleNext2 = (data) => { updatePrefs(data); next() }
  const handleNext3 = (data) => { updatePrefs(data); next() }
  const handleDone4  = ()     => { next() }

  if (step === 1) return <Boarding1 onNext={handleNext1} />
  if (step === 2) return <Boarding2 onNext={handleNext2} onBack={back} />
  if (step === 3) return <Boarding3 onNext={handleNext3} onBack={back} />
  if (step === 4) return <Boarding4 onDone={handleDone4} />
  if (step === 5) return <Boarding5 preferences={preferences} onBack={back} />

  return null
}