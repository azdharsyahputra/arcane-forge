// context/CharacterContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { characterData } from "@/data/character";
import type { Character } from "@/types/character";

interface CharacterContextType {
  character: Character;
  updateCharacter: (updates: Partial<Character>) => void;
}

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export function useCharacterContext() {
  const context = useContext(CharacterContext);
  if (!context) throw new Error("useCharacterContext must be used inside CharacterProvider");
  return context;
}

interface CharacterProviderProps {
  children: ReactNode;
}

export function CharacterProvider({ children }: CharacterProviderProps) {
  const [character, setCharacter] = useState<Character>(characterData);

  // Load data dari localStorage saat mount
  useEffect(() => {
    const saved = localStorage.getItem("character");
    if (saved) {
      setCharacter(JSON.parse(saved));
    }
  }, []);

  // Function untuk update karakter dan sync ke localStorage
  const updateCharacter = (updates: Partial<Character>) => {
    setCharacter((prev) => {
      const updated = { ...prev, ...updates };
      localStorage.setItem("character", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <CharacterContext.Provider value={{ character, updateCharacter }}>
      {children}
    </CharacterContext.Provider>
  );
}
