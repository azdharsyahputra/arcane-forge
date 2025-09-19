// QuestLog.tsx
import type { Quest } from "../../../types/quest";
import { Card } from "@/assets/components/ui/card-quest";
import { Button } from "@/assets/components/ui/button";

interface QuestLogProps {
  quests: Quest[];
  onComplete: (id: number) => void;
  onUndo?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export default function QuestLog({
  quests,
  onComplete,
  onUndo,
  onDelete,
}: QuestLogProps) {
  const defaultImages = [
    "/assets/images/quest1.png",
    "/assets/images/quest2.png",
    "/assets/images/quest3.png",
    "/assets/images/quest4.png",
  ];

  const getQuestImage = (q: Quest) => {
    if (q.image) return q.image;
    const index = Math.floor(Math.random() * defaultImages.length);
    return defaultImages[index];
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      {/* Progress Path */}
      <div className="flex items-center gap-4 mb-6 flex-wrap justify-center w-full">
        {quests.map((q, idx) => (
          <div key={q.id} className="flex items-center">
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-semibold transition-colors duration-300 ${
                q.completed
                  ? "bg-purple-500 border-purple-500 text-white"
                  : "bg-gray-800 border-gray-600 text-gray-400"
              }`}
            >
              {q.completed ? "✓" : idx + 1}
            </div>
            {idx !== quests.length - 1 && (
              <div
                className={`flex-1 h-1 transition-colors duration-300 rounded ${
                  quests[idx + 1].completed ? "bg-purple-500" : "bg-gray-600"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      {/* Quest Cards Container (scrollable grid 2 kolom) */}
      <div
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 px-4"
        style={{
          maxHeight: "75vh",
          overflowY: "auto",
          paddingTop: "1rem",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        <style>
          {`
            div::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>

        {quests.map((q) => (
          <Card
            key={q.id}
            className={`relative flex flex-col w-full rounded-xl border border-transparent shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:shadow-purple-600/50 ${
              q.completed ? "line-through opacity-60" : ""
            }`}
          >
            <div className="relative w-full h-40 rounded-t-xl overflow-hidden">
              <img
                src={getQuestImage(q)}
                alt={q.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <h3 className="text-2xl font-extrabold text-purple-400 text-center px-2">
                  {q.title}
                </h3>
              </div>
            </div>

            <div className="absolute top-2 right-2 translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-300 flex flex-col items-center justify-center shadow-lg ring-2 ring-yellow-300 text-gray-900 animate-pulse">
              <span className="text-[8px] font-bold -mb-0.5">EXP</span>
              <span className="text-sm font-bold">{q.expReward}</span>
            </div>

            <div className="p-4 flex flex-col text-white gap-2">
              <p className="text-gray-300 text-sm leading-relaxed">
                {q.description}
              </p>
              <div className="flex gap-2 flex-wrap">
                {!q.completed && (
                  <>
                    <Button
                      variant="accent"
                      className="px-4 py-2 rounded-lg font-semibold tracking-wide shadow-md shadow-purple-600/70 hover:shadow-purple-700/90 transition-shadow duration-300"
                      onClick={() => onComplete(q.id)}
                    >
                      Complete
                    </Button>

                    {onDelete && (
                      <Button
                        variant="accent"
                        className="px-4 py-2 rounded-lg font-semibold tracking-wide bg-red-600 text-white hover:bg-red-700 shadow-md shadow-red-600/50 transition-shadow duration-300"
                        onClick={() => onDelete(q.id)}
                      >
                        Delete
                      </Button>
                    )}
                  </>
                )}

                {q.completed && onUndo && (
                  <Button
                    variant="accent"
                    className="px-4 py-2 rounded-lg font-semibold tracking-wide shadow-md shadow-gray-700/50 hover:shadow-gray-800/60 transition-shadow duration-300"
                    onClick={() => onUndo(q.id)}
                  >
                    Undo
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
