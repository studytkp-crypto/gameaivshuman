import React, { useState, useEffect } from 'react';
import { Zap, ExternalLink, Trophy } from 'lucide-react';
import { API } from '../services/api';
import { GameArena } from './GameArena';

export function DailyChallenge({ onBackToRegularGame }) {
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadChallenge() {
      try {
        const res = await API.getDailyChallenge();
        setChallenge(res.dailyChallenge);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadChallenge();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="w-10 h-10 border-4 border-brand-purple border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-400 font-mono text-sm">Loading today's sponsored challenge...</p>
      </div>
    );
  }

  if (!challenge) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      
      {/* Sponsored Header Banner */}
      <div className="p-6 rounded-2xl glass-panel border border-amber-500/30 bg-amber-950/20 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-2xl">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="badge px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-black text-[10px] uppercase font-mono">
                DAILY CHALLENGE
              </span>
              <span className="text-xs text-amber-300/80 font-mono">{challenge.date}</span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1">
              Sponsored by {challenge.sponsorName}
            </h2>
          </div>
        </div>
        {challenge.sponsorUrl && (
          <a
            href={challenge.sponsorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center gap-1.5 border border-white/10"
          >
            <span>Learn About Sponsor</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>

      {/* Game Arena for the challenge */}
      <GameArena />

    </div>
  );
}
