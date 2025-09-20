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
  totalExp: number;
  completedQuests: number;
  totalQuests: number;
  streak: number;
  lastClaim?: string;
  avatar?: string;
  skills?: Skill[];
  maxHp?: number;
  hp?: number; 
};
