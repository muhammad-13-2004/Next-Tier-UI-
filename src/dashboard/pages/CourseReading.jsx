import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCourseStore } from '@/store/courseStore'
import { api } from '@/services/api'
import { parseContentBlocks } from '@/dashboard/features/roadmap/utils/lessonContent.jsx'
import { extractQuizItems } from '@/dashboard/features/roadmap/utils/quiz'
import ReadingTabContent from '@/dashboard/features/roadmap/components/ReadingTabContent'
import QuizTabContent from '@/dashboard/features/roadmap/components/QuizTabContent'
import LessonSidebar from '@/dashboard/features/roadmap/components/LessonSidebar'

function findLessonDetails(courses, roadmapSlug, lessonId) {
  const roadmap = courses.find((item) => String(item.slug) === String(roadmapSlug))

  if (roadmap) {
    for (const module of roadmap.modules ?? []) {
      const lessonIndex = (module.lessons ?? []).findIndex((lesson) => String(lesson.id) === String(lessonId))
      if (lessonIndex !== -1) {
        return { roadmap, module, lesson: module.lessons[lessonIndex], lessonIndex }
      }
    }
  }

  const fallbackRoadmap = courses[0]
  const fallbackModule = fallbackRoadmap?.modules?.[0]
  const fallbackLesson = fallbackModule?.lessons?.[0]

  return { roadmap: fallbackRoadmap, module: fallbackModule, lesson: fallbackLesson, lessonIndex: 0 }
}

