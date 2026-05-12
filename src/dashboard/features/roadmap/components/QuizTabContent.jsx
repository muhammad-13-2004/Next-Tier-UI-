import React from 'react'

export default function QuizTabContent({
  quizLoading,
  quizError,
  quizItems,
  currentQuizIndex,
  setCurrentQuizIndex,
  selectedAnswers,
  quizSubmitted,
  quizScore,
  onSelectAnswer,
}) {
  const totalQuiz = quizItems.length
  const currentItem = quizItems[currentQuizIndex]

  return (
    <div className="space-y-4">
      {quizLoading ? <p className="text-sm text-[#666]">Generating quiz...</p> : null}
      {quizError ? <p className="text-sm text-red-600">{quizError}</p> : null}
      {currentItem ? (
        <div className="rounded-2xl border border-[#ECECEC] p-5">
          <p className="text-xs font-semibold text-[#666] mb-2">
            Question {currentQuizIndex + 1} of {totalQuiz}
          </p>
          <p className="text-sm font-semibold text-[#111]">{currentItem.question}</p>
          <div className="mt-4 grid gap-2">
            {(Array.isArray(currentItem.options) ? currentItem.options : []).map((option, optionIndex) => (
              <button
                key={`${option}-${optionIndex}`}
                onClick={() => onSelectAnswer(currentQuizIndex, optionIndex)}
                disabled={quizSubmitted}
                className={`rounded-xl border px-4 py-3 text-sm text-left ${
                  quizSubmitted && optionIndex === currentItem.correctIndex
                    ? 'border-[#7AE84A] bg-[#F4FBEF] text-[#111]'
                    : selectedAnswers[currentQuizIndex] === optionIndex
                    ? 'border-[#111] bg-[#FAFAFA] text-[#111]'
                    : 'border-[#ECECEC] text-[#666]'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between mt-5">
            <button
              onClick={() => setCurrentQuizIndex((i) => Math.max(0, i - 1))}
              disabled={currentQuizIndex === 0}
              className="text-xs font-semibold text-[#666] disabled:opacity-40"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentQuizIndex((i) => Math.min(totalQuiz - 1, i + 1))}
              disabled={currentQuizIndex >= totalQuiz - 1}
              className="text-xs font-semibold text-[#666] disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      ) : !quizLoading ? (
        <p className="text-sm text-[#666]">No quiz is available for this lesson yet.</p>
      ) : null}

      {quizSubmitted && totalQuiz > 0 ? (
        <div className="rounded-xl border border-[#ECECEC] bg-[#FAFAFA] px-4 py-3 text-sm font-semibold text-[#111]">
          Score: {quizScore} / {totalQuiz}
        </div>
      ) : null}
    </div>
  )
}
