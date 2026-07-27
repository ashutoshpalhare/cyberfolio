import { useEffect, useRef, useState } from "react";

export function NeonCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const pos = useRef({ x: 0, y: 0, rx: 0, ry: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
      }
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      setHover(!!t.closest("a,button,[data-magnetic],input,textarea,select"));
    };
    const raf = () => {
      pos.current.rx += (pos.current.x - pos.current.rx) * 0.18;
      pos.current.ry += (pos.current.y - pos.current.ry) * 0.18;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${pos.current.rx - 20}px, ${pos.current.ry - 20}px, 0)`;
      }
      id = requestAnimationFrame(raf);
    };
    let id = requestAnimationFrame(raf);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full"
        style={{
          background: "#00f0ff",
          boxShadow: "0 0 10px #00f0ff, 0 0 20px #00f0ff",
          mixBlendMode: "screen",
        }}
      />
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full transition-[width,height,border-color,opacity] duration-200"
        style={{
          width: hover ? 56 : 40,
          height: hover ? 56 : 40,
          marginLeft: hover ? -8 : 0,
          marginTop: hover ? -8 : 0,
          border: `1px solid ${hover ? "#ff2ec4" : "rgba(0,240,255,0.6)"}`,
          boxShadow: hover
            ? "0 0 30px rgba(255,46,196,0.6), inset 0 0 20px rgba(255,46,196,0.2)"
            : "0 0 20px rgba(0,240,255,0.5), inset 0 0 10px rgba(0,240,255,0.15)",
          mixBlendMode: "screen",
        }}
      />
    </>
  );
}
