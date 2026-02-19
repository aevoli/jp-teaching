"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "@/components/BackButton";
import Furigana from "@/components/Furigana";
import { speak } from "@/lib/audio";
import { greetings } from "@/lib/data/band-a";

type Tab = "learn" | "match" | "together" | "video";

function MatchTab() {
  const [matched, setMatched] = useState<Record<string, string>>({});
  const [dragging, setDragging] = useState<string | null>(null);
  const [wrong, setWrong] = useState<string | null>(null);
  const [complete, setComplete] = useState(false);

  const [romajis, setRomajis] = useState<string[]>(() =>
    [...greetings].sort(() => Math.random() - 0.5).map((g) => g.romaji)
  );
  const targets = greetings.map((g) => ({ en: g.en, romaji: g.romaji }));

  const handleDrop = (targetRomaji: string) => {
    if (!dragging) return;
    if (dragging === targetRomaji) {
      const next = { ...matched, [targetRomaji]: dragging };
      setMatched(next);
      speak(greetings.find((g) => g.romaji === targetRomaji)?.jp ?? "");
      if (Object.keys(next).length === greetings.length) setComplete(true);
    } else {
      setWrong(targetRomaji);
      setTimeout(() => setWrong(null), 700);
    }
    setDragging(null);
  };

  const reset = () => {
    setRomajis([...greetings].sort(() => Math.random() - 0.5).map((g) => g.romaji));
    setMatched({});
    setDragging(null);
    setWrong(null);
    setComplete(false);
  };

  const unmatched = romajis.filter((r: string) => !Object.values(matched).includes(r));

  return (
    <div className="space-y-6">
      <p className="text-center text-gray-600 font-bold">Drag each romaji to its English meaning!</p>

      <div className="flex flex-wrap gap-3 justify-center min-h-14 bg-pink-50 rounded-2xl p-4">
        {unmatched.map((r) => (
          <motion.div
            key={r}
            draggable
            onDragStart={() => setDragging(r)}
            onDragEnd={() => setDragging(null)}
            whileTap={{ scale: 0.95 }}
            onClick={() => setDragging(dragging === r ? null : r)}
            className={`px-5 py-3 rounded-xl font-black text-lg cursor-grab active:cursor-grabbing select-none transition-all shadow ${
              dragging === r
                ? "bg-pink-500 text-white scale-105 shadow-lg"
                : "bg-white text-pink-700 border-2 border-pink-200 hover:border-pink-400"
            }`}
          >
            {r}
          </motion.div>
        ))}
        {unmatched.length === 0 && !complete && (
          <p className="text-gray-400 text-sm self-center">All placed!</p>
        )}
      </div>

      <div className="space-y-3">
        {targets.map((t) => (
          <div
            key={t.romaji}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(t.romaji)}
            onClick={() => dragging && handleDrop(t.romaji)}
            className={`flex items-center gap-4 rounded-2xl p-4 border-2 transition-all ${
              matched[t.romaji]
                ? "bg-green-50 border-green-400"
                : wrong === t.romaji
                ? "bg-red-50 border-red-400"
                : dragging
                ? "border-pink-300 bg-pink-50 cursor-pointer"
                : "border-gray-200 bg-white"
            }`}
          >
            <span className="text-lg font-black text-gray-800 w-48">{t.en}</span>
            <div className="flex-1 min-h-10 flex items-center">
              {matched[t.romaji] ? (
                <motion.span
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="px-4 py-2 bg-green-500 text-white rounded-xl font-black text-lg"
                >
                  ✓ {matched[t.romaji]}
                </motion.span>
              ) : wrong === t.romaji ? (
                <span className="text-red-400 font-bold">Try again!</span>
              ) : (
                <span className="text-gray-300 font-bold border-b-2 border-dashed border-gray-300 w-32 block" />
              )}
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {complete && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-green-100 rounded-3xl p-8 text-center"
          >
            <p className="text-5xl mb-2">🎉</p>
            <p className="text-3xl font-black text-green-700">Perfect match!</p>
            <button
              onClick={reset}
              className="mt-4 bg-pink-500 hover:bg-pink-600 text-white font-black px-8 py-3 rounded-2xl transition-all touch-manipulation"
            >
              Play again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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
          <p className="text-gray-500 mt-2">Learn Japanese greetings!</p>
        </div>

        <div className="flex gap-3 justify-center mb-6 flex-wrap">
          <button onClick={() => setTab("learn")} className={tabClass("learn")}>📖 Learn</button>
          <button onClick={() => setTab("match")} className={tabClass("match")}>🧩 Match</button>
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

        {tab === "match" && <MatchTab />}

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
