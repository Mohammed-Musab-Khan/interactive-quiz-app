export function calculateLevel(xp: number): { level: number; title: string } {
  const level = Math.floor(xp / 500) + 1
  let title = "Novice Challenger"
  if (level >= 30) title = "Grandmaster Polymath"
  else if (level >= 20) title = `Level ${level} Quiz Master`
  else if (level >= 10) title = "Scholar Expert"
  else if (level >= 5) title = "Knowledge Seeker"

  return { level, title }
}

export function determineNewStreak(
  lastActiveDateStr: string,
  todayStr: string,
  currentStreak: number
): number {
  if (lastActiveDateStr === todayStr) {
    return currentStreak
  }

  const lastDate = new Date(lastActiveDateStr)
  const today = new Date(todayStr)

  // Use date timestamps aligned to UTC/days to safely calculate day differences
  const lastTime = Date.UTC(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate())
  const todayTime = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())

  const diffTime = todayTime - lastTime
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) {
    return currentStreak + 1
  } else if (diffDays > 1) {
    return 1
  }

  return currentStreak
}

export function calculateAccuracy(score: number, total: number): number {
  if (total <= 0) return 0
  return Math.round((score / total) * 100)
}
