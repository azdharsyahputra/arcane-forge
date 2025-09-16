import type { Quest } from "../../../types/quest";
import { useState } from "react";

export interface Node {
  id: number;
  quests: Quest[];
  completed?: boolean;
  active?: boolean;
}

interface QuestMapProps {
  nodes: Node[];
  onNodeSelect: (nodeId: number) => void;
}

export default function QuestMap({ nodes, onNodeSelect }: QuestMapProps) {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center gap-12 w-full">
      <h2 className="text-3xl font-bold text-purple-300 mb-6">Quest Map</h2>

      <div className="flex gap-12 overflow-x-auto px-4 py-6 w-full">
        {nodes.map((node, idx) => (
          <div
            key={node.id}
            className="flex flex-col items-center relative group"
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            {/* Node circle */}
            <button
              onClick={() => node.active && onNodeSelect(node.id)}
              className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-white
                ${node.completed
                  ? "bg-purple-600 shadow-[0_0_15px_rgba(139,92,246,0.6)]"
                  : node.active
                  ? "bg-purple-400 animate-pulse shadow-[0_0_20px_rgba(139,92,246,0.8)]"
                  : "bg-gray-500 opacity-60 cursor-not-allowed"}
                transform transition-transform hover:scale-110`}
            >
              {node.id}
            </button>

            {/* Tooltip */}
            {hoveredNode === node.id && (
              <div className="absolute -top-12 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                {node.quests.length} Quests
              </div>
            )}

            {/* Connector line */}
            {idx !== nodes.length - 1 && (
              <div
                className="absolute top-1/2 left-full w-24 h-1 rounded-full"
                style={{
                  background: "linear-gradient(to right, #9d7cff, #5a189a)",
                }}
              />
            )}

            {/* Quest count label */}
            <span className="mt-2 text-gray-200 text-sm">{node.quests.length} Quests</span>
          </div>
        ))}
      </div>
    </div>
  );
}
