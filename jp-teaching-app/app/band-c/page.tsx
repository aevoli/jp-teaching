import Link from "next/link";
import BackButton from "@/components/BackButton";

const activities = [
  {
    href: "/band-c/hiragana-decoder",
    emoji: "🔍",
    title: "Hiragana Detective",
    titleJp: "ひらがなたんてい",
    desc: "Crack the secret code written in real Japanese hiragana!",
    bg: "from-indigo-500 to-blue-600",
  },
  {
    href: "/band-c/jikoshoukai-builder",
    emoji: "🎤",
    title: "Self-Introduction",
    titleJp: "じこしょうかい",
    desc: "Introduce yourself in Japanese and present to the class!",
    bg: "from-emerald-500 to-teal-600",
  },
  {
    href: "/band-c/kanji-evolution",
    emoji: "🖌️",
    title: "Kanji Origins",
    titleJp: "かんじのひみつ",
    desc: "Discover how Japanese writing evolved from ancient pictures!",
    bg: "from-purple-500 to-violet-700",
  },
];

export default function BandCPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center justify-center p-8">
      <BackButton />
      <div className="text-center mb-10">
        <div className="text-6xl mb-3">🎌</div>
        <h1 className="text-4xl font-black text-gray-900">Band C</h1>
        <p className="text-xl font-bold text-gray-600">Year 4 / Year 5 / Year 6 · Ages 8–10</p>
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
