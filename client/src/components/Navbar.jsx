import React from 'react';
import { Eye, Flame, Crown, Trophy, User, LogOut, ShieldCheck, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useGame } from '../context/GameContext';

export function Navbar({ activePage, setActivePage, openAuthModal }) {
  const { user, logout } = useAuth();
  const { streak, remainingPlays } = useGame();

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-white/10 px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActivePage('home')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-purple to-brand-cyan flex items-center justify-center shadow-lg shadow-brand-purple/20 group-hover:scale-105 transition-transform">
            <Eye className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-display font-black text-xl tracking-tight text-white flex items-center gap-1">
              HUMAN <span className="text-brand-cyan text-xs font-mono px-1.5 py-0.5 rounded bg-brand-cyan/10 border border-brand-cyan/20">vs</span> AI
            </span>
            <div className="text-[10px] text-slate-400 font-mono tracking-wider">SPOT THE FAKE</div>
          </div>
        </div>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/5">
          <button
            onClick={() => setActivePage('play')}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              activePage === 'play' ? 'bg-brand-purple text-white shadow-md shadow-brand-purple/30' : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            🎮 Play
          </button>
          <button
            onClick={() => setActivePage('daily')}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              activePage === 'daily' ? 'bg-brand-purple text-white shadow-md shadow-brand-purple/30' : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            ⚡ Daily Challenge
          </button>
          <button
            onClick={() => setActivePage('leaderboard')}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              activePage === 'leaderboard' ? 'bg-brand-purple text-white shadow-md shadow-brand-purple/30' : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            🏆 Leaderboard
          </button>
          <button
            onClick={() => setActivePage('pricing')}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              activePage === 'pricing' ? 'bg-brand-purple text-white shadow-md shadow-brand-purple/30' : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            💎 Pro Pass ($2.99)
          </button>
        </div>

        {/* Right Stats & Profile */}
        <div className="flex items-center gap-3">
          
          {/* Streak Indicator */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 font-bold text-sm">
            <Flame className="w-4 h-4 fill-orange-400 text-orange-400 animate-pulse" />
            <span>{streak}</span>
            <span className="text-[10px] text-orange-300/70 uppercase tracking-wide hidden sm:inline">Streak</span>
          </div>

          {/* Free Plays Badge */}
          {user?.isPremium ? (
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
              <Crown className="w-3.5 h-3.5" /> PRO PASS
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-mono">
              <span>{remainingPlays}</span>
              <span className="text-slate-500">/ 10 Free</span>
            </div>
          )}

          {/* User Auth / Profile Dropdown */}
          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActivePage('profile')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-brand-purple text-sm font-semibold text-white transition-colors"
              >
                <span>{user.avatar || '🕵️'}</span>
                <span className="hidden sm:inline text-xs">{user.name}</span>
              </button>
              {user.role === 'admin' && (
                <button
                  onClick={() => setActivePage('admin')}
                  className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300 hover:text-white"
                  title="Admin Dashboard"
                >
                  <ShieldCheck className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={logout}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => openAuthModal('login')}
                className="px-3.5 py-1.5 rounded-lg text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/5 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => openAuthModal('register')}
                className="px-4 py-1.5 rounded-lg text-sm font-bold text-white gradient-btn shadow-sm"
              >
                Join Free
              </button>
            </div>
          )}

        </div>

      </div>
    </nav>
  );
}
