// CharacterPage.tsx
import CharacterCard from "@/assets/components/character/CharacterCard";
import type { Character } from "@/types/character";
import { characterData } from "@/data/character";
import { useEffect, useState } from "react";
import { Progress } from "@/assets/components/ui/progress";
import { questNodes as questData } from "@/data/quests";

interface CharacterPageProps {
  character: Character;
}

export default function CharacterPage({ character }: CharacterPageProps) {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; speed: number }[]>([]);
  const [completedQuests, setCompletedQuests] = useState(0);
  const [totalQuests, setTotalQuests] = useState(0);
  const [totalExp, setTotalExp] = useState(0);
  const [level, setLevel] = useState(character.level);
  const [expToNextLevel, setExpToNextLevel] = useState(character.expToNextLevel);
  const [currentLevelExp, setCurrentLevelExp] = useState(0);

  useEffect(() => {
    // Generate star particles
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

    // Ambil data quest dari localStorage atau default
    let allQuests: any[] = [];
    questData.forEach((node) => {
      const saved = localStorage.getItem(`node-${node.id}-quests`);
      const quests = saved ? JSON.parse(saved) : node.quests;
      allQuests = allQuests.concat(quests);
    });

    const completed = allQuests.filter(q => q.completed).length;
    setCompletedQuests(completed);
    setTotalQuests(allQuests.length);

    const expSum = allQuests
      .filter(q => q.completed)
      .reduce((acc, q) => acc + (q.expReward || 0), 0);
    setTotalExp(expSum);

    // Level calculation: setiap 100 EXP = 1 level (contoh)
    const calculatedLevel = Math.floor(expSum / 100) + 1;
    const expForCurrentLevel = expSum % 100; // sisa EXP untuk level ini
    setLevel(calculatedLevel);
    setCurrentLevelExp(expForCurrentLevel);
    setExpToNextLevel(100); // Bisa buat scaling kalau mau level tinggi EXP naik

  }, []);

  const streak = 5;

  const kpis = [
    {
      label: "Daily Quests",
      value: `${completedQuests} / ${totalQuests}`,
      icon: "🗡️",
      subtitle: "Complete your daily challenges",
      progress: totalQuests ? (completedQuests / totalQuests) * 100 : 0,
    },
    {
      label: "EXP Progress",
      value: `${currentLevelExp} / ${expToNextLevel}`,
      icon: "⭐",
      subtitle: `Level ${level}`,
      progress: (currentLevelExp / expToNextLevel) * 100,
    },
    {
      label: "Reputation",
      value: `${totalExp}`,
      icon: "🛡️",
      subtitle: "Total hero points earned",
      progress: 100,
    },
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
          Track your RPG character’s progress, quests, and streaks in one mystical dashboard.
        </p>
      </header>

      {/* Main Grid */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {/* Hero Card */}
        <section>
          <CharacterCard character={{ ...character, level, exp: totalExp }} />
        </section>

        {/* KPI Cards */}
        <section className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="bg-gray-800 rounded-xl shadow-lg border border-yellow-600 p-6 flex flex-col hover:scale-105 transition-transform relative overflow-hidden"
              style={{ minHeight: "220px" }}
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

          {/* Streak Card */}
          <div
            className="bg-gray-800 rounded-xl shadow-lg border border-yellow-600 p-6 flex flex-col items-center justify-center hover:scale-105 transition-transform relative overflow-hidden streak-card"
            style={{ minHeight: "220px" }}
          >
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-yellow-400/50 to-yellow-300/50 blur opacity-30 animate-pulse"></div>

            <h2 className="text-yellow-400 text-2xl font-semibold mb-4 relative z-10">Daily Streak</h2>

            <span className="text-yellow-400 text-8xl relative z-10 leading-none mb-2" style={{ lineHeight: 1 }}>
              🔥
            </span>

            <div className="text-yellow-300 text-xl font-bold relative z-10 mb-2">
              {streak} days
            </div>

            <small className="text-yellow-400 text-center relative z-10">Keep your daily streak alive</small>
          </div>
        </section>
      </main>

      <style>{`
        @keyframes starMove {
          0% { transform: translate(0, 0); opacity: 0.7; }
          50% { opacity: 1; }
          100% { transform: translate(30px, -30px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
