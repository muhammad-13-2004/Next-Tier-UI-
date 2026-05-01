import React from 'react'
import { Check, Lock, Play } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const LessonRow = ({ lesson, num, roadmapSlug }) => {
  const navigate = useNavigate()

  const done = lesson.status === 'completed'
  const active = lesson.status === 'in-progress'
  const locked = lesson.status === 'locked'

  return (
    <div
      className={`flex items-center gap-3 py-3 rounded-xl px-2 transition-colors
        ${locked ? 'opacity-50 cursor-default' : 'cursor-pointer hover:bg-[#F9F9F9]'}`}
    >
      {/* Num bubble */}
      <div
        className={`w-7 h-7 rounded-full border-[1.5px] flex items-center justify-center text-xs font-bold shrink-0
          ${
            done
              ? 'border-[#7AE84A] bg-[#F2FCE8] text-[#3a7a1a]'
              : active
              ? 'border-[#7AE84A] bg-[#7AE84A] text-black'
              : 'border-[#D4D4D4] text-[#A3A3A3]'
          }`}
      >
        {done ? <Check size={14} /> : num}
      </div>

      <span
        className={`flex-1 text-sm font-medium leading-snug ${
          locked ? 'text-[#C4C4C4]' : 'text-[#111]'
        }`}
      >
        {lesson.title}
      </span>

      {active && (
        <span
          onClick={() => navigate(`/dashboard/roadmaps/${roadmapSlug}/${lesson.id}`)}
          className="text-xs font-bold text-[#5BC932] whitespace-nowrap cursor-pointer"
        >
          <span className="inline-flex items-center gap-1">
            <Play size={12} />
            {lesson.resumeLabel || 'Resume'}
          </span>
        </span>
      )}

      {locked && <Lock size={14} className="text-[#C4C4C4]" />}
    </div>
  )
}

export default LessonRow
