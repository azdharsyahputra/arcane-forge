// data/quests.ts
import type { QuestNode } from "../types/quest";
import quest1 from '../assets/images/quest/quest1.png';
import quest2 from '../assets/images/quest/quest2.png';
import quest3 from '../assets/images/quest/quest3.png';
import quest4 from '../assets/images/quest/quest4.png';

export const questNodes: QuestNode[] = [
  {
    id: 1,
    title: "Tutorial Grove",
    quests: [
      {
        id: 101,
        title: "Meet Your Hero",
        description: "Check out your character panel and get familiar with stats, HP, and skills.",
        completed: false,
        expReward: 30,
        image: quest1,
      },
      {
        id: 102,
        title: "Claim Your First Quest",
        description: "Learn how to accept quests and see them in your Quest Log.",
        completed: false,
        expReward: 40,
        image: quest2,
      },
      {
        id: 103,
        title: "Complete Quest Workshop",
        description: "Try a dynamic quest that updates based on your choices or progress.",
        completed: false,
        expReward: 50,
        image: quest3,
      },
      {
        id: 104,
        title: "Check Your Character Progress",
        description: "Level up, gain EXP, and observe how completing quests affects your hero.",
        completed: false,
        expReward: 50,
        image: quest4,
      },
    ],
  },
  {
    id: 2,
    title: "Forest Expedition",
    quests: [
      {
        id: 201,
        title: "Collect Rare Herbs",
        description: "Gather 5 magical herbs in the forest.",
        completed: false,
        expReward: 120,
        image: quest3,
      },
      {
        id: 202,
        title: "Hunt the Wolf Pack",
        description: "Defeat the wolves threatening travelers.",
        completed: false,
        expReward: 180,
        image: quest4,
      },
    ],
  },
  {
    id: 3,
    title: "Mountain Trail",
    quests: [
      {
        id: 301,
        title: "Cross the Rocky Path",
        description: "Navigate through the dangerous rocky trail.",
        completed: false,
        expReward: 150,
        image: quest2,
      },
      {
        id: 302,
        title: "Find Lost Supplies",
        description: "Recover supplies lost by merchants on the trail.",
        completed: false,
        expReward: 100,
        image: quest1,
      },
    ],
  },
  {
    id: 4,
    title: "Desert Mirage",
    quests: [
      {
        id: 401,
        title: "Locate Hidden Oasis",
        description: "Survive the heat and find the oasis.",
        completed: false,
        expReward: 200,
        image: quest3,
      },
      {
        id: 402,
        title: "Defeat Sand Scorpions",
        description: "Eliminate the dangerous sand scorpions.",
        completed: false,
        expReward: 180,
        image: quest4,
      },
    ],
  },
  {
    id: 5,
    title: "Ruins of the Ancient",
    quests: [
      {
        id: 501,
        title: "Explore the Forgotten Temple",
        description: "Discover secrets hidden within the ancient temple.",
        completed: false,
        expReward: 250,
        image: quest1,
      },
      {
        id: 502,
        title: "Retrieve the Ancient Scroll",
        description: "Find the lost scroll of knowledge inside the ruins.",
        completed: false,
        expReward: 300,
        image: quest2,
      },
    ],
  },
];
