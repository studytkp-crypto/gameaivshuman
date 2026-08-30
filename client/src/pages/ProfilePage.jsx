import React, { useState, useEffect } from 'react';
import { User, Flame, Crown, Trophy, Target, Shield, CheckCircle, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API } from '../services/api';

export function ProfilePage({ onOpenPricing }) {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await API.getUserCategories();
        setCategories(res.categories || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (!user) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-4">
        <h2 className="text-2xl font-bold font-display text-white mb-2">Sign In Required</h2>
        <p className="text-sm text-slate-400 mb-6">Create a free account or sign in to track your streaks, accuracy, and badges.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      
      {/* Top Profile Header Card */}
      <div className="p-8 rounded-3xl glass-panel border border-white/10 mb-8 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-brand-purple to-brand-cyan flex items-center justify-center text-4xl shadow-xl">
              {user.avatar || '🕵️'}
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <h1 className="text-2xl font-black font-display text-white">{user.name}</h1>
                {user.isPremium ? (
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono flex items-center gap-1">
                    <Crown className="w-3 h-3" /> PRO DETECTIVE
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400 text-xs font-mono">
                    CASUAL TIER
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-400 font-mono">{user.email}</div>
              <div className="text-xs text-slate-500 mt-2">Member since {new Date().toLocaleDateString()}</div>
            </div>
          </div>

          {!user.isPremium && (
            <button
              onClick={onOpenPricing}
              className="px-5 py-2.5 rounded-xl gradient-btn font-bold text-white text-xs shadow-lg flex items-center gap-1.5"
            >
              <Crown className="w-4 h-4" />
              <span>Upgrade to Pro ($2.99)</span>
            </button>
          )}
        </div>

        {/* 3 Metric Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
            <div className="text-xs text-slate-400 font-mono mb-1">CURRENT STREAK</div>
            <div className="text-3xl font-black font-mono text-orange-400 flex items-center justify-center gap-1.5">
              <Flame className="w-6 h-6 fill-orange-400" />
              <span>{user.streak?.currentStreak || 0}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
            <div className="text-xs text-slate-400 font-mono mb-1">BEST ALL-TIME STREAK</div>
            <div className="text-3xl font-black font-mono text-amber-400 flex items-center justify-center gap-1.5">
              <Trophy className="w-6 h-6" />
              <span>{user.streak?.bestStreak || 0}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
            <div className="text-xs text-slate-400 font-mono mb-1">STREAK FREEZE PROTECTION</div>
            <div className="text-base font-bold text-white flex items-center justify-center gap-1.5 mt-2">
              {user.isPremium ? (
                <span className="text-emerald-400 font-mono">🛡️ Ready & Protected</span>
              ) : (
                <span className="text-slate-500 font-mono text-xs">🔒 Pro Only</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Per-Category Accuracy Breakdown */}
      <div className="rounded-3xl glass-card border border-white/10 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold font-display text-white">AI Detection Accuracy by Category</h3>
            <p className="text-xs text-slate-400 mt-0.5">Which domain is easiest or hardest for your intuition?</p>
          </div>
          {!user.isPremium && (
            <span className="text-[11px] font-mono text-brand-cyan bg-brand-cyan/10 px-2 py-1 rounded border border-brand-cyan/20">
              PREVIEW MODE
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map(cat => (
            <div key={cat.category} className="p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white">{cat.category}</span>
                <span className="text-xs font-mono font-bold text-brand-cyan">{cat.accuracy}% Accuracy</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-brand-purple to-brand-cyan rounded-full transition-all duration-1000"
                  style={{ width: `${cat.accuracy}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
