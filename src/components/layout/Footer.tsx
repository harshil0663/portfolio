import { heroList } from "@/data/heroes";
import { profile } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-fg/10 px-4 py-10 text-center">
      <ul className="mb-5 flex flex-wrap justify-center gap-x-6 gap-y-2">
        {heroList.map((h) => (
          <li key={h.id} className="flex items-center gap-2 text-sm text-fg/70">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: h.color, boxShadow: `0 0 10px ${h.color}` }} />
            {h.name}
          </li>
        ))}
      </ul>
      <p className="comic-text text-2xl text-fg">Avengers, assemble.</p>
      <p className="mt-3 font-mono text-xs text-fg/50">
        © 2026 {profile.name} · Built with Next.js, Three.js &amp; Framer Motion · Not affiliated with Marvel
      </p>
    </footer>
  );
}
