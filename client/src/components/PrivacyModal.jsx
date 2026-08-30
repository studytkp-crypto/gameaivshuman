import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

export function PrivacyModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md p-4 flex items-center justify-center animate-fade-in">
      <div className="w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 sm:p-8 rounded-3xl glass-card border border-brand-purple/40 relative shadow-2xl text-left">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-white">Privacy Policy & Terms of Service</h2>
            <p className="text-xs text-slate-400 font-mono">Effective Date: August 30, 2026</p>
          </div>
        </div>

        <div className="space-y-4 text-xs text-slate-300 leading-relaxed border-t border-white/10 pt-4">
          <section>
            <h3 className="text-sm font-bold text-white mb-1">1. Information We Collect</h3>
            <p>
              We collect minimal data to provide a seamless gaming experience: your account credentials (if you register), game attempt statistics (score, streaks, category accuracy), and standard server logs.
            </p>
          </section>

          <section>
            <h3 className="text-sm font-bold text-white mb-1">2. Google AdSense & Third-Party Cookies</h3>
            <p>
              Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to your sites and/or other sites on the Internet. Users may opt out of personalized advertising by visiting Google Ads Settings.
            </p>
          </section>

          <section>
            <h3 className="text-sm font-bold text-white mb-1">3. AI Content & Fair Use</h3>
            <p>
              Images showcased in the Human vs AI platform consist of verified public-domain photography and AI-synthesized demonstration media generated via Google Gemini neural diffusion models solely for educational and recreational discrimination games.
            </p>
          </section>

          <section>
            <h3 className="text-sm font-bold text-white mb-1">4. Subscriptions & Payments</h3>
            <p>
              Pro Detective passes are processed securely via Stripe. We never store credit card numbers on our servers.
            </p>
          </section>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl gradient-btn font-bold text-white text-xs"
          >
            I Understand & Accept
          </button>
        </div>

      </div>
    </div>
  );
}
