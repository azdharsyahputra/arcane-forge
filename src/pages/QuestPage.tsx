import { useState } from "react";
import QuestLog from "../assets/components/quests/QuestLog";
import { quests as questData } from "../data/quests";
import type { Quest } from "../types/quest";
import bgImage from "../assets/images/bg1.jpg";

export default function QuestPage() {
  const [quests, setQuests] = useState<Quest[]>(questData);

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
      {/* Overlay gelap supaya teks terbaca */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Konten utama */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center px-6 py-10">
        <h1 className="text-5xl font-bold text-purple-300 mb-8 tracking-wide text-center">
          Quest Log
        </h1>

        <QuestLog quests={quests} onComplete={handleComplete} />
      </div>
    </div>
  );
}