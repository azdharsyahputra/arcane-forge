import { useState, useEffect } from "react";
import type { Character } from "@/types/character";

const STORAGE_KEY = "character-data";

export function useCharacter(initialCharacter: Character) {
  const [character, setCharacter] = useState<Character>(initialCharacter);

  // Load dari localStorage kalau ada
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setCharacter(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse character from localStorage", e);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Simpan ke localStorage setiap kali character berubah
  useEffect(() => {
    if (character) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(character));
    }
  }, [character]);

  // === Helpers ===

  // Hitung ulang exp & level (naik atau turun)
  const recalcLevel = (
    exp: number,
    level: number,
    expToNext: number
  ): { exp: number; level: number; expToNext: number } => {
    let newExp = exp;
    let newLevel = level;
    let newExpToNext = expToNext;

    // Level up
    while (newExp >= newExpToNext) {
      newExp -= newExpToNext;
      newLevel++;
      newExpToNext = Math.floor(newExpToNext * 1.2);
    }

    // Level down (kalau exp minus)
    while (newExp < 0 && newLevel > 1) {
      newLevel--;
      newExpToNext = Math.floor(newExpToNext / 1.2);
      newExp += newExpToNext;
    }

    return { exp: Math.max(0, newExp), level: newLevel, expToNext: newExpToNext };
  };

  // Naikkan exp & level otomatis
  const gainExp = (amount: number) => {
    setCharacter((prev) => {
      const totalExp = prev.totalExp + amount;
      const { exp, level, expToNext } = recalcLevel(
        prev.exp + amount,
        prev.level,
        prev.expToNextLevel
      );

      return {
        ...prev,
        exp,
        level,
        expToNextLevel: expToNext,
        totalExp,
      };
    });
  };

  // Selesaikan quest
  const completeQuest = (expReward: number) => {
    setCharacter((prev) => {
      const totalExp = prev.totalExp + expReward;
      const { exp, level, expToNext } = recalcLevel(
        prev.exp + expReward,
        prev.level,
        prev.expToNextLevel
      );

      return {
        ...prev,
        completedQuests: prev.completedQuests + 1,
        streak: prev.streak + 1,
        exp,
        level,
        expToNextLevel: expToNext,
        totalExp,
      };
    });
  };

  // Undo quest
  const undoQuest = (expReward: number) => {
    setCharacter((prev) => {
      const totalExp = Math.max(0, prev.totalExp - expReward);
      const { exp, level, expToNext } = recalcLevel(
        prev.exp - expReward,
        prev.level,
        prev.expToNextLevel
      );

      return {
        ...prev,
        completedQuests: Math.max(0, prev.completedQuests - 1),
        streak: Math.max(0, prev.streak - 1),
        exp,
        level,
        expToNextLevel: expToNext,
        totalExp,
      };
    });
  };

  // Reset streak manual
  const resetStreak = () => {
    setCharacter((prev) => ({
      ...prev,
      streak: 0,
    }));
  };

  return {
    character,
    setCharacter,
    gainExp,
    completeQuest,
    undoQuest,
    resetStreak,
  };
}
