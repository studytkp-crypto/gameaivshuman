import React, { useState } from 'react';
import { Eye, Sparkles, Shield, ArrowRight, Lightbulb, Search, Scan, Layers, CheckCircle2 } from 'lucide-react';

const FORENSIC_SCENES = [
  {
    id: 'scene-1',
    step: '01',
    eyebrow: 'ANATOMICAL INTEGRITY',
    title: 'Earrings, Whiskers & Fine Symmetry',
    description: 'Diffusion models struggle with bilateral symmetry. Real photography captures organic imperfections, while AI creates impossible morphing jewellery or unnatural whisker lattices.',
    imageReal: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80',
    imageAi: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
    aiClue: 'Whiskers fuse directly into background grass without independent shadow lines.',
    tags: ['Bilateral Symmetry', 'Earring Latency', 'Organic Hair']
  },
  {
    id: 'scene-2',
    step: '02',
    eyebrow: 'BACKGROUND SEMANTICS',
    title: 'Pseudo-Typography & Street Signs',
    description: 'AI image generators understand visual concepts but cannot generate coherent language. Always check store signs, cafe menus, and book covers for alien-like pseudo-kanji.',
    imageReal: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    imageAi: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    aiClue: 'Neon signs spell out dream-like pseudo glyphs rather than readable Japanese.',
    tags: ['Text Synthesis', 'Neon Dispersion', 'Symbol Semantics']
  },
  {
    id: 'scene-3',
    step: '03',
    eyebrow: 'OPTICS & LIGHTING',
    title: 'Pupil Catchlights & Light Vanishing Points',
    description: 'A genuine camera capture possesses a single coherent key light source. Neural images frequently synthesize contradictory catchlights in eyes or reflections pointing the wrong way.',
    imageReal: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    imageAi: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    aiClue: 'Eye reflections display two rectangular softboxes in an outdoor alley setting.',
    tags: ['Key Light Coherence', 'Corneal Reflection', 'Fresnel Vectors']
  },
  {
    id: 'scene-4',
    step: '04',
    eyebrow: 'STRUCTURAL PHYSICS',
    title: 'Architectural Vanishing Points & Load Beams',
    description: 'Real buildings follow rigid perspective geometry and structural physics. AI architecture often features floating skywalks that dead-end into mid-air.',
    imageReal: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    imageAi: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    aiClue: 'Ceiling beams do not meet perpendicular load columns at the room corners.',
    tags: ['Perspective Geometry', 'Horizon vanishing', 'Load Distribution']
  }
];

export function ForensicScrollLab({ onPlayNow }) {
  const [activeTab, setActiveTab] = useState(0);
  const activeScene = FORENSIC_SCENES[activeTab];

  return (
    <section className="py-16 px-4 border-t border-white/10 bg-slate-950/60 relative overflow-hidden">
      
      {/* Background Cyber Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-brand-purple/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-brand-cyan/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-cyan/15 border border-brand-cyan/30 text-brand-cyan text-xs font-mono font-bold mb-3">
            <Scan className="w-3.5 h-3.5" />
            <span>CINEMATIC FORENSIC LAB</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight">
            How to Spot AI Like a Pro
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-1">
            Explore the 4 core forensic detection lenses used by top digital investigators.
          </p>
        </div>

        {/* Step Tabs Navigation */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {FORENSIC_SCENES.map((scene, idx) => (
            <button
              key={scene.id}
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold font-mono transition-all flex items-center gap-2 border ${
                activeTab === idx
                  ? 'bg-gradient-to-r from-brand-purple to-brand-cyan text-white border-transparent shadow-lg shadow-brand-purple/30 scale-105'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border-white/10'
              }`}
            >
              <span className="opacity-60">{scene.step}</span>
              <span>{scene.eyebrow}</span>
            </button>
          ))}
        </div>

        {/* Active Scene Forensic Card */}
        <div className="p-6 sm:p-10 rounded-3xl glass-panel border-2 border-brand-cyan/30 shadow-2xl animate-fade-in grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Descriptive Breakdown */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-brand-cyan text-slate-950 font-mono font-black text-xs">
                MODULE {activeScene.step}
              </span>
              <span className="text-xs text-slate-400 font-mono tracking-wider">{activeScene.eyebrow}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black font-display text-white leading-tight">
              {activeScene.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeScene.description}
            </p>

            {/* AI Clue Box */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 font-mono mb-1">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>FORENSIC TELL:</span>
              </div>
              <p className="text-xs text-amber-200/90 leading-relaxed font-sans">
                {activeScene.aiClue}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {activeScene.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-[11px] font-mono">
                  #{tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                onClick={onPlayNow}
                className="px-6 py-3 rounded-xl gradient-btn font-black text-white text-xs shadow-lg flex items-center gap-2 hover:scale-105 transition-transform"
              >
                <span>Test in Live Arena</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Visual Comparison Display */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Real Card */}
            <div className="rounded-2xl overflow-hidden glass-card border border-emerald-500/40 relative shadow-xl group">
              <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-[10px] font-black font-mono">
                📷 AUTHENTIC HUMAN PHOTO
              </div>
              <div className="aspect-[4/3] w-full bg-slate-900 overflow-hidden">
                <img
                  src={activeScene.imageReal}
                  alt="Real Sample"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            {/* AI Fake Card */}
            <div className="rounded-2xl overflow-hidden glass-card border border-rose-500/40 relative shadow-xl group">
              <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-rose-500/40 text-rose-300 text-[10px] font-black font-mono">
                🤖 NEURAL AI DIFFUSION
              </div>
              <div className="aspect-[4/3] w-full bg-slate-900 overflow-hidden">
                <img
                  src={activeScene.imageAi}
                  alt="AI Sample"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
