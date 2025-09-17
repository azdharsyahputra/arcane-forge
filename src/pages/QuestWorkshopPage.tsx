import { useState, useEffect } from "react";
import type { QuestNode } from "../types/quest";
import AddQuestPage from "./AddQuestPage";

export default function QuestWorkshopPage() {
  const [nodes, setNodes] = useState<QuestNode[]>([]);
  const [newNodeTitle, setNewNodeTitle] = useState("");
  const [selectedNode, setSelectedNode] = useState<QuestNode | null>(null);

  // Load nodes dari localStorage
  useEffect(() => {
    const savedNodes = localStorage.getItem("custom-nodes");
    if (savedNodes) setNodes(JSON.parse(savedNodes));
  }, []);

  const saveNodes = (newNodes: QuestNode[]) => {
    setNodes(newNodes);
    localStorage.setItem("custom-nodes", JSON.stringify(newNodes));
  };

  const addNode = () => {
    if (!newNodeTitle.trim()) return;
    const newNode: QuestNode = {
      id: Date.now(),
      title: newNodeTitle.trim(),
      quests: [],
    };
    saveNodes([...nodes, newNode]);
    setNewNodeTitle("");
    setSelectedNode(newNode); // langsung masuk ke AddQuestPage
  };

  if (selectedNode) {
    return (
      <AddQuestPage
        node={selectedNode}
        onBack={() => {
          setSelectedNode(null);
          saveNodes(nodes); // simpan node + quest terbaru
        }}
      />
    );
  }

  return (
    <div className="p-8 overflow-auto h-full">
      <h1 className="text-3xl font-bold mb-6 text-yellow-300">Quest Workshop</h1>

      {/* Form Tambah Node */}
      <div className="mb-6 flex gap-3 max-w-md">
        <input
          type="text"
          placeholder="Node Title"
          value={newNodeTitle}
          onChange={(e) => setNewNodeTitle(e.target.value)}
          className="flex-1 p-3 rounded bg-gray-800 text-yellow-300 border border-yellow-600"
        />
        <button
          onClick={addNode}
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded"
        >
          Forge Node
        </button>
      </div>

      {/* List Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {nodes.map((node) => (
          <div
            key={node.id}
            onClick={() => setSelectedNode(node)}
            className="p-4 rounded border border-yellow-600 bg-gray-800 text-yellow-300 cursor-pointer hover:scale-105 transition-transform"
          >
            <h2 className="font-bold">{node.title}</h2>
            <p className="text-sm">
              {node.quests.length} quest{node.quests.length !== 1 ? "s" : ""}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
