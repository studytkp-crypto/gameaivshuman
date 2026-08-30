import React from 'react';
import { Eye, Flame, Crown, Trophy, User, LogOut, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useGame } from '../context/GameContext';

export function Navbar({ activePage, setActivePage, openAuthModal, onOpenMindset }) {
  const { user, logout } = useAuth();
  const { streak, totalPlayed } = useGame();

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-white/10 px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActivePage('play')}
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
            🎮 Play Arena
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
            onClick={() => onOpenMindset && onOpenMindset()}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-brand-cyan hover:text-white bg-brand-cyan/10 hover:bg-brand-cyan/20 border border-brand-cyan/30 transition-all flex items-center gap-1.5"
          >
            <span>🧠</span> <span>AI Hunter's Mindset</span>
          </button>
        </div>

        {/* Right Stats & Profile */}
        <div className="flex items-center gap-3">
          
          {/* Live Streak Indicator */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 font-bold text-sm shadow-inner">
            <Flame className="w-4 h-4 fill-orange-400 text-orange-400 animate-pulse" />
            <span>{streak}</span>
            <span className="text-[10px] text-orange-300/70 uppercase tracking-wide hidden sm:inline">Streak</span>
          </div>

          {/* 100% Free Badge */}
          <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
            <span>✨ 100% FREE</span>
          </div>

          {/* User Auth / Profile Dropdown */}
          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActivePage('profile')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-brand-purple text-sm font-semibold text-white transition-colors"
              >
                <span>{user.avatar || '🕵️'}</span>
                <span className="hidden sm:inline text-xs">{user.name}</span>
              </button>
              {user.role === 'admin' && (
                <button
                  onClick={() => setActivePage('admin')}
                  className="p-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 hover:text-white"
                  title="Admin Dashboard"
                >
                  <ShieldCheck className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={logout}
                className="p-1.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => openAuthModal('login')}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-colors border border-white/5"
              >
                Sign In
              </button>
              <button
                onClick={() => openAuthModal('register')}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white gradient-btn shadow-md"
              >
                Save Stats
              </button>
            </div>
          )}

        </div>

      </div>
    </nav>
  );
}
