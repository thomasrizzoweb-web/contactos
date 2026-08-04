import { NextRequest, NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { leadSchema, sanitizeText } from "@/lib/validation";
import { prisma } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/ratelimit";
import { sendLeadNotification } from "@/lib/notify-email";
import { forwardToSheets } from "@/lib/sheets";
import { verifyRecaptcha } from "@/lib/recaptcha";

export const dynamic = "force-dynamic";

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}

function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT || "contactos";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Richiesta non valida." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Dati non validi." }, { status: 400 });
  }
  const data = parsed.data;

  // Honeypot: campo invisibile nel form, i bot lo compilano.
  // Rispondiamo comunque "ok" per non rivelare la tecnica anti-spam.
  if (data.honeypot) {
    return NextResponse.json({ ok: true });
  }

  const ip = getClientIp(req);
  const rate = await checkRateLimit(ip);
  if (!rate.ok) {
    return NextResponse.json(
      { ok: false, error: "Troppe richieste. Riprova tra qualche minuto." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSeconds) } }
    );
  }

  const recaptcha = await verifyRecaptcha(data.recaptchaToken);
  if (!recaptcha.ok) {
    return NextResponse.json({ ok: false, error: "Verifica anti-spam fallita." }, { status: 400 });
  }

  const lead = {
    email: data.email.toLowerCase(),
    nome: sanitizeText(data.nome),
    telefono: sanitizeText(data.telefono),
    messaggio: sanitizeText(data.messaggio),
    fonte: data.fonte,
  };

  let savedToDb = false;
  try {
    await prisma.lead.create({
      data: {
        email: lead.email,
        nome: lead.nome,
        telefono: lead.telefono,
        messaggio: lead.messaggio,
        fonte: lead.fonte,
        ipHash: hashIp(ip),
        userAgent: req.headers.get("user-agent")?.slice(0, 300) || null,
      },
    });
    savedToDb = true;
  } catch (err) {
    console.error("[lead] errore salvataggio DB:", err);
  }

  // Notifica email e Sheets sono "best effort": non devono far fallire
  // la risposta all'utente se il lead è già salvato o se almeno un canale riesce.
  const [emailResult, sheetsResult] = await Promise.all([
    sendLeadNotification(lead),
    forwardToSheets(lead),
  ]);

  // Log minimo per osservabilità: solo il messaggio d'errore (mai token/secret,
  // notify-email.ts e sheets.ts restituiscono `error.message`, non le credenziali).
  if (!emailResult.sent && emailResult.error) {
    console.error("[lead] notifica email non inviata:", emailResult.error);
  }
  if (!sheetsResult.sent && sheetsResult.error) {
    console.error("[lead] inoltro a Sheets non riuscito:", sheetsResult.error);
  }

  if (!savedToDb && !emailResult.sent && !sheetsResult.sent) {
    return NextResponse.json(
      { ok: false, error: "Errore invio. Riprova o scrivi a thomasrizzo.web@gmail.com" },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
