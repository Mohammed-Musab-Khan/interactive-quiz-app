"use client"

import React, { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  color: string
  speedX: number
  speedY: number
  rotation: number
  rotationSpeed: number
}

const COLORS = [
  "#0056c5", // Primary blue
  "#146ef1", // Primary Container blue
  "#ffe171", // Secondary yellow
  "#ffe171", // Secondary fixed
  "#006a46", // Tertiary green
  "#2fe19c", // Tertiary fixed dim
  "#ba1a1a", // Error red
]

export function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    // Generate particles
    const particles: Particle[] = []
    const particleCount = 120

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        // Start just above the top, or at a random point in the top 30%
        y: Math.random() * -height - 20,
        size: Math.random() * 8 + 6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        speedX: Math.random() * 4 - 2,
        speedY: Math.random() * 4 + 4,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 4 - 2,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      let active = false

      particles.forEach((p) => {
        // Apply physics
        p.y += p.speedY
        p.x += p.speedX
        p.rotation += p.rotationSpeed

        // Slow down drift slightly over time
        p.speedX *= 0.99

        // Draw particle
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.fillStyle = p.color
        // Draw rectangle
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
        ctx.restore()

        if (p.y < height) {
          active = true
        }
      })

      if (active) {
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="confetti-canvas"
      className="pointer-events-none fixed inset-0 z-50 h-full w-full"
    />
  )
}
