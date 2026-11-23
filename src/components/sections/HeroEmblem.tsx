"use client";

import { motion } from "framer-motion";
import type { HeroId } from "@/data/heroes";

const f = (n: number) => n.toFixed(2);

/* ---------- Spider-Man: a web that draws itself ---------- */
export function SpiderWeb() {
  const spokes = 12;
  const radii = [28, 58, 92, 130, 175];
  const lines = Array.from({ length: spokes }, (_, i) => {
    const a = (i * Math.PI * 2) / spokes;
    return `M200 200 L${f(200 + Math.cos(a) * 190)} ${f(200 + Math.sin(a) * 190)}`;
  });
  const rings = radii.map((r) => {
    let d = "";
    for (let i = 0; i <= spokes; i++) {
      const a = (i * Math.PI * 2) / spokes;
      const am = a - Math.PI / spokes;
      const x = 200 + Math.cos(a) * r;
      const y = 200 + Math.sin(a) * r;
      d += i === 0 ? `M${f(x)} ${f(y)}` : ` Q${f(200 + Math.cos(am) * r * 0.9)} ${f(200 + Math.sin(am) * r * 0.9)} ${f(x)} ${f(y)}`;
    }
    return d;
  });
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full text-fg" fill="none" stroke="currentColor" strokeLinecap="round">
      <g style={{ filter: "drop-shadow(0 0 6px #2d5bff)" }} opacity={0.9}>
        {lines.map((d, i) => (
          <motion.path key={d} d={d} strokeWidth={1.6} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: i * 0.04 }} />
        ))}
        {rings.map((d, i) => (
          <motion.path key={d} d={d} strokeWidth={1.4} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 + i * 0.12 }} />
        ))}
      </g>
      <g className="pulse-glow" stroke="var(--accent)" fill="var(--accent)" strokeWidth={4}>
        <ellipse cx="200" cy="208" rx="12" ry="18" />
        <circle cx="200" cy="182" r="8" />
        {[1, -1].map((s) => (
          <g key={s} transform={`translate(200 0) scale(${s} 1) translate(-200 0)`} fill="none">
            <path d="M210 196 L240 170 L258 180" />
            <path d="M212 206 L248 204 L262 222" />
            <path d="M212 214 L240 238 L248 262" />
            <path d="M210 222 L228 256 L224 276" />
          </g>
        ))}
      </g>
    </svg>
  );
}

