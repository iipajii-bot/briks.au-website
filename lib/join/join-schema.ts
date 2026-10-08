// Copied from briks-ops (lib/join-schema.ts). The ops server re-validates every
// submission with its own copy — keep the two in sync when trades, areas or
// rate items change.
import { z } from 'zod'
import { isValidAbn } from '@/lib/join/abn'
import { normaliseAuMobile } from '@/lib/join/phone'
import { AREA_KEYS, JOBS_PER_WEEK, RESPONSE_TIMES, TRADES, TRADE_KEYS, itemsFor, type TradeKey } from '@/lib/join/rate-card'

/**
 * Validation for the public /join form. Pure: the 'use client' form runs the
 * same validateJoin() step by step and /api/join runs it again — the server
 * never trusts the browser. Unknown trade / area / rate keys are rejected, not
 * ignored.
 */

const MAX_RATE = 100_000
const dp2 = (n: number) => Math.abs(n * 100 - Math.round(n * 100)) < 1e-6
const rate = z
  .number({ error: 'Enter a number' })
  .finite('Enter a number')
  .min(0, 'Cannot be negative')
  .max(MAX_RATE, 'That looks too high')
  .refine(dp2, 'Use at most 2 decimal places')

const optText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Keep it under ${max} characters`)
    .optional()
    .transform((s) => (s ? s : undefined))

const tradeRates = z
  .object({
    hourly: rate,
    callout: rate,
    after_hours: rate.optional(),
    min_charge: rate.optional(),
    items: z.record(z.string().max(40), rate).optional(),
  })
  .strict()

const joinBase = z
  .object({
    name: z.string().trim().min(2, 'Enter your full name').max(120),
    businessName: optText(120),
    phone: z
      .string()
      .trim()
      .max(30)
      .refine((s) => normaliseAuMobile(s) !== null, 'Enter an Australian mobile, like 0412 345 678'),
    email: z
      .string()
      .trim()
      .max(254)
      .refine((s) => s === '' || z.email().safeParse(s).success, 'That email does not look right')
      .optional()
      .transform((s) => (s ? s : undefined)),
    baseSuburb: optText(80),
    areas: z
      .array(z.enum(AREA_KEYS as [string, ...string[]]))
      .min(1, 'Pick at least one area')
      .max(AREA_KEYS.length),
    trades: z
      .array(z.enum(TRADE_KEYS as [string, ...string[]]))
      .min(1, 'Pick at least one trade')
      .max(TRADE_KEYS.length),
    otherTrade: optText(120),
    abn: z.string().trim().max(20).refine(isValidAbn, 'That ABN does not check out — please re-check the 11 digits'),
    gstRegistered: z.boolean({ error: 'Choose yes or no' }),
    licenceNumber: optText(60),
    hasInsurance: z.boolean({ error: 'Choose yes or no' }),
    insuranceCover: z.enum(['5M', '10M', '20M', 'OTHER']).optional(),
    insuranceOther: optText(60),
    insurer: optText(100),
    insuranceExpiry: z
      .string()
      .trim()
      .max(10)
      .optional()
      .transform((s) => (s ? s : undefined)),
    maxJobsPerWeek: z.number({ error: 'Pick one' }).refine((n) => JOBS_PER_WEEK.some((j) => j.value === n), 'Pick one'),
    responseTime: z.enum(RESPONSE_TIMES.map((r) => r.key) as [string, ...string[]], { error: 'Pick one' }),
    rates: z.record(z.string(), tradeRates),
    ratesNote: optText(1000),
    agree: z.literal(true, { error: 'Please tick the box to confirm' }),
    /** ms epoch when the form loaded — the server rejects instant submits. */
    startedAt: z.number().int().optional(),
    company_website: z.string().max(200).optional(), // honeypot
  })
  .strict()

export type JoinData = z.output<typeof joinBase>

type Issue = { path: PropertyKey[]; message: string }

/**
 * Rules that span fields (licence needed for licensed trades, insurance
 * details, rates for exactly the ticked trades). Runs on the RAW input,
 * independently of the field schema, so the wizard can report one step's
 * conditional errors even while later steps are still empty.
 */
function crossIssues(raw: unknown): Issue[] {
  const out: Issue[] = []
  const v = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>
  const trades = Array.isArray(v.trades) ? (v.trades.filter((t) => typeof t === 'string') as string[]) : []
  const tradeSet = new Set(trades)
  if (tradeSet.size !== trades.length) out.push({ path: ['trades'], message: 'Duplicate trades' })
  const str = (x: unknown) => (typeof x === 'string' ? x.trim() : '')

  const licensed = TRADES.filter((t) => t.licensed && tradeSet.has(t.key))
  if (licensed.length && !str(v.licenceNumber)) {
    out.push({ path: ['licenceNumber'], message: `Licence number needed for ${licensed.map((t) => t.label).join(', ')}` })
  }

  if (v.hasInsurance === true) {
    const cover = str(v.insuranceCover)
    if (!cover) out.push({ path: ['insuranceCover'], message: 'Choose your cover amount' })
    if (cover === 'OTHER' && !str(v.insuranceOther)) out.push({ path: ['insuranceOther'], message: 'Tell us the cover amount' })
    if (!str(v.insurer)) out.push({ path: ['insurer'], message: 'Who is the insurer?' })
    const exp = str(v.insuranceExpiry)
    if (!exp) out.push({ path: ['insuranceExpiry'], message: 'When does the policy expire?' })
    else if (!/^\d{4}-\d{2}-\d{2}$/.test(exp) || Number.isNaN(new Date(exp).getTime()))
      out.push({ path: ['insuranceExpiry'], message: 'Enter a valid date' })
    else if (exp < new Date().toISOString().slice(0, 10)) out.push({ path: ['insuranceExpiry'], message: 'That date has already passed' })
  }

  // Rates: exactly the ticked trades, hourly + callout each, only known item keys.
  const rates = (v.rates && typeof v.rates === 'object' ? v.rates : {}) as Record<string, Record<string, unknown> | undefined>
  for (const key of Object.keys(rates)) {
    if (!tradeSet.has(key)) out.push({ path: ['rates', key], message: 'Rates for a trade you did not pick' })
  }
  for (const key of trades) {
    const r = rates[key]
    if (!r || typeof r !== 'object') {
      out.push({ path: ['rates', key, 'hourly'], message: 'Enter your hourly rate' })
      out.push({ path: ['rates', key, 'callout'], message: 'Enter your call-out fee' })
      continue
    }
    if (!TRADE_KEYS.includes(key as TradeKey)) continue
    const known = new Set(itemsFor(key as TradeKey).map((i) => i.key))
    const items = (r.items && typeof r.items === 'object' ? r.items : {}) as Record<string, unknown>
    for (const k of Object.keys(items)) if (!known.has(k)) out.push({ path: ['rates', key, 'items', k], message: 'Unknown item' })
  }
  return out
}

/** Issues → { 'rates.PLUMBER.hourly': 'Enter a number', name: '…' } (first message per field). */
function toErrors(issues: Issue[]): Record<string, string> {
  const out: Record<string, string> = {}
  for (const i of issues) {
    const k = i.path.map(String).join('.') || 'form'
    if (!(k in out)) out[k] = i.message
  }
  return out
}

export function validateJoin(input: unknown): { ok: true; data: JoinData } | { ok: false; errors: Record<string, string> } {
  const parsed = joinBase.safeParse(input)
  const errors = toErrors([...(parsed.success ? [] : (parsed.error.issues as Issue[])), ...crossIssues(input)])
  if (!parsed.success || Object.keys(errors).length) return { ok: false, errors }
  return { ok: true, data: parsed.data }
}

/** Which field keys belong to which wizard step (matched by first path segment). */
export const STEP_FIELDS: Record<number, string[]> = {
  1: ['name', 'businessName', 'phone', 'email', 'baseSuburb', 'areas'],
  2: ['trades', 'otherTrade'],
  3: ['abn', 'gstRegistered', 'licenceNumber', 'hasInsurance', 'insuranceCover', 'insuranceOther', 'insurer', 'insuranceExpiry', 'maxJobsPerWeek', 'responseTime'],
  4: ['rates', 'ratesNote'],
  5: ['agree'],
}

export function errorsForStep(step: number, errors: Record<string, string>): Record<string, string> {
  const fields = STEP_FIELDS[step] ?? []
  const out: Record<string, string> = {}
  for (const [k, v] of Object.entries(errors)) if (fields.includes(k.split('.')[0])) out[k] = v
  return out
}
