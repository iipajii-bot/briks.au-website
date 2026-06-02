import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight, MessageCircle, CheckCircle2 } from 'lucide-react'
import PageHero from '@/components/sections/PageHero'
import TrustStrip from '@/components/sections/TrustStrip'
import FAQAccordion from '@/components/sections/FAQAccordion'
import MovingBorder from '@/components/effects/MovingBorder'
import { IMAGES } from '@/lib/images'
import { SITE, whatsappHref } from '@/lib/constants'

const PRIMARY_KEYWORD = 'Handyman Adelaide'

export const metadata: Metadata = {
  title: 'Handyman Adelaide — Small Jobs, No Minimum | Briks Building Services',
  description:
    'Adelaide handyman service for small jobs around the home or office. Picture hanging, TV mounting, flat-pack, fence repair, end-of-lease patch-and-paint. No minimum, no callout fee, written fixed quotes.',
  alternates: { canonical: '/handyman' },
}

const breadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'Handyman', item: `${SITE.url}/handyman` },
  ],
}

const COMMON_JOBS = [
  'Picture hanging, mirror mounting, gallery walls',
  'TV wall mounting (plaster, brick, stud) with cable management',
  'Flat-pack assembly (IKEA, Kmart, custom)',
  'Sticky door adjustment, hinge replacement, lock fitting',
  'Fly screen + security door re-mesh and replacement',
  'Fence panel replacement + gate repair',
  'Curtain rod, blind, window furnishing install',
  'Shelving, bookcase, storage bracket install',
  'Tap washer replacement (non-licensed minor plumbing)',
  'End-of-lease patch, fill, paint touch-up, odd-job list',
  'Garden tap repair, hose reel install',
  'Letterbox repair + house number install',
]

const FAQS = [
  { q: 'Do handymen need a license in SA?', a: 'Handymen performing work above the SA Builders License threshold (currently $12,000 inclusive of labour and materials) need a BLD handyman class license. Below the threshold, no license is required — but every Briks handyman holds public liability insurance regardless of job size.' },
  { q: 'What is the minimum job size?', a: 'No minimum. A single picture hang is fine. We bundle small tasks into a single visit so the callout cost spreads across the list — better value than calling for one item at a time.' },
  { q: 'Can a handyman do plumbing?', a: 'A handyman can replace a tap washer or unblock a drain in some circumstances, but anything beyond minor consumer repair is licensed plumbing work in SA and must go to a PIC-licensed plumber. Briks routes the call to the right tradie — same coordinator, same invoice.' },
  { q: 'How much does a handyman cost per hour in Adelaide?', a: 'Briks does not publish hourly rates. Each job is quoted either by the hour or as a fixed list — your choice. Send the job list (photos help) via WhatsApp and we send back a written quote before booking. No callout fee buried in the fine print.' },
  { q: 'Do you do end-of-lease patch-up?', a: 'Yes. End-of-lease (also called bond clean prep) is one of the most common Briks handyman jobs. We work off the property condition report, fix-fill-paint each line item, photograph each fix, and send a completion summary back to the property manager.' },
  { q: 'Can you mount a TV on a brick wall?', a: 'Yes. TV mounting on brick uses masonry bolts rated for the panel weight and bracket spec. Briks handymen mount on plasterboard (with stud finder), brick, and concrete render. Cable management (concealed in conduit or wall channel) included on request.' },
  { q: 'Flat pack assembly — how long does it take?', a: 'Time depends on the unit. A small IKEA bedside table is 30-45 minutes. A wardrobe is 2-3 hours. A full kitchen flat-pack is a one-day job. Briks quotes a fixed price per unit so you know before booking.' },
  { q: 'Can you fit blinds and curtains?', a: 'Yes. Briks handymen install roller blinds, venetians, plantation shutters, curtain tracks, and pelmets. We can also re-mount existing fixtures that have come loose. Tools and brackets supplied where needed.' },
]

