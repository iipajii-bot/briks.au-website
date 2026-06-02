import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Wrench,
  Zap,
  ShieldCheck,
  KeyRound,
  Droplets,
  Plug,
  Hammer,
  CloudRain,
  PaintBucket,
  Grid3x3,
  ClipboardCheck,
  Award,
  Briefcase,
  Package,
  type LucideIcon,
} from 'lucide-react'
import PageHero from '@/components/sections/PageHero'
import SpotlightCard from '@/components/effects/SpotlightCard'
import MovingBorder from '@/components/effects/MovingBorder'
import FAQAccordion from '@/components/sections/FAQAccordion'
import TradePage from '@/components/sections/TradePage'
import { SERVICES, SITE } from '@/lib/constants'
import { TRADES, getTrade } from '@/lib/trades'

const iconMap: Record<string, LucideIcon> = {
  Wrench,
  Zap,
  ShieldCheck,
  KeyRound,
  Droplets,
  Plug,
  Hammer,
  CloudRain,
  PaintBucket,
  Grid3x3,
  ClipboardCheck,
}

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  const fromServices = SERVICES.map((s) => ({ slug: s.id }))
  const fromTrades = TRADES.map((t) => ({ slug: t.slug }))
  // Dedupe — trade slugs override service slugs of the same id
  const seen = new Set<string>()
  return [...fromTrades, ...fromServices].filter((p) => {
    if (seen.has(p.slug)) return false
    seen.add(p.slug)
    return true
  })
}

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const { slug } = await props.params

  // Trade pages take priority — richer SEO metadata
  const trade = getTrade(slug)
  if (trade) {
    return {
      title: trade.metaTitle,
      description: trade.metaDescription,
      alternates: { canonical: `/services/${trade.slug}` },
      openGraph: {
        title: trade.metaTitle,
        description: trade.metaDescription,
        url: `${SITE.url}/services/${trade.slug}`,
      },
    }
  }

  const svc = SERVICES.find((s) => s.id === slug)
  if (!svc) return { title: 'Service Not Found' }

  return {
    title: `${svc.title} Adelaide — ${svc.tagline}`,
    description: svc.description,
    alternates: { canonical: `/services/${svc.id}` },
  }
}

