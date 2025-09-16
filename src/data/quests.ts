// data/quests.ts
import type { QuestNode } from "../types/quest";

export const questNodes: QuestNode[] = [
  {
    id: 1,
    title: "Forest of Trials",
    quests: [
      {
        id: 101,
        title: "Slay the Dragon",
        description: "Defeat the dragon terrorizing the village.",
        completed: false,
        expReward: 500,
        image: "dragon.jpg",
      },
      {
        id: 102,
        title: "Gather Herbs",
        description: "Collect 10 healing herbs in the forest.",
        completed: false,
        expReward: 120,
        image: "herbs.jpg",
      },
    ],
  },
  {
    id: 2,
    title: "Merchant Road",
    quests: [
      {
        id: 201,
        title: "Escort the Merchant",
        description: "Protect the merchant traveling to the next town.",
        completed: false,
        expReward: 250,
        image: "merchant.jpg",
      },
    ],
  },
];
