import { config as loadEnv } from "dotenv";
import { defineConfig, env } from "prisma/config";

// Il CLI Prisma non applica il caricamento automatico .env.local di Next.js:
// carichiamo esplicitamente .env.local (dev) e .env come fallback.
loadEnv({ path: ".env.local" });
loadEnv();

// Usata solo dalla CLI Prisma (`prisma generate`, `prisma migrate`, `prisma db push`),
// mai a runtime dall'app (quella usa lib/prisma.ts con l'adapter Neon + DATABASE_URL
// pooled). Le migrazioni richiedono la connessione diretta (non pooled).
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DIRECT_URL"),
  },
});
