"use client"

import React, { useEffect, useState } from "react"
import { Sidebar } from "@/components/Sidebar"
import { useQuizStore } from "@/hooks/useQuizStore"
import { CATEGORIES } from "@/lib/quizData"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function StatsPage() {
  const { profile, completedQuizzes } = useQuizStore()
  const [streakDays, setStreakDays] = useState<{ label: string; active: boolean; dateNum: number }[]>([])

  useEffect(() => {
    const days: { label: string; active: boolean; dateNum: number }[] = []
    const today = new Date()
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(today.getDate() - i)
      const isToday = i === 0
      // Mock check: active if user logged today, or random past days to represent consistency
      const isActive = isToday || Math.random() > 0.4
      days.push({
        label: d.toLocaleDateString("en-US", { weekday: "short" }),
        active: isActive,
        dateNum: d.getDate(),
      })
    }
    const handle = requestAnimationFrame(() => {
      setStreakDays(days)
    })
    return () => cancelAnimationFrame(handle)
  }, [])

  if (streakDays.length === 0) {
    return null
  }

  // Calculate dynamic level progress
  // Level N starts at (N-1)*500 XP, ends at N*500 XP
  const levelStartXP = (profile.level - 1) * 500
  const levelXPEarned = profile.xp - levelStartXP
  const levelXPNeeded = 500
  const progressPercent = Math.min(Math.round((levelXPEarned / levelXPNeeded) * 100), 100)

  // Calculate completed quizzes count
  const completedList = Object.keys(completedQuizzes)
  const completedCount = completedList.length

  // Calculate average accuracy
  let avgAccuracy = 0
  if (completedCount > 0) {
    const totalAccuracy = Object.values(completedQuizzes).reduce(
      (sum, item) => sum + item.scorePercent,
      0
    )
    avgAccuracy = Math.round(totalAccuracy / completedCount)
  }

  // Find unique completed categories
  const completedCategories = CATEGORIES.filter((cat) => {
    // If there's at least one quiz in this category completed
    return completedList.some((quizId) => {
      // Find quiz category
      // Simple lookup or static map
      if (quizId.startsWith("cosmic") || quizId.startsWith("mars")) return cat.id === "space"
      if (quizId.startsWith("cellular")) return cat.id === "science"
      if (quizId.startsWith("ancient")) return cat.id === "history"
      if (quizId.startsWith("typescript") || quizId.startsWith("react")) return cat.id === "coding"
      if (quizId.startsWith("ocean")) return cat.id === "animals"
      if (quizId.startsWith("movie")) return cat.id === "pop-culture"
      return false
    })
  })

  // Initials
  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()


  return (
    <div className="min-h-screen bg-background text-on-background lg:flex">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 mt-[72px] mb-[88px] lg:mt-0 lg:mb-0 lg:ml-64 p-6 md:p-12 w-full max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 mt-4 lg:mt-8 animate-slide-in">
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-on-surface mb-2">
            Your Stats & Insights
          </h1>
          <p className="font-sans text-base text-on-surface-variant font-medium">
            Analyze your performance, level progress, and active streak stats.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full animate-pop-in">
          
          {/* Level Progress Hero Card (8 Cols on wide screens) */}
          <Card className="md:col-span-8 bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-between gap-6 ring-0">
            <CardContent className="p-0 flex flex-col justify-between h-full gap-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-14 h-14 rounded-full bg-primary-container text-on-primary-container font-display text-xl font-bold flex items-center justify-center shrink-0 shadow-sm">
                  <AvatarFallback className="bg-primary-container text-on-primary-container font-display text-xl font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-display text-lg font-extrabold text-on-surface">
                    {profile.name}
                  </h3>
                  <p className="text-xs text-on-surface-variant font-semibold">
                    Rank: <span className="text-primary dark:text-primary-fixed-dim">{profile.title}</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-end text-xs font-bold text-on-surface-variant">
                  <span>LEVEL {profile.level} PROGRESS</span>
                  <span>{levelXPEarned} / {levelXPNeeded} XP</span>
                </div>
                
                <Progress value={progressPercent} className="h-4 bg-surface-container rounded-full p-[2px] border border-outline-variant/20" />
                
                <p className="text-[10px] text-on-surface-variant font-medium mt-1">
                  Earn {levelXPNeeded - levelXPEarned} more XP to reach Level {profile.level + 1}!
                </p>
              </div>

              <div className="border-t border-outline-variant/10 pt-4 flex justify-between items-center text-xs text-on-surface-variant font-semibold">
                <span>Total Lifetime XP</span>
                <span className="font-display text-base font-extrabold text-on-surface">
                  {profile.xp.toLocaleString()} XP
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Metrics (4 Cols on wide screens) */}
          <Card className="md:col-span-4 bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 shadow-sm flex flex-col justify-around gap-6 ring-0">
            <CardContent className="p-0 flex flex-col gap-6">
              {/* Metric 1 */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-tertiary/10 text-tertiary flex items-center justify-center shadow-sm border border-tertiary/10">
                  <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                </div>
                <div>
                  <div className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
                    Quizzes Solved
                  </div>
                  <div className="font-display text-2xl font-extrabold text-on-surface leading-tight mt-0.5">
                    {completedCount}
                  </div>
                </div>
              </div>

              {/* Metric 2 */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center shadow-sm border border-secondary/10">
                  <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    insights
                  </span>
                </div>
                <div>
                  <div className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
                    Average Accuracy
                  </div>
                  <div className="font-display text-2xl font-extrabold text-on-surface leading-tight mt-0.5">
                    {avgAccuracy}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Streak Tracker & Calendar (6 Cols) */}
          <Card className="md:col-span-6 bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 shadow-sm flex flex-col gap-4 ring-0">
            <CardContent className="p-0 flex flex-col gap-4">
              <h3 className="font-display text-base font-extrabold text-on-surface">
                Daily Streak Activity
              </h3>
              
              <div className="flex items-center gap-4 bg-surface-container-low p-4 rounded-2xl border border-outline-variant/20">
                <span className="material-symbols-outlined text-[36px] text-error" style={{ fontVariationSettings: "'FILL' 1" }}>
                  local_fire_department
                </span>
                <div>
                  <div className="font-display text-xl font-extrabold text-on-surface">
                    {profile.streak} Days Active
                  </div>
                  <p className="text-[11px] text-on-surface-variant font-medium mt-0.5">
                    Keep taking quizzes daily to secure your learning streak!
                  </p>
                </div>
              </div>

              {/* Past 7 days checkmarks */}
              <div className="flex justify-between gap-2 mt-2">
                {streakDays.map((day, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1.5 flex-1">
                    <span className="text-[10px] text-on-surface-variant font-bold">
                      {day.label}
                    </span>
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-display font-bold text-xs ${
                      day.active
                        ? "bg-error-container text-on-error-container border-error"
                        : "bg-surface-container border-outline-variant/30 text-on-surface-variant opacity-60"
                    }`}>
                      {day.active ? (
                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          local_fire_department
                        </span>
                      ) : (
                        day.dateNum
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Completed Categories Bento (6 Cols) */}
          <Card className="md:col-span-6 bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 shadow-sm flex flex-col gap-4 ring-0">
            <CardContent className="p-0 flex flex-col gap-4">
              <h3 className="font-display text-base font-extrabold text-on-surface">
                Topics Explored
              </h3>
              
              {completedCategories.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-surface-container-low rounded-2xl border border-outline-variant/20">
                  <span className="material-symbols-outlined text-outline text-[32px] mb-2">
                    category
                  </span>
                  <p className="text-xs text-on-surface-variant font-medium">
                    No topics fully explored yet. Play quizzes to unlock achievements here!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {completedCategories.map((cat) => (
                    <div key={cat.id} className="flex items-center gap-3 p-3 border border-outline-variant/20 bg-surface-container-low rounded-2xl">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm ${cat.badgeBg}`}>
                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          {cat.icon}
                        </span>
                      </div>
                      <span className="font-display text-xs font-bold text-on-surface truncate">
                        {cat.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

        </div>

      </main>
    </div>
  )
}
