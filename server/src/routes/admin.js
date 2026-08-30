import express from 'express';
import { prisma } from '../db.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';
import { GeminiService } from '../services/geminiService.js';

const router = express.Router();

// GET /api/admin/pairs — List all rounds with difficulty and accuracy stats
router.get('/pairs', requireAuth, requireAdmin, async (req, res) => {
  try {
    const rounds = await prisma.round.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100
    });

    const enriched = rounds.map(r => ({
      ...r,
      accuracy: r.playsCount > 0 ? Math.round((r.correctCount / r.playsCount) * 100) : 50
    }));

    res.json({ pairs: enriched });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch round pairs.' });
  }
});

// POST /api/admin/generate-pair — Trigger background Gemini AI matched pair generator
router.post('/generate-pair', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { category, customPrompt } = req.body;
    const newRound = await GeminiService.generateMatchedPair({
      category: category || 'Animals',
      customPrompt
    });

    res.json({
      success: true,
      message: 'Generated new matched pair via Google Gemini AI!',
      round: newRound
    });
  } catch (err) {
    console.error('Admin generate error:', err);
    res.status(500).json({ error: 'Failed to generate pair.' });
  }
});

// DELETE /api/admin/pair/:id — Remove a flagged round
router.delete('/pair/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.attempt.deleteMany({ where: { roundId: id } });
    await prisma.dailyChallenge.deleteMany({ where: { roundId: id } });
    await prisma.round.delete({ where: { id } });

    res.json({ success: true, message: 'Round pair removed.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete round.' });
  }
});

export default router;
