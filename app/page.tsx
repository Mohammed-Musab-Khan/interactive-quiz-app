"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Sidebar } from "@/components/Sidebar"
import { useQuizStore } from "@/hooks/useQuizStore"
import { QUIZZES } from "@/lib/quizData"

export default function HomePage() {
  const { profile, activeQuizzes } = useQuizStore()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // Find active quizzes from store or show mock ones
  const activeQuizList = Object.entries(activeQuizzes).map(([quizId, progress]) => {
    const quizInfo = QUIZZES.find((q) => q.id === quizId)
    const totalQuestions = quizInfo?.questions.length || 5
    const progressPercent = Math.round((progress.currentQuestionIndex / totalQuestions) * 100)
    
    return {
      id: quizId,
      title: quizInfo?.title || "Active Quiz",
      category: quizInfo?.category || "general",
      progressPercent,
      questionText: `Question ${progress.currentQuestionIndex + 1} of ${totalQuestions}`,
    }
  })

  // Fallback default in-progress items if none exist yet
  const displayActiveQuizzes = activeQuizList.length > 0 
    ? activeQuizList 
    : [
        {
          id: "cellular-biology",
          title: "Cellular Biology",
          category: "science",
          progressPercent: 65,
          questionText: "Question 14 of 20",
        },
        {
          id: "ancient-rome",
          title: "Ancient Rome",
          category: "history",
          progressPercent: 30,
          questionText: "Question 3 of 10",
        },
      ]

  // Dynamic user ranking in leaderboard
  const mockLeaderboard = [
    { rank: 1, name: "Mia K.", xp: 14200, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuOh0jX6PSuPCszeTgsnuL1Z76yyJUQwVSUpgCtAFgXUU4hvCON-fUjwVsklXCgBHeT69WpBEDW6rfvW2zmYfTnRQuBF9KsCQ29RC7wlx8RR-w9oVVf54ofihpLxg76AiAGPXAA3xOvPD0WoIAS-9thc637v837a5rmtyAwd3Jd36BwI-ppwvFad6XOIQ3e-WNOEU5I0EttKrMx35eY-VBN-y60d5gM3o8i2ye_ojvz7zZSHxq3BME5m9Pojr9v_7fr11S9WfSb6kGm", isUser: false, bg: "bg-secondary-fixed text-on-secondary-fixed" },
    { rank: 2, name: `${profile.name} (You)`, xp: profile.xp, avatar: "", isUser: true, bg: "bg-surface-container-highest text-on-surface" },
    { rank: 3, name: "Sam T.", xp: 11900, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPgCQ-puhHliNAh04AYP07Watv6k1ayJ9Br6x-v2H336QKB2lsZOOAzVGIERex4EKKElPvlWLAbvmftcWGY-M08Z_Zya9npyqiL9_XqrPujXGU28-FoAauqtZfrUZJubZiZRUgV4PAeNDnqQO_rKhBH_6VulXVd0FQvdeVEqtCNDDkOheAPQfrCJU6hpxq8HsI5CASHIbMPXJYlCtqBXrPBML1gqgvX6WVkVSR2gPn9NDGE8tCi3nFfaFoY8mRw5Cnjy3afBXchu5N", isUser: false, bg: "bg-[#CD7F32] text-white" }
  ].sort((a, b) => b.xp - a.xp)

  // Re-assign ranks based on sorting
  mockLeaderboard.forEach((item, idx) => {
    item.rank = idx + 1
  })

  return (
    <div className="min-h-screen bg-background text-on-background lg:flex">
      {/* Sidebar Layout Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 w-full lg:pl-64 pt-[72px] lg:pt-0 pb-[88px] lg:pb-0 min-h-screen flex flex-col">
        <div className="flex-1 p-6 md:p-12 max-w-[1400px] w-full mx-auto flex flex-col gap-10">
          
          {/* Welcome & Streak Header */}
          <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-4 lg:mt-8">
            <div className="animate-slide-in">
              <h1 className="font-display text-3xl md:text-4xl font-extrabold text-on-surface">
                Hello, {profile.name.split(" ")[0]}! 👋
              </h1>
              <p className="font-sans text-base md:text-lg text-on-surface-variant mt-2 font-medium">
                Ready to crush today&apos;s learning goals?
              </p>
            </div>
            
            {/* Streak card */}
            <div className="flex items-center gap-3 bg-surface-container-lowest p-3 rounded-2xl border border-outline-variant/30 shadow-sm w-fit animate-slide-in">
              <span 
                className="material-symbols-outlined text-secondary text-[32px]" 
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_fire_department
              </span>
              <div>
                <div className="font-display text-lg font-bold text-on-surface leading-tight">
                  {profile.streak} Day Streak
                </div>
                <div className="text-[10px] text-on-surface-variant font-semibold">Keep it burning!</div>
              </div>
            </div>
          </section>

          {/* Uzaif Academy Branding & Enrollment CTA */}
          <section className="bg-gradient-to-r from-tertiary-container/10 to-primary-container/10 rounded-3xl p-6 border border-outline-variant/30 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 animate-pop-in">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-display text-xs font-extrabold text-primary dark:text-primary-fixed-dim uppercase tracking-wider bg-primary-fixed/30 px-3 py-1 rounded-full border border-primary/10">
                  🏫 Uzaif Academy
                </span>
                <span className="font-display text-[10px] font-bold text-on-tertiary-fixed-variant bg-tertiary-fixed/30 px-2.5 py-1 rounded-full border border-tertiary/10">
                  Interactive Coding Course
                </span>
              </div>
              <h2 className="font-display text-xl md:text-2xl font-extrabold text-on-surface leading-tight">
                Want to build your own Quiz App like QuizBurst? 🚀
              </h2>
              <p className="font-sans text-sm text-on-surface-variant font-medium mt-2 leading-relaxed">
                Parents & Kids: Learn how to program interactive projects from scratch! Enroll in Uzaif Academy to master TypeScript, React, and Next.js step-by-step.
              </p>
            </div>
            <a
              href="https://learn.uzaif.com"
              target="_blank"
              rel="noopener noreferrer"
              className="chunky-btn bg-secondary text-on-secondary-fixed font-display text-sm px-8 py-3.5 rounded-full flex items-center gap-2 font-bold cursor-pointer shrink-0 hover:scale-105 active:scale-95 transition-transform"
            >
              Enroll Now @ learn.uzaif.com
              <span className="material-symbols-outlined text-[20px]">school</span>
            </a>
          </section>

          {/* Bento Grid: Daily Challenge + Leaderboard */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Daily Challenge Tile (8 Cols on Desktop) */}
            <div className="col-span-1 md:col-span-8 bg-primary-container text-on-primary-container rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row justify-between items-center overflow-hidden relative border border-outline-variant/30 shadow-sm min-h-[260px] animate-pop-in">
              <div className="relative z-10 flex flex-col items-start gap-4 max-w-full sm:max-w-[60%]">
                <div className="bg-on-primary-container/20 px-3 py-1 rounded-full font-display text-xs font-bold inline-flex items-center gap-1.5 backdrop-blur-md text-white border border-white/10">
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    stars
                  </span> 
                  Daily Challenge
                </div>
                <div>
                  <h2 className="font-display text-3xl font-extrabold tracking-tight text-white">
                    Cosmic Physics Basics
                  </h2>
                  <p className="font-sans text-sm text-primary-fixed opacity-95 mt-1 font-semibold">
                    +500 XP on Completion
                  </p>
                </div>
                <Link
                  href="/quiz/cosmic-physics-basics"
                  className="chunky-btn bg-primary text-on-primary font-display text-sm px-6 py-3 rounded-full mt-2 flex items-center gap-2 font-bold cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-transform"
                >
                  Play Now
                  <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                </Link>
              </div>

              {/* Decorative 3D Illustration Planet */}
              <div className="absolute right-0 bottom-0 w-1/2 h-[120%] translate-y-[15%] translate-x-[5%] z-0 opacity-40 sm:opacity-90 pointer-events-none mix-blend-luminosity">
                <img 
                  className="w-full h-full object-contain" 
                  alt="Planet Physics Illustration" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJy9XkuEN5pxAzVPMRyJuO7mvRD_Oqh6--BSdihWx1N1PVqvgyBq5qnokzPqLaNyI9IgNEgetHMj0qclgiQp_xexo3o4tp4IhXtDd31kppUlZyY8HSJ6xqjsmWGyJRQVSitmofiuppxNUMAw2wEmBnxkTbjJNl2oJtApkpdDX009bxjZ7amQVdcwWG-EfOlnAJmWWuUWkczXmDqjz6UMyQ5cn9yZ2S7xABcqsf1-TpEjr9wgdS0kRSrhBfF-cRB3BRG9chhv7MurFq"
                />
              </div>
            </div>

            {/* Leaderboard Summary Tile (4 Cols on Desktop) */}
            <div className="col-span-1 md:col-span-4 bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/30 shadow-sm flex flex-col gap-4 animate-pop-in">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-on-surface">Top Learners</h3>
                <span className="material-symbols-outlined text-outline cursor-pointer hover:text-primary transition-colors">
                  more_horiz
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {mockLeaderboard.map((user) => (
                  <div 
                    key={user.name} 
                    className={`flex items-center gap-3 p-2 rounded-xl transition-colors ${
                      user.isUser ? "bg-primary-fixed/20 border border-primary/10" : "hover:bg-surface-container-low"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center font-display font-extrabold text-sm ${user.bg}`}>
                      {user.rank}
                    </div>

                    {user.avatar ? (
                      <img 
                        className="w-10 h-10 rounded-full object-cover shrink-0 border border-outline-variant/20" 
                        alt={user.name} 
                        src={user.avatar} 
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full shrink-0 bg-primary-container text-on-primary-container font-display font-bold text-xs flex items-center justify-center border border-primary/10">
                        {profile.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className={`font-display text-sm truncate ${user.isUser ? "font-bold text-primary dark:text-primary-fixed-dim" : "font-semibold text-on-surface"}`}>
                        {user.name}
                      </div>
                      <div className="text-xs text-on-surface-variant font-medium">
                        {user.xp.toLocaleString()} XP
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Continue Playing Section */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display text-xl font-bold text-on-surface">Continue Playing</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {displayActiveQuizzes.map((quiz, index) => {
                // Determine theme badge colors based on category
                let badgeClass = "bg-primary-fixed text-on-primary-fixed"
                if (quiz.category === "science") badgeClass = "bg-tertiary-fixed text-on-tertiary-fixed"
                else if (quiz.category === "history") badgeClass = "bg-secondary-fixed/50 text-on-secondary-fixed-variant"
                else if (quiz.category === "coding") badgeClass = "bg-primary-fixed-dim text-on-primary-fixed-variant"

                return (
                  <Link 
                    key={quiz.id}
                    href={`/quiz/${quiz.id}`}
                    className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/30 shadow-sm flex flex-col justify-between gap-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group animate-pop-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex justify-between items-start">
                      <div className={`px-3 py-1 rounded-full font-display text-[10px] font-bold uppercase tracking-wider ${badgeClass}`}>
                        {quiz.category}
                      </div>
                      <span className="material-symbols-outlined text-outline group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200">
                        arrow_forward
                      </span>
                    </div>

                    <div>
                      <h4 className="font-display text-lg font-extrabold text-on-surface group-hover:text-primary dark:group-hover:text-primary-fixed-dim transition-colors mb-2">
                        {quiz.title}
                      </h4>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden">
                          <div 
                            className="h-full progress-gradient rounded-full" 
                            style={{ width: `${quiz.progressPercent}%` }}
                          ></div>
                        </div>
                        <span className="font-display text-xs font-bold text-on-surface-variant">
                          {quiz.progressPercent}%
                        </span>
                      </div>
                      
                      <p className="text-xs text-on-surface-variant font-medium">
                        {quiz.questionText}
                      </p>
                    </div>
                  </Link>
                )
              })}

              {/* Start a New Topic Card (Dashed) */}
              <Link
                href="/categories"
                className="bg-surface/50 rounded-2xl p-6 border-dashed border-2 border-primary-fixed hover:border-primary/50 flex flex-col items-center justify-center gap-4 hover:shadow-sm transition-all duration-200 cursor-pointer group min-h-[180px] animate-pop-in"
                style={{ animationDelay: "200ms" }}
              >
                <div className="w-12 h-12 rounded-full bg-primary-fixed text-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    add
                  </span>
                </div>
                <div className="font-display text-base text-on-surface font-bold text-center">
                  Start a New Topic
                </div>
              </Link>

            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
