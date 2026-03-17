import { Badge } from '../types';

export const LEVEL_BASE_XP = 100; // XP needed for next level = LEVEL_BASE_XP * current level

export const BADGES: Badge[] = [
  { id: 'first_feed', name: 'İlk Beslenme', icon: '🥇' },
  { id: 'happiness_master', name: 'Mutluluk Ustası', icon: '🏆' },
  { id: 'level_5', name: 'Seviye 5', icon: '⭐' },
  { id: 'level_10', name: 'Seviye 10', icon: '🌟' },
  { id: 'streak_3', name: '3 Günlük Seri', icon: '🔥' }
];

export const MAX_STATS = 100;
export const DECREASE_INTERVAL_MS = 1000 * 60; // Stats decrease every 1 minute
