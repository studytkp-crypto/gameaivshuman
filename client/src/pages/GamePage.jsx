import React, { useEffect } from 'react';
import { Sparkles, Trophy, Share2, Flame } from 'lucide-react';
import { GameArena } from '../components/GameArena';
import { AdBanner } from '../components/AdBanner';
import { useGame } from '../context/GameContext';

export function GamePage({ onOpenShare, onOpenPricing }) {
  const { currentRound, fetchNextRound, selectedCategory, setSelectedCategory, streak, totalPlayed, totalCorrect } = useGame();

  const categories = ['All', 'Animals', 'Portraits', 'Food', 'Architecture', 'Nature', 'Vehicles', 'Cyberpunk', 'Art'];

  useEffect(() => {
    if (!currentRound) {
      fetchNextRound();
    }
  }, []);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    fetchNextRound(cat);
  };

  const accuracy = totalPlayed > 0 ? Math.round((totalCorrect / totalPlayed) * 100) : 0;

  return (
    <div className="min-h-[85vh] py-4">
      
      {/* Category Pills Filter Bar */}
      <div className="max-w-6xl mx-auto px-4 mb-4 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-mono font-bold text-slate-500 mr-1 hidden sm:inline">MODE:</span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3 py-1 rounded-full text-xs font-bold font-mono whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-purple text-white shadow-md shadow-brand-purple/30 border border-brand-purple'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Quick Share Stats Button */}
        {totalPlayed > 0 && (
          <button
            onClick={onOpenShare}
            className="px-3.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-200 flex items-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5 text-brand-cyan" />
            <span>Share Score ({totalCorrect}/{totalPlayed})</span>
          </button>
        )}
      </div>

      {/* Main Game Arena */}
      <GameArena />

      {/* Google AdSense Placeholder Banner between rounds */}
      <AdBanner onUpgradeClick={onOpenPricing} />

    </div>
  );
}
