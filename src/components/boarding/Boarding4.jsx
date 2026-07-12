import Logo from '../../assets/LogoApp.png'
import LoadingImage from '../../assets/nexttier-icon.png'
import CourseCard from './CourseCard'

export default function Boarding4({ recommendations, status, error, onRetry, onBack, onStartCourse }) {
  
  const isLoading = status === 'loading'
  const isError = !isLoading && Boolean(error)

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
        <div className="text-center mt-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Here's what we <span className="text-secondary">recommend!</span>
          </h1>
          <p className="text-subtext mt-1.5 text-sm">
            Based on your interests, background, and goals these paths are a great fit for you.
          </p>
        </div>

        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <img
              src={LoadingImage}
              alt="Loading"
              className="w-20 h-20 object-contain"
              style={{ animation: 'pulse-scale 1.5s ease-in-out infinite' }}
            />
          </div>
        ) : null}

        {isError ? (
          <div className="text-center px-6 mt-10">
            <p className="text-base text-red-600 font-medium">Couldn't fetch recommendations.</p>
            <p className="text-sm text-gray-500 mt-1">{error}</p>
            <div className="flex justify-center gap-3 mt-5">
              <button
                onClick={onRetry}
                className="bg-black text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-gray-700 transition-colors"
              >
                Retry
              </button>
              <button
                onClick={onBack}
                className="border border-gray-300 text-gray-800 px-6 py-2.5 rounded-full font-medium text-sm hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            </div>
          </div>
        ) : null}

        {!isLoading && !isError ? (
          recommendations.length > 0 ? (
            <div className="grid grid-cols-3 gap-5 my-14 w-full h-100 max-w-6xl">
              {recommendations.map((course) => (
                <CourseCard
                  key={course.slug ?? course.title}
                  course={course}
                  loading={isLoading}
                  onStart={onStartCourse}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 mt-8">
              No recommendations found for this profile yet.
            </p>
          )
        ) : null}

        {!isLoading && !isError ? (
          <div className="flex gap-4 mt-6">
            <button className="bg-black text-white px-7 py-2.5 rounded-full font-medium text-sm flex items-center gap-2 hover:bg-gray-700 transition-colors">
              Adjust My Goals
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4"
              >
                <polyline points="17 1 21 5 17 9" />
                <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                <polyline points="7 23 3 19 7 15" />
                <path d="M21 13v2a4 4 0 0 1-4 4H3" />
              </svg>
            </button>
            <button
              onClick={onBack}
              className="border border-gray-300 text-gray-800 px-7 py-2.5 rounded-full font-medium text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors"
            >
              Explore All Paths
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
          </div>
        ) : null}
      </main>

      {/* <footer className="text-center text-xs text-gray-400 py-3 shrink-0">
        © 2026 NextTier ·{" "}
        <a href="#" className="underline hover:text-gray-600">Privacy</a>
        {" · "}
        <a href="#" className="underline hover:text-gray-600">Terms</a>
        {" · "}
        Built with <span className="text-red-500">♥</span> for curious minds
      </footer> */}

      <style>{`
        @keyframes pulse-scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
      `}</style>
    </div>
  )
}
