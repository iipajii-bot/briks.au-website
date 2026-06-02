import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Home, Building2, Briefcase, KeyRound } from 'lucide-react'
import PageHero from '@/components/sections/PageHero'
import ImageBanner from '@/components/sections/ImageBanner'
import SpotlightCard from '@/components/effects/SpotlightCard'
import MovingBorder from '@/components/effects/MovingBorder'
import BackgroundBeams from '@/components/effects/BackgroundBeams'
import { SITE } from '@/lib/constants'
import { IMAGES } from '@/lib/images'

export const metadata: Metadata = {
  title: 'How We Work — From One Call to One Invoice',
  description:
    'The Briks workflow for every customer — homeowners, landlords, property managers, businesses. Four steps: tell us, get a fast quote, on-site, one invoice.',
  alternates: { canonical: '/how-it-works' },
}

const steps = [
  {
    number: '01',
    title: 'Tell us what you need',
    body: `Phone, online form, or email. Two sentences is enough to get started — broken thing, address, when it's a problem. No long brief, no scoping call to start.`,
    aux: 'Audience-specific entry points covered below.',
  },
  {
    number: '02',
    title: 'Fast quote',
    body: `We classify the job, match it to the right trade in our network, and come back with a written price quickly. Genuine emergencies skip quoting and dispatch right away, around the clock.`,
    aux: 'Renovations get a site visit + itemised quote without delay.',
  },
  {
    number: '03',
    title: 'On-site, work done',
    body: `A vetted, licensed tradesperson is dispatched. We confirm the ETA, they arrive, the work gets done. Photos before, after, and progress for anything bigger than half a day. Quality controlled on larger jobs.`,
    aux: 'Failed job? Briks carries the remediation. One name on the hook.',
  },
  {
    number: '04',
    title: 'One invoice',
    body: `Single tax invoice for the job. Photos and compliance docs attached. Pay how it suits you — direct, card, EFT. Volume customers can have invoices issued direct to a landlord, body corporate, or accounts team.`,
    reportItems: [
      'Before / after photographs',
      'Itemised work description',
      'Trade licence + insurance on file',
      'Compliance certificates where required (electrical, gas, waterproofing)',
      'Single tax invoice — your name on it',
    ],
  },
]

const audiencePaths = [
  {
    icon: Home,
    label: 'Homeowners',
    body: 'Text or call. Quote, schedule, done. No call-out fee on jobs over an hour.',
    href: '/for-homeowners',
  },
  {
    icon: KeyRound,
    label: 'Landlords',
    body: 'Same flow plus compliance docs and end-of-lease coordination if required.',
    href: '/for-landlords',
  },
  {
    icon: Building2,
    label: 'Property managers',
    body: 'Tapi-native intake. Single invoice per job sent direct to the landlord. PMs off-call.',
    href: '/for-property-managers',
  },
  {
    icon: Briefcase,
    label: 'Businesses',
    body: 'After-hours scheduling, strata-friendly billing, compliance reporting included.',
    href: '/for-businesses',
  },
]

const benefits = [
  {
    title: 'Time back',
    body: 'Five tradies for five trades becomes one number. The friction goes from hours of chasing down to two minutes of telling.',
  },
  {
    title: 'Single accountable supplier',
    body: 'One name carries the job. Briks coordinates trades, manages quality, covers remediation if anything fails.',
  },
  {
    title: 'Documented audit trail',
    body: 'Every job comes with photos, compliance docs, and a single invoice. Nothing gets lost. Nothing slips between contractors.',
  },
]

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How Briks Building Services handles a job — from request to invoice',
  description:
    'The Briks workflow: request → fast quote → on-site → one invoice. Works the same for homeowners, landlords, property managers and businesses.',
  totalTime: 'PT4H',
  step: steps.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.title,
    text: s.body,
  })),
  publisher: { '@id': `${SITE.url}/#organization` },
  mainEntityOfPage: `${SITE.url}/how-it-works`,
  inLanguage: 'en-AU',
  isPartOf: { '@id': `${SITE.url}/#website` },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'How we work', item: `${SITE.url}/how-it-works` },
  ],
}

