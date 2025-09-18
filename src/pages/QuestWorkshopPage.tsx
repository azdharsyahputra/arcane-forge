import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { QuestNode } from "../types/quest";
import AddQuestPage from "./AddQuestPage";
import crystalBg from "../assets/images/guild-crystal.png";

export default function QuestWorkshopPage() {
  const [nodes, setNodes] = useState<QuestNode[]>([]);
  const [newNodeTitle, setNewNodeTitle] = useState("");
  const [selectedNode, setSelectedNode] = useState<QuestNode | null>(null);
  const [stage, setStage] = useState<"idle" | "story" | "forge">("idle");
  const [forgeStep, setForgeStep] = useState<"askLocation" | "askMore" | "list">("askLocation");
  const [flashNode, setFlashNode] = useState<number | null>(null);
  const [screenFlash, setScreenFlash] = useState(false);

  useEffect(() => {
    const savedNodes = localStorage.getItem("custom-nodes");
    if (savedNodes) setNodes(JSON.parse(savedNodes));
  }, []);

  const saveNodes = (newNodes: QuestNode[]) => {
    setNodes(newNodes);
    localStorage.setItem("custom-nodes", JSON.stringify(newNodes));
  };

  const addNode = (title: string) => {
    const newNode: QuestNode = {
      id: Date.now(),
      title: title.trim(),
      quests: [],
    };
    saveNodes([...nodes, newNode]);
  };

  const fastForwardToList = () => {
    setStage("forge");
    setForgeStep("list");
  };

  const removeNode = (id: number) => {
    setFlashNode(id);
    setScreenFlash(true);
    setTimeout(() => {
      const filtered = nodes.filter((n) => n.id !== id);
      saveNodes(filtered);
      setFlashNode(null);
      setScreenFlash(false);
    }, 400);
  };

  if (selectedNode) {
    return (
      <AddQuestPage
        node={selectedNode}
        onBack={() => {
          setSelectedNode(null);
          saveNodes(nodes);
        }}
      />
    );
  }

  return (
    <div
      className="relative h-full w-full bg-cover bg-center flex flex-col items-center text-yellow-300"
      style={{ backgroundImage: `url(${crystalBg})` }}
    >
      {/* Overlay kalau bukan idle */}
      {stage !== "idle" && <div className="absolute inset-0 bg-black/60" />}

      {/* Fast Forward Button */}
      {stage === "idle" && (
        <button
          onClick={fastForwardToList}
          className="absolute top-4 right-4 px-4 py-2 bg-gray-700 text-yellow-200 font-bold rounded hover:bg-gray-600 z-30"
        >
          Fast Forward
        </button>
      )}

      {/* Judul */}
      <motion.h1
        className="z-20 mt-8 text-4xl font-extrabold text-yellow-300 drop-shadow-lg text-center"
        animate={{
          textShadow: [
            "0px 0px 4px #facc15",
            "0px 0px 12px #facc15",
            "0px 0px 4px #facc15",
          ],
        }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        Pusat Guild – Kristal Takdir
      </motion.h1>

      {/* Konten */}
      <div className="flex-1 flex items-center justify-center w-full">
        <AnimatePresence mode="wait">
          {/* IDLE */}
          {stage === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="z-10 text-center space-y-4"
            >
              <motion.button
                onClick={() => setStage("story")}
                className="border-2 border-yellow-400 text-yellow-300 px-6 py-3 rounded-xl font-bold text-xl bg-transparent backdrop-blur-sm mt-100"
                whileHover={{
                  scale: 1.1,
                  textShadow: "0px 0px 8px #facc15",
                  boxShadow: "0px 0px 12px #facc15",
                }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0px 0px 8px #facc15",
                    "0px 0px 16px #facc15",
                    "0px 0px 8px #facc15",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Tekan Kristal
              </motion.button>
              <motion.p
                className="text-lg italic text-yellow-100 mt-4 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                "Kristal putih bercahaya berdiri di tengah guild, menunggu disentuh..."
              </motion.p>
            </motion.div>
          )}

          {/* STORY */}
          {stage === "story" && (
            <motion.div
              key="story"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="z-10 max-w-2xl text-center space-y-6"
            >
              <motion.p className="text-lg leading-relaxed">
                "Di dalam guild kuno, kristal ini menyimpan kekuatan untuk
                menempa petualangan baru. Setiap sentuhan membangkitkan cerita
                lama dan membuka jalan bagi quest-quest baru..."
              </motion.p>
              <motion.button
                onClick={() => setStage("forge")}
                className="mt-6 bg-yellow-400 text-gray-900 px-6 py-3 rounded-xl font-bold text-xl shadow-lg"
                whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px #facc15" }}
                whileTap={{ scale: 0.9 }}
              >
                Lanjutkan
              </motion.button>
            </motion.div>
          )}

          {/* FORGE */}
          {stage === "forge" && (
            <motion.div
              key="forge"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="z-10 w-full flex flex-col items-center"
            >
              {/* ASK LOCATION */}
              {forgeStep === "askLocation" && (
                <div className="bg-black/60 p-6 rounded-xl border border-yellow-500 shadow-lg max-w-md text-center space-y-4">
                  <motion.p className="text-lg text-yellow-200 italic" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    "Tempat mana yang akan kamu tuju untuk menemukan takdirmu?"
                  </motion.p>
                  <input
                    type="text"
                    placeholder="Nama Tempat"
                    value={newNodeTitle}
                    onChange={(e) => setNewNodeTitle(e.target.value)}
                    className="w-full p-3 rounded bg-gray-800 text-yellow-300 border border-yellow-600"
                  />
                  <button
                    onClick={() => {
                      if (!newNodeTitle.trim()) return;
                      addNode(newNodeTitle);
                      setNewNodeTitle("");
                      setForgeStep("askMore");
                    }}
                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded"
                  >
                    Forge
                  </button>
                </div>
              )}

              {/* ASK MORE */}
              {forgeStep === "askMore" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-black/60 p-6 rounded-xl border border-yellow-500 shadow-lg max-w-md text-center space-y-6"
                >
                  <motion.p className="text-lg text-yellow-200 italic">
                    "Apakah ada tempat lain yang ingin kamu tempa?"
                  </motion.p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => setForgeStep("askLocation")}
                      className="px-4 py-2 bg-yellow-400 text-gray-900 font-bold rounded hover:bg-yellow-500"
                    >
                      Ya
                    </button>
                    <button
                      onClick={() => setForgeStep("list")}
                      className="px-4 py-2 bg-gray-700 text-yellow-200 font-bold rounded hover:bg-gray-600"
                    >
                      Tidak
                    </button>
                  </div>
                </motion.div>
              )}

              {/* NODE LIST */}
              {forgeStep === "list" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full px-8 mt-6 max-h-[60vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 scrollbar-none"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  {nodes.map((node) => (
                    <div key={node.id} className="relative">
                      {/* Card shard */}
                      <motion.div
                        onClick={() => setSelectedNode(node)}
                        className="relative p-6 text-center text-white cursor-pointer
                                   bg-gradient-to-br from-white/20 via-cyan-200/30 to-purple-300/20
                                   border border-white/40
                                   shadow-[0_0_20px_rgba(255,255,255,0.4)]
                                   backdrop-blur-sm
                                   transition-transform"
                        whileHover={{ scale: 1.05, boxShadow: "0px 0px 25px rgba(255,255,255,0.8)" }}
                        style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 30%, 90% 100%, 10% 100%, 0% 30%)" }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-200/40 via-transparent to-purple-300/30 rounded-xl animate-pulse pointer-events-none" />
                        <h2 className="font-extrabold text-xl drop-shadow-md relative z-10">{node.title}</h2>
                        <p className="text-sm opacity-90 relative z-10">
                          {node.quests.length} quest{node.quests.length !== 1 ? "s" : ""}
                        </p>
                      </motion.div>

                      {/* Tombol hapus */}
                      <motion.button
                        onClick={() => removeNode(node.id)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: flashNode === node.id ? [0, 1, 0] : 1 }}
                        transition={{ duration: 0.4 }}
                        className="absolute -top-2 -right-2 bg-red-600 px-2 py-1 rounded text-sm hover:bg-red-500 z-20"
                      >
                        Hapus
                      </motion.button>
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fullscreen flash efek */}
        <AnimatePresence>
          {screenFlash && (
            <motion.div
              className="absolute inset-0 bg-white z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* CSS hide scrollbar */}
      <style>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
