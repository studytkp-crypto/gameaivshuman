import React, { useState, useEffect } from 'react';
import { Sparkles, ZoomIn, HelpCircle, CheckCircle2, XCircle, ArrowRight, Flame, Target, Zap, Shield, RefreshCw } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { RevealCard } from './RevealCard';

const FALLBACK_DEFAULT_ROUND = {
  id: 'starter-round',
  category: 'Animals',
  imageAUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80',
  imageBUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
  difficulty: 'medium',
  playsCount: 142
};

export function GameArena() {
  const { currentRound, revealData, loading, submitGuess, fetchNextRound, streak, totalPlayed, totalCorrect, roundKey } = useGame();
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [hoveredSlot, setHoveredSlot] = useState(null);

  // Active round with fallback guarantee (never blank!)
  const activeRound = currentRound || FALLBACK_DEFAULT_ROUND;

  // Reset selectedSlot whenever round changes
  useEffect(() => {
    setSelectedSlot(null);
  }, [roundKey, currentRound?.id]);

  // Keyboard shortcut listener ('A' or 'B' or '1' or '2' or Space/Enter)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (zoomedImage && e.key === 'Escape') {
        setZoomedImage(null);
        return;
      }
      if (revealData) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          fetchNextRound();
        }
        return;
      }
      if (loading) return;

      if (e.key.toLowerCase() === 'a' || e.key === '1') {
        handlePick('A');
      } else if (e.key.toLowerCase() === 'b' || e.key === '2') {
        handlePick('B');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeRound, revealData, loading, zoomedImage]);

  const handlePick = async (slot) => {
    if (revealData || loading) return;
    setSelectedSlot(slot);
    await submitGuess(slot);
  };

  const rankTitle = streak >= 10 ? '👑 Master AI Hunter' : streak >= 5 ? '⚡ Senior Detective' : streak >= 3 ? '🔍 Sharp Investigator' : '🕵️ AI Sleuth';

  return (
    <div key={roundKey} className="w-full max-w-6xl mx-auto px-4 py-2 animate-fade-in">
      
      {/* Sleek Game HUD Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl glass-panel border border-white/10 mb-5 shadow-xl">
        
        {/* Left: Category & Difficulty */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-gradient-to-r from-brand-purple/20 to-brand-cyan/20 border border-brand-cyan/30 text-brand-cyan text-xs font-black font-mono tracking-wider">
            {activeRound.category?.toUpperCase()}
          </span>
          <span className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs font-mono">
            {activeRound.difficulty === 'hard' ? '🔥 HARD' : activeRound.difficulty === 'easy' ? '🌱 EASY' : '⚡ MEDIUM'}
          </span>
        </div>

        {/* Center: Rank Title */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono font-bold text-slate-300">
          <span className="text-amber-400">★</span>
          <span>{rankTitle}</span>
        </div>

        {/* Right: Accuracy & Streak */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs font-mono text-slate-400">
            <Target className="w-3.5 h-3.5 text-brand-cyan" />
            <span>Score: <strong className="text-white">{totalCorrect}/{totalPlayed}</strong></span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400 font-bold font-mono text-xs shadow-inner">
            <Flame className="w-3.5 h-3.5 fill-orange-400 animate-pulse" />
            <span>{streak} Streak</span>
          </div>
        </div>

      </div>

      {/* Main Question Title */}
      <div className="text-center mb-5">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-display text-white tracking-tight">
          Which image is <span className="gradient-text font-black">AI-Generated?</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          Inspect lighting, reflections, fine details, and textures. Click the fake one:
        </p>
      </div>

      {/* Side-by-Side Dual Card Arena */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-8 mb-5">
        
        {/* ===================== CARD A ===================== */}
        <div
          onClick={() => handlePick('A')}
          onMouseEnter={() => setHoveredSlot('A')}
          onMouseLeave={() => setHoveredSlot(null)}
          className={`group relative rounded-3xl overflow-hidden glass-card transition-all duration-300 transform ${
            !revealData
              ? 'cursor-pointer hover:scale-[1.015] hover:border-brand-cyan hover:shadow-2xl hover:shadow-brand-cyan/25 border-white/10'
              : revealData.aiSlot === 'A'
              ? 'border-2 border-rose-500 ring-4 ring-rose-500/30 shadow-2xl shadow-rose-500/40'
              : 'border-2 border-emerald-500 ring-4 ring-emerald-500/30 shadow-2xl shadow-emerald-500/40'
          }`}
        >
          {/* Slot Badge Pill */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black font-mono text-lg shadow-xl backdrop-blur-md border transition-all ${
              !revealData
                ? 'bg-slate-950/80 border-white/20 text-white group-hover:bg-brand-cyan group-hover:text-slate-950 group-hover:border-brand-cyan'
                : revealData.aiSlot === 'A'
                ? 'bg-rose-500 text-white border-rose-400'
                : 'bg-emerald-500 text-white border-emerald-400'
            }`}>
              A
            </div>
            {!revealData && (
              <span className="hidden group-hover:inline-block px-2.5 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md border border-brand-cyan/40 text-brand-cyan text-[11px] font-mono font-bold shadow-lg animate-fade-in">
                Click to Guess A (or press A)
              </span>
            )}
          </div>

          {/* Quick Zoom Inspect Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setZoomedImage(activeRound.imageAUrl);
            }}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-white/20 text-slate-300 hover:text-white hover:border-white shadow-xl transition-all"
            title="Inspect high resolution (Zoom)"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          {/* Image Container */}
          <div className="aspect-[4/3] w-full bg-slate-950 overflow-hidden relative">
            <img
              src={activeRound.imageAUrl}
              alt="Subject A"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Reveal Ribbon Bottom Banner */}
          {revealData && (
            <div className={`p-3.5 text-center font-black font-mono text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              revealData.aiSlot === 'A'
                ? 'bg-rose-500/25 text-rose-300 border-t border-rose-500/50 shadow-inner'
                : 'bg-emerald-500/25 text-emerald-300 border-t border-emerald-500/50 shadow-inner'
            }`}>
              {revealData.aiSlot === 'A' ? (
                <><span>🤖</span> AI GENERATED (FAKE SPOT)</>
              ) : (
                <><span>📷</span> AUTHENTIC REAL HUMAN PHOTO</>
              )}
            </div>
          )}
        </div>

        {/* ===================== CARD B ===================== */}
        <div
          onClick={() => handlePick('B')}
          onMouseEnter={() => setHoveredSlot('B')}
          onMouseLeave={() => setHoveredSlot(null)}
          className={`group relative rounded-3xl overflow-hidden glass-card transition-all duration-300 transform ${
            !revealData
              ? 'cursor-pointer hover:scale-[1.015] hover:border-brand-purple hover:shadow-2xl hover:shadow-brand-purple/25 border-white/10'
              : revealData.aiSlot === 'B'
              ? 'border-2 border-rose-500 ring-4 ring-rose-500/30 shadow-2xl shadow-rose-500/40'
              : 'border-2 border-emerald-500 ring-4 ring-emerald-500/30 shadow-2xl shadow-emerald-500/40'
          }`}
        >
          {/* Slot Badge Pill */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black font-mono text-lg shadow-xl backdrop-blur-md border transition-all ${
              !revealData
                ? 'bg-slate-950/80 border-white/20 text-white group-hover:bg-brand-purple group-hover:text-white group-hover:border-brand-purple'
                : revealData.aiSlot === 'B'
                ? 'bg-rose-500 text-white border-rose-400'
                : 'bg-emerald-500 text-white border-emerald-400'
            }`}>
              B
            </div>
            {!revealData && (
              <span className="hidden group-hover:inline-block px-2.5 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md border border-brand-purple/40 text-brand-purple text-[11px] font-mono font-bold shadow-lg animate-fade-in">
                Click to Guess B (or press B)
              </span>
            )}
          </div>

          {/* Quick Zoom Inspect Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setZoomedImage(activeRound.imageBUrl);
            }}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-white/20 text-slate-300 hover:text-white hover:border-white shadow-xl transition-all"
            title="Inspect high resolution (Zoom)"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          {/* Image Container */}
          <div className="aspect-[4/3] w-full bg-slate-950 overflow-hidden relative">
            <img
              src={activeRound.imageBUrl}
              alt="Subject B"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Reveal Ribbon Bottom Banner */}
          {revealData && (
            <div className={`p-3.5 text-center font-black font-mono text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              revealData.aiSlot === 'B'
                ? 'bg-rose-500/25 text-rose-300 border-t border-rose-500/50 shadow-inner'
                : 'bg-emerald-500/25 text-emerald-300 border-t border-emerald-500/50 shadow-inner'
            }`}>
              {revealData.aiSlot === 'B' ? (
                <><span>🤖</span> AI GENERATED (FAKE SPOT)</>
              ) : (
                <><span>📷</span> AUTHENTIC REAL HUMAN PHOTO</>
              )}
            </div>
          )}
        </div>

      </div>

      {/* Post-Round Detailed Reveal Card */}
      {revealData && (
        <RevealCard
          revealData={revealData}
          onNextRound={fetchNextRound}
          loadingNext={loading}
        />
      )}

      {/* Full-Screen Ultra HD Zoom Inspection Modal */}
      {zoomedImage && (
        <div 
          onClick={() => setZoomedImage(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl p-4 sm:p-10 flex flex-col items-center justify-center cursor-zoom-out animate-fade-in"
        >
          <div className="absolute top-6 right-6 text-xs text-slate-400 font-mono bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
            Click anywhere or press ESC to close
          </div>
          <img
            src={zoomedImage}
            alt="Ultra HD Zoom View"
            className="max-h-[85vh] max-w-[95vw] rounded-2xl object-contain border border-white/20 shadow-2xl"
          />
        </div>
      )}

    </div>
  );
}
