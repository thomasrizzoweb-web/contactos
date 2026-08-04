import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import LeadForm from "@/components/LeadForm";
import GlobeCanvas from "@/components/GlobeCanvas";
import StreaksCanvas from "@/components/StreaksCanvas";
import Footer from "@/components/Footer";
import { InstagramIcon, DotsNetworkIcon, GoogleIcon, FormIcon, CrmIcon, AutomationIcon, DashboardIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Soluzioni — ContactOS",
  description: "Scopri il sistema operativo aziendale di nuova generazione per attività locali: CRM su misura, automazioni intelligenti, dashboard unica.",
  alternates: { canonical: "/soluzioni" },
};

const cardStyle: CSSProperties = {
  background: "rgba(255,255,255,.04)",
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: 18,
  padding: 28,
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

const faqItems: [string, string][] = [
  ["Devo cambiare i miei strumenti attuali?", "No. ContactOS si collega ai canali che usi già — email, telefono, WhatsApp e form — senza stravolgere il tuo lavoro."],
  ["Quanto tempo serve per partire?", "In genere il sistema è pronto e testato in pochi giorni. Ci occupiamo noi della configurazione su misura."],
  ["Funziona per la mia attività?", "Se ricevi contatti e non vuoi perderli, sì. Lavoriamo con barbieri, ristoranti, studi, palestre ed e-commerce locali."],
  ["I miei dati sono al sicuro?", "Sì. I dati dei tuoi clienti sono gestiti nel rispetto del GDPR e restano sempre di tua proprietà."],
];

export default function SoluzioniPage() {
  return (
    <div id="page-solutions">
      <section className="rs-hero-solutions" style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "180px 40px 60px" }}>
        <Reveal
          as="h1"
          style={{
            fontFamily: "var(--font-archivo)",
            fontWeight: 800,
            fontSize: "clamp(48px,6.5vw,90px)",
            lineHeight: 1.03,
            letterSpacing: "-.03em",
            textAlign: "center",
            maxWidth: 1100,
            margin: 0,
          }}
        >
          Scopri il sistema operativo aziendale di nuova generazione.
        </Reveal>
      </section>

      <section className="rs-grid-2" style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
        <Reveal>
          <h2
            style={{
              fontFamily: "var(--font-archivo)",
              fontWeight: 800,
              fontSize: "clamp(40px,4.6vw,60px)",
              lineHeight: 1.04,
              letterSpacing: "-.025em",
              margin: 0,
            }}
          >
            Il sistema che ogni
            <br />
            attività locale
            <br />
            stava aspettando.
          </h2>
          <p style={{ color: "#9aa3b2", fontSize: 16, lineHeight: 1.7, maxWidth: 440, margin: "26px 0 0" }}>
            Costruiamo il sistema che gestisce i tuoi contatti, risponde in automatico e recupera i clienti persi,
            disegnato su misura con te. E ti diamo un&apos;unica dashboard con i tuoi numeri reali, così la tua
            attività gira ordinata come il tuo lavoro.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 22, marginTop: 32 }}>
            <Link
              href="#parliamo"
              className="cta-pill"
              style={{
                border: "none",
                cursor: "pointer",
                background: "linear-gradient(135deg,#4f8bff,#1e5fff)",
                color: "#fff",
                fontFamily: "inherit",
                fontWeight: 700,
                fontSize: 15,
                padding: "15px 28px",
                borderRadius: 999,
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Prenota una consulenza gratuita →
            </Link>
            <Link href="/#cosa-gestisce" style={{ fontWeight: 600, fontSize: 15 }}>
              Guarda cosa gestisce →
            </Link>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 30 }}>
            <div style={{ fontSize: 14, color: "#9aa3b2" }}>Sistema costruito su misura con te, non un software preconfezionato.</div>
          </div>
        </Reveal>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <GlobeCanvas />
        </div>
      </section>

      <section style={{ position: "relative", minHeight: "88vh", overflow: "hidden", background: "#050608", display: "flex", alignItems: "center" }}>
        <StreaksCanvas />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 150,
            background: "#000",
            clipPath:
              "polygon(0 55%, 6% 55%, 6% 30%, 12% 30%, 12% 55%, 20% 55%, 20% 18%, 27% 18%, 27% 55%, 35% 55%, 35% 40%, 41% 40%, 41% 25%, 48% 25%, 48% 55%, 56% 55%, 56% 10%, 63% 10%, 63% 55%, 71% 55%, 71% 33%, 78% 33%, 78% 48%, 85% 48%, 85% 22%, 92% 22%, 92% 55%, 100% 55%, 100% 100%, 0 100%)",
          }}
        />
        <Reveal style={{ position: "relative", zIndex: 2, maxWidth: 640, margin: "0 auto", padding: "60px 40px", textAlign: "left" }}>
          <h2
            style={{
              fontFamily: "var(--font-archivo)",
              fontWeight: 800,
              fontSize: "clamp(38px,4.6vw,60px)",
              lineHeight: 1.05,
              letterSpacing: "-.025em",
              margin: 0,
            }}
          >
            Sistemi intelligenti per{" "}
            <span
              style={{
                display: "inline-block",
                background: "#2f6bff",
                color: "#fff",
                padding: "6px 16px 12px",
                borderRadius: 4,
                marginTop: 8,
                transform: "rotate(-2.5deg)",
                transformOrigin: "left center",
              }}
            >
              chi fa sul serio
            </span>
          </h2>
          <p style={{ color: "#c7ccd6", fontSize: 16, lineHeight: 1.7, maxWidth: 520, margin: "26px 0 0" }}>
            Basta gestire strumenti scollegati. Costruiamo un sistema unico e intelligente che automatizza la
            gestione dei contatti, i flussi di lavoro e le risposte, così cresci senza caos.
          </p>
          <Link
            href="#parliamo"
            className="cta-pill"
            style={{
              border: "none",
              cursor: "pointer",
              background: "linear-gradient(135deg,#4f8bff,#1e5fff)",
              color: "#fff",
              fontFamily: "inherit",
              fontWeight: 700,
              fontSize: 15,
              padding: "15px 28px",
              borderRadius: 999,
              marginTop: 30,
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Parliamo della tua attività →
          </Link>
        </Reveal>
      </section>

      <section className="rs-grid-2" style={{ maxWidth: 1200, margin: "0 auto", padding: "120px 40px", display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 40, alignItems: "center" }}>
        <Reveal>
          <div style={{ fontFamily: "var(--font-archivo)", fontWeight: 800, fontSize: "clamp(44px,5.4vw,76px)", lineHeight: 1.03, letterSpacing: "-.03em" }}>
            La tua attività perde clienti,
          </div>
          <div
            style={{
              display: "inline-block",
              background: "#13234d",
              color: "#7ea9ff",
              fontFamily: "var(--font-archivo)",
              fontWeight: 800,
              fontSize: "clamp(40px,5vw,72px)",
              lineHeight: 1.12,
              letterSpacing: "-.03em",
              padding: "10px 22px 16px",
              borderRadius: 4,
              marginTop: 16,
              transform: "rotate(-2.5deg)",
              transformOrigin: "left center",
            }}
          >
            ma non te ne accorgi
          </div>
        </Reveal>
        <div className="rs-mascot-box" style={{ position: "relative", height: 420 }}>
          <div style={{ position: "absolute", top: "6%", right: "6%", animation: "floaty2 6.5s ease-in-out infinite .2s" }}>
            <InstagramIcon gradId="iggs" />
          </div>
          <div style={{ position: "absolute", top: "14%", left: "2%", animation: "floaty 6s ease-in-out infinite" }}>
            <DotsNetworkIcon />
          </div>
          <div style={{ position: "absolute", bottom: "10%", right: 0, animation: "floaty2 7s ease-in-out infinite .4s" }}>
            <GoogleIcon size={46} />
          </div>
          <div style={{ position: "absolute", bottom: "22%", left: "14%", animation: "floaty 5.5s ease-in-out infinite .6s" }}>
            <FormIcon />
          </div>
        </div>
      </section>

      <Reveal as="section" style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px" }}>
        <div style={{ color: "#60a5fa", fontSize: 13, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase" }}>Cosa costruiamo</div>
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
          Un sistema unico, cucito sulla tua attività
        </h2>
        <div className="rs-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginTop: 44 }}>
          {[
            [<CrmIcon key="i" />, "CRM su misura", "Un gestionale disegnato sui tuoi flussi reali, non un software generico da adattare."],
            [<AutomationIcon key="i" />, "Automazioni intelligenti", "Risposte, promemoria e follow-up che partono da soli, al momento giusto."],
            [<DashboardIcon key="i" />, "Dashboard unica", "Tutti i tuoi numeri in un posto solo: contatti, risposte, clienti recuperati."],
          ].map(([icon, title, body], i) => (
            <div key={i} className="rs-card" style={cardStyle}>
              <div style={iconTileStyle}>{icon}</div>
              <div style={{ fontWeight: 700, fontSize: 19, marginTop: 18 }}>{title as string}</div>
              <div style={{ color: "#9aa3b2", fontSize: 15, lineHeight: 1.6, marginTop: 8 }}>{body as string}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 40px 80px" }}>
        <div style={{ color: "#60a5fa", fontSize: 13, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase" }}>
          Perché ContactOS
        </div>
        <h2
          style={{
            fontFamily: "var(--font-archivo)",
            fontWeight: 800,
            fontSize: "clamp(32px,4vw,52px)",
            lineHeight: 1.05,
            letterSpacing: "-.02em",
            margin: "14px 0 0",
            maxWidth: 700,
          }}
        >
          Non un altro CRM da imparare. Un sistema che lavora al posto tuo.
        </h2>
        <div className="rs-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, marginTop: 44 }}>
          {[
            ["Su misura, non adattato", "Non parti da un software generico da configurare per mesi: il sistema nasce sui flussi reali della tua attività, fin dal primo giorno."],
            ["I tuoi dati restano tuoi", "Nessun vendor lock-in, nessuna piattaforma terza che rivende o trattiene i contatti dei tuoi clienti."],
            ["Operativo in pochi giorni", "Niente mesi di onboarding: consulenza, configurazione, sistema attivo. Lo vedi funzionare quasi subito."],
            ["Parli con chi lo costruisce", "Nessun ticket, nessun call center: hai un referente diretto che conosce il tuo sistema a memoria."],
          ].map(([title, body]) => (
            <div key={title} className="rs-card" style={cardStyle}>
              <div style={{ fontWeight: 700, fontSize: 18 }}>{title}</div>
              <div style={{ color: "#9aa3b2", fontSize: 14, lineHeight: 1.6, marginTop: 8 }}>{body}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" style={{ maxWidth: 900, margin: "0 auto", padding: "80px 40px" }}>
        <h2
          style={{
            fontFamily: "var(--font-archivo)",
            fontWeight: 800,
            fontSize: "clamp(30px,3.6vw,46px)",
            lineHeight: 1.05,
            letterSpacing: "-.02em",
            margin: "0 0 36px",
            textAlign: "center",
          }}
        >
          Domande frequenti
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {faqItems.map(([q, a]) => (
            <div key={q} className="rs-card" style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 16, padding: "24px 26px" }}>
              <div style={{ fontWeight: 700, fontSize: 17 }}>{q}</div>
              <div style={{ color: "#9aa3b2", fontSize: 15, lineHeight: 1.6, marginTop: 8 }}>{a}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" id="parliamo" style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 40px 100px", scrollMarginTop: 40 }}>
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
            Parliamo della tua attività
          </h2>
          <p style={{ position: "relative", color: "#c7ccd6", fontSize: 16, lineHeight: 1.6, maxWidth: 520, margin: "18px auto 0" }}>
            Una consulenza gratuita di 20 minuti per capire se e come ContactOS può aiutarti. Ti rispondiamo
            entro 24 ore, senza impegno.
          </p>
          <LeadForm variant="band" fonte="solutions-cta-email" />
        </div>
      </Reveal>

      <Footer />
    </div>
  );
}
