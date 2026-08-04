import type { CSSProperties } from "react";
import Reveal from "@/components/Reveal";
import LeadForm from "@/components/LeadForm";
import NetGraphCanvas from "@/components/NetGraphCanvas";
import Footer from "@/components/Footer";
import { ContactsIcon, ReplyIcon, RecoverIcon, DashboardIcon } from "@/components/icons";

const cardStyle: CSSProperties = {
  background: "rgba(255,255,255,.04)",
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: 18,
  padding: 26,
};

const iconTileStyle: CSSProperties = {
  width: 46,
  height: 46,
  borderRadius: 12,
  background: "rgba(47,107,255,.14)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function HomePage() {
  return (
    <div id="page-home">
      {/* HERO */}
      <section className="rs-hero-home" style={{ position: "relative", minHeight: "100vh", padding: "150px 40px 80px", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-5%",
            width: 900,
            height: 900,
            background: "radial-gradient(circle, rgba(47,107,255,.20), transparent 62%)",
            pointerEvents: "none",
          }}
        />
        <div
          className="rs-grid-2"
          style={{
            position: "relative",
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.05fr .95fr",
            gap: 40,
            alignItems: "center",
            zIndex: 2,
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "var(--font-archivo)",
                fontWeight: 800,
                fontSize: "clamp(44px,5.2vw,72px)",
                lineHeight: 1.02,
                letterSpacing: "-.025em",
                margin: 0,
              }}
            >
              Sistemi operativi su misura per{" "}
              <span
                style={{
                  display: "inline-block",
                  background: "#2f6bff",
                  color: "#fff",
                  padding: "6px 16px 12px",
                  borderRadius: 4,
                  marginTop: 12,
                  transform: "rotate(-2.5deg)",
                  transformOrigin: "left center",
                }}
              >
                attività locali.
              </span>
            </h1>
            <p style={{ color: "#9aa3b2", fontSize: 16, lineHeight: 1.65, maxWidth: 520, margin: "26px 0 0" }}>
              Basta clienti persi mentre lavori. Ottieni un sistema completo che gestisce i contatti, risponde in
              automatico e recupera chi si è perso, già configurato e testato.{" "}
              <b style={{ color: "#fff", fontWeight: 700 }}>
                Ogni cliente che ti scrive o ti chiama viene gestito, salvato e ricontattato, anche mentre lavori.
              </b>
            </p>

            <LeadForm variant="hero" fonte="hero-email" />
          </div>

          <div className="rs-hero-graph" style={{ position: "relative", height: 540 }}>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                width: "75%",
                height: "75%",
                background: "radial-gradient(circle, rgba(139,92,246,.18), transparent 68%)",
                pointerEvents: "none",
              }}
            />
            <NetGraphCanvas />
          </div>
        </div>
      </section>

      {/* COME FUNZIONA */}
      <Reveal as="section" style={{ maxWidth: 1200, margin: "0 auto", padding: "90px 40px" }}>
        <div style={{ color: "#60a5fa", fontSize: 13, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase" }}>
          Come funziona
        </div>
        <h2
          style={{
            fontFamily: "var(--font-archivo)",
            fontWeight: 800,
            fontSize: "clamp(32px,4vw,52px)",
            lineHeight: 1.05,
            letterSpacing: "-.02em",
            margin: "14px 0 0",
            maxWidth: 640,
          }}
        >
          Guardalo in azione
        </h2>
        <div
          className="rs-explainer-box"
          style={{
            position: "relative",
            width: "100%",
            height: 800,
            marginTop: 44,
            borderRadius: 18,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,.08)",
            background: "#000",
          }}
        >
          <iframe
            src="/explainer.html"
            title="Come funziona ContactOS"
            loading="lazy"
            allow="autoplay"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
          />
        </div>
        <div className="rs-explainer-fallback" style={{ display: "none", gridTemplateColumns: "1fr", gap: 22, marginTop: 44 }}>
          {[
            ["01", "Colleghi i tuoi canali", "Email, telefono, WhatsApp e form del sito: tutto entra in un unico posto, senza cambiare i tuoi strumenti."],
            ["02", "Il sistema risponde e organizza", "Risposte automatiche immediate, contatti salvati e attività assegnate al team senza sforzo manuale."],
            ["03", "Recuperi i clienti persi", "Chi non risponde viene ricontattato in automatico, al momento giusto, con il messaggio giusto."],
          ].map(([n, title, body]) => (
            <div key={n} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 18, padding: 30 }}>
              <div style={{ fontFamily: "var(--font-archivo)", fontWeight: 800, fontSize: 20, color: "#2f6bff" }}>{n}</div>
              <div style={{ fontWeight: 700, fontSize: 20, marginTop: 14 }}>{title}</div>
              <div style={{ color: "#9aa3b2", fontSize: 15, lineHeight: 1.6, marginTop: 10 }}>{body}</div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* COSA GESTISCE */}
      <Reveal as="section" style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 40px" }}>
        <div id="cosa-gestisce" style={{ color: "#60a5fa", fontSize: 13, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase" }}>
          Cosa gestisce ContactOS
        </div>
        <h2
          style={{
            fontFamily: "var(--font-archivo)",
            fontWeight: 800,
            fontSize: "clamp(32px,4vw,52px)",
            lineHeight: 1.05,
            letterSpacing: "-.02em",
            margin: "14px 0 0",
            maxWidth: 640,
          }}
        >
          Tutto ciò che serve, già pronto
        </h2>
        <div className="rs-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, marginTop: 44 }}>
          {[
            [<ContactsIcon key="i" />, "Gestione contatti", "Ogni cliente salvato con storico completo, note e stato in un'unica scheda."],
            [<ReplyIcon key="i" />, "Risposte automatiche", "Rispondi in pochi secondi a ogni messaggio, anche quando sei impegnato."],
            [<RecoverIcon key="i" />, "Recupero clienti", "Sequenze automatiche per riportare indietro chi non ha ancora risposto."],
            [<DashboardIcon key="i" />, "Dashboard in tempo reale", "I numeri reali della tua attività, sempre aggiornati e facili da leggere."],
          ].map(([icon, title, body], i) => (
            <div key={i} className="rs-card" style={cardStyle}>
              <div style={iconTileStyle}>{icon}</div>
              <div style={{ fontWeight: 700, fontSize: 18, marginTop: 18 }}>{title as string}</div>
              <div style={{ color: "#9aa3b2", fontSize: 14, lineHeight: 1.6, marginTop: 8 }}>{body as string}</div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* VALORI (ex stat band — numeri onesti, nessuna metrica inventata) */}
      <Reveal as="section" style={{ padding: "70px 40px" }}>
        <div
          className="rs-grid-4"
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 24,
            textAlign: "center",
            borderTop: "1px solid rgba(255,255,255,.08)",
            borderBottom: "1px solid rgba(255,255,255,.08)",
            padding: "48px 0",
          }}
        >
          {[
            ["Risposta", "in pochi secondi"],
            ["Attivo", "24 ore su 24"],
            ["Zero", "contatti persi nel weekend"],
            ["Dati", "sempre di tua proprietà"],
          ].map(([big, small]) => (
            <div key={big}>
              <div style={{ fontFamily: "var(--font-archivo)", fontWeight: 800, fontSize: "clamp(26px,3vw,38px)", color: "#fff" }}>{big}</div>
              <div style={{ color: "#9aa3b2", fontSize: 14, marginTop: 6 }}>{small}</div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* PROBLEMA (non più un finto testimonial — nessun cliente/nome inventato) */}
      <Reveal as="section" style={{ maxWidth: 900, margin: "0 auto", padding: "70px 40px", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-archivo)", fontWeight: 700, fontSize: "clamp(26px,3.2vw,40px)", lineHeight: 1.3, letterSpacing: "-.02em" }}>
          &ldquo;Rispondere ai messaggi la sera, quando ormai è tardi, costa clienti. Con ContactOS ogni richiesta
          viene gestita subito, così non se ne perde più nessuna.&rdquo;
        </div>
        <div style={{ color: "#9aa3b2", fontSize: 14, marginTop: 20 }}>
          Il problema che ContactOS risolve per chi gestisce un&apos;attività locale.
        </div>
      </Reveal>

      {/* CTA BAND */}
      <Reveal as="section" style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 40px 100px" }}>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 28,
            border: "1px solid rgba(47,107,255,.3)",
            background: "linear-gradient(180deg,rgba(47,107,255,.14),rgba(47,107,255,.02))",
            padding: "64px 40px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-40%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 700,
              height: 500,
              background: "radial-gradient(circle,rgba(47,107,255,.3),transparent 60%)",
              pointerEvents: "none",
            }}
          />
          <h2
            style={{
              position: "relative",
              fontFamily: "var(--font-archivo)",
              fontWeight: 800,
              fontSize: "clamp(32px,4.2vw,56px)",
              lineHeight: 1.05,
              letterSpacing: "-.025em",
              margin: 0,
            }}
          >
            Pronto a non perdere più un cliente?
          </h2>
          <p style={{ position: "relative", color: "#c7ccd6", fontSize: 16, lineHeight: 1.6, maxWidth: 520, margin: "18px auto 0" }}>
            Prenota una call gratuita. Ti mostriamo come sarebbe il tuo sistema, su misura per la tua attività.
          </p>
          <LeadForm variant="band" fonte="band-email" />
        </div>
      </Reveal>

      <Footer />
    </div>
  );
}
