import express from 'express';
import { prisma } from '../db.js';
import { optionalAuth } from '../middleware/auth.js';
import { checkDailyPlayQuota } from '../middleware/rateLimit.js';

const router = express.Router();

// GET /api/game/round — Fetch the next matched pair
router.get('/round', optionalAuth, checkDailyPlayQuota, async (req, res) => {
  try {
    const user = req.user;
    const category = req.query.category; // Optional category filter (Premium feature)
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';

    // Find rounds already attempted by this user/IP
    let attemptedRoundIds = [];
    if (user) {
      const attempts = await prisma.attempt.findMany({
        where: { userId: user.id },
        select: { roundId: true }
      });
      attemptedRoundIds = attempts.map(a => a.roundId);
    } else {
      const attempts = await prisma.attempt.findMany({
        where: { guestIp: String(clientIp) },
        select: { roundId: true }
      });
      attemptedRoundIds = attempts.map(a => a.roundId);
    }

    const excludeId = req.query.excludeId;

    // Filter condition
    const whereCondition = {
      mode: 'image'
    };
    if (category && category !== 'All') {
      whereCondition.category = category;
    }
    
    const excludedIds = [...attemptedRoundIds];
    if (excludeId && !excludedIds.includes(excludeId)) {
      excludedIds.push(excludeId);
    }

    if (excludedIds.length > 0) {
      whereCondition.id = { notIn: excludedIds };
    }

    let availableRounds = await prisma.round.findMany({
      where: whereCondition
    });

    // If all rounds were played, recycle from all available (excluding current round if possible)
    if (availableRounds.length === 0) {
      availableRounds = await prisma.round.findMany({
        where: {
          mode: 'image',
          ...(category && category !== 'All' ? { category } : {}),
          ...(excludeId ? { id: { not: excludeId } } : {})
        }
      });
    }

    // Ultimate fallback
    if (availableRounds.length === 0) {
      availableRounds = await prisma.round.findMany({
        where: { mode: 'image' }
      });
    }

    if (availableRounds.length === 0) {
      return res.status(404).json({ error: 'No rounds available yet. Please check back shortly!' });
    }

    // Pick a random round
    const selectedRound = availableRounds[Math.floor(Math.random() * availableRounds.length)];

    // Send payload to client WITHOUT revealing the aiSlot
    res.json({
      round: {
        id: selectedRound.id,
        category: selectedRound.category,
        imageAUrl: selectedRound.imageAUrl,
        imageBUrl: selectedRound.imageBUrl,
        difficulty: selectedRound.difficulty,
        playsCount: selectedRound.playsCount
      },
      remainingPlays: req.remainingPlays === Infinity ? 'Unlimited' : req.remainingPlays,
      isPremium: !!(user && user.isPremium)
    });
  } catch (err) {
    console.error('Fetch round error:', err);
    res.status(500).json({ error: 'Failed to fetch game round.' });
  }
});

// POST /api/game/guess — Submit a guess and get the reveal
router.post('/guess', optionalAuth, async (req, res) => {
  try {
    const { roundId, chosenSlot } = req.body;
    const user = req.user;
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';

    if (!roundId || !['A', 'B'].includes(chosenSlot)) {
      return res.status(400).json({ error: 'Valid roundId and chosenSlot (A or B) are required.' });
    }

    const round = await prisma.round.findUnique({
      where: { id: roundId }
    });
    if (!round) {
      return res.status(404).json({ error: 'Game round not found.' });
    }

    const isCorrect = chosenSlot === round.aiSlot;

    // 1. Record Attempt
    await prisma.attempt.create({
      data: {
        userId: user ? user.id : null,
        guestIp: user ? null : String(clientIp),
        roundId: round.id,
        chosenSlot,
        correct: isCorrect
      }
    });

    // 2. Update Round aggregate stats
    await prisma.round.update({
      where: { id: round.id },
      data: {
        playsCount: { increment: 1 },
        correctCount: isCorrect ? { increment: 1 } : undefined
      }
    });

    // 3. Update User Streaks if logged in
    let streakData = { currentStreak: 0, bestStreak: 0 };
    if (user) {
      let streak = await prisma.streak.findUnique({
        where: { userId: user.id }
      });
      if (!streak) {
        streak = await prisma.streak.create({
          data: { userId: user.id, currentStreak: 0, bestStreak: 0 }
        });
      }

      let newCurrent = isCorrect ? streak.currentStreak + 1 : 0;
      let newBest = Math.max(streak.bestStreak, newCurrent);

      // Streak Freeze protection for Premium
      if (!isCorrect && user.isPremium && !user.streakFreezeUsed && streak.currentStreak >= 3) {
        newCurrent = streak.currentStreak; // Preserved!
        await prisma.user.update({
          where: { id: user.id },
          data: { streakFreezeUsed: true }
        });
      }

      const todayDate = new Date().toISOString().split('T')[0];
      const updatedStreak = await prisma.streak.update({
        where: { userId: user.id },
        data: {
          currentStreak: newCurrent,
          bestStreak: newBest,
          lastPlayedDate: todayDate
        }
      });
      streakData = {
        currentStreak: updatedStreak.currentStreak,
        bestStreak: updatedStreak.bestStreak
      };
    }

    // Return the full reveal and explanation
    res.json({
      correct: isCorrect,
      aiSlot: round.aiSlot,
      chosenSlot,
      prompt: round.prompt,
      realSource: round.realSource,
      aiClues: round.aiClues,
      accuracyRate: Math.round(((round.correctCount + (isCorrect ? 1 : 0)) / (round.playsCount + 1)) * 100),
      streak: streakData
    });
  } catch (err) {
    console.error('Guess submission error:', err);
    res.status(500).json({ error: 'Failed to process guess.' });
  }
});

// GET /api/game/daily — Today's Sponsored Daily Challenge
router.get('/daily', async (req, res) => {
  try {
    const todayDate = new Date().toISOString().split('T')[0];
    let challenge = await prisma.dailyChallenge.findUnique({
      where: { date: todayDate },
      include: { round: true }
    });

    if (!challenge) {
      const randomRound = await prisma.round.findFirst();
      if (!randomRound) {
        return res.status(404).json({ error: 'No daily challenge available.' });
      }
      challenge = await prisma.dailyChallenge.create({
        data: {
          roundId: randomRound.id,
          date: todayDate,
          sponsorName: 'Google AI Studio',
          sponsorLogo: '⚡',
          sponsorUrl: 'https://aistudio.google.com'
        },
        include: { round: true }
      });
    }

    res.json({
      dailyChallenge: {
        id: challenge.id,
        date: challenge.date,
        sponsorName: challenge.sponsorName,
        sponsorLogo: challenge.sponsorLogo,
        sponsorUrl: challenge.sponsorUrl,
        round: {
          id: challenge.round.id,
          category: challenge.round.category,
          imageAUrl: challenge.round.imageAUrl,
          imageBUrl: challenge.round.imageBUrl,
          difficulty: challenge.round.difficulty
        }
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch daily challenge.' });
  }
});

export default router;
