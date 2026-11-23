"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionDecor from "@/components/ui/SectionDecor";
import { profile } from "@/data/site";
import { burstPolygon } from "@/lib/utils";
import HeroEmblem from "./HeroEmblem";

const burst = burstPolygon();

export default function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % profile.roles.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" data-hero="spider" className="zone flex min-h-screen items-center px-4 pb-16 pt-28 sm:px-6">
      <SectionDecor hero="spider" />
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-mono text-sm uppercase tracking-[0.35em] text-accent"
          >
            Hello world, I&apos;m
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="comic-text mt-3 text-7xl leading-[0.9] text-fg sm:text-8xl lg:text-9xl"
          >
            {profile.first}
            <br />
            {profile.last}
          </motion.h1>

          <div className="mt-6 h-9 overflow-hidden text-2xl font-semibold text-fg/90 sm:text-3xl">
            <AnimatePresence mode="wait">
              <motion.span
                key={i}
                className="block"
                initial={{ y: 36, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -36, opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                {profile.roles[i]}
                <span className="text-accent"> _</span>
              </motion.span>
            </AnimatePresence>
          </div>

          <p className="mt-5 max-w-xl text-lg text-fg/65">
            {profile.summary} Scroll down to meet the team — every section is guarded by a different Avenger.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="rounded-md bg-accent px-7 py-3 font-bold text-on-accent shadow-[0_0_24px_var(--accent)] transition hover:-translate-y-0.5 hover:shadow-[0_0_40px_var(--accent)]"
            >
              View my arsenal
            </a>
            <a
              href={profile.resume}
              download
              className="rounded-md border border-accent px-7 py-3 font-bold text-fg transition hover:bg-accent/15"
            >
              Download resume
            </a>
          </div>

          <p className="mt-8 font-mono text-xs text-fg/50">
            <span className="text-accent">▸ Try it:</span> click anywhere — each zone fires its hero&apos;s weapon
            (web · shield · portal · lightning)
          </p>
        </div>

        <div className="relative">
          <HeroEmblem />
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: -10 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 160 }}
            className="absolute -right-2 -top-4 flex h-32 w-32 items-center justify-center bg-[#ffd23f] text-center sm:right-2 sm:h-36 sm:w-36"
            style={{ clipPath: burst }}
          >
            <span className="font-display text-xl leading-5 text-black" style={{ fontFamily: "var(--font-bangers)" }}>
              OPEN TO
              <br />
              WORK!
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
