import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, MapPin, Home, ShieldCheck } from 'lucide-react'
import PageHero from '@/components/sections/PageHero'
import MovingBorder from '@/components/effects/MovingBorder'
import FAQAccordion from '@/components/sections/FAQAccordion'
import { SUBURB_CONTENT, getSuburb, profileLead } from '@/lib/suburb-content'
import { TRADES, getTrade } from '@/lib/trades'
import { CASE_STUDIES } from '@/lib/case-studies'
import { SITE, whatsappHref } from '@/lib/constants'

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  return SUBURB_CONTENT.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const { slug } = await props.params
  const s = getSuburb(slug)
  if (!s) return { title: 'Area Not Found' }

  const title = `Building Services ${s.name} — Plumbers, Electricians, Tradies | Briks`
  const description = `Briks coordinates licensed Adelaide tradies across ${s.name}${s.postcode ? ` (${s.postcode})` : ''}. Plumbing, electrical, carpentry, painting, roofing, gas, HVAC. ${s.character.split('.')[0]}.`

  return {
    title,
    description: description.slice(0, 158),
    alternates: { canonical: `/areas/${s.slug}` },
    openGraph: { title, description, url: `${SITE.url}/areas/${s.slug}` },
  }
}

function suburbFAQs(s: ReturnType<typeof getSuburb>) {
  if (!s) return []
  return [
    {
      q: `Do you service ${s.name}?`,
      a: `Yes. Briks coordinates licensed Adelaide tradies across ${s.name}${
        s.postcode ? ` (postcode ${s.postcode})` : ''
      } and the surrounding ${s.region} region. Routine jobs are scoped on-site within 48 hours; emergencies dispatch inside 60 minutes.`,
    },
    {
      q: `What's the response time to ${s.name}?`,
      a: `Briks dispatches to ${s.name} from a vetted bench of tradies covering the ${s.region} catchment. Emergency callouts (active leak, no power, no water, gas) are attended within 60 minutes inside the metro area. Routine work is booked for an on-site visit within 48 hours of the call.`,
    },
    {
      q: `Is the tradie based near ${s.name}?`,
      a: `Briks operates a curated bench across Adelaide. We allocate the tradie whose specialty and current capacity matches the job — not just the closest body. Most ${s.name} jobs are covered by tradies based within 15 minutes of the suburb.`,
    },
    {
      q: `What's most common in ${s.name}?`,
      a: `Based on ${s.profile.replace(/-/g, ' ')} housing stock, the most common ${s.name} jobs are ${s.commonIssues[0].toLowerCase()}. Briks coordinates the right specialist trade for the most likely cause — not a generalist guessing.`,
    },
    {
      q: `Are tradies licensed and insured?`,
      a: `Every Briks tradie holds a current SA license relevant to their trade (PIC for plumbing/gas, A-grade for electrical, BLD for building/structural carpentry, waterproofing certificate for tilers in wet areas). Public liability cover is mandatory — minimum $10M. Certificates of currency on file before any dispatch to ${s.name}.`,
    },
  ]
}

