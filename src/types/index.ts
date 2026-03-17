export type PetType = 'Kedi' | 'Köpek' | 'Tavşan';

export interface Badge {
  id: string;
  name: string;
  icon: string;
  unlockedAt?: number;
}

export interface PetState {
  name: string;
  type: PetType;
  hunger: number;
  happiness: number;
  energy: number;
  level: number;
  xp: number;
  badges: string[]; // Badge IDs
  lastInteractionTime: number;
  consecutiveDays: number;
}
