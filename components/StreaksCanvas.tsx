"use client";

import { useEffect, useRef } from "react";

/** Pioggia di linee luminose diagonali — banda scura pagina Soluzioni. */
export default function StreaksCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c || !c.clientWidth) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    c.width = c.clientWidth;
    c.height = c.clientHeight;

    // Meno streak su viewport piccoli, per risparmiare CPU su mobile.
    const count = c.clientWidth < 768 ? 65 : 130;
    const lines = Array.from({ length: count }, () => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      len: 40 + Math.random() * 130,
      sp: 2 + Math.random() * 4.5,
      a: 0.05 + Math.random() * 0.28,
    }));
    const ang = Math.PI * 0.3;
    const dx = Math.cos(ang);
    const dy = Math.sin(ang);
    let raf = 0;
    let disposed = false;

    const draw = () => {
      if (disposed) return;
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.lineWidth = 1;
      for (const l of lines) {
        ctx.strokeStyle = `rgba(200,218,255,${l.a})`;
        ctx.beginPath();
        ctx.moveTo(l.x, l.y);
        ctx.lineTo(l.x - dx * l.len, l.y - dy * l.len);
        ctx.stroke();
        l.x += dx * l.sp;
        l.y += dy * l.sp;
        if (l.y > c.height + 60 || l.x > c.width + 60) {
          l.x = Math.random() * c.width - c.width * 0.25;
          l.y = -60;
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="streaks"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}
