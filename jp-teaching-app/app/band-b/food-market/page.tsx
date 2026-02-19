"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "@/components/BackButton";
import { speak } from "@/lib/audio";
import { foods } from "@/lib/data/band-b";

export default function FoodMarketPage() {
  const [mode, setMode] = useState<"menu" | "roleplay">("menu");
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

  const speakPhrase = (jp: string, display: string) => {
    speak(jp);
    setLastPhrase(display);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 p-6 pt-20">
      <BackButton />
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-black text-gray-900">おみせやさん</h1>
          <p className="text-2xl font-bold text-gray-600 mt-1">Japanese Food Market</p>
          <p className="text-gray-500 mt-2">Learn to order food in Japanese!</p>
        </div>

        <div className="flex gap-3 justify-center mb-6">
          <button
            onClick={() => setMode("menu")}
            className={`px-5 py-2 rounded-xl font-bold transition-all touch-manipulation ${mode === "menu" ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-600"}`}
          >
            🍱 Menu
          </button>
          <button
            onClick={() => setMode("roleplay")}
            className={`px-5 py-2 rounded-xl font-bold transition-all touch-manipulation ${mode === "roleplay" ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-600"}`}
          >
            🎭 Role Play Phrases
          </button>
        </div>

        {mode === "menu" ? (
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
        ) : (
          <div className="space-y-4">
            <p className="text-center text-gray-600 mb-4">Tap a phrase to hear it — then practise with a partner!</p>
            {[
              { jp: "いらっしゃいませ", romaji: "Irasshaimase", en: "Welcome! (shopkeeper)", emoji: "🏪" },
              { jp: "なにがありますか", romaji: "Nani ga arimasu ka?", en: "What do you have?", emoji: "🤔" },
              { jp: "〇〇をください", romaji: "[food] wo kudasai", en: "[food] please!", emoji: "🙏" },
              { jp: "はい、どうぞ", romaji: "Hai, douzo", en: "Here you go!", emoji: "🤲" },
              { jp: "いくらですか", romaji: "Ikura desu ka?", en: "How much is it?", emoji: "💰" },
              { jp: "ありがとうございます", romaji: "Arigatou gozaimasu", en: "Thank you very much!", emoji: "🙇" },
            ].map((phrase, i) => (
              <button
                key={i}
                onClick={() => speakPhrase(phrase.jp, phrase.jp)}
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
      </div>
    </main>
  );
}
