import Link from "next/link";

const bands = [
  {
    href: "/band-a",
    label: "Band A",
    years: "Reception / Year 1",
    ages: "Ages 5–6",
    emoji: "🌸",
    bg: "from-pink-400 to-rose-500",
    activities: ["Animal Sounds", "Colour Hunt", "Greetings Song"],
  },
  {
    href: "/band-b",
    label: "Band B",
    years: "Year 2 / Year 3",
    ages: "Ages 6–8",
    emoji: "⭐",
    bg: "from-amber-400 to-orange-500",
    activities: ["Number Ninja", "Body Parts Dance", "Food Market"],
  },
  {
    href: "/band-c",
    label: "Band C",
    years: "Year 4 / Year 5 / Year 6",
    ages: "Ages 8–10",
    emoji: "🎌",
    bg: "from-indigo-500 to-purple-600",
    activities: ["Hiragana Detective", "Self-Introduction", "Kanji Origins"],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 flex flex-col items-center justify-center p-8">
      <div className="text-center mb-12">
        <div className="text-7xl mb-4">🇯🇵</div>
        <h1 className="text-5xl font-black text-gray-900 mb-2">にほんご</h1>
        <p className="text-2xl font-bold text-gray-600">Japanese Lessons</p>
        <p className="text-lg text-gray-500 mt-2">Choose your class group to begin</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {bands.map((band) => (
          <Link key={band.href} href={band.href}>
            <div className={`bg-gradient-to-br ${band.bg} rounded-3xl p-8 text-white shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer touch-manipulation min-h-64 flex flex-col justify-between`}>
              <div>
                <div className="text-6xl mb-4">{band.emoji}</div>
                <h2 className="text-3xl font-black mb-1">{band.label}</h2>
                <p className="text-xl font-bold opacity-90">{band.years}</p>
                <p className="text-lg opacity-75">{band.ages}</p>
              </div>
              <div className="mt-6 space-y-1">
                {band.activities.map((a) => (
                  <div key={a} className="bg-white/20 rounded-xl px-3 py-1.5 text-sm font-semibold">
                    {a}
                  </div>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <p className="mt-12 text-gray-400 text-sm">Tap a band to see the 3 activity choices</p>
    </main>
  );
}
