import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight, MessageCircle, CheckCircle2, CalendarClock, Wrench, ShieldCheck, type LucideIcon } from 'lucide-react'
import PageHero from '@/components/sections/PageHero'
import TrustStrip from '@/components/sections/TrustStrip'
import FAQAccordion from '@/components/sections/FAQAccordion'
import MovingBorder from '@/components/effects/MovingBorder'
import { IMAGES } from '@/lib/images'
import { SITE, whatsappHref } from '@/lib/constants'

const PRIMARY_KEYWORD = 'Adelaide property maintenance'

export const metadata: Metadata = {
  title: 'Adelaide Property Maintenance — Preventative + Reactive | Briks',
  description:
    'Adelaide property maintenance for homeowners, landlords + businesses. Preventative maintenance schedules, reactive repairs, multi-trade jobs bundled into one visit. One coordinator, one invoice, 12-month workmanship guarantee.',
  alternates: { canonical: '/maintenance' },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'Maintenance', item: `${SITE.url}/maintenance` },
  ],
}

const CADENCE: { item: string; cadence: string; why: string }[] = [
  { item: 'Gutters cleared', cadence: 'Twice yearly (autumn + late winter)', why: 'Blocked gutters cause water ingress + insurance claim denial' },
  { item: 'Roof inspection', cadence: 'Annually + post-storm', why: 'Cracked ridge caps + slipped tiles let water in slowly — invisible from ground' },
  { item: 'Hot water service check', cadence: 'Every 2 years (annual for heat pump)', why: 'Sacrificial anode + element wear; failure usually mid-winter Saturday night' },
  { item: 'Smoke alarm test + battery', cadence: 'Annually; replace at 10-year mark', why: 'SA tenancy law + your insurance both require it' },
  { item: 'RCD safety switch test', cadence: 'Every 6 months', why: 'Fails silently; you only find out when you actually need it' },
  { item: 'Air conditioning service', cadence: 'Annually before summer', why: 'Filter, gas pressure, condenser clean; doubles unit lifespan' },
  { item: 'Plumbing pressure check', cadence: 'Annually on pre-1980 homes', why: 'Galvanised pipe degrades from inside; pressure drop is the early signal' },
]

const REACTIVE_BUNDLE = [
  'Loose door hinge or sticking front door',
  'Dripping tap, mixer, or shower head',
  'Power point that buzzes or trips',
  'Hardwired smoke alarm chirping',
  'Wall holes, scuffs, picture-hook patches',
  'Sliding screen door off track',
  'Toilet running or cistern not refilling',
  'Skirting board damage from furniture',
  'Cracked or chipped wall tile',
  'Outdoor tap leak or garden tap broken',
  'Fence panel loose or gate dropped',
  'Ceiling fan wobble or not balanced',
]

const FAQS = [
  { q: 'What is the difference between maintenance and repair?', a: 'Maintenance is the planned work that prevents failure — annual hot-water service, six-monthly RCD test, twice-yearly gutter clean. Repair is the unplanned work after something breaks — burst pipe, blown fuse, ceiling stain. Briks coordinates both. Maintenance bundled into one yearly visit beats five emergency callouts at 11pm.' },
  { q: 'How often should I service my hot water unit?', a: 'Gas + electric storage units: every two years. Heat pump electric: annually (compressor + condensate drain check). Continuous-flow gas: every two years. Sacrificial anode replacement around year 5-7 doubles tank lifespan on storage units.' },
  { q: 'Do you do annual maintenance contracts?', a: 'We coordinate them but do not lock you into a subscription. Most Briks maintenance customers book a single annual sweep — gutters, smoke alarms, RCD test, AC service, hot water check, plumbing pressure — done in one half-day visit. Costed per scope, not per month.' },
  { q: 'Can I bundle a list of small jobs into one visit?', a: 'Yes — and we recommend it. Send the full list, we scope in one on-site inspection, sequence the work in efficient order, and complete in a single visit. Callout cost spreads across the list instead of being charged repeatedly.' },
  { q: 'What is the minimum maintenance job size?', a: 'No minimum. A single sticking door is fine. We bundle smaller tasks into a single coordinator visit so the trip cost is shared across the list.' },
  { q: 'Are maintenance invoices tax-deductible for rental properties?', a: 'Yes for landlords + property investors. Briks invoices issue with full ABN + GST + line-item detail suitable for direct deduction under ATO rental property expense rules. Capital improvements (extensions, kitchen rebuild) we line-item separately so your accountant can split.' },
  { q: 'Do you maintain heritage Adelaide homes?', a: 'Yes. Heritage maintenance is one of our higher-volume categories — bluestone repointing, render repair, fascia + soffit timber replacement, original-profile skirting + architrave matching, sash-window restoration. Our bench includes carpenters + painters who specialise in pre-1940 Adelaide stock.' },
]

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}

