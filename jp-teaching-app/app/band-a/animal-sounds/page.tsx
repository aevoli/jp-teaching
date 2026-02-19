"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "@/components/BackButton";
import { speak } from "@/lib/audio";
import { animals } from "@/lib/data/band-a";

export default function AnimalSoundsPage() {
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6 pt-20">
      <BackButton />
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-gray-900">どうぶつのこえ</h1>
          <p className="text-2xl font-bold text-gray-600 mt-1">Animal Sounds</p>
          <p className="text-gray-500 mt-2">Tap an animal to hear its Japanese name, then reveal its sound!</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-8">
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
      </div>
    </main>
  );
}
