# 👁️ Human vs AI — Spot the Fake Game Platform

A high-engagement web game where players are shown two side-by-side pieces of media (starting with Image Mode) and must spot which one is AI-generated.

---

## ⚡ Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, Canvas Confetti
- **Backend**: Node.js, Express, Prisma ORM, JWT Authentication, bcryptjs
- **Database**: SQLite (Zero-configuration local development) / PostgreSQL via `DATABASE_URL`
- **AI Engine**: Google Gemini API (`GEMINI_MODEL="gemini-2.0-flash"`)
- **Monetization**: Stripe ($2.99/mo Pro Detective subscription) & Google AdSense placeholder

---

## 🎮 Core Game Features
1. **Side-by-Side Image Guesser**: Labeled "A" and "B" with 4K zoom inspection and keyboard shortcuts (`A`/`B` or `1`/`2`).
2. **Instant Animated Reveal**: Explains why the selected image is AI, showing prompt details, artifact clues, and community accuracy percentages.
3. **Daily Play Limits**:
   - **Free Tier**: 10 rounds/day (reset at UTC 00:00) with subtle between-round ad banner.
   - **Pro Pass ($2.99/mo)**: Unlimited 24/7 rounds, 100% ad-free, category accuracy analytics, and streak freeze protection.
4. **Global Leaderboards**: Real-time all-time best streaks and daily top scores.
5. **Viral Social Share**: 1-click scorecard generator (*"I scored 9/10 on Human vs AI! Can you beat me?"*).
6. **Admin Dashboard**: Inspect matched pairs, review community difficulty stats, and generate new matched pairs via Google Gemini.

---

## 🚀 How to Run Locally

### Option 1: 1-Click Batch File (Windows)
Double-click `start_human_vs_ai.bat` in the project root.

### Option 2: Manual Terminal Startup
1. **Backend Server**:
   ```bash
   cd server
   npm install
   npx prisma db push
   node prisma/seed.js
   node src/index.js
   ```
   *Runs on `http://localhost:5000`*

2. **Frontend Client**:
   ```bash
   cd client
   npm install
   npm run dev
   ```
   *Runs on `http://localhost:5173`*

---

## 🔑 Default Credentials
- **Admin Account**: `admin@humanvsai.game` / `password123`
- **Test Player Account**: `player@humanvsai.game` / `password123`
