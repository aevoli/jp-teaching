"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "@/components/BackButton";
import Furigana from "@/components/Furigana";
import { speak } from "@/lib/audio";
import { jikoshoukaiInterests } from "@/lib/data/band-c";

export default function JikoshoukaiBuilderPage() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [interest, setInterest] = useState<number | null>(null);
  const [built, setBuilt] = useState(false);
  const [presenting, setPresenting] = useState(false);

  const canBuild = name.trim() !== "" && age !== "" && interest !== null;

  const buildIntro = () => {
    if (!canBuild) return;
    setBuilt(true);
  };

  const getIntroJP = () => {
    const interestJP = interest !== null ? jikoshoukaiInterests[interest].jp : "";
    return `はじめまして。わたしのなまえは${name}です。${age}さいです。${interestJP}がすきです。よろしくおねがいします。`;
  };

  const getIntroRomaji = () => {
    const interestRomaji = interest !== null ? jikoshoukaiInterests[interest].romaji : "";
    return `Hajimemashite. Watashi no namae wa ${name} desu. ${age} sai desu. ${interestRomaji} ga suki desu. Yoroshiku onegaishimasu.`;
  };

  const getIntroEN = () => {
    const interestEN = interest !== null ? jikoshoukaiInterests[interest].en : "";
    return `Nice to meet you. My name is ${name}. I am ${age} years old. I like ${interestEN}. Please be kind to me!`;
  };

  const speakIntro = () => {
    setPresenting(true);
    speak(getIntroJP());
    setTimeout(() => setPresenting(false), 5000);
  };

  const reset = () => {
    setName("");
    setAge("");
    setInterest(null);
    setBuilt(false);
    setPresenting(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6 pt-20">
      <BackButton />
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-gray-900">
            <Furigana text="じこしょうかい" reading="jikoshoukai" />
          </h1>
          <p className="text-2xl font-bold text-gray-600 mt-1">Self-Introduction Builder</p>
          <p className="text-gray-500 mt-2">Build your Japanese introduction and present to the class!</p>
        </div>

        {!built ? (
          <div className="bg-white rounded-3xl shadow-xl p-8 space-y-6">
            <div>
              <label className="block text-lg font-bold text-gray-700 mb-2">Your name (なまえ)</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Emma"
                className="w-full border-2 border-gray-200 rounded-2xl px-5 py-4 text-xl focus:border-emerald-400 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-lg font-bold text-gray-700 mb-2">Your age (なんさい？)</label>
              <div className="flex gap-3 flex-wrap">
                {[5, 6, 7, 8, 9, 10].map((a) => (
                  <button
                    key={a}
                    onClick={() => setAge(String(a))}
                    className={`w-16 h-16 rounded-2xl text-2xl font-black transition-all touch-manipulation border-2 ${
                      age === String(a)
                        ? "bg-emerald-500 text-white border-emerald-600"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:border-emerald-300"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-lg font-bold text-gray-700 mb-2">What do you like? (すきなこと)</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {jikoshoukaiInterests.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setInterest(i)}
                    className={`rounded-2xl p-3 text-center transition-all touch-manipulation border-2 ${
                      interest === i
                        ? "bg-emerald-500 text-white border-emerald-600"
                        : "bg-gray-50 hover:bg-emerald-50 border-gray-200 hover:border-emerald-300"
                    }`}
                  >
                    <p className="text-3xl">{item.emoji}</p>
                    <p className="text-sm font-bold mt-1">{item.en}</p>
                    <p className="text-xs opacity-70">{item.romaji}</p>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={buildIntro}
              disabled={!canBuild}
              className={`w-full py-5 rounded-3xl text-xl font-black transition-all touch-manipulation ${
                canBuild
                  ? "bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white shadow-xl"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              🎤 Build My Introduction!
            </button>
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-5"
            >
              <div className="bg-white rounded-3xl shadow-xl p-8 space-y-4">
                <div className="text-center mb-4">
                  <p className="text-2xl">
                    {interest !== null ? jikoshoukaiInterests[interest].emoji : ""}
                  </p>
                  <h2 className="text-2xl font-black text-gray-800">{name}さんの じこしょうかい</h2>
                </div>

                <div className="bg-emerald-50 rounded-2xl p-5">
                  <p className="text-sm font-bold text-emerald-700 mb-1">Japanese (日本語)</p>
                  <p className="text-2xl font-black text-gray-900 leading-relaxed">{getIntroJP()}</p>
                </div>

                <div className="bg-blue-50 rounded-2xl p-5">
                  <p className="text-sm font-bold text-blue-700 mb-1">Romaji (reading guide)</p>
                  <p className="text-lg font-bold text-gray-700 leading-relaxed italic">{getIntroRomaji()}</p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-5">
                  <p className="text-sm font-bold text-gray-500 mb-1">English meaning</p>
                  <p className="text-base text-gray-600 leading-relaxed">{getIntroEN()}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={speakIntro}
                  disabled={presenting}
                  className={`py-5 rounded-3xl text-xl font-black transition-all touch-manipulation shadow-xl ${
                    presenting
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white"
                  }`}
                >
                  {presenting ? "🔊 Speaking..." : "🔊 Hear It!"}
                </button>
                <button
                  onClick={reset}
                  className="py-5 rounded-3xl text-xl font-black bg-white hover:bg-gray-50 active:scale-95 text-gray-700 shadow-xl transition-all touch-manipulation border-2 border-gray-200"
                >
                  ← Try Again
                </button>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-5">
                <p className="font-black text-yellow-800 mb-2">🎤 Presentation Tips</p>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Bow before you start: <strong>おじぎ (ojigi)</strong></li>
                  <li>• Speak slowly and clearly</li>
                  <li>• Make eye contact with the class</li>
                  <li>• Bow again at the end!</li>
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </main>
  );
}
