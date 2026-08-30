import express from 'express';
import { prisma } from '../db.js';

const router = express.Router();

// GET /api/leaderboard/all-time
router.get('/all-time', async (req, res) => {
  try {
    const streaks = await prisma.streak.findMany({
      where: {
        bestStreak: { gt: 0 }
      },
      orderBy: { bestStreak: 'desc' },
      take: 50,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
            isPremium: true
          }
        }
      }
    });

    const formatted = streaks.map((s, idx) => ({
      rank: idx + 1,
      name: s.user.name || 'Anonymous Detective',
      avatar: s.user.avatar || '🕵️',
      bestStreak: s.bestStreak,
      currentStreak: s.currentStreak,
      isPremium: s.user.isPremium
    }));

    res.json({ leaderboard: formatted });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch leaderboard.' });
  }
});

// GET /api/leaderboard/daily
router.get('/daily', async (req, res) => {
  try {
    const todayDate = new Date().toISOString().split('T')[0];
    const streaks = await prisma.streak.findMany({
      where: {
        lastPlayedDate: todayDate,
        currentStreak: { gt: 0 }
      },
      orderBy: { currentStreak: 'desc' },
      take: 50,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
            isPremium: true
          }
        }
      }
    });

    const formatted = streaks.map((s, idx) => ({
      rank: idx + 1,
      name: s.user.name || 'Anonymous Detective',
      avatar: s.user.avatar || '🕵️',
      currentStreak: s.currentStreak,
      isPremium: s.user.isPremium
    }));

    res.json({ leaderboard: formatted });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch daily leaderboard.' });
  }
});

export default router;
