import React, { useState } from 'react';
import { Crown, Check, Zap, Sparkles, Shield, ArrowRight } from 'lucide-react';
import { API } from '../services/api';
import { useAuth } from '../context/AuthContext';

export function PricingPage({ onOpenAuth }) {
  const { user, refreshUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleUpgrade = async () => {
    if (!user) {
      onOpenAuth('register');
      return;
    }

    setLoading(true);
    try {
      const res = await API.createCheckoutSession();
      if (res.checkoutUrl) {
        window.location.href = res.checkoutUrl;
      } else if (res.isSimulation) {
        // Dev Simulation Upgrade
        const simRes = await API.simulateUpgrade();
        setSuccessMsg(simRes.message);
        await refreshUser();
      }
    } catch (e) {
      alert(e.message || 'Upgrade failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-purple/15 border border-brand-purple/30 text-brand-purple text-xs font-mono font-bold mb-3">
          <Crown className="w-3.5 h-3.5" />
          <span>PRO DETECTIVE PASS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-display text-white mb-3">
          Level Up Your Intuition
        </h1>
        <p className="text-sm text-slate-400 max-w-lg mx-auto">
          One simple, student-friendly subscription. Cancel anytime with one click.
        </p>
      </div>

      {successMsg && (
        <div className="max-w-md mx-auto p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-bold text-center mb-8 animate-fade-in">
          {successMsg}
        </div>
      )}

      {/* 2-Tier Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
        
        {/* Tier 1: Free */}
        <div className="p-8 rounded-3xl glass-card border border-white/10 flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wide mb-2">FREE TIER</div>
            <h3 className="text-2xl font-black font-display text-white mb-2">Casual Sleuth</h3>
            <div className="flex items-baseline gap-1 my-4">
              <span className="text-4xl font-black text-white">$0</span>
              <span className="text-xs text-slate-400 font-mono">/ forever</span>
            </div>
            <p className="text-xs text-slate-400 mb-6">Great for casual daily brain training and intuition testing.</p>
            
            <ul className="space-y-3 text-xs text-slate-300 mb-8">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" /> 10 Free matched rounds every day
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" /> Image Mode (Human vs AI)
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" /> Daily sponsored challenges
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" /> Global Top 100 Leaderboard
              </li>
              <li className="flex items-center gap-2 text-slate-500">
                <span>✕</span> No streak freeze protection
              </li>
              <li className="flex items-center gap-2 text-slate-500">
                <span>✕</span> Non-intrusive ads between rounds
              </li>
            </ul>
          </div>

          <div className="text-xs text-center text-slate-400 font-mono py-2 bg-white/5 rounded-xl border border-white/5">
            Active By Default
          </div>
        </div>

        {/* Tier 2: Pro Detective Pass ($2.99/mo) */}
        <div className="p-8 rounded-3xl glass-panel border-2 border-brand-purple bg-gradient-to-b from-brand-purple/15 to-transparent relative flex flex-col justify-between shadow-2xl shadow-brand-purple/20">
          <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-brand-purple to-brand-cyan text-white text-[10px] font-black uppercase font-mono tracking-wider shadow-lg">
            MOST POPULAR
          </div>

          <div>
            <div className="text-xs font-mono font-bold text-brand-cyan uppercase tracking-wide mb-2">PRO PASS</div>
            <h3 className="text-2xl font-black font-display text-white mb-2">Master Detective</h3>
            <div className="flex items-baseline gap-1 my-4">
              <span className="text-4xl font-black text-white">$2.99</span>
              <span className="text-xs text-slate-400 font-mono">/ month</span>
            </div>
            <p className="text-xs text-slate-300 mb-6">For sharp eyes who want unlimited play and detailed accuracy metrics.</p>
            
            <ul className="space-y-3 text-xs text-slate-200 mb-8 font-medium">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 font-bold" /> <strong>Unlimited 24/7 rounds</strong> (No daily caps)
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 font-bold" /> <strong>100% Ad-Free</strong> seamless speed
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 font-bold" /> <strong>Streak Freeze Protection</strong> (Never lose high streak)
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 font-bold" /> <strong>Per-Category Accuracy Radar Analytics</strong>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 font-bold" /> <strong>Verified Gold Crown Profile Badge</strong>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 font-bold" /> <strong>Early access to Voice & Text modes</strong>
              </li>
            </ul>
          </div>

          <button
            onClick={handleUpgrade}
            disabled={loading || user?.isPremium}
            className="w-full py-4 rounded-xl gradient-btn font-black text-white text-sm shadow-xl hover:scale-105 transition-transform flex items-center justify-center gap-2"
          >
            {user?.isPremium ? (
              <span>✓ Pro Pass Active</span>
            ) : loading ? (
              <span>Processing...</span>
            ) : (
              <>
                <span>Upgrade to Pro ($2.99/mo)</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

      </div>

      {/* FAQ Section */}
      <div className="max-w-2xl mx-auto text-left space-y-4">
        <h3 className="text-xl font-bold font-display text-white text-center mb-6">Frequently Asked Questions</h3>
        
        <div className="p-4 rounded-xl glass-card border border-white/10">
          <div className="text-sm font-bold text-white mb-1">How does Streak Protection work?</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            If you miss a single round or forget to play for a day, your streak is preserved once per billing cycle automatically.
          </p>
        </div>

        <div className="p-4 rounded-xl glass-card border border-white/10">
          <div className="text-sm font-bold text-white mb-1">Can I cancel anytime?</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Yes! You can manage or cancel your subscription instantly through your profile page without any cancellation fees.
          </p>
        </div>
      </div>

    </div>
  );
}
