import type { Achievement } from "../types/achievement";

export const achievementsData: Achievement[] = [
  {
    id: 1,
    title: "First Steps",
    description: "Complete your first quest.",
    icon: "🥇",
    unlocked: true,
  },
  {
    id: 2,
    title: "Adventurer",
    description: "Reach level 5.",
    icon: "⚔️",
    unlocked: false,
  },
  {
    id: 3,
    title: "Treasure Hunter",
    description: "Collect 10 items.",
    icon: "💎",
    unlocked: false,
  },
];
