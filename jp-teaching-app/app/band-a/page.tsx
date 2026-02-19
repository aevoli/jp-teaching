import Link from "next/link";
import BackButton from "@/components/BackButton";

const activities = [
  {
    href: "/band-a/animal-sounds",
    emoji: "🐕",
    title: "Animal Sounds",
    titleJp: "どうぶつのこえ",
    desc: "Learn animal names in Japanese and their funny sounds!",
    bg: "from-green-400 to-emerald-500",
  },
  {
    href: "/band-a/colour-spinner",
    emoji: "🎨",
    title: "Colour Hunt",
    titleJp: "いろさがし",
    desc: "Spin the wheel, learn colours, hunt around the room!",
    bg: "from-purple-400 to-violet-500",
  },
  {
    href: "/band-a/greetings-karaoke",
    emoji: "👋",
    title: "Greetings Song",
    titleJp: "あいさつのうた",
    desc: "Learn how to say hello, goodbye and thank you in Japanese!",
    bg: "from-pink-400 to-rose-500",
  },
];

export default function BandAPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 flex flex-col items-center justify-center p-8">
      <BackButton />
      <div className="text-center mb-10">
        <div className="text-6xl mb-3">🌸</div>
        <h1 className="text-4xl font-black text-gray-900">Band A</h1>
        <p className="text-xl font-bold text-gray-600">Reception / Year 1 · Ages 5–6</p>
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
