// data/quests.ts
import type { QuestNode } from "../types/quest";
import dragonImage from '../assets/images/dragon.jpg';

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
        image: dragonImage,
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
      {
        id: 202,
        title: "Deliver Supplies",
        description: "Carry essential supplies to the next village safely.",
        completed: false,
        expReward: 180,
        image: "supplies.jpg",
      },
    ],
  },
  {
    id: 3,
    title: "Cave of Echoes",
    quests: [
      {
        id: 301,
        title: "Explore the Cave",
        description: "Investigate the mysterious sounds coming from the cave.",
        completed: false,
        expReward: 200,
        image: "cave.jpg",
      },
      {
        id: 302,
        title: "Defeat Cave Troll",
        description: "Eliminate the troll lurking in the cave.",
        completed: false,
        expReward: 350,
        image: "troll.jpg",
      },
    ],
  },
  {
    id: 4,
    title: "Sunken Ruins",
    quests: [
      {
        id: 401,
        title: "Recover Ancient Artifact",
        description: "Find and retrieve the lost artifact from the ruins.",
        completed: false,
        expReward: 400,
        image: "artifact.jpg",
      },
      {
        id: 402,
        title: "Solve the Puzzle",
        description: "Unlock the secrets of the ruins by solving the ancient puzzle.",
        completed: false,
        expReward: 220,
        image: "puzzle.jpg",
      },
    ],
  },
  {
    id: 5,
    title: "Haunted Village",
    quests: [
      {
        id: 501,
        title: "Exorcise the Spirits",
        description: "Free the village from lingering ghosts.",
        completed: false,
        expReward: 300,
        image: "ghosts.jpg",
      },
    ],
  },
  {
    id: 6,
    title: "Mountain Pass",
    quests: [
      {
        id: 601,
        title: "Climb the Peak",
        description: "Reach the top of the dangerous mountain pass.",
        completed: false,
        expReward: 250,
        image: "mountain.jpg",
      },
    ],
  },
  {
    id: 7,
    title: "Desert of Illusions",
    quests: [
      {
        id: 701,
        title: "Find the Oasis",
        description: "Locate the hidden oasis to survive the desert heat.",
        completed: false,
        expReward: 200,
        image: "oasis.jpg",
      },
      {
        id: 702,
        title: "Defeat Sand Serpent",
        description: "Eliminate the giant serpent threatening travelers.",
        completed: false,
        expReward: 400,
        image: "serpent.jpg",
      },
    ],
  },
  {
    id: 8,
    title: "Frozen Tundra",
    quests: [
      {
        id: 801,
        title: "Rescue Lost Explorers",
        description: "Find and save the explorers trapped in the snowstorm.",
        completed: false,
        expReward: 280,
        image: "explorers.jpg",
      },
    ],
  },
  {
    id: 9,
    title: "Volcanic Crater",
    quests: [
      {
        id: 901,
        title: "Collect Lava Crystals",
        description: "Gather rare crystals from the edge of the volcano.",
        completed: false,
        expReward: 350,
        image: "lava.jpg",
      },
    ],
  },
];