export default async function SuburbPage(props: { params: Params }) {
  const { slug } = await props.params
  const s = getSuburb(slug)
  if (!s) notFound()

  const leadingTrades = s.jobLean
    .map((slug) => getTrade(slug))
    .filter((t): t is NonNullable<ReturnType<typeof getTrade>> => Boolean(t))
    .slice(0, 5)

  const nearbySuburbs = s.nearby
    .map((slug) => SUBURB_CONTENT.find((x) => x.slug === slug))
    .filter((x): x is NonNullable<typeof x> => Boolean(x))

  const localCases = CASE_STUDIES.filter(
    (c) => c.suburb.toLowerCase() === s.name.toLowerCase()
  )

  const faqs = suburbFAQs(s)

  // Schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    '@id': `${SITE.url}/areas/${s.slug}#localbusiness`,
    name: `${SITE.name} — ${s.name}`,
    url: `${SITE.url}/areas/${s.slug}`,
    image: `${SITE.url}/og.png`,
    parentOrganization: { '@id': `${SITE.url}/#organization` },
    priceRange: '$$',
    areaServed: {
      '@type': 'Place',
      name: `${s.name}, Adelaide, SA${s.postcode ? ` ${s.postcode}` : ''}`,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: s.name,
      addressRegion: 'SA',
      ...(s.postcode ? { postalCode: s.postcode } : {}),
      addressCountry: 'AU',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Service Areas', item: `${SITE.url}/areas` },
      {
        '@type': 'ListItem',
        position: 3,
        name: s.name,
        item: `${SITE.url}/areas/${s.slug}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c'),
        }}
      />

      <PageHero
        eyebrow={`${s.region} · Service area`}
        title={
          <>
            Building services in{' '}
            <span className="text-[#8a6e3f]">{s.name}.</span>
          </>
        }
        subtitle={
          <>
            {s.character} Briks coordinates licensed tradies across{' '}
            {s.name}
            {s.postcode ? ` (${s.postcode})` : ''} — plumbing, electrical,
            carpentry, painting, tiling, roofing, gas, HVAC, handyman.
          </>
        }
      />

      {/* Profile lead + trades */}
      <section className="relative py-20 md:py-28 bg-[#ffffff]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">
                What {s.name} actually needs
              </p>
              <h2
                className="text-[#1a1a1a] text-3xl md:text-4xl tracking-[-0.02em] leading-[1.05]"
                style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
              >
                The work that surfaces here.
              </h2>
              <p className="mt-5 text-[#3a3735] text-base md:text-[17px] leading-relaxed">
                {profileLead(s)}
              </p>
            </div>
            <div className="lg:col-span-7">
              <ul className="space-y-3">
                {s.commonIssues.map((issue, i) => (
                  <li
                    key={issue}
                    className="relative bg-[#fafaf7] border border-[#e2ddd3] rounded-md p-5 pl-7"
                  >
                    <span
                      aria-hidden
                      className="absolute left-0 top-5 bottom-5 w-[3px] bg-[#8a6e3f] rounded-r-sm"
                    />
                    <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-1.5">
                      Common issue {i + 1}
                    </p>
                    <p className="text-[#3a3735] text-sm md:text-[15px] leading-relaxed">
                      {issue}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trades that lead in this suburb */}
      <section className="relative py-20 md:py-28 bg-[#fafaf7] border-y border-[#e2ddd3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10 md:mb-12">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">
              Trades for {s.name}
            </p>
            <h2
              className="text-[#1a1a1a] text-3xl md:text-4xl tracking-[-0.02em] leading-[1.05]"
              style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
            >
              The trades that surface most.
            </h2>
            <p className="mt-5 text-[#3a3735] text-base md:text-[17px] leading-relaxed max-w-xl">
              Ordered by how often these trades hit the bench for {s.name}{' '}
              jobs. Click through for the full scope, standards, and FAQs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {leadingTrades.map((t) => (
              <Link
                key={t.slug}
                href={`/services/${t.slug}`}
                className="group relative bg-white border border-[#e2ddd3] rounded-md p-5 md:p-6 hover:border-[#8a6e3f]/60 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <p
                    className="text-[#1a1a1a] text-lg tracking-[-0.01em]"
                    style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
                  >
                    {t.name}
                  </p>
                  <ArrowRight
                    size={16}
                    className="text-[#8a6e3f] transition-transform group-hover:translate-x-0.5"
                  />
                </div>
                <p className="text-[10px] tracking-[0.18em] uppercase text-[#8a6e3f] mb-3">
                  {t.primaryKeyword.replace('Adelaide', s.name)}
                </p>
                <p className="text-sm text-[#3a3735] leading-relaxed line-clamp-3">
                  {t.commonJobs.slice(0, 2).join('. ')}.
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Local case studies (if any) */}
      {localCases.length > 0 && (
        <section className="relative py-20 md:py-28 bg-[#ffffff]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10">
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-3">
                Recent work in {s.name}
              </p>
              <h2
                className="text-[#1a1a1a] text-3xl md:text-4xl tracking-[-0.02em] leading-[1.05]"
                style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
              >
                Real {s.name} jobs.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {localCases.map((c) => (
                <Link
                  key={c.slug}
                  href={`/case-studies/${c.slug}`}
                  className="group block bg-[#fafaf7] border border-[#e2ddd3] rounded-md overflow-hidden hover:border-[#8a6e3f]/60 transition-colors"
                >
                  <div className="aspect-[4/3] relative bg-[#e2ddd3]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.hero}
                      alt={c.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] tracking-[0.18em] uppercase text-[#8a6e3f] mb-2">
                      {c.trade} · {c.duration}
                    </p>
                    <h3
                      className="text-[#1a1a1a] text-base tracking-[-0.01em] leading-[1.25]"
                      style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
                    >
                      {c.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="relative py-20 md:py-28 bg-[#fafaf7] border-y border-[#e2ddd3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">
              {s.name} — FAQ
            </p>
            <h2
              className="text-[#1a1a1a] text-3xl md:text-4xl tracking-[-0.02em] leading-[1.05]"
              style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
            >
              Local questions, answered.
            </h2>
          </div>
          <FAQAccordion items={faqs} />
        </div>
      </section>

      {/* Nearby suburbs */}
      {nearbySuburbs.length > 0 && (
        <section className="relative py-16 md:py-20 bg-[#ffffff]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">
              Nearby service areas
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {nearbySuburbs.map((n) => (
                <Link
                  key={n.slug}
                  href={`/areas/${n.slug}`}
                  className="group flex items-center justify-between bg-[#fafaf7] border border-[#e2ddd3] rounded-md px-4 py-3 hover:border-[#8a6e3f]/60 transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <MapPin
                      size={14}
                      className="text-[#8a6e3f] shrink-0"
                      aria-hidden
                    />
                    <span
                      className="text-[#1a1a1a] text-sm truncate"
                      style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 600 }}
                    >
                      {n.name}
                    </span>
                  </div>
                  <ArrowRight
                    size={14}
                    className="text-[#8a6e3f] shrink-0 transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              ))}
            </div>
            <Link
              href="/areas"
              className="mt-6 inline-flex items-center gap-2 text-xs tracking-[0.16em] uppercase text-[#5a5650] hover:text-[#8a6e3f] transition-colors"
            >
              All Adelaide service areas
              <ArrowRight size={12} />
            </Link>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative py-20 md:py-28 bg-[#fafaf7] border-t border-[#e2ddd3] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.1] mb-6"
            style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
          >
            Got a job in {s.name}?{' '}
            <span className="text-[#8a6e3f]">Tell us. We&rsquo;ll match the right tradie.</span>
          </h2>
          <p className="text-[#3a3735] text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            Coordinator picks the right specialist off the bench, attends
            on-site, scopes the work, written quote in your inbox — usually
            inside 24 hours of the visit.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <MovingBorder href="/contact">
              Get a quote
              <ArrowRight size={18} aria-hidden />
            </MovingBorder>
            <a
              href={whatsappHref(
                `Hi Briks — I have a job in ${s.name}, ${s.postcode ?? 'SA'}. Quick details:`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#c0bcb4] hover:border-[#8a6e3f]/60 text-[#1a1a1a]/80 hover:text-[#1a1a1a] px-7 py-3.5 transition-colors duration-300 min-h-[44px]"
            >
              Text us on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
