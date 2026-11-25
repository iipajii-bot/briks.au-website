/**
 * Personal-link parameters for the segment landing pages (e.g. /for-agencies?agency=Ray%20White&doors=315).
 * Values are rendered as React text (escaped), and are also cleaned here: letters, digits,
 * spaces and &'.- only, max 40 characters. Numbers are clamped.
 */
export type SearchParams = Promise<Record<string, string | string[] | undefined>>

export function cleanText(v: string | string[] | undefined): string {
  const s = Array.isArray(v) ? v[0] : v
  return String(s ?? '')
    .replace(/[^A-Za-z0-9 &'.\-]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 40)
    .trim()
}

export function cleanInt(v: string | string[] | undefined, min: number, max: number): number | null {
  const s = Array.isArray(v) ? v[0] : v
  const n = parseInt(String(s ?? '').replace(/\D/g, '').slice(0, 6), 10)
  if (!Number.isFinite(n) || n < min) return null
  return Math.min(n, max)
}

export function cleanChoice<T extends string>(v: string | string[] | undefined, allowed: ReadonlyArray<T>): T | null {
  const s = (Array.isArray(v) ? v[0] : v) as T | undefined
  return s && allowed.includes(s) ? s : null
}

/** Time-back estimate used on the agency and property-manager pages. */
export const ESTIMATE = { requestsPerDoor: 2.5, minutesPerRequest: 45, hourlyCost: 45 } as const

export function timeBack(doors: number, req: number = ESTIMATE.requestsPerDoor, mins: number = ESTIMATE.minutesPerRequest, rate: number = ESTIMATE.hourlyCost) {
  const requestsYear = doors * req
  const hoursYear = (requestsYear * mins) / 60
  return {
    requestsYear,
    requestsWeek: requestsYear / 52,
    hoursYear,
    hoursWeek: hoursYear / 52,
    costYear: hoursYear * rate,
    daysWeek: hoursYear / 52 / 7.6,
  }
}

export const fmt = (n: number, d = 0) => n.toLocaleString('en-AU', { maximumFractionDigits: d, minimumFractionDigits: d })
