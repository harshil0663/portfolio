import type { HeroId } from "@/data/heroes";

export interface Project {
  title: string;
  codename: string;
  description: string;
  highlights: string[];
  stack: string[];
  hero: HeroId;
  live?: string;
  repo?: string;
}

export interface SkillGroup {
  group: string;
  items: string[];
}

export interface Mission {
  role: string;
  company: string;
  place: string;
  period: string;
  codename: string;
  points: string[];
}

export interface Education {
  degree: string;
  score: string;
  school: string;
  place: string;
  year: string;
}
