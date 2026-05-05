import { useState } from 'react'
import Logo from '../../assets/LogoApp.png'

const interests = [
  {
    id: 'coding',
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
    title: 'Coding & Building Apps',
    description: 'I love solving puzzles or creating things from scratch',
  },
  {
    id: 'design',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-5 h-5"
      >
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
    title: 'Design & Creativity',
    description: 'Drawing, editing photos, or making stuff look awesome',
  },
  {
    id: 'data',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-5 h-5"
      >
        <rect x="18" y="3" width="4" height="18" />
        <rect x="10" y="8" width="4" height="13" />
        <rect x="2" y="13" width="4" height="8" />
      </svg>
    ),
    title: 'Data & Analysis',
    description: 'Digging into numbers, trends, or stories behind data',
  },
  {
    id: 'marketing',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-5 h-5"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: 'Marketing & Business',
    description: 'Selling ideas, social media, or starting side hustles',
  },
  {
    id: 'writing',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-5 h-5"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    title: 'Writing & Communication',
    description:
      'Learning and exploring other languages, improving soft skills',
  },
  {
    id: 'notsure',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-5 h-5"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    title: 'Not Sure',
    description: 'I am confused, I want to explore more options',
  },
]

export default function Boarding1({ onNext, skipBoarding }) {
  const [selected, setSelected] = useState(new Set(['coding']))

  const toggle = (id) => {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
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
          <p className="text-right text-xs text-gray-400 mb-1">1/3</p>
          <div className="flex gap-2">
            <div className="h-1 flex-1 rounded-full bg-secondary" />
            <div className="h-1 flex-1 rounded-full bg-border" />
            <div className="h-1 flex-1 rounded-full bg-border" />
          </div>
        </div>

        <div className="text-center mt-5">
          <h1 className="text-2xl font-bold text-gray-900">
            Hey <span className="text-secondary">Muhammad</span>, Let's Find
            Your Spark!
          </h1>
          <p className="text-subtext mt-1.5 text-sm">
            What do you find fun doing or learning? Pick everything that
            resonates even a little.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-4 w-full max-w-3xl">
          {interests.map((item) => {
            const isSelected = selected.has(item.id)
            return (
              <button
                key={item.id}
                onClick={() => toggle(item.id)}
                className={`relative text-left rounded-2xl border p-3.5 transition-all duration-150 cursor-pointer
                  ${isSelected ? 'border-secondary bg-green-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
              >
                <div
                  className={`absolute top-2.5 right-2.5 w-5 h-5 rounded-full border-2 flex items-center justify-center
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
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2
                  ${isSelected ? 'bg-green-50 text-secondary' : 'bg-gray-100 text-subtext'}`}
                >
                  {item.icon}
                </div>
                <p className="font-semibold text-gray-900 text-sm">
                  {item.title}
                </p>
                <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">
                  {item.description}
                </p>
              </button>
            )
          })}
        </div>

        <div className="flex gap-4 mt-5">
          <button
            onClick={() => onNext({ interests: [...selected] })}
            className="bg-black text-white px-7 py-2.5 rounded-full font-medium text-sm flex items-center gap-2 hover:bg-gray-700 transition-colors"
          >
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
          <button onClick={() => skipBoarding()} className="border border-gray-300 text-gray-800 px-7 py-2.5 rounded-full font-medium text-sm hover:bg-gray-50 transition-colors">
            Skip, I Know What To Learn
          </button>
        </div>
      </main>

      {/* <footer className="text-center text-xs text-gray-400 py-3 shrink-0">
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
      </footer> */}
    </div>
  )
}
