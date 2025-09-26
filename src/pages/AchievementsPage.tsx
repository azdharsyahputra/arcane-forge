// src/pages/AchievementsPage.tsx
import { useCharacterContext } from "../context/CharacterContext";
import { Card, CardContent } from "../assets/components/ui/card";
import { motion } from "framer-motion";
import type { Achievement } from "../types/achievement";

export default function AchievementsPage() {
  const { character } = useCharacterContext();

  if (!character) {
    return (
      <div className="flex justify-center items-center h-full text-gray-300">
        No character loaded...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center text-gray-100 p-6"
      style={{ backgroundImage: "url(/images/bg2.jpg)" }}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">🏆 Achievements</h1>

      {character.achievements && character.achievements.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {character.achievements.map((ach: Achievement, index: number) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-gray-800/80 border border-gray-700 shadow-lg hover:shadow-xl transition rounded-2xl">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <img
                    src={ach.icon || "/images/achievement-default.png"}
                    alt={ach.title}
                    className="w-16 h-16 mb-3"
                  />
                  <h2 className="text-lg font-semibold">{ach.title}</h2>
                  <p className="text-sm text-gray-400">{ach.description}</p>
                  <p className="mt-2 text-xs text-yellow-400">
                    ⭐ {ach.points} pts
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400">No achievements yet...</div>
      )}
    </div>
  );
}
