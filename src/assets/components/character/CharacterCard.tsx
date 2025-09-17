import { Card, CardHeader, CardContent, CardTitle } from "@/assets/components/ui/card";
import { Progress } from "@/assets/components/ui/progress";
import { cn } from "@/lib/utils";
import type { Character } from "@/types/character";

interface CharacterCardProps {
  character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  const { name, level, exp, expToNextLevel } = character;
  const expPercent = Math.min((exp / expToNextLevel) * 100, 100);

  return (
    <Card className="w-80 bg-gray-800 border border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl text-yellow-300">{name}</CardTitle>
        <div className="text-sm text-gray-400">Level {level}</div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm text-gray-300">
          <span>EXP</span>
          <span>{exp} / {expToNextLevel}</span>
        </div>
        <Progress value={expPercent} />
      </CardContent>
    </Card>
  );
}
