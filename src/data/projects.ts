import type { Project } from "@/types";

export const projects: Project[] = [
  {
    title: "Food Delivery App",
    codename: "Full-stack ordering platform",
    description:
      "A complete food ordering platform with separate customer and admin interfaces, covering the end-to-end order lifecycle. Includes secure register/login, a shopping cart, real-time order status tracking and Stripe payments.",
    highlights: [
      "Admin panel to manage menu items, view incoming orders and update statuses in real time",
      "Online payment processing via Stripe",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Stripe API"],
    hero: "spider",
  },
  {
    title: "Netflix Clone",
    codename: "Streaming platform",
    description:
      "A responsive streaming UI replicating core Netflix features: content browsing, user profiles and dynamic content rendering, backed by a RESTful API.",
    highlights: [
      "Node.js + Express backend for API requests and user data",
      "Movie/series content management via MongoDB",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB"],
    hero: "thor",
  },
  {
    title: "Online Billing Calculator",
    codename: "Command-line billing system",
    description:
      "A command-line billing system built with object-oriented principles and file handling to generate and store billing records.",
    highlights: ["Object-oriented design", "File handling for persistent billing records"],
    stack: ["Java"],
    hero: "cap",
  },
];
