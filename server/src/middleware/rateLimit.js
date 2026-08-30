/**
 * 100% Free Play Middleware - Unlimited rounds for all players with zero login required
 */
export async function checkDailyPlayQuota(req, res, next) {
  req.remainingPlays = Infinity;
  next();
}
