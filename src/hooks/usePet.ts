import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PetState, PetType } from '../types';
import { MAX_STATS, LEVEL_BASE_XP, DECREASE_INTERVAL_MS } from '../constants/petConfig';

const STORAGE_KEY = '@pocket_pet_state';

const defaultState: PetState = {
  name: 'Dost',
  type: 'Kedi',
  hunger: 50,
  happiness: 50,
  energy: 50,
  level: 1,
  xp: 0,
  badges: [],
  lastInteractionTime: Date.now(),
  consecutiveDays: 0,
};

export const usePet = () => {
  const [petState, setPetState] = useState<PetState>(defaultState);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadState = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed: PetState = JSON.parse(stored);
          const now = Date.now();
          const msPassed = now - parsed.lastInteractionTime;
          const intervalsPassed = Math.floor(msPassed / DECREASE_INTERVAL_MS);
          
          if (intervalsPassed > 0) {
              const decline = intervalsPassed * 2; 
              parsed.hunger = Math.max(0, parsed.hunger - decline);
              parsed.happiness = Math.max(0, parsed.happiness - decline);
              parsed.energy = Math.max(0, parsed.energy - decline);
              parsed.lastInteractionTime = now;
          }
          
          setPetState(parsed);
        }
      } catch (e) {
        console.error("Failed to load pet state", e);
      } finally {
        setIsReady(true);
      }
    };
    loadState();
  }, []);

  useEffect(() => {
    if (isReady) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(petState));
    }
  }, [petState, isReady]);

  useEffect(() => {
    if (!isReady) return;
    const interval = setInterval(() => {
      setPetState((prev) => ({
        ...prev,
        hunger: Math.max(0, prev.hunger - 1),
        happiness: Math.max(0, prev.happiness - 1),
        energy: Math.max(0, prev.energy - 1),
        lastInteractionTime: Date.now(),
      }));
    }, DECREASE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [isReady]);

  const checkStreak = (prev: PetState): number => {
    const now = new Date();
    const last = new Date(prev.lastInteractionTime);
    const msPerDay = 1000 * 60 * 60 * 24;
    const diffDays = Math.floor(now.getTime() / msPerDay) - Math.floor(last.getTime() / msPerDay);
    
    if (diffDays === 1) return prev.consecutiveDays + 1;
    if (diffDays > 1) return 1;
    return prev.consecutiveDays === 0 ? 1 : prev.consecutiveDays;
  };

  const addXp = (amount: number) => {
    setPetState((prev) => {
      const newXp = prev.xp + amount;
      const targetLevel = Math.floor(newXp / LEVEL_BASE_XP) + 1;
      let newLevel = prev.level;
      let newBadges = [...prev.badges];
      const newStreak = checkStreak(prev);

      if (targetLevel > prev.level && prev.level < 10) {
        newLevel = Math.min(10, targetLevel);
        if (newLevel >= 5 && !newBadges.includes('level_5')) newBadges.push('level_5');
        if (newLevel >= 10 && !newBadges.includes('level_10')) newBadges.push('level_10');
      }
      
      if (newStreak >= 3 && !newBadges.includes('streak_3')) newBadges.push('streak_3');

      return {
        ...prev,
        xp: newLevel >= 10 ? prev.xp : newXp,
        level: newLevel,
        badges: newBadges,
        consecutiveDays: newStreak,
      };
    });
  };

  const feed = () => {
    setPetState((prev) => {
      const newBadges = [...prev.badges];
      if (!newBadges.includes('first_feed')) newBadges.push('first_feed');
      return {
        ...prev,
        hunger: Math.min(MAX_STATS, prev.hunger + 20),
        lastInteractionTime: Date.now(),
        badges: newBadges,
      };
    });
    addXp(10);
  };

  const play = () => {
    setPetState((prev) => {
      const newBadges = [...prev.badges];
      if (!newBadges.includes('happiness_master') && prev.happiness + 15 >= 100) {
        newBadges.push('happiness_master');
      }
      return {
        ...prev,
        happiness: Math.min(MAX_STATS, prev.happiness + 15),
        energy: Math.max(0, prev.energy - 10),
        hunger: Math.max(0, prev.hunger - 10),
        lastInteractionTime: Date.now(),
        badges: newBadges,
      };
    });
    addXp(15);
  };

  const sleep = () => {
    setPetState((prev) => ({
      ...prev,
      energy: Math.min(MAX_STATS, prev.energy + 30),
      lastInteractionTime: Date.now(),
    }));
    addXp(5);
  };

  return {
    petState,
    isReady,
    feed,
    play,
    sleep
  };
};
