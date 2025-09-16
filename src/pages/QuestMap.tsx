import { useState } from "react";
import { questNodes as questData } from "../data/quests"; // ganti jadi questNodes
import type { QuestNode } from "../types/quest";
import QuestPage from "./QuestPage";
import bgImage from "../assets/images/bg1.jpg";

export default function QuestMap() {
  const [selectedNode, setSelectedNode] = useState<QuestNode | null>(null);

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
      className="min-h-screen w-full relative bg-cover bg-center overflow-x-auto flex items-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay gelap */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Map container */}
      <div className="relative z-10 flex items-center px-20 py-10">
        {questData.map((node, idx) => (
          <div key={node.id} className="flex items-center">
            {/* Node */}
            <button
              onClick={() => setSelectedNode(node)}
              className={`w-32 h-32 rounded-full relative flex items-center justify-center font-bold text-lg text-center
                transition-transform duration-300
                bg-gradient-to-br from-purple-400 to-purple-800 text-white shadow-lg hover:scale-110 hover:rotate-3`}
            >
              <span className="drop-shadow-md">{node.title}</span>
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full border-4 border-white/20 animate-pulse"></div>
            </button>

            {/* Connector */}
            {idx < questData.length - 1 && (
              <div className="w-48 h-1 bg-gradient-to-r from-purple-400 to-purple-700 rounded-full shadow-lg -ml-2 -mr-2"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
