"use client";

import { useEffect, useRef } from "react";

/** Sfera wireframe rotante (canvas 2D, nessuna libreria 3D) — pagina Soluzioni. */
export default function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const W = c.clientWidth;
    const H = c.clientHeight;
    if (!W) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    c.width = W * dpr;
    c.height = H * dpr;
    ctx.scale(dpr, dpr);
    const R = (Math.min(W, H) / 2) * 0.92;
    const cx = W / 2;
    const cy = H / 2;
    const pts: [number, number, number][] = [];
    const N = 46;
    for (let i = 0; i < N; i++) {
      const lat = -Math.PI / 2 + (Math.PI * i) / (N - 1);
      const r = Math.cos(lat);
      const circ = Math.max(1, Math.round(N * 2 * r));
      for (let j = 0; j < circ; j++) {
        const lon = (2 * Math.PI * j) / circ;
        pts.push([r * Math.cos(lon), Math.sin(lat), r * Math.sin(lon)]);
      }
    }
    let a = 0;
    let raf = 0;
    let disposed = false;

    const draw = () => {
      if (disposed) return;
      ctx.clearRect(0, 0, W, H);
      a += 0.0022;
      const ca = Math.cos(a);
      const sa = Math.sin(a);
      for (const p of pts) {
        const x = p[0] * ca - p[2] * sa;
        const z = p[0] * sa + p[2] * ca;
        const y = p[1];
        const px = cx + x * R;
        const py = cy - y * R;
        const depth = (z + 1) / 2;
        const size = 0.5 + depth * 1.7;
        const alpha = 0.12 + depth * 0.72;
        ctx.beginPath();
        ctx.fillStyle = `rgba(180,205,255,${alpha.toFixed(2)})`;
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
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
      id="globe"
      className="rs-globe"
      style={{ width: 460, height: 460, maxWidth: "100%" }}
    />
  );
}
