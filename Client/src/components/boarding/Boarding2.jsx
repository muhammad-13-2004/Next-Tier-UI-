import { useState } from 'react'
import Logo from '../../assets/LogoApp.png'

const vibeOptions = [
  {
    id: 'beginner',
    label: 'Beginner',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-4 h-4"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    ),
  },
  {
    id: 'some',
    label: 'Some Exposure',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-4 h-4"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    ),
  },
  {
    id: 'ready',
    label: 'Ready for challenges',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-4 h-4"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    ),
  },
]

const learnOptions = [
  {
    id: 'reading',
    label: 'Reading + quizzes',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-4 h-4"
      >
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
  },
  {
    id: 'ai',
    label: 'AI-guided tutor',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-4 h-4"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    ),
  },
  {
    id: 'projects',
    label: 'Hands-on projects',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-4 h-4"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
]

const timeOptions = [
  {
    id: '2h',
    label: '2h (Light Pace)',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-4 h-4"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    ),
  },
  {
    id: '5h',
    label: '5h (Steady Pace)',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-4 h-4"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    ),
  },
  {
    id: '8h',
    label: '8h+ (Full Sprint)',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-4 h-4"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    ),
  },
]

function Checkmark() {
  return (
    <div className="w-5 h-5 rounded-full bg-secondary border-secondary border-2 flex items-center justify-center shrink-0">
      <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
        <path
          d="M2 6l3 3 5-5"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

function EmptyCircle() {
  return (
    <div className="w-5 h-5 rounded-full border-2 border-gray-300 shrink-0" />
  )
}

function OptionCard({ option, isSelected, onClick, multi = false }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all duration-150 cursor-pointer flex-1
        ${isSelected ? 'border-secondary bg-green-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
    >
      <div
        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0
        ${isSelected ? 'bg-green-100 text-secondary' : 'bg-gray-100 text-gray-500'}`}
      >
        {option.icon}
      </div>
      <span className="text-sm font-medium text-gray-900 flex-1 text-left">
        {option.label}
      </span>
      {isSelected ? <Checkmark /> : <EmptyCircle />}
    </button>
  )
}

export default function Boarding2() {
  const [vibe, setVibe] = useState('beginner')
  const [learn, setLearn] = useState(new Set(['reading']))
  const [time, setTime] = useState('5h')

  const toggleLearn = (id) => {
    setLearn((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="px-8 py-3 shrink-0">
        <div className="h-8 flex items-center">
          <img
            src={Logo}
            alt="Logo Of The App"
            className="h-full w-auto object-contain"
          />
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center px-6 overflow-hidden">
        {/* Progress */}
        <div className="w-full max-w-2xl">
          <p className="text-right text-xs text-gray-400 mb-1">2/3</p>
          <div className="flex gap-2">
            <div className="h-1 flex-1 rounded-full bg-border" />
            <div className="h-1 flex-1 rounded-full bg-secondary" />
            <div className="h-1 flex-1 rounded-full bg-border" />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mt-5">
          <h1 className="text-2xl font-bold text-gray-900">
            Tell us a bit about{' '}
            <span className="text-secondary">your background</span>
          </h1>
          <p className="text-subtext mt-1.5 text-sm">
            No judgment, It just helps us tailor the right starting point for
            you.
          </p>
        </div>

        {/* Questions */}
        <div className="w-full max-w-3xl mt-6 flex flex-col gap-5">
          {/* Q1 */}
          <div>
            <p className="text-sm font-medium text-gray-800 mb-2">
              1. What's your current vibe with learning?
            </p>
            <div className="flex gap-3">
              {vibeOptions.map((opt) => (
                <OptionCard
                  key={opt.id}
                  option={opt}
                  isSelected={vibe === opt.id}
                  onClick={() => setVibe(opt.id)}
                />
              ))}
            </div>
          </div>

          {/* Q2 */}
          <div>
            <p className="text-sm font-medium text-gray-800 mb-2">
              2. How do you like to learn? &nbsp;
              <span className="text-gray-400 font-normal">
                (You can select multiple)
              </span>
            </p>
            <div className="flex gap-3">
              {learnOptions.map((opt) => (
                <OptionCard
                  key={opt.id}
                  option={opt}
                  isSelected={learn.has(opt.id)}
                  onClick={() => toggleLearn(opt.id)}
                  multi
                />
              ))}
            </div>
          </div>

          {/* Q3 */}
          <div>
            <p className="text-sm font-medium text-gray-800 mb-2">
              3. How much weekly time you can commit?
            </p>
            <div className="flex gap-3">
              {timeOptions.map((opt) => (
                <OptionCard
                  key={opt.id}
                  option={opt}
                  isSelected={time === opt.id}
                  onClick={() => setTime(opt.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button className="bg-black text-white px-7 py-2.5 rounded-full font-medium text-sm flex items-center gap-2 hover:bg-gray-700 transition-colors">
            Next, Tell Us More
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4"
            >
              <path
                d="M5 12h14M12 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button className="border border-gray-300 text-gray-800 px-7 py-2.5 rounded-full font-medium text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4"
            >
              <path
                d="M19 12H5M12 19l-7-7 7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 py-3 shrink-0">
        © 2025 NextTier ·{' '}
        <a href="#" className="underline hover:text-gray-600">
          Privacy
        </a>
        {' · '}
        <a href="#" className="underline hover:text-gray-600">
          Terms
        </a>
        {' · '}
        Built with <span className="text-red-500">♥</span> for curious minds
      </footer>
    </div>
  )
}
