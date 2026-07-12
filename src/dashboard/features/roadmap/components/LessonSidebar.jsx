import React from 'react'
import { Check, Lock, Play } from 'lucide-react'

function RoadmapItem({ lesson, isActive, onOpen }) {
  const done = lesson.status === 'completed'
  const locked = lesson.status === 'locked'

  return (
    <button
      onClick={() => !locked && onOpen(lesson.id)}
      disabled={locked}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
        isActive
          ? 'border border-[#7AE84A] bg-[#F4FBEF] opacity-100'
          : locked
          ? 'cursor-not-allowed border border-transparent opacity-50'
          : 'border border-transparent opacity-60 hover:bg-[#F7F7F7] hover:opacity-80'
      }`}
    >
      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
          done
            ? 'border-[#7AE84A] bg-[#7AE84A] text-black'
            : isActive
            ? 'border-[#7AE84A] bg-white text-[#3A7A1A]'
            : 'border-[#DADADA] bg-[#FAFAFA] text-[#9A9A9A]'
        }`}
      >
        {done ? <Check size={14} /> : locked ? <Lock size={12} /> : lesson.position}
      </div>
      <div className="min-w-0 flex-1">
        <p
          className={`truncate text-sm font-medium ${
            isActive ? 'text-[#111]' : locked ? 'text-[#B8B8B8]' : 'text-[#666]'
          }`}
        >
          {lesson.title}
        </p>
      </div>
      {!locked && lesson.status === 'in-progress' ? <Play size={14} className="text-[#5BC932]" /> : null}
    </button>
  )
}

export default function LessonSidebar({ roadmap, module, moduleLessons, lessonId, onOpenLesson }) {
  return (
    <aside className="relative top-50 hidden w-80 shrink-0 lg:block">
      <div className="space-y-4">
        <div className="rounded-[24px] border border-[#E9E9E9] bg-white p-5">
          <p className="text-sm font-bold text-[#111]">Course Progress</p>
          <p className="mt-1 text-sm leading-6 text-[#666]">{roadmap.subtitle}</p>
          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold text-[#777]">
              <span>{roadmap.progress}% complete</span>
              <span>{module.time}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[#F1F1F1]">
              <div className="h-full rounded-full bg-[#7AE84A]" style={{ width: `${roadmap.progress}%` }} />
            </div>
          </div>
        </div>

        <div className="rounded-[24px] border border-[#E9E9E9] bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-[#111]">{module.title}</p>
              <p className="text-xs text-[#8A8A8A]">{module.xp} XP</p>
            </div>
          </div>
          <div className="space-y-1.5">
            {moduleLessons.map((moduleLesson) => (
              <RoadmapItem
                key={moduleLesson.id}
                lesson={moduleLesson}
                isActive={moduleLesson.id === lessonId}
                onOpen={onOpenLesson}
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
