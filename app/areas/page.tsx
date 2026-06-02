import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import PageHero from '@/components/sections/PageHero'
import { SUBURB_GROUPS } from '@/lib/suburbs'
import { SUBURB_CONTENT } from '@/lib/suburb-content'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Service Areas — Adelaide Suburbs Briks Covers',
  description:
    'Briks Building Services covers the full Adelaide metropolitan area plus Hills. Find your suburb for local building services — plumbing, electrical, carpentry, painting, roofing, gas, HVAC, handyman.',
  alternates: { canonical: '/areas' },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'Service Areas', item: `${SITE.url}/areas` },
  ],
}

export default function AreasIndexPage() {
  // Build map of slugs that have content pages
  const slugsWithPages = new Set(SUBURB_CONTENT.map((s) => s.slug))
  const slugify = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c'),
        }}
      />

      <PageHero
        eyebrow="Service areas"
        title={
          <>
            Adelaide{' '}
            <span className="text-[#8a6e3f]">— covered.</span>
          </>
        }
        subtitle={
          <>
            Briks coordinates licensed tradies across the full Adelaide
            metropolitan area and the Adelaide Hills. Click your suburb for
            local detail — common issues, leading trades, and recent jobs in
            the area.
          </>
        }
      />

      <section className="relative py-20 md:py-28 bg-[#fafaf7] border-y border-[#e2ddd3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16">
          {SUBURB_GROUPS.map((group) => (
            <div key={group.region}>
              <div className="flex items-end justify-between mb-6">
                <h2
                  className="text-[#1a1a1a] text-2xl md:text-3xl tracking-[-0.01em]"
                  style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
                >
                  {group.region}
                </h2>
                <span className="text-[10px] tracking-[0.18em] uppercase text-[#8a6e3f]">
                  {group.suburbs.length} suburbs
                </span>
              </div>
              <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {group.suburbs.map((suburb) => {
                  const slug = slugify(suburb)
                  const hasPage = slugsWithPages.has(slug)
                  if (!hasPage) {
                    return (
                      <li
                        key={suburb}
                        className="flex items-center gap-2 px-4 py-3 text-[#5a5650] text-sm"
                      >
                        <MapPin size={14} className="text-[#8a6e3f]/50 shrink-0" aria-hidden />
                        <span>{suburb}</span>
                      </li>
                    )
                  }
                  return (
                    <li key={suburb}>
                      <Link
                        href={`/areas/${slug}`}
                        className="group flex items-center justify-between bg-white border border-[#e2ddd3] rounded-md px-4 py-3 hover:border-[#8a6e3f]/60 transition-colors"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <MapPin
                            size={14}
                            className="text-[#8a6e3f] shrink-0"
                            aria-hidden
                          />
                          <span
                            className="text-[#1a1a1a] text-sm truncate"
                            style={{
                              fontFamily: 'var(--font-inter-tight)',
                              fontWeight: 600,
                            }}
                          >
                            {suburb}
                          </span>
                        </div>
                        <ArrowRight
                          size={14}
                          className="text-[#8a6e3f] shrink-0 transition-transform group-hover:translate-x-0.5"
                        />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
