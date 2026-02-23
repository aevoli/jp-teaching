"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "@/components/BackButton";
import Furigana from "@/components/Furigana";
import { speak } from "@/lib/audio";
import { foods } from "@/lib/data/band-b";

type Mode = "menu" | "roleplay" | "ordering";

const roleplayPhrases = [
  { jp: "いらっしゃいませ", romaji: "Irasshaimase", en: "Welcome! (shopkeeper)", emoji: "🏪" },
  { jp: "なにがありますか", romaji: "Nani ga arimasu ka?", en: "What do you have?", emoji: "🤔" },
  { jp: "〇〇をください", romaji: "[food] wo kudasai", en: "[food] please!", emoji: "🙏" },
  { jp: "はい、どうぞ", romaji: "Hai, douzo", en: "Here you go!", emoji: "🤲" },
  { jp: "いくらですか", romaji: "Ikura desu ka?", en: "How much is it?", emoji: "💰" },
  { jp: "ありがとうございます", romaji: "Arigatou gozaimasu", en: "Thank you very much!", emoji: "🙇" },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildProblems() {
  return shuffle(foods).slice(0, 8).map((f) => ({ food: f, solved: false, wrong: false }));
}

function OrderingGame() {
  const [problems, setProblems] = useState(() => buildProblems());
  const [dragging, setDragging] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [allDone, setAllDone] = useState(false);

  const current = problems[currentIdx];

  const handleDrop = (foodJp: string) => {
    if (!dragging) return;
    if (dragging === foodJp) {
      speak(foodJp);
      const next = problems.map((p, i) => i === currentIdx ? { ...p, solved: true, wrong: false } : p);
      setProblems(next);
      setTimeout(() => {
        if (currentIdx + 1 >= problems.length) {
          setAllDone(true);
        } else {
          setCurrentIdx((i) => i + 1);
        }
      }, 900);
    } else {
      setProblems((ps) => ps.map((p, i) => i === currentIdx ? { ...p, wrong: true } : p));
      setTimeout(() => setProblems((ps) => ps.map((p, i) => i === currentIdx ? { ...p, wrong: false } : p)), 700);
    }
    setDragging(null);
  };

  const restart = () => {
    setProblems(buildProblems());
    setCurrentIdx(0);
    setAllDone(false);
    setDragging(null);
  };

  const foodOptions = shuffle(foods);

  if (allDone) {
    return (
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-green-100 rounded-3xl p-10 text-center space-y-4">
        <p className="text-6xl">🎉</p>
        <p className="text-3xl font-black text-green-700">すごい！ All orders delivered!</p>
        <button onClick={restart} className="bg-amber-500 hover:bg-amber-600 text-white font-black px-8 py-3 rounded-2xl transition-all touch-manipulation">
          Play again
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2 justify-center flex-wrap">
        {problems.map((p, i) => (
          <div key={i} className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-black ${
            p.solved ? "bg-green-500 border-green-600 text-white" : i === currentIdx ? "bg-amber-400 border-amber-500 text-white" : "bg-gray-100 border-gray-300 text-gray-400"
          }`}>{i + 1}</div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          className={`bg-white rounded-3xl shadow-xl p-8 flex flex-col md:flex-row items-center gap-6 border-4 transition-colors ${
            current.solved ? "border-green-400" : current.wrong ? "border-red-400" : "border-transparent"
          }`}
        >
          <div className="text-6xl">🧑</div>
          <div className="flex-1 text-center md:text-left space-y-1">
            <p className="text-gray-500 text-sm font-bold">Customer is ordering:</p>
            <p className="text-4xl font-black text-gray-900">{current.food.jp}</p>
            <p className="text-xl font-bold text-amber-600">{current.food.romaji}</p>
            <p className="text-gray-500">{current.food.en} — {current.food.desc}</p>
          </div>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(current.food.jp)}
            onClick={() => dragging && handleDrop(current.food.jp)}
            className={`w-28 h-28 rounded-3xl border-4 border-dashed flex items-center justify-center text-5xl transition-all ${
              current.solved
                ? "bg-green-100 border-green-400"
                : current.wrong
                ? "bg-red-100 border-red-400"
                : dragging
                ? "bg-amber-50 border-amber-400 scale-105"
                : "bg-gray-50 border-gray-300"
            }`}
          >
            {current.solved ? "✅" : current.wrong ? "❌" : "?"}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="bg-white rounded-3xl shadow-lg p-5">
        <p className="text-center text-gray-600 font-bold mb-4">Drag the correct food to the customer!</p>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {foodOptions.map((f, i) => (
            <motion.div
              key={i}
              draggable
              onDragStart={(e) => {
                setDragging(f.jp);
                const dragDiv = (e.target as HTMLElement).closest("div");
                if (dragDiv && e.dataTransfer) {
                  e.dataTransfer.effectAllowed = "move";
                  const img = new Image();
                  img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect fill='%23f59e0b' rx='15' width='80' height='80'/%3E%3Ctext x='40' y='45' font-size='40' text-anchor='middle' dominant-baseline='middle'%3E" + encodeURIComponent(f.emoji) + "%3C/text%3E%3C/svg%3E";
                  e.dataTransfer.setDragImage(img, 40, 40);
                }
              }}
              onDragEnd={() => setDragging(null)}
              onClick={() => setDragging(dragging === f.jp ? null : f.jp)}
              whileTap={{ scale: 0.9 }}
              className={`rounded-2xl p-3 text-center cursor-grab active:cursor-grabbing select-none shadow transition-all border-2 ${
                dragging === f.jp
                  ? "bg-amber-500 text-white border-amber-600 scale-105"
                  : "bg-amber-50 border-amber-200 hover:border-amber-400"
              }`}
            >
              <p className="text-3xl">{f.emoji}</p>
              <p className="text-xs font-bold text-gray-700 mt-1">{f.jp}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FoodMarketPage() {
  const [mode, setMode] = useState<Mode>("menu");
  const [basket, setBasket] = useState<number[]>([]);
  const [lastPhrase, setLastPhrase] = useState<string | null>(null);

  const order = (idx: number) => {
    const phrase = `${foods[idx].jp}をください`;
    setLastPhrase(`${foods[idx].jp} を ください！`);
    speak(phrase);
    setBasket((b) => [...b, idx]);
  };

  const clearBasket = () => {
    setBasket([]);
    setLastPhrase(null);
  };

  const speakPhrase = (jp: string) => {
    speak(jp);
    setLastPhrase(jp);
  };

  const tabClass = (m: Mode) =>
    `px-5 py-2 rounded-xl font-bold transition-all touch-manipulation ${mode === m ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-600"}`;

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 p-6 pt-20">
      <BackButton />
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-black text-gray-900">
            <Furigana text="おみせ" reading="omise" />
            <Furigana text="やさん" reading="yasan" />
          </h1>
          <p className="text-2xl font-bold text-gray-600 mt-1">Japanese Food Market</p>
          <p className="text-gray-500 mt-2">Learn to order food in Japanese!</p>
        </div>

        <div className="flex gap-3 justify-center mb-6 flex-wrap">
          <button onClick={() => setMode("menu")} className={tabClass("menu")}>🍱 Menu</button>
          <button onClick={() => setMode("roleplay")} className={tabClass("roleplay")}>🎭 Role Play Phrases</button>
          <button onClick={() => setMode("ordering")} className={tabClass("ordering")}>🎮 Ordering Game</button>
        </div>

        {mode === "menu" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
              {foods.map((food, i) => (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.93 }}
                  onClick={() => order(i)}
                  className="bg-white rounded-3xl p-5 shadow-lg text-center hover:bg-amber-50 active:scale-95 transition-all touch-manipulation border-2 border-transparent hover:border-amber-400"
                >
                  <p className="text-5xl mb-2">{food.emoji}</p>
                  <p className="text-2xl font-black text-gray-900">{food.jp}</p>
                  <p className="text-lg font-bold text-amber-600">{food.romaji}</p>
                  <p className="text-sm text-gray-500">{food.en}</p>
                  <p className="text-xs text-gray-400 italic">{food.desc}</p>
                  <p className="text-sm font-bold text-amber-700 mt-1">{food.price}</p>
                </motion.button>
              ))}
            </div>

            <AnimatePresence>
              {lastPhrase && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="md:col-span-2 bg-amber-500 rounded-3xl p-6 text-white text-center shadow-xl"
                >
                  <p className="text-sm opacity-80 mb-1">You said:</p>
                  <p className="text-4xl font-black">{lastPhrase}</p>
                  <p className="text-xl opacity-90 mt-1">… kudasai! (… please!)</p>
                </motion.div>
              )}
            </AnimatePresence>

            {basket.length > 0 && (
              <div className="md:col-span-2 bg-white rounded-3xl shadow-lg p-5">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-black text-gray-800">🛒 Your Order</h3>
                  <button onClick={clearBasket} className="text-sm text-red-500 font-bold touch-manipulation">Clear</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {basket.map((idx, i) => (
                    <span key={i} className="bg-amber-100 text-amber-800 font-bold px-3 py-1 rounded-xl text-lg">
                      {foods[idx].emoji} {foods[idx].jp}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {mode === "roleplay" && (
          <div className="space-y-4">
            <p className="text-center text-gray-600 mb-4">Tap a phrase to hear it — then practise with a partner!</p>
            {roleplayPhrases.map((phrase, i) => (
              <button
                key={i}
                onClick={() => speakPhrase(phrase.jp)}
                className="w-full bg-white rounded-2xl shadow-lg p-5 text-left hover:bg-amber-50 active:scale-98 transition-all touch-manipulation border-2 border-transparent hover:border-amber-300 flex items-center gap-4"
              >
                <span className="text-4xl">{phrase.emoji}</span>
                <div>
                  <p className="text-2xl font-black text-gray-900">{phrase.jp}</p>
                  <p className="text-lg font-bold text-amber-600">{phrase.romaji}</p>
                  <p className="text-gray-500">{phrase.en}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {mode === "ordering" && <OrderingGame />}
      </div>
    </main>
  );
}
