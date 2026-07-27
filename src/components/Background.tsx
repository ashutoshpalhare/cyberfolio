import { useEffect, useRef } from "react";

export function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.6 + 0.3,
      hue: Math.random() > 0.5 ? 190 : 290,
    }));

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, 0.85)`;
        ctx.shadowColor = `hsla(${p.hue}, 100%, 65%, 0.9)`;
        ctx.shadowBlur = 10;
        ctx.fill();
      }
      // connect near
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 240, 255, ${(1 - d / 130) * 0.15})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 grid-bg opacity-30 animate-grid-move" />
      <div
        className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full animate-aurora"
        style={{ background: "radial-gradient(circle, rgba(0,240,255,0.22), transparent 60%)", filter: "blur(40px)" }}
      />
      <div
        className="absolute -bottom-40 -right-40 h-[560px] w-[560px] rounded-full animate-aurora"
        style={{ background: "radial-gradient(circle, rgba(180,92,255,0.22), transparent 60%)", filter: "blur(40px)", animationDelay: "3s" }}
      />
      <div
        className="absolute top-1/3 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full animate-aurora"
        style={{ background: "radial-gradient(circle, rgba(255,46,196,0.15), transparent 60%)", filter: "blur(50px)", animationDelay: "6s" }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div
        className="absolute inset-x-0 h-40 pointer-events-none animate-scan opacity-30"
        style={{ background: "linear-gradient(180deg, transparent, rgba(0,240,255,0.15), transparent)" }}
      />
    </div>
  );
}
