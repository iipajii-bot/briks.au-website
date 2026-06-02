import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, ArrowLeft, Clock, MapPin } from 'lucide-react'
import PageHero from '@/components/sections/PageHero'
import SpotlightCard from '@/components/effects/SpotlightCard'
import MovingBorder from '@/components/effects/MovingBorder'
import { CASE_STUDIES, getCaseStudy } from '@/lib/case-studies'
import { SITE } from '@/lib/constants'

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const { slug } = await props.params
  const cs = getCaseStudy(slug)
  if (!cs) return { title: 'Case Study Not Found' }

  return {
    title: `${cs.title} — ${cs.suburb} Case Study`,
    description: cs.subtitle,
    alternates: { canonical: `/case-studies/${cs.slug}` },
    openGraph: {
      type: 'article',
      publishedTime: cs.publishedAt,
      images: cs.hero ? [{ url: cs.hero }] : undefined,
    },
  }
}

export default async function CaseStudyPage(props: { params: Params }) {
  const { slug } = await props.params
  const cs = getCaseStudy(slug)
  if (!cs) notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: cs.title,
    description: cs.subtitle,
    datePublished: cs.publishedAt,
    dateModified: cs.publishedAt,
    image: cs.hero ? [`${SITE.url}${cs.hero}`] : undefined,
    author: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
    publisher: { '@id': `${SITE.url}/#organization` },
    mainEntityOfPage: `${SITE.url}/case-studies/${cs.slug}`,
    inLanguage: 'en-AU',
    isPartOf: { '@id': `${SITE.url}/#website` },
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Case Studies', item: `${SITE.url}/case-studies` },
      {
        '@type': 'ListItem',
        position: 3,
        name: cs.title,
        item: `${SITE.url}/case-studies/${cs.slug}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c'),
        }}
      />

      <PageHero
        eyebrow={`${cs.trade} · ${cs.suburb}`}
        title={
          <>
            {cs.title.split(' ').slice(0, -2).join(' ')}{' '}
            <span className="text-[#8a6e3f]">
              {cs.title.split(' ').slice(-2).join(' ')}
            </span>
          </>
        }
        subtitle={<>{cs.subtitle}</>}
      />

      {/* Job stats bar */}
      <section className="relative py-12 bg-[#ffffff] border-y border-[#e2ddd3]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#5a5650] mb-2">
                Suburb
              </p>
              <p
                className="font-display text-xl text-[#1a1a1a]"
                style={{ fontWeight: 700 }}
              >
                {cs.suburb}
              </p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#5a5650] mb-2">
                Trade
              </p>
              <p
                className="font-display text-xl text-[#1a1a1a]"
                style={{ fontWeight: 700 }}
              >
                {cs.trade}
              </p>
            </div>
            {cs.responseTime && (
              <div>
                <p className="text-[10px] tracking-[0.22em] uppercase text-[#5a5650] mb-2">
                  Response
                </p>
                <p
                  className="font-display text-xl text-[#8a6e3f]"
                  style={{ fontWeight: 700 }}
                >
                  {cs.responseTime}
                </p>
              </div>
            )}
            {cs.jobValue && (
              <div>
                <p className="text-[10px] tracking-[0.22em] uppercase text-[#5a5650] mb-2">
                  Job value
                </p>
                <p
                  className="font-display text-xl text-[#8a6e3f]"
                  style={{ fontWeight: 700 }}
                >
                  {cs.jobValue}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Hero image */}
      {cs.hero && (
        <section className="relative py-12 bg-[#ffffff]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-md overflow-hidden border border-[#e2ddd3] aspect-video bg-[#fafaf7]">
              <img
                src={cs.hero}
                alt={cs.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Body */}
      <article className="relative py-16 md:py-20 bg-[#ffffff]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            data-speakable
            className="space-y-6 text-[#3a3735] text-base md:text-lg leading-relaxed"
          >
            {cs.body.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Outcome callout */}
          <div className="mt-12 rounded-md border border-[#8a6e3f]/40 bg-[#fafaf7] p-7 md:p-8 shadow-[0_0_60px_rgba(138,110,63,0.08)]">
            <p className="text-[#8a6e3f] text-xs tracking-[0.22em] uppercase mb-4">
              Outcome
            </p>
            <p
              className="text-[#1a1a1a] text-base md:text-lg leading-relaxed"
              style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 500 }}
            >
              {cs.outcome}
            </p>
          </div>

          {/* Testimonial */}
          {cs.testimonial && (
            <div className="mt-8">
              <SpotlightCard>
                <p
                  className="font-display text-xl md:text-2xl leading-snug text-[#1a1a1a] border-l-2 border-[#8a6e3f] pl-6 mb-5"
                  style={{ fontWeight: 500 }}
                >
                  {cs.testimonial.quote}
                </p>
                <p
                  className="text-sm text-[#1a1a1a] tracking-[-0.01em]"
                  style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 700 }}
                >
                  {cs.testimonial.author}
                </p>
                <p className="text-xs text-[#3a3735]">{cs.testimonial.role}</p>
              </SpotlightCard>
            </div>
          )}
        </div>
      </article>

      {/* CTA */}
      <section className="relative py-24 md:py-28 bg-[#ffffff]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="font-display text-3xl md:text-4xl leading-[1.1] tracking-[-0.02em] text-[#1a1a1a] mb-6"
            style={{ fontWeight: 700 }}
          >
            Need this kind of result?{' '}
            <span className="text-[#8a6e3f]">One call.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <MovingBorder href="/contact">
              Book the call
              <ArrowRight size={16} aria-hidden />
            </MovingBorder>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 rounded-full border border-[#c0bcb4] hover:border-[#8a6e3f]/60 text-[#1a1a1a]/80 hover:text-[#1a1a1a] px-7 py-3.5 transition-colors duration-300 min-h-[44px]"
            >
              <ArrowLeft size={14} aria-hidden />
              All case studies
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
