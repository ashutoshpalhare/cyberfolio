export const profile = {
  name: "ASHUTOSH PALHARE",
  handle: "@ashutoshpalhare",
  roles: [
    "Software Developer",
    "AI Enthusiast",
    "Full Stack Engineer",
    "Problem Solver",
  ],
  location: "Maharashtra, India",
  education: "B.E. Computer Engineering — SPPU",
  status: "Online / Available for Missions",
  passion: "Building interfaces that feel alive",
  mission: "Turn ambitious ideas into shipped, delightful software",
  bio: "Versatile IT professional passionate about innovative solutions. Extensive experience in web development, app development, cybersecurity, web design, and graphic editing. Jack-of-all-trades who thrives on challenges.",
  email: "ashutoshpalhare@gmail.com",
  github: "https://github.com/ashutoshpalhare",
  portfolio: "https://ashutoshpalhare.github.io",
  resume: "https://ashutoshpalhare.github.io",
};

export const timeline = [
  {
    year: "2021 — Present",
    title: "B.E. in Computer Engineering",
    org: "Vishwabharati College of Engineering, SPPU",
    kind: "education",
    desc: "Bachelor's in Computer Engineering. Ahamednagar.",
  },
  {
    year: "Mar 2021 — May 2021",
    title: "Web Developer",
    org: "StudioVity",
    kind: "experience",
    desc: "Developed a non-profit NGO website using WordPress. Built custom mobile-friendly WP templates and themes; collaborated with clients on structure and features.",
  },
  {
    year: "Jan 2021 — Mar 2021",
    title: "Application Developer",
    org: "AKJ Digital",
    kind: "experience",
    desc: "Built an E-Commerce app using Flutter + WooCommerce web API. Handled data sync, code reviews on GitHub, and debug/performance analysis.",
  },
  {
    year: "2019 — 2021",
    title: "Diploma in Computer Engineering",
    org: "Dnyaneshwar Polytechnic College, MSBTE",
    kind: "education",
    desc: "Bhanashivara. Foundation in computer engineering.",
  },
  {
    year: "2019",
    title: "Higher Secondary Certificate",
    org: "Trimurti Junior College, SPPU",
    kind: "education",
    desc: "Newasafata.",
  },
];

export const experiences = timeline.filter((t) => t.kind === "experience").map((t, i) => ({
  ...t,
  code: `MSN-${String(i + 1).padStart(3, "0")}`,
  status: i === 0 ? "COMPLETED" : "COMPLETED",
  responsibilities: t.desc.split(". ").filter(Boolean),
}));

export const projects = [
  {
    name: "Finance",
    tag: "Web development",
    desc: "Sleek finance dashboard with real-time analytics, portfolio breakdowns, and responsive UI.",
    stack: ["React", "Tailwind", "REST API"],
    img: "https://ashutoshpalhare.github.io/assets/images/project-1.jpg",
    github: "https://github.com/ashutoshpalhare",
    demo: "https://ashutoshpalhare.github.io",
  },
  {
    name: "Orizon",
    tag: "Web development",
    desc: "Marketing site with smooth motion, editorial layout, and pixel-tight typography.",
    stack: ["Next.js", "GSAP", "Tailwind"],
    img: "https://ashutoshpalhare.github.io/assets/images/project-2.png",
    github: "https://github.com/ashutoshpalhare",
    demo: "https://ashutoshpalhare.github.io",
  },
  {
    name: "Fundo",
    tag: "Web design",
    desc: "Product landing experience — bold hero, kinetic type, immersive scroll.",
    stack: ["Figma", "React", "Motion"],
    img: "https://ashutoshpalhare.github.io/assets/images/project-3.jpg",
    github: "https://github.com/ashutoshpalhare",
    demo: "https://ashutoshpalhare.github.io",
  },
  {
    name: "Brawlhalla",
    tag: "Applications",
    desc: "Gaming companion app with match lookup, stats, and player insights.",
    stack: ["Flutter", "Dart", "REST"],
    img: "https://ashutoshpalhare.github.io/assets/images/project-4.png",
    github: "https://github.com/ashutoshpalhare",
    demo: "https://ashutoshpalhare.github.io",
  },
  {
    name: "DSM.",
    tag: "Web design",
    desc: "Design system marketing surface with cohesive tokens and interactive components.",
    stack: ["React", "Storybook", "TS"],
    img: "https://ashutoshpalhare.github.io/assets/images/project-5.png",
    github: "https://github.com/ashutoshpalhare",
    demo: "https://ashutoshpalhare.github.io",
  },
  {
    name: "MetaSpark",
    tag: "Web design",
    desc: "Futuristic agency site with 3D accents and cinematic transitions.",
    stack: ["React", "Three.js", "GSAP"],
    img: "https://ashutoshpalhare.github.io/assets/images/project-6.png",
    github: "https://github.com/ashutoshpalhare",
    demo: "https://ashutoshpalhare.github.io",
  },
  {
    name: "Summary",
    tag: "Web development",
    desc: "AI-powered summarizer for long-form articles and documents.",
    stack: ["React", "OpenAI", "Node"],
    img: "https://ashutoshpalhare.github.io/assets/images/project-7.png",
    github: "https://github.com/ashutoshpalhare",
    demo: "https://ashutoshpalhare.github.io",
  },
  {
    name: "Task Manager",
    tag: "Applications",
    desc: "Cross-platform tasks app with offline sync and reminders.",
    stack: ["Flutter", "Firebase"],
    img: "https://ashutoshpalhare.github.io/assets/images/project-8.jpg",
    github: "https://github.com/ashutoshpalhare",
    demo: "https://ashutoshpalhare.github.io",
  },
  {
    name: "Arrival",
    tag: "Web development",
    desc: "Cinematic hero-first product site with parallax storytelling.",
    stack: ["React", "Motion", "Tailwind"],
    img: "https://ashutoshpalhare.github.io/assets/images/project-9.png",
    github: "https://github.com/ashutoshpalhare",
    demo: "https://ashutoshpalhare.github.io",
  },
];

