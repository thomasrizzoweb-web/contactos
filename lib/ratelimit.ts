import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Rate limit per IP sul form lead (Upstash Redis free tier, no carta richiesta).
 * Se le env var non sono configurate, il rate limiter è disattivato
 * (nessun blocco) invece di far crashare l'endpoint — degrado
 * controllato finché Thomas non collega Upstash.
 */
let ratelimit: Ratelimit | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "60 s"),
    prefix: "contactos:lead",
    analytics: false,
  });
}

export async function checkRateLimit(
  identifier: string
): Promise<{ ok: true } | { ok: false; retryAfterSeconds: number }> {
  if (!ratelimit) return { ok: true };

  const result = await ratelimit.limit(identifier);
  if (result.success) return { ok: true };

  const retryAfterSeconds = Math.max(1, Math.ceil((result.reset - Date.now()) / 1000));
  return { ok: false, retryAfterSeconds };
}

export const isRateLimitConfigured = () => ratelimit !== null;
