import type { Character } from "../types/character";
import MageLv1 from '../assets/images/mage-lv1.png';

export const characterData: Character = {
  id: 1,
  name: "Ajar",
  level: 1,
  exp: 0,
  expToNextLevel: 100,
  avatar: MageLv1,
  skills: [
    { name: "Fireball", power: 30 },
    { name: "Ice Shield", power: 20 },
    { name: "Lightning Strike", power: 40 },
  ]
};
