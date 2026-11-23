"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import SectionDecor from "@/components/ui/SectionDecor";
import { education, missions } from "@/data/site";

export default function Missions() {
  return (
    <section id="missions" data-hero="spider" className="zone px-4 py-24 sm:px-6">
      <SectionDecor hero="spider" />
      <div className="relative mx-auto max-w-5xl">
        <SectionTitle hero="spider" kicker="04 // Field record" title="Mission log" />

        <div className="relative border-l-2 border-accent/40 pl-8">
          {missions.map((m, i) => (
            <motion.div
              key={m.codename}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="relative mb-10 last:mb-0"
            >
              <span className="absolute -left-[41px] top-2 h-4 w-4 rounded-full border-2 border-bg bg-accent shadow-[0_0_16px_var(--accent)]" />
              <div className="glass rounded-2xl p-6">
                <p className="font-mono text-xs uppercase tracking-widest text-accent">
                  {m.codename} · {m.period}
                </p>
                <h3 className="mt-1 text-2xl font-bold text-fg">{m.role}</h3>
                <p className="text-fg/60">
                  {m.company} · {m.place}
                </p>
                <ul className="mt-4 space-y-2 text-fg/70">
                  {m.points.map((pt) => (
                    <li key={pt} className="flex gap-2">
                      <span className="text-accent">▸</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <h3 className="comic-text mb-6 mt-20 text-4xl text-fg">Training academy</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {education.map((e, i) => (
            <motion.div
              key={e.degree}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-5"
            >
              <p className="font-mono text-xs uppercase tracking-widest text-accent">
                {e.year} · {e.score}
              </p>
              <h4 className="mt-2 font-bold text-fg">{e.degree}</h4>
              <p className="mt-1 text-sm text-fg/60">
                {e.school} · {e.place}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
