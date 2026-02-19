"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "@/components/BackButton";
import { speak } from "@/lib/audio";
import { hiragana, secretMessages } from "@/lib/data/band-c";

export default function HiraganaDecoderPage() {
  const [mode, setMode] = useState<"learn" | "decode">("learn");
  const [messageIdx, setMessageIdx] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const message = secretMessages[messageIdx];

  const toggleChar = (char: string) => {
    speak(char);
    setSelected((prev) => {
      if (prev.includes(char)) return prev.filter((c) => c !== char);
      const next = [...prev, char];
      const attempt = next.join("");
      const target = message.hiragana.join("");
      if (attempt === target) setSolved(true);
      return next;
    });
  };

  const nextMessage = () => {
    setMessageIdx((i) => (i + 1) % secretMessages.length);
    setSelected([]);
    setSolved(false);
    setShowHint(false);
  };

  const reset = () => {
    setSelected([]);
    setSolved(false);
    setShowHint(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-6 pt-20">
      <BackButton />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-black text-gray-900">ひらがなたんてい</h1>
          <p className="text-2xl font-bold text-gray-600 mt-1">Hiragana Detective</p>
          <p className="text-gray-500 mt-2">Learn the characters, then crack the secret code!</p>
        </div>

        <div className="flex gap-3 justify-center mb-6">
          <button
            onClick={() => setMode("learn")}
            className={`px-5 py-2 rounded-xl font-bold transition-all touch-manipulation ${mode === "learn" ? "bg-indigo-500 text-white" : "bg-gray-100 text-gray-600"}`}
          >
            📖 Learn Hiragana
          </button>
          <button
            onClick={() => setMode("decode")}
            className={`px-5 py-2 rounded-xl font-bold transition-all touch-manipulation ${mode === "decode" ? "bg-indigo-500 text-white" : "bg-gray-100 text-gray-600"}`}
          >
            🔍 Crack the Code
          </button>
        </div>

        {mode === "learn" ? (
          <div className="space-y-4">
            <p className="text-center text-gray-600">Tap each character to hear how it sounds!</p>
            <div className="grid grid-cols-5 gap-3">
              {hiragana.map((h, i) => (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => speak(h.char)}
                  className="bg-white rounded-2xl p-4 shadow-lg text-center hover:bg-indigo-50 active:scale-95 transition-all touch-manipulation border-2 border-transparent hover:border-indigo-300"
                >
                  <p className="text-4xl font-black text-gray-900">{h.char}</p>
                  <p className="text-lg font-bold text-indigo-600">{h.romaji}</p>
                </motion.button>
              ))}
            </div>
            <div className="bg-indigo-50 rounded-2xl p-5 mt-4">
              <h3 className="font-black text-indigo-800 text-lg mb-2">🔑 Quick Reference</h3>
              <div className="grid grid-cols-5 gap-2 text-center text-sm">
                {hiragana.map((h, i) => (
                  <div key={i} className="bg-white rounded-xl p-2">
                    <span className="text-2xl font-black">{h.char}</span>
                    <span className="text-indigo-600 font-bold block">{h.romaji}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
              <p className="text-gray-500 mb-2">Secret message #{messageIdx + 1} of {secretMessages.length}</p>
              <div className="flex justify-center gap-4 mb-4">
                {message.hiragana.map((char, i) => (
                  <div key={i} className="w-16 h-16 border-b-4 border-indigo-400 flex items-end justify-center pb-1">
                    <AnimatePresence>
                      {solved ? (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-3xl font-black text-indigo-600"
                        >
                          {char}
                        </motion.span>
                      ) : selected[i] ? (
                        <span className="text-3xl font-black text-gray-800">{selected[i]}</span>
                      ) : (
                        <span className="text-gray-300 text-2xl">？</span>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              <AnimatePresence>
                {solved && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="space-y-2"
                  >
                    <p className="text-5xl">🎉</p>
                    <p className="text-3xl font-black text-green-600">
                      {message.answer.toUpperCase()}!
                    </p>
                    <p className="text-xl text-gray-600">{message.hint}</p>
                    <button
                      onClick={nextMessage}
                      className="mt-3 bg-indigo-500 hover:bg-indigo-600 active:scale-95 text-white font-black px-8 py-3 rounded-2xl transition-all touch-manipulation"
                    >
                      Next Message →
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {!solved && showHint && (
                <p className="text-indigo-600 font-bold mt-2">Hint: {message.hint}</p>
              )}

              {!solved && (
                <div className="flex gap-3 justify-center mt-4">
                  <button
                    onClick={() => setShowHint(true)}
                    className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 font-bold px-4 py-2 rounded-xl transition-all touch-manipulation"
                  >
                    💡 Hint
                  </button>
                  <button
                    onClick={reset}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold px-4 py-2 rounded-xl transition-all touch-manipulation"
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-5">
              <p className="text-center text-gray-600 font-bold mb-3">Tap the hiragana characters in order:</p>
              <div className="grid grid-cols-5 gap-3">
                {hiragana.map((h, i) => (
                  <motion.button
                    key={i}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => !solved && toggleChar(h.char)}
                    disabled={solved}
                    className={`rounded-2xl p-3 text-center transition-all touch-manipulation border-2 ${
                      selected.includes(h.char)
                        ? "bg-indigo-500 text-white border-indigo-600"
                        : "bg-gray-50 hover:bg-indigo-50 border-transparent hover:border-indigo-300"
                    }`}
                  >
                    <p className="text-3xl font-black">{h.char}</p>
                    <p className="text-sm font-bold text-current opacity-70">{h.romaji}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
