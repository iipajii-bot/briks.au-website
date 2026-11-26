/**
 * Unique per-suburb page copy for /areas/[slug].
 *
 * Written 25 Nov 2026 with DeepSeek (draft) + deepseek-reasoner (fact check), after an LLM-council
 * review of the brief, then lint-checked for banned claims and cross-page duplication.
 * Rules: verified council/postcode/setting only; no invented streets, stats, response times,
 * licences, guarantees, fees or prices.
 */
import data from './suburb-pages.json'

export type SuburbPage = {
  seoTitle: string
  metaDescription: string
  h1: string
  intro: string
  housing: string
  trades: { slug: string; note: string }[]
  issues: { title: string; body: string }[]
  rentals: string
  faqs: { q: string; a: string }[]
}

export const SUBURB_PAGES = data as Record<string, SuburbPage>

export const getSuburbPage = (slug: string): SuburbPage | undefined => SUBURB_PAGES[slug]
