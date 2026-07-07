const READING_LINE_WIDTHS = ['w-full', 'w-[96%]', 'w-[94%]', 'w-full', 'w-[88%]', 'w-[92%]']
const QUIZ_OPTION_WIDTHS = ['w-full', 'w-[94%]', 'w-[88%]', 'w-[92%]']

export default function LessonLoadingPlaceholder({ variant = 'reading' }) {
  if (variant === 'quiz') {
    return (
      <div className="animate-pulse space-y-4" aria-busy="true" aria-label="Generating quiz">
        <p className="text-sm font-medium text-[#8A8A8A]">Generating quiz...</p>
        <div className="h-4 w-28 rounded bg-[#ECECEC]" />
        <div className="h-5 w-4/5 rounded bg-[#EFEFEF]" />
        <div className="mt-4 space-y-2.5">
          {QUIZ_OPTION_WIDTHS.map((width, index) => (
            <div key={index} className={`h-12 rounded-xl bg-[#F3F3F3] ${width}`} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="animate-pulse space-y-6" aria-busy="true" aria-label="Generating lesson content">
      <p className="text-sm font-medium text-[#8A8A8A]">Generating lesson content...</p>
      <div className="h-7 w-2/5 rounded bg-[#EFEFEF]" />
      <div className="space-y-3">
        {READING_LINE_WIDTHS.map((width, index) => (
          <div key={index} className={`h-4 rounded bg-[#F3F3F3] ${width}`} />
        ))}
      </div>
      <div className="h-6 w-1/3 rounded bg-[#EFEFEF]" />
      <div className="space-y-3">
        {['w-full', 'w-[90%]', 'w-[95%]', 'w-[72%]'].map((width, index) => (
          <div key={index} className={`h-4 rounded bg-[#F3F3F3] ${width}`} />
        ))}
      </div>
    </div>
  )
}
