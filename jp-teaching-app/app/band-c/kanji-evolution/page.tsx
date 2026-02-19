"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "@/components/BackButton";
import Furigana from "@/components/Furigana";
import { speak } from "@/lib/audio";
import { kanji } from "@/lib/data/band-c";

export default function KanjiEvolutionPage() {
  const [mode, setMode] = useState<"explore" | "quiz">("explore");
  const [selected, setSelected] = useState(0);
  const [showKanji, setShowKanji] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizOptions, setQuizOptions] = useState<number[]>([]);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCount, setQuizCount] = useState(0);

  const current = kanji[selected];

  const handleSelect = (idx: number) => {
    setSelected(idx);
    setShowKanji(false);
    speak(kanji[idx].character);
  };

  const revealKanji = () => {
    setShowKanji(true);
    speak(current.character);
  };

  const generateQuiz = (idx: number) => {
    const correct = idx % kanji.length;
    const others = kanji
      .map((_, i) => i)
      .filter((i) => i !== correct)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const opts = [...others, correct].sort(() => Math.random() - 0.5);
    setQuizIdx(correct);
    setQuizOptions(opts);
    setQuizAnswer(null);
  };

  const startQuiz = () => {
    setMode("quiz");
    setScore(0);
    setQuizCount(0);
    generateQuiz(0);
  };

  const handleQuizAnswer = (optIdx: number) => {
    if (quizAnswer !== null) return;
    setQuizAnswer(optIdx);
    speak(kanji[quizIdx].character);
    const correct = optIdx === quizIdx;
    if (correct) setScore((s) => s + 1);
    setQuizCount((c) => c + 1);
    setTimeout(() => generateQuiz(quizIdx + 1), 1800);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50 p-6 pt-20">
      <BackButton />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-black text-gray-900">
            <Furigana text="かんじ" reading="kanji" />
            <Furigana text="のひみつ" reading="no himitsu" />
          </h1>
          <p className="text-2xl font-bold text-gray-600 mt-1">Kanji Origins</p>
          <p className="text-gray-500 mt-2">Discover how Japanese writing evolved from ancient pictures!</p>
        </div>

        <div className="flex gap-3 justify-center mb-6">
          <button
            onClick={() => setMode("explore")}
            className={`px-5 py-2 rounded-xl font-bold transition-all touch-manipulation ${mode === "explore" ? "bg-purple-500 text-white" : "bg-gray-100 text-gray-600"}`}
          >
            🖌️ Explore
          </button>
          <button
            onClick={startQuiz}
            className={`px-5 py-2 rounded-xl font-bold transition-all touch-manipulation ${mode === "quiz" ? "bg-purple-500 text-white" : "bg-gray-100 text-gray-600"}`}
          >
            🧠 Quiz
          </button>
        </div>

        {mode === "explore" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-1 space-y-3 md:sticky md:top-4">
              <p className="font-bold text-gray-600 text-sm">Choose a kanji:</p>
              {kanji.map((k, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className={`w-full rounded-2xl p-4 text-left transition-all touch-manipulation border-2 flex items-center gap-4 ${
                    selected === i
                      ? "bg-purple-500 text-white border-purple-600"
                      : "bg-white hover:bg-purple-50 border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <span className="text-4xl font-black">{k.character}</span>
                  <div>
                    <p className="font-black">{k.meaning}</p>
                    <p className="text-sm opacity-70">{k.romaji}</p>
                  </div>
                  <span className="ml-auto text-2xl">{k.emoji}</span>
                </button>
              ))}
            </div>

            <div className="md:col-span-2 space-y-4">
              <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
                <p className="text-6xl mb-3">{current.emoji}</p>
                <h2 className="text-2xl font-black text-gray-800 mb-1">{current.meaning}</h2>
                <p className="text-gray-500 mb-6">{current.romaji}</p>

                <div className="bg-amber-50 rounded-2xl p-5 mb-6">
                  <p className="text-sm font-bold text-amber-700 mb-2">🏺 Ancient Pictograph</p>
                  <p className="text-lg text-amber-800">{current.pictograph}</p>
                  <p className="text-gray-600 text-sm mt-1">{current.description}</p>
                </div>

                <div className="flex items-center justify-center gap-8 mb-6">
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-1">Ancient picture</p>
                    <p className="text-5xl">{current.emoji}</p>
                  </div>
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-3xl text-purple-400"
                  >
                    →
                  </motion.div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-1">Modern kanji</p>
                    <AnimatePresence mode="wait">
                      {showKanji ? (
                        <motion.p
                          key="kanji"
                          initial={{ scale: 0, rotate: -10 }}
                          animate={{ scale: 1, rotate: 0 }}
                          className="text-7xl font-black text-purple-700"
                        >
                          {current.character}
                        </motion.p>
                      ) : (
                        <motion.button
                          key="reveal"
                          onClick={revealKanji}
                          className="w-20 h-20 bg-purple-100 hover:bg-purple-200 rounded-2xl flex items-center justify-center text-purple-500 font-black text-2xl transition-all touch-manipulation"
                        >
                          ？
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {showKanji && (
                  <button
                    onClick={() => speak(current.character)}
                    className="bg-purple-100 hover:bg-purple-200 text-purple-800 font-bold px-6 py-3 rounded-xl transition-all touch-manipulation"
                  >
                    🔊 Hear: {current.romaji}
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white rounded-2xl shadow p-4">
              <p className="font-bold text-gray-600">Question {quizCount + 1}</p>
              <p className="font-black text-purple-600 text-xl">Score: {score} / {quizCount}</p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-10 text-center">
              <p className="text-gray-500 mb-4">What does this kanji mean?</p>
              <motion.p
                key={quizIdx}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-9xl font-black text-purple-700 mb-8"
              >
                {kanji[quizIdx].character}
              </motion.p>

              <div className="grid grid-cols-2 gap-4">
                {quizOptions.map((optIdx, i) => {
                  let bg = "bg-gray-50 hover:bg-purple-50 border-gray-200 hover:border-purple-300";
                  if (quizAnswer !== null) {
                    if (optIdx === quizIdx) bg = "bg-green-100 border-green-500";
                    else if (i === quizOptions.indexOf(quizAnswer) && optIdx !== quizIdx)
                      bg = "bg-red-100 border-red-400";
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => handleQuizAnswer(optIdx)}
                      disabled={quizAnswer !== null}
                      className={`rounded-2xl p-5 text-center transition-all touch-manipulation border-2 ${bg}`}
                    >
                      <p className="text-3xl mb-1">{kanji[optIdx].emoji}</p>
                      <p className="text-xl font-black text-gray-800">{kanji[optIdx].meaning}</p>
                      <p className="text-sm text-gray-500">{kanji[optIdx].romaji}</p>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {quizAnswer !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 space-y-2"
                  >
                    <p className={`text-2xl font-black ${quizAnswer === quizIdx ? "text-green-600" : "text-red-500"}`}>
                      {quizAnswer === quizIdx ? "🎉 Correct!" : `❌ It was ${kanji[quizIdx].meaning} (${kanji[quizIdx].romaji})`}
                    </p>
                    <p className="text-3xl font-black text-purple-500">
                      {kanji[quizIdx].hiragana}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
