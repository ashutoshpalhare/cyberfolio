import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { NeonCursor } from "@/components/Cursor";
import { BootSequence } from "@/components/BootSequence";
import { AIAssistant } from "@/components/AIAssistant";
import { CyberBackground } from "@/components/Background";
import {
  profile,
  timeline,
  projects,
  skillGroups,
  achievements,
  experiences,
  github,
} from "@/lib/portfolio-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ashutosh Palhare — Neural Portfolio 2077" },
      {
        name: "description",
        content:
          "Cyberpunk holographic portfolio of Ashutosh Palhare — Software Developer, AI Enthusiast, Full Stack Engineer.",
      },
      { property: "og:title", content: "Ashutosh Palhare — Neural Portfolio 2077" },
      {
        property: "og:description",
        content: "Enter the neural command center: projects, skills, missions, and more.",
      },
    ],
  }),
  component: Portfolio,
});

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "github", label: "GitHub" },
  { id: "contact", label: "Contact" },
];

function Portfolio() {
  const [booted, setBooted] = useState(false);
  return (
    <>
      <NeonCursor />
      {!booted && <BootSequence onDone={() => setBooted(true)} />}
      <AnimatePresence>
        {booted && (
          <motion.div
            initial={{ opacity: 0, filter: "blur(20px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2 }}
          >
            <CyberBackground />
            <Nav />
            <main className="relative">
              <Hero />
              <About />
              <ExperienceSection />
              <Timeline />
              <Projects />
              <Skills />
              <Achievements />
              <GithubSection />
              <Contact />
              <Footer />
            </main>
            <AIAssistant />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Nav() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[min(1100px,94vw)]"
    >
      <div className="glass-panel rounded-full px-4 py-2 flex items-center gap-2">
        <div className="flex items-center gap-2 pr-3">
          <span className="h-2 w-2 rounded-full bg-cyan animate-flicker" style={{ boxShadow: "0 0 8px #00f0ff" }} />
          <span className="font-mono text-[10px] tracking-[0.25em] text-cyan/80 hidden sm:inline">
            NEURAL // AP.OS
          </span>
        </div>
        <nav className="flex flex-1 items-center gap-1 overflow-x-auto no-scrollbar">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={
                "relative rounded-full px-3 py-1.5 text-xs font-medium tracking-wide transition-colors whitespace-nowrap " +
                (active === n.id ? "text-black" : "text-white/70 hover:text-white")
              }
            >
              {active === n.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "var(--grad-hero)", boxShadow: "var(--glow-cyan)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative">{n.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}

function SectionTitle({ code, title, sub }: { code: string; title: string; sub?: string }) {
  return (
    <div className="mb-12">
      <div className="font-mono text-xs tracking-[0.35em] text-cyan/80 mb-3">
        <span className="text-neon-pink">■</span> {code}
      </div>
      <h2 className="text-4xl md:text-6xl font-black tracking-tight neon-text uppercase">{title}</h2>
      {sub && <p className="mt-3 text-white/60 max-w-2xl">{sub}</p>}
    </div>
  );
}

function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [par, setPar] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const full = profile.roles[roleIdx];
    let i = 0;
    let dir = 1;
    const iv = setInterval(() => {
      i += dir;
      setTyped(full.slice(0, i));
      if (i === full.length) {
        setTimeout(() => (dir = -1), 1200);
      }
      if (i === 0 && dir === -1) {
        dir = 1;
        setRoleIdx((r) => (r + 1) % profile.roles.length);
        clearInterval(iv);
      }
    }, 70);
    return () => clearInterval(iv);
  }, [roleIdx]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = heroRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      setPar({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center px-4 pt-32 pb-16"
    >
      <div className="relative grid w-full max-w-7xl grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
        {/* left */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-mono text-xs tracking-[0.35em] text-cyan/80 mb-4"
          >
            <span className="text-neon-pink">■</span> IDENTITY.MATRIX // 2077
          </motion.div>

          <motion.h1
            style={{
              transform: `translate3d(${par.x * -12}px, ${par.y * -10}px, 0)`,
            }}
            className="text-[clamp(2.6rem,8vw,7rem)] leading-[0.95] font-black tracking-tight uppercase"
          >
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="block neon-text"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              ASHUTOSH
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25 }}
              className="block text-white/90"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              PALHARE<span className="text-neon-pink">.</span>
            </motion.span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 font-mono text-lg md:text-2xl text-cyan flex items-center gap-2 min-h-8"
            style={{ textShadow: "0 0 10px rgba(0,240,255,0.5)" }}
          >
            <span className="text-neon-pink">&gt;</span>
            {typed}
            <span className="inline-block h-5 w-[2px] bg-cyan animate-flicker" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-6 max-w-xl text-white/70 leading-relaxed"
          >
            Booted a neural interface to my work. Explore missions, memory logs, and skill
            constellations across the operating system.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <MagBtn href="#projects" primary>
              Explore Projects
            </MagBtn>
            <MagBtn href={profile.resume} external>
              Download Resume
            </MagBtn>
            <MagBtn href="#contact">Contact Me</MagBtn>
          </motion.div>
        </div>

        {/* right: holo card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          ref={cardRef}
          className="relative mx-auto w-full max-w-sm aspect-[3/4]"
          style={{
            transform: `perspective(1000px) rotateY(${par.x * 12}deg) rotateX(${par.y * -10}deg)`,
            transformStyle: "preserve-3d",
            transition: "transform 0.2s ease-out",
          }}
        >
          <div className="absolute -inset-4 rounded-3xl animate-glow-pulse" style={{ background: "radial-gradient(circle, rgba(0,240,255,0.4), transparent 70%)" }} />
          <div className="relative h-full w-full glass-panel rounded-3xl p-6 overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-40" />
            {/* corners */}
            {(["tl","tr","bl","br"] as const).map((c) => (
              <span
                key={c}
                className="absolute h-6 w-6 border-cyan"
                style={{
                  top: c.startsWith("t") ? 12 : "auto",
                  bottom: c.startsWith("b") ? 12 : "auto",
                  left: c.endsWith("l") ? 12 : "auto",
                  right: c.endsWith("r") ? 12 : "auto",
                  borderTop: c.startsWith("t") ? "2px solid #00f0ff" : undefined,
                  borderBottom: c.startsWith("b") ? "2px solid #00f0ff" : undefined,
                  borderLeft: c.endsWith("l") ? "2px solid #00f0ff" : undefined,
                  borderRight: c.endsWith("r") ? "2px solid #00f0ff" : undefined,
                  boxShadow: "0 0 10px #00f0ff",
                }}
              />
            ))}
            <div className="relative flex flex-col h-full">
              <div className="font-mono text-[10px] tracking-[0.3em] text-cyan/80">
                CITIZEN ID · 2077-AP
              </div>
              <div className="mt-6 relative mx-auto h-40 w-40">
                <div className="absolute inset-0 rounded-full animate-glow-pulse" style={{ background: "conic-gradient(from 0deg, #00f0ff, #b45cff, #ff2ec4, #00f0ff)" }} />
                <div className="absolute inset-[3px] rounded-full bg-[#050816] flex items-center justify-center text-6xl font-black neon-text" style={{ fontFamily: "Orbitron, sans-serif" }}>
                  AP
                </div>
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-neon-pink" style={{ boxShadow: "0 0 10px #ff2ec4" }} />
              </div>
              <div className="mt-6 text-center">
                <div className="font-black text-lg tracking-widest" style={{ fontFamily: "Orbitron, sans-serif" }}>
                  {profile.name}
                </div>
                <div className="mt-1 font-mono text-[11px] tracking-widest text-cyan/80">
                  {profile.handle}
                </div>
              </div>
              <div className="mt-auto grid grid-cols-2 gap-3 font-mono text-[10px]">
                <StatChip label="STATUS" value="ONLINE" />
                <StatChip label="LOC" value="IN" />
                <StatChip label="MISSIONS" value={String(experiences.length + projects.length)} />
                <StatChip label="LINK" value="STABLE" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StatChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-cyan/20 bg-white/5 px-2.5 py-1.5">
      <div className="text-cyan/60">{label}</div>
      <div className="text-white font-bold tracking-wider">{value}</div>
    </div>
  );
}

function MagBtn({
  children,
  href,
  primary,
  external,
}: {
  children: React.ReactNode;
  href: string;
  primary?: boolean;
  external?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  return (
    <a
      ref={ref}
      href={href}
      data-magnetic
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${x * 0.15}px, ${y * 0.25}px)`;
      }}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = "";
      }}
      className={
        "group relative inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold tracking-wide transition-shadow duration-300 " +
        (primary
          ? "text-black"
          : "text-white border border-cyan/40 bg-white/5 backdrop-blur-md hover:border-cyan")
      }
      style={
        primary
          ? { background: "var(--grad-hero)", boxShadow: "var(--glow-cyan)" }
          : undefined
      }
    >
      <span className="relative">{children}</span>
      <span className="relative">→</span>
    </a>
  );
}

function About() {
  const lines = [
    { k: "NAME", v: profile.name },
    { k: "LOCATION", v: profile.location },
    { k: "EDUCATION", v: profile.education },
    { k: "STATUS", v: profile.status },
    { k: "PASSION", v: profile.passion },
    { k: "MISSION", v: profile.mission },
  ];
  return (
    <section id="about" className="relative py-28 px-4">
      <div className="mx-auto max-w-6xl">
        <SectionTitle code="SEC/01 · IDENTITY" title="About the Operator" sub="A holographic dossier — reveal line by line." />
        <div className="relative glass-panel rounded-3xl p-8 md:p-12 overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="relative grid gap-6 md:grid-cols-2">
            {lines.map((l, i) => (
              <motion.div
                key={l.k}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.1 }}
                className="flex items-baseline gap-4 border-b border-cyan/10 py-3"
              >
                <span className="font-mono text-[11px] tracking-[0.25em] text-cyan w-28 shrink-0">
                  {l.k}
                </span>
                <span className="text-white text-lg font-medium">{l.v}</span>
              </motion.div>
            ))}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="md:col-span-2 mt-4 text-white/70 leading-relaxed max-w-3xl"
            >
              {profile.bio}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="relative py-28 px-4">
      <div className="mx-auto max-w-6xl">
        <SectionTitle code="SEC/02 · MISSION LOGS" title="Experience" sub="Field reports from real engagements." />
        <div className="grid gap-6 md:grid-cols-2">
          {experiences.map((e, i) => (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] tracking-[0.3em] text-cyan/80">
                  {e.code}
                </span>
                <span className="font-mono text-[10px] px-2 py-1 rounded-full border border-neon-pink/50 text-neon-pink" style={{ boxShadow: "0 0 8px rgba(255,46,196,0.3)" }}>
                  {e.status}
                </span>
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight" style={{ fontFamily: "Orbitron, sans-serif" }}>
                {e.title}
              </h3>
              <div className="mt-1 text-cyan">{e.org}</div>
              <div className="mt-1 font-mono text-xs text-white/50">{e.year}</div>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {e.responsibilities.map((r, j) => (
                  <li key={j} className="flex gap-2">
                    <span className="text-neon-pink">▸</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const line = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <section className="relative py-28 px-4">
      <div className="mx-auto max-w-5xl">
        <SectionTitle code="SEC/03 · MEMORY.CORE" title="Timeline" sub="Chronological memory shards of the operator." />
        <div ref={ref} className="relative pl-8 md:pl-0">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />
          <motion.div
            style={{ height: line }}
            className="absolute left-4 md:left-1/2 top-0 w-px md:-translate-x-1/2"
          >
            <div className="h-full w-full" style={{ background: "linear-gradient(180deg, #00f0ff, #b45cff, #ff2ec4)", boxShadow: "0 0 12px #00f0ff" }} />
          </motion.div>
          <div className="space-y-10">
            {timeline.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={
                  "relative md:grid md:grid-cols-2 md:gap-10 " +
                  (i % 2 === 0 ? "" : "md:[&>*:first-child]:col-start-2")
                }
              >
                <div
                  className={
                    "glass-card rounded-2xl p-5 ml-4 md:ml-0 " + (i % 2 === 0 ? "md:mr-6" : "md:ml-6")
                  }
                >
                  <div className="font-mono text-[10px] tracking-[0.3em] text-cyan/80">
                    {t.kind.toUpperCase()}
                  </div>
                  <div className="mt-1 text-xs text-white/50 font-mono">{t.year}</div>
                  <h4 className="mt-2 text-lg font-bold text-white" style={{ fontFamily: "Orbitron, sans-serif" }}>
                    {t.title}
                  </h4>
                  <div className="text-cyan text-sm">{t.org}</div>
                  <p className="mt-2 text-sm text-white/60">{t.desc}</p>
                </div>
                <span className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 h-4 w-4 rounded-full" style={{ background: "var(--grad-hero)", boxShadow: "0 0 16px #00f0ff" }} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [modal, setModal] = useState<number | null>(null);
  return (
    <section id="projects" className="relative py-28 px-4">
      <div className="mx-auto max-w-7xl">
        <SectionTitle code="SEC/04 · HOLO.DECK" title="Projects" sub="Holographic manifests of shipped missions. Click a card to open dossier." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <motion.button
              key={p.name}
              onClick={() => setModal(i)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 3) * 0.08 }}
              whileHover={{ y: -6 }}
              className="group text-left glass-panel rounded-2xl overflow-hidden relative"
              style={{ willChange: "transform" }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(0,240,255,0.15), rgba(180,92,255,0.15))", boxShadow: "inset 0 0 40px rgba(0,240,255,0.2)" }} />
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(5,8,22,0.9))" }} />
                <div className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.3em] text-cyan px-2 py-1 rounded-full bg-black/40 border border-cyan/30">
                  {p.tag.toUpperCase()}
                </div>
              </div>
              <div className="relative p-5">
                <h4 className="text-xl font-black tracking-tight" style={{ fontFamily: "Orbitron, sans-serif" }}>
                  {p.name}
                </h4>
                <p className="mt-2 text-sm text-white/60 line-clamp-2">{p.desc}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-cyan/30 text-cyan bg-cyan/5"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {modal !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: "rgba(5,8,22,0.85)", backdropFilter: "blur(10px)" }}
            onClick={() => setModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel rounded-3xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="relative aspect-[16/9]">
                <img src={projects[modal].img} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 30%, rgba(5,8,22,0.95))" }} />
                <button
                  onClick={() => setModal(null)}
                  className="absolute top-4 right-4 h-9 w-9 rounded-full glass-panel flex items-center justify-center text-cyan"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              <div className="p-6 md:p-8">
                <div className="font-mono text-[10px] tracking-[0.3em] text-cyan mb-2">
                  DOSSIER · {projects[modal].tag.toUpperCase()}
                </div>
                <h3 className="text-3xl md:text-4xl font-black neon-text uppercase" style={{ fontFamily: "Orbitron, sans-serif" }}>
                  {projects[modal].name}
                </h3>
                <p className="mt-4 text-white/70">{projects[modal].desc}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {projects[modal].stack.map((s) => (
                    <span key={s} className="text-xs font-mono px-2 py-1 rounded-full border border-cyan/30 text-cyan bg-cyan/5">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <MagBtn href={projects[modal].github} external>
                    GitHub
                  </MagBtn>
                  <MagBtn href={projects[modal].demo} external primary>
                    Live Demo
                  </MagBtn>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Skills() {
  const [hover, setHover] = useState<{ g: number; s: number } | null>(null);
  return (
    <section id="skills" className="relative py-28 px-4">
      <div className="mx-auto max-w-6xl">
        <SectionTitle code="SEC/05 · SKILL.MATRIX" title="Skills" sub="A living constellation. Hover a node to see experience." />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, gi) => (
            <motion.div
              key={g.group}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: gi * 0.08 }}
              className="glass-panel rounded-3xl p-6 relative overflow-hidden"
            >
              <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full animate-glow-pulse" style={{ background: `radial-gradient(circle, var(--color-${g.color}), transparent 70%)`, opacity: 0.3 }} />
              <div className="relative">
                <div className="font-mono text-[10px] tracking-[0.3em] text-cyan/80">CLUSTER</div>
                <h3 className="mt-1 text-2xl font-black uppercase tracking-tight" style={{ fontFamily: "Orbitron, sans-serif" }}>
                  {g.group}
                </h3>
                <div className="mt-5 relative min-h-[220px]">
                  {g.skills.map((sk, si) => {
                    const angle = (si / g.skills.length) * Math.PI * 2 - Math.PI / 2;
                    const r = 88;
                    const x = Math.cos(angle) * r;
                    const y = Math.sin(angle) * r;
                    const active = hover?.g === gi && hover?.s === si;
                    return (
                      <motion.button
                        key={sk.name}
                        onMouseEnter={() => setHover({ g: gi, s: si })}
                        onMouseLeave={() => setHover(null)}
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 3 + si * 0.3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1.5 text-xs font-mono border whitespace-nowrap"
                        style={{
                          transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                          background: active ? "var(--grad-hero)" : "rgba(0,240,255,0.05)",
                          color: active ? "#050816" : "#fff",
                          borderColor: "rgba(0,240,255,0.4)",
                          boxShadow: active ? "0 0 20px rgba(0,240,255,0.7)" : "0 0 10px rgba(0,240,255,0.15)",
                        }}
                      >
                        {sk.name}
                      </motion.button>
                    );
                  })}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                      <div className="text-[10px] font-mono text-cyan/60">
                        {hover?.g === gi ? "EXP" : "NODE"}
                      </div>
                      <div className="text-sm font-bold text-white">
                        {hover?.g === gi ? g.skills[hover.s].xp : g.skills.length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Achievements() {
  return (
    <section id="achievements" className="relative py-28 px-4">
      <div className="mx-auto max-w-6xl">
        <SectionTitle code="SEC/06 · TROPHIES" title="Achievements" sub="Unlocked accolades from across the grid." />
        <div className="grid gap-5 sm:grid-cols-2">
          {achievements.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,46,196,0.3), transparent 70%)" }} />
              <div className="relative flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl flex items-center justify-center text-2xl font-black" style={{ background: "var(--grad-hero)", color: "#050816", boxShadow: "var(--glow-cyan)" }}>
                  ★
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white" style={{ fontFamily: "Orbitron, sans-serif" }}>
                    {a.title}
                  </h4>
                  <p className="mt-1 text-sm text-white/60">{a.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GithubSection() {
  const days = github.contributions;
  const max = Math.max(...days, 1);
  return (
    <section id="github" className="relative py-28 px-4">
      <div className="mx-auto max-w-6xl">
        <SectionTitle code="SEC/07 · CODE.STREAM" title="GitHub Telemetry" sub="Live-feel signal from the code grid." />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="glass-panel rounded-2xl p-6">
            <div className="font-mono text-[10px] tracking-[0.3em] text-cyan/80">STATS</div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { k: "REPOS", v: github.repos },
                { k: "STARS", v: github.stars },
                { k: "FOLLOW", v: github.followers },
              ].map((s) => (
                <div key={s.k} className="rounded-xl border border-cyan/20 bg-white/5 p-3 text-center">
                  <div className="text-3xl font-black neon-text" style={{ fontFamily: "Orbitron, sans-serif" }}>
                    {s.v}
                  </div>
                  <div className="text-[10px] font-mono tracking-wider text-cyan/70 mt-1">{s.k}</div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <div className="font-mono text-[10px] tracking-[0.3em] text-cyan/80 mb-2">LANGUAGES</div>
              <div className="space-y-2">
                {github.languages.map((l) => (
                  <div key={l.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/80">{l.name}</span>
                      <span className="font-mono text-cyan">{l.pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${l.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full"
                        style={{ background: "var(--grad-hero)", boxShadow: "0 0 8px #00f0ff" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div className="font-mono text-[10px] tracking-[0.3em] text-cyan/80">CONTRIBUTION GRID</div>
              <a href={profile.github} target="_blank" rel="noreferrer" className="text-xs text-cyan hover:text-white underline underline-offset-4">
                open profile →
              </a>
            </div>
            <div className="mt-4 grid grid-cols-[repeat(20,minmax(0,1fr))] gap-1">
              {days.map((v, i) => {
                const level = v / max;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 20) * 0.01 }}
                    className="aspect-square rounded-[3px]"
                    style={{
                      background: level < 0.05 ? "rgba(255,255,255,0.05)" : `rgba(0,240,255,${0.25 + level * 0.7})`,
                      boxShadow: level > 0.5 ? "0 0 6px rgba(0,240,255,0.6)" : "none",
                    }}
                  />
                );
              })}
            </div>
            <div className="mt-6 font-mono text-[10px] tracking-[0.3em] text-cyan/80">LATEST ACTIVITY</div>
            <div className="mt-2 space-y-2">
              {github.activity.map((a, i) => (
                <div key={i} className="flex items-center gap-3 text-sm border-b border-white/5 pb-2">
                  <span className="text-neon-pink font-mono">▸</span>
                  <span className="font-mono text-cyan">{a.repo}</span>
                  <span className="text-white/70 flex-1 truncate">{a.msg}</span>
                  <span className="text-white/40 text-xs font-mono">{a.when}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    setTimeout(() => setState("sent"), 1400);
  };

  return (
    <section id="contact" className="relative py-28 px-4">
      <div className="mx-auto max-w-4xl">
        <SectionTitle code="SEC/08 · COMMS" title="Open a Channel" sub="Transmit a signal to the operator." />
        <div className="glass-panel rounded-3xl p-6 md:p-10 relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="relative">
            {state !== "sent" ? (
              <form onSubmit={submit} className="grid gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="NAME" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} />
                  <Field label="EMAIL" type="email" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} />
                </div>
                <Field
                  label="MESSAGE"
                  multiline
                  value={form.message}
                  onChange={(v) => setForm((f) => ({ ...f, message: v }))}
                />
                <div className="flex items-center justify-between mt-2">
                  <div className="font-mono text-[10px] tracking-[0.3em] text-cyan/70">
                    ENCRYPTED · END-TO-END
                  </div>
                  <button
                    type="submit"
                    disabled={state === "sending"}
                    className="relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-black overflow-hidden disabled:opacity-70"
                    style={{ background: "var(--grad-hero)", boxShadow: "var(--glow-cyan)" }}
                  >
                    <span className="relative">
                      {state === "sending" ? "Transmitting..." : "Send Signal"}
                    </span>
                    <span className="relative">↗</span>
                  </button>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="mx-auto h-20 w-20 rounded-full flex items-center justify-center text-4xl font-black" style={{ background: "var(--grad-hero)", color: "#050816", boxShadow: "var(--glow-cyan)" }}>
                  ✓
                </div>
                <h3 className="mt-6 text-3xl font-black neon-text uppercase" style={{ fontFamily: "Orbitron, sans-serif" }}>
                  Transmission Successful.
                </h3>
                <p className="mt-2 text-white/60">
                  Your signal has been received. Expect an encrypted reply soon.
                </p>
              </motion.div>
            )}
          </div>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-white/70">
          <a href={`mailto:${profile.email}`} className="hover:text-cyan">{profile.email}</a>
          <span className="text-white/20">·</span>
          <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-cyan">GitHub</a>
          <span className="text-white/20">·</span>
          <a href={profile.portfolio} target="_blank" rel="noreferrer" className="hover:text-cyan">Origin Portfolio</a>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  multiline?: boolean;
}) {
  const [focus, setFocus] = useState(false);
  return (
    <label className="block">
      <div className="font-mono text-[10px] tracking-[0.3em] text-cyan/80 mb-1.5">{label}</div>
      <div
        className="relative rounded-xl transition-colors"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${focus ? "#00f0ff" : "rgba(0,240,255,0.2)"}`,
          boxShadow: focus ? "0 0 20px rgba(0,240,255,0.25)" : "none",
        }}
      >
        {multiline ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            required
            rows={5}
            className="w-full bg-transparent outline-none px-4 py-3 text-white resize-none"
          />
        ) : (
          <input
            value={value}
            type={type}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            required
            className="w-full bg-transparent outline-none px-4 py-3 text-white"
          />
        )}
      </div>
    </label>
  );
}

function Footer() {
  return (
    <footer className="relative py-10 px-4 border-t border-white/5">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-mono text-[10px] tracking-[0.3em] text-cyan/70">
          © 2077 · AP.OS · SIGNAL STABLE
        </div>
        <div className="text-xs text-white/50">
          Built with React · Motion · Tailwind — inside the grid.
        </div>
      </div>
    </footer>
  );
}