const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const serviceSchema = { '@context': 'https://schema.org', '@type': 'Service', serviceType: 'Handyman services', name: 'Handyman Adelaide — No Minimum', description: 'Adelaide handyman for small jobs around the home or office. Picture hanging, TV mounting, flat pack, fence repair, end-of-lease patch-and-paint.', provider: { '@id': `${SITE.url}/#organization` }, areaServed: { '@type': 'City', name: 'Adelaide' }, url: `${SITE.url}/handyman` }

export default function HandymanPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />

      <PageHero
        eyebrow="Handyman"
        title={<>{PRIMARY_KEYWORD}{' '}<span className="text-[#8a6e3f]">— no minimum.</span></>}
        subtitle={<>The jobs that fall through the cracks because they are not big enough to bother a tradie. Picture hanging, TV mounting, flat pack, sticky doors, fly screens, end-of-lease patch-up. Briks coordinates a handyman whose whole job is the small stuff. Send a list, we knock it over in one visit.</>}
      />

      <TrustStrip />

      <section className="relative py-16 md:py-24 bg-[#ffffff]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">What this is</p>
              <h2 className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05] mb-6" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>Small jobs, done properly, no minimum.</h2>
              <div className="space-y-5 text-[#3a3735] text-base md:text-[17px] leading-relaxed">
                <p>Most tradies do not want to drive across Adelaide for a single picture hang. Briks does — because we bundle. Send the full list of small jobs you have been meaning to call about, we scope on-site, sequence the visit efficiently, and knock the list over in one trip. The callout cost spreads across the list instead of being charged per item.</p>
                <p>For jobs that need a licensed trade (plumbing, electrical, gas), Briks routes the work to the right specialist without you needing to make a second call. Same coordinator, same invoice. No referral chains, no "I don&rsquo;t do that."</p>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-md overflow-hidden border border-[#e2ddd3] bg-[#fafaf7]">
                <Image src={IMAGES.handyman} alt="Adelaide handyman patch + sand wall repair" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-28 bg-[#fafaf7] border-y border-[#e2ddd3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">Common jobs</p>
            <h2 className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>What we handle.</h2>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {COMMON_JOBS.map((j) => (
              <li key={j} className="flex items-start gap-3 bg-white border border-[#e2ddd3] rounded-md p-4">
                <CheckCircle2 size={14} className="text-[#8a6e3f] shrink-0 mt-1" aria-hidden />
                <span className="text-[#3a3735] text-sm md:text-[15px] leading-relaxed">{j}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative py-20 md:py-28 bg-[#ffffff]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10 md:mb-12">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">FAQ</p>
            <h2 className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>Handyman questions, answered.</h2>
          </div>
          <FAQAccordion items={FAQS} />
        </div>
      </section>

      <section className="relative py-16 md:py-20 bg-[#fafaf7] border-y border-[#e2ddd3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">Related</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { href: '/services/handyman', label: 'Handyman trade page' },
              { href: '/services/painting', label: 'Painting' },
              { href: '/services/carpentry', label: 'Carpentry' },
              { href: '/services/plumbing', label: 'Plumbing' },
              { href: '/for-landlords', label: 'For landlords' },
              { href: '/case-studies/norwood-end-of-lease-turnaround', label: 'EOL case study' },
              { href: '/blog/end-of-lease-repair-checklist-sa-landlords', label: 'EOL checklist' },
              { href: '/contact', label: 'Send a job list' },
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
          <h2 className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.1] mb-6" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>Got a list?{' '}<span className="text-[#8a6e3f]">Send it.</span></h2>
          <p className="text-[#3a3735] text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">WhatsApp the list with photos. We scope it, quote it, knock it over in one visit.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <MovingBorder href="/contact">Get a quote<ArrowRight size={18} aria-hidden /></MovingBorder>
            <a href={whatsappHref("Hi Briks — handyman list for my Adelaide property:")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#c0bcb4] hover:border-[#8a6e3f]/60 text-[#1a1a1a]/80 hover:text-[#1a1a1a] px-7 py-3.5 transition-colors duration-300 min-h-[44px]"><MessageCircle size={16} aria-hidden />Text us on WhatsApp</a>
          </div>
        </div>
      </section>
    </>
  )
}
