import { useState, useEffect } from "react";
import { Sword, Star } from "lucide-react";
import type { QuestNode } from "../types/quest";
import QuestPage from "./QuestPage";
import bgImage from "../assets/images/bg1.jpg";
import { questNodes as staticQuestData } from "../data/quests";

const SIDEBAR_WIDTH = 256;

export default function QuestMap() {
  const [selectedNode, setSelectedNode] = useState<QuestNode | null>(null);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number }[]>([]);
  const [completedMap, setCompletedMap] = useState<Record<number, boolean>>({});
  const [allNodes, setAllNodes] = useState<QuestNode[]>([]);

  // Load particles
  useEffect(() => {
    const temp: typeof particles = [];
    for (let i = 0; i < 30; i++) {
      temp.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
      });
    }
    setParticles(temp);
  }, []);

  // Load nodes (statis + dinamis) & update completedMap
  const loadNodes = () => {
    const savedNodes = localStorage.getItem("custom-nodes");
    const customNodes: QuestNode[] = savedNodes ? JSON.parse(savedNodes) : [];
    const combinedNodes = [...staticQuestData, ...customNodes];
    setAllNodes(combinedNodes);

    const map: Record<number, boolean> = {};
    combinedNodes.forEach((node) => {
      const savedQuests = localStorage.getItem(`node-${node.id}-quests`);
      const quests = savedQuests ? JSON.parse(savedQuests) : node.quests;
      map[node.id] = quests.every((q: any) => q.completed);
    });
    setCompletedMap(map);
  };

  useEffect(() => {
    loadNodes();
  }, []);

  if (selectedNode) {
    return <QuestPage node={selectedNode} onBack={() => {
      setSelectedNode(null);
      loadNodes(); // refresh map setelah balik dari QuestPage
    }} />;
  }

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center overflow-x-auto relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay fixed */}
      <div
        className="fixed top-0"
        style={{
          left: SIDEBAR_WIDTH,
          width: `calc(100vw - ${SIDEBAR_WIDTH}px)`,
          height: "100vh",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/50"></div>

        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-white/70 animate-float"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              top: `${p.y}%`,
              left: `${p.x}%`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Judul map */}
      <div className="fixed top-10 z-30" style={{ left: "35%" }}>
        <h1
          className="text-6xl text-center"
          style={{
            fontFamily: "'MedievalSharp', cursive",
            fontWeight: "900",
            color: "#f5f5f5",
            textShadow: "0 0 1px #9d00ff, 0 0 2px #9d00ff, 0 0 4px #9d00ff",
            animation: "glow 5s ease-in-out infinite alternate",
          }}
        >
          Realm of Arcane Quests
        </h1>
      </div>

      {/* Map container */}
      <div
        className="relative z-20 flex items-center px-20 py-10 overflow-x-auto"
        style={{ minWidth: `${allNodes.length * 350}px`, paddingTop: "16rem" }}
      >
        {allNodes.map((node, idx) => {
          const completed = completedMap[node.id];

          return (
            <div key={node.id} className="flex items-center">
              <div className="flex flex-col items-center relative">
                <span className="mb-2 font-bold text-lg text-white drop-shadow-md text-center">
                  {node.title}
                </span>
                <button
                  onClick={() => setSelectedNode(node)}
                  className={`w-32 h-32 rounded-full relative flex items-center justify-center
                    transition-transform duration-300
                    bg-gradient-to-br from-purple-400 to-purple-800 text-white shadow-lg 
                    hover:scale-110 hover:rotate-3 hover:shadow-[0_0_20px_rgba(156,0,255,0.6)]`}
                >
                  <Sword className="w-10 h-10 text-white animate-pulse" />
                  <div className="absolute inset-0 rounded-full border-4 border-white/20 animate-pulse"></div>
                  <Star
                    className={`absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-6 h-6 drop-shadow-md animate-bounce ${
                      completed ? "text-yellow-400 fill-current" : "text-yellow-300"
                    }`}
                    fill={completed ? "currentColor" : "none"}
                  />
                </button>
              </div>
              {idx < allNodes.length - 1 && (
                <div
                  className="w-48 h-1 rounded-full shadow-lg"
                  style={{
                    marginTop: "3rem",
                    background: "linear-gradient(to right, #9d00ff, #d67fff, #9d00ff)",
                    backgroundSize: "200% 100%",
                    animation: "moveGradient 3s linear infinite",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes glow {
          0%,100% { text-shadow:0 0 0 #9d00ff; }
          50% { text-shadow:0 0 1px #9d00ff,0 0 2px #9d00ff,0 0 4px #9d00ff; }
        }
        @keyframes moveGradient {
          0% { background-position:0 0; }
          100% { background-position:200% 0; }
        }
        @keyframes floatParticle {
          0% { transform: translateY(0px); opacity: 0.5; }
          50% { opacity: 1; }
          100% { transform: translateY(-20px); opacity: 0; }
        }
        .animate-float {
          animation-name: floatParticle;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }
      `}</style>
    </div>
  );
}
