import React from 'react';
import { Eye, Shield, Sparkles, Heart } from 'lucide-react';

export function Footer({ setActivePage, onOpenPrivacy }) {
  return (
    <footer className="border-t border-white/10 bg-slate-950/60 mt-16 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        {/* Col 1: Brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-purple to-brand-cyan flex items-center justify-center">
              <Eye className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-black text-lg text-white">HUMAN vs AI</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            The web game testing human intuition against state-of-the-art generative neural networks.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
            <span>Powered by Google Gemini 2.0</span>
          </div>
        </div>

        {/* Col 2: Game Modes */}
        <div>
          <div className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider mb-3">Game Modes</div>
          <ul className="space-y-2 text-xs text-slate-400">
            <li className="text-white font-semibold flex items-center gap-1.5">
              <span>🖼️</span> <span>Image Mode (Live)</span>
            </li>
            <li className="text-slate-500 flex items-center gap-1.5">
              <span>📝</span> <span>Text & Essays (Coming Soon)</span>
            </li>
            <li className="text-slate-500 flex items-center gap-1.5">
              <span>🎙️</span> <span>Voice & Audio (Coming Soon)</span>
            </li>
            <li className="text-slate-500 flex items-center gap-1.5">
              <span>🎨</span> <span>Digital Art & Painting (Coming Soon)</span>
            </li>
          </ul>
        </div>

        {/* Col 3: Navigation */}
        <div>
          <div className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider mb-3">Platform</div>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><button onClick={() => setActivePage('play')} className="hover:text-white">Play Daily Rounds</button></li>
            <li><button onClick={() => setActivePage('daily')} className="hover:text-white">Sponsored Challenges</button></li>
            <li><button onClick={() => setActivePage('leaderboard')} className="hover:text-white">Global Leaderboard</button></li>
            <li><button onClick={() => setActivePage('pricing')} className="hover:text-white">Pro Pass ($2.99/mo)</button></li>
          </ul>
        </div>

        {/* Col 4: Trust */}
        <div>
          <div className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider mb-3">Fair Play & Security</div>
          <p className="text-xs text-slate-400 leading-relaxed mb-3">
            Real photos sourced from verified human photography libraries. Matched neural pairs generated with Google Gemini image vectors.
          </p>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono">
            <Shield className="w-3.5 h-3.5" /> 100% Verified Answers
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-4 flex-wrap">
          <span>© 2026 Human vs AI Platform. All rights reserved.</span>
          <button onClick={() => onOpenPrivacy && onOpenPrivacy()} className="hover:text-slate-300 underline underline-offset-2">
            Privacy Policy & Ad Choices
          </button>
          <button onClick={() => onOpenPrivacy && onOpenPrivacy()} className="hover:text-slate-300 underline underline-offset-2">
            Terms of Service
          </button>
        </div>
        <div className="flex items-center gap-1">
          <span>Made with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>for visual detectives worldwide</span>
        </div>
      </div>
    </footer>
  );
}
