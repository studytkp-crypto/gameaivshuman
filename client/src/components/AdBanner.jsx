import React, { useEffect } from 'react';
import { Crown, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function AdBanner({ onUpgradeClick }) {
  const { user } = useAuth();

  // Premium users are 100% ad-free
  if (user?.isPremium) return null;

  // Check if live AdSense is active on window
  const adClient = window.GOOGLE_ADSENSE_CLIENT_ID || '';
  const adSlot = window.GOOGLE_ADSENSE_SLOT_ID || '';

  useEffect(() => {
    if (adClient && adSlot) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {}
    }
  }, [adClient, adSlot]);

  return (
    <div className="w-full max-w-4xl mx-auto my-6 p-4 rounded-2xl glass-card border border-white/10 text-center relative overflow-hidden shadow-xl">
      <div className="absolute top-2 right-3 text-[9px] text-slate-500 font-mono tracking-widest uppercase">
        SPONSORED ADVERTISEMENT
      </div>

      {adClient && adSlot ? (
        /* Live Google AdSense Display Unit */
        <div className="min-h-[90px] flex items-center justify-center overflow-hidden my-2">
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '100%', minHeight: '90px' }}
            data-ad-client={adClient}
            data-ad-slot={adSlot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      ) : (
        /* Sleek Conversion & Ads Placeholder */
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-1">
          <div className="text-left">
            <div className="flex items-center gap-2 text-sm font-bold text-white mb-1">
              <span className="text-xl">🚀</span>
              <span>Level Up to Unlimited Plays & Zero Ads</span>
            </div>
            <p className="text-xs text-slate-400">
              Get the Pro Detective Pass for $2.99/mo: 100% ad-free, 24/7 unlimited rounds & streak freeze.
            </p>
          </div>
          <button
            onClick={onUpgradeClick}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-lg flex-shrink-0 transition-transform hover:scale-105"
          >
            <Crown className="w-4 h-4" />
            <span>Remove Ads ($2.99)</span>
          </button>
        </div>
      )}
    </div>
  );
}
