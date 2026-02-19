import Link from "next/link";
import BackButton from "@/components/BackButton";

const activities = [
  {
    href: "/band-b/number-ninja",
    emoji: "🥷",
    title: "Number Ninja",
    titleJp: "かずゲーム",
    desc: "Race to find the right number — be the fastest ninja!",
    bg: "from-red-400 to-rose-600",
  },
  {
    href: "/band-b/body-parts-dance",
    emoji: "🕺",
    title: "Body Parts Dance",
    titleJp: "からだのうた",
    desc: "Head, shoulders, knees and toes — in Japanese!",
    bg: "from-blue-400 to-cyan-500",
  },
  {
    href: "/band-b/food-market",
    emoji: "🍣",
    title: "Food Market",
    titleJp: "おみせやさん",
    desc: "Run a Japanese food stall — buy and sell delicious food!",
    bg: "from-amber-400 to-orange-500",
  },
];

export default function BandBPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex flex-col items-center justify-center p-8">
      <BackButton />
      <div className="text-center mb-10">
        <div className="text-6xl mb-3">⭐</div>
        <h1 className="text-4xl font-black text-gray-900">Band B</h1>
        <p className="text-xl font-bold text-gray-600">Year 2 / Year 3 · Ages 6–8</p>
        <p className="text-lg text-gray-500 mt-2">Choose an activity — vote by raising your hand!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {activities.map((act) => (
          <Link key={act.href} href={act.href}>
            <div className={`bg-gradient-to-br ${act.bg} rounded-3xl p-8 text-white shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer touch-manipulation min-h-56 flex flex-col justify-between`}>
              <div className="text-6xl mb-3">{act.emoji}</div>
              <div>
                <h2 className="text-2xl font-black">{act.title}</h2>
                <p className="text-lg opacity-80 mb-3">{act.titleJp}</p>
                <p className="text-sm opacity-90 leading-relaxed">{act.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