const serviceSchema = {
  '@context': 'https://schema.org', '@type': 'Service',
  serviceType: 'Property maintenance + repair coordination',
  name: 'Adelaide Property Maintenance',
  description: 'Briks coordinates preventative + reactive property maintenance across Adelaide. Multi-trade scope bundled into single visits.',
  provider: { '@id': `${SITE.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Adelaide' },
  url: `${SITE.url}/maintenance`,
}

export default function MaintenancePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />

      <PageHero
        eyebrow="Property maintenance"
        title={<>{PRIMARY_KEYWORD}{' '}<span className="text-[#8a6e3f]">— planned + reactive.</span></>}
        subtitle={<>Preventative maintenance prevents 90% of emergency callouts. Reactive maintenance fixes the other 10% inside 60 minutes. Briks coordinates every trade across Adelaide metro plus Hills — bundled into single visits, one written quote, one invoice, twelve-month workmanship guarantee.</>}
      />

      <TrustStrip />

      <section className="relative py-16 md:py-24 bg-[#ffffff]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">Definition</p>
              <h2 className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05] mb-6" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>Maintenance vs repair vs renovation.</h2>
              <div className="space-y-5 text-[#3a3735] text-base md:text-[17px] leading-relaxed">
                <p>Adelaide property maintenance covers two distinct workflows. Preventative maintenance is the scheduled work that stops things failing — annual gutter clean, six-monthly RCD test, annual AC service, biennial hot water flush. Reactive maintenance is the unscheduled fix when something has broken — burst pipe, blown circuit, cracked tile, ceiling stain after rain. Both fall under the maintenance umbrella; renovation is the bigger structural or aesthetic change that goes beyond maintenance.</p>
                <p>Briks coordinates both — multi-trade visits scheduled into the calendar quarter, or a same-day response when something stops working. Same coordinator either way. Same vetted bench. Same invoice format. Twelve-month workmanship guarantee from day of work.</p>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-md overflow-hidden border border-[#e2ddd3] bg-[#fafaf7]">
                <Image src={IMAGES.maintenance} alt="Adelaide property maintenance — multi-trade visit" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-28 bg-[#fafaf7] border-y border-[#e2ddd3]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">Preventative schedule</p>
            <h2 className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>The Adelaide maintenance calendar.</h2>
            <p className="mt-5 text-[#3a3735] text-base md:text-[17px] leading-relaxed">Seven recurring items that catch out most Adelaide property owners. Set the cadence once, let Briks track the renewals.</p>
          </div>
          <ul className="space-y-3">
            {CADENCE.map((c) => (
              <li key={c.item} className="bg-white border border-[#e2ddd3] rounded-md p-5 md:p-6">
                <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
                  <p className="text-[#1a1a1a] text-base md:text-lg tracking-[-0.01em]" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>{c.item}</p>
                  <span className="text-[10px] tracking-[0.18em] uppercase text-[#8a6e3f] bg-[#f3efe5] px-2 py-1 rounded-sm">{c.cadence}</span>
                </div>
                <p className="text-[#3a3735] text-sm md:text-[15px] leading-relaxed"><span className="text-[10px] tracking-[0.16em] uppercase text-[#5a5650] mr-1.5">Why</span>{c.why}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative py-20 md:py-28 bg-[#ffffff]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">Reactive bundle</p>
            <h2 className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>The list you have been meaning to call about.</h2>
            <p className="mt-5 text-[#3a3735] text-base md:text-[17px] leading-relaxed">Bundle all of it into a single Briks visit. Send the list via WhatsApp or the contact form, we scope on-site, knock it over in one trip.</p>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {REACTIVE_BUNDLE.map((r) => (
              <li key={r} className="flex items-start gap-3 bg-[#fafaf7] border border-[#e2ddd3] rounded-md p-4">
                <CheckCircle2 size={14} className="text-[#8a6e3f] shrink-0 mt-1" aria-hidden />
                <span className="text-[#3a3735] text-sm md:text-[15px] leading-relaxed">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative py-20 md:py-28 bg-[#fafaf7] border-y border-[#e2ddd3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10 md:mb-12">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">FAQ</p>
            <h2 className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>Maintenance questions, answered.</h2>
          </div>
          <FAQAccordion items={FAQS} />
        </div>
      </section>

      <section className="relative py-16 md:py-20 bg-[#ffffff]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">Trades coordinated</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { slug: 'plumbing', label: 'Plumbing' },
              { slug: 'electrical', label: 'Electrical' },
              { slug: 'carpentry', label: 'Carpentry' },
              { slug: 'painting', label: 'Painting' },
              { slug: 'roofing', label: 'Roofing' },
              { slug: 'gutters', label: 'Gutters' },
              { slug: 'hvac', label: 'HVAC' },
              { slug: 'handyman', label: 'Handyman' },
            ].map((t) => (
              <Link key={t.slug} href={`/services/${t.slug}`} className="group flex items-center justify-between bg-[#fafaf7] border border-[#e2ddd3] rounded-md px-4 py-3 hover:border-[#8a6e3f]/60 transition-colors">
                <span className="text-[#1a1a1a] text-sm" style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 600 }}>{t.label}</span>
                <ArrowUpRight size={14} className="text-[#8a6e3f] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-28 bg-[#fafaf7] border-t border-[#e2ddd3] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.1] mb-6" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>Got a list?{' '}<span className="text-[#8a6e3f]">Send it.</span></h2>
          <p className="text-[#3a3735] text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">Send a list, a photo, or a description. We scope on-site, quote in writing, knock it over in one visit.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <MovingBorder href="/contact">Get a quote<ArrowRight size={18} aria-hidden /></MovingBorder>
            <a href={whatsappHref("Hi Briks — I have a maintenance list for my Adelaide property:")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#c0bcb4] hover:border-[#8a6e3f]/60 text-[#1a1a1a]/80 hover:text-[#1a1a1a] px-7 py-3.5 transition-colors duration-300 min-h-[44px]"><MessageCircle size={16} aria-hidden />Text us on WhatsApp</a>
          </div>
        </div>
      </section>
    </>
  )
}
