-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('nuovo', 'contattato', 'qualificato', 'cliente', 'perso');

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "nome" TEXT,
    "email" TEXT NOT NULL,
    "telefono" TEXT,
    "messaggio" TEXT,
    "fonte" TEXT NOT NULL,
    "canale" TEXT NOT NULL DEFAULT 'sito',
    "stato" "LeadStatus" NOT NULL DEFAULT 'nuovo',
    "ipHash" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Lead_email_idx" ON "Lead"("email");

-- CreateIndex
CREATE INDEX "Lead_createdAt_idx" ON "Lead"("createdAt");
