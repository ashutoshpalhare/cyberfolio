import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { profile, projects, skillGroups, experiences } from "@/lib/portfolio-data";

type Msg = { role: "ai" | "user"; text: string };

const SUGGESTIONS = ["Who are you?", "Show projects", "Skills?", "Experience?", "Contact"];

function answer(q: string): string {
  const s = q.toLowerCase();
  if (s.includes("who")) return `I'm the AI clone of ${profile.name}. ${profile.bio}`;
  if (s.includes("project")) {
    const top = projects.slice(0, 4).map((p) => `• ${p.name} — ${p.tag}`).join("\n");
    return `Here are a few missions:\n${top}\nScroll to the Projects grid for the full holo-deck.`;
  }
  if (s.includes("skill")) {
    return skillGroups.map((g) => `${g.group}: ${g.skills.map((sk) => sk.name).join(", ")}`).join("\n");
  }
  if (s.includes("experience") || s.includes("work")) {
    return experiences.map((e) => `${e.title} @ ${e.org} (${e.year})`).join("\n");
  }
  if (s.includes("contact") || s.includes("email") || s.includes("reach")) {
    return `Open a channel via ${profile.email} — or use the holographic console below.`;
  }
  if (s.includes("resume") || s.includes("cv")) return `Resume link: ${profile.resume}`;
  if (s.includes("github")) return `GitHub: ${profile.github}`;
  if (s.includes("location") || s.includes("where")) return `Based in ${profile.location}.`;
  return "I only echo what's in Ashutosh's neural archive. Try: who are you, projects, skills, experience, contact.";
}

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "ai",
      text: `Hello Visitor.\nI'm ${profile.name.split(" ")[0]}'s AI clone.\nAsk me anything.`,
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 9999, behavior: "smooth" });
  }, [msgs, open]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { role: "user", text }, { role: "ai", text: answer(text) }]);
    setInput("");
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full glass-panel flex items-center justify-center"
        style={{ boxShadow: "var(--glow-cyan)" }}
        aria-label="Open AI Assistant"
      >
        <span className="absolute inset-0 rounded-full animate-glow-pulse" style={{ background: "radial-gradient(circle, rgba(0,240,255,0.4), transparent 70%)" }} />
        <span className="relative text-xl neon-text font-black">AI</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[min(380px,92vw)] glass-panel rounded-2xl overflow-hidden"
          >
            <div className="flex items-center gap-2 border-b border-cyan/20 px-4 py-3">
              <span className="h-2 w-2 rounded-full bg-cyan animate-flicker" style={{ boxShadow: "0 0 8px #00f0ff" }} />
              <span className="font-mono text-xs tracking-[0.2em] text-cyan/80">A.I. CLONE · ONLINE</span>
            </div>
            <div ref={scrollRef} className="max-h-[340px] overflow-y-auto p-4 space-y-3 text-sm">
              {msgs.map((m, i) => (
                <div key={i} className={m.role === "user" ? "text-right" : ""}>
                  <div
                    className={
                      "inline-block max-w-[85%] rounded-xl px-3 py-2 whitespace-pre-line " +
                      (m.role === "user"
                        ? "bg-neon-pink/20 border border-neon-pink/40 text-white"
                        : "bg-cyan/10 border border-cyan/30 text-white/90")
                    }
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5 px-4 pb-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-cyan/30 bg-cyan/5 px-2.5 py-1 text-xs text-cyan hover:bg-cyan/15"
                >
                  {s}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex gap-2 border-t border-cyan/20 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Query the neural archive..."
                className="flex-1 rounded-lg bg-white/5 px-3 py-2 text-sm text-white outline-none border border-white/10 focus:border-cyan/60"
              />
              <button
                type="submit"
                className="rounded-lg px-3 py-2 text-xs font-bold text-black"
                style={{ background: "var(--grad-hero)", boxShadow: "var(--glow-cyan)" }}
              >
                SEND
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
