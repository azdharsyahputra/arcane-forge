import type { Character } from "../types/character";
import MageLv1 from '../assets/images/mage-lv1.png';

export const characterData: Character = {
  id: 1,
  name: "Kaelith",
  level: 1,
  exp: 0,
  expToNextLevel: 100,
  totalExp: 0,           // total akumulatif EXP
  completedQuests: 0,    // quest yang sudah selesai
  totalQuests: 2,        // total quest yang ada (contoh)
  streak: 0,             // daily streak
  avatar: MageLv1,
  skills: [
    { name: "Fireball", power: 30 },
    { name: "Ice Shield", power: 20 },
    { name: "Lightning Strike", power: 40 },
  ],
  hp:100,
  maxHp:100
};
