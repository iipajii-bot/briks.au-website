/** Small helpers so every page ships a title and description Google shows in full. */

/** Trim to <= max chars at a sentence end, else at a word boundary. */
export function metaDesc(s: string, max = 158): string {
  const t = s.replace(/\s+/g, ' ').trim()
  if (t.length <= max) return t
  const cut = t.slice(0, max)
  const end = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('? '))
  if (end > 90) return cut.slice(0, end + 1)
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:]$/, '') + '.'
}

/** Add the brand when it fits in ~60 chars and is not already there. */
export function brandTitle(t: string, max = 60): string {
  if (/briks/i.test(t)) return t
  const withBrand = `${t} | Briks`
  return withBrand.length <= max ? withBrand : t
}
