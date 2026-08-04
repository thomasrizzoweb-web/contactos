"use client";

import { useEffect, useRef } from "react";
import { NETWORK_ICON_SVGS } from "./icons";

/**
 * Hub centrale con 5 canali satellite in orbita — porting 1:1 del canvas
 * originale (canvas 2D puro, nessuna libreria). Hover reattivo al mouse,
 * pulsazione continua lungo le linee hub-satellite.
 */
export default function NetGraphCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;

    let raf = 0;
    let disposed = false;

    const start = () => {
      if (disposed) return;
      const W = c.clientWidth;
      const H = c.clientHeight;
      if (!W) {
        raf = requestAnimationFrame(start);
        return;
      }
      const ctx = c.getContext("2d");
      if (!ctx) return;
      const dpr = window.devicePixelRatio || 1;
      c.width = W * dpr;
      c.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cx = W / 2;
      const cy = H / 2;
      const RX = Math.min(W / 2 - 78, 165);
      const RY = Math.min(H / 2 - 70, 185);

      const icons = NETWORK_ICON_SVGS.map((s) => {
        const im = new Image();
        im.src = "data:image/svg+xml;utf8," + encodeURIComponent(s);
        return im;
      });
      const N = icons.length;
      const sats = icons.map((_, i) => {
        const ang = -Math.PI / 2 + (i * 2 * Math.PI) / N;
        return { i, base: ang, x: cx, y: cy, ph: Math.random() * Math.PI * 2, dx: 0, dy: 0, r: 24 };
      });
      const hub = { x: cx, y: cy, r: 34 };
      const sec: [number, number][] = [
        [0, 2],
        [2, 4],
        [4, 1],
        [1, 3],
        [3, 0],
      ];
      const pulses = sats.map(() => ({ t: Math.random() }));
      let hover = -1;
      const mouse = { x: -999, y: -999 };
      c.onmousemove = (e) => {
        const b = c.getBoundingClientRect();
        mouse.x = e.clientX - b.left;
        mouse.y = e.clientY - b.top;
      };
      c.onmouseleave = () => {
        mouse.x = -999;
        mouse.y = -999;
      };
      const t0 = performance.now();

      const draw = (now: number) => {
        if (disposed) return;
        const time = (now - t0) / 1000;
        ctx.clearRect(0, 0, W, H);
        sats.forEach((s) => {
          s.x = cx + Math.cos(s.base) * RX;
          s.y = cy + Math.sin(s.base) * RY;
          s.dx = 0;
          s.dy = Math.sin(time * 0.9 + s.ph) * 9;
        });
        hover = -1;
        sats.forEach((s, i) => {
          const dx = mouse.x - (s.x + s.dx);
          const dy = mouse.y - (s.y + s.dy);
          if (dx * dx + dy * dy < s.r * s.r) hover = i;
        });
        c.style.cursor = hover >= 0 ? "pointer" : "default";
        ctx.lineWidth = 1;
        sec.forEach(([a, b]) => {
          const A = sats[a];
          const B = sats[b];
          ctx.strokeStyle = "rgba(120,140,190,0.09)";
          ctx.beginPath();
          ctx.moveTo(A.x + A.dx, A.y + A.dy);
          ctx.lineTo(B.x + B.dx, B.y + B.dy);
          ctx.stroke();
        });
        sats.forEach((s, i) => {
          const hot = hover === i;
          ctx.strokeStyle = hot ? "rgba(79,139,255,0.95)" : "rgba(79,139,255,0.22)";
          ctx.lineWidth = hot ? 2.2 : 1.2;
          ctx.beginPath();
          ctx.moveTo(s.x + s.dx, s.y + s.dy);
          ctx.lineTo(hub.x, hub.y);
          ctx.stroke();
        });
        sats.forEach((s, i) => {
          const p = pulses[i];
          p.t += 0.006 + i * 0.0002;
          if (p.t > 1) p.t -= 1;
          const ease = p.t * p.t * (3 - 2 * p.t);
          const px = s.x + s.dx + (hub.x - (s.x + s.dx)) * ease;
          const py = s.y + s.dy + (hub.y - (s.y + s.dy)) * ease;
          const rad = hover === i ? 7 : 5;
          const g = ctx.createRadialGradient(px, py, 0, px, py, rad);
          g.addColorStop(0, hover === i ? "rgba(96,165,250,0.98)" : "rgba(34,211,238,0.9)");
          g.addColorStop(1, "rgba(34,211,238,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(px, py, rad, 0, Math.PI * 2);
          ctx.fill();
        });
        const hg = ctx.createRadialGradient(hub.x, hub.y, 0, hub.x, hub.y, 78);
        hg.addColorStop(0, "rgba(47,107,255,0.5)");
        hg.addColorStop(1, "rgba(47,107,255,0)");
        ctx.fillStyle = hg;
        ctx.beginPath();
        ctx.arc(hub.x, hub.y, 78, 0, Math.PI * 2);
        ctx.fill();
        sats.forEach((s, i) => {
          const hot = hover === i;
          const x = s.x + s.dx;
          const y = s.y + s.dy;
          const breath = 1 + Math.sin(time * 1.2 + s.ph) * 0.05;
          const rr = s.r * (hot ? 1.18 : breath);
          const glow = ctx.createRadialGradient(x, y, 0, x, y, rr * 2.1);
          glow.addColorStop(0, hot ? "rgba(79,139,255,0.45)" : "rgba(90,120,200,0.22)");
          glow.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(x, y, rr * 2.1, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = hot ? "#101828" : "#0c1020";
          ctx.strokeStyle = hot ? "rgba(79,139,255,0.95)" : "rgba(150,170,220,0.5)";
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.arc(x, y, rr, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          const im = icons[i];
          if (im.complete && im.naturalWidth) {
            const s2 = hot ? 34 : 30;
            ctx.drawImage(im, x - s2 / 2, y - s2 / 2, s2, s2);
          }
        });
        raf = requestAnimationFrame(draw);
      };
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(start);

    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(start);
    };
    window.addEventListener("resize", onResize);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="netgraph"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}
