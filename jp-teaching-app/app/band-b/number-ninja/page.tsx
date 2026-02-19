"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "@/components/BackButton";
import Furigana from "@/components/Furigana";
import { speak } from "@/lib/audio";
import { numbers } from "@/lib/data/band-b";

export default function NumberNinjaPage() {
  const [score, setScore] = useState({ team1: 0, team2: 0 });
  const [current, setCurrent] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [lastWinner, setLastWinner] = useState<string | null>(null);
  const [mode, setMode] = useState<"learn" | "game">("learn");

  const pickRandom = useCallback(() => {
    const idx = Math.floor(Math.random() * numbers.length);
    setCurrent(idx);
    setRevealed(false);
    setLastWinner(null);
    speak(numbers[idx].jp);
  }, []);

  const award = (team: "team1" | "team2") => {
    setScore((s) => ({ ...s, [team]: s[team] + 1 }));
    setLastWinner(team === "team1" ? "Team 1 🥷" : "Team 2 🥷");
    setRevealed(true);
    setTimeout(pickRandom, 1800);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50 p-6 pt-20">
      <BackButton />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-black text-gray-900">
            <Furigana text="かず" reading="kazu" />
            <span>ゲーム</span>
          </h1>
          <p className="text-2xl font-bold text-gray-600 mt-1">Number Ninja</p>
        </div>

        <div className="flex gap-3 justify-center mb-6">
          <button
            onClick={() => setMode("learn")}
            className={`px-5 py-2 rounded-xl font-bold transition-all touch-manipulation ${mode === "learn" ? "bg-red-500 text-white" : "bg-gray-100 text-gray-600"}`}
          >
            📖 Learn Numbers
          </button>
          <button
            onClick={() => setMode("game")}
            className={`px-5 py-2 rounded-xl font-bold transition-all touch-manipulation ${mode === "game" ? "bg-red-500 text-white" : "bg-gray-100 text-gray-600"}`}
          >
            🥷 Ninja Game
          </button>
        </div>

        {mode === "learn" ? (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {numbers.map((n, i) => (
              <motion.button
                key={i}
                whileTap={{ scale: 0.93 }}
                onClick={() => speak(n.jp)}
                className="bg-white rounded-3xl p-5 shadow-lg text-center hover:bg-red-50 active:scale-95 transition-all touch-manipulation border-2 border-transparent hover:border-red-300"
              >
                <p className="text-5xl font-black text-red-600">{n.num}</p>
                <p className="text-3xl font-black text-gray-900 mt-1">{n.kanji}</p>
                <p className="text-xl font-bold text-gray-700">{n.jp}</p>
                <p className="text-sm text-gray-500">{n.romaji}</p>
              </motion.button>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-500 rounded-3xl p-5 text-white text-center shadow-xl">
                <p className="text-lg font-bold opacity-80">Team 1</p>
                <p className="text-6xl font-black">{score.team1}</p>
              </div>
              <div className="bg-orange-500 rounded-3xl p-5 text-white text-center shadow-xl">
                <p className="text-lg font-bold opacity-80">Team 2</p>
                <p className="text-6xl font-black">{score.team2}</p>
              </div>
            </div>

            {current !== null && (
              <div className="bg-white rounded-3xl shadow-xl p-10 text-center">
                <p className="text-gray-500 mb-2">Listen and find the number!</p>
                <motion.p
                  key={current}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-8xl font-black text-red-600 mb-2"
                >
                  {numbers[current].jp}
                </motion.p>
                <p className="text-3xl text-gray-600 mb-1">{numbers[current].romaji}</p>

                <AnimatePresence>
                  {revealed && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 text-5xl font-black text-gray-800"
                    >
                      {numbers[current].num} — {numbers[current].kanji}
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {lastWinner && (
                    <motion.p
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1.1, opacity: 1 }}
                      className="text-2xl font-black text-green-600 mt-3"
                    >
                      🎉 {lastWinner} wins this round!
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            )}

            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => award("team1")}
                className="bg-blue-500 hover:bg-blue-600 active:scale-95 text-white font-black text-lg py-4 rounded-2xl shadow-lg transition-all touch-manipulation"
              >
                🥷 Team 1 Got It!
              </button>
              <button
                onClick={pickRandom}
                className="bg-gray-700 hover:bg-gray-800 active:scale-95 text-white font-black text-lg py-4 rounded-2xl shadow-lg transition-all touch-manipulation"
              >
                🔊 Repeat
              </button>
              <button
                onClick={() => award("team2")}
                className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-black text-lg py-4 rounded-2xl shadow-lg transition-all touch-manipulation"
              >
                🥷 Team 2 Got It!
              </button>
            </div>

            <button
              onClick={() => setScore({ team1: 0, team2: 0 })}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-3 rounded-2xl transition-all touch-manipulation"
            >
              Reset Scores
            </button>

            <button
              onClick={pickRandom}
              className="w-full bg-red-500 hover:bg-red-600 active:scale-95 text-white font-black text-xl py-4 rounded-2xl shadow-lg transition-all touch-manipulation"
            >
              はじめ！ — Hajime! (Start Game)
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
