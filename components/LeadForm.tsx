"use client";

import { useState, type CSSProperties, type FormEvent } from "react";
import { EnvelopeInputIcon } from "./icons";

type Variant = "hero" | "band";

/**
 * Form "Prenota una call" — sostituisce le due chiamate client-side dirette
 * a formsubmit.co e Google Apps Script del sito originale con una singola
 * POST a /api/lead (validazione server-side, honeypot, rate limit).
 */
export default function LeadForm({ variant, fonte }: { variant: Variant; fonte: string }) {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const inputId = `${fonte}-email`;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("sending");
    setMessage("Invio in corso...");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, fonte, honeypot }),
      });
      const data = await res.json().catch(() => ({ ok: false }));
      if (!res.ok || !data.ok) throw new Error(data?.error || "invio fallito");
      setStatus("success");
      setMessage("Richiesta inviata! Ti ricontattiamo presto.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Errore invio. Riprova o scrivi a thomasrizzo.web@gmail.com");
    }
  }

  const statusColor =
    status === "success" ? "#60a5fa" : status === "error" ? "#f87171" : "#9aa3b2";

  const isBand = variant === "band";

  return (
    <div id={variant === "hero" ? "prenota-consulenza" : undefined} style={variant === "hero" ? { marginTop: 34 } : undefined}>
      {variant === "hero" && (
        <>
          <div style={{ fontWeight: 700, fontSize: 19, color: "#fff" }}>Prenota la tua consulenza</div>
          <div style={{ color: "#9aa3b2", fontSize: 14, lineHeight: 1.6, marginTop: 6, maxWidth: 400 }}>
            Una call di 20 minuti, un piano su misura per la tua attività. Niente spam, niente pressioni: ti
            scriviamo solo se ha senso lavorare insieme.
          </div>
        </>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          position: isBand ? "relative" : undefined,
          display: "flex",
          gap: 10,
          marginTop: isBand ? 30 : 18,
          maxWidth: isBand ? undefined : 460,
          justifyContent: isBand ? "center" : undefined,
          flexWrap: "wrap",
        }}
      >
        {/* Honeypot anti-spam: invisibile e ignorato dagli utenti reali, i bot lo compilano. */}
        <input
          type="text"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
        />
        <div
          style={{
            flex: isBand ? undefined : 1,
            width: isBand ? 280 : undefined,
            minWidth: isBand ? undefined : 210,
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: isBand ? "rgba(0,0,0,.35)" : "rgba(255,255,255,.05)",
            border: isBand ? "1px solid rgba(255,255,255,.14)" : "1px solid rgba(255,255,255,.12)",
            borderRadius: 12,
            padding: "0 14px",
          }}
        >
          <EnvelopeInputIcon stroke={isBand ? "#8891a0" : "#5b6472"} />
          <input
            id={inputId}
            name="email"
            type="email"
            required
            placeholder="latua@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#fff",
              fontFamily: "inherit",
              fontSize: 15,
              padding: "13px 0",
            }}
          />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="cta-pill"
          style={{
            border: "none",
            cursor: status === "sending" ? "default" : "pointer",
            background: "linear-gradient(135deg,#4f8bff,#1e5fff)",
            color: "#fff",
            fontFamily: "inherit",
            fontWeight: 700,
            fontSize: 15,
            padding: isBand ? "0 24px" : "0 22px",
            borderRadius: 12,
            whiteSpace: "nowrap",
            opacity: status === "sending" ? 0.7 : 1,
          }}
        >
          {status === "sending" ? "Invio..." : "Prenota la call \u{1F680}"}
        </button>
      </form>
      <div
        style={{
          position: isBand ? "relative" : undefined,
          fontSize: 13,
          marginTop: isBand ? 10 : 8,
          minHeight: 16,
          color: statusColor,
        }}
      >
        {message}
      </div>

      {variant === "hero" && (
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 22 }}>
          <div style={{ display: "flex" }}>
            <div style={avatarStyle("linear-gradient(135deg,#4f8bff,#1e40af)", 0)}>AI</div>
            <div style={avatarStyle("linear-gradient(135deg,#22d3ee,#2563eb)", -10)}>C</div>
            <div style={avatarStyle("linear-gradient(135deg,#38bdf8,#1d4ed8)", -10)}>O</div>
          </div>
          <div style={{ fontSize: 14, color: "#9aa3b2" }}>Consulenza gratuita di 20 minuti, senza impegno.</div>
        </div>
      )}
    </div>
  );
}

function avatarStyle(background: string, marginLeft: number): CSSProperties {
  return {
    width: 34,
    height: 34,
    borderRadius: "50%",
    background,
    border: "2px solid #000",
    marginLeft,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 700,
  };
}
