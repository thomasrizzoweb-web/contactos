import type { LeadInput } from "./validation";

/**
 * Inoltra il lead a un Google Apps Script Web App che scrive su un Google Sheet
 * (layer di reporting/CRM leggero). Chiamata SOLO da server, mai dal client:
 * l'URL non è più esposto nel bundle JS come nel sito precedente.
 *
 * Se GOOGLE_SHEETS_WEBHOOK_URL non è configurata, la funzione è no-op.
 */
export async function forwardToSheets(
  lead: LeadInput & { stato?: string }
): Promise<{ sent: boolean; error?: string }> {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) return { sent: false, error: "GOOGLE_SHEETS_WEBHOOK_URL non configurata" };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        email: lead.email,
        nome: lead.nome || "",
        telefono: lead.telefono || "",
        messaggio: lead.messaggio || "",
        canale: "sito",
        fonte: lead.fonte,
        stato: lead.stato || "nuovo",
      }),
      // Best-effort: non deve mai bloccare la risposta all'utente a lungo.
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return { sent: false, error: `HTTP ${res.status}` };
    return { sent: true };
  } catch (err) {
    return { sent: false, error: err instanceof Error ? err.message : "errore invio a Sheets" };
  }
}
