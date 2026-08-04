import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

// Singleton Prisma Client — evita di aprire troppe connessioni in dev
// (Next.js ricarica i moduli ad ogni hot-reload). Prisma 7 richiede un
// driver adapter esplicito: usiamo @prisma/adapter-neon (connessione HTTP/WS,
// adatta a funzioni serverless Vercel) con DATABASE_URL pooled.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    // Nessun DB configurato: il client verrà creato ma ogni query fallirà
    // in modo controllato — app/api/lead/route.ts intercetta l'errore e
    // non blocca l'invio del lead (fallback email/Sheets).
    const adapter = new PrismaNeon({ connectionString: "postgresql://unconfigured/unconfigured" });
    return new PrismaClient({ adapter });
  }
  const adapter = new PrismaNeon({ connectionString });
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
