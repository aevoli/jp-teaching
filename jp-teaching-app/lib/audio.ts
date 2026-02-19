export function speak(text: string, lang = "ja-JP") {
  if (typeof window === "undefined") return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = lang;
  utt.rate = 0.85;
  utt.pitch = 1;
  const voices = synth.getVoices();
  const jpVoice = voices.find((v) => v.lang.startsWith("ja"));
  if (jpVoice) utt.voice = jpVoice;
  synth.speak(utt);
}

export function speakWithDelay(text: string, delayMs = 300, lang = "ja-JP") {
  setTimeout(() => speak(text, lang), delayMs);
}
