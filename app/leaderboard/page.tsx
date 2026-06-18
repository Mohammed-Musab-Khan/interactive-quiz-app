"use client"

import React, { useEffect, useState } from "react"
import { Sidebar } from "@/components/Sidebar"
import { useQuizStore } from "@/hooks/useQuizStore"

interface Competitor {
  name: string
  xp: number
  avatar: string
  isUser?: boolean
  title: string
}

export default function LeaderboardPage() {
  const { profile } = useQuizStore()
  const [activeTab, setActiveTab] = useState<"weekly" | "alltime">("weekly")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // Competitor lists
  const weeklyCompetitors: Competitor[] = [
    { name: "Mia K.", xp: 14200, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuOh0jX6PSuPCszeTgsnuL1Z76yyJUQwVSUpgCtAFgXUU4hvCON-fUjwVsklXCgBHeT69WpBEDW6rfvW2zmYfTnRQuBF9KsCQ29RC7wlx8RR-w9oVVf54ofihpLxg76AiAGPXAA3xOvPD0WoIAS-9thc637v837a5rmtyAwd3Jd36BwI-ppwvFad6XOIQ3e-WNOEU5I0EttKrMx35eY-VBN-y60d5gM3o8i2ye_ojvz7zZSHxq3BME5m9Pojr9v_7fr11S9WfSb6kGm", title: "Astronomy Expert" },
    { name: `${profile.name} (You)`, xp: profile.xp, avatar: "", isUser: true, title: profile.title },
    { name: "Sam T.", xp: 11900, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPgCQ-puhHliNAh04AYP07Watv6k1ayJ9Br6x-v2H336QKB2lsZOOAzVGIERex4EKKElPvlWLAbvmftcWGY-M08Z_Zya9npyqiL9_XqrPujXGU28-FoAauqtZfrUZJubZiZRUgV4PAeNDnqQO_rKhBH_6VulXVd0FQvdeVEqtCNDDkOheAPQfrCJU6hpxq8HsI5CASHIbMPXJYlCtqBXrPBML1gqgvX6WVkVSR2gPn9NDGE8tCi3nFfaFoY8mRw5Cnjy3afBXchu5N", title: "History Buff" },
    { name: "Daniel B.", xp: 10450, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdxWW5KT3hBDTW3lexZpITSoMZPApVp0InXfoPtEdWUtBJ_vscpBg2lswxKqnwURHlVc2hyju23ugrKKmH1PG6Zzleg8EmzLZYvjwa4RTkUU-5mza3DFgs9V5NutSUwSCItZ5lpbyXa_DTMLO8rKDzqGhYtymOWHJkoKfCJXVB-w_rorB2h-pqRDIF_-Byyuw-kimy1mT4fgL0HjxW3zmlRw6Lgx2Vl_9EwgGlKzf9ogcM4FNGSCVk-tFVWAbptelTvsyN8MXGSVqe", title: "Code Ninja" },
    { name: "Clara H.", xp: 9100, avatar: "", title: "Biology Guru" },
    { name: "Jordan P.", xp: 8250, avatar: "", title: "Quiz Enthusiast" },
    { name: "Liam S.", xp: 7800, avatar: "", title: "Rising Star" },
  ]

  const alltimeCompetitors: Competitor[] = [
    { name: "Emily R.", xp: 84000, avatar: "", title: "Eternal Scholar" },
    { name: "Mia K.", xp: 76500, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuOh0jX6PSuPCszeTgsnuL1Z76yyJUQwVSUpgCtAFgXUU4hvCON-fUjwVsklXCgBHeT69WpBEDW6rfvW2zmYfTnRQuBF9KsCQ29RC7wlx8RR-w9oVVf54ofihpLxg76AiAGPXAA3xOvPD0WoIAS-9thc637v837a5rmtyAwd3Jd36BwI-ppwvFad6XOIQ3e-WNOEU5I0EttKrMx35eY-VBN-y60d5gM3o8i2ye_ojvz7zZSHxq3BME5m9Pojr9v_7fr11S9WfSb6kGm", title: "Astronomy Expert" },
    { name: "Marcus V.", xp: 68900, avatar: "", title: "Roman Centurion" },
    { name: "Daniel B.", xp: 55400, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdxWW5KT3hBDTW3lexZpITSoMZPApVp0InXfoPtEdWUtBJ_vscpBg2lswxKqnwURHlVc2hyju23ugrKKmH1PG6Zzleg8EmzLZYvjwa4RTkUU-5mza3DFgs9V5NutSUwSCItZ5lpbyXa_DTMLO8rKDzqGhYtymOWHJkoKfCJXVB-w_rorB2h-pqRDIF_-Byyuw-kimy1mT4fgL0HjxW3zmlRw6Lgx2Vl_9EwgGlKzf9ogcM4FNGSCVk-tFVWAbptelTvsyN8MXGSVqe", title: "Code Ninja" },
    { name: `${profile.name} (You)`, xp: profile.xp + 24000, avatar: "", isUser: true, title: profile.title }, // Mocked base alltime score
    { name: "Sam T.", xp: 32000, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPgCQ-puhHliNAh04AYP07Watv6k1ayJ9Br6x-v2H336QKB2lsZOOAzVGIERex4EKKElPvlWLAbvmftcWGY-M08Z_Zya9npyqiL9_XqrPujXGU28-FoAauqtZfrUZJubZiZRUgV4PAeNDnqQO_rKhBH_6VulXVd0FQvdeVEqtCNDDkOheAPQfrCJU6hpxq8HsI5CASHIbMPXJYlCtqBXrPBML1gqgvX6WVkVSR2gPn9NDGE8tCi3nFfaFoY8mRw5Cnjy3afBXchu5N", title: "History Buff" },
  ]

  const activeList = (activeTab === "weekly" ? weeklyCompetitors : alltimeCompetitors)
    .sort((a, b) => b.xp - a.xp)

  // Medals helper
  const getRankBadge = (rank: number) => {
    if (rank === 1) return { text: "🥇", bg: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300" }
    if (rank === 2) return { text: "🥈", bg: "bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-900/40 dark:text-slate-300" }
    if (rank === 3) return { text: "🥉", bg: "bg-amber-700/10 text-amber-900 border-amber-700/20 dark:bg-amber-900/20 dark:text-amber-400" }
    return { text: String(rank), bg: "bg-surface-container-high text-on-surface-variant" }
  }

  return (
    <div className="min-h-screen bg-background text-on-background lg:flex">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 mt-[72px] mb-[88px] lg:mt-0 lg:mb-0 lg:ml-64 p-6 md:p-12 w-full max-w-4xl mx-auto">
        
        {/* Header & Tabs */}
        <div className="mb-8 mt-4 lg:mt-8 animate-slide-in">
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-on-surface mb-2">
            Leaderboard
          </h1>
          <p className="font-sans text-base text-on-surface-variant mb-6 font-medium">
            See how your knowledge stacks up against the best learners in the community.
          </p>

          {/* Toggle Tabs */}
          <div className="flex border border-outline-variant/30 rounded-2xl bg-surface-container-low p-1 w-full sm:w-fit">
            <button
              onClick={() => setActiveTab("weekly")}
              className={`flex-1 sm:flex-initial px-8 py-2.5 rounded-xl font-display text-xs font-bold transition-all cursor-pointer ${
                activeTab === "weekly"
                  ? "bg-surface-container-lowest text-primary shadow-sm dark:text-primary-fixed-dim"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setActiveTab("alltime")}
              className={`flex-1 sm:flex-initial px-8 py-2.5 rounded-xl font-display text-xs font-bold transition-all cursor-pointer ${
                activeTab === "alltime"
                  ? "bg-surface-container-lowest text-primary shadow-sm dark:text-primary-fixed-dim"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              All Time
            </button>
          </div>
        </div>

        {/* Podium Top 3 (visual representation) */}
        <div className="grid grid-cols-3 items-end gap-3 md:gap-6 mb-8 max-w-2xl mx-auto pt-6 animate-pop-in">
          {/* 2nd Place */}
          {activeList[1] && (
            <div className="flex flex-col items-center">
              <div className="relative">
                {activeList[1].avatar ? (
                  <img src={activeList[1].avatar} alt="" className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-slate-300 object-cover shadow" />
                ) : (
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary-container text-on-primary-container font-display font-bold flex items-center justify-center border-2 border-slate-300 shadow">
                    {activeList[1].name.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <span className="absolute -top-2 -right-1 text-lg">🥈</span>
              </div>
              <div className="text-center mt-2 w-full">
                <div className="font-display text-xs md:text-sm font-extrabold truncate text-on-surface">
                  {activeList[1].name.split(" ")[0]}
                </div>
                <div className="text-[10px] md:text-xs text-on-surface-variant font-bold mt-0.5">
                  {activeList[1].xp.toLocaleString()} XP
                </div>
              </div>
              <div className="w-full bg-slate-300/40 dark:bg-slate-800/40 rounded-t-xl h-14 md:h-20 mt-3 flex items-center justify-center font-display font-extrabold text-slate-700 dark:text-slate-300">
                2
              </div>
            </div>
          )}

          {/* 1st Place */}
          {activeList[0] && (
            <div className="flex flex-col items-center">
              <div className="relative">
                {activeList[0].avatar ? (
                  <img src={activeList[0].avatar} alt="" className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-amber-400 object-cover shadow-lg" />
                ) : (
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary-container text-on-primary-container font-display font-bold flex items-center justify-center border-4 border-amber-400 shadow-lg">
                    {activeList[0].name.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <span className="absolute -top-3 -right-2 text-2xl animate-bounce">👑</span>
              </div>
              <div className="text-center mt-2 w-full">
                <div className="font-display text-sm md:text-base font-extrabold truncate text-primary dark:text-primary-fixed-dim">
                  {activeList[0].name.split(" ")[0]}
                </div>
                <div className="text-xs text-secondary font-extrabold mt-0.5">
                  {activeList[0].xp.toLocaleString()} XP
                </div>
              </div>
              <div className="w-full bg-amber-400/20 dark:bg-amber-950/20 border-t-2 border-amber-400 rounded-t-2xl h-20 md:h-28 mt-3 flex items-center justify-center font-display font-extrabold text-amber-600 dark:text-amber-400 text-lg">
                1
              </div>
            </div>
          )}

          {/* 3rd Place */}
          {activeList[2] && (
            <div className="flex flex-col items-center">
              <div className="relative">
                {activeList[2].avatar ? (
                  <img src={activeList[2].avatar} alt="" className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-amber-700/30 object-cover shadow" />
                ) : (
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary-container text-on-primary-container font-display font-bold flex items-center justify-center border-2 border-amber-700/30 shadow">
                    {activeList[2].name.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <span className="absolute -top-2 -right-1 text-lg">🥉</span>
              </div>
              <div className="text-center mt-2 w-full">
                <div className="font-display text-xs md:text-sm font-extrabold truncate text-on-surface">
                  {activeList[2].name.split(" ")[0]}
                </div>
                <div className="text-[10px] md:text-xs text-on-surface-variant font-bold mt-0.5">
                  {activeList[2].xp.toLocaleString()} XP
                </div>
              </div>
              <div className="w-full bg-amber-700/10 dark:bg-amber-900/10 rounded-t-xl h-10 md:h-14 mt-3 flex items-center justify-center font-display font-extrabold text-amber-800/80 dark:text-amber-500">
                3
              </div>
            </div>
          )}
        </div>

        {/* Competitor List Table */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl overflow-hidden shadow-sm flex flex-col animate-pop-in">
          {activeList.map((user, idx) => {
            const rank = idx + 1
            const badge = getRankBadge(rank)

            return (
              <div
                key={user.name}
                className={`flex items-center gap-4 px-6 py-4 border-b border-outline-variant/10 last:border-b-0 ${
                  user.isUser ? "bg-primary-fixed/15 border-l-4 border-l-primary" : ""
                }`}
              >
                {/* Rank indicator */}
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-display font-extrabold text-xs shrink-0 ${badge.bg}`}>
                  {badge.text}
                </div>

                {/* Avatar */}
                {user.avatar ? (
                  <img src={user.avatar} alt="" className="w-10 h-10 rounded-full object-cover shrink-0" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container font-display font-bold text-xs flex items-center justify-center shrink-0 border border-primary/10">
                    {user.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                  </div>
                )}

                {/* Name & Title */}
                <div className="flex-1 min-w-0">
                  <div className={`font-display text-sm truncate ${user.isUser ? "font-extrabold text-primary dark:text-primary-fixed-dim" : "font-bold text-on-surface"}`}>
                    {user.name}
                  </div>
                  <div className="text-[10px] text-on-surface-variant font-semibold truncate mt-0.5">
                    {user.title}
                  </div>
                </div>

                {/* XP Score */}
                <div className="shrink-0 font-display text-sm font-extrabold text-on-surface text-right">
                  {user.xp.toLocaleString()} <span className="text-[10px] text-on-surface-variant font-bold">XP</span>
                </div>
              </div>
            )
          })}
        </div>

      </main>
    </div>
  )
}
