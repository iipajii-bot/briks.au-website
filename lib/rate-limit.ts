import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { headers } from 'next/headers'

/**
 * Rate-limit for public form Server Actions.
 *
 * Uses Upstash Redis sliding-window — works on serverless because state lives
 * outside the worker. When Upstash env vars are not configured (e.g. local
 * dev), `check()` becomes a no-op so the form still works.
 *
 * Env vars (set in Vercel project settings):
 *   UPSTASH_REDIS_REST_URL
 *   UPSTASH_REDIS_REST_TOKEN
 *
 * Limit: 5 requests per 10 minutes per IP per action key.
 */

const url = process.env.UPSTASH_REDIS_REST_URL
const token = process.env.UPSTASH_REDIS_REST_TOKEN

const limiter =
  url && token
    ? new Ratelimit({
        redis: new Redis({ url, token }),
        limiter: Ratelimit.slidingWindow(5, '10 m'),
        analytics: false,
        prefix: 'briks-form',
      })
    : null

/**
 * Returns { ok: true } when allowed, { ok: false, retryAfterMs } when rate-limited.
 * No-op (returns { ok: true }) when Upstash not configured.
 */
export async function checkRateLimit(actionKey: string): Promise<
  { ok: true } | { ok: false; retryAfterMs: number }
> {
  if (!limiter) return { ok: true }

  // Vercel sets x-forwarded-for; fall back to a literal so the limiter still
  // works behind unexpected proxies (everyone shares the same bucket — fine
  // for low-volume form abuse).
  const hdrs = await headers()
  const ip =
    hdrs.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    hdrs.get('x-real-ip') ||
    'anonymous'

  const result = await limiter.limit(`${actionKey}:${ip}`)
  if (result.success) return { ok: true }
  return { ok: false, retryAfterMs: Math.max(0, result.reset - Date.now()) }
}
