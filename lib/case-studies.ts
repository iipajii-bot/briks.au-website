// Case studies — narrative-style writeups of real Briks jobs.
// ONLY add entries for real, completed jobs with customer permission.
// Section + index page hide gracefully when list empty.

export type CaseStudy = {
  slug: string
  title: string
  subtitle: string
  trade: string
  trades?: string[]
  suburb: string
  duration?: string
  jobValue?: string
  responseTime?: string
  publishedAt: string // ISO
  hero: string
  beforeAfter?: { before: string; after: string }
  body: string
  outcome: string
  testimonial?: { quote: string; author: string; role: string }
}

export const CASE_STUDIES: CaseStudy[] = []

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug)
}
