import type { Education, Mission } from "@/types";

export const profile = {
  name: "Harshil Patel",
  first: "HARSHIL",
  last: "PATEL",
  initials: "H.PATEL",
  roles: ["Software Developer", "Full-Stack Developer", "MERN Stack Builder", "API Architect"],
  location: "Ahmedabad, India",
  email: "harshilpatel0663@gmail.com",
  phone: "+91 78638 78137",
  resume: "/resume/Harshil_Patel_SoftwareDeveloper_Resume.pdf",
  summary:
    "Junior Software Developer building and maintaining full stack web applications with JavaScript, React.js, Node.js and MongoDB.",
  bio: [
    "I'm a Junior Software Developer with 1+ year of professional experience building and maintaining full stack web applications.",
    "I'm proficient in JavaScript, React.js, Node.js and MongoDB, with hands-on experience delivering RESTful APIs, responsive UIs and database-driven features in production.",
    "I'm passionate about writing clean, maintainable code and continuously improving software quality.",
  ],
};

export const stats = [
  { value: 1, suffix: "+", label: "Year of professional experience" },
  { value: 3, suffix: "", label: "Featured projects" },
  { value: 2, suffix: "", label: "Roles at NuWave" },
  { value: 4, suffix: "", label: "Core MERN technologies" },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/harshil0663" },
  { label: "LinkedIn", href: "https://linkedin.com/in/harshil0663" },
  { label: "Email", href: "mailto:harshilpatel0663@gmail.com" },
  { label: "Call", href: "tel:+917863878137" },
];

export const missions: Mission[] = [
  {
    role: "Junior Software Developer",
    company: "NuWave Communication",
    place: "Ahmedabad, India",
    period: "Nov 2025 — Present",
    codename: "Mission: Production",
    points: [
      "Develop and maintain full stack features using React.js, Node.js, Express.js and MongoDB in a production codebase used by real users.",
      "Build and integrate RESTful APIs for user management, data retrieval and third-party service connections.",
      "Collaborate in an Agile team: sprint planning, code reviews and daily standups.",
      "Diagnose and resolve bugs across the frontend and backend, improving stability and user experience.",
      "Write clean, reusable components and modular backend code following MVC architecture and team standards.",
    ],
  },
  {
    role: "Software Developer Intern",
    company: "NuWave Communication",
    place: "Ahmedabad, India",
    period: "May 2025 — Oct 2025",
    codename: "Mission: Origin Story",
    points: [
      "Assisted senior developers building React.js components and Node.js modules for internal and client-facing apps.",
      "Implemented JWT authentication flows for secure login and session management.",
      "Designed MongoDB schemas and wrote queries for efficient data storage and retrieval.",
      "Practised branch-based Git workflows and pull request reviews.",
    ],
  },
];

export const education: Education[] = [
  {
    degree: "Bachelor of Engineering – Computer Engineering",
    score: "CGPA: 7.24",
    school: "L. J. University",
    place: "Ahmedabad, India",
    year: "2025",
  },
  {
    degree: "Higher Secondary Certificate (HSC) – Science (PCM)",
    score: "76%",
    school: "P. P. Savani School",
    place: "Ankleshwar, India",
    year: "2021",
  },
  {
    degree: "Secondary School Certificate (SSC)",
    score: "80%",
    school: "SMT. P. D. Shroff Sankardeep Vidhyalaya",
    place: "India",
    year: "2019",
  },
];
