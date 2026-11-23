import type { SkillGroup } from "@/types";

/** Orbit rings for the Doctor Strange mandala — inner ring first. */
export const skillRings: string[][] = [
  ["React.js", "Node.js", "Express.js", "MongoDB"],
  ["JavaScript", "Next.js", "MySQL", "REST APIs", "JWT", "Stripe API"],
  ["Java", "Python", "C", "HTML5", "CSS3", "Git", "GitHub", "VS Code"],
];

export const skillGroups: SkillGroup[] = [
  { group: "Languages", items: ["JavaScript", "Java", "Python", "C", "HTML5", "CSS3"] },
  { group: "Frameworks", items: ["React.js", "Next.js", "Node.js", "Express.js"] },
  { group: "Databases", items: ["MongoDB", "MySQL"] },
  { group: "Tools & Platforms", items: ["Git", "GitHub", "Visual Studio Code", "REST APIs", "Stripe API"] },
  { group: "Methodologies", items: ["Agile", "MVC Architecture", "Authentication (JWT)", "Version Control"] },
];
