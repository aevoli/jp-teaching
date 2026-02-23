"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "@/components/BackButton";
import { speak } from "@/lib/audio";
import { tongueTwisters } from "@/lib/data/band-c";

export default function TongueTwistersPage() {
  const [current, setCurrent] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const twister = tongueTwisters[current];

  const nextTwister = () => {
    setCurrent((i) => (i + 1) % tongueTwisters.length);
    setShowMeaning(false);
    setShowExplanation(false);
  };

  const prevTwister = () => {
    setCurrent((i) => (i - 1 + tongueTwisters.length) % tongueTwisters.length);
    setShowMeaning(false);
    setShowExplanation(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6 pt-20">
      <BackButton />
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-2">
            Tongue Twisters!
          </h1>
          <p className="text-2xl font-bold text-gray-600">はやくち言葉</p>
          <p className="text-gray-500 mt-2">Try saying these as fast as you can!</p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* Main Tongue Twister Card */}
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
              <div className="text-7xl mb-4">{twister.emoji}</div>
              
              <div className="mb-6 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl">
                <p className="text-5xl font-black text-gray-900 mb-3 leading-relaxed">
                  {twister.japanese}
                </p>
                <p className="text-xl font-bold text-purple-700">
                  {twister.romaji}
                </p>
              </div>

              <div className="flex gap-3 justify-center mb-6">
                <button
                  onClick={() => speak(twister.japanese)}
                  className="bg-purple-500 hover:bg-purple-600 active:scale-95 text-white font-bold px-6 py-3 rounded-2xl shadow-lg transition-all touch-manipulation"
                >
                  🔊 Hear It
                </button>
                <button
                  onClick={() => setShowMeaning(!showMeaning)}
                  className="bg-pink-500 hover:bg-pink-600 active:scale-95 text-white font-bold px-6 py-3 rounded-2xl shadow-lg transition-all touch-manipulation"
                >
                  {showMeaning ? "Hide Meaning" : "📖 Show Meaning"}
                </button>
              </div>

              {/* Difficulty Badge */}
              <div className="inline-block bg-yellow-100 px-4 py-2 rounded-full mb-4">
                <p className="font-bold text-gray-800 text-lg">{twister.difficulty}</p>
              </div>

              {/* Meaning */}
              <AnimatePresence>
                {showMeaning && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-6 border-t-2 border-purple-200"
                  >
                    <p className="text-2xl font-black text-gray-800 mb-4">
                      What it means:
                    </p>
                    <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                      {twister.meaning}
                    </p>

                    <button
                      onClick={() => setShowExplanation(!showExplanation)}
                      className="bg-blue-500 hover:bg-blue-600 active:scale-95 text-white font-bold px-6 py-3 rounded-2xl shadow-lg transition-all touch-manipulation"
                    >
                      {showExplanation ? "Hide Hint" : "💡 Why is it tricky?"}
                    </button>

                    <AnimatePresence>
                      {showExplanation && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-6 p-6 bg-blue-50 rounded-2xl"
                        >
                          <p className="text-lg text-gray-800 leading-relaxed">
                            {twister.explanation}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex gap-4 justify-center items-center mt-8">
          <button
            onClick={prevTwister}
            className="bg-white hover:bg-gray-100 active:scale-95 text-purple-600 font-bold px-6 py-3 rounded-2xl shadow-lg transition-all touch-manipulation text-2xl"
          >
            ⬅️
          </button>
          <div className="text-gray-600 font-bold text-lg">
            {current + 1} / {tongueTwisters.length}
          </div>
          <button
            onClick={nextTwister}
            className="bg-white hover:bg-gray-100 active:scale-95 text-purple-600 font-bold px-6 py-3 rounded-2xl shadow-lg transition-all touch-manipulation text-2xl"
          >
            ➡️
          </button>
        </div>

        {/* Fun Fact */}
        <div className="mt-12 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 text-center">
          <p className="text-gray-800 font-semibold text-lg">
            🎯 Fun Fact: In Japanese, tongue twisters are called "はやくち言葉" (hayakuchi kotoba) which means "fast mouth words"!
          </p>
        </div>
      </div>
    </main>
  );
}
