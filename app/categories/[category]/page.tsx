"use client"

import React, { use, useState, useEffect } from "react"
import Link from "next/link"
import { Sidebar } from "@/components/Sidebar"
import { QUIZZES, CATEGORIES } from "@/lib/quizData"
import { useQuizStore } from "@/hooks/useQuizStore"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface PageProps {
  params: Promise<{ category: string }>
  searchParams: Promise<{ diff?: string }>
}

export default function CategoryQuizzesPage(props: PageProps) {
  const params = use(props.params)
  const searchParams = use(props.searchParams)
  const categoryId = params.category
  const diffFilter = searchParams.diff || "all"

  const { completedQuizzes, activeQuizzes } = useQuizStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const handle = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(handle)
  }, [])

  if (!mounted) {
    return null
  }

  // Find category details
  const category = CATEGORIES.find((c) => c.id === categoryId)
  if (!category) {
    return (
      <div className="flex h-screen items-center justify-center bg-background text-on-background">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold">Category not found</h2>
          <Link href="/categories" className="mt-4 inline-block text-primary hover:underline">
            Back to Categories
          </Link>
        </div>
      </div>
    )
  }

  // Filter quizzes
  const filteredQuizzes = QUIZZES.filter((quiz) => {
    const categoryMatch = quiz.category === categoryId
    const difficultyMatch = diffFilter === "all" || quiz.difficulty === diffFilter
    return categoryMatch && difficultyMatch
  })

  return (
    <div className="min-h-screen bg-background text-on-background lg:flex">
      <Sidebar />

      <main className="flex-1 mt-[72px] mb-[88px] lg:mt-0 lg:mb-0 lg:ml-64 p-6 md:p-12 w-full max-w-5xl mx-auto">
        {/* Breadcrumb / Back button */}
        <div className="mb-6 mt-4 lg:mt-8">
          <Button variant="link" asChild className="p-0 text-sm font-bold text-primary dark:text-primary-fixed-dim hover:underline h-auto">
            <Link href="/categories" className="inline-flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              Back to Categories
            </Link>
          </Button>
        </div>

        {/* Category Header */}
        <div className="mb-10 flex items-center gap-4 animate-slide-in">
          <Avatar className={`w-14 h-14 rounded-full flex items-center justify-center shadow-sm ${category.badgeBg}`}>
            <AvatarFallback className="bg-transparent text-inherit flex items-center justify-center">
              <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                {category.icon}
              </span>
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-display text-3xl font-extrabold text-on-surface">
              {category.name} Quizzes
            </h1>
            <p className="font-sans text-sm text-on-surface-variant font-medium mt-1">
              Select a quiz to test your knowledge. Complete them to earn XP!
            </p>
          </div>
        </div>

        {/* Quiz List */}
        {filteredQuizzes.length === 0 ? (
          <Card className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-10 text-center shadow-sm animate-pop-in ring-0">
            <CardContent className="p-0 flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-outline text-[48px] mb-3">
                quiz
              </span>
              <h3 className="font-display text-lg font-bold text-on-surface">No quizzes found</h3>
              <p className="text-sm text-on-surface-variant mt-1">
                Try changing your difficulty filter.
              </p>
              <Button
                asChild
                className="chunky-btn bg-primary text-on-primary font-display text-xs px-6 py-2.5 rounded-full mt-4 inline-flex items-center gap-2 font-bold h-auto border-0"
              >
                <Link href="/categories">
                  Clear Filter
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col gap-6">
            {filteredQuizzes.map((quiz, index) => {
              const completed = completedQuizzes[quiz.id]
              const progress = activeQuizzes[quiz.id]

              // Difficulty label styling
              let diffBadgeClass = "bg-primary-fixed/30 text-on-primary-fixed-variant"
              if (quiz.difficulty === "junior") diffBadgeClass = "bg-tertiary-fixed/30 text-on-tertiary-fixed-variant"
              else if (quiz.difficulty === "master") diffBadgeClass = "bg-error-container text-on-error-container"

              return (
                <Card
                  key={quiz.id}
                  className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/30 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow duration-200 animate-pop-in ring-0"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <CardContent className="p-0 flex-1 flex flex-col md:flex-row md:items-center justify-between gap-6 w-full">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge variant="outline" className={`px-2.5 py-0.5 rounded-md font-display text-[10px] font-extrabold uppercase border-0 h-auto ${diffBadgeClass}`}>
                          {quiz.difficulty}
                        </Badge>
                        <Badge variant="outline" className="text-[11px] text-on-surface-variant font-bold bg-surface-container px-2 py-0.5 rounded border-0 h-auto">
                          {quiz.questions.length} Questions
                        </Badge>
                        {completed && (
                          <Badge variant="outline" className="text-[11px] text-on-tertiary-fixed-variant font-bold bg-tertiary-fixed/20 px-2 py-0.5 rounded-md inline-flex items-center gap-0.5 border border-tertiary/10 h-auto">
                            <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                              check_circle
                            </span>
                            High Score: {completed.scorePercent}%
                          </Badge>
                        )}
                        {progress && (
                          <Badge variant="outline" className="text-[11px] text-on-primary-fixed-variant font-bold bg-primary-fixed/20 px-2 py-0.5 rounded-md inline-flex items-center gap-0.5 border border-primary/10 h-auto">
                            <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                              pending
                            </span>
                            Resumable ({Math.round((progress.currentQuestionIndex / quiz.questions.length) * 100)}%)
                          </Badge>
                        )}
                      </div>

                      <h3 className="font-display text-xl font-extrabold text-on-surface mb-2">
                        {quiz.title}
                      </h3>
                      <p className="text-sm text-on-surface-variant font-medium">
                        {quiz.description}
                      </p>
                    </div>

                    <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 border-t md:border-t-0 pt-4 md:pt-0 border-outline-variant/20 shrink-0">
                      <div className="text-right">
                        <div className="font-display text-[11px] text-on-surface-variant font-semibold">REWARD</div>
                        <div className="font-display text-lg font-extrabold text-secondary leading-none mt-0.5">
                          +{quiz.xpAward} XP
                        </div>
                      </div>

                      <Button
                        asChild
                        className="chunky-btn bg-primary text-on-primary font-display text-sm px-6 py-3 rounded-full flex items-center gap-2 font-bold hover:scale-105 active:scale-95 transition-transform h-auto border-0"
                      >
                        <Link href={`/quiz/${quiz.id}`}>
                          {progress ? "Resume" : "Play"}
                          <span className="material-symbols-outlined text-[18px]">
                            {progress ? "forward" : "play_arrow"}
                          </span>
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
