import React from 'react';
import { CheckCircle2, XCircle, ArrowRight, Lightbulb, Sparkles, BarChart2, Zap } from 'lucide-react';

export function RevealCard({ revealData, onNextRound, loadingNext }) {
  const isCorrect = revealData.correct;

  return (
    <div className={`p-6 sm:p-8 rounded-3xl glass-panel border-2 transition-all duration-300 shadow-2xl animate-fade-in ${
      isCorrect 
        ? 'border-emerald-500/50 bg-gradient-to-b from-emerald-950/30 to-slate-950/80 shadow-emerald-500/10' 
        : 'border-rose-500/50 bg-gradient-to-b from-rose-950/30 to-slate-950/80 shadow-rose-500/10'
    }`}>
      
      {/* Top Banner with Outcome & Next Button */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10">
        
        {/* Outcome Title & Icon */}
        <div className="flex items-center gap-4 sm:gap-5">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-xl flex-shrink-0 ${
            isCorrect 
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 ring-4 ring-emerald-500/20' 
              : 'bg-rose-500/20 text-rose-400 border border-rose-500/40 ring-4 ring-rose-500/20'
          }`}>
            {isCorrect ? '🎯' : '❌'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-black font-mono uppercase tracking-wider ${
                isCorrect ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'
              }`}>
                {isCorrect ? 'CORRECT GUESS' : 'INCORRECT GUESS'}
              </span>
              <span className="text-xs text-slate-400 font-mono">Image {revealData.aiSlot} is AI</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white mt-1">
              {isCorrect ? 'Sharp Eye! You Spotted the AI.' : 'Fooled by Neural Diffusion!'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Image <strong>{revealData.aiSlot}</strong> was synthesized by AI. Image <strong>{revealData.aiSlot === 'A' ? 'B' : 'A'}</strong> is a real human photograph.
            </p>
          </div>
        </div>

        {/* Big Next Round CTA */}
        <div className="w-full md:w-auto flex flex-col items-center gap-1.5 flex-shrink-0">
          <button
            type="button"
            onClick={() => onNextRound && onNextRound()}
            disabled={loadingNext}
            className="w-full md:w-auto px-10 py-4 rounded-2xl gradient-btn font-black text-white text-base shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            {loadingNext ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span>Loading Next...</span>
              </span>
            ) : (
              <>
                <span>Next Round</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
          <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
            Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-bold">Enter</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-bold">Space</kbd>
          </span>
        </div>

      </div>

      {/* 3 Investigation Deep-Dive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
        
        {/* 1. AI Clues */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-amber-500/40 transition-colors">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-2 font-mono">
            <Lightbulb className="w-4 h-4" />
            <span>AI ARTIFACT CLUES</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {revealData.aiClues || 'Look closely at the specular highlights, hair texture smoothing, and subtle boundary blending artifacts.'}
          </p>
        </div>

        {/* 2. Prompt Clues */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-brand-cyan/40 transition-colors">
          <div className="flex items-center gap-2 text-xs font-bold text-brand-cyan mb-2 font-mono">
            <Sparkles className="w-4 h-4" />
            <span>GENERATION PROMPT</span>
          </div>
          <p className="text-xs text-slate-300 font-mono leading-relaxed line-clamp-3">
            "{revealData.prompt || 'Photorealistic image generation matching real camera optics, depth of field, and lighting.'}"
          </p>
        </div>

        {/* 3. Global Stats */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-purple-400/40 transition-colors">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-400 mb-2 font-mono">
            <BarChart2 className="w-4 h-4" />
            <span>COMMUNITY ACCURACY</span>
          </div>
          <div className="text-3xl font-black font-display text-white mb-1">
            {revealData.accuracyRate || 52}%
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            of players accurately detected this specific AI generation.
          </p>
        </div>

      </div>

    </div>
  );
}
