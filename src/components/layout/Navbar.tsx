"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { profile } from "@/data/site";

const links = [
  { href: "#about", label: "Origin" },
  { href: "#skills", label: "Powers" },
  { href: "#projects", label: "Arsenal" },
  { href: "#missions", label: "Missions" },
  { href: "#contact", label: "Assemble" },
];

export default function Navbar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <header className="glass fixed inset-x-0 top-0 z-50 border-x-0 border-t-0">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#home" className="comic-text text-2xl text-fg">
          {profile.initials}
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm font-medium text-fg/70 transition hover:text-accent">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <ThemeToggle />
      </nav>
      {/* Scroll progress: spider red → cap blue → strange orange → thor cyan */}
      <motion.div
        style={{
          scaleX,
          background: "linear-gradient(90deg,#e62429,#2b6bff 40%,#ff9a1f 70%,#4cc9ff)",
        }}
        className="h-0.5 origin-left"
      />
    </header>
  );
}