export default function HowItWorksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c'),
        }}
      />

      <PageHero
        eyebrow="How we work"
        title={
          <>
            Four steps.{' '}
            <span className="text-[#8a6e3f]">One invoice.</span>
          </>
        }
        subtitle={
          <>
            Same flow for everyone — homeowner with a leaking shower, landlord
            with a make-ready, agency with a maintenance work order, business
            with a shopfront fit-out. The friction goes away. The work gets
            done.
          </>
        }
      />

      <section className="relative pt-4 pb-10 md:pb-14 bg-[#ffffff]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ImageBanner
            src={IMAGES.howItWorks}
            alt="Adelaide tradesperson tools laid out on workbench"
            aspect="banner"
          />
        </div>
      </section>

      {/* Steps */}
      <section className="relative py-20 md:py-28 bg-[#fafaf7]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="space-y-10 md:space-y-16">
            {steps.map((step, i) => (
              <li
                key={step.number}
                className="relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10"
              >
                <div className="md:col-span-2 flex md:flex-col items-start md:items-center gap-4 md:gap-0">
                  <div className="flex h-20 w-20 items-center justify-center rounded-md border border-[#8a6e3f]/40 bg-[#ffffff] relative z-10 shrink-0 shadow-[0_0_40px_rgba(138,110,63,0.12)]">
                    <span
                      className="font-display text-3xl text-[#8a6e3f]"
                      style={{ fontWeight: 700 }}
                    >
                      {step.number}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className="hidden md:block w-px flex-1 mt-4"
                      style={{
                        background:
                          'linear-gradient(to bottom, rgba(138,110,63,0.4), transparent)',
                      }}
                      aria-hidden
                    />
                  )}
                </div>

                <div className="md:col-span-10 pb-8">
                  <h2
                    className="font-display text-3xl md:text-4xl leading-[1.1] tracking-[-0.02em] text-[#1a1a1a] mb-4"
                    style={{ fontWeight: 700 }}
                  >
                    {step.title}
                  </h2>
                  <p
                    data-speakable
                    className="text-[#3a3735] text-base md:text-lg leading-relaxed mb-4 max-w-2xl"
                  >
                    {step.body}
                  </p>
                  {step.aux && (
                    <p className="text-[#8a6e3f] text-xs tracking-[0.22em] uppercase">
                      {step.aux}
                    </p>
                  )}

                  {step.reportItems && (
                    <SpotlightCard className="mt-8 max-w-2xl">
                      <p className="text-[#8a6e3f] text-xs tracking-[0.22em] uppercase mb-4">
                        What lands with you
                      </p>
                      <ul className="space-y-2.5">
                        {step.reportItems.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-[#1a1a1a] text-sm"
                          >
                            <CheckCircle
                              size={14}
                              className="text-[#8a6e3f] shrink-0 mt-0.5"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </SpotlightCard>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Audience paths */}
      <section className="relative py-24 md:py-32 bg-[#ffffff] border-y border-[#e2ddd3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase mb-6">
              Same flow, different fits
            </p>
            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-[#1a1a1a]"
              style={{ fontWeight: 700 }}
            >
              Pick your{' '}
              <span className="text-[#8a6e3f]">entry point.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {audiencePaths.map((p) => {
              const Icon = p.icon
              return (
                <Link
                  key={p.href}
                  href={p.href}
                  className="group block rounded-md border border-[#e2ddd3] bg-[#fafaf7] hover:border-[#8a6e3f]/50 transition-colors duration-300 p-6"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-[#8a6e3f]/40 bg-[#ffffff] mb-5">
                    <Icon size={18} className="text-[#8a6e3f]" aria-hidden />
                  </div>
                  <h3
                    className="font-display text-xl text-[#1a1a1a] mb-2 tracking-[-0.01em]"
                    style={{ fontWeight: 700 }}
                  >
                    {p.label}
                  </h3>
                  <p className="text-sm text-[#3a3735] leading-relaxed">
                    {p.body}
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Impact block */}
      <section className="relative py-24 md:py-32 bg-[#fafaf7]">
        <div
          className="absolute inset-x-0 top-0 hairline w-[80%] max-w-5xl mx-auto"
          aria-hidden
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <p className="text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase mb-6">
              The impact
            </p>
            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-[#1a1a1a]"
              style={{ fontWeight: 700 }}
            >
              What changes{' '}
              <span className="text-[#8a6e3f]">on your end.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {benefits.map((b) => (
              <SpotlightCard key={b.title}>
                <div className="mb-5 hairline w-10" aria-hidden />
                <h3
                  className="text-lg mb-3 text-[#1a1a1a] tracking-[-0.01em]"
                  style={{
                    fontFamily: 'var(--font-inter-tight)',
                    fontWeight: 700,
                  }}
                >
                  {b.title}
                </h3>
                <p className="text-sm text-[#3a3735] leading-relaxed">
                  {b.body}
                </p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 md:py-36 bg-[#fafaf7] overflow-hidden">
        <BackgroundBeams />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-[#1a1a1a] mb-6"
            style={{ fontWeight: 700 }}
          >
            Two sentences is enough.{' '}
            <span className="text-[#8a6e3f]">Get a quote.</span>
          </h2>
          <p className="text-[#3a3735] text-lg mb-10">
            Tell us the broken thing, the address, the urgency. We come back
            quickly with a price.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MovingBorder href="/contact">
              Get a quote
              <ArrowRight size={18} aria-hidden />
            </MovingBorder>
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 rounded-md border border-[#c0bcb4] hover:border-[#8a6e3f]/60 text-[#1a1a1a]/80 hover:text-[#1a1a1a] px-7 py-3.5 transition-colors duration-300 min-h-[44px]"
            >
              Read the FAQ
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
