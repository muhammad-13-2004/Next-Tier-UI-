import { useState } from 'react'
import Logo from '../../assets/LogoApp.png'

const goals = [
  {
    id: 'internship',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-5 h-5"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: 'Get an internship',
    description: 'Land a role at the top company this year',
  },
  {
    id: 'portfolio',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-5 h-5"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'Build a Portfolio',
    description: 'Create real projects to showcase skills',
  },
  {
    id: 'fun',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-5 h-5"
      >
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
    title: 'Explore for fun',
    description: 'No Pressure just curious and love learning',
  },
  {
    id: 'career',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-5 h-5"
      >
        <polyline points="17 1 21 5 17 9" />
        <path d="M3 11V9a4 4 0 0 1 4-4h14" />
        <polyline points="7 23 3 19 7 15" />
        <path d="M21 13v2a4 4 0 0 1-4 4H3" />
      </svg>
    ),
    title: 'Switch Career Path',
    description: 'Transition into new field or industry',
  },
]

export default function Boarding3({ onNext, onBack }) {
  const [selected, setSelected] = useState('internship')

  const CardItem = ({ goal }) => {
    const isSelected = selected === goal.id
    return (
      <button
        onClick={() => setSelected(goal.id)}
        className={`relative flex items-start gap-3 p-4 rounded-2xl border text-left transition-all duration-150 cursor-pointer
          ${isSelected ? 'border-secondary bg-green-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
      >
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0
          ${isSelected ? 'bg-green-100 text-secondary' : 'bg-gray-100 text-gray-500'}`}
        >
          {goal.icon}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-gray-900 text-sm">{goal.title}</p>
          <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">
            {goal.description}
          </p>
        </div>
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5
          ${isSelected ? 'border-secondary bg-secondary' : 'border-gray-300'}`}
        >
          {isSelected && (
            <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
              <path
                d="M2 6l3 3 5-5"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </button>
    )
  }

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      <header className="px-8 py-3 shrink-0">
        <div className="h-8 flex items-center">
          <img
            src={Logo}
            alt="Logo Of The App"
            className="h-full w-auto object-contain"
          />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center px-6 overflow-hidden">
        <div className="w-full max-w-2xl">
          <p className="text-right text-xs text-gray-400 mb-1">3/3</p>
          <div className="flex gap-2">
            <div className="h-1 flex-1 rounded-full bg-border" />
            <div className="h-1 flex-1 rounded-full bg-border" />
            <div className="h-1 flex-1 rounded-full bg-secondary" />
          </div>
        </div>

        <div className="text-center mt-8">
          <h1 className="text-2xl font-bold text-gray-900">
            What's your <span className="text-secondary">main goal?</span>
          </h1>
          <p className="text-subtext mt-1.5 text-sm">
            This shapes the kind of path we'll recommend focused projects,
            theory, or hands-on hustle.
          </p>
        </div>

        <div className="w-full max-w-3xl mt-10">
          <div className="grid grid-cols-3 gap-4">
            {goals.slice(0, 3).map((goal) => (
              <CardItem key={goal.id} goal={goal} />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            {goals.slice(3).map((goal) => (
              <div key={goal.id} className="w-[calc(33.333%-8px)]">
                <CardItem goal={goal} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 mt-10">
          <button
            onClick={() => onNext({ goal: selected })}
            className="bg-black text-white px-7 py-2.5 rounded-full font-medium text-sm flex items-center gap-2 hover:bg-gray-700 transition-colors"
          >
            Find My Skills
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          <button
            onClick={onBack}
            className="border border-gray-300 text-gray-800 px-7 py-2.5 rounded-full font-medium text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors"
          >
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
