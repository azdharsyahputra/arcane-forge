import { useState, useEffect } from "react";
import type { QuestNode, Quest } from "../types/quest";
import QuestLog from "../assets/components/quests/QuestLog";

interface AddQuestPageProps {
  node: QuestNode;
  onBack: () => void;
}

export default function AddQuestPage({ node, onBack }: AddQuestPageProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expReward, setExpReward] = useState(50);
  const [image, setImage] = useState<string>("");
  const [quests, setQuests] = useState<Quest[]>([]);

  // Load quests dari localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`node-${node.id}-quests`);
    if (saved) setQuests(JSON.parse(saved));
    else setQuests(node.quests || []);
  }, [node.id, node.quests]);

  // Convert file ke base64
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string); // base64
    };
    reader.readAsDataURL(file);
  };

  const addQuest = () => {
    if (!title.trim()) return;

    const newQuest: Quest = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      expReward,
      image: image || "/assets/images/default-quest.png",
      completed: false,
    };

    const updatedQuests = [...quests, newQuest];
    setQuests(updatedQuests);
    localStorage.setItem(`node-${node.id}-quests`, JSON.stringify(updatedQuests));

    // Reset form
    setTitle("");
    setDescription("");
    setExpReward(50);
    setImage("");
  };

  const handleComplete = (id: number) => {
    const updatedQuests = quests.map(q =>
      q.id === id ? { ...q, completed: true } : q
    );
    setQuests(updatedQuests);
    localStorage.setItem(`node-${node.id}-quests`, JSON.stringify(updatedQuests));
  };

  return (
    <div className="p-8 overflow-auto h-full">
      <button
        onClick={onBack}
        className="mb-6 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
      >
        ← Back to Workshop
      </button>

      <h1 className="text-3xl font-bold mb-6 text-yellow-300">
        Add Quest to "{node.title}"
      </h1>

      <div className="flex flex-col gap-3 max-w-md mb-6">
        <input
          type="text"
          placeholder="Quest Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-3 rounded bg-gray-800 text-yellow-300 border border-yellow-600"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-3 rounded bg-gray-800 text-yellow-300 border border-yellow-600"
        />
        <input
          type="number"
          placeholder="EXP Reward"
          value={expReward}
          onChange={(e) => setExpReward(Number(e.target.value))}
          className="p-3 rounded bg-gray-800 text-yellow-300 border border-yellow-600"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="p-3 rounded bg-gray-800 text-yellow-300 border border-yellow-600"
        />
        {image && (
          <img src={image} alt="Preview" className="w-32 h-32 object-cover rounded mt-2" />
        )}
        <button
          onClick={addQuest}
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded"
        >
          Add Quest
        </button>
      </div>

      <QuestLog quests={quests} onComplete={handleComplete} />
    </div>
  );
}
