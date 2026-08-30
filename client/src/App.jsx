import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { GameProvider, useGame } from './context/GameContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { GamePage } from './pages/GamePage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { PricingPage } from './pages/PricingPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminPage } from './pages/AdminPage';
import { DailyChallenge } from './components/DailyChallenge';
import { ShareModal } from './components/ShareModal';
import { PrivacyModal } from './components/PrivacyModal';
import { MindsetGuideModal } from './components/MindsetGuideModal';
import { X, Lock, Mail, User as UserIcon } from 'lucide-react';

function AppContent() {
  const [activePage, setActivePage] = useState('home'); // 'home' | 'play' | 'daily' | 'leaderboard' | 'pricing' | 'profile' | 'admin'
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [showShareModal, setShowShareModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showMindsetModal, setShowMindsetModal] = useState(false);

  // Auth Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [authError, setAuthError] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);

  const { login, register } = useAuth();
  const { streak, totalPlayed, totalCorrect } = useGame();

  const handleOpenAuth = (mode = 'login') => {
    setAuthMode(mode);
    setAuthError(null);
    setShowAuthModal(true);
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);
    try {
      if (authMode === 'login') {
        await login(email, password);
      } else {
        await register(email, password, name);
      }
      setShowAuthModal(false);
      setEmail('');
      setPassword('');
      setName('');
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0E1A] text-slate-100 selection:bg-brand-purple selection:text-white">
      
      {/* Top Sticky Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        openAuthModal={handleOpenAuth}
        onOpenMindset={() => setShowMindsetModal(true)}
      />

      {/* Main Page Viewport */}
      <main className="flex-1">
        {activePage === 'home' && (
          <LandingPage
            onStartPlay={() => setActivePage('play')}
            onOpenPricing={() => setActivePage('pricing')}
            onOpenAuth={handleOpenAuth}
          />
        )}
        {activePage === 'play' && (
          <GamePage
            onOpenShare={() => setShowShareModal(true)}
            onOpenPricing={() => setActivePage('pricing')}
          />
        )}
        {activePage === 'daily' && (
          <DailyChallenge onBackToRegularGame={() => setActivePage('play')} />
        )}
        {activePage === 'leaderboard' && (
          <LeaderboardPage />
        )}
        {activePage === 'pricing' && (
          <PricingPage onOpenAuth={handleOpenAuth} />
        )}
        {activePage === 'profile' && (
          <ProfilePage onOpenPricing={() => setActivePage('pricing')} />
        )}
        {activePage === 'admin' && (
          <AdminPage />
        )}
      </main>

      {/* Platform Footer */}
      <Footer 
        setActivePage={setActivePage} 
        onOpenPrivacy={() => setShowPrivacyModal(true)}
      />

      {/* Mindset & Strategy Guide Modal */}
      {showMindsetModal && (
        <MindsetGuideModal onClose={() => setShowMindsetModal(false)} />
      )}

      {/* Privacy Policy & Terms Modal */}
      {showPrivacyModal && (
        <PrivacyModal onClose={() => setShowPrivacyModal(false)} />
      )}

      {/* Share Score Modal */}
      {showShareModal && (
        <ShareModal
          streak={streak}
          totalPlayed={totalPlayed}
          totalCorrect={totalCorrect}
          onClose={() => setShowShareModal(false)}
        />
      )}

      {/* Auth Modal Dialog */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md p-4 flex items-center justify-center animate-fade-in">
          <div className="w-full max-w-md p-8 rounded-3xl glass-card border border-brand-purple/40 relative shadow-2xl">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-5 right-5 p-1 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-purple to-brand-cyan flex items-center justify-center text-2xl mx-auto mb-3 shadow-lg">
                🕵️
              </div>
              <h3 className="text-2xl font-black font-display text-white">
                {authMode === 'login' ? 'Detective Sign In' : 'Create Free Account'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {authMode === 'login' ? 'Welcome back! Resume your unbroken streak.' : 'Track your accuracy stats, climb leaderboards, and protect streaks.'}
              </p>
            </div>

            {authError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs text-center font-medium">
                {authError}
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {authMode === 'register' && (
                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">Detective Name</label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sherlock99"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="detective@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:border-brand-purple focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3.5 rounded-xl gradient-btn font-extrabold text-white text-sm shadow-lg hover:scale-102 transition-transform mt-2"
              >
                {authLoading ? 'Verifying...' : authMode === 'login' ? 'Sign In →' : 'Join Detective Squad →'}
              </button>
            </form>

            <div className="text-center mt-6 pt-4 border-t border-white/10 text-xs text-slate-400">
              {authMode === 'login' ? (
                <p>
                  Don't have an account?{' '}
                  <button onClick={() => setAuthMode('register')} className="text-brand-cyan font-bold hover:underline">
                    Create Free Account
                  </button>
                </p>
              ) : (
                <p>
                  Already registered?{' '}
                  <button onClick={() => setAuthMode('login')} className="text-brand-cyan font-bold hover:underline">
                    Sign In
                  </button>
                </p>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <GameProvider>
        <AppContent />
      </GameProvider>
    </AuthProvider>
  );
}
