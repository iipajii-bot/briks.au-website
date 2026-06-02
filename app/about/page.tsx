import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import PageHero from '@/components/sections/PageHero'
import ImageBanner from '@/components/sections/ImageBanner'
import SpotlightCard from '@/components/effects/SpotlightCard'
import MovingBorder from '@/components/effects/MovingBorder'
import BackgroundBeams from '@/components/effects/BackgroundBeams'
import { SITE } from '@/lib/constants'
import { IMAGES } from '@/lib/images'

export const metadata: Metadata = {
  title: 'About Briks Building Services — Adelaide',
  description:
    "Briks Building Services — built by experienced Adelaide tradies. The story, the values, what we won't compromise on.",
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'profile',
    firstName: 'Pargat',
    lastName: 'Singh',
  },
}

const values = [
  {
    n: '01',
    title: 'Accountability, not explanations',
    body: 'Every job Briks accepts, Briks carries. Bad outcome? We remediate. No finger-pointing at subcontractors, no hiding behind fine print, no "contact the tradie direct" redirects.',
  },
  {
    n: '02',
    title: 'Documentation as default',
    body: 'Every job closes with photos, invoice line items, and compliance certificates. Documentation is the product, not a premium add-on. Whether the customer is a homeowner, a landlord, an agency, or a strata committee.',
  },
  {
    n: '03',
    title: 'Fast quotes, real timelines',
    body: '4-hour quote turnaround on standard work. 48-hour quote on renovations. We give you a real start date when we quote, not a "when we can get to it." The friction goes away.',
  },
  {
    n: '04',
    title: 'Only vetted trades dispatched',
    body: "Licence + insurance verified before onboarding. Internal quality rating tracked per job. Three strikes removes a tradesperson from the network. We'd rather turn work away than send someone we wouldn't send to our own family's home.",
  },
]

