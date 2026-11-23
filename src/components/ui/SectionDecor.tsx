"use client";

import { motion } from "framer-motion";
import type { HeroId } from "@/data/heroes";
import { starPath } from "@/components/sections/HeroEmblem";

const f = (n: number) => n.toFixed(2);

/** A quarter web anchored at the SVG's top-right corner. */
function webCorner() {
  const cx = 400;
  const cy = 0;
  const spokes = 6;
  const spokePaths: string[] = [];
  const ringPaths: string[] = [];
  const angle = (i: number) => Math.PI / 2 + (i * (Math.PI / 2)) / (spokes - 1);
  for (let i = 0; i < spokes; i++) {
    spokePaths.push(`M${cx} ${cy} L${f(cx + Math.cos(angle(i)) * 400)} ${f(cy + Math.sin(angle(i)) * 400)}`);
  }
  for (const r of [70, 140, 210, 290, 380]) {
    let d = "";
    for (let i = 0; i < spokes; i++) {
      const x = cx + Math.cos(angle(i)) * r;
      const y = cy + Math.sin(angle(i)) * r;
      if (i === 0) d += `M${f(x)} ${f(y)}`;
      else {
        const am = (angle(i) + angle(i - 1)) / 2;
        d += ` Q${f(cx + Math.cos(am) * r * 0.86)} ${f(cy + Math.sin(am) * r * 0.86)} ${f(x)} ${f(y)}`;
      }
    }
    ringPaths.push(d);
  }
  return [...spokePaths, ...ringPaths];
}
const web = webCorner();

const bolts = [
  "M20 0 L60 90 L30 100 L86 220 L52 232 L110 360",
  "M90 0 L70 60 L96 70 L60 150",
];

export default function SectionDecor({ hero }: { hero: HeroId }) {
  if (hero === "spider") {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0 text-fg">
        <svg viewBox="0 0 400 400" className="absolute right-0 top-0 w-56 opacity-25 sm:w-80" fill="none" stroke="currentColor" strokeWidth={1.4}>
          {web.map((d, i) => (
            <motion.path key={d} d={d} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: i * 0.05 }} />
          ))}
        </svg>
        <svg viewBox="0 0 400 400" className="absolute bottom-0 left-0 w-56 rotate-180 opacity-20 sm:w-72" fill="none" stroke="currentColor" strokeWidth={1.4}>
          {web.map((d) => (
            <path key={d} d={d} />
          ))}
        </svg>
      </div>
    );
  }

  if (hero === "cap") {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <svg viewBox="0 0 300 300" className="spin-slow absolute -left-24 top-24 w-72 opacity-[0.12]" fill="var(--accent)">
          <path d={starPath(150, 150, 140, 58)} />
        </svg>
        <svg viewBox="0 0 300 300" className="spin-rev absolute -right-16 bottom-10 w-56 opacity-[0.1]" fill="var(--accent2)">
          <path d={starPath(150, 150, 140, 58)} />
        </svg>
        <div className="absolute inset-x-0 top-0 flex h-2 flex-col">
          <span className="h-1 bg-accent2/70" />
          <span className="h-1 bg-accent/70" />
        </div>
      </div>
    );
  }

  if (hero === "strange") {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {[
          "-right-32 top-16 w-96",
          "-left-40 bottom-16 w-[28rem]",
        ].map((pos, i) => (
          <svg key={pos} viewBox="0 0 400 400" className={`absolute ${pos} opacity-20`} fill="none" stroke="var(--accent)" strokeWidth={2}>
            <g className={i ? "spin-rev" : "spin-slow"}>
              <circle cx="200" cy="200" r="190" strokeDasharray="6 10" />
              <circle cx="200" cy="200" r="150" />
              <rect x="95" y="95" width="210" height="210" />
              <rect x="95" y="95" width="210" height="210" transform="rotate(45 200 200)" />
            </g>
          </svg>
        ))}
      </div>
    );
  }

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {bolts.map((d, i) => (
        <motion.svg
          key={d}
          viewBox="0 0 120 380"
          className={`absolute top-0 h-72 ${i ? "right-6 hidden sm:block" : "left-4"}`}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={3}
          strokeLinejoin="round"
          style={{ filter: "drop-shadow(0 0 8px var(--accent))" }}
          animate={{ opacity: [0, 0.7, 0, 0, 0.5, 0, 0, 0] }}
          transition={{ duration: 3.4 + i, repeat: Infinity, delay: i * 1.2 }}
        >
          <path d={d} />
        </motion.svg>
      ))}
    </div>
  );
}
