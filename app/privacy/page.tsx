import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — ContactOS",
  description: "Informativa sulla privacy di ContactOS ai sensi del Regolamento UE 2016/679 (GDPR).",
  alternates: { canonical: "/privacy" },
};

const h2Style = { fontFamily: "var(--font-archivo)", fontWeight: 700, fontSize: 20, margin: "40px 0 12px", color: "#fff" } as const;
const pStyle = { color: "#c7ccd6", fontSize: 15, lineHeight: 1.7 } as const;

export default function PrivacyPage() {
  return (
    <main style={{ maxWidth: 760, margin: "0 auto", padding: "90px 24px 100px" }}>
      <Link href="/" style={{ display: "inline-block", marginBottom: 30, color: "#9aa3b2", fontSize: 14 }}>
        ← Torna al sito
      </Link>
      <h1 style={{ fontFamily: "var(--font-archivo)", fontWeight: 800, fontSize: "clamp(28px,4vw,42px)", letterSpacing: "-.02em", margin: "0 0 8px" }}>
        Privacy Policy
      </h1>
      <div style={{ color: "#7a8290", fontSize: 13, marginBottom: 40 }}>Ultimo aggiornamento: 4 agosto 2026</div>

      <h2 style={h2Style}>Titolare del trattamento</h2>
      <p style={pStyle}>
        Thomas Rizzo — Pavia (PV).
        <br />
        Contatto: <a href="mailto:thomasrizzo.web@gmail.com">thomasrizzo.web@gmail.com</a>
      </p>

      <h2 style={h2Style}>Quali dati raccogliamo</h2>
      <p style={pStyle}>
        Attraverso il modulo &ldquo;Prenota una call&rdquo; presente sul sito raccogliamo l&apos;indirizzo email che
        inserisci volontariamente per essere ricontattato/a. Se in futuro fornirai anche nome, telefono o un
        messaggio, questi dati sono trattati con le stesse finalità e garanzie descritte in questa informativa.
      </p>
      <p style={pStyle}>
        Non utilizziamo cookie di profilazione né strumenti di tracciamento pubblicitario. I caratteri tipografici
        del sito sono ottimizzati e serviti direttamente dal nostro dominio (nessuna richiesta ai server di Google
        Fonts al caricamento della pagina).
      </p>

      <h2 style={h2Style}>Perché li usiamo</h2>
      <p style={pStyle}>
        L&apos;email raccolta (ed eventuali altri dati forniti tramite il modulo) viene usata unicamente per
        ricontattarti in merito alla richiesta di consulenza/informazioni su ContactOS. Base giuridica: esecuzione
        di misure precontrattuali adottate su tua richiesta (art. 6.1.b GDPR) — ci hai contattato tu chiedendo
        informazioni.
      </p>

      <h2 style={h2Style}>Come vengono trattati</h2>
      <p style={pStyle}>
        Il modulo del sito invia la richiesta al nostro server, che la salva in un database e — se configurato —
        invia una notifica email tramite il servizio <a href="https://resend.com" target="_blank" rel="noopener noreferrer">Resend</a> e/o
        la registra in un foglio di calcolo interno tramite Google Apps Script, esclusivamente lato server (mai
        esposto al browser). Il sito e il database sono ospitati su{" "}
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">Vercel</a> e{" "}
        <a href="https://neon.tech" target="_blank" rel="noopener noreferrer">Neon</a>. Questi fornitori trattano i
        dati in qualità di responsabili del trattamento nei limiti necessari a fornire il servizio.
      </p>

      <h2 style={h2Style}>Per quanto tempo li conserviamo</h2>
      <p style={pStyle}>
        Se la richiesta non porta a una collaborazione, conserviamo i dati per un massimo di 24 mesi dall&apos;ultimo
        contatto, poi li cancelliamo o li anonimizziamo. Se diventi cliente, i dati necessari alla gestione del
        rapporto commerciale e agli obblighi fiscali vengono conservati per il tempo previsto dalla normativa
        applicabile. Puoi chiederne la cancellazione in qualsiasi momento.
      </p>

      <h2 style={h2Style}>I tuoi diritti</h2>
      <p style={pStyle}>
        Ai sensi degli artt. 15-22 del GDPR puoi in qualsiasi momento chiedere l&apos;accesso, la rettifica, la
        cancellazione, la limitazione del trattamento dei tuoi dati, opporti al trattamento o richiederne la
        portabilità, scrivendo a <a href="mailto:thomasrizzo.web@gmail.com">thomasrizzo.web@gmail.com</a>. Hai
        inoltre diritto di proporre reclamo al Garante per la Protezione dei Dati Personali
        (www.garanteprivacy.it).
      </p>

      <h2 style={h2Style}>Sicurezza dei dati</h2>
      <p style={pStyle}>
        Adottiamo misure tecniche e organizzative adeguate (validazione e sanitizzazione degli input, limitazione
        delle richieste per prevenire abusi, accesso limitato al database, hosting con certificazioni di sicurezza)
        per proteggere i tuoi dati da accessi non autorizzati, perdita o divulgazione impropria.
      </p>

      <h2 style={h2Style}>Modifiche a questa informativa</h2>
      <p style={pStyle}>Questa informativa può essere aggiornata nel tempo. La data di ultimo aggiornamento è indicata in cima alla pagina.</p>
    </main>
  );
}
