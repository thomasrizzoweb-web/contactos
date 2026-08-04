/**
 * Verifica opzionale reCAPTCHA v3 (Google, free, richiede solo un account
 * Google — no carta). Se RECAPTCHA_SECRET_KEY non è configurata, la verifica
 * è saltata: honeypot + rate limit restano comunque attivi come difesa
 * anti-spam di base.
 */
export async function verifyRecaptcha(token: string | undefined): Promise<{ ok: boolean; skipped: boolean }> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return { ok: true, skipped: true };
  if (!token) return { ok: false, skipped: false };

  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
      signal: AbortSignal.timeout(5000),
    });
    const data = (await res.json()) as { success: boolean; score?: number };
    const minScore = Number(process.env.RECAPTCHA_MIN_SCORE || 0.5);
    const ok = data.success && (data.score === undefined || data.score >= minScore);
    return { ok, skipped: false };
  } catch {
    // In caso di errore di rete verso Google, non blocchiamo il lead:
    // honeypot + rate limit restano come rete di sicurezza.
    return { ok: true, skipped: true };
  }
}
