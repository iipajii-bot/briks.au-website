import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Home, KeyRound, Building2, Briefcase, Wrench } from 'lucide-react'
import PageHero from '@/components/sections/PageHero'
import ImageBanner from '@/components/sections/ImageBanner'
import FAQAccordion from '@/components/sections/FAQAccordion'
import MovingBorder from '@/components/effects/MovingBorder'
import { FAQ_GENERAL } from '@/lib/faqs'
import { SITE } from '@/lib/constants'
import { IMAGES } from '@/lib/images'

export const metadata: Metadata = {
  title: 'FAQ — Briks Building Services Adelaide',
  description:
    'Answers to the questions Adelaide homeowners, landlords, property managers, businesses and tradies ask before working with Briks.',
  alternates: { canonical: '/faq' },
}

const subFaqs = [
  {
    icon: Home,
    label: 'Homeowners',
    blurb: 'Call-out fees, scheduling, payment, renovations.',
    href: '/faq/homeowners',
  },
  {
    icon: KeyRound,
    label: 'Landlords',
    blurb: 'Compliance certs, end-of-lease, after-hours emergencies.',
    href: '/faq/landlords',
  },
  {
    icon: Building2,
    label: 'Property Managers',
    blurb: 'Tapi setup, markup, agency-fit, landlord communication.',
    href: '/faq/property-managers',
  },
  {
    icon: Briefcase,
    label: 'Businesses',
    blurb: 'After-hours work, fit-outs, strata, compliance schedules.',
    href: '/faq/businesses',
  },
  {
    icon: Wrench,
    label: 'Tradies',
    blurb: 'Joining the network, payment terms, allocation rules.',
    href: '/faq/trades',
  },
]

const faqPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_GENERAL.map(({ q, a }) => ({
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
    { '@type': 'ListItem', position: 2, name: 'FAQ', item: `${SITE.url}/faq` },
  ],
}

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c') }}
      />

      <PageHero
        eyebrow="FAQ"
        title={
          <>
            Questions{' '}
            <span className="text-[#8a6e3f]">people ask first.</span>
          </>
        }
        subtitle={
          <>
            The five questions every customer asks. For deeper answers tailored
            to homeowners, landlords, agencies, businesses or tradies, jump
            into the relevant FAQ below.
          </>
        }
      />

      <section className="relative pt-4 pb-10 md:pb-14 bg-[#ffffff]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ImageBanner
            src={IMAGES.faq}
            alt="Notebook and pen — questions answered"
            aspect="banner"
          />
        </div>
      </section>

      {/* General Q&A */}
      <section className="relative py-20 md:py-28 bg-[#fafaf7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={FAQ_GENERAL} />
        </div>
      </section>

      {/* Sub-FAQ tiles */}
      <section className="relative py-20 md:py-28 bg-[#ffffff] border-y border-[#e2ddd3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase mb-6">
              Specific questions
            </p>
            <h2
              className="font-display text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em] text-[#1a1a1a]"
              style={{ fontWeight: 700 }}
            >
              Pick your{' '}
              <span className="text-[#8a6e3f]">situation.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subFaqs.map((s) => {
              const Icon = s.icon
              return (
                <Link
                  key={s.href}
                  href={s.href}
                  className="group block rounded-md border border-[#e2ddd3] bg-[#fafaf7] hover:border-[#8a6e3f]/50 transition-colors duration-300 p-6"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-[#8a6e3f]/40 bg-[#ffffff]">
                      <Icon size={18} className="text-[#8a6e3f]" aria-hidden />
                    </div>
                    <ArrowUpRight
                      size={14}
                      className="text-[#8a6e3f] opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-hidden
                    />
                  </div>
                  <h3
                    className="font-display text-xl text-[#1a1a1a] mb-2 tracking-[-0.01em]"
                    style={{ fontWeight: 700 }}
                  >
                    {s.label}
                  </h3>
                  <p className="text-sm text-[#3a3735] leading-relaxed">
                    {s.blurb}
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Closer */}
      <section className="relative py-24 md:py-28 bg-[#fafaf7]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="font-display text-3xl md:text-4xl text-[#1a1a1a] mb-5 tracking-[-0.02em]"
            style={{ fontWeight: 700 }}
          >
            Question not here?
          </h2>
          <p className="text-[#3a3735] text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            Email{' '}
            <a
              href={`mailto:${SITE.email}`}
              className="text-[#8a6e3f] hover:text-[#b89868] underline underline-offset-4"
            >
              {SITE.email}
            </a>{' '}
            or book a 15-minute call. If three people ask the same question, we add it to this page.
          </p>
          <MovingBorder href="/contact">
            Talk to us
            <ArrowRight size={16} aria-hidden />
          </MovingBorder>
        </div>
      </section>
    </>
  )
}
