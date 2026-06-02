import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight, MessageCircle } from 'lucide-react'
import PageHero from '@/components/sections/PageHero'
import TrustStrip from '@/components/sections/TrustStrip'
import TestimonialsGrid from '@/components/sections/TestimonialsGrid'
import FAQAccordion from '@/components/sections/FAQAccordion'
import MovingBorder from '@/components/effects/MovingBorder'
import { IMAGES } from '@/lib/images'
import { SITE, whatsappHref } from '@/lib/constants'

const PRIMARY_KEYWORD = 'Adelaide renovations'

export const metadata: Metadata = {
  title: 'Adelaide Renovations — Kitchens, Bathrooms, Extensions, Fit-Outs | Briks',
  description:
    'Adelaide renovation specialists. Kitchen + bathroom rebuilds, extensions, decks, multi-trade reno, commercial fit-out. Project-managed end-to-end. Written line-item quotes, daily 5pm photo updates, single invoice.',
  alternates: { canonical: '/renovations' },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'Renovations', item: `${SITE.url}/renovations` },
  ],
}

const SCOPE = [
  { title: 'Kitchen', body: 'Strip-out + rebuild. Cabinetry, benchtop, plumbing rough-in + fit-off, electrical, splashback, paint. Typical timeline 8-12 weeks calendar (4 weeks on-site).' },
  { title: 'Bathroom', body: 'Strip-out, waterproofing to AS 3740, tile, plumbing, fit-off. Typical timeline 4-6 weeks calendar (2-3 weeks on-site).' },
  { title: 'Extensions', body: 'Single-room and multi-room additions. Council consent + building consent coordinated. Engineer involvement managed.' },
  { title: 'Decks + outdoor', body: 'Decks, pergolas, paving, outdoor kitchens. Footings + drainage + council setback handled.' },
  { title: 'Commercial fit-out', body: 'Retail, cafe, office. After-hours scheduling so trading hours stay clean. AS 1851 sprinkler + fire compliance handled.' },
  { title: 'Structural', body: 'Wall removal, beam install, opening up. Engineer-signed. Building consent lodged.' },
]

const PROCESS = [
  { n: '01', title: 'Site visit + scope', body: 'Coordinator attends, measures, photographs, discusses spec on-site. Free.' },
  { n: '02', title: 'Written line-item quote', body: 'Itemised PDF within 5 working days. Each line is a discrete decision you can adjust to budget. Contingency line included.' },
  { n: '03', title: 'Pre-construction', body: 'Long-lead joinery + appliances ordered. Council consent + building consent lodged where required. Trade sequence locked.' },
  { n: '04', title: 'On-site build', body: 'One coordinator owns the job. Trades sequenced back-to-back. Daily 5pm photo update once on-site work begins.' },
  { n: '05', title: 'Sign-off + handover', body: 'Walk-through, defect list cleared, photo report PDF, Certificates of Compliance, single invoice. 12-month workmanship guarantee starts.' },
]

const EXCLUDED = [
  'New home builds (we do not compete with project builders)',
  'Granny flats requiring new dwelling consent',
  'Demolition only (we demo as part of reno, not as standalone)',
  'Pool construction (we coordinate pool fence compliance only)',
]

const FAQS = [
  { q: 'Do you do new home builds?', a: 'No. Briks coordinates renovation, repair, extension, and fit-out work. New-build projects need a project builder licensed for that scale and duration; we will refer if asked.' },
  { q: 'How long does a kitchen reno take?', a: 'A standard 3-trade kitchen refit takes 4 weeks of on-site work plus 4-8 weeks of supply lead time for benchtops and custom cabinetry. Calendar time from quote sign-off is typically 8-12 weeks.' },
  { q: 'How long does a bathroom reno take?', a: 'Standard bathroom strip-and-rebuild: 12-15 working days on-site (waterproofing cure time adds 2 days). Calendar time from quote sign-off including fixture supply lead: 4-6 weeks.' },
  { q: 'Do you handle council approvals?', a: 'Yes. Briks coordinates development consent + building consent applications where required (extensions, structural changes, decks over 1m, commercial fit-outs in heritage zones). Application fees are passed through; coordination is included in the quote.' },
  { q: 'Can I live in the property during renovation?', a: 'Depends on scope. Single-bathroom homes mid-bathroom-reno: typically no (plan a temporary shower). Kitchen reno: yes with a temporary microwave + bar fridge setup. Whole-house reno or floor-level structural: usually no.' },
  { q: 'What is a PC sum?', a: 'A PC (Prime Cost) sum is an allowance in the quote for items the customer chooses later — typically appliances, tapware, handles. The PC sum is replaced by the actual supplier invoice when items are selected.' },
  { q: 'Who is on-site each day?', a: 'A Briks coordinator runs the schedule. Trades attend on their sequenced days. The coordinator visits the site at minimum twice weekly during active construction. Daily 5pm photo updates from the lead trade.' },
  { q: 'What if costs change mid-build?', a: 'Quoted contingency (typically 8-12%) covers most surprises. Anything beyond contingency is a written variation request — you sign off before work continues. No retrospective cost adjustments.' },
]

const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const serviceSchema = { '@context': 'https://schema.org', '@type': 'Service', serviceType: 'Renovation + construction project management', name: 'Adelaide Renovations + Construction', description: 'Briks coordinates kitchen, bathroom, extension, and commercial fit-out renovation projects across Adelaide. Multi-trade scope, project-managed end-to-end, line-item written quotes.', provider: { '@id': `${SITE.url}/#organization` }, areaServed: { '@type': 'City', name: 'Adelaide' }, url: `${SITE.url}/renovations` }

