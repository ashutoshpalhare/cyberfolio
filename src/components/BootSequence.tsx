import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const LINES = [
  "> Establishing Neural Connection...",
  "> Identity Verified",
  "> Loading Projects...",
  "> Synchronizing AI Memory...",
  "> Welcome, Visitor.",
];

export function BootSequence({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (i < LINES.length) {
      const t = setTimeout(() => setI(i + 1), 550);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setDone(true), 700);
    return () => clearTimeout(t);
  }, [i]);

  useEffect(() => {
    if (done) {
      const t = setTimeout(onDone, 800);
      return () => clearTimeout(t);
    }
  }, [done, onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden"
          style={{ background: "#050816" }}
        >
          <div className="absolute inset-0 grid-bg opacity-40 animate-grid-move" />
          <div
            className="absolute inset-x-0 h-24 pointer-events-none animate-scan"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgba(0,240,255,0.15), transparent)",
            }}
          />
          <div className="relative z-10 w-[min(680px,92vw)] glass-panel rounded-2xl p-8 font-mono">
            <div className="mb-6 flex items-center gap-3 text-xs tracking-[0.3em] text-cyan/80">
              <span className="h-2 w-2 rounded-full bg-cyan animate-flicker" style={{ boxShadow: "0 0 10px #00f0ff" }} />
              NEURAL LINK · v20.77
              <span className="ml-auto opacity-60">SECURE CHANNEL</span>
            </div>
            <div className="space-y-2 text-[15px] text-cyan">
              {LINES.slice(0, i).map((l, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-neon-pink">■</span>
                  <span style={{ textShadow: "0 0 8px rgba(0,240,255,0.5)" }}>{l}</span>
                </motion.div>
              ))}
              {i < LINES.length && (
                <div className="flex items-center gap-3 opacity-70">
                  <span className="text-neon-purple">▸</span>
                  <span className="inline-block h-4 w-2 bg-cyan animate-flicker" />
                </div>
              )}
            </div>
            <div className="mt-8 h-1 w-full overflow-hidden rounded-full bg-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(i / LINES.length) * 100}%` }}
                transition={{ duration: 0.4 }}
                className="h-full"
                style={{ background: "var(--grad-hero)", boxShadow: "0 0 20px #00f0ff" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
