"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Sidebar } from "@/components/Sidebar"
import { CATEGORIES, QUIZZES } from "@/lib/quizData"

type DifficultyFilter = "all" | "junior" | "pro" | "master"

export default function CategoriesPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyFilter>("all")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // Count quizzes in each category based on difficulty filter
  const getFilteredCount = (categoryId: string) => {
    return QUIZZES.filter((quiz) => {
      const categoryMatch = quiz.category === categoryId
      const difficultyMatch = selectedDifficulty === "all" || quiz.difficulty === selectedDifficulty
      return categoryMatch && difficultyMatch
    }).length
  }

  const difficulties: { id: DifficultyFilter; label: string; ageRange: string }[] = [
    { id: "all", label: "All Topics", ageRange: "All Ages" },
    { id: "junior", label: "Junior", ageRange: "5-10" },
    { id: "pro", label: "Pro", ageRange: "11-18" },
    { id: "master", label: "Master", ageRange: "19+" },
  ]

  return (
    <div className="min-h-screen bg-background text-on-background lg:flex">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 mt-[72px] mb-[88px] lg:mt-0 lg:mb-0 lg:ml-64 p-6 md:p-12 w-full max-w-7xl mx-auto">
        
        {/* Header & Filters */}
        <div className="mb-8 mt-4 lg:mt-8 animate-slide-in">
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-on-surface mb-2">
            Choose Your Topic
          </h1>
          <p className="font-sans text-base text-on-surface-variant mb-6 font-medium">
            Select a difficulty and pick a category to start your next challenge.
          </p>

          {/* Age Filters (Chips) */}
          <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-2">
            {difficulties.map((diff) => {
              const active = selectedDifficulty === diff.id
              return (
                <button
                  key={diff.id}
                  onClick={() => setSelectedDifficulty(diff.id)}
                  className={`flex-shrink-0 px-5 py-2 rounded-full font-display text-xs font-bold transition-all duration-200 cursor-pointer shadow-sm border ${
                    active
                      ? "bg-primary text-on-primary border-primary ring-2 ring-primary ring-offset-2 ring-offset-background scale-105"
                      : "bg-surface-container-high text-on-surface-variant border-outline-variant/30 hover:bg-surface-variant"
                  }`}
                >
                  {diff.label} ({diff.ageRange})
                </button>
              )
            })}
          </div>
        </div>

        {/* Bento Grid Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {CATEGORIES.map((category, index) => {
            const count = getFilteredCount(category.id)
            const countLabel = count === 1 ? "1 Quiz" : `${count} Quizzes`

            // Highlight History to span 2 cols on wide screens like in the Stitch template!
            const colSpan = category.id === "history" 
              ? "col-span-2 md:col-span-2 lg:col-span-2 lg:flex-row lg:justify-start lg:px-8" 
              : "flex-col justify-center"

            return (
              <Link
                key={category.id}
                href={`/categories/${category.id}?diff=${selectedDifficulty}`}
                className={`group bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 flex items-center gap-4 relative overflow-hidden bento-shadow hover:-translate-y-1 hover:shadow-md transition-all duration-200 active:scale-95 animate-pop-in ${colSpan}`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Visual hover gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Icon wrapper */}
                <div className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 shadow-sm relative z-10 transition-transform duration-300 group-hover:scale-110 ${category.badgeBg}`}>
                  <span className="material-symbols-outlined text-[36px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {category.icon}
                  </span>
                </div>

                {/* Text details */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left relative z-10">
                  <h3 className="font-display text-lg font-extrabold text-on-surface group-hover:text-primary dark:group-hover:text-primary-fixed-dim transition-colors">
                    {category.name}
                  </h3>
                  
                  {category.id === "history" && (
                    <p className="font-sans text-xs text-on-surface-variant hidden lg:block mt-1 mb-2 max-w-xs font-medium">
                      Travel back in time and test your knowledge of past world-changing events and empires.
                    </p>
                  )}

                  <span className="font-display text-[10px] font-bold text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-md mt-2">
                    {countLabel}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

      </main>
    </div>
  )
}
