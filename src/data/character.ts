import type { Character } from "../types/character";
import MageLv1 from '../assets/images/mage-lv1.png';
import { achievementsData } from "./achievements";

export const characterData: Character = {
  id: 1,
  name: "Kaelith",
  level: 1,
  exp: 0,
  expToNextLevel: 100,
  totalExp: 0,
  completedQuests: 0,
  totalQuests: 2,
  streak: 0,
  avatar: MageLv1,
  skills: [
    { name: "Fireball", power: 30 },
    { name: "Ice Shield", power: 20 },
    { name: "Lightning Strike", power: 40 },
  ],
  hp:100,
  maxHp:100,
  achievements: achievementsData,
};
