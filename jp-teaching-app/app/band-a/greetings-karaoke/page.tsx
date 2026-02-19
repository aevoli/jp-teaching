"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "@/components/BackButton";
import Furigana from "@/components/Furigana";
import { speak } from "@/lib/audio";
import { greetings } from "@/lib/data/band-a";

type Tab = "learn" | "together" | "video";

export default function GreetingsKaraokePage() {
  const [tab, setTab] = useState<Tab>("learn");
  const [current, setCurrent] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const greeting = greetings[current];

  const next = () => { setCurrent((c) => (c + 1) % greetings.length); setRevealed(false); };
  const prev = () => { setCurrent((c) => (c - 1 + greetings.length) % greetings.length); setRevealed(false); };
  const handleSpeak = () => { speak(greeting.jp); setRevealed(true); };

  const tabClass = (t: Tab) =>
    `px-5 py-2 rounded-xl font-bold transition-all touch-manipulation ${tab === t ? "bg-pink-500 text-white" : "bg-gray-100 text-gray-600"}`;

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 p-6 pt-20">
      <BackButton />
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-gray-900">
            <Furigana text="あいさつ" reading="aisatsu" />
            <Furigana text="のうた" reading="no uta" />
          </h1>
          <p className="text-2xl font-bold text-gray-600 mt-1">Greetings Song</p>
          <p className="text-gray-500 mt-2">Learn Japanese greetings with actions!</p>
        </div>

        <div className="flex gap-3 justify-center mb-6 flex-wrap">
          <button onClick={() => setTab("learn")} className={tabClass("learn")}>📖 Learn</button>
          <button onClick={() => setTab("together")} className={tabClass("together")}>🎤 All Together</button>
          <button onClick={() => setTab("video")} className={tabClass("video")}>🎬 Video</button>
        </div>

        {tab === "learn" && (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                className="bg-white rounded-3xl shadow-xl p-10 text-center mb-6"
              >
                <p className="text-lg text-gray-500 mb-2">{greeting.en}</p>
                <p className="text-7xl font-black text-gray-900 mb-3">{greeting.jp}</p>
                <p className="text-3xl font-bold text-pink-600 mb-6">{greeting.romaji}</p>

                <div className="bg-pink-50 rounded-2xl p-4 mb-6">
                  <p className="text-lg font-bold text-pink-700">Action: {greeting.action}</p>
                </div>

                <button
                  onClick={handleSpeak}
                  className="bg-pink-500 hover:bg-pink-600 active:scale-95 text-white text-xl font-black px-8 py-4 rounded-2xl shadow-lg transition-all touch-manipulation"
                >
                  🔊 Hear it!
                </button>

                <AnimatePresence>
                  {revealed && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 text-4xl font-black text-pink-400"
                    >
                      {greeting.hiragana}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between items-center">
              <button onClick={prev} className="bg-white shadow-lg px-6 py-3 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 active:scale-95 transition-all touch-manipulation text-xl">
                ← Prev
              </button>
              <div className="flex gap-2">
                {greetings.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setCurrent(i); setRevealed(false); }}
                    className={`w-3 h-3 rounded-full transition-all touch-manipulation ${i === current ? "bg-pink-500 scale-125" : "bg-gray-300"}`}
                  />
                ))}
              </div>
              <button onClick={next} className="bg-white shadow-lg px-6 py-3 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 active:scale-95 transition-all touch-manipulation text-xl">
                Next →
              </button>
            </div>
          </>
        )}

        {tab === "together" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {greetings.map((g, i) => (
              <button
                key={i}
                onClick={() => speak(g.jp)}
                className="bg-white rounded-2xl shadow-lg p-5 text-left hover:bg-pink-50 active:scale-95 transition-all touch-manipulation border-2 border-transparent hover:border-pink-300"
              >
                <p className="text-3xl font-black text-gray-900">{g.jp}</p>
                <p className="text-xl font-bold text-pink-600">{g.romaji}</p>
                <p className="text-gray-500">{g.en}</p>
                <p className="text-sm text-pink-400 mt-1">{g.action}</p>
              </button>
            ))}
          </div>
        )}

        {tab === "video" && (
          <div className="space-y-5">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/HpFL2SwSOrc?rel=0"
                  title="Japanese Greetings Song"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="bg-pink-50 rounded-2xl p-5">
              <p className="font-black text-pink-800 mb-3">🎵 Words in the video</p>
              <div className="space-y-2">
                {greetings.map((g, i) => (
                  <button
                    key={i}
                    onClick={() => speak(g.jp)}
                    className="w-full flex items-center gap-4 bg-white rounded-xl px-4 py-3 hover:bg-pink-100 active:scale-95 transition-all touch-manipulation text-left"
                  >
                    <span className="text-2xl font-black text-gray-900 w-48">{g.jp}</span>
                    <span className="text-lg font-bold text-pink-600 w-48">{g.romaji}</span>
                    <span className="text-gray-500 text-sm">{g.en}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
