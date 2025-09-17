import CharacterCard from "@/assets/components/character/CharacterCard";
import type { Character } from "@/types/character";

interface CharacterPageProps {
  character: Character;
}

export default function CharacterPage({ character }: CharacterPageProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold text-yellow-300">Character</h1>
      <CharacterCard character={character} />
    </div>
  );
}
