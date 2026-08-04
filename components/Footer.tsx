import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,.08)", padding: "56px 40px 40px" }}>
      <div
        className="rs-footer-row"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Image src="/contactos_logo.png" alt="ContactOS" width={28} height={28} style={{ height: 28, width: "auto", display: "block" }} />
          <span style={{ fontFamily: "var(--font-archivo)", fontWeight: 800, fontSize: 20 }}>ContactOS</span>
        </div>
        <div className="rs-tagline" style={{ color: "#7b828f", fontSize: 14, lineHeight: 1.6, maxWidth: 340, textAlign: "right" }}>
          Sistemi operativi su misura per attività locali. Nessun cliente perso, mai più.
        </div>
      </div>
      <div
        style={{
          maxWidth: 1200,
          margin: "32px auto 0",
          borderTop: "1px solid rgba(255,255,255,.06)",
          paddingTop: 24,
          color: "#52585f",
          fontSize: 13,
        }}
      >
        © 2026 ContactOS · Sistemi operativi su misura per attività locali. ·{" "}
        <Link href="/privacy" style={{ color: "#7a8290" }}>
          Privacy Policy
        </Link>{" "}
        ·{" "}
        <Link href="/cookie-policy" style={{ color: "#7a8290" }}>
          Cookie Policy
        </Link>
      </div>
    </footer>
  );
}
