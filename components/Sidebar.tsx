"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { useQuizStore } from "@/hooks/useQuizStore"
import { getSoundManager } from "@/lib/SoundManager"

export function Sidebar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { profile, resetData } = useQuizStore()
  const [isMuted, setIsMuted] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
    const sm = getSoundManager()
    if (sm) {
      setIsMuted(sm.getMuteStatus())
    }
  }, [])

  const toggleMute = () => {
    const sm = getSoundManager()
    if (sm) {
      const newMuted = sm.toggleMute()
      setIsMuted(newMuted)
    }
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    return null
  }

  // Helper to determine if link is active
  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  const navItems = [
    { label: "Home", path: "/", icon: "home" },
    { label: "Leaderboard", path: "/leaderboard", icon: "leaderboard" },
    { label: "Stats", path: "/stats", icon: "insights" },
    { label: "Categories", path: "/categories", icon: "grid_view" },
  ]

  // Avatar initials
  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <>
      {/* Top Header Navigation (Mobile Only) */}
      <header className="fixed top-0 z-40 flex w-full items-center justify-between border-b border-outline-variant/30 bg-surface/80 px-6 py-4 shadow-sm backdrop-blur-xl dark:bg-surface-dim/85 lg:hidden">
        <Link href="/" className="font-display text-2xl font-extrabold tracking-tight text-primary dark:text-primary-fixed">
          QuizBurst
        </Link>
        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={toggleMute}
            className="rounded-full p-2 text-primary hover:bg-surface-container-high transition-colors dark:text-primary-fixed"
            aria-label="Toggle Sound"
          >
            <span className="material-symbols-outlined text-[24px]">
              {isMuted ? "volume_off" : "volume_up"}
            </span>
          </button>
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-primary hover:bg-surface-container-high transition-colors dark:text-primary-fixed"
            aria-label="Toggle Theme"
          >
            <span className="material-symbols-outlined text-[24px]">
              {theme === "dark" ? "light_mode" : "dark_mode"}
            </span>
          </button>

          {/* Profile link */}
          <Link
            href="/stats"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-container font-display text-xs font-bold text-on-primary-container ring-2 ring-primary ring-offset-2 ring-offset-background"
          >
            {initials}
          </Link>
        </div>
      </header>

      {/* Side Navigation Bar (Desktop Only) */}
      <nav className="fixed left-0 top-0 z-40 hidden h-full w-64 flex-col border-r border-outline-variant/30 bg-surface p-6 shadow-lg dark:bg-surface-container lg:flex">
        {/* Logo */}
        <Link href="/" className="mb-6 font-display text-3xl font-extrabold tracking-tight text-primary dark:text-primary-fixed">
          QuizBurst
        </Link>

        {/* User Card */}
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-outline-variant/20 bg-surface-container-low p-3 shadow-sm dark:bg-surface-container-highest/20">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-container font-display text-sm font-bold text-on-primary-container">
            {initials}
          </div>
          <div className="min-w-0">
            <div className="truncate font-display text-sm font-bold text-on-surface">
              {profile.name}
            </div>
            <div className="truncate text-xs text-on-surface-variant font-medium">
              {profile.title}
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-1 flex-col gap-2">
          {navItems.map((item) => {
            const active = isActive(item.path)
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 font-display transition-all duration-200 active:scale-[0.98] ${
                  active
                    ? "bg-primary-fixed/40 font-bold text-primary dark:bg-primary-fixed/25 dark:text-primary-fixed-dim"
                    : "text-on-surface-variant hover:translate-x-1 hover:bg-surface-container-high hover:text-on-surface"
                }`}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>
            )
          })}
        </div>

        {/* Footer actions */}
        <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-outline-variant/30">
          <div className="flex items-center justify-between px-2 text-on-surface-variant">
            <span className="text-xs font-semibold">Toggles</span>
            <div className="flex gap-2">
              <button
                onClick={toggleMute}
                className="rounded-full p-2 hover:bg-surface-container-high transition-colors"
                title="Toggle Mute"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isMuted ? "volume_off" : "volume_up"}
                </span>
              </button>
              <button
                onClick={toggleTheme}
                className="rounded-full p-2 hover:bg-surface-container-high transition-colors"
                title="Toggle Theme"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {theme === "dark" ? "light_mode" : "dark_mode"}
                </span>
              </button>
            </div>
          </div>

          <button
            onClick={() => {
              if (confirm("Are you sure you want to reset all your progress (XP, streaks, etc.)?")) {
                resetData()
              }
            }}
            className="chunky-btn-secondary flex w-full items-center justify-center gap-2 rounded-xl bg-surface-container-lowest py-2.5 font-display text-xs text-on-surface transition-all active:scale-[0.98] font-bold"
          >
            <span className="material-symbols-outlined text-sm">restart_alt</span>
            Reset Progress
          </button>

          <div className="rounded-xl bg-primary-fixed/20 p-3 text-center border border-primary/20">
            <div className="text-xs font-bold text-primary dark:text-primary-fixed-dim">🏫 Uzaif Academy</div>
            <p className="mt-1 text-[10px] text-on-surface-variant font-medium">
              Want to learn how to make this project? Enroll at{" "}
              <a
                href="https://learn.uzaif.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline text-primary hover:text-primary-container dark:text-primary-fixed-dim"
              >
                learn.uzaif.com
              </a>
            </p>
          </div>
        </div>
      </nav>

      {/* Bottom Navigation Bar (Mobile Only) */}
      <nav className="fixed bottom-0 left-0 z-40 flex w-full justify-around border-t border-outline-variant/20 bg-surface/90 pb-[max(env(safe-area-inset-bottom),_16px)] pt-2 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] backdrop-blur-md rounded-t-xl dark:bg-surface-container-lowest/90 lg:hidden">
        {navItems.map((item) => {
          const active = isActive(item.path)
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center justify-center px-4 py-2 transition-all duration-150 rounded-xl active:scale-90 ${
                active
                  ? "bg-primary-container text-on-primary-container translate-y-[-4px] shadow-sm scale-105"
                  : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              <span
                className="material-symbols-outlined text-[24px]"
                style={{ fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span className="font-display text-[10px] mt-1 font-semibold">
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