const subPages = [
  {
    label: 'Tradesperson network',
    blurb: 'Standards, vetting, payment terms, what gets a tradie removed.',
    href: '/about/network',
  },
]

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE.url}/#founder`,
  name: SITE.founderName,
  jobTitle: 'Founder',
  worksFor: { '@id': `${SITE.url}/#organization` },
  url: `${SITE.url}/about`,
  sameAs: [SITE.social.linkedin],
  homeLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Adelaide',
      addressRegion: 'SA',
      addressCountry: 'AU',
    },
  },
}

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  url: `${SITE.url}/about`,
  mainEntity: { '@id': `${SITE.url}/#organization` },
  inLanguage: 'en-AU',
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['[data-speakable]'],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE.url}/about` },
  ],
}

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c') }} />

      <PageHero
        eyebrow="About Briks"
        title={
          <>
            Adelaide&rsquo;s tradies are good.{' '}
            <span className="text-[#8a6e3f]">Finding one is hard.</span>
          </>
        }
        subtitle={
          <>
            Briks runs out of Adelaide, built by {SITE.founderName} and a
            crew of experienced tradies. One local team coordinating every
            trade — maintenance, repairs, renovations, fit-outs — for
            homeowners, landlords, agencies, and businesses.
          </>
        }
      />

      {/* Editorial — universal story */}
      <section className="relative py-24 md:py-32 bg-[#fafaf7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5">
            <ImageBanner
              src={IMAGES.aboutHero}
              alt="Adelaide tradesperson on the job"
              aspect="tall"
            />
          </div>

          <div className="lg:col-span-7">
            <p className="text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase mb-6">
              Why Briks exists
            </p>
            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-[#1a1a1a] mb-10"
              style={{ fontWeight: 700 }}
            >
              Same trades.{' '}
              <span className="text-[#8a6e3f]">Different experience.</span>
            </h2>

            <div
              data-speakable
              className="space-y-6 text-[#3a3735] text-base md:text-lg leading-relaxed max-w-2xl"
            >
              <p>
                Adelaide has good tradies. Honest, skilled, fair-priced. The
                problem is never the work — it&rsquo;s everything around it.
                Finding one who answers the phone. Getting a written quote
                inside a week. Locking in a start date that holds. Paying one
                invoice instead of three.
              </p>
              <p>
                Most homeowners save up six small jobs before they call anyone,
                because the friction is worse than the broken tap. Most
                landlords end up doing the chasing themselves. Most property
                managers burn ten hours a week ringing back the same plumber.
                Most businesses just live with the broken thing.
              </p>
              <p
                className="font-display text-xl md:text-2xl leading-snug border-l-2 border-[#8a6e3f] pl-6 text-[#1a1a1a] my-10"
                style={{ fontWeight: 700 }}
              >
                Briks fixes the friction, not the pricing.
              </p>
              <p>
                Same Adelaide trades. Same Adelaide rates. What changes is the
                experience around them — one call, fast quote, clear timeline,
                single invoice, photo-documented finish. Whether it&rsquo;s a
                leaking shower or a kitchen rebuild, the process is the same.
              </p>
              <p className="text-[#1a1a1a] font-medium">
                That&rsquo;s the whole business. Adelaide builders, plumbers,
                electricians, painters, handymen — under one roof, on one
                call, on one invoice.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-6 flex-wrap">
              <div>
                <p
                  className="font-display text-lg text-[#1a1a1a]"
                  style={{ fontWeight: 700 }}
                >
                  {SITE.founderName}
                </p>
                <p className="text-xs tracking-[0.2em] uppercase text-[#5a5650] mt-1">
                  Founder · Adelaide
                </p>
              </div>
              <Link
                href={SITE.social.linkedin}
                target="_blank"
                rel="noopener"
                className="group inline-flex items-center gap-2 text-sm text-[#8a6e3f] hover:text-[#b89868] transition-colors"
              >
                LinkedIn
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-24 md:py-32 bg-[#ffffff] border-y border-[#e2ddd3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <p className="text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase mb-6">
              What we won&rsquo;t compromise on
            </p>
            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-[#1a1a1a]"
              style={{ fontWeight: 700 }}
            >
              Our{' '}
              <span className="text-[#8a6e3f]">four rules.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {values.map((v) => (
              <SpotlightCard key={v.n}>
                <p
                  className="text-[#8a6e3f] text-xs tracking-[0.22em] uppercase mb-4"
                  style={{ fontFamily: 'var(--font-inter-tight)' }}
                >
                  {v.n}
                </p>
                <h3
                  className="text-xl mb-4 text-[#1a1a1a] tracking-[-0.01em]"
                  style={{
                    fontFamily: 'var(--font-inter-tight)',
                    fontWeight: 700,
                  }}
                >
                  {v.title}
                </h3>
                <p className="text-sm text-[#3a3735] leading-relaxed">
                  {v.body}
                </p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Stage / honesty block */}
      <section className="relative py-24 md:py-32 bg-[#fafaf7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase mb-6 text-center">
            Where we are
          </p>
          <h2
            className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-[-0.02em] text-[#1a1a1a] text-center mb-10"
            style={{ fontWeight: 700 }}
          >
            Local team.{' '}
            <span className="text-[#8a6e3f]">Adelaide-only.</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">
            {[
              { label: 'Tradies', value: 'Experienced' },
              { label: 'City', value: 'Adelaide' },
              { label: 'Trades covered', value: '12' },
              { label: 'Suburbs served', value: '38+' },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-md border border-[#e2ddd3] bg-[#ffffff] p-5"
              >
                <p className="text-xs tracking-[0.22em] uppercase text-[#5a5650] mb-2">
                  {item.label}
                </p>
                <p
                  className="font-display text-xl md:text-2xl text-[#1a1a1a]"
                  style={{ fontWeight: 700 }}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <p className="text-[#3a3735] text-base md:text-lg leading-relaxed text-center max-w-2xl mx-auto">
            Briks runs across Adelaide with a network of experienced
            tradies. If you&rsquo;re a licensed tradesperson sick of
            ninety-day invoices, we want to talk. If you&rsquo;re an agency
            principal, homeowner, landlord, or business owner who wants the
            friction gone, the door is open.
          </p>
        </div>
      </section>

      {/* Sub-page tiles */}
      <section className="relative py-24 md:py-28 bg-[#ffffff] border-y border-[#e2ddd3]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase mb-6">
              Go deeper
            </p>
            <h2
              className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.02em] text-[#1a1a1a]"
              style={{ fontWeight: 700 }}
            >
              More on{' '}
              <span className="text-[#8a6e3f]">how Briks runs.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 max-w-md">
            {subPages.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group block rounded-md border border-[#e2ddd3] bg-[#fafaf7] hover:border-[#8a6e3f]/50 transition-colors duration-300 p-7"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3
                    className="font-display text-2xl text-[#1a1a1a] tracking-[-0.01em]"
                    style={{ fontWeight: 700 }}
                  >
                    {p.label}
                  </h3>
                  <ArrowUpRight
                    size={16}
                    className="text-[#8a6e3f] opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-hidden
                  />
                </div>
                <p className="text-sm text-[#3a3735] leading-relaxed">
                  {p.blurb}
                </p>
              </Link>
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
            Want to{' '}
            <span className="text-[#8a6e3f]">work together?</span>
          </h2>
          <p className="text-[#3a3735] text-lg mb-10">
            Customers, tradies, agencies — all welcome. Two sentences is
            enough to get started.
          </p>
          <MovingBorder href="/contact">
            Talk to us
            <ArrowRight size={18} aria-hidden />
          </MovingBorder>
        </div>
      </section>
    </>
  )
}
