import React, { useState } from 'react';
import { Copy, Check, Share2, X, Twitter } from 'lucide-react';

export function ShareModal({ streak, totalPlayed, totalCorrect, onClose }) {
  const [copied, setCopied] = useState(false);

  const accuracy = totalPlayed > 0 ? Math.round((totalCorrect / totalPlayed) * 100) : 0;
  const shareText = `🤖 Can your eyes beat the algorithm?\n\nI just scored ${totalCorrect}/${totalPlayed} (${accuracy}% accuracy) with a ${streak}-round streak on Human vs AI!\n\nPlay free at: https://humanvsai.game`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTweet = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md p-4 flex items-center justify-center animate-fade-in">
      <div className="w-full max-w-md p-6 rounded-2xl glass-card border border-brand-purple/40 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <span className="text-4xl block mb-2">🏆</span>
          <h3 className="text-xl font-bold font-display text-white">Share Your Detective Score</h3>
          <p className="text-xs text-slate-400 mt-1">Challenge your friends to see if they can spot the AI</p>
        </div>

        {/* Share Preview Card */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-white/10 text-xs font-mono text-slate-300 mb-6 whitespace-pre-wrap leading-relaxed">
          {shareText}
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleCopy}
            className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/10 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Score'}</span>
          </button>
          <button
            onClick={handleTweet}
            className="px-5 py-3 rounded-xl bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-colors"
          >
            <Twitter className="w-4 h-4 fill-white" />
            <span>Tweet</span>
          </button>
        </div>
      </div>
    </div>
  );
}
