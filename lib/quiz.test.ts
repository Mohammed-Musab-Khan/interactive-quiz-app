import { describe, it, expect } from "vitest"
import { calculateLevel, determineNewStreak, calculateAccuracy } from "./quizEngine"

describe("Quiz Engine Unit Tests", () => {
  describe("calculateLevel", () => {
    it("should calculate correct level based on XP increments of 500", () => {
      // Level 1: 0 - 499 XP
      expect(calculateLevel(0).level).toBe(1)
      expect(calculateLevel(250).level).toBe(1)
      expect(calculateLevel(499).level).toBe(1)

      // Level 2: 500 - 999 XP
      expect(calculateLevel(500).level).toBe(2)
      expect(calculateLevel(999).level).toBe(2)

      // Level 26: 12500 - 12999 XP (matches user profile starting XP)
      expect(calculateLevel(12850).level).toBe(26)
    })

    it("should assign correct user titles based on level brackets", () => {
      expect(calculateLevel(0).title).toBe("Novice Challenger") // Level 1
      expect(calculateLevel(2000).title).toBe("Knowledge Seeker") // Level 5
      expect(calculateLevel(4500).title).toBe("Scholar Expert") // Level 10
      expect(calculateLevel(12850).title).toBe("Level 26 Quiz Master") // Level 26
      expect(calculateLevel(15000).title).toBe("Grandmaster Polymath") // Level 31
    })
  })

  describe("determineNewStreak", () => {
    it("should keep the streak identical if active on the same day", () => {
      expect(determineNewStreak("2026-06-18", "2026-06-18", 12)).toBe(12)
    })

    it("should increment the streak if active exactly one day later", () => {
      expect(determineNewStreak("2026-06-17", "2026-06-18", 12)).toBe(13)
      // Month boundary
      expect(determineNewStreak("2026-05-31", "2026-06-01", 5)).toBe(6)
    })

    it("should reset the streak to 1 if active more than one day later", () => {
      expect(determineNewStreak("2026-06-15", "2026-06-18", 12)).toBe(1)
    })
  })

  describe("calculateAccuracy", () => {
    it("should calculate correct percentage integers", () => {
      expect(calculateAccuracy(4, 5)).toBe(80)
      expect(calculateAccuracy(3, 10)).toBe(30)
      expect(calculateAccuracy(0, 5)).toBe(0)
      expect(calculateAccuracy(5, 5)).toBe(100)
    })

    it("should handle edge cases like division by zero", () => {
      expect(calculateAccuracy(0, 0)).toBe(0)
      expect(calculateAccuracy(5, 0)).toBe(0)
    })
  })
})
