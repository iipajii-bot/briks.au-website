// Copied from briks-ops (lib/phone.ts). The ops server re-validates every
// submission with its own copy — keep the two in sync when trades, areas or
// rate items change.
/**
 * Australian mobile helpers. Pure (no db, no network) so public routes and the
 * SMS relay can both use them without the public code importing the relay.
 */

/** Australian mobile → E.164 (+614XXXXXXXX). Anything else is refused. */
export function normaliseAuMobile(raw: string): string | null {
  const d = raw.replace(/[^\d+]/g, '')
  let m: RegExpExecArray | null
  if ((m = /^\+?614(\d{8})$/.exec(d))) return `+614${m[1]}`
  if ((m = /^04(\d{8})$/.exec(d))) return `+614${m[1]}`
  return null
}

export function displayPhone(e164: string): string {
  const m = /^\+614(\d{2})(\d{3})(\d{3})$/.exec(e164)
  return m ? `04${m[1]} ${m[2]} ${m[3]}` : e164
}

/** tel: href for any AU number as typed or stored. */
export function telHref(raw: string): string {
  return `tel:${raw.replace(/[^\d+]/g, '')}`
}
