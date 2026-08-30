import React from 'react';
import { X, Brain, Search, Eye, Sparkles, AlertTriangle, ShieldCheck, Flame } from 'lucide-react';

export function MindsetGuideModal({ onClose }) {
  const tips = [
    {
      icon: '👂',
      title: '1. Asymmetric Earrings & Ear Cartilage',
      description: 'Diffusion models frequently generate mismatched earring designs, melted earlobes, or earrings that fuse directly into neck tendons.'
    },
    {
      icon: '🔤',
      title: '2. Pseudo-Glyph & Gibberish Text',
      description: 'Look at background street signs, restaurant menus, book covers, and neon billboards. AI cannot write consistent alphanumeric typography—it outputs dream-like pseudo-kanji or gibberish.'
    },
    {
      icon: '🖐️',
      title: '3. Finger Anatomy & Claw Merging',
      description: 'Examine knuckles, finger counts, fingernail boundaries, and paws. AI often blends digits together or creates extra claws in complex holding postures.'
    },
    {
      icon: '💡',
      title: '4. Contradictory Light Sources & Reflections',
      description: 'Check eye catchlights and puddle reflections. Real photography has a single coherent key light. AI images often reflect windows or studio lights that do not match the environment.'
    },
    {
      icon: '✨',
      title: '5. Hyper-Uniform "Plastic" Skin Smoothing',
      description: 'Real human skin has pores, subtle uneven redness, peach fuzz, and natural micro-wrinkles. AI portraits often look overly airbrushed, wax-like, or have repeating pore patterns.'
    },
    {
      icon: '📐',
      title: '6. Architectural Vanishing Point Inconsistency',
      description: 'Follow window frames, staircase railings, and floor tiles to their horizon vanishing point. AI architecture frequently features lines that bend or floating support beams that connect to nothing.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl p-4 flex items-center justify-center animate-fade-in">
      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-10 rounded-3xl glass-card border-2 border-brand-cyan/40 relative shadow-2xl text-left">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-cyan to-brand-purple flex items-center justify-center text-3xl shadow-xl shadow-brand-cyan/20">
            🧠
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-brand-cyan/15 border border-brand-cyan/30 text-brand-cyan text-[10px] font-black font-mono uppercase tracking-wider">
                FORENSIC FIELD MANUAL
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white mt-1">
              The AI Hunter's Mindset
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              The 6 forensic tells to spot neural diffusion fakes with 95%+ accuracy.
            </p>
          </div>
        </div>

        {/* 6 Strategy Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
          {tips.map((tip, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-brand-cyan/50 hover:bg-slate-900 transition-all shadow-lg"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{tip.icon}</span>
                <h3 className="font-bold text-white text-sm leading-snug">{tip.title}</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {tip.description}
              </p>
            </div>
          ))}
        </div>

        {/* Pro Detective Motto Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-purple/20 via-brand-cyan/20 to-transparent border border-brand-cyan/30 flex items-center justify-between gap-4">
          <div className="text-xs text-slate-300">
            <strong className="text-brand-cyan font-mono block mb-0.5">PRO TIP:</strong>
            Don't just look at the main subject — look at the background edges, reflections, and fine fabrics.
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl gradient-btn font-extrabold text-white text-xs shadow-lg flex-shrink-0"
          >
            Apply to Game →
          </button>
        </div>

      </div>
    </div>
  );
}
