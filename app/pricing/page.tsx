import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import PageHero from '@/components/sections/PageHero'
import ImageBanner from '@/components/sections/ImageBanner'
import MovingBorder from '@/components/effects/MovingBorder'
import SpotlightCard from '@/components/effects/SpotlightCard'
import { SITE } from '@/lib/constants'
import { IMAGES } from '@/lib/images'

export const metadata: Metadata = {
  title: 'Pricing — Adelaide Building Services & Renovations',
  description:
    'How Briks prices jobs in Adelaide. No call-out fee on jobs over an hour. Per-job pricing — no subscription, no lock-in. Itemised quotes on renovations.',
  alternates: { canonical: '/pricing' },
}

const tiers = [
  {
    label: 'Maintenance & repairs',
    price: 'Quoted per job',
    body: 'Every job priced on its own scope. We come back with a written number before any work starts. No call-out fee on jobs over an hour.',
    bullets: [
      'Fast quote turnaround',
      'Written price before work starts',
      'No call-out fee on jobs over 1 hour',
      'Photos + invoice on completion',
    ],
  },
  {
    label: 'Renovations & construction',
    price: 'Itemised quote',
    body: 'Site visit, scope confirmed, detailed itemised quote without delay. Staged payments tied to milestones. Change orders quoted before extra work.',
    bullets: [
      'Detailed itemised quote, fast turnaround',
      'Staged milestone payments',
      'Change orders quoted up front',
      'Engineer-signed where required',
    ],
  },
  {
    label: 'Volume customers',
    price: 'Per-job, tighter rates',
    body: 'For repeat volume — multi-property landlords, agencies, strata, businesses with regular maintenance. Every job priced individually. A tighter rate card available on intro.',
    bullets: [
      'Per-job pricing — no subscription',
      'Single invoice per job',
      'Volume rate card available',
      'Same flow as one-off work',
    ],
  },
  {
    label: '24/7 Emergency',
    price: 'Quoted at dispatch',
    body: 'Genuine emergencies dispatch immediately. After-hours premium baked into the quote up front. Burst pipes, no power, no hot water, broken access.',
    bullets: [
      'Immediate dispatch',
      'After-hours premium quoted up front',
      '24/7 real humans answering',
      'No subscription required',
    ],
  },
]

const faqs = [
  {
    q: 'How is each job priced?',
    a: 'On its own scope. We assess the work, come back with a written number before any tradie is dispatched. You see the price before you commit.',
  },
  {
    q: 'Is there a subscription or retainer?',
    a: 'No. Pay per job. No subscription, no retainer, no lock-in. Use Briks once or every week — either works.',
  },
  {
    q: 'How am I billed?',
    a: 'Single tax invoice on job completion. Direct deposit, card, or EFT. Renovations split into milestone payments. Volume customers can have invoices issued direct to a landlord, body corporate, or accounts team.',
  },
]

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'Pricing', item: `${SITE.url}/pricing` },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

export default function PricingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />

      <PageHero
        eyebrow="Pricing"
        title={
          <>
            Quoted up front.{' '}
            <span className="text-[#8a6e3f]">No surprises.</span>
          </>
        }
        subtitle={
          <>
            Standard rates for standard work. Itemised quotes for
            renovations. Tighter rates for volume customers. Pay per job, no
            subscription, no lock-in.
          </>
        }
      />

      <section className="relative pt-4 pb-10 md:pb-14 bg-[#ffffff]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ImageBanner
            src={IMAGES.pricing}
            alt="Quote and itemised pricing on a desk"
            aspect="banner"
          />
        </div>
      </section>

      <section className="relative py-20 md:py-28 bg-[#fafaf7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          {tiers.map((t) => (
            <SpotlightCard key={t.label}>
              <p
                className="text-[#8a6e3f] text-xs tracking-[0.22em] uppercase mb-3"
                style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 700 }}
              >
                {t.label}
              </p>
              <p
                className="font-display text-3xl md:text-4xl text-[#1a1a1a] mb-5 tracking-[-0.02em]"
                style={{ fontWeight: 700 }}
              >
                {t.price}
              </p>
              <p className="text-[#3a3735] text-sm md:text-base leading-relaxed mb-5">
                {t.body}
              </p>
              <ul className="space-y-2">
                {t.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-[#1a1a1a] text-sm leading-relaxed"
                  >
                    <CheckCircle size={14} className="text-[#8a6e3f] shrink-0 mt-0.5" />
                    {b}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          ))}
        </div>
      </section>

      <section className="relative py-20 md:py-28 bg-[#ffffff] border-y border-[#e2ddd3]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase mb-6">
            Pricing FAQ
          </p>
          <div className="space-y-8">
            {faqs.map(({ q, a }) => (
              <div key={q}>
                <h3
                  className="font-display text-xl md:text-2xl text-[#1a1a1a] mb-3 tracking-[-0.01em]"
                  style={{ fontWeight: 700 }}
                >
                  {q}
                </h3>
                <p className="text-[#3a3735] text-base leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-sm text-[#5a5650]">
            More questions? See the{' '}
            <Link href="/faq" className="text-[#8a6e3f] hover:text-[#b89868] underline underline-offset-4">
              full FAQ
            </Link>
            .
          </div>
        </div>
      </section>

      <section className="relative py-24 md:py-28 bg-[#fafaf7]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="font-display text-3xl md:text-4xl text-[#1a1a1a] mb-5 tracking-[-0.02em]"
            style={{ fontWeight: 700 }}
          >
            Get a price.
          </h2>
          <p className="text-[#3a3735] text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            Two sentences is enough. Quote back fast.
          </p>
          <MovingBorder href="/contact">
            Get a quote
            <ArrowRight size={16} aria-hidden />
          </MovingBorder>
        </div>
      </section>
    </>
  )
}
