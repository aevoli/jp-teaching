"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "@/components/BackButton";
import { speak } from "@/lib/audio";
import { bodyParts } from "@/lib/data/band-b";

const speeds = [
  { label: "🐢 Slow", delay: 2500 },
  { label: "🚶 Normal", delay: 1600 },
  { label: "🏃 Fast", delay: 900 },
  { label: "⚡ Ninja", delay: 500 },
];

export default function BodyPartsDancePage() {
  const [mode, setMode] = useState<"learn" | "dance">("learn");
  const [speedIdx, setSpeedIdx] = useState(0);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopDance = () => {
    setPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const startDance = () => {
    setPlaying(true);
    setCurrent(0);
    speak(bodyParts[0].jp);
    let idx = 0;
    intervalRef.current = setInterval(() => {
      idx = (idx + 1) % bodyParts.length;
      setCurrent(idx);
      speak(bodyParts[idx].jp);
      if (idx === bodyParts.length - 1) {
        setTimeout(stopDance, speeds[speedIdx].delay + 500);
      }
    }, speeds[speedIdx].delay);
  };

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6 pt-20">
      <BackButton />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-black text-gray-900">からだのうた</h1>
          <p className="text-2xl font-bold text-gray-600 mt-1">Body Parts Dance</p>
          <p className="text-gray-500 mt-2">Head, shoulders, knees and toes — in Japanese!</p>
        </div>

        <div className="flex gap-3 justify-center mb-6">
          <button
            onClick={() => { setMode("learn"); stopDance(); }}
            className={`px-5 py-2 rounded-xl font-bold transition-all touch-manipulation ${mode === "learn" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"}`}
          >
            📖 Learn
          </button>
          <button
            onClick={() => setMode("dance")}
            className={`px-5 py-2 rounded-xl font-bold transition-all touch-manipulation ${mode === "dance" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"}`}
          >
            🕺 Dance Mode
          </button>
        </div>

        {mode === "learn" ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bodyParts.map((bp, i) => (
              <motion.button
                key={i}
                whileTap={{ scale: 0.93 }}
                onClick={() => speak(bp.jp)}
                className="bg-white rounded-3xl p-6 shadow-lg text-center hover:bg-blue-50 active:scale-95 transition-all touch-manipulation border-2 border-transparent hover:border-blue-300"
              >
                <p className="text-5xl mb-2">{bp.emoji}</p>
                <p className="text-2xl font-black text-gray-900">{bp.jp}</p>
                <p className="text-lg font-bold text-blue-600">{bp.romaji}</p>
                <p className="text-sm text-gray-500">{bp.en}</p>
              </motion.button>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex gap-2 justify-center flex-wrap">
              {speeds.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setSpeedIdx(i)}
                  disabled={playing}
                  className={`px-4 py-2 rounded-xl font-bold transition-all touch-manipulation ${speedIdx === i ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"} ${playing ? "opacity-50" : ""}`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-3xl shadow-2xl p-12 text-center"
              >
                <motion.p
                  animate={playing ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.3 }}
                  className="text-8xl mb-4"
                >
                  {bodyParts[current].emoji}
                </motion.p>
                <p className="text-6xl font-black text-gray-900">{bodyParts[current].jp}</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{bodyParts[current].romaji}</p>
                <p className="text-2xl text-gray-500 mt-1">{bodyParts[current].en}</p>
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-4 justify-center">
              {!playing ? (
                <button
                  onClick={startDance}
                  className="bg-blue-500 hover:bg-blue-600 active:scale-95 text-white font-black text-xl px-10 py-5 rounded-3xl shadow-xl transition-all touch-manipulation"
                >
                  ▶ Start Dance!
                </button>
              ) : (
                <button
                  onClick={stopDance}
                  className="bg-red-500 hover:bg-red-600 active:scale-95 text-white font-black text-xl px-10 py-5 rounded-3xl shadow-xl transition-all touch-manipulation"
                >
                  ⏹ Stop
                </button>
              )}
              <button
                onClick={() => { speak(bodyParts[current].jp); }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xl px-6 py-5 rounded-3xl shadow transition-all touch-manipulation"
              >
                🔊 Hear
              </button>
            </div>

            <div className="flex gap-2 justify-center">
              {bodyParts.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all ${i === current && playing ? "bg-blue-500 w-8" : "bg-gray-200 w-2"}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
