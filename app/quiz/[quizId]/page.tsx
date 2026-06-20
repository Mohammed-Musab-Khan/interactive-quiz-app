"use client"

import React, { use, useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { QUIZZES } from "@/lib/quizData"
import { useQuizStore } from "@/hooks/useQuizStore"
import { getSoundManager } from "@/lib/SoundManager"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"

interface PageProps {
  params: Promise<{ quizId: string }>
}

export default function QuizPlayPage(props: PageProps) {
  const params = use(props.params)
  const quizId = params.quizId
  const router = useRouter()

  const { activeQuizzes, saveQuizProgress, completeQuiz } = useQuizStore()
  
  const [mounted, setMounted] = useState(false)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]) // track selections for each question
  const [activeSelection, setActiveSelection] = useState<number | null>(null) // current question selection
  const [isMuted, setIsMuted] = useState(false)

  // Find quiz info
  const quiz = QUIZZES.find((q) => q.id === quizId)

  // Initialize state
  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setMounted(true)
      const sm = getSoundManager()
      if (sm) {
        setIsMuted(sm.getMuteStatus())
      }

      if (quiz) {
        const saved = activeQuizzes[quizId]
        if (saved) {
          // Resume saved progress
          setCurrentIdx(saved.currentQuestionIndex)
          setScore(saved.score)
          setSelectedAnswers(saved.selectedAnswers)
        }
      }
    })
    return () => cancelAnimationFrame(handle)
  }, [quizId, quiz, activeQuizzes])

  if (!mounted) {
    return null
  }

  if (!quiz) {
    return (
      <div className="flex h-screen items-center justify-center bg-background text-on-background">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold">Quiz not found</h2>
          <Link href="/" className="mt-4 inline-block text-primary hover:underline">
            Go Home
          </Link>
        </div>
      </div>
    )
  }

  const questions = quiz.questions
  const currentQuestion = questions[currentIdx]
  
  // Progress calculations
  const totalQuestions = questions.length
  const progressPercent = Math.round((currentIdx / totalQuestions) * 100)
  const hasAnswered = activeSelection !== null || (selectedAnswers[currentIdx] !== undefined)

  const handleSelectOption = (optionIndex: number) => {
    if (hasAnswered) return // prevent re-selection

    setActiveSelection(optionIndex)
    const isCorrect = optionIndex === currentQuestion.correctAnswer
    const newScore = isCorrect ? score + 1 : score
    const newSelectedAnswers = [...selectedAnswers]
    newSelectedAnswers[currentIdx] = optionIndex

    setScore(newScore)
    setSelectedAnswers(newSelectedAnswers)

    // Play synthesized sound effects
    const sm = getSoundManager()
    if (sm) {
      if (isCorrect) {
        sm.playCorrect()
      } else {
        sm.playIncorrect()
      }
    }

    // Save in progress store
    saveQuizProgress(
      quizId,
      currentIdx,
      newScore,
      newSelectedAnswers
    )
  }

  const handleNext = () => {
    if (currentIdx + 1 < totalQuestions) {
      setCurrentIdx(currentIdx + 1)
      setActiveSelection(null)
      // Save next index
      saveQuizProgress(
        quizId,
        currentIdx + 1,
        score,
        selectedAnswers
      )
    } else {
      // Quiz completed!
      const sm = getSoundManager()
      if (sm) {
        sm.playComplete()
      }
      
      const scorePercent = Math.round((score / totalQuestions) * 100)
      
      // Complete quiz and award XP
      completeQuiz(quizId, scorePercent, quiz.xpAward)
      
      // Save stats or route to results
      router.push(`/quiz/${quizId}/results?score=${score}&total=${totalQuestions}`)
    }
  }

  const toggleMute = () => {
    const sm = getSoundManager()
    if (sm) {
      const m = sm.toggleMute()
      setIsMuted(m)
    }
  }

  // Determine current active answer index
  const savedAnswerIndex = selectedAnswers[currentIdx]
  const currentSelection = activeSelection !== null ? activeSelection : savedAnswerIndex

  return (
    <div className="min-h-screen bg-background text-on-background py-8 px-4 flex flex-col justify-between selection:bg-primary-fixed">
      {/* Top Header */}
      <header className="max-w-3xl w-full mx-auto flex items-center justify-between gap-4 mb-6">
        <Button
          onClick={() => {
            if (confirm("Your progress will be saved. Exit to dashboard?")) {
              router.push("/")
            }
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-display text-xs font-bold transition-all active:scale-95 h-auto border-0"
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
          Save & Exit
        </Button>

        <h2 className="font-display text-sm font-extrabold text-on-surface-variant truncate max-w-[50%]">
          {quiz.title}
        </h2>

        <Button
          onClick={toggleMute}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container hover:bg-surface-container-high text-primary dark:text-primary-fixed transition-colors border-0"
          aria-label="Toggle sound"
          size="icon"
        >
          <span className="material-symbols-outlined text-[22px]">
            {isMuted ? "volume_off" : "volume_up"}
          </span>
        </Button>
      </header>

      {/* Main Container */}
      <main className="max-w-3xl w-full mx-auto flex-1 flex flex-col justify-center gap-6 animate-pop-in">
        
        {/* Progress Tracker */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-end">
            <span className="font-display text-xs font-bold text-on-surface-variant uppercase tracking-wider">
              Question {currentIdx + 1} of {totalQuestions}
            </span>
            <span className="font-display text-xs font-bold text-primary dark:text-primary-fixed-dim">
              Score: {score}/{totalQuestions}
            </span>
          </div>

          <Progress value={progressPercent} className="h-3.5 bg-surface-container rounded-full border border-outline-variant/20 p-[2px] [&_[data-slot=progress-indicator]]:progress-gradient" />
        </div>

        {/* Question Panel */}
        <Card className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-6 ring-0">
          <CardContent className="p-0 flex flex-col gap-6">
            <h1 className="font-display text-xl md:text-2xl font-extrabold text-on-surface leading-tight">
              {currentQuestion.text}
            </h1>

            {/* Multiple Choice Options */}
            <div className="flex flex-col gap-4">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = currentSelection === idx
                const isCorrectAnswer = currentQuestion.correctAnswer === idx
                const answered = currentSelection !== undefined

                let btnStyle = "chunky-btn-secondary bg-surface-container-lowest hover:bg-surface-container-low text-on-surface border-outline-variant"
                let icon = null

                if (answered) {
                  if (isSelected) {
                    if (isCorrectAnswer) {
                      btnStyle = "border-tertiary bg-tertiary-container/25 text-on-tertiary-fixed-variant border-b-4 font-bold"
                      icon = <span className="material-symbols-outlined text-tertiary shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    } else {
                      btnStyle = "border-error bg-error-container/25 text-on-error-container border-b-4 font-bold"
                      icon = <span className="material-symbols-outlined text-error shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>cancel</span>
                    }
                  } else if (isCorrectAnswer) {
                    // Highlight the correct answer even if the user didn't choose it
                    btnStyle = "border-tertiary/60 bg-tertiary-fixed/20 text-on-tertiary-fixed-variant border-2 border-dashed"
                    icon = <span className="material-symbols-outlined text-tertiary/75 shrink-0">check</span>
                  } else {
                    // Other unselected options when answered
                    btnStyle = "opacity-40 bg-surface-container-lowest border-outline-variant/30 text-on-surface-variant"
                  }
                }

                return (
                  <Button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={answered}
                    className={`w-full py-4 px-6 rounded-2xl flex items-center justify-between text-left font-sans text-base transition-all duration-150 h-auto ${btnStyle} ${
                      !answered ? "cursor-pointer active:translate-y-0.5" : "pointer-events-none"
                    }`}
                  >
                    <span className="font-medium whitespace-normal break-words pr-2">{option}</span>
                    {icon}
                  </Button>
                )
              })}
            </div>

            {/* Answer Explanation */}
            {currentSelection !== undefined && (
              <Card className="mt-2 p-5 rounded-2xl bg-surface-container-low border border-outline-variant/20 animate-slide-in ring-0">
                <CardContent className="p-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      info
                    </span>
                    <span className="font-display text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                      Did you know?
                    </span>
                  </div>
                  <p className="font-sans text-sm text-on-surface-variant leading-relaxed font-medium">
                    {currentQuestion.explanation}
                  </p>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Bottom Action Footer */}
      <footer className="max-w-3xl w-full mx-auto flex justify-end mt-6">
        {currentSelection !== undefined && (
          <Button
            onClick={handleNext}
            className="chunky-btn bg-primary text-on-primary font-display text-base px-8 py-3 rounded-full flex items-center gap-2 font-bold cursor-pointer hover:scale-105 active:scale-95 transition-transform h-auto border-0"
          >
            {currentIdx + 1 === totalQuestions ? "See Results" : "Next Question"}
            <span className="material-symbols-outlined text-[20px]">
              {currentIdx + 1 === totalQuestions ? "assessment" : "arrow_forward"}
            </span>
          </Button>
        )}
      </footer>
    </div>
  )
}
