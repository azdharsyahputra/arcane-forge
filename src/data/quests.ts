import type { Quest } from "../types/quest";

export const quests: Quest[] = [
  {
    id: 1,
    title: "Fix The bug",
    description: "Fix base url bug at Dynamic Checksheet 5R",
    completed: false,
    expReward: 500,
    image: "dragon.jpg", // cukup nama file
  },
  {
    id: 2,
    title: "Colect API for Dashboard Statistic",
    description: "I need api for fl statistic and ballmill stat get that information from mas luky",
    completed: false,
    expReward: 120,
    image: "herbs.jpg",
  },
  {
    id: 3,
    title: "Fetch API",
    description: "Sync that api you get to your UI",
    completed: false,
    expReward: 250,
    image: "merchant.jpg",
  },
  {
    id: 4,
    title: "Input Dynamic Revision",
    description: "get the dynamic checksheet 5r excell file from pak polin and put data into dynamic checksheet 5s",
    completed: false,
    expReward: 250,
    image: "merchant.jpg",
  },
];
