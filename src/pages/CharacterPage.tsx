import CharacterCard from "@/assets/components/character/CharacterCard";
import { useState, useEffect } from "react";
import { Progress } from "@/assets/components/ui/progress";
import { useCharacterContext } from "@/context/CharacterContext";

// Import streak images
import streakOn from "@/assets/images/streak-on.gif";
import streakOff from "@/assets/images/streak-off.gif";

export default function CharacterPage() {
  const { character, updateCharacter } = useCharacterContext(); 
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; speed: number }[]>([]);
  const [todayClaimed, setTodayClaimed] = useState(false);
  const [fireworks, setFireworks] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  // Check if streak claimed today
  useEffect(() => {
    if (!character.lastClaim) {
      setTodayClaimed(false);
      setShowModal(true); // show modal if streak not claimed yet
      return;
    }

    const last = new Date(character.lastClaim);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays >= 3) {
      updateCharacter({ ...character, streak: 0, lastClaim: undefined });
      setTodayClaimed(false);
      setShowModal(true);
      return;
    }

    const isSameDay =
      last.getFullYear() === now.getFullYear() &&
      last.getMonth() === now.getMonth() &&
      last.getDate() === now.getDate();
    setTodayClaimed(isSameDay);
    if (!isSameDay) setShowModal(true);
  }, [character]);

  const claimStreak = () => {
    if (todayClaimed) return;
    const now = new Date().toISOString();
    const newStreak = character.streak + 1;
    updateCharacter({ ...character, streak: newStreak, lastClaim: now });
    setTodayClaimed(true);
    setFireworks(true);
    setShowModal(false);

    setTimeout(() => setFireworks(false), 1500);
  };

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

      {/* Fireworks */}
      {fireworks &&
        Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-yellow-300 text-2xl animate-firework"
            style={{
              top: `${50 + Math.random() * 20 - 10}%`,
              left: `${50 + Math.random() * 20 - 10}%`,
            }}
          >
            ✨
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
        <section>
          <CharacterCard character={character} />
        </section>

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
            className={`bg-gray-800 rounded-xl shadow-lg border border-yellow-600 p-6 flex flex-col items-center justify-center hover:scale-105 transition-transform relative overflow-hidden cursor-pointer`}
            style={{ minHeight: "200px" }}
            onClick={claimStreak}
          >
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-yellow-400/50 to-yellow-300/50 blur opacity-30 animate-pulse"></div>
            <h2 className="text-yellow-400 text-xl font-semibold mb-4 relative z-10">Daily Streak</h2>

            <img
              src={todayClaimed ? streakOn : streakOff}
              alt="streak"
              className={`relative z-10 w-24 h-24 mb-2 transition-transform duration-300 ease-out ${
                todayClaimed ? "scale-125" : ""
              }`}
            />

            <div className="text-yellow-300 text-xl font-bold relative z-10 mb-2">
              {streak} days
            </div>

            <small className="text-yellow-400 text-center relative z-10">
              Your hero’s journey continues! ✨
            </small>
          </div>
        </section>
      </main>

      {/* Modal for OFF streak */}
      {showModal && (
        <div className="absolute inset-0 bg-black/70 z-20 flex items-center justify-center">
          <div className="bg-gray-800 p-8 rounded-xl shadow-xl flex flex-col items-center gap-4">
            <h2 className="text-2xl text-yellow-400 font-bold">Claim Your Daily Streak!</h2>
            <img src={streakOff} alt="streak" className="w-32 h-32 mb-2" />
            <button
              onClick={claimStreak}
              className="px-6 py-3 bg-yellow-400 text-gray-900 font-bold rounded-lg hover:scale-110 transition-transform"
            >
              Claim Now 🔥
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes starMove {
          0% { transform: translate(0, 0); opacity: 0.7; }
          50% { opacity: 1; }
          100% { transform: translate(30px, -30px); opacity: 0; }
        }
        @keyframes firework {
          0% { transform: scale(0); opacity: 1; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(0); opacity: 0; }
        }
        .animate-firework { animation: firework 0.8s ease-out forwards; }
      `}</style>
    </div>
  );
}
