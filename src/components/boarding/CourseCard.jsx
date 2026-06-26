import { Book } from "lucide-react";

export default function CourseCard({ course, onStart, loading = false }) {
  
  const duration = course.duration ?? course.estimated_duration ?? "Flexible pace";
  const demand = course.demand ?? course.market_demand ?? "High demand";
  const complexity = course.complexity ?? course.level ?? "Beginner";
  const modulePreview =
    course.module_preview ??
    course.modulePreview ??
    course.modules?.slice(0, 3)?.map((m) => m.title) ??
    [];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col justify-between gap-2 w-full">

      {/* Top: icon + title + badge */}
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center text-3xl shrink-0">
          {course.icon || <Book/>}
        </div>
        <div>
          <p className="text-lg font-medium text-gray-900">{course.title}</p>
          <span className="inline-flex items-center gap-1 mt-1 text-xs font-medium text-secondary border border-secondary rounded-full px-2.5 py-0.5">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            Best Fit
          </span>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Why You'll Love It */}
      <div>
        <p className="text-sm font-semibold text-gray-800 mb-1.5">Why You'll Love It:</p>
        <p className="text-sm text-gray-500 leading-relaxed">{course.short_description}</p>
      </div>

      {modulePreview.length > 0 ? (
        <div>
          <p className="text-sm font-semibold text-gray-800 mb-1.5">Module Preview:</p>
          <ul className="text-sm text-gray-500 leading-relaxed list-disc pl-5">
            {modulePreview.slice(0, 3).map((moduleTitle, idx) => (
              <li key={`${course.slug}-module-${idx}`}>{moduleTitle}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs text-gray-600 border border-gray-200 rounded-full px-3 py-1">
            {duration}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-gray-600 border border-gray-200 rounded-full px-3 py-1">
            {demand}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-gray-600 border border-gray-200 rounded-full px-3 py-1">
            {complexity}
          </span>
      </div>

        {/* CTA Banner */}
      <button
        onClick={() => onStart?.(course.slug)}
        disabled={loading}
        className="w-full bg-secondary text-black font-semibold text-sm py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        Start This Path
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
          <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

    </div>
  );
}