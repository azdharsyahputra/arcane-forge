// types/quest.ts
export interface Quest {
  id: number;
  title: string;
  description: string;
  expReward: number;
  image?: string;
  completed?: boolean;
}

export interface QuestNode {
  id: number;
  title: string;
  quests: Quest[];
}
