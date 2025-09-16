import { useState, useEffect } from "react";
import { Sword, Star } from "lucide-react";
import { questNodes as questData } from "../data/quests";
import type { QuestNode } from "../types/quest";
import QuestPage from "./QuestPage";
import bgImage from "../assets/images/bg1.jpg";

const SIDEBAR_WIDTH = 256; // 16rem (w-64)

export default function QuestMap() {
  const [selectedNode, setSelectedNode] = useState<QuestNode | null>(null);
  const [particles, setParticles] = useState<{id:number, x:number, y:number, size:number}[]>([]);

  useEffect(() => {
    const temp: typeof particles = [];
    for(let i = 0; i < 30; i++){
      temp.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2
      });
    }
    setParticles(temp);
  }, []);

  if (selectedNode) {
    return (
      <QuestPage
        node={selectedNode}
        onBack={() => setSelectedNode(null)}
      />
    );
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

        {/* Sparkles */}
        {particles.map(p => (
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
<div
  className="fixed top-10 z-30"
  style={{ left: "35%" }}
>

        <h1
          className="text-6xl text-center"
          style={{
            fontFamily: "'MedievalSharp', cursive",
            fontWeight: '900',
            color: "#f5f5f5",
            textShadow: "0 0 1px #9d00ff, 0 0 2px #9d00ff, 0 0 4px #9d00ff",
            animation: "glow 5s ease-in-out infinite alternate",
          }}
        >
          Realm of Arcane Quests
        </h1>
      </div>


      {/* Map container (nodes) dengan minWidth */}
      <div
        className="relative z-20 flex items-center px-20 py-10 overflow-x-auto"
        style={{
          minWidth: `${questData.length * 350}px`,
          paddingTop: '16rem',
        }}
      >
        {questData.map((node, idx) => (
          <div key={node.id} className="flex items-center">
            <div className="flex flex-col items-center">
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
                <Star className="absolute -bottom-5 w-6 h-6 text-yellow-300 drop-shadow-md animate-bounce" />
              </button>
            </div>
            {idx < questData.length - 1 && (
              <div
                className="w-48 h-1 rounded-full shadow-lg"
                style={{
                  marginTop: '3rem',
                  background: "linear-gradient(to right, #9d00ff, #d67fff, #9d00ff)",
                  backgroundSize: "200% 100%",
                  animation: "moveGradient 3s linear infinite",
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Animation styles + custom scrollbar */}
      <style>
        {`
          /* Keyframes Glow, Gradient, Float */
          @keyframes glow {
            0% { text-shadow: 0 0 0px #9d00ff, 0 0 0px #9d00ff, 0 0 0px #9d00ff; }
            50% { text-shadow: 0 0 1px #9d00ff, 0 0 2px #9d00ff, 0 0 4px #9d00ff; }
            100% { text-shadow: 0 0 0px #9d00ff, 0 0 0px #9d00ff, 0 0 0px #9d00ff; }
          }
          @keyframes moveGradient {
            0% { background-position: 0 0; }
            100% { background-position: 200% 0; }
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

          /* Custom horizontal scrollbar for Chrome, Edge, Safari */
          .overflow-x-auto::-webkit-scrollbar {
            height: 8px;
          }
          .overflow-x-auto::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
          }
          .overflow-x-auto::-webkit-scrollbar-thumb {
            background: #9d00ff; /* purple */
            border-radius: 4px;
            transition: background-color 0.3s ease;
          }
          .overflow-x-auto::-webkit-scrollbar-thumb:hover {
            background: #d67fff;
          }

          /* Firefox scrollbar via scrollbar-width and scrollbar-color */
          .overflow-x-auto {
            scrollbar-width: thin;
            scrollbar-color: #9d00ff rgba(255,255,255,0.1);
          }
        `}
      </style>
    </div>
  );
}
