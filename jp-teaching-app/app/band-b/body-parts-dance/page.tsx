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

type Mode = "learn-en" | "learn-jp" | "dance";

export default function HeadsShouldersPage() {
  const [mode, setMode] = useState<Mode>("learn-en");
  const [speedIdx, setSpeedIdx] = useState(0);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [danceJP, setDanceJP] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopDance = () => {
    setPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const startDance = () => {
    setPlaying(true);
    setCurrent(0);
    if (danceJP) speak(bodyParts[0].jp); else speak(bodyParts[0].en);
    let idx = 0;
    intervalRef.current = setInterval(() => {
      idx = (idx + 1) % bodyParts.length;
      setCurrent(idx);
      if (danceJP) speak(bodyParts[idx].jp); else speak(bodyParts[idx].en);
      if (idx === bodyParts.length - 1) {
        setTimeout(stopDance, speeds[speedIdx].delay + 500);
      }
    }, speeds[speedIdx].delay);
  };

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const tabClass = (t: Mode) =>
    `px-4 py-2 rounded-xl font-bold transition-all touch-manipulation ${mode === t ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"}`;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6 pt-20">
      <BackButton />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-black text-gray-900">からだのうた</h1>
          <p className="text-2xl font-bold text-gray-600 mt-1">Heads, Shoulders, Knees &amp; Toes</p>
          <p className="text-gray-500 mt-2">Learn the song in English, then try it in Japanese!</p>
        </div>

        <div className="flex gap-2 justify-center mb-6 flex-wrap">
          <button onClick={() => { setMode("learn-en"); stopDance(); }} className={tabClass("learn-en")}>
            🇬🇧 Learn English Version
          </button>
          <button onClick={() => { setMode("learn-jp"); stopDance(); }} className={tabClass("learn-jp")}>
            🇯🇵 Learn Japanese Version
          </button>
          <button onClick={() => setMode("dance")} className={tabClass("dance")}>
            🕺 Dance Mode
          </button>
        </div>

        {mode === "learn-en" && (
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-2xl p-5 text-center">
              <p className="text-xl font-black text-blue-800 mb-1">🎵 Heads, Shoulders, Knees and Toes</p>
              <p className="text-gray-600">Tap each body part to hear it — touch it on yourself at the same time!</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {bodyParts.map((bp, i) => (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.93 }}
                  onClick={() => speak(bp.en)}
                  className="bg-white rounded-3xl p-6 shadow-lg text-center hover:bg-blue-50 active:scale-95 transition-all touch-manipulation border-2 border-transparent hover:border-blue-300"
                >
                  <p className="text-5xl mb-2">{bp.emoji}</p>
                  <p className="text-2xl font-black text-gray-900">{bp.en}</p>
                </motion.button>
              ))}
            </div>
            <div className="bg-white rounded-2xl shadow p-5 text-center">
              <p className="font-black text-gray-700 mb-2">🎵 Song order:</p>
              <p className="text-xl text-gray-600">Head → Shoulders → Knees → Toes → Eyes → Ears → Mouth → Nose</p>
            </div>
          </div>
        )}

        {mode === "learn-jp" && (
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-2xl p-5 text-center">
              <p className="text-xl font-black text-blue-800 mb-1">🎵 あたま、かた、ひざ、つまさき</p>
              <p className="text-gray-600">Tap each card to hear the Japanese — then touch that body part!</p>
            </div>
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
            <div className="bg-white rounded-2xl shadow p-5 text-center">
              <p className="font-black text-gray-700 mb-2">🎵 Song order in Japanese:</p>
              <p className="text-xl text-gray-600">あたま → かた → ひざ → つまさき → め → みみ → くち → はな</p>
              <p className="text-base text-blue-600 mt-1">Atama → Kata → Hiza → Tsumasaki → Me → Mimi → Kuchi → Hana</p>
            </div>
          </div>
        )}

        {mode === "dance" && (
          <div className="space-y-6">
            <div className="flex gap-3 justify-center flex-wrap">
              <button
                onClick={() => { setDanceJP(false); stopDance(); }}
                disabled={playing}
                className={`px-5 py-2 rounded-xl font-bold transition-all touch-manipulation ${!danceJP ? "bg-cyan-500 text-white" : "bg-gray-100 text-gray-600"} ${playing ? "opacity-50" : ""}`}
              >
                🇬🇧 English
              </button>
              <button
                onClick={() => { setDanceJP(true); stopDance(); }}
                disabled={playing}
                className={`px-5 py-2 rounded-xl font-bold transition-all touch-manipulation ${danceJP ? "bg-cyan-500 text-white" : "bg-gray-100 text-gray-600"} ${playing ? "opacity-50" : ""}`}
              >
                🇯🇵 Japanese
              </button>
            </div>

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
                {danceJP ? (
                  <>
                    <p className="text-6xl font-black text-gray-900">{bodyParts[current].jp}</p>
                    <p className="text-3xl font-bold text-blue-600 mt-2">{bodyParts[current].romaji}</p>
                    <p className="text-2xl text-gray-500 mt-1">{bodyParts[current].en}</p>
                  </>
                ) : (
                  <p className="text-6xl font-black text-gray-900">{bodyParts[current].en}</p>
                )}
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
                onClick={() => { if (danceJP) speak(bodyParts[current].jp); else speak(bodyParts[current].en); }}
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
