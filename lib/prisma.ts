import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Singleton Prisma Client — evita di aprire troppe connessioni in dev
// (Next.js ricarica i moduli ad ogni hot-reload). Prisma 7 richiede un
// driver adapter esplicito: usiamo @prisma/adapter-pg (driver Postgres
// standard via `pg`, compatibile con qualsiasi Postgres — Supabase, Neon,
// RDS, ecc.) con DATABASE_URL pooled (pgbouncer).
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    // Nessun DB configurato: il client verrà creato ma ogni query fallirà
    // in modo controllato — app/api/lead/route.ts intercetta l'errore e
    // non blocca l'invio del lead (fallback email/Sheets).
    const adapter = new PrismaPg({ connectionString: "postgresql://unconfigured/unconfigured" });
    return new PrismaClient({ adapter });
  }
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
