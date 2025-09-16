import type { Quest } from "../../../types/quest";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

interface QuestLogProps {
  quests: Quest[];
  onComplete: (id: number) => void;
}

export default function QuestLog({ quests, onComplete }: QuestLogProps) {
  return (
    <div className="flex flex-col items-center gap-8">
      {/* Progress Path */}
      <div className="flex items-center gap-4 mb-4">
        {quests.map((q, idx) => (
          <div key={q.id} className="flex items-center">
            {/* Node */}
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                          ${q.completed ? "bg-purple-400 border-purple-400" : "bg-gray-700 border-gray-500"}`}
            >
              {q.completed ? "✓" : idx + 1}
            </div>

            {/* Connector line, kecuali node terakhir */}
            {idx !== quests.length - 1 && (
              <div
                className={`flex-1 h-1 ${
                  quests[idx + 1].completed ? "bg-purple-400" : "bg-gray-500"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      {/* Quest Cards */}
      <div className="flex flex-wrap gap-6 justify-center">
        {quests.map((q) => (
          <Card
            key={q.id}
            className={`flex w-96 md:w-80 items-center transition-transform hover:scale-105
                        ${q.completed ? "line-through opacity-70" : ""}`}
          >
            {q.image && (
              <img
                src={q.image}
                alt={q.title}
                className="w-28 h-28 md:w-24 md:h-24 rounded-lg object-cover mr-4 flex-shrink-0"
              />
            )}
            <div className="flex flex-col flex-1">
              <h3 className="text-xl font-bold text-purple-200">{q.title}</h3>
              <p className="text-gray-300 text-sm mt-1">{q.description}</p>
              <p className="text-gray-400 text-xs mt-1">EXP: {q.expReward}</p>
              {!q.completed && (
                <Button
                  variant="accent"
                  className="mt-3 self-start"
                  onClick={() => onComplete(q.id)}
                >
                  Complete
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
