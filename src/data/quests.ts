import type { Quest } from "../types/quest";

export const quests: Quest[] = [
  {
    id: 1,
    title: "Slay the Dragon",
    description: "Defeat the dragon terrorizing the village.",
    completed: false,
    expReward: 500,
    image: "dragon.jpg", // cukup nama file
  },
  {
    id: 2,
    title: "Gather Herbs",
    description: "Collect 10 healing herbs in the forest.",
    completed: false,
    expReward: 120,
    image: "herbs.jpg",
  },
  {
    id: 3,
    title: "Escort the Merchant",
    description: "Protect the merchant traveling to the next town.",
    completed: false,
    expReward: 250,
    image: "merchant.jpg",
  },
];
