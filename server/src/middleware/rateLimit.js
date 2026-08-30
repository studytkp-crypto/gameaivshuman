import { prisma } from '../db.js';
import { config } from '../config.js';

export async function checkDailyPlayQuota(req, res, next) {
  const user = req.user;

  // Premium users have unlimited plays
  if (user && user.isPremium) {
    req.remainingPlays = Infinity;
    return next();
  }

  // Calculate start of today in UTC
  const todayStart = new Date();
  todayStart.setUTCHours(0, 0, 0, 0);

  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';

  let todayAttemptsCount = 0;

  if (user) {
    todayAttemptsCount = await prisma.attempt.count({
      where: {
        userId: user.id,
        createdAt: { gte: todayStart }
      }
    });
  } else {
    todayAttemptsCount = await prisma.attempt.count({
      where: {
        guestIp: String(clientIp),
        createdAt: { gte: todayStart }
      }
    });
  }

  const limit = config.freeRoundsPerDay;
  const remaining = Math.max(0, limit - todayAttemptsCount);
  req.remainingPlays = remaining;

  if (todayAttemptsCount >= limit) {
    return res.status(429).json({
      error: 'Daily free play limit reached (10/10 rounds).',
      quotaReached: true,
      remainingPlays: 0,
      resetTimeUtc: '00:00 UTC',
      upgradeUrl: '/pricing'
    });
  }

  next();
}