/* ---------- Captain America: the shield ---------- */
export function starPath(cx: number, cy: number, R: number, r: number) {
  let d = "";
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rad = i % 2 ? r : R;
    d += `${i ? "L" : "M"}${f(cx + Math.cos(a) * rad)} ${f(cy + Math.sin(a) * rad)} `;
  }
  return d + "Z";
}
export function Shield() {
  return (
    <motion.svg
      viewBox="0 0 300 300"
      className="h-full w-full"
      animate={{ rotateY: [-24, 24, -24], y: [0, -12, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      style={{ transformPerspective: 900, filter: "drop-shadow(0 20px 40px rgba(43,107,255,.45))" }}
    >
      <circle cx="150" cy="150" r="142" fill="#c1121f" />
      <circle cx="150" cy="150" r="114" fill="#f1f1f1" />
      <circle cx="150" cy="150" r="86" fill="#c1121f" />
      <circle cx="150" cy="150" r="58" fill="#1d3fa8" />
      <path d={starPath(150, 150, 54, 22)} fill="#f1f1f1" />
      <circle cx="150" cy="150" r="142" fill="none" stroke="#fff" strokeOpacity={0.35} strokeWidth={3} />
      <path d="M50 70 A130 130 0 0 1 150 20" stroke="#fff" strokeOpacity={0.5} strokeWidth={6} strokeLinecap="round" fill="none" />
    </motion.svg>
  );
}

/* ---------- Doctor Strange: Sling Ring mandala ---------- */
export function Mandala() {
  const ticks = Array.from({ length: 48 }, (_, i) => {
    const a = (i * Math.PI * 2) / 48;
    const r1 = 168;
    const r2 = i % 4 === 0 ? 150 : 158;
    return `M${f(200 + Math.cos(a) * r1)} ${f(200 + Math.sin(a) * r1)} L${f(200 + Math.cos(a) * r2)} ${f(200 + Math.sin(a) * r2)}`;
  });
  return (
    <svg viewBox="0 0 400 400" className="pulse-glow h-full w-full" fill="none" stroke="var(--accent)" strokeWidth={2}>
      <g className="spin-slow">
        <circle cx="200" cy="200" r="190" strokeDasharray="6 10" />
        <circle cx="200" cy="200" r="170" />
        {ticks.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g className="spin-rev">
        <circle cx="200" cy="200" r="138" strokeDasharray="22 8" />
        <rect x="110" y="110" width="180" height="180" />
        <rect x="110" y="110" width="180" height="180" transform="rotate(45 200 200)" />
      </g>
      <g className="spin-medium" stroke="var(--accent2)">
        <path d="M200 90 L295 255 L105 255 Z" />
        <path d="M200 310 L105 145 L295 145 Z" />
        <circle cx="200" cy="200" r="60" />
      </g>
      <circle cx="200" cy="200" r="26" fill="var(--accent)" fillOpacity={0.25} />
      <circle cx="200" cy="200" r="8" fill="var(--accent2)" />
    </svg>
  );
}

/* ---------- Thor: Mjölnir with crackling lightning ---------- */
const bolts = [
  "M60 60 L100 110 L82 118 L128 176",
  "M340 70 L300 118 L318 126 L274 182",
  "M30 250 L84 232 L78 252 L140 236",
  "M370 260 L316 240 L322 262 L262 244",
];
export function Mjolnir() {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" fill="none">
      <defs>
        <linearGradient id="mj-head" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c7ced8" />
          <stop offset="0.5" stopColor="#8892a0" />
          <stop offset="1" stopColor="#4d5563" />
        </linearGradient>
        <filter id="mj-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {bolts.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="var(--accent)"
          strokeWidth={4}
          strokeLinejoin="round"
          filter="url(#mj-glow)"
          animate={{ opacity: [0, 1, 0, 0, 1, 0, 0] }}
          transition={{ duration: 1.6 + i * 0.35, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}
      <motion.g
        style={{ transformOrigin: "200px 200px" }}
        animate={{ rotate: [-28, -22, -28] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        filter="drop-shadow(0 0 22px var(--accent))"
      >
        <rect x="188" y="206" width="24" height="150" rx="6" fill="#4a3322" />
        {Array.from({ length: 8 }, (_, i) => (
          <line key={i} x1="188" x2="212" y1={230 + i * 14} y2={238 + i * 14} stroke="#241810" strokeWidth={4} />
        ))}
        <circle cx="200" cy="366" r="11" stroke="#8892a0" strokeWidth={5} />
        <rect x="105" y="118" width="190" height="96" rx="12" fill="url(#mj-head)" />
        <rect x="105" y="118" width="26" height="96" rx="8" fill="#5b6370" />
        <rect x="269" y="118" width="26" height="96" rx="8" fill="#5b6370" />
        <rect x="146" y="138" width="108" height="56" rx="6" stroke="#4d5563" strokeWidth={3} />
        <path d="M168 166 H232 M200 146 V186" stroke="#4d5563" strokeWidth={3} />
      </motion.g>
    </svg>
  );
}

export const emblems: Record<HeroId, () => React.JSX.Element> = {
  spider: SpiderWeb,
  cap: Shield,
  strange: Mandala,
  thor: Mjolnir,
};

/** Home-page hero art: Spider-Man's web at the centre, the other three Avengers orbiting it. */
const minis: { id: HeroId; pos: string; delay: string }[] = [
  { id: "cap", pos: "-left-2 top-2 sm:-left-8", delay: "0s" },
  { id: "strange", pos: "-left-2 bottom-2 sm:-left-8", delay: "1.3s" },
  { id: "thor", pos: "-right-2 bottom-2 sm:-right-8", delay: "2.6s" },
];

export default function HeroEmblem() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]">
      <div className="absolute inset-6 rounded-full bg-accent/20 blur-3xl" />
      <motion.div
        className="relative h-full w-full"
        initial={{ opacity: 0, scale: 0.7, rotate: -12 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.6 }}
      >
        <SpiderWeb />
      </motion.div>
      {minis.map((m) => {
        const Emblem = emblems[m.id];
        return (
          <div
            key={m.id}
            data-hero={m.id}
            className={`bob glass absolute ${m.pos} h-24 w-24 rounded-full p-3 sm:h-28 sm:w-28`}
            style={{ animationDelay: m.delay }}
          >
            <Emblem />
          </div>
        );
      })}
    </div>
  );
}
