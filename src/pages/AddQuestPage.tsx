import { useState, useEffect, useRef } from "react";
import type { QuestNode, Quest } from "../types/quest";
import QuestLog from "../assets/components/quests/QuestLog";
import { motion, AnimatePresence } from "framer-motion";
import guildhallBg from "../assets/images/guildhall.png";

// **Pool image quest**
import quest1 from "../assets/images/quest/quest1.png";
import quest2 from "../assets/images/quest/quest2.png";
import quest3 from "../assets/images/quest/quest3.png";
import quest4 from "../assets/images/quest/quest4.png";

const questImages = [quest1, quest2, quest3, quest4];

interface AddQuestPageProps {
  node: QuestNode;
  onBack: () => void;
}

const buttonStyles =
  "px-5 py-2 rounded font-bold transition-colors duration-200 bg-yellow-500 text-black hover:bg-yellow-400";

export default function AddQuestPage({ node, onBack }: AddQuestPageProps) {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [step, setStep] = useState<
    "intro" | "title" | "description" | "exp" | "confirm" | "finished"
  >("intro");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expReward, setExpReward] = useState<number | null>(null);
  const [rolling, setRolling] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(`node-${node.id}-quests`);
    if (saved) setQuests(JSON.parse(saved));
    else setQuests(node.quests || []);
    return () => clearTimers();
  }, [node.id, node.quests]);

  const clearTimers = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const resetForm = () => {
    clearTimers();
    setTitle("");
    setDescription("");
    setExpReward(null);
    setRolling(false);
  };

  const rollExpReward = () => {
    if (rolling) return;
    setRolling(true);
    setExpReward(null);
    setShowOverlay(true);

    const rewards = [10, 20, 30, 40, 50];
    const weights = [0.25, 0.25, 0.2, 0.2, 0.1];

    clearTimers();

    intervalRef.current = setInterval(() => {
      setExpReward(rewards[Math.floor(Math.random() * rewards.length)]);
    }, 120);

    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      const random = Math.random();
      let sum = 0;
      for (let i = 0; i < rewards.length; i++) {
        sum += weights[i];
        if (random <= sum) {
          setExpReward(rewards[i]);
          break;
        }
      }

      setRolling(false);
      setShowOverlay(false);
      timeoutRef.current = null;
    }, 3000);
  };

  useEffect(() => {
    if (step === "exp") {
      rollExpReward();
    }
  }, [step]);

  const saveQuest = () => {
    if (!title.trim() || expReward === null) return quests;

    // **Pilih random image dari pool**
    const randomImage = questImages[Math.floor(Math.random() * questImages.length)];

    const newQuest: Quest = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      expReward,
      image: randomImage, // pakai random image
      completed: false,
    };

    const updatedQuests = [...quests, newQuest];
    setQuests(updatedQuests);
    localStorage.setItem(
      `node-${node.id}-quests`,
      JSON.stringify(updatedQuests)
    );

    resetForm();
    return updatedQuests;
  };

  const handleComplete = (id: number) => {
    const updatedQuests = quests.map((q) =>
      q.id === id ? { ...q, completed: true } : q
    );
    setQuests(updatedQuests);
    localStorage.setItem(`node-${node.id}-quests`, JSON.stringify(updatedQuests));
  };

  const handleUndo = (id: number) => {
    const updatedQuests = quests.map((q) =>
      q.id === id ? { ...q, completed: false } : q
    );
    setQuests(updatedQuests);
    localStorage.setItem(`node-${node.id}-quests`, JSON.stringify(updatedQuests));
  };

  const handleDelete = (id: number) => {
    const updatedQuests = quests.filter((q) => q.id !== id);
    setQuests(updatedQuests);
    localStorage.setItem(`node-${node.id}-quests`, JSON.stringify(updatedQuests));
  };

  const nextStep = () => {
    if (step === "intro") {
      resetForm();
      setStep("title");
    } else if (step === "title") setStep("description");
    else if (step === "description") setStep("exp");
    else if (step === "exp") setStep("confirm");
    else if (step === "confirm") setStep("finished");
  };

  const addAnother = () => {
    resetForm();
    setStep("title");
  };

  const fastForward = () => {
    saveQuest();
    setStep("finished");
  };

  const motionProps = {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -30, scale: 0.95 },
    transition: { duration: 0.35 },
  };

  const backstory: Record<string, string> = {
    intro: `Kamu memasuki guild hall yang megah, tempat para adventurer berkumpul.`,
    title: `Di sudut ruangan, seorang NPC menatapmu dan bertanya nama quest yang akan kamu ciptakan.`,
    description: `Cerita questmu harus menarik agar para adventurer tertarik menyelesaikannya.`,
    exp: `⚡ Sang Dewa Kristal akan menentukan kelayakan hadiahmu...`,
    confirm: `Apakah kamu ingin menambahkan quest lain di node ini?`,
    finished: `Daftar semua quest di node ini:`,
  };

  return (
    <div
      className="relative h-full w-full flex flex-col items-center justify-center text-yellow-300 overflow-auto"
      style={{
        backgroundImage: `url(${guildhallBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <button
        onClick={onBack}
        className="absolute top-6 left-6 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 z-20"
      >
        ← Back to Workshop
      </button>

      {step !== "finished" && (
        <button
          onClick={fastForward}
          className="absolute top-6 right-6 px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 z-20"
        >
          Quest List
        </button>
      )}

      {/* Overlay Epic Gacha */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-black/80 flex items-center justify-center z-30"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-2xl md:text-4xl font-bold text-yellow-300 text-center px-6"
            >
              ⚡ "Sang Dewa Kristal sedang menimbang kelayakanmu..."
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

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
          <motion.div {...motionProps} key="exp" className="w-full max-w-md mx-auto flex flex-col gap-4 items-center text-center">
            {!rolling && expReward !== null && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
              >
                <p className="text-lg italic text-yellow-200 mb-2">
                  "✨ Takdir telah ditetapkan!"
                </p>
                <p className="text-3xl font-bold text-green-400 animate-bounce">
                  Kamu mendapatkan {expReward} EXP
                </p>
                <button onClick={nextStep} className={`${buttonStyles} mt-4`}>
                  Lanjut
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {step === "confirm" && (
          <motion.div {...motionProps} key="confirm" className="w-full max-w-md bg-black/60 backdrop-blur-md rounded-xl p-6 mx-auto text-center flex flex-col gap-4">
            <p className="mb-2">{backstory[step]}</p>
            <div className="flex gap-4 justify-center mt-2">
              <button onClick={addAnother} className={buttonStyles}>
                Ya
              </button>
              <button
                onClick={() => {
                  saveQuest();
                  setStep("finished");
                }}
                className={buttonStyles}
              >
                Tidak
              </button>
            </div>
          </motion.div>
        )}

        {step === "finished" && (
          <motion.div {...motionProps} key="finished" className="w-full max-w-5xl mx-auto p-6 pt-20">
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
