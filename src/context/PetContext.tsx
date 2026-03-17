import React, { createContext, useContext, ReactNode } from 'react';
import { usePet } from '../hooks/usePet';
import { PetState, PetType } from '../types';

interface PetContextType {
  petState: PetState;
  isReady: boolean;
  feed: () => void;
  play: () => void;
  sleep: () => void;
  resetPet?: (name: string, type: PetType) => void;
}

const PetContext = createContext<PetContextType | undefined>(undefined);

export const PetProvider = ({ children }: { children: ReactNode }) => {
  const petData = usePet();
  return (
    <PetContext.Provider value={petData}>
      {children}
    </PetContext.Provider>
  );
};

export const usePetContext = () => {
  const context = useContext(PetContext);
  if (context === undefined) {
    throw new Error('usePetContext must be used within a PetProvider');
  }
  return context;
};
