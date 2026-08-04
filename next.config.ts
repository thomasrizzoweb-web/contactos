import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// CSP senza nonce (pagine statiche/ISR restano cacheable). 'unsafe-inline' su
// script-src è necessario: senza nonce, Next.js inietta lo stream RSC/hydration
// (self.__next_f / self.__next_r) come <script> inline nell'HTML — bloccarli con
// CSP fa fallire silenziosamente l'idratazione (pagina statica ma zero JS attivo,
// bug reale riscontrato in produzione). Vedi guida ufficiale Next.js su CSP
// "Without Nonces". Stesso discorso per style-src (stili inline nel design).
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com${isDev ? " 'unsafe-eval'" : ""};
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob:;
  font-src 'self' data:;
  connect-src 'self' https://www.google.com;
  frame-src 'self' https://www.google.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, " ")
  .trim();

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: cspHeader },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },
};

export default nextConfig;
