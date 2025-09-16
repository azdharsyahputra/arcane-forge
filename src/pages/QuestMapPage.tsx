import { useState } from "react";
import QuestMap from "../assets/components/quests/QuestMap";
import type { Node } from "../assets/components/quests/QuestMap";
import { quests as questData } from "../data/quests";

interface QuestMapPageProps {
  onSelectNode?: (nodeId: number) => void; // opsional callback ke App
}

export default function QuestMapPage({ onSelectNode }: QuestMapPageProps) {
  const [quests, setQuests] = useState(questData);

  // Setup nodes
  const nodes: Node[] = [
    { id: 1, quests: quests.slice(0, 3), active: true },
    { id: 2, quests: quests.slice(3, 5) },
    { id: 3, quests: quests.slice(5, 6) },
  ];

  const handleNodeSelect = (nodeId: number) => {
    if (onSelectNode) onSelectNode(nodeId);
    console.log("Node selected:", nodeId);
  };

  return <QuestMap nodes={nodes} onNodeSelect={handleNodeSelect} />;
}
