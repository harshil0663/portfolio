"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import { heroList } from "@/data/heroes";
import { emblems } from "./HeroEmblem";
import { profile, socials } from "@/data/site";

const field =
  "w-full rounded-lg border border-fg/15 bg-fg/5 px-4 py-3 text-fg placeholder:text-fg/35 outline-none transition focus:border-accent focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent)_25%,transparent)]";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Demo only — wire this to an API route / email service later.
    setSent(true);
  };

  return (
    <section id="contact" className="zone px-4 py-24 sm:px-6">
      <div className="relative mx-auto max-w-5xl">
        <SectionTitle hero="spider" kicker="05 // Initiate protocol" title="Avengers, assemble!" />

        <ul className="mb-12 flex flex-wrap justify-center gap-6 sm:gap-10">
          {heroList.map((h, i) => {
            const Emblem = emblems[h.id];
            return (
              <motion.li
                key={h.id}
                data-hero={h.id}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: i * 0.12 }}
                className="flex w-28 flex-col items-center gap-2 text-center sm:w-32"
              >
                <div className="glass h-24 w-24 rounded-full p-3 transition hover:scale-110 hover:shadow-[0_0_30px_var(--accent)] sm:h-28 sm:w-28">
                  <Emblem />
                </div>
                <span className="font-mono text-xs uppercase tracking-wider text-accent">{h.name}</span>
              </motion.li>
            );
          })}
        </ul>

        <div className="grid gap-8 md:grid-cols-[1fr_1.2fr]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-fg/70">
              Got a world-saving idea, a product that needs superpowers, or just want to say hi? My comms channel is
              always open.
            </p>
            <a href={`mailto:${profile.email}`} className="block font-mono text-lg text-accent hover:underline">
              {profile.email}
            </a>
            <p className="font-mono text-sm text-fg/60">
              {profile.phone} · {profile.location}
            </p>
            <ul className="flex flex-wrap gap-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="glass inline-block rounded-full px-4 py-2 text-sm font-semibold text-fg transition hover:bg-accent hover:text-on-accent"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass space-y-4 rounded-2xl p-6"
          >
            {sent ? (
              <div className="py-10 text-center">
                <p className="comic-text text-5xl text-fg">Message received!</p>
                <p className="mt-3 text-fg/60">Thanks for reaching out — I&apos;ll reply faster than a speeding web.</p>
              </div>
            ) : (
              <>
                <label className="block">
                  <span className="sr-only">Name</span>
                  <input required name="name" placeholder="Your name" className={field} />
                </label>
                <label className="block">
                  <span className="sr-only">Email</span>
                  <input required type="email" name="email" placeholder="you@email.com" className={field} />
                </label>
                <label className="block">
                  <span className="sr-only">Message</span>
                  <textarea required name="message" rows={5} placeholder="Tell me about the mission…" className={field} />
                </label>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-accent px-6 py-3 font-bold text-on-accent shadow-[0_0_24px_var(--accent)] transition hover:-translate-y-0.5"
                >
                  Send transmission
                </button>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
