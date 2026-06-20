"use client"

import React, { use, useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { QUIZZES } from "@/lib/quizData"
import { useQuizStore } from "@/hooks/useQuizStore"
import { Confetti } from "@/components/Confetti"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface PageProps {
  params: Promise<{ quizId: string }>
  searchParams: Promise<{ score?: string; total?: string }>
}

export default function QuizResultsPage(props: PageProps) {
  const params = use(props.params)
  const searchParams = use(props.searchParams)
  
  const quizId = params.quizId
  const score = Number(searchParams.score || "0")
  const total = Number(searchParams.total || "5")

  const router = useRouter()
  const { profile, clearQuizProgress } = useQuizStore()
  const [mounted, setMounted] = useState(false)

  const quiz = QUIZZES.find((q) => q.id === quizId)

  useEffect(() => {
    const handle = requestAnimationFrame(() => setMounted(true))
    // Clean up active in-progress saves upon landing here
    clearQuizProgress(quizId)
    return () => cancelAnimationFrame(handle)
  }, [quizId, clearQuizProgress])

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

  const accuracy = Math.round((score / total) * 100)
  
  // Custom congratulatory message based on accuracy
  let headline = "Spectacular Finish!"
  let subheadline = "You've mastered this topic. Keep the momentum going to reach the next rank."
  let streakMessage = "Streak safe! You're on fire!"

  if (accuracy === 100) {
    headline = "Perfect Score! 🏆"
    subheadline = "Incredible! You didn't get a single question wrong. You are a true master!"
  } else if (accuracy >= 70) {
    headline = "Spectacular Finish! 🎉"
    subheadline = "Excellent work! You demonstrated strong understanding of this topic."
  } else if (accuracy >= 50) {
    headline = "Good Effort! 👍"
    subheadline = "You passed! Review the explanations below to patch up any knowledge gaps."
    streakMessage = "Streak saved! Keep studying!"
  } else {
    headline = "Keep Learning! 💪"
    subheadline = "A good attempt, but there is room to grow. Try again to boost your score!"
    streakMessage = "Study complete! Don't let your streak expire!"
  }

  const handlePlayAgain = () => {
    // Navigate back to live quiz (state was already cleared in useEffect)
    router.push(`/quiz/${quizId}`)
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen relative overflow-x-hidden font-sans selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Fullscreen Confetti Effect */}
      {accuracy >= 50 && <Confetti />}

      {/* Decorative subtle background pattern */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#0056c5_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />

      {/* Main Layout */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12 min-h-screen flex flex-col justify-center gap-8">
        
        {/* Header Section */}
        <header className="text-center animate-slide-in">
          <Badge variant="outline" className="inline-block bg-secondary-fixed/20 text-on-secondary-container border border-secondary-fixed-dim/20 font-display text-xs font-bold px-4 py-1.5 rounded-full mb-4 h-auto">
            Level {profile.level} Complete!
          </Badge>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold text-primary dark:text-primary-fixed-dim tracking-tight">
            {headline}
          </h1>
          <p className="font-sans text-base md:text-lg text-on-surface-variant mt-2 max-w-xl mx-auto font-medium">
            {subheadline}
          </p>
        </header>

        {/* Bento Grid Results Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full animate-pop-in">
          
          {/* Score Card */}
          <Card className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center text-center ring-0">
            <CardContent className="p-0 flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-[36px] text-primary mb-2">
                emoji_events
              </span>
              <div className="font-display text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                Final Score
              </div>
              <div className="font-display text-3xl font-extrabold text-on-surface mt-1">
                {score} / {total}
              </div>
              <div className="text-xs text-on-surface-variant font-semibold mt-1">
                {accuracy}% Accuracy
              </div>
            </CardContent>
          </Card>

          {/* XP Reward Card */}
          <Card className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center text-center ring-0">
            <CardContent className="p-0 flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-[36px] text-secondary mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>
                stars
              </span>
              <div className="font-display text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                XP Gained
              </div>
              <div className="font-display text-3xl font-extrabold text-secondary mt-1">
                +{quiz.xpAward} XP
              </div>
              <div className="text-xs text-on-surface-variant font-semibold mt-1">
                New Level: {profile.level}
              </div>
            </CardContent>
          </Card>

          {/* Streak Booster Card */}
          <Card className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center text-center sm:col-span-2 md:col-span-1 ring-0">
            <CardContent className="p-0 flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-[36px] text-error mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>
                local_fire_department
              </span>
              <div className="font-display text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                Streak Boost
              </div>
              <div className="font-display text-3xl font-extrabold text-on-surface mt-1">
                {profile.streak} Days
              </div>
              <div className="text-xs text-on-surface-variant font-semibold mt-1">
                {streakMessage}
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 animate-slide-in">
          <Button
            onClick={handlePlayAgain}
            className="chunky-btn bg-primary text-on-primary font-display text-sm px-8 py-3 rounded-full flex items-center gap-2 font-bold cursor-pointer hover:scale-105 active:scale-95 transition-transform h-auto border-0"
          >
            Play Again
            <span className="material-symbols-outlined text-[18px]">replay</span>
          </Button>
          
          <Button
            asChild
            className="chunky-btn-secondary bg-surface-container-lowest text-on-surface font-display text-sm px-8 py-3 rounded-full flex items-center gap-2 font-bold hover:scale-105 active:scale-95 transition-transform h-auto border-outline-variant border"
          >
            <Link href="/categories">
              Another Topic
              <span className="material-symbols-outlined text-[18px]">grid_view</span>
            </Link>
          </Button>

          <Button
            asChild
            className="chunky-btn-secondary bg-surface-container-lowest text-on-surface font-display text-sm px-8 py-3 rounded-full flex items-center gap-2 font-bold hover:scale-105 active:scale-95 transition-transform h-auto border-outline-variant border"
          >
            <Link href="/">
              Dashboard
              <span className="material-symbols-outlined text-[18px]">home</span>
            </Link>
          </Button>
        </div>

        {/* Review Section */}
        <section className="mt-4 animate-pop-in">
          <h2 className="font-display text-xl font-extrabold text-on-surface mb-4">
            Question Review
          </h2>

          <div className="flex flex-col gap-6">
            {quiz.questions.map((q, idx) => {
              return (
                <Card
                  key={q.id}
                  className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-sm flex flex-col gap-3 ring-0"
                >
                  <CardContent className="p-0 flex flex-col gap-3">
                    <div className="flex items-start gap-3">
                      <span className="font-display text-sm font-bold text-on-surface-variant shrink-0 mt-0.5">
                        Q{idx + 1}.
                      </span>
                      <h3 className="font-display text-base font-bold text-on-surface leading-tight">
                        {q.text}
                      </h3>
                    </div>

                    <div className="pl-8 flex flex-col gap-2">
                      {q.options.map((opt, oIdx) => {
                        const isCorrectAnswer = q.correctAnswer === oIdx
                        let optionStyle = "border-outline-variant/20 bg-surface-container-low text-on-surface-variant"
                        let checkIcon = null

                        if (isCorrectAnswer) {
                          optionStyle = "border-tertiary/40 bg-tertiary-container/10 text-on-tertiary-fixed-variant font-semibold"
                          checkIcon = <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        }

                        return (
                          <div
                            key={oIdx}
                            className={`px-4 py-2 border rounded-xl flex items-center justify-between text-xs ${optionStyle}`}
                          >
                            <span>{opt}</span>
                            {checkIcon}
                          </div>
                        )
                      })}
                    </div>

                    <div className="pl-8 mt-1 p-4 rounded-xl bg-surface-container-low border border-outline-variant/20">
                      <p className="font-sans text-xs text-on-surface-variant leading-relaxed font-semibold">
                        💡 {q.explanation}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

      </main>
    </div>
  )
}
