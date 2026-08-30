import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { API } from '../services/api';
import { sound } from '../services/soundFx';
import { useAuth } from './AuthContext';

const GameContext = createContext();

export function GameProvider({ children }) {
  const { user } = useAuth();
  const [currentRound, setCurrentRound] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [revealData, setRevealData] = useState(null);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [totalPlayed, setTotalPlayed] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [remainingPlays, setRemainingPlays] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [quotaReached, setQuotaReached] = useState(false);
  const [roundKey, setRoundKey] = useState(0);

  useEffect(() => {
    if (user && user.streak) {
      setStreak(user.streak.currentStreak || 0);
      setBestStreak(user.streak.bestStreak || 0);
    }
  }, [user]);

  const fetchNextRound = async (category = selectedCategory) => {
    setLoading(true);
    setError(null);
    setRevealData(null);
    sound.playNext();

    try {
      const currentId = currentRound ? currentRound.id : null;
      const res = await API.getRound(category, currentId);
      setCurrentRound(res.round);
      setRemainingPlays(res.remainingPlays);
      setQuotaReached(false);
      setRoundKey(prev => prev + 1);
    } catch (err) {
      if (err.message && err.message.includes('limit reached')) {
        setQuotaReached(true);
      }
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const submitGuess = async (chosenSlot) => {
    if (!currentRound || revealData) return;
    try {
      const res = await API.submitGuess(currentRound.id, chosenSlot);
      setRevealData(res);
      setTotalPlayed(prev => prev + 1);

      if (res.correct) {
        sound.playCorrect();
        setTotalCorrect(prev => prev + 1);
        const newStreak = streak + 1;
        setStreak(newStreak);
        if (newStreak > bestStreak) setBestStreak(newStreak);

        // Milestone Confetti Celebration
        if (newStreak % 3 === 0 || newStreak >= 5) {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.55 },
            colors: ['#6366F1', '#06B6D4', '#10B981', '#F59E0B', '#EC4899']
          });
        }
      } else {
        sound.playWrong();
        setStreak(0);
      }

      return res;
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <GameContext.Provider value={{
      currentRound,
      revealData,
      loading,
      error,
      streak,
      bestStreak,
      totalPlayed,
      totalCorrect,
      remainingPlays,
      selectedCategory,
      quotaReached,
      roundKey,
      setSelectedCategory,
      fetchNextRound,
      submitGuess
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
