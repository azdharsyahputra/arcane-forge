import { useState } from "react";
import QuestLog from "../assets/components/quests/QuestLog";
import type { Quest, QuestNode } from "../types/quest";
import bgImage from "../assets/images/bg1.jpg";

interface QuestPageProps {
  node: QuestNode; // sekarang menerima node
  onBack: () => void;
}

export default function QuestPage({ node, onBack }: QuestPageProps) {
  const [quests, setQuests] = useState<Quest[]>(node.quests);

  const handleComplete = (id: number) => {
    setQuests((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, completed: true } : q
      )
    );
  };

  return (
    <div
      className="min-h-screen w-full relative bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center px-6 py-10">
        {/* Back button */}
        <button
          onClick={onBack}
          className="self-start mb-6 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
        >
          ← Back to Map
        </button>

        {/* Node title */}
        <h1 className="text-4xl font-bold text-purple-300 mb-8 tracking-wide text-center">
          {node.title}
        </h1>

        {/* Quest cards */}
        <QuestLog quests={quests} onComplete={handleComplete} />
      </div>
    </div>
  );
}
