import { z } from "zod";

/**
 * Schema di validazione per il form lead ("Prenota una call").
 * Il form pubblico raccoglie solo l'email (fedele al design originale),
 * ma lo schema supporta nome/telefono/messaggio per uso futuro (CRM/API).
 *
 * `honeypot` deve arrivare sempre vuoto: è un campo invisibile nel form,
 * i bot che compilano tutti i campi lo riempiono e vengono scartati.
 */
export const leadSchema = z.object({
  email: z
    .string()
    .trim()
    .min(3, "Email troppo corta")
    .max(254, "Email troppo lunga")
    .email("Email non valida"),
  nome: z.string().trim().max(120).optional().or(z.literal("")),
  telefono: z
    .string()
    .trim()
    .max(30)
    .regex(/^[0-9+\s()-]*$/, "Telefono non valido")
    .optional()
    .or(z.literal("")),
  messaggio: z.string().trim().max(2000).optional().or(z.literal("")),
  fonte: z.string().trim().min(1).max(60),
  // Nessun vincolo di lunghezza qui: un bot che compila il campo deve
  // passare la validazione e arrivare al controllo esplicito in
  // app/api/lead/route.ts, che risponde "ok" senza salvare nulla — così
  // non riceve un errore che gli riveli la tecnica anti-spam.
  honeypot: z.string().max(200).optional().or(z.literal("")),
  recaptchaToken: z.string().max(4096).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

/** Rimuove tag HTML e spazi superflui da input testuali liberi. */
export function sanitizeText(value: string | undefined | null): string | undefined {
  if (!value) return undefined;
  const stripped = value.replace(/<[^>]*>/g, "").trim();
  return stripped.length ? stripped : undefined;
}
