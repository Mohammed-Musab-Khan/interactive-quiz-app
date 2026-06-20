"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import { calculateLevel, determineNewStreak } from "@/lib/quizEngine"

export interface UserProfile {
  name: string
  title: string
  level: number
  xp: number
  streak: number
  lastActiveDate: string // YYYY-MM-DD
}

export interface ActiveQuizProgress {
  currentQuestionIndex: number
  score: number
  selectedAnswers: number[] // indexes of answers selected
  lastPlayedAt: string
}

export interface CompletedQuizInfo {
  scorePercent: number
  completedAt: string
}

interface QuizContextType {
  profile: UserProfile
  completedQuizzes: Record<string, CompletedQuizInfo>
  activeQuizzes: Record<string, ActiveQuizProgress>
  updateXP: (amount: number) => void
  recordActivity: () => void
  saveQuizProgress: (quizId: string, currentQuestionIndex: number, score: number, selectedAnswers: number[]) => void
  clearQuizProgress: (quizId: string) => void
  completeQuiz: (quizId: string, scorePercent: number, xpEarned: number) => void
  resetData: () => void
}

const DEFAULT_PROFILE: UserProfile = {
  name: "Alex Johnson",
  title: "Level 24 Quiz Master",
  level: 24,
  xp: 12850,
  streak: 12,
  lastActiveDate: new Date().toISOString().split("T")[0],
}

const QuizContext = createContext<QuizContextType | undefined>(undefined)

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE)
  const [completedQuizzes, setCompletedQuizzes] = useState<Record<string, CompletedQuizInfo>>({})
  const [activeQuizzes, setActiveQuizzes] = useState<Record<string, ActiveQuizProgress>>({})
  const [loaded, setLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedProfile = localStorage.getItem("qb_profile")
        const storedCompleted = localStorage.getItem("qb_completed")
        const storedActive = localStorage.getItem("qb_active")

        setTimeout(() => {
          if (storedProfile) setProfile(JSON.parse(storedProfile))
          if (storedCompleted) setCompletedQuizzes(JSON.parse(storedCompleted))
          if (storedActive) setActiveQuizzes(JSON.parse(storedActive))
          setLoaded(true)
        }, 0)
      } catch (e) {
        console.error("Error loading quiz state from localStorage", e)
        setTimeout(() => {
          setLoaded(true)
        }, 0)
      }
    }
  }, [])

  // Save changes to localStorage
  useEffect(() => {
    if (loaded && typeof window !== "undefined") {
      localStorage.setItem("qb_profile", JSON.stringify(profile))
    }
  }, [profile, loaded])

  useEffect(() => {
    if (loaded && typeof window !== "undefined") {
      localStorage.setItem("qb_completed", JSON.stringify(completedQuizzes))
    }
  }, [completedQuizzes, loaded])

  useEffect(() => {
    if (loaded && typeof window !== "undefined") {
      localStorage.setItem("qb_active", JSON.stringify(activeQuizzes))
    }
  }, [activeQuizzes, loaded])

  // Add XP and advance levels
  const updateXP = useCallback((amount: number) => {
    setProfile((prev) => {
      const newXp = prev.xp + amount
      const { level, title } = calculateLevel(newXp)
      return {
        ...prev,
        xp: newXp,
        level,
        title,
      }
    })
  }, [])

  // Record daily activity & streak tracking
  const recordActivity = useCallback(() => {
    const todayStr = new Date().toISOString().split("T")[0]
    setProfile((prev) => {
      const newStreak = determineNewStreak(prev.lastActiveDate, todayStr, prev.streak)
      return {
        ...prev,
        streak: newStreak,
        lastActiveDate: todayStr,
      }
    })
  }, [])

  // Save active quiz progress (for continuing playing)
  const saveQuizProgress = useCallback((
    quizId: string,
    currentQuestionIndex: number,
    score: number,
    selectedAnswers: number[]
  ) => {
    setActiveQuizzes((prev) => ({
      ...prev,
      [quizId]: {
        currentQuestionIndex,
        score,
        selectedAnswers,
        lastPlayedAt: new Date().toISOString(),
      },
    }))
    // Trigger daily active record
    recordActivity()
  }, [recordActivity])

  // Clear active quiz progress (upon completion)
  const clearQuizProgress = useCallback((quizId: string) => {
    setActiveQuizzes((prev) => {
      const copy = { ...prev }
      delete copy[quizId]
      return copy
    })
  }, [])

  // Record a quiz completion
  const completeQuiz = useCallback((quizId: string, scorePercent: number, xpEarned: number) => {
    const todayStr = new Date().toISOString().split("T")[0]
    
    // Update completed quizzes list (high score takes priority)
    setCompletedQuizzes((prev) => {
      const existing = prev[quizId]
      if (existing && existing.scorePercent >= scorePercent) {
        return prev // keep higher score
      }
      return {
        ...prev,
        [quizId]: {
          scorePercent,
          completedAt: todayStr,
        },
      }
    })

    // Award XP
    updateXP(xpEarned)

    // Clear active progress
    clearQuizProgress(quizId)

    // Update streak
    recordActivity()
  }, [updateXP, clearQuizProgress, recordActivity])

  // Clear all data (reset app)
  const resetData = useCallback(() => {
    setProfile({
      name: "Alex Johnson",
      title: "Novice Challenger",
      level: 1,
      xp: 0,
      streak: 1,
      lastActiveDate: new Date().toISOString().split("T")[0],
    })
    setCompletedQuizzes({})
    setActiveQuizzes({})
    if (typeof window !== "undefined") {
      localStorage.removeItem("qb_profile")
      localStorage.removeItem("qb_completed")
      localStorage.removeItem("qb_active")
    }
  }, [])


  return (
    <QuizContext.Provider
      value={{
        profile,
        completedQuizzes,
        activeQuizzes,
        updateXP,
        recordActivity,
        saveQuizProgress,
        clearQuizProgress,
        completeQuiz,
        resetData,
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

export function useQuizStore() {
  const context = useContext(QuizContext)
  if (context === undefined) {
    throw new Error("useQuizStore must be used within a QuizProvider")
  }
  return context
}
