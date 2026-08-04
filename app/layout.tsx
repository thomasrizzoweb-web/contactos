import type { Metadata } from "next";
import { Archivo, Plus_Jakarta_Sans } from "next/font/google";
import Nav from "@/components/Nav";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const siteUrl = "https://contactos-dusky.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "ContactOS — Sistemi digitali su misura per attività locali",
  description:
    "ContactOS costruisce sistemi digitali su misura per attività locali: risposte automatiche, gestione contatti e recupero clienti persi, senza cambiare gli strumenti che usi già.",
  alternates: { canonical: "/" },
  icons: { icon: "/contactos_logo.png" },
  openGraph: {
    type: "website",
    title: "ContactOS — Sistemi digitali su misura per attività locali",
    description: "Basta clienti persi mentre lavori. Un sistema che risponde, salva e ricontatta i tuoi clienti in automatico.",
    images: ["/contactos_logo.png"],
    url: siteUrl,
  },
  twitter: {
    card: "summary",
    title: "ContactOS — Sistemi digitali su misura per attività locali",
    description: "Basta clienti persi mentre lavori. Un sistema che risponde, salva e ricontatta i tuoi clienti in automatico.",
    images: ["/contactos_logo.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="it" className={`${archivo.variable} ${plusJakarta.variable}`}>
      <body
        style={{
          background: "#000",
          color: "#fff",
          fontFamily: "var(--font-jakarta), sans-serif",
          overflowX: "hidden",
          position: "relative",
        }}
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}
