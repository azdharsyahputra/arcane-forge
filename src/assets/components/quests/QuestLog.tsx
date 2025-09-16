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
      <div className="flex items-center gap-4 mb-6">
        {quests.map((q, idx) => (
          <div key={q.id} className="flex items-center">
            {/* Node */}
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-semibold
                transition-colors duration-300
                ${q.completed ? "bg-purple-500 border-purple-500 text-white" : "bg-gray-800 border-gray-600 text-gray-400"}`}
            >
              {q.completed ? "✓" : idx + 1}
            </div>

            {/* Connector line */}
            {idx !== quests.length - 1 && (
              <div
                className={`flex-1 h-1 transition-colors duration-300 rounded
                  ${quests[idx + 1].completed ? "bg-purple-500" : "bg-gray-600"}`}
              ></div>
            )}
          </div>
        ))}
      </div>

      {/* Quest Cards */}
      <div className="flex flex-wrap gap-8 justify-center">
        {quests.map((q) => (
          <Card
            key={q.id}
            className={`relative flex flex-col w-80 md:w-96 rounded-xl border border-transparent shadow-lg
              transition duration-300 ease-in-out hover:scale-105 hover:shadow-purple-600/50
              ${q.completed ? "line-through opacity-60" : ""}
            `}
          >
            {/* Bagian atas: gambar + judul overlay */}
            {q.image && (
              <div className="relative h-40 w-full rounded-t-xl overflow-hidden">
                <img
                  src={q.image}
                  alt={q.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <h3 className="text-2xl font-extrabold text-purple-400 text-center px-2">
                    {q.title}
                  </h3>
                </div>
              </div>
            )}

            {/* EXP Bulat setengah di luar, 3D + tulisan */}
            <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full 
              bg-gradient-to-br from-yellow-400 to-yellow-300 flex flex-col items-center justify-center
              shadow-lg ring-2 ring-yellow-300 text-gray-900 animate-pulse"
            >
              <span className="text-[8px] font-bold -mb-0.5">EXP</span>
              <span className="text-sm font-bold">{q.expReward}</span>
            </div>

            {/* Bagian bawah: deskripsi + tombol */}
            <div className="p-4 flex flex-col text-white">
              <p className="text-gray-300 text-sm leading-relaxed mb-4">{q.description}</p>
              {!q.completed && (
                <Button
                  variant="accent"
                  className="self-start px-4 py-2 rounded-lg font-semibold tracking-wide shadow-md shadow-purple-600/70
                    hover:shadow-purple-700/90 transition-shadow duration-300"
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
