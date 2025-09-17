import { Card, CardHeader, CardContent, CardTitle } from "@/assets/components/ui/card";
import type { Character } from "@/types/character";

interface CharacterCardProps {
  character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  const { name, level, avatar, skills } = character;

  return (
    <Card className="w-80 bg-gradient-to-t from-yellow-900 via-yellow-800 to-yellow-700 rounded-2xl shadow-[0_0_25px_8px_rgba(252,211,77,0.85)] hover:shadow-[0_0_40px_12px_rgba(252,211,77,0.95)] transition-shadow duration-300 transform hover:-translate-y-1 cursor-pointer select-none relative overflow-hidden">
      {/* Removed outer border & frame decor */}

      {/* Header with avatar */}
      <CardHeader className="relative flex flex-col items-center py-5 bg-gradient-to-b from-yellow-700 via-yellow-600 to-yellow-500 shadow-inner shadow-yellow-700 rounded-t-2xl">
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="w-28 h-28 rounded-lg shadow-[0_0_15px_6px_rgba(252,211,77,0.8)] object-cover"
          />
        ) : (
          <div className="w-28 h-28 rounded-lg bg-yellow-600 flex items-center justify-center text-yellow-900 text-5xl font-extrabold shadow-inner shadow-yellow-900">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
        <CardTitle className="mt-3 text-3xl font-extrabold text-yellow-50 drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] tracking-wide">
          {name}
        </CardTitle>
        <div className="text-yellow-200 font-semibold text-lg tracking-wide mt-1">
          Level {level}
        </div>
      </CardHeader>

      {/* Content: Skills / Abilities */}
      <CardContent className="bg-yellow-800 bg-opacity-90 p-2 rounded-b-2xl shadow-inner shadow-yellow-900">
        <div className="text-yellow-200 font-semibold mb-4 tracking-wide text-lg select-none">
          Skills / Abilities
        </div>
        {skills && skills.length > 0 ? (
          <ul className="space-y-3 text-yellow-100 font-medium">
            {skills.map((s, idx) => (
              <li
                key={idx}
                className="flex justify-between bg-yellow-700 bg-opacity-50 rounded-md px-4 py-2 shadow-md shadow-yellow-900 hover:bg-yellow-600 transition"
              >
                <span className="select-text">{s.name}</span>
                <span className="font-extrabold">{s.power}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="italic text-yellow-300 select-none">No skills learned yet...</div>
        )}
      </CardContent>
    </Card>
  );
}
