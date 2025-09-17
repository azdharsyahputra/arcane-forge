// types/character.ts
export type Skill = {
  name: string;
  power: number;
};

export type Character = {
  id: number;
  name: string;
  level: number;
  exp: number;
  expToNextLevel: number;
  totalExp: number;          // total EXP akumulatif
  completedQuests: number;   // jumlah quest selesai
  totalQuests: number;       // total quest tersedia
  streak: number;            // daily streak
  avatar?: string;
  skills?: Skill[];          // skill karakter
};
