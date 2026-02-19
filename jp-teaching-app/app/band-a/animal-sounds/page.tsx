"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "@/components/BackButton";
import Furigana from "@/components/Furigana";
import { speak } from "@/lib/audio";
import { animals } from "@/lib/data/band-a";

type Tab = "learn" | "flipcards";

function FlipCard({ animal }: { animal: typeof animals[number] }) {
  const [stage, setStage] = useState<0 | 1 | 2>(0);

  const advance = () => {
    if (stage === 0) { speak(animal.jp); setStage(1); }
    else if (stage === 1) { speak(animal.jp); setStage(2); }
    else { setStage(0); }
  };

  return (
    <div
      onClick={advance}
      className="cursor-pointer select-none"
      style={{ perspective: "800px" }}
    >
      <motion.div
        key={stage}
        initial={{ rotateY: -90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`rounded-3xl shadow-xl p-6 flex flex-col items-center justify-center gap-3 min-h-44 border-4 transition-colors ${
          stage === 0
            ? "bg-green-500 border-green-600"
            : stage === 1
            ? "bg-white border-green-300"
            : "bg-emerald-50 border-emerald-400"
        }`}
      >
        {stage === 0 && (
          <>
            <p className="text-5xl font-black text-white">{animal.jp}</p>
            <p className="text-sm text-white/70 mt-2">Tap to reveal</p>
          </>
        )}
        {stage === 1 && (
          <>
            <p className="text-4xl font-black text-green-700">{animal.jp}</p>
            <p className="text-2xl font-bold text-gray-600">{animal.romaji}</p>
            <p className="text-sm text-gray-400 mt-1">Tap again</p>
          </>
        )}
        {stage === 2 && (
          <>
            <span className="text-6xl">{animal.emoji}</span>
            <p className="text-2xl font-black text-gray-800">{animal.en}</p>
            <p className="text-lg font-bold text-green-600">{animal.romaji}</p>
            <p className="text-sm text-gray-400 mt-1">Tap to reset</p>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default function AnimalSoundsPage() {
  const [tab, setTab] = useState<Tab>("learn");
  const [selected, setSelected] = useState<number | null>(null);
  const [showSound, setShowSound] = useState(false);

  const handleAnimalTap = (idx: number) => {
    setSelected(idx);
    setShowSound(false);
    speak(animals[idx].jp);
  };

  const handleSoundReveal = () => {
    if (selected === null) return;
    setShowSound(true);
    speak(animals[selected].sound);
  };

  const tabClass = (t: Tab) =>
    `px-5 py-2 rounded-xl font-bold transition-all touch-manipulation ${tab === t ? "bg-green-500 text-white" : "bg-gray-100 text-gray-600"}`;

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6 pt-20">
      <BackButton />
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-gray-900">
            <Furigana text="どうぶつ" reading="animal" />
            <Furigana text="のこえ" reading="no koe" />
          </h1>
          <p className="text-2xl font-bold text-gray-600 mt-1">Animal Sounds</p>
          <p className="text-gray-500 mt-2">Tap an animal to hear its Japanese name, then reveal its sound!</p>
        </div>

        <div className="flex gap-3 justify-center mb-6">
          <button onClick={() => setTab("learn")} className={tabClass("learn")}>🐾 Learn Animal Names</button>
          <button onClick={() => setTab("flipcards")} className={tabClass("flipcards")}>🃏 Flip Cards</button>
        </div>

        {tab === "learn" && (
          <>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-5 mb-8">
              {animals.map((animal, idx) => (
                <motion.button
                  key={idx}
                  whileTap={{ scale: 0.93 }}
                  onClick={() => handleAnimalTap(idx)}
                  className={`rounded-3xl p-6 flex flex-col items-center gap-3 shadow-lg transition-all touch-manipulation border-4 ${
                    selected === idx
                      ? "border-green-500 bg-green-100 shadow-green-200"
                      : "border-transparent bg-white hover:bg-green-50"
                  }`}
                >
                  <span className="text-6xl">{animal.emoji}</span>
                  <span className="text-2xl font-black text-gray-800">{animal.jp}</span>
                  <span className="text-lg font-bold text-green-700">{animal.romaji}</span>
                  <span className="text-base text-gray-500">{animal.en}</span>
                </motion.button>
              ))}
            </div>

            <AnimatePresence>
              {selected !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="bg-white rounded-3xl shadow-xl p-8 text-center"
                >
                  <p className="text-xl text-gray-600 mb-4">
                    Selected: <span className="font-black text-green-700">{animals[selected].en}</span> →{" "}
                    <span className="font-black text-2xl">{animals[selected].jp}</span>{" "}
                    <span className="text-gray-500">({animals[selected].romaji})</span>
                  </p>

                  {!showSound ? (
                    <button
                      onClick={handleSoundReveal}
                      className="bg-green-500 hover:bg-green-600 active:scale-95 text-white text-xl font-black px-8 py-4 rounded-2xl shadow-lg transition-all touch-manipulation"
                    >
                      🔊 What sound does it make in Japanese?
                    </button>
                  ) : (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="space-y-3"
                    >
                      <p className="text-5xl font-black text-green-600">{animals[selected].sound}</p>
                      <p className="text-2xl text-gray-600">({animals[selected].soundRomaji})</p>
                      <button
                        onClick={() => speak(animals[selected].sound)}
                        className="bg-green-100 hover:bg-green-200 text-green-800 font-bold px-6 py-3 rounded-xl transition-all touch-manipulation"
                      >
                        🔊 Hear it again
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {selected === null && (
              <div className="text-center text-gray-400 text-lg mt-4">
                👆 Tap any animal to start!
              </div>
            )}
          </>
        )}

        {tab === "flipcards" && (
          <div className="space-y-4">
            <div className="bg-green-50 rounded-2xl p-4 text-center">
              <p className="text-gray-600 font-bold">Tap each card to reveal: <span className="text-green-700">hiragana</span> → <span className="text-gray-700">romaji</span> → <span className="text-emerald-700">emoji + English</span></p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {animals.map((animal, idx) => (
                <FlipCard key={idx} animal={animal} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
