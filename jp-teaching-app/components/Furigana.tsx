interface FuriganaProps {
  text: string;
  reading: string;
  className?: string;
}

export default function Furigana({ text, reading, className = "" }: FuriganaProps) {
  return (
    <ruby className={className}>
      {text}
      <rp>(</rp>
      <rt className="text-xs font-normal tracking-wide">{reading}</rt>
      <rp>)</rp>
    </ruby>
  );
}
