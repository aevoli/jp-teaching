"use client";
import { Volume2 } from "lucide-react";
import { speak } from "@/lib/audio";

interface AudioButtonProps {
  text: string;
  label?: string;
  className?: string;
}

export default function AudioButton({ text, label, className = "" }: AudioButtonProps) {
  return (
    <button
      onClick={() => speak(text)}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-100 hover:bg-blue-200 active:scale-95 transition-all touch-manipulation ${className}`}
      aria-label={`Hear pronunciation of ${label ?? text}`}
    >
      <Volume2 className="w-5 h-5 text-blue-600" />
      {label && <span className="text-blue-800 font-semibold">{label}</span>}
    </button>
  );
}
