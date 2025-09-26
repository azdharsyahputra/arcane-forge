// src/types/achievement.ts
export type Achievement = {
  id: number;
  title: string;
  description: string;
  points: number;
  icon?: string; // optional biar bisa fallback default
};
