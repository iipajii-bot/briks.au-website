import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  ArrowUpRight,
  Moon,
  Wrench,
  Receipt,
  MessageCircle,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react'
import PageHero from '@/components/sections/PageHero'
import TrustStrip from '@/components/sections/TrustStrip'
import TestimonialsGrid from '@/components/sections/TestimonialsGrid'
import FAQAccordion from '@/components/sections/FAQAccordion'
import MovingBorder from '@/components/effects/MovingBorder'
import { IMAGES } from '@/lib/images'
import { SITE, whatsappHref } from '@/lib/constants'

const PRIMARY_KEYWORD = 'Adelaide commercial maintenance + fit-out'

export const metadata: Metadata = {
  title:
    'Commercial Maintenance + Fit-Out Adelaide — Businesses | Briks Building Services',
  description:
    'Adelaide commercial building maintenance + fit-outs for businesses. After-hours nightshift work, compliance servicing (sprinkler, fire alarm, RCD), Net 14/30 GST invoicing. One coordinator across every trade.',
  alternates: { canonical: '/for-businesses' },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'For Businesses', item: `${SITE.url}/for-businesses` },
  ],
}

const SCENARIOS: { title: string; body: string; Icon: LucideIcon }[] = [
  {
    Icon: Moon,
    title: 'After-hours fit-out + refit',
    body: 'Retail shopfit, cafe rebuild, office reconfigure — done overnight or across a long weekend so trading hours stay clean. Briks runs the schedule, sequences trades back-to-back, and signs off before doors open Monday.',
  },
  {
    Icon: Wrench,
    title: 'Same-day reactive repair',
    body: 'Air-con failed on a 38°C Friday. Cool-room down. Power out to half the floor. Plumbing backup in a customer toilet. Briks dispatches inside 60 minutes, makes safe, and either fixes on the spot or returns out-of-hours.',
  },
  {
    Icon: Receipt,
    title: 'Recurring compliance servicing',
    body: 'Annual sprinkler test. Quarterly fire alarm check. Six-monthly RCD test. Test-and-tag schedules. Briks tracks renewals, attends on date, lodges certificates, and supplies a single annual portfolio compliance PDF.',
  },
]

const COMPLIANCE = [
  {
    label: 'Sprinkler systems (AS 1851)',
    body: 'Annual servicing + testing of fire-rated sprinkler installations to Australian Standard AS 1851. Briks coordinates licensed sprinkler contractors and logs the inspection record.',
  },
  {
    label: 'Fire alarm + smoke detection (AS 1851 / AS 1670)',
    body: 'Monthly + annual testing as required by your building class. Certificates lodged, dated test logs supplied.',
  },
  {
    label: 'RCD safety switch testing',
    body: 'Six-monthly testing per SafeWork SA workplace electrical safety guidelines. Tagged, dated, logged.',
  },
  {
    label: 'Test-and-tag (AS/NZS 3760)',
    body: 'Portable electrical appliance testing on the cadence dictated by your environment (3 / 6 / 12 monthly). Test register kept current.',
  },
  {
    label: 'Exit + emergency lighting (AS 2293)',
    body: 'Six-monthly + annual testing to Australian Standard AS 2293. Failures replaced and re-tested.',
  },
  {
    label: 'Commercial gas appliance servicing',
    body: 'Annual servicing for commercial gas cooktops, ovens, water heaters under PIC Type A gas-fitter authorisation. Certificate of compliance lodged.',
  },
]

const DELIVERABLES = [
  'After-hours + nightshift scheduling — trading hours stay clean',
  'Licensed trades only — ARC for refrigeration, A-grade electrical, Type A gas, PIC plumbing',
  'GST tax invoice in business name, Net 14 or Net 30 terms available',
  'Compliance register tracking — renewal dates, certificates, test logs',
  'Single point of contact across every trade involved in your premises',
  '60-minute emergency dispatch across Adelaide metro',
  '12-month workmanship guarantee on Briks-coordinated work',
  'Photo evidence on every visit — useful for landlord makegood requests',
  'Public liability cover from $10M per tradie up to $20M for senior bench',
  'Site induction supported where your premises require it',
]

