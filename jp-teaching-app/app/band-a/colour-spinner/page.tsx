"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "@/components/BackButton";
import Furigana from "@/components/Furigana";
import { speak } from "@/lib/audio";
import { colours } from "@/lib/data/band-a";

export default function ColourSpinnerPage() {
  const [spinning, setSpinning] = useState(false);
  const [current, setCurrent] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const spinCount = useRef(0);

  const segmentAngle = 360 / colours.length;

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    const extra = 1440 + Math.floor(Math.random() * 360);
    const newRotation = rotation + extra;
    setRotation(newRotation);

    setTimeout(() => {
      const normalised = ((newRotation % 360) + 360) % 360;
      const idx = Math.floor(((360 - normalised) % 360) / segmentAngle) % colours.length;
      setCurrent(idx);
      setSpinning(false);
      spinCount.current += 1;
      speak(colours[idx].jp);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50 p-6 pt-20">
      <BackButton />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-gray-900">
            <Furigana text="いろ" reading="iro" />
            <Furigana text="さがし" reading="sagashi" />
          </h1>
          <p className="text-2xl font-bold text-gray-600 mt-1">Colour Hunt</p>
          <p className="text-gray-500 mt-2">Spin the wheel — then find something that colour in the room!</p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12 justify-center">
          <div className="relative flex items-center justify-center">
            <motion.div
              animate={{ rotate: rotation }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="w-90 h-90 rounded-full relative overflow-hidden shadow-2xl border-8 border-white"
              style={{
                width: "22.5rem",
                height: "22.5rem",
                background: `conic-gradient(${colours
                  .map((c, i) => `${c.hex} ${i * segmentAngle}deg ${(i + 1) * segmentAngle}deg`)
                  .join(", ")})`,
              }}
            />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 text-5xl z-10">▼</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 bg-white rounded-full shadow-lg border-4 border-gray-200" />
            </div>
          </div>

          <div className="flex flex-col items-center gap-6">
            <button
              onClick={spin}
              disabled={spinning}
              className={`text-3xl font-black px-12 py-6 rounded-3xl shadow-xl transition-all touch-manipulation ${
                spinning
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-purple-500 hover:bg-purple-600 active:scale-95 text-white"
              }`}
            >
              {spinning ? "Spinning..." : "🎡 Spin!"}
            </button>

            <AnimatePresence mode="wait">
              {current !== null && !spinning && (
                <motion.div
                  key={current}
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }}
                  className="rounded-3xl p-8 text-center shadow-xl border-4 border-white min-w-56"
                  style={{
                    backgroundColor: colours[current].hex,
                    border: colours[current].en === "White" ? "3px solid #d1d5db" : undefined,
                  }}
                >
                  <p className={`text-5xl font-black drop-shadow-lg ${colours[current].en === "White" ? "text-gray-900" : "text-white"}`}>{colours[current].jp}</p>
                  <p className={`text-3xl font-bold drop-shadow ${colours[current].en === "White" ? "text-gray-700" : "text-white/90"}`}>{colours[current].romaji}</p>
                  <p className={`text-2xl drop-shadow ${colours[current].en === "White" ? "text-gray-600" : "text-white/80"}`}>{colours[current].en}</p>
                  <button
                    onClick={() => speak(colours[current!].jp)}
                    className={`mt-3 font-bold px-5 py-2 rounded-xl transition-all touch-manipulation ${colours[current].en === "White" ? "bg-gray-100 hover:bg-gray-200 text-gray-800" : "bg-white/30 hover:bg-white/50 text-white"}`}
                  >
                    🔊 Hear again
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-4 md:grid-cols-8 gap-4">
          {colours.map((c, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); speak(c.jp); }}
              className="rounded-2xl p-4 text-center shadow hover:scale-105 active:scale-95 transition-all touch-manipulation border-2 border-white"
              style={{ backgroundColor: c.hex, border: c.en === "White" ? "2px solid #d1d5db" : undefined }}
            >
              <p className={`text-base font-black drop-shadow ${c.en === "White" ? "text-gray-900" : "text-white"}`}>{c.jp}</p>
              <p className={`text-sm drop-shadow ${c.en === "White" ? "text-gray-600" : "text-white/90"}`}>{c.romaji}</p>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
