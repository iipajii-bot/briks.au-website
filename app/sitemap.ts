import type { MetadataRoute } from 'next'
import { SITE, SERVICES } from '@/lib/constants'
import { CASE_STUDIES } from '@/lib/case-studies'
import { TRADES } from '@/lib/trades'
import { SUBURB_CONTENT } from '@/lib/suburb-content'
import { BLOG_POSTS } from '@/lib/blog-posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const core: MetadataRoute.Sitemap = [
    { url: SITE.url, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE.url}/renovations`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE.url}/maintenance`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE.url}/handyman`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE.url}/emergency`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE.url}/for-homeowners`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE.url}/for-landlords`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE.url}/for-property-managers`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE.url}/for-businesses`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE.url}/how-it-works`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE.url}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE.url}/about/network`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE.url}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE.url}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE.url}/faq/homeowners`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE.url}/faq/landlords`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE.url}/faq/property-managers`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE.url}/faq/businesses`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE.url}/faq/trades`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE.url}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE.url}/trade-partners`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE.url}/case-studies`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${SITE.url}/our-tradies`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE.url}/areas`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE.url}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
  ]

  const blog: MetadataRoute.Sitemap = BLOG_POSTS.map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const caseStudies: MetadataRoute.Sitemap = CASE_STUDIES.map((cs) => ({
    url: `${SITE.url}/case-studies/${cs.slug}`,
    lastModified: new Date(cs.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Combine trade slugs (rich pages) + legacy service slugs, dedupe
  const allServiceSlugs = new Set<string>()
  TRADES.forEach((t) => allServiceSlugs.add(t.slug))
  SERVICES.forEach((s) => allServiceSlugs.add(s.id))
  const services: MetadataRoute.Sitemap = Array.from(allServiceSlugs).map((slug) => ({
    url: `${SITE.url}/services/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.75,
  }))

  const areas: MetadataRoute.Sitemap = SUBURB_CONTENT.map((s) => ({
    url: `${SITE.url}/areas/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const guides: MetadataRoute.Sitemap = [
    'what-is-managed-maintenance-partner',
    'property-maintenance-outsourcing-australia',
    'tapi-preferred-supplier-setup',
    'residential-maintenance-cost-guide-australia',
    'pm-time-on-maintenance-benchmarks',
    'after-hours-emergency-maintenance-guide',
  ].map((slug) => ({
    url: `${SITE.url}/guides/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.75,
  }))

  const compare: MetadataRoute.Sitemap = [
    'briks-vs-in-house-maintenance-coordinator',
    'briks-vs-pm-virtual-assistant',
    'briks-vs-adhoc-trades',
    'in-house-vs-outsourced-maintenance',
  ].map((slug) => ({
    url: `${SITE.url}/compare/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...core, ...services, ...areas, ...blog, ...guides, ...compare, ...caseStudies]
}
