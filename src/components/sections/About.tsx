"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { animate, motion, useInView } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import SectionDecor from "@/components/ui/SectionDecor";
import { profile, stats } from "@/data/site";

const ShieldScene = dynamic(() => import("@/components/three/ShieldScene"), {
  ssr: false,
  loading: () => <div className="flex h-full items-center justify-center font-mono text-sm text-fg/40">Forging vibranium…</div>,
});

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease: "easeOut", onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {v}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" data-hero="cap" className="zone px-4 py-24 sm:px-6">
      <SectionDecor hero="cap" />
      <div className="relative mx-auto max-w-7xl">
        <SectionTitle hero="cap" kicker="01 // Origin story" title="Who's behind the mask?" />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="space-y-5 text-lg text-fg/70"
          >
            {profile.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="font-mono text-sm text-accent">📍 {profile.location}</p>

            <div className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="glass rounded-xl p-4 text-center">
                  <div className="comic-text text-4xl text-fg">
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 text-xs text-fg/55">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="relative">
            <div data-nofx className="glass relative mx-auto h-[380px] w-full max-w-lg overflow-hidden rounded-3xl sm:h-[460px]">
              <div className="halftone absolute inset-0 opacity-20" />
              <ShieldScene />
              <p className="pointer-events-none absolute inset-x-0 bottom-3 text-center font-mono text-xs text-fg/50">
                Move your mouse · click to throw
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
