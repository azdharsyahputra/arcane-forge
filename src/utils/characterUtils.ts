import type { Character } from "../types/character";

export function addExp(character: Character, expGained: number): Character {
  let newExp = character.exp + expGained;
  let newLevel = character.level;
  let newExpToNextLevel = character.expToNextLevel;

  while (newExp >= newExpToNextLevel) {
    newExp -= newExpToNextLevel;
    newLevel += 1;
    newExpToNextLevel = Math.floor(newExpToNextLevel * 1.2); // tiap level naik 20%
  }

  return {
    ...character,
    exp: newExp,
    level: newLevel,
    expToNextLevel: newExpToNextLevel,
  };
}
