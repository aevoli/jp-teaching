"use client";
import { motion } from "framer-motion";
import BackButton from "@/components/BackButton";
import Furigana from "@/components/Furigana";
import { speak } from "@/lib/audio";
import { katakana } from "@/lib/data/band-c";

export default function KatakanaExplorerPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 p-6 pt-20">
      <BackButton />
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-gray-900">
            <Furigana text="カタカナ" reading="katakana" />
            <span className="block">エクスプローラー</span>
          </h1>
          <p className="text-2xl font-bold text-gray-600 mt-2">Katakana Explorer</p>
          <p className="text-gray-500 mt-2">Tap each character to hear how it sounds!</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="grid grid-cols-7 gap-3">
            {katakana.map((k, i) => (
              <div key={i} className="flex flex-col gap-2">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => speak(k.char)}
                  className="bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl p-4 shadow-sm text-center hover:shadow-md hover:from-orange-200 active:scale-95 transition-all touch-manipulation border-2 border-transparent hover:border-orange-300"
                >
                  <p className="text-4xl font-black text-gray-900">{k.char}</p>
                  <p className="text-sm font-bold text-orange-600">{k.romaji}</p>
                </motion.button>
                {k.dakuten && (
                  <div className="flex gap-1">
                    {k.dakuten.map((d, idx) => (
                      <motion.button
                        key={idx}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => speak(d.char)}
                        className="flex-1 bg-gradient-to-br from-red-100 to-red-50 rounded-lg p-2 shadow-sm text-center hover:shadow-md hover:from-red-200 active:scale-95 transition-all touch-manipulation border-2 border-transparent hover:border-red-300"
                      >
                        <p className="text-xl font-black text-gray-900">{d.char}</p>
                        <p className="text-xs font-bold text-red-600">{d.romaji}</p>
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-6 text-center">
          <p className="text-gray-700 font-semibold">
            💡 Katakana is used for foreign words, brand names, and onomatopoeia!
          </p>
        </div>
      </div>
    </main>
  );
}
