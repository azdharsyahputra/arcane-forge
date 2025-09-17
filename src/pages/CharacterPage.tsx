import CharacterCard from "@/assets/components/character/CharacterCard";
import type { Character } from "@/types/character";
import { characterData } from "@/data/character";
import { useEffect, useState } from "react";
import { Progress } from "@/assets/components/ui/progress";

interface CharacterPageProps {
  character: Character;
}

export default function CharacterPage({ character }: CharacterPageProps) {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; speed: number }[]>([]);

  // Generate star particles
  useEffect(() => {
    const temp: typeof stars = [];
    for (let i = 0; i < 30; i++) {
      temp.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1.5,
        speed: Math.random() * 3 + 2,
      });
    }
    setStars(temp);
  }, []);

  // RPG-relevant KPI cards
  const kpis = [
    { label: "Daily Quests", value: "3 / 5", icon: "🗡️", subtitle: "Complete your daily challenges", progress: 60 },
    { label: "EXP Progress", value: `${character.exp} / ${character.expToNextLevel}`, icon: "⭐", subtitle: "Gain experience to level up", progress: (character.exp / character.expToNextLevel) * 100 },
    { label: "Inventory Slots", value: "12 / 20", icon: "🎒", subtitle: "Manage your items wisely", progress: (12 / 20) * 100 },
    { label: "Reputation", value: "+2300", icon: "🛡️", subtitle: "Hero points earned from quests", progress: 100 },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-gray-800 p-8 text-yellow-300 font-sans overflow-hidden">
      {/* Star Particles */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute text-yellow-400 opacity-70"
          style={{
            fontSize: `${star.size}rem`,
            top: `${star.y}%`,
            left: `${star.x}%`,
            animation: `starMove ${star.speed}s linear infinite`,
          }}
        >
          ★
        </div>
      ))}

      {/* Header */}
      <header className="mb-8 relative z-10">
        <h1 className="text-4xl font-extrabold tracking-wide drop-shadow-lg">
          Character Dashboard
        </h1>
        <p className="text-yellow-400 mt-1 max-w-xl">
          Track your RPG character’s progress, quests, and inventory in one mystical dashboard.
        </p>
      </header>

      {/* Main Grid */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {/* Hero Card */}
        <section>
          <CharacterCard character={character} />
        </section>

        {/* KPI Cards */}
        <section className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="bg-gray-800 rounded-xl shadow-lg border border-yellow-600 p-6 flex flex-col hover:scale-105 transition-transform relative overflow-hidden"
            >
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-yellow-400/50 to-yellow-300/50 blur opacity-30 animate-pulse"></div>

              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2 relative z-10">
                <span className="text-yellow-400">{kpi.icon}</span> {kpi.label}
              </h2>
              <div className="flex-grow text-yellow-200 text-lg font-bold relative z-10">{kpi.value}</div>
              <small className="text-yellow-400 relative z-10">{kpi.subtitle}</small>
              <div className="relative z-10 mt-3">
                <Progress value={kpi.progress} className="h-2 rounded-full bg-gray-700/50" />
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Action Buttons */}
      {/* <div className="flex gap-4 mt-8 justify-center relative z-10">
        <button className="bg-yellow-400 px-6 py-2 rounded-xl font-bold shadow-lg hover:scale-105 glow-neon transition-transform">
          Level Up
        </button>
        <button className="bg-gray-700 px-6 py-2 rounded-xl font-bold text-yellow-300 shadow-lg hover:scale-105 glow-neon transition-transform">
          Equip Item
        </button>
        <button className="bg-gray-700 px-6 py-2 rounded-xl font-bold text-yellow-300 shadow-lg hover:scale-105 glow-neon transition-transform">
          Heal
        </button>
      </div> */}

      {/* Glow style + star animation */}
      <style>{`
        .glow-neon {
          box-shadow: 0 0 10px rgba(255,255,150,0.7), 0 0 20px rgba(255,255,150,0.5);
        }
        @keyframes starMove {
          0% { transform: translate(0, 0); opacity: 0.7; }
          50% { opacity: 1; }
          100% { transform: translate(30px, -30px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
