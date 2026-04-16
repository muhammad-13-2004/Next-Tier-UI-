import Logo from '../../assets/LogoApp.png'
import CourseCard from './CourseCard'
import {courses}  from '../../utils/Courserecommendation'

export default function Boarding5() {
  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">

      {/* Header */}
      <header className="px-8 py-3 shrink-0">
        <div className="h-8 flex items-center">
          <img src={Logo} alt="Logo Of The App" className="h-full w-auto object-contain" />
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center px-6 overflow-hidden">

        {/* Heading */}
        <div className="text-center mt-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Here's what we <span className="text-secondary">recommend!</span>
          </h1>
          <p className="text-subtext mt-1.5 text-sm">
            Based on your interests, background, and goals — these paths are a great fit for you.
          </p>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-2 gap-5 mt-6 w-full max-w-3xl">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button className="bg-black text-white px-7 py-2.5 rounded-full font-medium text-sm flex items-center gap-2 hover:bg-gray-700 transition-colors">
            Adjust My Goals
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/>
              <polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
            </svg>
          </button>
          <button className="border border-gray-300 text-gray-800 px-7 py-2.5 rounded-full font-medium text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors">
            Explore All Paths
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 py-3 shrink-0">
        © 2025 NextTier ·{" "}
        <a href="#" className="underline hover:text-gray-600">Privacy</a>
        {" · "}
        <a href="#" className="underline hover:text-gray-600">Terms</a>
        {" · "}
        Built with <span className="text-red-500">♥</span> for curious minds
      </footer>

    </div>
  );
}