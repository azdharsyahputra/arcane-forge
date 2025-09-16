// types/quest.ts
export interface Quest {
  id: number;
  title: string;
  description: string;
  expReward: number;
  image?: string;
  completed?: boolean;
}
