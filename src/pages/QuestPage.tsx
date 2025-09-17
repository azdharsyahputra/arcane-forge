import { useState } from "react";
import QuestLog from "../assets/components/quests/QuestLog";
import type { QuestNode, Quest } from "../types/quest";
import bgImage from "../assets/images/bg1.jpg";

interface QuestPageProps {
  node: QuestNode;
  onBack: () => void;
}

export default function QuestPage({ node, onBack }: QuestPageProps) {
  const storageKey = `node-${node.id}-quests`;
  const [quests, setQuests] = useState<Quest[]>(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : node.quests;
  });

  const handleComplete = (id: number) => {
    setQuests((prev) => {
      const updated = prev.map((q) =>
        q.id === id ? { ...q, completed: true } : q
      );
      localStorage.setItem(storageKey, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div
      className="min-h-screen w-full relative bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center px-6 py-10">
        <button
          onClick={onBack}
          className="self-start mb-6 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
        >
          ← Back to Map
        </button>

        <h1 className="text-4xl font-bold text-purple-300 mb-8 tracking-wide text-center">
          {node.title}
        </h1>

        <QuestLog quests={quests} onComplete={handleComplete} />
      </div>
    </div>
  );
}
