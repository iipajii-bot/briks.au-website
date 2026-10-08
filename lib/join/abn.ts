// Copied from briks-ops (lib/abn.ts). The ops server re-validates every
// submission with its own copy — keep the two in sync when trades, areas or
// rate items change.
/**
 * Australian Business Number checksum (ABR spec): subtract 1 from the first
 * digit, multiply each digit by its weight, the sum must be divisible by 89.
 * Pure — used by the /join form and /api/join.
 */
const WEIGHTS = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19]

export function abnDigits(raw: string): string {
  return raw.replace(/\D/g, '')
}

export function isValidAbn(raw: string): boolean {
  const d = abnDigits(raw)
  if (!/^\d{11}$/.test(d)) return false
  const sum = [...d].reduce((acc, ch, i) => acc + (i === 0 ? Number(ch) - 1 : Number(ch)) * WEIGHTS[i], 0)
  return sum % 89 === 0
}

/** "12345678901" → "12 345 678 901". Tolerates partial input while typing. */
export function formatAbn(raw: string): string {
  const d = abnDigits(raw).slice(0, 11)
  return [d.slice(0, 2), d.slice(2, 5), d.slice(5, 8), d.slice(8, 11)].filter(Boolean).join(' ')
}