export default function CourseReadingTab() {
  const { slug, id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Reading')

  const courses = useCourseStore((s) => s.courses)
  const loadCourse = useCourseStore((s) => s.loadCourse)
  const activeCourse = useCourseStore((s) => s.activeCourse)
  const loading = useCourseStore((s) => s.loading)

  const [generatedContent, setGeneratedContent] = useState('')
  const [contentLoading, setContentLoading] = useState(false)

  const [quizItems, setQuizItems] = useState([])
  const [quizLoading, setQuizLoading] = useState(false)
  const [quizError, setQuizError] = useState('')
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const [lessonCompleting, setLessonCompleting] = useState(false)
  const [lessonCompleted, setLessonCompleted] = useState(false)

  useEffect(() => {
    if (!slug) return
    const selected = courses.find((item) => String(item.slug) === String(slug))
    const hasLessons =
      (selected?.modules?.some((m) => (m?.lessons?.length ?? 0) > 0) ?? false) ||
      (String(activeCourse?.slug) === String(slug) &&
        (activeCourse?.modules?.some((m) => (m?.lessons?.length ?? 0) > 0) ?? false))

    if (!hasLessons) loadCourse(slug)
  }, [slug, courses, activeCourse, loadCourse])

  const courseSource = useMemo(() => {
    if (String(activeCourse?.slug) === String(slug) && activeCourse?.modules?.length) {
      return [activeCourse, ...courses.filter((c) => String(c.slug) !== String(activeCourse.slug))]
    }
    return courses
  }, [courses, activeCourse, slug])

  const { roadmap, module, lesson, lessonIndex } = useMemo(
    () => findLessonDetails(courseSource, slug, id),
    [courseSource, slug, id],
  )

  const moduleLessons = module?.lessons ?? []
  const previousLesson = lessonIndex > 0 ? moduleLessons[lessonIndex - 1] : null
  const nextLesson = lessonIndex < moduleLessons.length - 1 ? moduleLessons[lessonIndex + 1] : null

  useEffect(() => {
    setQuizItems([])
    setQuizError('')
    setSelectedAnswers({})
    setCurrentQuizIndex(0)
    setQuizSubmitted(false)
    setQuizScore(0)
    setLessonCompleted(false)
    setActiveTab('Reading')
  }, [lesson?.id])

  useEffect(() => {
    let isMounted = true

    const loadLessonContent = async () => {
      if (!roadmap || !module || !lesson) return
      if (lesson.content) {
        setGeneratedContent('')
        return
      }

      setContentLoading(true)
      try {
        const response = await api.generateContent({
          lesson_id: lesson.id,
          course_title: roadmap.title,
          module_title: module.title,
          lesson_title: lesson.title,
          lesson_position: lesson.position,
          module_position: module.position,
          complexity: roadmap.complexity ?? 'beginner',
          goal: roadmap.goal ?? '',
        })

        const content = response?.content ?? response?.data?.content ?? response?.lesson?.content ?? ''
        if (isMounted) setGeneratedContent(content)
      } catch {
        if (isMounted) setGeneratedContent('')
      } finally {
        if (isMounted) setContentLoading(false)
      }
    }

    loadLessonContent()
    return () => {
      isMounted = false
    }
  }, [roadmap?.id, roadmap?.title, roadmap?.complexity, roadmap?.goal, module?.id, module?.title, module?.position, lesson?.id, lesson?.title, lesson?.position, lesson?.content])

  useEffect(() => {
    let isMounted = true

    const loadQuiz = async () => {
      if (activeTab !== 'Quiz' || !lesson?.id || quizItems.length > 0) return

      setQuizLoading(true)
      setQuizError('')
      try {
        const response = await api.generateQuiz({ lesson_id: lesson.id })
        const items = extractQuizItems(response)

        if (isMounted) setQuizItems(items)
        if (isMounted && items.length === 0) {
          setQuizError('Quiz response received but quiz list is empty.')
        }
      } catch (err) {
        if (isMounted) setQuizError(err?.message || 'Failed to generate quiz.')
      } finally {
        if (isMounted) setQuizLoading(false)
      }
    }

    loadQuiz()
    return () => {
      isMounted = false
    }
  }, [activeTab, lesson?.id, quizItems.length])

  const resolvedContent = generatedContent || lesson?.content || ''
  const contentBlocks = parseContentBlocks(resolvedContent)
  const totalQuiz = quizItems.length
  const answeredQuiz = Object.keys(selectedAnswers).length
  const canSubmitQuiz = totalQuiz > 0 && answeredQuiz === totalQuiz
  const canProceedToNext = lessonCompleted || !nextLesson

  const handleSelectAnswer = (questionIndex, optionIndex) => {
    if (quizSubmitted) return
    setSelectedAnswers((prev) => {
      const next = { ...prev, [questionIndex]: optionIndex }
      if (questionIndex < totalQuiz - 1) {
        setCurrentQuizIndex(questionIndex + 1)
      }
      return next
    })
  }

  const handleSubmitQuiz = async () => {
    if (!canSubmitQuiz || quizSubmitted || !lesson?.id) return

    const correct = quizItems.reduce((acc, item, idx) => acc + (selectedAnswers[idx] === item.correctIndex ? 1 : 0), 0)
    setQuizScore(correct)
    setQuizSubmitted(true)

    setLessonCompleting(true)
    try {
      await api.completeLesson({
        lesson_id: lesson.id,
        quiz_score: correct,
        xp_earned: Number(lesson?.xp_reward ?? 0),
      })
      setLessonCompleted(true)
    } catch {
      setLessonCompleted(false)
    } finally {
      setLessonCompleting(false)
    }
  }

  const handlePrimaryAction = () => {
    if (activeTab !== 'Quiz') {
      setActiveTab('Quiz')
      return
    }
    if (!quizSubmitted) {
      handleSubmitQuiz()
      return
    }
    if (nextLesson && canProceedToNext) {
      navigate(`/dashboard/roadmaps/${roadmap.slug}/${nextLesson.id}`)
    }
  }

  if (loading && (!roadmap || !module || !lesson)) {
    return <div className="min-h-screen bg-[#F7F7F5] flex items-center justify-center"><p className="text-sm text-[#666]">Loading lesson...</p></div>
  }

  if (!roadmap || !module || !lesson) {
    return (
      <div className="min-h-screen bg-[#F7F7F5] flex items-center justify-center px-6 text-center">
        <p className="text-sm text-[#666]">Lesson not found yet. Please go back to My Roadmaps and open this lesson again.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen h-auto">
      <header className="sticky top-0 z-20 border-b border-[#E9E9E9] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <div className="flex min-w-0 items-center gap-4">
            <button onClick={() => navigate(`/dashboard/roadmaps/${roadmap.slug}`)} className="inline-flex items-center gap-2 rounded-full border border-[#E5E5E5] px-3 py-1.5 text-xs font-semibold text-[#111] transition-colors hover:bg-[#F7F7F7]"><ChevronLeft size={14} />Back</button>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold uppercase tracking-[0.16em] text-[#8A8A8A]">{roadmap.title}</p>
              <p className="truncate text-sm font-semibold text-[#111]">{module.title}</p>
            </div>
          </div>
          <div className="rounded-full bg-[#111] px-3 py-1.5 text-xs font-bold text-white">+{lesson.xp_reward} XP</div>
        </div>
      </header>

      <div className="h-full mx-auto flex max-w-7xl gap-8 px-6 py-8">
        <main className="min-w-0 flex-1">
          <div className="mb-6">
            <span className="inline-flex rounded-full border border-[#DDEFCF] bg-[#F3FBEA] px-3 py-1 text-xs font-semibold text-[#4F8A24]">Lesson {lesson.position}</span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#111]">{lesson.title}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-[#666]">{module.subtitle}</p>
          </div>

          <div className="mb-6 flex w-fit rounded-2xl bg-[#EFEFEF] p-1">
            {['Reading', 'Quiz'].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`rounded-xl px-5 py-2 text-sm font-semibold transition-all ${activeTab === tab ? 'bg-white text-[#111] shadow-sm' : 'text-[#777] hover:text-[#111]'}`}>{tab}</button>
            ))}
          </div>

          <div className="rounded-[24px] border border-[#E9E9E9] bg-white p-7">
            {activeTab === 'Reading' ? <ReadingTabContent contentLoading={contentLoading} contentBlocks={contentBlocks} /> : null}
            {activeTab === 'Quiz' ? (
              <QuizTabContent
                quizLoading={quizLoading}
                quizError={quizError}
                quizItems={quizItems}
                currentQuizIndex={currentQuizIndex}
                setCurrentQuizIndex={setCurrentQuizIndex}
                selectedAnswers={selectedAnswers}
                quizSubmitted={quizSubmitted}
                quizScore={quizScore}
                onSelectAnswer={handleSelectAnswer}
              />
            ) : null}

            <div className="mt-8 flex items-center justify-between border-t border-[#F0F0F0] pt-6">
              <button
                onClick={() => previousLesson && navigate(`/dashboard/roadmaps/${roadmap.slug}/${previousLesson.id}`)}
                disabled={!previousLesson}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#666] transition-colors hover:text-[#111] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={16} />Previous Lesson
              </button>

              <button
                onClick={handlePrimaryAction}
                disabled={(activeTab === 'Quiz' && !quizSubmitted && !canSubmitQuiz) || lessonCompleting || (activeTab === 'Quiz' && quizSubmitted && !canProceedToNext)}
                className="inline-flex items-center gap-2 rounded-full bg-[#7AE84A] px-5 py-2.5 text-sm font-bold text-black transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {activeTab !== 'Quiz' ? 'Go to Quiz' : !quizSubmitted ? 'Submit Quiz' : lessonCompleting ? 'Completing Lesson...' : nextLesson ? 'Next Lesson' : 'Completed'}
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </main>

        <LessonSidebar
          roadmap={roadmap}
          module={module}
          moduleLessons={moduleLessons}
          lessonId={lesson.id}
          onOpenLesson={(lessonId) => navigate(`/dashboard/roadmaps/${roadmap.slug}/${lessonId}`)}
        />
      </div>
    </div>
  )
}
