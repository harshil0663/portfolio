# Harshil Patel — Developer Portfolio

A Marvel-themed developer portfolio built with **Next.js**, **Tailwind CSS**, **Framer Motion** and **Three.js** (react-three-fiber).

## Features

- **Dark / light theme** toggle (remembers your choice, respects system preference)
- **Four hero zones** — Spider-Man, Captain America, Doctor Strange and Thor each own a section with their own colours, art and animations
- **Click effects** that depend on the zone you click in: web-shot, shield throw, sling-ring portal, lightning strike
- **3D models** built procedurally with Three.js: Captain America's shield and Thor's Mjölnir
- Animated skills mandala, tilt-on-hover project cards, mission-log timeline and a contact form (demo)
- Fully responsive, with `prefers-reduced-motion` support

## Tech stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · Three.js / @react-three/fiber / drei

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> Don't run `npm run build` while `npm run dev` is running — they share the `.next` folder.

## Project structure

```
src/
├── app/            layout, page, global styles (theme tokens)
├── components/
│   ├── layout/     Navbar, Footer
│   ├── sections/   Hero, About, Skills, Projects, Missions, Contact
│   ├── three/      ShieldScene, HammerScene (3D)
│   └── ui/         SectionTitle, SectionDecor, ThemeToggle
├── data/           profile, skills, projects, hero config
├── lib/  types/
public/resume/      downloadable resume
```

Edit the content in `src/data/`.

## Disclaimer

Not affiliated with or endorsed by Marvel. Character names and themes are used for creative, non-commercial portfolio purposes.
