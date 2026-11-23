export type HeroId = "spider" | "cap" | "strange" | "thor";

export interface Hero {
  id: HeroId;
  name: string;
  short: string;
  weapon: string;
  color: string;
  color2: string;
  tagline: string;
  clickHint: string;
}

export const heroes: Record<HeroId, Hero> = {
  spider: {
    id: "spider",
    name: "Spider-Man",
    short: "SP",
    weapon: "Web-Shooters",
    color: "#e62429",
    color2: "#2d5bff",
    tagline: "With great power comes great responsibility — and clean commits.",
    clickHint: "Click anywhere to shoot a web",
  },
  cap: {
    id: "cap",
    name: "Captain America",
    short: "CA",
    weapon: "Vibranium Shield",
    color: "#2b6bff",
    color2: "#e62429",
    tagline: "I can do this all day — and ship it before the deadline.",
    clickHint: "Click anywhere to throw the shield",
  },
  strange: {
    id: "strange",
    name: "Doctor Strange",
    short: "DS",
    weapon: "Sling Ring",
    color: "#ff9a1f",
    color2: "#ffd166",
    tagline: "I've looked at 14,000,605 possible bugs. Only one ships.",
    clickHint: "Click anywhere to open a portal",
  },
  thor: {
    id: "thor",
    name: "Thor",
    short: "TH",
    weapon: "Mjölnir",
    color: "#4cc9ff",
    color2: "#ffd23f",
    tagline: "Bring me more tickets. I am worthy.",
    clickHint: "Click anywhere to call the lightning",
  },
};

export const heroList: Hero[] = Object.values(heroes);
