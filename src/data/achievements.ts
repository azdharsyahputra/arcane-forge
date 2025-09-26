import type { Achievement } from "../types/achievement";

export const achievementsData: Achievement[] = [
  {
    id: 1,
    title: "First Steps",
    description: "Complete your first quest",
    unlocked: true,
  },
  {
    id: 2,
    title: "Novice Adventurer",
    description: "Reach level 5",
    unlocked: true,
  },
  {
    id: 3,
    title: "Collector",
    description: "Obtain 5 items",
    unlocked: false,
  },
  {
    id: 4,
    title: "Unstoppable",
    description: "Complete 10 quests in a row",
    unlocked: false,
  },
];
