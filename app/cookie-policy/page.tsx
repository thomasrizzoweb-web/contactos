import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy — ContactOS",
  description: "Informativa sui cookie di ContactOS.",
  alternates: { canonical: "/cookie-policy" },
};

const h2Style = { fontFamily: "var(--font-archivo)", fontWeight: 700, fontSize: 20, margin: "40px 0 12px", color: "#fff" } as const;
const pStyle = { color: "#c7ccd6", fontSize: 15, lineHeight: 1.7 } as const;

export default function CookiePolicyPage() {
  return (
    <main style={{ maxWidth: 760, margin: "0 auto", padding: "90px 24px 100px" }}>
      <Link href="/" style={{ display: "inline-block", marginBottom: 30, color: "#9aa3b2", fontSize: 14 }}>
        ← Torna al sito
      </Link>
      <h1 style={{ fontFamily: "var(--font-archivo)", fontWeight: 800, fontSize: "clamp(28px,4vw,42px)", letterSpacing: "-.02em", margin: "0 0 8px" }}>
        Cookie Policy
      </h1>
      <div style={{ color: "#7a8290", fontSize: 13, marginBottom: 40 }}>Ultimo aggiornamento: 4 agosto 2026</div>

      <p style={pStyle}>
        Questo sito utilizza esclusivamente cookie tecnici, necessari al corretto funzionamento del sito stesso.
        Non utilizziamo cookie di profilazione o di tracciamento pubblicitario di terze parti.
      </p>

      <h2 style={h2Style}>Cosa sono i cookie</h2>
      <p style={pStyle}>
        I cookie sono piccoli file di testo che i siti visitati inviano al browser dell&apos;utente, dove vengono
        memorizzati per essere poi ritrasmessi agli stessi siti alla successiva visita.
      </p>

      <h2 style={h2Style}>Cookie utilizzati da questo sito</h2>
      <p style={pStyle}>
        Cookie tecnici necessari: garantiscono le funzionalità base del sito (navigazione, invio corretto del
        modulo di contatto). Non richiedono consenso ai sensi della normativa vigente.
      </p>
      <p style={pStyle}>
        I caratteri tipografici (font) sono self-hosted, serviti direttamente dal nostro dominio tramite
        ottimizzazione integrata di Next.js: non viene effettuata alcuna richiesta ai server di Google Fonts al
        caricamento della pagina.
      </p>

      <h2 style={h2Style}>Come gestire i cookie</h2>
      <p style={pStyle}>
        Puoi gestire o eliminare i cookie tramite le impostazioni del tuo browser. Disabilitare i cookie tecnici
        potrebbe compromettere il corretto funzionamento del sito.
      </p>

      <h2 style={h2Style}>Contatti</h2>
      <p style={pStyle}>
        Per domande su questa Cookie Policy: <a href="mailto:thomasrizzo.web@gmail.com">thomasrizzo.web@gmail.com</a>
      </p>
    </main>
  );
}
