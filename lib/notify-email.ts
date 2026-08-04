import { Resend } from "resend";
import type { LeadInput } from "./validation";

/**
 * Notifica via email di un nuovo lead (Resend free tier — 3k email/mese, no carta).
 * Se RESEND_API_KEY non è configurata, la funzione non fa nulla e ritorna
 * `sent: false` senza lanciare eccezioni: l'endpoint /api/lead resta
 * funzionante (salva comunque su DB) anche prima che Thomas colleghi Resend.
 */
export async function sendLeadNotification(
  lead: LeadInput & { id?: string }
): Promise<{ sent: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFICATION_EMAIL || "thomasrizzo.web@gmail.com";
  const from = process.env.RESEND_FROM_EMAIL || "ContactOS <onboarding@resend.dev>";

  if (!apiKey) {
    return { sent: false, error: "RESEND_API_KEY non configurata" };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      subject: "Nuova richiesta consulenza — ContactOS",
      html: `
        <h2>Nuovo lead dal sito ContactOS</h2>
        <table cellpadding="6" cellspacing="0" border="0">
          <tr><td><b>Email</b></td><td>${escapeHtml(lead.email)}</td></tr>
          ${lead.nome ? `<tr><td><b>Nome</b></td><td>${escapeHtml(lead.nome)}</td></tr>` : ""}
          ${lead.telefono ? `<tr><td><b>Telefono</b></td><td>${escapeHtml(lead.telefono)}</td></tr>` : ""}
          ${lead.messaggio ? `<tr><td><b>Messaggio</b></td><td>${escapeHtml(lead.messaggio)}</td></tr>` : ""}
          <tr><td><b>Fonte</b></td><td>${escapeHtml(lead.fonte)}</td></tr>
        </table>
      `,
    });

    if (error) {
      return { sent: false, error: error.message };
    }
    return { sent: true };
  } catch (err) {
    return { sent: false, error: err instanceof Error ? err.message : "errore invio email" };
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
