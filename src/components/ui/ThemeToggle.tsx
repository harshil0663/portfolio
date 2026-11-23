"use client";

export default function ThemeToggle() {
  const toggle = () => {
    const el = document.documentElement;
    const next = el.dataset.theme === "light" ? "dark" : "light";
    el.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable — theme still switches for this visit */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark / light theme"
      title="Toggle dark / light theme"
      className="glass flex h-10 w-10 items-center justify-center rounded-full text-lg text-fg transition hover:scale-110 hover:shadow-[0_0_18px_var(--accent)]"
    >
      <span className="theme-moon" aria-hidden>
        ☾
      </span>
      <span className="theme-sun" aria-hidden>
        ☀
      </span>
    </button>
  );
}
