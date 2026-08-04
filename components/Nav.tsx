"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Nav() {
  const navRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let hi = false; // isteresi: attiva a 40px, disattiva sotto 20px
    const onScroll = () => {
      const y = window.scrollY;
      if (!hi && y > 40) hi = true;
      else if (hi && y < 20) hi = false;
      setScrolled(hi);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 16,
        left: 0,
        right: 0,
        zIndex: 200,
        display: "flex",
        justifyContent: "center",
        padding: "0 20px",
        pointerEvents: "none",
      }}
    >
      <div
        ref={navRef}
        id="nav"
        style={{
          width: "100%",
          maxWidth: scrolled ? 900 : 1200,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "13px 26px",
          borderRadius: 999,
          border: scrolled ? "1px solid rgba(255,255,255,0.09)" : "1px solid transparent",
          background: scrolled ? "rgba(10,14,24,0.62)" : "transparent",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(18px)" : "none",
          boxShadow: scrolled ? "0 10px 40px rgba(0,0,0,0.45)" : "none",
          transition:
            "background-color 300ms cubic-bezier(0.16,1,0.3,1), border-color 300ms cubic-bezier(0.16,1,0.3,1), box-shadow 300ms cubic-bezier(0.16,1,0.3,1), max-width 300ms cubic-bezier(0.16,1,0.3,1)",
          pointerEvents: "auto",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <Image src="/contactos_logo.png" alt="ContactOS" width={28} height={28} style={{ height: 28, width: "auto", display: "block" }} priority />
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
          <Link href="/soluzioni" className="nav-link" style={{ fontWeight: 600, fontSize: 15, color: "rgba(255,255,255,.9)" }}>
            Soluzioni
          </Link>
          <Link
            href="/#prenota-consulenza"
            className="cta-pill"
            style={{
              border: "none",
              cursor: "pointer",
              background: "linear-gradient(135deg,#4f8bff,#1e5fff)",
              color: "#fff",
              fontFamily: "inherit",
              fontWeight: 700,
              fontSize: 14,
              padding: "10px 18px",
              borderRadius: 999,
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Prenota una call
          </Link>
        </div>
      </div>
    </div>
  );
}