export const skillGroups = [
  {
    group: "Frontend",
    color: "cyan",
    skills: [
      { name: "React", xp: "3+ yrs" },
      { name: "Next.js", xp: "2+ yrs" },
      { name: "TypeScript", xp: "2+ yrs" },
      { name: "Tailwind", xp: "3+ yrs" },
      { name: "Framer Motion", xp: "1+ yr" },
    ],
  },
  {
    group: "Backend",
    color: "electric",
    skills: [
      { name: "Node.js", xp: "2+ yrs" },
      { name: "Express", xp: "2+ yrs" },
      { name: "PHP", xp: "1+ yr" },
      { name: "REST APIs", xp: "3+ yrs" },
    ],
  },
  {
    group: "AI",
    color: "neon-purple",
    skills: [
      { name: "Prompt Engineering", xp: "1+ yr" },
      { name: "OpenAI API", xp: "1+ yr" },
      { name: "LangChain", xp: "explorer" },
    ],
  },
  {
    group: "Database",
    color: "neon-pink",
    skills: [
      { name: "MongoDB", xp: "2+ yrs" },
      { name: "MySQL", xp: "2+ yrs" },
      { name: "Firebase", xp: "1+ yr" },
    ],
  },
  {
    group: "Cloud",
    color: "cyan",
    skills: [
      { name: "Vercel", xp: "2+ yrs" },
      { name: "AWS", xp: "explorer" },
      { name: "Netlify", xp: "2+ yrs" },
    ],
  },
  {
    group: "Tools",
    color: "electric",
    skills: [
      { name: "Git", xp: "3+ yrs" },
      { name: "Figma", xp: "3+ yrs" },
      { name: "VS Code", xp: "4+ yrs" },
      { name: "Photoshop", xp: "3+ yrs" },
    ],
  },
];

export const achievements = [
  {
    title: "Freelance Full-Stack Missions",
    desc: "Shipped multiple client projects across web, mobile, and design.",
  },
  {
    title: "Cybersecurity Practitioner",
    desc: "Conducted audits and hardened digital assets for clients.",
  },
  {
    title: "Cross-Platform Apps",
    desc: "Built Flutter apps with WooCommerce integration and offline sync.",
  },
  {
    title: "Design + Engineering",
    desc: "Bridges premium visual design with production engineering.",
  },
];

export const github = {
  repos: 42,
  stars: 128,
  followers: 56,
  languages: [
    { name: "TypeScript", pct: 32 },
    { name: "JavaScript", pct: 28 },
    { name: "Dart", pct: 14 },
    { name: "PHP", pct: 12 },
    { name: "CSS", pct: 14 },
  ],
  contributions: Array.from({ length: 7 * 20 }, (_, i) =>
    Math.floor(Math.abs(Math.sin(i * 0.7) + Math.cos(i * 0.3)) * 4),
  ),
  activity: [
    { repo: "neural-portfolio", msg: "feat: holographic HUD boot sequence", when: "2h ago" },
    { repo: "summary-ai", msg: "chore: upgrade openai sdk", when: "1d ago" },
    { repo: "task-manager", msg: "fix: offline sync race condition", when: "3d ago" },
    { repo: "orizon-site", msg: "style: kinetic hero refinement", when: "5d ago" },
  ],
};
