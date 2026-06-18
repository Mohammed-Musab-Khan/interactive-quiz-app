# QuizBurst 🚀

QuizBurst is a modern, highly interactive, and gamified quiz application built as the capstone project for the **Introduction to TypeScript** course. 

Designed and developed by **Mohammed Musab Khan** for **[Uzaif Academy](https://learn.uzaif.com)**.

---

## 🏫 About Uzaif Academy
Uzaif Academy helps parents and kids learn how to program interactive, high-fidelity web projects from scratch. Through hands-on capstones like QuizBurst, students master TypeScript, React, and Next.js step-by-step. Learn more at **[learn.uzaif.com](https://learn.uzaif.com)**.

---

## ✨ Features

- **🎯 Interactive Quiz Player**: Engaging quizzes across multiple categories with instant feedback, streaks, and progress tracking.
- **🔥 Gamified Progression**: Earn XP on successful quiz completions, level up your profile, and keep your daily learning streak alive.
- **🏆 Live Leaderboard**: Compete with other learners and watch your rank dynamically adjust in real-time as you gain XP.
- **🎵 Web Audio Integration**: Immersive dynamic audio feedback using the Web Audio API for correct and incorrect answers.
- **🎉 Confetti Celebrations**: High-fidelity HTML5 Canvas confetti animation to celebrate completing quizzes.
- **💾 Auto-Persistence**: Fully local-first storage integration using React Context to seamlessly save your progress.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Library**: React 19 (Hooks & Context)
- **Language**: TypeScript (Strict typing for quiz structures & profile states)
- **Styling**: Tailwind CSS v4 & Shadcn/ui
- **Testing**: Vitest for robust unit testing of state engines

---

## 🚀 Getting Started

### 1. Install Dependencies
Make sure you have [pnpm](https://pnpm.io/) installed, then run:
```bash
pnpm install
```

### 2. Run the Development Server
Start the Next.js development server:
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### 3. Run Unit Tests
To verify all state operations, streaks, and level engine logic:
```bash
pnpm test
```

---

## 📂 Project Structure

- `app/`: Next.js App Router pages (Home, Categories, Leaderboard, Quiz player, Stats).
- `components/`: Reusable React UI components (Sidebar, Confetti, and shadcn inputs).
- `hooks/`: Custom state management hooks (`useQuizStore.tsx` provider for local persistence).
- `lib/`: Pure TypeScript logic modules including `quizEngine.ts` and `quizData.ts`.

