"use client";

import { motion } from "framer-motion";
import { heroes, type HeroId } from "@/data/heroes";

/** Section heading tagged with the hero that "owns" the zone (colours come from the parent's data-hero). */
export default function SectionTitle({ kicker, title, hero }: { kicker: string; title: string; hero: HeroId }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <p className="font-mono text-sm uppercase tracking-[0.3em] text-accent">
        {kicker} <span className="text-fg/40">·</span> {heroes[hero].name}
      </p>
      <h2 className="comic-text mt-2 text-5xl text-fg sm:text-6xl">{title}</h2>
    </motion.div>
  );
}
