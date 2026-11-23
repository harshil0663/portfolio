"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import SectionDecor from "@/components/ui/SectionDecor";
import { heroes } from "@/data/heroes";
import { projects } from "@/data/projects";
import { socials } from "@/data/site";
import type { Project } from "@/types";

const HammerScene = dynamic(() => import("@/components/three/HammerScene"), {
  ssr: false,
  loading: () => <div className="flex h-full items-center justify-center font-mono text-sm text-fg/40">Summoning Mjölnir…</div>,
});

function Card({ p, index }: { p: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [9, -9]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-9, 9]), { stiffness: 200, damping: 20 });
  const c = "var(--accent)"; // scoped to this card's hero via data-hero below

  return (
    <motion.article
      ref={ref}
      data-hero={p.hero}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1 }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900, ["--c" as string]: c }}
      className="glass group relative flex flex-col overflow-hidden rounded-2xl p-6 transition-shadow duration-300 hover:shadow-[0_0_40px_color-mix(in_srgb,var(--c)_50%,transparent)]"
    >
      <div
        className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-30 blur-2xl transition group-hover:opacity-70"
        style={{ background: c }}
      />
      <p className="font-mono text-xs uppercase tracking-widest" style={{ color: c }}>
        {heroes[p.hero].name} class · {p.codename}
      </p>
      <h3 className="comic-text mt-2 text-4xl text-fg">{p.title}</h3>
      <p className="mt-3 text-fg/65">{p.description}</p>
      <ul className="mt-4 flex-1 space-y-1.5 text-sm text-fg/60">
        {p.highlights.map((h) => (
          <li key={h} className="flex gap-2">
            <span style={{ color: c }}>▸</span>
            {h}
          </li>
        ))}
      </ul>
      <ul className="mt-5 flex flex-wrap gap-2">
        {p.stack.map((s) => (
          <li key={s} className="rounded-full border px-2.5 py-1 font-mono text-xs text-fg/80" style={{ borderColor: "color-mix(in srgb, var(--accent) 40%, transparent)" }}>
            {s}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex gap-5 text-sm font-semibold">
        <a href={p.live ?? p.repo ?? socials[0].href} className="transition hover:underline" style={{ color: c }}>
          {p.live ? "Live demo ↗" : "View on GitHub ↗"}
        </a>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" data-hero="thor" className="zone px-4 py-24 sm:px-6">
      <SectionDecor hero="thor" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 grid items-center gap-6 lg:grid-cols-[1fr_380px]">
          <SectionTitle hero="thor" kicker="03 // Asgardian forge" title="The arsenal" />
          <div data-nofx className="glass relative -mt-6 h-[300px] overflow-hidden rounded-3xl lg:mt-0">
            <HammerScene />
            <p className="pointer-events-none absolute inset-x-0 bottom-2 text-center font-mono text-xs text-fg/50">
              Whosoever holds this repo…
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 [&>*:last-child:nth-child(3n+1)]:lg:col-start-2">
          {projects.map((p, i) => (
            <Card key={p.title} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
