import { config as loadEnv } from "dotenv";
import { defineConfig } from "prisma/config";

// Il CLI Prisma non applica il caricamento automatico .env.local di Next.js:
// carichiamo esplicitamente .env.local (dev) e .env come fallback.
loadEnv({ path: ".env.local" });
loadEnv();

// Fallback a un valore placeholder se DIRECT_URL/DATABASE_URL non sono ancora
// configurate (es. build su Vercel prima che Thomas colleghi Neon): `prisma
// generate` non apre connessioni reali, quindi non deve fallire per questo.
// `prisma migrate`/`db push` invece richiedono una DIRECT_URL vera.
const datasourceUrl =
  process.env.DIRECT_URL ||
  process.env.DATABASE_URL ||
  "postgresql://unconfigured:unconfigured@localhost:5432/unconfigured";

// Usata solo dalla CLI Prisma (`prisma generate`, `prisma migrate`, `prisma db push`),
// mai a runtime dall'app (quella usa lib/prisma.ts con l'adapter pg + DATABASE_URL
// pooled). Le migrazioni richiedono la connessione diretta (non pooled).
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: datasourceUrl,
  },
});
