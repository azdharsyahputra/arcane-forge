import { useState } from "react";
import { Scroll, Sword, Trophy } from "lucide-react";
import QuestMap from "./pages/QuestMap";
import QuestPage from "./pages/QuestPage";
import type { QuestNode } from "./types/quest";

function App() {
  const [page, setPage] = useState<"quests" | "character" | "achievements">("quests");
  const [selectedNode, setSelectedNode] = useState<QuestNode | null>(null);

  // Jika ada node yang dipilih → buka QuestPage
  if (selectedNode) {
    return <QuestPage node={selectedNode} onBack={() => setSelectedNode(null)} />;
  }

  // Menu items dengan tipe ketat
  const menuItems: { id: "quests" | "character" | "achievements"; label: string; icon: typeof Scroll }[] = [
    { id: "quests", label: "Quests", icon: Scroll },
    { id: "character", label: "Character", icon: Sword },
    { id: "achievements", label: "Achievements", icon: Trophy },
  ];

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-200">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 border-r border-gray-700 p-6 flex flex-col gap-6 shadow-lg">
        <h1 className="text-3xl font-extrabold text-[var(--color-accent)] mb-6 tracking-wide text-center">
          ArcaneForge
        </h1>

        {/* Menu Buttons */}
        {menuItems.map(({ id, label, icon: Icon }) => {
          const active = page === id;
          return (
            <button
              key={id}
              onClick={() => setPage(id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold
                transition-all duration-300
                ${
                  active
                    ? "bg-purple-700 text-white shadow-[0_0_20px_rgba(139,92,246,0.6)] scale-105"
                    : "hover:bg-purple-600 hover:text-white hover:scale-105"
                }`}
            >
              <Icon size={20} className={active ? "animate-pulse" : ""} />
              {label}
            </button>
          );
        })}
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {page === "quests" && <QuestMap />}
        {page === "character" && (
          <div className="p-10 text-center text-2xl font-bold">⚔️ Character</div>
        )}
        {page === "achievements" && (
          <div className="p-10 text-center text-2xl font-bold">🏆 Achievements</div>
        )}
      </main>
    </div>
  );
}

export default App;