export default function RenovationsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />

      <PageHero
        eyebrow="Renovations + construction"
        title={<>{PRIMARY_KEYWORD}{' '}<span className="text-[#8a6e3f]">— project-managed.</span></>}
        subtitle={<>Kitchens, bathrooms, extensions, decks, structural changes, commercial fit-outs. Five to ten trades on the same site, run on a sequenced schedule, finished on spec. No new-home builds — everything else is in scope. Free on-site scope, line-item written quote, daily photo updates, single invoice.</>}
      />

      <TrustStrip />

      <section className="relative py-16 md:py-24 bg-[#ffffff]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">What this is</p>
              <h2 className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05] mb-6" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>A renovation managed like a project, not a hopeful ask.</h2>
              <div className="space-y-5 text-[#3a3735] text-base md:text-[17px] leading-relaxed">
                <p>Adelaide renovations done well are a logistics job. Right specialist on the right day, sequenced so trades don&rsquo;t wait on each other, signed off cleanly at the end. Done badly they are a guessing game with five contractors who blame each other when something slips.</p>
                <p>Briks runs them as a project. Single coordinator from first site visit through to handover. Line-item written quote with optional spec variations. Pre-construction sequencing locked before any tool leaves the truck. Daily 5pm photo update on every active build day. Twelve-month workmanship guarantee on completion.</p>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-md overflow-hidden border border-[#e2ddd3] bg-[#fafaf7]">
                <Image src={IMAGES.renovations} alt="Adelaide renovation in progress" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-28 bg-[#fafaf7] border-y border-[#e2ddd3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">Scope</p>
            <h2 className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>What we cover.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SCOPE.map((s) => (
              <div key={s.title} className="bg-white border border-[#e2ddd3] rounded-md p-6">
                <p className="text-[#1a1a1a] text-lg md:text-xl tracking-[-0.01em] mb-3" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>{s.title}</p>
                <p className="text-[#3a3735] text-sm md:text-[15px] leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-28 bg-[#ffffff]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">Process</p>
            <h2 className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>Five stages from first call to keys-back.</h2>
          </div>
          <ol className="space-y-5">
            {PROCESS.map((step) => (
              <li key={step.n} className="relative bg-[#fafaf7] border border-[#e2ddd3] rounded-md p-6 md:p-7 pl-7">
                <span aria-hidden className="absolute left-0 top-6 bottom-6 w-[3px] bg-[#8a6e3f] rounded-r-sm" />
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-[#8a6e3f] text-2xl tabular-nums" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 700 }}>{step.n}</span>
                  <h3 className="text-[#1a1a1a] text-lg md:text-xl tracking-[-0.01em]" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>{step.title}</h3>
                </div>
                <p className="text-[#3a3735] text-sm md:text-[15px] leading-relaxed">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative py-16 md:py-20 bg-[#fafaf7] border-y border-[#e2ddd3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">Not in scope</p>
          <h2 className="text-[#1a1a1a] text-2xl md:text-3xl tracking-[-0.01em] mb-6" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>What Briks does not do.</h2>
          <ul className="space-y-2.5">
            {EXCLUDED.map((e) => (
              <li key={e} className="flex items-start gap-3 bg-white border border-[#e2ddd3] rounded-md p-4">
                <span className="text-[#a83434] shrink-0 mt-0.5" aria-hidden>—</span>
                <span className="text-[#3a3735] text-sm md:text-[15px] leading-relaxed">{e}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <TestimonialsGrid filterAudience="renovations" eyebrow="What reno customers say" />

      <section className="relative py-20 md:py-28 bg-[#ffffff]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10 md:mb-12">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">FAQ</p>
            <h2 className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>Renovation questions, answered.</h2>
          </div>
          <FAQAccordion items={FAQS} />
        </div>
      </section>

      <section className="relative py-16 md:py-20 bg-[#fafaf7] border-y border-[#e2ddd3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">Related</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { href: '/blog/bathroom-renovation-timeline-adelaide', label: 'Bathroom timeline' },
              { href: '/blog/kitchen-refit-quote-adelaide', label: 'Kitchen quote guide' },
              { href: '/blog/commercial-fit-out-timeline-adelaide', label: 'Fit-out timeline' },
              { href: '/blog/heritage-home-plumbing-adelaide-eastern-suburbs', label: 'Heritage plumbing' },
              { href: '/services/carpentry', label: 'Carpentry' },
              { href: '/services/tiling', label: 'Tiling' },
              { href: '/case-studies/glenelg-kitchen-refit', label: 'Kitchen case study' },
              { href: '/our-tradies', label: 'Our tradies' },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="group flex items-center justify-between bg-white border border-[#e2ddd3] rounded-md px-4 py-3 hover:border-[#8a6e3f]/60 transition-colors">
                <span className="text-[#1a1a1a] text-sm" style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 600 }}>{l.label}</span>
                <ArrowUpRight size={14} className="text-[#8a6e3f] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-28 bg-[#ffffff] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.1] mb-6" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>Planning a renovation?{' '}<span className="text-[#8a6e3f]">Get the line-item quote.</span></h2>
          <p className="text-[#3a3735] text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">Free on-site scope. Line-item written quote within 5 working days. Fixed contingency, no surprises.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <MovingBorder href="/contact">Get a quote<ArrowRight size={18} aria-hidden /></MovingBorder>
            <a href={whatsappHref("Hi Briks — I'm planning a renovation in Adelaide:")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#c0bcb4] hover:border-[#8a6e3f]/60 text-[#1a1a1a]/80 hover:text-[#1a1a1a] px-7 py-3.5 transition-colors duration-300 min-h-[44px]"><MessageCircle size={16} aria-hidden />Text us on WhatsApp</a>
          </div>
        </div>
      </section>
    </>
  )
}
