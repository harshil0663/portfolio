"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import SectionDecor from "@/components/ui/SectionDecor";
import { skillGroups, skillRings } from "@/data/skills";

const RADII = [105, 175, 245];
const DURS = ["40s", "60s", "80s"];

function Mandala() {
  return (
    <div className="mx-auto h-[342px] w-[342px] sm:h-[600px] sm:w-[600px]">
      <div className="orbit-wrap relative h-[600px] w-[600px] origin-top-left scale-[0.57] sm:scale-100">
        <svg viewBox="0 0 600 600" className="spin-slow absolute inset-0 opacity-70" fill="none" stroke="var(--accent)">
          <circle cx="300" cy="300" r="290" strokeDasharray="4 12" />
          {RADII.map((r) => (
            <circle key={r} cx="300" cy="300" r={r} strokeOpacity={0.5} />
          ))}
        </svg>
        <svg viewBox="0 0 600 600" className="spin-rev absolute inset-0 opacity-40" fill="none" stroke="var(--accent2)">
          <rect x="95" y="95" width="410" height="410" />
          <rect x="95" y="95" width="410" height="410" transform="rotate(45 300 300)" />
        </svg>

        <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent/20 text-center font-mono text-[11px] font-bold uppercase leading-4 text-accent shadow-[0_0_50px_var(--accent)]">
          Sling
          <br />
          Ring
        </div>

        {skillRings.map((ring, ri) => (
          <div
            key={ri}
            className={`orbit-ring absolute left-1/2 top-1/2 h-0 w-0 ${ri === 1 ? "rev" : ""}`}
            style={{ ["--dur" as string]: DURS[ri] }}
          >
            {ring.map((name, i) => {
              const angle = (360 / ring.length) * i;
              return (
                <div
                  key={name}
                  className="absolute left-0 top-0"
                  style={{ transform: `rotate(${angle}deg) translateX(${RADII[ri]}px) rotate(${-angle}deg)` }}
                >
                  <div className="orbit-item -translate-x-1/2 -translate-y-1/2">
                    <span className="glass block whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold text-fg shadow-[0_0_14px_color-mix(in_srgb,var(--accent)_45%,transparent)] transition hover:scale-125 hover:bg-accent hover:text-on-accent sm:text-sm">
                      {name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" data-hero="strange" className="zone px-4 py-24 sm:px-6">
      <SectionDecor hero="strange" />
      <div className="relative mx-auto max-w-7xl">
        <SectionTitle hero="strange" kicker="02 // Mystic arts" title="Powers & abilities" />
        <Mandala />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => (
            <motion.div
              key={g.group}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="comic-text mb-4 text-3xl text-fg">{g.group}</h3>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-xs text-fg/85 transition hover:bg-accent hover:text-on-accent"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
