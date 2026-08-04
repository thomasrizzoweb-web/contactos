"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/**
 * Wrapper scroll-reveal (porting + miglioria del `data-reveal` originale):
 * stesso IntersectionObserver (`threshold: 0.1`, one-shot), ma easing
 * expo-out e translateY ridotto per un effetto più "premium" (vedi
 * design-spec.md sezione 2.5). Rispetta `prefers-reduced-motion` via CSS
 * globale (vedi globals.css).
 */
export default function Reveal({
  children,
  as: Tag = "div",
  delayMs = 0,
  className,
  style,
}: {
  children: ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  delayMs?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Comp = Tag as React.ElementType;

  return (
    <Comp
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(16px)",
        transition: `opacity 600ms cubic-bezier(0.16,1,0.3,1) ${delayMs}ms, transform 600ms cubic-bezier(0.16,1,0.3,1) ${delayMs}ms`,
        ...style,
      }}
    >
      {children}
    </Comp>
  );
}
