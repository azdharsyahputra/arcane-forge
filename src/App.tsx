import { useState, useEffect } from "react";
import { Scroll, Sword, Trophy, MapPin, Hammer, Backpack } from "lucide-react";
import QuestMap from "./pages/QuestMap";
import QuestPage from "./pages/QuestPage";
import QuestWorkshopPage from "./pages/QuestWorkshopPage";
import CharacterPage from "./pages/CharacterPage";
import InventoryPage from "./pages/InventoryPage";
import type { QuestNode } from "./types/quest";
import { inventoryData } from "./data/inventory";
import arcaneLogo from "./assets/images/sidebar.png";
import sidebarBg from "./assets/images/sidebar-bg.png";

// 👉 tambahin ini
import { CharacterProvider } from "./context/CharacterContext";
import AchievementsPage from "./pages/AchievementsPage";

function App() {
  const [page, setPage] = useState<
    "quests" | "character" | "achievements" | "questWorkshop" | "inventory"
  >("quests");
  const [selectedNode, setSelectedNode] = useState<QuestNode | null>(null);
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; size: number }[]
  >([]);

  if (selectedNode) {
    return <QuestPage node={selectedNode} onBack={() => setSelectedNode(null)} />;
  }

  const menuItems: {
    id: "quests" | "character" | "achievements" | "questWorkshop" | "inventory";
    label: string;
    icon: typeof Scroll;
  }[] = [
    { id: "quests", label: "Quests", icon: MapPin },
    { id: "questWorkshop", label: "Quest Workshop", icon: Hammer },
    { id: "inventory", label: "Inventory", icon: Backpack },
    { id: "character", label: "Character", icon: Sword },
    { id: "achievements", label: "Achievements", icon: Trophy },
  ];

  useEffect(() => {
    const temp: typeof particles = [];
    for (let i = 0; i < 25; i++) {
      temp.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 2,
      });
    }
    setParticles(temp);
  }, []);

  return (
    // 👉 bungkus semua dengan CharacterProvider
    <CharacterProvider>
      <div className="flex h-screen overflow-hidden bg-gray-900 text-gray-200 relative">
        {/* Sidebar */}
        <aside
          className="w-64 relative border-r border-gray-700 p-6 flex flex-col gap-6 shadow-xl overflow-hidden"
          style={{
            backgroundImage: `url(${sidebarBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gray-900/90 pointer-events-none" />
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full bg-white/70 animate-float pointer-events-none"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                top: `${p.y}%`,
                left: `${p.x}%`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}

          <img
            src={arcaneLogo}
            alt="ArcaneForge Logo"
            className="mx-auto w-60 h-auto mb-4 z-10 relative"
          />

          {menuItems.map(({ id, label, icon: Icon }) => {
            const active = page === id;
            return (
              <button
                key={id}
                onClick={() => setPage(id)}
                className={`relative z-10 flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  active
                    ? "bg-gray-800 text-white shadow-[0_0_15px_rgba(255,255,255,0.2)] scale-105 border-l-4 border-[var(--color-accent)]"
                    : "hover:bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 hover:text-white hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                }`}
              >
                <Icon size={20} className={active ? "animate-pulse" : ""} />
                {label}
              </button>
            );
          })}
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto relative">
          {page === "quests" && <QuestMap />}
          {page === "questWorkshop" && <QuestWorkshopPage />}
          {page === "inventory" && <InventoryPage items={inventoryData} />}
          {/* 👉 CharacterPage sekarang ga perlu prop */}
          {page === "character" && <CharacterPage />}
          {page === "achievements" && <AchievementsPage/>}
        </main>

        <style>
          {`
            @keyframes floatParticle {
              0% { transform: translateY(0px); opacity: 0.5; }
              50% { opacity: 1; }
              100% { transform: translateY(-15px); opacity: 0; }
            }
            .animate-float {
              animation-name: floatParticle;
              animation-iteration-count: infinite;
              animation-timing-function: ease-in-out;
            }
          `}
        </style>
      </div>
    </CharacterProvider>
  );
}

export default App;