const FAQS = [
  {
    q: 'Do you do after-hours + nightshift work?',
    a: 'Yes. After-hours, overnight, and weekend work is standard for commercial fit-out and reactive maintenance where trading hours need to stay protected. Briks pre-agrees an access plan, schedules sequenced trades, and signs off before doors open the next trading day.',
  },
  {
    q: 'Can you invoice Net 14 or Net 30?',
    a: 'Yes. Default Briks invoices are issue + 14 days. Net 30 is available on request for established commercial accounts. Each invoice is issued in the business name with ABN + GST detail, suitable for direct expense recognition in your accounts.',
  },
  {
    q: 'What is the lead time for a small commercial fit-out?',
    a: 'A standard 3-trade retail or cafe fit-out from key handover to first trade is typically 6-10 calendar weeks. Pre-construction (design lock + long-lead joinery + council consent) usually adds 2-4 weeks. Larger or heritage CBD shopfronts add a heritage-approval step. Full breakdown: see the commercial fit-out timeline guide on the blog.',
  },
  {
    q: 'Do you handle commercial sprinkler servicing + fire-alarm compliance?',
    a: 'Yes — coordinated through licensed sprinkler + fire contractors on our bench. Annual servicing to AS 1851, certificates lodged, register kept current. Most commercial customers consolidate sprinkler + fire alarm + exit lighting + RCD + test-and-tag into a single Briks-coordinated annual sweep.',
  },
  {
    q: 'Are tradies inducted for commercial sites?',
    a: 'Yes. Briks tradies hold current White Cards (Construction Induction) and can complete site-specific inductions on arrival. For sites with their own SWMS / JSA requirements, send the documents and we will integrate them into the job brief.',
  },
  {
    q: 'Do you do nightshift work?',
    a: 'Yes. Painting, joinery install, polished concrete grinding, AC commissioning, plumbing isolation work — anything that can be done after-hours to avoid trading impact, we will schedule for nightshift. Premium for nightshift is disclosed upfront in the written quote.',
  },
  {
    q: 'Can you GST-invoice my company?',
    a: 'Yes. Briks issues GST-compliant tax invoices under ABN 90 697 367 721 with full line-item detail, suitable for input tax credit claim through your BAS lodgement.',
  },
  {
    q: 'Minimum job size for businesses?',
    a: 'No minimum. A loose hinge in a cafe office costs the same to coordinate as it does for a homeowner. Many commercial customers run a recurring monthly visit to clear an accumulated job list rather than calling case-by-case.',
  },
  {
    q: 'Do you work with strata committees?',
    a: 'Yes. Briks coordinates work where the customer is a body corporate or strata committee — invoice issued to the strata manager or owners corporation directly, scope of work documented with photo evidence suitable for strata meeting minutes.',
  },
  {
    q: 'Do you carry public liability appropriate for commercial work?',
    a: 'Yes. Briks-bench tradies carry a minimum $10M public liability cover; senior bench positions carry $20M. Certificate of currency available on request for property owner or strata committee records.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Commercial building maintenance + fit-out',
  name: 'Adelaide Commercial Maintenance + Fit-Out for Businesses',
  description:
    'Adelaide commercial building services for shopfronts, cafes, restaurants, offices, strata committees. After-hours fit-out, compliance servicing (sprinkler, fire alarm, RCD, exit lighting), Net 14/30 GST invoicing.',
  provider: { '@id': `${SITE.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Adelaide' },
  audience: { '@type': 'Audience', audienceType: 'Business' },
  url: `${SITE.url}/for-businesses`,
}

export default function ForBusinesses() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }}
      />

      <PageHero
        eyebrow="For businesses"
        title={
          <>
            {PRIMARY_KEYWORD}{' '}
            <span className="text-[#8a6e3f]">that stays out of trading hours.</span>
          </>
        }
        subtitle={
          <>
            Adelaide shopfronts, cafes, restaurants, offices, and strata
            committees use Briks for after-hours fit-out, recurring compliance
            servicing, and same-day reactive repair. One coordinator across
            every trade. GST-invoiced. Net 14 or Net 30.
          </>
        }
      />

      <TrustStrip />

      <section className="relative py-16 md:py-24 bg-[#ffffff]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">
                The premise
              </p>
              <h2
                className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05] mb-6"
                style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
              >
                Adelaide commercial maintenance built around your trading day.
              </h2>
              <div className="space-y-5 text-[#3a3735] text-base md:text-[17px] leading-relaxed">
                <p>
                  Commercial maintenance isn&rsquo;t just bigger residential
                  maintenance. Tradies need site inductions. Trading hours need
                  to stay clean. Compliance certificates need to be tracked,
                  lodged, and presented when a fire inspector walks in.
                  Invoicing has to fit Net 14 or Net 30 corporate cycles and
                  carry full GST detail for BAS claim.
                </p>
                <p>
                  Briks coordinates every trade your premises needs —
                  plumbing, electrical, gas, HVAC, carpentry, painting, tiling,
                  roofing — under one supplier record, with after-hours
                  scheduling, compliance register tracking, and a 60-minute
                  emergency dispatch when something stops you trading.
                </p>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-md overflow-hidden border border-[#e2ddd3] bg-[#fafaf7]">
                <Image
                  src={IMAGES.fitout}
                  alt="Adelaide commercial fit-out — CBD shopfront interior"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-28 bg-[#fafaf7] border-y border-[#e2ddd3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">
              How businesses use Briks
            </p>
            <h2
              className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]"
              style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
            >
              Three commercial workflows.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {SCENARIOS.map((s) => (
              <div
                key={s.title}
                className="bg-white border border-[#e2ddd3] rounded-md p-6 md:p-7"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-[#e2ddd3] bg-[#fafaf7] mb-5">
                  <s.Icon size={16} className="text-[#8a6e3f]" aria-hidden />
                </div>
                <h3
                  className="text-[#1a1a1a] text-lg md:text-xl tracking-[-0.01em] mb-3"
                  style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
                >
                  {s.title}
                </h3>
                <p className="text-[#3a3735] text-sm md:text-[15px] leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-28 bg-[#ffffff]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">
              Compliance servicing
            </p>
            <h2
              className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]"
              style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
            >
              The recurring items Briks tracks.
            </h2>
            <p className="mt-5 text-[#3a3735] text-base md:text-[17px] leading-relaxed">
              Each item has a regulated cadence, a required certificate, and a
              consequence if missed. Briks tracks the renewal date for every
              one your premises is subject to and attends without prompting.
            </p>
          </div>
          <ul className="space-y-3">
            {COMPLIANCE.map((c) => (
              <li
                key={c.label}
                className="relative bg-[#fafaf7] border border-[#e2ddd3] rounded-md p-5 md:p-6 pl-7"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-5 bottom-5 w-[3px] bg-[#8a6e3f] rounded-r-sm"
                />
                <p
                  className="text-[#1a1a1a] text-base md:text-lg tracking-[-0.01em] mb-2"
                  style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
                >
                  {c.label}
                </p>
                <p className="text-[#3a3735] text-sm md:text-[15px] leading-relaxed">
                  {c.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative py-20 md:py-28 bg-[#fafaf7] border-y border-[#e2ddd3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">
                What you get on every job
              </p>
              <h2
                className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]"
                style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
              >
                The deliverables.
              </h2>
              <p className="mt-5 text-[#3a3735] text-base md:text-[17px] leading-relaxed">
                Same SOP from a single AC service through to a multi-week
                shopfit.
              </p>
            </div>
            <div className="lg:col-span-7">
              <ul className="space-y-2.5">
                {DELIVERABLES.map((d) => (
                  <li
                    key={d}
                    className="flex items-start gap-3 bg-white border border-[#e2ddd3] rounded-md p-4"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-[#8a6e3f] shrink-0 mt-0.5"
                      aria-hidden
                    />
                    <span className="text-[#3a3735] text-sm md:text-[15px] leading-relaxed">
                      {d}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsGrid
        filterAudience="businesses"
        eyebrow="What businesses say"
      />

      <section className="relative py-20 md:py-28 bg-[#ffffff]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10 md:mb-12">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">
              FAQ
            </p>
            <h2
              className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]"
              style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
            >
              Business questions, answered.
            </h2>
          </div>
          <FAQAccordion items={FAQS} />
        </div>
      </section>

      <section className="relative py-16 md:py-20 bg-[#fafaf7] border-y border-[#e2ddd3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">
            Related
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { href: '/services/electrical', label: 'Electrical' },
              { href: '/services/hvac', label: 'HVAC' },
              { href: '/services/plumbing', label: 'Plumbing' },
              { href: '/services/gas', label: 'Gas' },
              { href: '/blog/commercial-fit-out-timeline-adelaide', label: 'Fit-out timeline' },
              { href: '/case-studies', label: 'All case studies' },
              { href: '/our-tradies', label: 'Our tradies' },
              { href: '/contact', label: 'Book a quote' },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group flex items-center justify-between bg-white border border-[#e2ddd3] rounded-md px-4 py-3 hover:border-[#8a6e3f]/60 transition-colors"
              >
                <span
                  className="text-[#1a1a1a] text-sm"
                  style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 600 }}
                >
                  {l.label}
                </span>
                <ArrowUpRight
                  size={14}
                  className="text-[#8a6e3f] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-28 bg-[#ffffff] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.1] mb-6"
            style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
          >
            Need work that doesn&rsquo;t interrupt trading?{' '}
            <span className="text-[#8a6e3f]">That&rsquo;s the job.</span>
          </h2>
          <p className="text-[#3a3735] text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            Free on-site scope inspection. Written quote within 24 hours.
            Net 14 or Net 30 terms available. GST-invoiced under ABN 90 697
            367 721.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <MovingBorder href="/contact">
              Get a quote
              <ArrowRight size={18} aria-hidden />
            </MovingBorder>
            <a
              href={whatsappHref(
                "Hi Briks — I run a business in Adelaide and need maintenance / fit-out coordination. Brief:"
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#c0bcb4] hover:border-[#8a6e3f]/60 text-[#1a1a1a]/80 hover:text-[#1a1a1a] px-7 py-3.5 transition-colors duration-300 min-h-[44px]"
            >
              <MessageCircle size={16} aria-hidden />
              Text us on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
