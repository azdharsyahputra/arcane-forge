import type { Achievement } from "../types/achievement";

export const achievementsData: Achievement[] = [
  {
    id: 1,
    title: "First Steps",
    description: "Created your first character",
    points: 10,
    icon: "/images/achievements/first-steps.png",
  },
  {
    id: 2,
    title: "Quest Beginner",
    description: "Completed your first quest",
    points: 20,
    icon: "/images/achievements/quest-beginner.png",
  },
  {
    id: 3,
    title: "Level Up!",
    description: "Reached level 5",
    points: 30,
    icon: "/images/achievements/level-up.png",
  },
  {
    id: 4,
    title: "Adventurer",
    description: "Completed 10 quests",
    points: 50,
    icon: "/images/achievements/adventurer.png",
  },
  {
    id: 5,
    title: "Epic Survivor",
    description: "Survived a battle with less than 10% HP",
    points: 40,
    icon: "/images/achievements/survivor.png",
  },
];
