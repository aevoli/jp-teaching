"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="fixed top-4 left-4 z-50 flex items-center gap-1 px-4 py-3 rounded-2xl bg-white/80 backdrop-blur shadow-md text-gray-700 font-semibold hover:bg-white active:scale-95 transition-all touch-manipulation text-lg"
    >
      <ChevronLeft className="w-6 h-6" />
      Back
    </button>
  );
}
