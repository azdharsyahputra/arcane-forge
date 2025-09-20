import CharacterCard from "@/assets/components/character/CharacterCard";
import { useState, useEffect } from "react";
import { Progress } from "@/assets/components/ui/progress";
import { useCharacterContext } from "@/context/CharacterContext";

export default function CharacterPage() {
  const { character, updateCharacter } = useCharacterContext(); // ambil semua data & updater
  const [stars, setStars] = useState<
    { id: number; x: number; y: number; size: number; speed: number }[]
  >([]);

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

  // Streak logic
  const todayStr = new Date().toDateString();
  const lastDateStr = localStorage.getItem("lastStreakDate");
  let diffDays = 0;
  if (lastDateStr) {
    const lastDate = new Date(lastDateStr);
    diffDays = Math.floor(
      (new Date(todayStr).getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
    );
  }

  // Bisa claim kalau belum hari ini
  const canClaimStreak = !lastDateStr || diffDays > 0;

  // Claim streak function
  const claimStreak = () => {
    if (!canClaimStreak) return;

    let newStreak = character.streak;
    // Reset jika sudah lebih dari 2 hari
    if (diffDays >= 3) newStreak = 0;
    newStreak += 1;

    updateCharacter({ streak: newStreak });
    localStorage.setItem("lastStreakDate", todayStr);
  };

  // Gunakan data dari context langsung
  const completedQuests = character.completedQuests;
  const totalExp = character.totalExp;
  const level = character.level;
  const currentLevelExp = character.exp;
  const expToNextLevel = character.expToNextLevel;
  const streak = character.streak;

  const kpis = [
    {
      label: "Quests Completed",
      value: `${completedQuests}`,
      icon: "🗡️",
      subtitle: "Total completed quests",
      progress: 100,
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
          <CharacterCard character={character} />
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

            <button
              disabled={!canClaimStreak}
              onClick={claimStreak}
              className={`mt-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                canClaimStreak
                  ? "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              {canClaimStreak ? "Claim Daily Streak 🔥" : "Already Claimed Today"}
            </button>

            <small className="text-yellow-400 text-center relative z-10 mt-2">
              Keep your daily streak alive
            </small>
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
