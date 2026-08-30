import React, { useState, useEffect } from 'react';
import { Trophy, Flame, Crown, Medal, User } from 'lucide-react';
import { API } from '../services/api';

export function LeaderboardPage() {
  const [tab, setTab] = useState('all-time'); // 'all-time' | 'daily'
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await API.getLeaderboard(tab);
        setLeaderboard(res.leaderboard || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [tab]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold mb-3">
          <Trophy className="w-3.5 h-3.5" />
          <span>HALL OF DETECTIVES</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black font-display text-white">Global Leaderboard</h1>
        <p className="text-sm text-slate-400 mt-1">Top players with the highest unbroken streak of spotting AI fakes.</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-8">
        <button
          onClick={() => setTab('all-time')}
          className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
            tab === 'all-time' ? 'bg-brand-purple text-white shadow-lg shadow-brand-purple/30' : 'bg-white/5 text-slate-400 hover:text-white'
          }`}
        >
          🏆 All-Time Best Streaks
        </button>
        <button
          onClick={() => setTab('daily')}
          className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
            tab === 'daily' ? 'bg-brand-purple text-white shadow-lg shadow-brand-purple/30' : 'bg-white/5 text-slate-400 hover:text-white'
          }`}
        >
          ⚡ Today's Top Detectives
        </button>
      </div>

      {/* Leaderboard Table Card */}
      <div className="rounded-2xl glass-card border border-white/10 overflow-hidden shadow-2xl">
        {loading ? (
          <div className="py-16 text-center text-slate-400 font-mono text-sm">
            Fetching global player rankings...
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            No streak records found for this period. Be the first to claim rank #1!
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {leaderboard.map((player) => (
              <div
                key={player.rank}
                className="px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-4">
                  {/* Rank Badge */}
                  <div className="w-8 flex items-center justify-center font-black font-mono text-sm">
                    {player.rank === 1 ? (
                      <span className="text-xl">🥇</span>
                    ) : player.rank === 2 ? (
                      <span className="text-xl">🥈</span>
                    ) : player.rank === 3 ? (
                      <span className="text-xl">🥉</span>
                    ) : (
                      <span className="text-slate-500">#{player.rank}</span>
                    )}
                  </div>

                  {/* Avatar & Name */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg">
                      {player.avatar || '🕵️'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{player.name}</span>
                        {player.isPremium && (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold font-mono">
                            PRO
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">Verified Detective</div>
                    </div>
                  </div>
                </div>

                {/* Score */}
                <div className="flex items-center gap-2 font-mono font-black text-base text-orange-400">
                  <Flame className="w-4 h-4 fill-orange-400" />
                  <span>{tab === 'all-time' ? player.bestStreak : player.currentStreak}</span>
                  <span className="text-[10px] text-slate-500 font-normal uppercase">streak</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
