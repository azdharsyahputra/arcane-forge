import { useState, useEffect } from "react";
import type { QuestNode, Quest } from "../types/quest";
import QuestLog from "../assets/components/quests/QuestLog";
import { motion, AnimatePresence } from "framer-motion";
import guildhallBg from "../assets/images/guildhall.png";

interface AddQuestPageProps {
  node: QuestNode;
  onBack: () => void;
}

const buttonStyles = "px-5 py-2 rounded font-bold transition-colors duration-200 bg-yellow-500 text-black hover:bg-yellow-400";

export default function AddQuestPage({ node, onBack }: AddQuestPageProps) {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [step, setStep] = useState<"intro" | "title" | "description" | "exp" | "image" | "confirm" | "finished">("intro");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expReward, setExpReward] = useState(50);
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem(`node-${node.id}-quests`);
    if (saved) setQuests(JSON.parse(saved));
    else setQuests(node.quests || []);
  }, [node.id, node.quests]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const saveQuest = () => {
    if (!title.trim()) return quests;
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
    setTitle(""); setDescription(""); setExpReward(50); setImage("");
    return updatedQuests;
  };

  const handleComplete = (id: number) => {
    const updatedQuests = quests.map(q => q.id === id ? { ...q, completed: true } : q);
    setQuests(updatedQuests);
    localStorage.setItem(`node-${node.id}-quests`, JSON.stringify(updatedQuests));
  };

  const handleUndo = (id: number) => {
    const updatedQuests = quests.map(q => q.id === id ? { ...q, completed: false } : q);
    setQuests(updatedQuests);
    localStorage.setItem(`node-${node.id}-quests`, JSON.stringify(updatedQuests));
  };

  const handleDelete = (id: number) => {
    const updatedQuests = quests.filter(q => q.id !== id);
    setQuests(updatedQuests);
    localStorage.setItem(`node-${node.id}-quests`, JSON.stringify(updatedQuests));
  };

  const nextStep = () => {
    if(step === "intro") setStep("title");
    else if(step === "title") setStep("description");
    else if(step === "description") setStep("exp");
    else if(step === "exp") setStep("image");
    else if(step === "image") setStep("confirm");
    else if(step === "confirm") setStep("finished");
  };

  const addAnother = () => setStep("title");

  const fastForward = () => {
    saveQuest(); // simpan quest yang sedang diketik
    setStep("finished"); // langsung ke list quest
  };

  const motionProps = {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -30, scale: 0.95 },
    transition: { duration: 0.35 }
  };

  const backstory: Record<string, string> = {
    intro: `Kamu memasuki guild hall yang megah, tempat para adventurer berkumpul.`,
    title: `Di sudut ruangan, seorang NPC menatapmu dan bertanya nama quest yang akan kamu ciptakan.`,
    description: `Cerita questmu harus menarik agar para adventurer tertarik menyelesaikannya.`,
    exp: `Tentukan jumlah EXP yang pantas sebagai hadiah agar quest ini layak dicoba.`,
    image: `Tambahkan ilustrasi quest agar terlihat lebih hidup.`,
    confirm: `Apakah kamu ingin menambahkan quest lain di node ini?`,
    finished: `Daftar semua quest di node ini:`
  };

  return (
    <div
      className="relative h-full w-full flex flex-col items-center justify-center text-yellow-300 overflow-auto"
      style={{ backgroundImage: `url(${guildhallBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* Back button */}
      <button onClick={onBack} className="absolute top-6 left-6 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 z-20">
        ← Back to Workshop
      </button>

      {/* Fast Forward button pojok kanan atas */}
      {step !== "finished" && (
        <button
          onClick={fastForward}
          className="absolute top-6 right-6 px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 z-20"
        >
          Fast Forward
        </button>
      )}

      <AnimatePresence mode="wait">
        {step === "intro" && (
          <motion.div {...motionProps} key="intro" className="w-full max-w-lg bg-black/60 backdrop-blur-md rounded-xl p-6 text-center mx-auto">
            <h1 className="text-2xl font-bold mb-2">{`Node: "${node.title}"`}</h1>
            <p className="mb-4">{backstory[step]}</p>
            <button onClick={nextStep} className={buttonStyles}>
              Mulai Menambah Quest
            </button>
          </motion.div>
        )}

        {step === "title" && (
          <motion.div {...motionProps} key="title" className="w-full max-w-md bg-black/60 backdrop-blur-md rounded-xl p-6 mx-auto flex flex-col gap-4">
            <p className="mb-2">{backstory[step]}</p>
            <input
              type="text"
              placeholder="Quest Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-3 rounded bg-gray-800 border border-yellow-500 text-yellow-300"
            />
            <button onClick={nextStep} className={buttonStyles}>
              Lanjut
            </button>
          </motion.div>
        )}

        {step === "description" && (
          <motion.div {...motionProps} key="desc" className="w-full max-w-md bg-black/60 backdrop-blur-md rounded-xl p-6 mx-auto flex flex-col gap-4">
            <p className="mb-2">{backstory[step]}</p>
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-3 rounded bg-gray-800 border border-yellow-500 text-yellow-300"
            />
            <button onClick={nextStep} className={buttonStyles}>
              Lanjut
            </button>
          </motion.div>
        )}

        {step === "exp" && (
          <motion.div {...motionProps} key="exp" className="w-full max-w-md bg-black/60 backdrop-blur-md rounded-xl p-6 mx-auto flex flex-col gap-4">
            <p className="mb-2">{backstory[step]}</p>
            <input
              type="number"
              placeholder="EXP Reward"
              value={expReward}
              onChange={(e) => setExpReward(Number(e.target.value))}
              className="p-3 rounded bg-gray-800 border border-yellow-500 text-yellow-300"
            />
            <button onClick={nextStep} className={buttonStyles}>
              Lanjut
            </button>
          </motion.div>
        )}

        {step === "image" && (
          <motion.div {...motionProps} key="image" className="w-full max-w-md bg-black/60 backdrop-blur-md rounded-xl p-6 mx-auto flex flex-col gap-4 items-center">
            <p className="mb-2">{backstory[step]}</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="p-3 rounded bg-gray-800 border border-yellow-500 text-yellow-300 w-full"
            />
            {image && <img src={image} alt="Preview" className="w-32 h-32 object-cover rounded mt-2" />}
            <button onClick={nextStep} className={buttonStyles}>
              Lanjut
            </button>
          </motion.div>
        )}

        {step === "confirm" && (
          <motion.div {...motionProps} key="confirm" className="w-full max-w-md bg-black/60 backdrop-blur-md rounded-xl p-6 mx-auto text-center flex flex-col gap-4">
            <p className="mb-2">{backstory[step]}</p>
            <div className="flex gap-4 justify-center mt-2">
              <button onClick={addAnother} className={buttonStyles}>
                Ya
              </button>
              <button onClick={() => {saveQuest(); setStep("finished");}} className={buttonStyles}>
                Tidak
              </button>
            </div>
          </motion.div>
        )}

        {step === "finished" && (
          <motion.div {...motionProps} key="finished" className="w-full max-w-lg mx-auto p-4">
            <QuestLog
              quests={quests}
              onComplete={handleComplete}
              onUndo={handleUndo}
              onDelete={handleDelete}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