export default async function ServicePage(props: { params: Params }) {
  const { slug } = await props.params

  // Trade pages take priority over legacy service entries
  const trade = getTrade(slug)
  if (trade) {
    const tradeServiceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: trade.name,
      name: trade.metaTitle,
      description: trade.metaDescription,
      provider: { '@id': `${SITE.url}/#organization` },
      areaServed: { '@type': 'City', name: 'Adelaide' },
      url: `${SITE.url}/services/${trade.slug}`,
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `${trade.name} — common work`,
        itemListElement: trade.commonJobs.map((item) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: item },
        })),
      },
    }
    const tradeFaqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: trade.faqs.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    }
    const tradeBreadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE.url}/services` },
        {
          '@type': 'ListItem',
          position: 3,
          name: trade.name,
          item: `${SITE.url}/services/${trade.slug}`,
        },
      ],
    }
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(tradeServiceSchema).replace(/</g, '\\u003c'),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(tradeFaqSchema).replace(/</g, '\\u003c'),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(tradeBreadcrumb).replace(/</g, '\\u003c'),
          }}
        />
        <TradePage trade={trade} />
      </>
    )
  }

  const svc = SERVICES.find((s) => s.id === slug)
  if (!svc) notFound()

  const Icon = iconMap[svc.icon] ?? Wrench
  const related = SERVICES.filter((s) => s.id !== svc.id).slice(0, 3)

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: svc.title,
    name: `${svc.title} — Adelaide`,
    description: svc.description,
    provider: { '@id': `${SITE.url}/#organization` },
    areaServed: { '@type': 'City', name: 'Adelaide' },
    url: `${SITE.url}/services/${svc.id}`,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${svc.title} — included work`,
      itemListElement: svc.included.map((item) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: item },
      })),
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: svc.faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      {
        '@type': 'ListItem',
        position: 2,
        name: svc.title,
        item: `${SITE.url}/services/${svc.id}`,
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c') }} />

      <PageHero
        eyebrow={svc.tagline}
        title={
          <>
            {svc.title.split(' ').slice(0, -1).join(' ') || svc.title}{' '}
            {svc.title.split(' ').length > 1 && (
              <span className="text-[#8a6e3f]">
                {svc.title.split(' ').slice(-1)[0]}
              </span>
            )}
          </>
        }
        subtitle={<>{svc.description}</>}
      />

      {/* Hero copy + included scope + visual */}
      <section className="relative py-20 md:py-28 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <p
              data-speakable
              className="text-[#3a3735] text-base md:text-lg leading-relaxed mb-8"
            >
              {svc.heroText}
            </p>

            <div className="mb-8">
              <p className="text-[#8a6e3f] text-xs tracking-[0.22em] uppercase mb-4">
                Included scope
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {svc.included.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-[#3a3735]"
                  >
                    <CheckCircle
                      size={14}
                      className="text-[#8a6e3f] shrink-0 mt-0.5"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <MovingBorder href={`/contact?service=${svc.id}`}>
              {svc.ctaText}
              <ArrowRight size={16} aria-hidden />
            </MovingBorder>
          </div>

          {/* Visual tile */}
          <div className="lg:col-span-5">
            <SpotlightCard
              className="aspect-[4/5] flex items-center justify-center"
              spotlightColor="rgba(138,110,63,0.18)"
            >
              <div className="relative flex flex-col items-center gap-6 p-6 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-sm border border-[#8a6e3f]/40 bg-[#fafaf7] shadow-[0_0_40px_rgba(138,110,63,0.12)]">
                  <Icon size={34} className="text-[#8a6e3f]" aria-hidden />
                </div>
                <p
                  className="font-display text-2xl text-[#1a1a1a] tracking-[-0.01em]"
                  style={{ fontWeight: 700 }}
                >
                  {svc.title}
                </p>
                <p className="text-[#8a6e3f] text-xs tracking-[0.22em] uppercase">
                  {svc.tagline}
                </p>
                <div className="absolute top-0 left-0 h-5 w-5 border-t border-l border-[#8a6e3f]/50" />
                <div className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-[#8a6e3f]/50" />
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* Why Briks for [trade] */}
      <section className="relative py-20 md:py-28 bg-[#fafaf7] border-y border-[#e2ddd3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase mb-6">
              Why Briks
            </p>
            <h2
              className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.02em] text-[#1a1a1a]"
              style={{ fontWeight: 700 }}
            >
              What changes{' '}
              <span className="text-[#8a6e3f]">when we run it.</span>
            </h2>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {svc.whyBriks.map((reason, i) => (
              <li
                key={i}
                className="rounded-md border border-[#e2ddd3] bg-[#ffffff] p-6 flex items-start gap-4"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-[#8a6e3f]/40 bg-[#f3efe5]">
                  <Award size={16} className="text-[#8a6e3f]" aria-hidden />
                </div>
                <p className="text-[#1a1a1a] text-base leading-relaxed">{reason}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Common jobs we do */}
      <section className="relative py-20 md:py-28 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase mb-6">
              Recent work
            </p>
            <h2
              className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.02em] text-[#1a1a1a]"
              style={{ fontWeight: 700 }}
            >
              Common jobs we{' '}
              <span className="text-[#8a6e3f]">handle.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {svc.jobExamples.map((job) => (
              <div
                key={job.title}
                className="relative rounded-md border border-[#e2ddd3] bg-[#fafaf7] p-7 overflow-hidden"
              >
                <div className="absolute top-3 right-3 h-4 w-4 border-t border-r border-[#8a6e3f]/40" />
                <div className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-[#8a6e3f]/40" />
                <div className="flex h-9 w-9 items-center justify-center rounded-sm border border-[#8a6e3f]/40 bg-[#ffffff] mb-4">
                  <Briefcase size={16} className="text-[#8a6e3f]" aria-hidden />
                </div>
                <h3
                  className="font-display text-xl md:text-2xl text-[#1a1a1a] mb-3 tracking-[-0.01em]"
                  style={{ fontWeight: 700 }}
                >
                  {job.title}
                </h3>
                <p className="text-sm md:text-base text-[#3a3735] leading-relaxed">
                  {job.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get — deliverables */}
      <section className="relative py-20 md:py-28 bg-[#fafaf7] border-y border-[#e2ddd3]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-5">
              <p className="text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase mb-6">
                Deliverables
              </p>
              <h2
                className="font-display text-3xl md:text-4xl leading-[1.05] tracking-[-0.02em] text-[#1a1a1a] mb-6"
                style={{ fontWeight: 700 }}
              >
                What you{' '}
                <span className="text-[#8a6e3f]">walk away with.</span>
              </h2>
              <p className="text-[#3a3735] text-base md:text-lg leading-relaxed">
                Every job closes with paperwork, photos, and warranties — not a
                shrug and a handshake.
              </p>
            </div>
            <div className="md:col-span-7">
              <SpotlightCard className="p-7 md:p-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-[#8a6e3f]/40 bg-[#f3efe5] mb-5">
                  <Package size={18} className="text-[#8a6e3f]" aria-hidden />
                </div>
                <ul className="space-y-3">
                  {svc.deliverables.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-3 text-[#1a1a1a] text-sm md:text-base leading-relaxed"
                    >
                      <CheckCircle
                        size={16}
                        className="text-[#8a6e3f] shrink-0 mt-1"
                      />
                      {d}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </div>
          </div>
        </div>
      </section>

      {/* The flow */}
      <section className="relative py-20 md:py-28 bg-[#ffffff]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase mb-6">
              The flow
            </p>
            <h2
              className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.02em] text-[#1a1a1a]"
              style={{ fontWeight: 700 }}
            >
              How a{' '}
              <span className="text-[#8a6e3f]">{svc.title.toLowerCase()}</span>{' '}
              job runs.
            </h2>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {[
              { n: '01', t: 'Tell us', b: 'Phone, online form, or email. Two sentences is enough.' },
              { n: '02', t: 'Quote', b: 'Written price back fast. Renovations get a site visit + itemised quote without delay.' },
              { n: '03', t: 'On-site', b: 'Vetted, licensed tradie dispatched. Photos before and after.' },
              { n: '04', t: 'Invoice', b: 'Single tax invoice on completion. Pay direct, card, or EFT.' },
            ].map((step) => (
              <li
                key={step.n}
                className="rounded-md border border-[#e2ddd3] bg-[#fafaf7] p-5"
              >
                <p
                  className="font-display text-3xl text-[#8a6e3f] mb-3"
                  style={{ fontWeight: 700 }}
                >
                  {step.n}
                </p>
                <p
                  className="text-[#1a1a1a] mb-2"
                  style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 700 }}
                >
                  {step.t}
                </p>
                <p className="text-sm text-[#3a3735] leading-relaxed">{step.b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Trade-specific FAQs */}
      <section className="relative py-20 md:py-28 bg-[#fafaf7] border-y border-[#e2ddd3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase mb-6">
              Common questions
            </p>
            <h2
              className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.02em] text-[#1a1a1a]"
              style={{ fontWeight: 700 }}
            >
              Things people{' '}
              <span className="text-[#8a6e3f]">ask first.</span>
            </h2>
          </div>
          <FAQAccordion items={svc.faqs} />
        </div>
      </section>

      {/* Related trades */}
      <section className="relative py-20 md:py-28 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase mb-6">
              Related trades
            </p>
            <h2
              className="font-display text-3xl md:text-4xl text-[#1a1a1a]"
              style={{ fontWeight: 700 }}
            >
              Other trades{' '}
              <span className="text-[#8a6e3f]">we cover.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((r) => {
              const RIcon = iconMap[r.icon] ?? Wrench
              return (
                <Link
                  key={r.id}
                  href={`/services/${r.id}`}
                  className="group block rounded-md border border-[#e2ddd3] bg-[#fafaf7] hover:border-[#8a6e3f]/50 transition-colors duration-300 p-6"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-[#8a6e3f]/40 bg-[#ffffff] mb-5">
                    <RIcon size={18} className="text-[#8a6e3f]" aria-hidden />
                  </div>
                  <h3
                    className="font-display text-xl text-[#1a1a1a] mb-2 tracking-[-0.01em]"
                    style={{ fontWeight: 700 }}
                  >
                    {r.title}
                  </h3>
                  <p className="text-sm text-[#3a3735] leading-relaxed">
                    {r.tagline}
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 md:py-28 bg-[#fafaf7]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="font-display text-3xl md:text-4xl text-[#1a1a1a] mb-5 tracking-[-0.02em]"
            style={{ fontWeight: 700 }}
          >
            Need a {svc.title.toLowerCase()} quote?
          </h2>
          <p className="text-[#3a3735] text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            Two sentences is enough. We come back fast with a written price.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <MovingBorder href={`/contact?service=${svc.id}`}>
              {svc.ctaText}
              <ArrowRight size={16} aria-hidden />
            </MovingBorder>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-md border border-[#c0bcb4] hover:border-[#8a6e3f]/60 text-[#1a1a1a]/80 hover:text-[#1a1a1a] px-7 py-3.5 transition-colors duration-300 min-h-[44px]"
            >
              <ArrowLeft size={14} aria-hidden />
              Back home
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
