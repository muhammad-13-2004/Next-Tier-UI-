const tagIcons = {
  "6-8 Weeks": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  "High Demand": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
  "Beginner Friendly": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
      <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
    </svg>
  ),
};

export default function CourseCard({ course }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col gap-4 w-full">

      {/* Top: icon + title + badge */}
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center text-3xl shrink-0">
          {course.icon}
        </div>
        <div>
          <p className="text-lg font-bold text-gray-900">{course.title}</p>
          <span className="inline-flex items-center gap-1 mt-1 text-xs font-medium text-secondary border border-secondary rounded-full px-2.5 py-0.5">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            {course.badge}
          </span>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Why You'll Love It */}
      <div>
        <p className="text-sm font-semibold text-gray-800 mb-1.5">Why You'll Love It:</p>
        <p className="text-sm text-gray-600 leading-relaxed">{course.why}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {course.tags.map((tag) => (
          <span key={tag} className="inline-flex items-center gap-1.5 text-xs text-gray-600 border border-gray-200 rounded-full px-3 py-1">
            {tagIcons[tag] || null}
            {tag}
          </span>
        ))}
      </div>

      {/* CTA */}
      <button className="w-full bg-secondary text-black font-semibold text-sm py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity mt-1">
        Start This Path
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
          <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

    </div>
  );
}