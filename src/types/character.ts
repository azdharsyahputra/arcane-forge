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
  avatar?: string;
  skills?: Skill[]; // baru ditambahkan
};
