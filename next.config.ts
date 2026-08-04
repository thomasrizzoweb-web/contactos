import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// CSP senza nonce (pagine statiche/ISR restano cacheable). 'unsafe-inline' su
// style-src è necessario perché il design è portato 1:1 dal sito originale
// con stili inline; script-src NON ha 'unsafe-inline' — solo domini Google
// espliciti, usati unicamente se in futuro si attiva reCAPTCHA v3 lato client.
const cspHeader = `
  default-src 'self';
  script-src 'self' https://www.google.com https://www.gstatic.com${isDev ? " 'unsafe-eval'" : ""};
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
