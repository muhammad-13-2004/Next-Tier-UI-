import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Check, ChevronLeft, ChevronRight, Lock, Play } from 'lucide-react'
import { ROADMAPS } from '@/utils/Roadmaps'

function findLessonDetails(roadmapSlug, lessonId) {
  const roadmap = ROADMAPS.find((item) => item.slug === roadmapSlug)

  if (roadmap) {
    for (const module of roadmap.modules) {
      const lessonIndex = module.lessons.findIndex((lesson) => lesson.id === lessonId)
      if (lessonIndex !== -1) {
        return {
          roadmap,
          module,
          lesson: module.lessons[lessonIndex],
          lessonIndex,
        }
      }
    }
  }

  const fallbackRoadmap = ROADMAPS[0]
  const fallbackModule = fallbackRoadmap?.modules?.[0]
  const fallbackLesson = fallbackModule?.lessons?.[0]

  return {
    roadmap: fallbackRoadmap,
    module: fallbackModule,
    lesson: fallbackLesson,
    lessonIndex: 0,
  }
}

function parseInline(text) {
  return text
    .split(/(`[^`]+`|\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-semibold text-[#111]">
            {part.slice(2, -2)}
          </strong>
        )
      }

      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code
            key={index}
            className="rounded bg-[#F5F5F5] px-1.5 py-0.5 font-mono text-[0.9em] text-[#111]"
          >
            {part.slice(1, -1)}
          </code>
        )
      }

      return part
    })
}

function parseContentBlocks(content = '') {
  const lines = content.replace(/\r\n/g, '\n').split('\n')
  const blocks = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i].trimEnd()
    const trimmed = line.trim()

    if (!trimmed) {
      i += 1
      continue
    }

    if (/^[a-z]+$/i.test(trimmed) && i + 1 < lines.length) {
      const codeLines = []
      i += 1

      while (i < lines.length) {
        const current = lines[i]
        const currentTrimmed = current.trim()
        const nextTrimmed = lines[i + 1]?.trim() ?? ''

        if (
          !currentTrimmed &&
          (!nextTrimmed ||
            nextTrimmed.startsWith('#') ||
            nextTrimmed.startsWith('- ') ||
            nextTrimmed.startsWith('|'))
        ) {
          break
        }

        codeLines.push(current)
        i += 1
      }

      blocks.push({
        type: 'code',
        language: trimmed,
        code: codeLines.join('\n').replace(/```+$/g, '').trimEnd(),
      })
      continue
    }

    if (trimmed.startsWith('### ')) {
      blocks.push({ type: 'h3', text: trimmed.replace(/^### /, '') })
      i += 1
      continue
    }

    if (trimmed.startsWith('## ')) {
      blocks.push({ type: 'h2', text: trimmed.replace(/^## /, '') })
      i += 1
      continue
    }

    if (trimmed.startsWith('- ')) {
      const items = []
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(lines[i].trim().replace(/^- /, ''))
        i += 1
      }
      blocks.push({ type: 'list', items })
      continue
    }

    if (trimmed.startsWith('|')) {
      const rows = []
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        const cells = lines[i]
          .trim()
          .split('|')
          .slice(1, -1)
          .map((cell) => cell.trim())

        if (!cells.every((cell) => /^:?-{3,}:?$/.test(cell))) {
          rows.push(cells)
        }
        i += 1
      }
      if (rows.length) {
        blocks.push({ type: 'table', rows })
      }
      continue
    }

    const paragraph = []
    while (i < lines.length) {
      const current = lines[i].trim()
      if (
        !current ||
        current.startsWith('## ') ||
        current.startsWith('### ') ||
        current.startsWith('- ') ||
        current.startsWith('|') ||
        /^[a-z]+$/i.test(current)
      ) {
        break
      }
      paragraph.push(current)
      i += 1
    }
    blocks.push({ type: 'paragraph', text: paragraph.join(' ') })
  }

  return blocks.filter((block) => {
    if (block.type !== 'code') return true
    return block.code.length > 0
  })
}

function CodeBlock({ language, code }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#232323] bg-[#131313]">
      <div className="flex items-center justify-between border-b border-[#2A2A2A] px-4 py-3">
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8A8A8A]">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="text-xs font-semibold text-[#BDBDBD] transition-colors hover:text-white"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-4 text-sm leading-6 text-[#ECECEC]">
        <code>{code}</code>
      </pre>
    </div>
  )
}

function RoadmapItem({ lesson, isActive, onOpen }) {
  const done = lesson.status === 'completed'
  const locked = lesson.status === 'locked'

  return (
    <button
      onClick={() => !locked && onOpen(lesson.id)}
      disabled={locked}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
        locked ? 'cursor-not-allowed opacity-50' : 'hover:bg-[#F7F7F7]'
      } ${isActive ? 'border border-[#7AE84A] bg-[#F4FBEF]' : 'border border-transparent'}`}
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
        <p className={`truncate text-sm font-medium ${locked ? 'text-[#B8B8B8]' : 'text-[#111]'}`}>
          {lesson.title}
        </p>
      </div>
      {!locked && lesson.status === 'in-progress' ? (
        <Play size={14} className="text-[#5BC932]" />
      ) : null}
    </button>
  )
}

export default function CourseReadingTab() {
  const { slug, id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Reading')

  const { roadmap, module, lesson, lessonIndex } = useMemo(
    () => findLessonDetails(slug, id),
    [slug, id],
  )

  const moduleLessons = module?.lessons ?? []
  const previousLesson = lessonIndex > 0 ? moduleLessons[lessonIndex - 1] : null
  const nextLesson =
    lessonIndex < moduleLessons.length - 1 ? moduleLessons[lessonIndex + 1] : null
  const contentBlocks = parseContentBlocks(lesson?.content)

  if (!roadmap || !module || !lesson) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#F7F7F5]">
      <header className="sticky top-0 z-20 border-b border-[#E9E9E9] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <div className="flex min-w-0 items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 rounded-full border border-[#E5E5E5] px-3 py-1.5 text-xs font-semibold text-[#111] transition-colors hover:bg-[#F7F7F7]"
            >
              <ChevronLeft size={14} />
              Back
            </button>

            <div className="min-w-0">
              <p className="truncate text-xs font-semibold uppercase tracking-[0.16em] text-[#8A8A8A]">
                {roadmap.title}
              </p>
              <p className="truncate text-sm font-semibold text-[#111]">{module.title}</p>
            </div>
          </div>

          <div className="rounded-full bg-[#111] px-3 py-1.5 text-xs font-bold text-white">
            +{lesson.xp_reward} XP
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-8 px-6 py-8">
        <main className="min-w-0 flex-1">
          <div className="mb-6">
            <span className="inline-flex rounded-full border border-[#DDEFCF] bg-[#F3FBEA] px-3 py-1 text-xs font-semibold text-[#4F8A24]">
              Lesson {lesson.position}
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#111]">
              {lesson.title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-[#666]">
              {module.subtitle}
            </p>
          </div>

          <div className="mb-6 flex w-fit rounded-2xl bg-[#EFEFEF] p-1">
            {['Reading', 'Quiz', 'Challenge'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-xl px-5 py-2 text-sm font-semibold transition-all ${
                  activeTab === tab
                    ? 'bg-white text-[#111] shadow-sm'
                    : 'text-[#777] hover:text-[#111]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="rounded-[24px] border border-[#E9E9E9] bg-white p-7">
            {activeTab === 'Reading' ? (
              <div className="space-y-6">
                {contentBlocks.map((block, index) => {
                  if (block.type === 'h2') {
                    return (
                      <h2 key={index} className="text-2xl font-bold text-[#111]">
                        {block.text}
                      </h2>
                    )
                  }

                  if (block.type === 'h3') {
                    return (
                      <h3 key={index} className="text-lg font-bold text-[#111]">
                        {block.text}
                      </h3>
                    )
                  }

                  if (block.type === 'paragraph') {
                    return (
                      <p key={index} className="text-sm leading-7 text-[#4F4F4F]">
                        {parseInline(block.text)}
                      </p>
                    )
                  }

                  if (block.type === 'list') {
                    return (
                      <ul key={index} className="space-y-2 pl-5 text-sm leading-7 text-[#4F4F4F]">
                        {block.items.map((item) => (
                          <li key={item} className="list-disc">
                            {parseInline(item)}
                          </li>
                        ))}
                      </ul>
                    )
                  }

                  if (block.type === 'table') {
                    const [header, ...rows] = block.rows
                    return (
                      <div key={index} className="overflow-x-auto rounded-2xl border border-[#ECECEC]">
                        <table className="min-w-full divide-y divide-[#ECECEC] text-sm">
                          <thead className="bg-[#FAFAFA]">
                            <tr>
                              {header.map((cell) => (
                                <th
                                  key={cell}
                                  className="px-4 py-3 text-left font-semibold text-[#111]"
                                >
                                  {parseInline(cell)}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#F1F1F1]">
                            {rows.map((row, rowIndex) => (
                              <tr key={`${row.join('-')}-${rowIndex}`}>
                                {row.map((cell, cellIndex) => (
                                  <td key={`${cell}-${cellIndex}`} className="px-4 py-3 text-[#4F4F4F]">
                                    {parseInline(cell)}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )
                  }

                  if (block.type === 'code') {
                    return (
                      <CodeBlock
                        key={index}
                        language={block.language}
                        code={block.code}
                      />
                    )
                  }

                  return null
                })}
              </div>
            ) : null}

            {activeTab === 'Quiz' ? (
              <div className="space-y-4">
                {lesson.quiz?.length ? (
                  lesson.quiz.map((item, index) => (
                    <div key={item.question} className="rounded-2xl border border-[#ECECEC] p-5">
                      <p className="text-sm font-semibold text-[#111]">
                        {index + 1}. {item.question}
                      </p>
                      <div className="mt-4 grid gap-2">
                        {item.options.map((option, optionIndex) => (
                          <div
                            key={option}
                            className={`rounded-xl border px-4 py-3 text-sm ${
                              optionIndex === item.correctIndex
                                ? 'border-[#7AE84A] bg-[#F4FBEF] text-[#111]'
                                : 'border-[#ECECEC] text-[#666]'
                            }`}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-[#666]">No quiz is available for this lesson yet.</p>
                )}
              </div>
            ) : null}

            {activeTab === 'Challenge' ? (
              lesson.challenge ? (
                <div className="text-sm leading-7 text-[#4F4F4F]">
                  {parseInline(lesson.challenge)}
                </div>
              ) : (
                <p className="text-sm text-[#666]">
                  No challenge has been added for this lesson yet.
                </p>
              )
            ) : null}

            <div className="mt-8 flex items-center justify-between border-t border-[#F0F0F0] pt-6">
              <button
                onClick={() =>
                  previousLesson &&
                  navigate(`/dashboard/roadmaps/${roadmap.slug}/${previousLesson.id}`)
                }
                disabled={!previousLesson}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#666] transition-colors hover:text-[#111] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={16} />
                Previous Lesson
              </button>

              <button
                onClick={() =>
                  nextLesson && navigate(`/dashboard/roadmaps/${roadmap.slug}/${nextLesson.id}`)
                }
                disabled={!nextLesson}
                className="inline-flex items-center gap-2 rounded-full bg-[#7AE84A] px-5 py-2.5 text-sm font-bold text-black transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {nextLesson ? 'Next Lesson' : 'Completed'}
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </main>

        <aside className="hidden w-80 shrink-0 lg:block">
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
                  <div
                    className="h-full rounded-full bg-[#7AE84A]"
                    style={{ width: `${roadmap.progress}%` }}
                  />
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
                    isActive={moduleLesson.id === lesson.id}
                    onOpen={(lessonId) =>
                      navigate(`/dashboard/roadmaps/${roadmap.slug}/${lessonId}`)
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
