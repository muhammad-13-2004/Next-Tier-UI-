import React from 'react'
import LessonLoadingPlaceholder from './LessonLoadingPlaceholder'

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

  if (quizLoading) {
    return <LessonLoadingPlaceholder variant="quiz" />
  }

  return (
    <div className="space-y-4">
      {quizError ? <p className="text-sm text-red-600">{quizError}</p> : null}

      {currentItem ? (
        <div className="p-1">
          <p className="text-xs font-semibold text-[#666] mb-2">
            Question {currentQuizIndex + 1} of {totalQuiz}
          </p>
          <p className="text-base font-semibold text-[#111]">{currentItem.question}</p>

          <div className="mt-4 grid gap-2">
            {(Array.isArray(currentItem.options) ? currentItem.options : []).map((option, optionIndex) => {
              const isSelected = selectedAnswers[currentQuizIndex] === optionIndex
              const isCorrect = quizSubmitted && optionIndex === currentItem.correctIndex
              const isWrongSelection =
                quizSubmitted && isSelected && optionIndex !== currentItem.correctIndex

              return (
                <button
                  key={`${option}-${optionIndex}`}
                  type="button"
                  onClick={() => onSelectAnswer(currentQuizIndex, optionIndex)}
                  disabled={quizSubmitted}
                  className={`rounded-xl px-4 py-3 text-sm text-left transition-all ${
                    isCorrect
                      ? 'border-2 border-[#7AE84A] bg-[#F4FBEF] text-[#111]'
                      : isWrongSelection
                      ? 'border-2 border-[#F87171] bg-[#FEF2F2] text-[#111]'
                      : isSelected
                      ? 'border-2 border-[#7AE84A] bg-[#F4FBEF] text-[#111] shadow-sm'
                      : 'border border-[#ECECEC] text-[#666] hover:border-[#D0D0D0] hover:bg-[#FAFAFA]'
                  }`}
                >
                  {option}
                </button>
              )
            })}
          </div>

          {currentQuizIndex > 0 && !quizSubmitted ? (
            <button
              type="button"
              onClick={() => setCurrentQuizIndex((index) => Math.max(0, index - 1))}
              className="mt-5 text-xs font-semibold text-[#666] transition-colors hover:text-[#111]"
            >
              Previous question
            </button>
          ) : null}
        </div>
      ) : (
        <p className="text-sm text-[#666]">No quiz is available for this lesson yet.</p>
      )}

      {quizSubmitted && totalQuiz > 0 ? (
        <div className="rounded-xl bg-[#FAFAFA] px-4 py-3 text-sm font-semibold text-[#111]">
          Score: {quizScore} / {totalQuiz}
        </div>
      ) : null}
    </div>
  )
}
