import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight, MessageCircle, AlertTriangle, Phone, Clock } from 'lucide-react'
import PageHero from '@/components/sections/PageHero'
import TrustStrip from '@/components/sections/TrustStrip'
import FAQAccordion from '@/components/sections/FAQAccordion'
import MovingBorder from '@/components/effects/MovingBorder'
import { IMAGES } from '@/lib/images'
import { SITE, whatsappHref } from '@/lib/constants'

const PRIMARY_KEYWORD = '24/7 emergency tradie Adelaide'

export const metadata: Metadata = {
  title: '24/7 Emergency Tradie Adelaide — Burst Pipe, No Power, Gas | Briks',
  description:
    '24/7 emergency tradie response across Adelaide metro + Hills. Burst pipe, no hot water, no power, gas leak, storm damage. 60-minute dispatch, make-safe first, written quote follows. Insurance-ready PDF reports.',
  alternates: { canonical: '/emergency' },
}

const breadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'Emergency', item: `${SITE.url}/emergency` },
  ],
}

const EMERGENCY_TYPES = [
  { title: 'Active leak / burst pipe', body: 'Water visible, ceiling staining, damp spreading, no isolation valve nearby. Briks plumber dispatched inside 60 minutes. Step one before we arrive: shut off mains at the street meter.' },
  { title: 'No hot water', body: 'Mid-winter, no shower, tenant complaint. Diagnosis on-site — most causes (failed element, tripped breaker, gas pilot out, valve failure) can be made-safe and quoted same visit.' },
  { title: 'No power / electrical fault', body: 'Whole-house outage that is not network-side, repeated tripping, switchboard buzzing, burning smell. A-grade spark dispatched. Make-safe first, then full diagnosis.' },
  { title: 'Gas leak / gas smell', body: 'Hissing, browning grass over a buried line, gas smell indoors. Step one before we arrive: turn off meter at street, ventilate, evacuate if strong. Type A gas fitter dispatched immediately.' },
  { title: 'Storm damage / make-safe', body: 'Roof tile loose, gutter detached, water ingress, broken window, structural damage. Tarps + temporary patching + water diversion within 24 hours. Insurance-ready PDF same day.' },
  { title: 'Security breach', body: 'Forced lock, broken door, smashed window. Briks coordinates lock-change, board-up, and replacement glazier — typically same day for metro callouts.' },
]

const BEFORE_WE_ARRIVE = [
  { step: 1, title: 'Active leak', body: 'Shut off the water at the street meter (handle parallel to pipe = off). Move valuables clear of wet zone. Take photos of the source if safe.' },
  { step: 2, title: 'Gas smell', body: 'Turn off gas meter at the street. Open windows + doors for ventilation. Do not use electrical switches or open flames. Step outside until we arrive if smell is strong.' },
  { step: 3, title: 'No power', body: 'Check whether the streetlights / neighbours have power — if yes, the fault is internal. Open the switchboard, check for tripped circuits, attempt one reset. If trip recurs, leave off + wait for the sparky.' },
  { step: 4, title: 'No hot water', body: 'Check the unit pilot light (gas) or thermostat reset switch (electric). One reset attempt. Photograph the unit data plate so we can bring the right replacement parts.' },
  { step: 5, title: 'Storm damage', body: 'Stay clear of fallen tiles, broken glass, fallen power lines. Photograph from a safe distance for the insurer. Do not climb on a damaged roof.' },
]

const FAQS = [
  { q: 'What counts as an emergency?', a: 'A genuine emergency is an immediate threat to property or safety: active leak, gas smell, no power (entire house, not network outage), no hot water with tenant in residence, broken access (door / lock / window), storm damage with active water ingress, structural damage. Other issues are urgent but routine — same-day or next-day attendance.' },
  { q: 'What is your emergency response time?', a: 'Inside 60 minutes across Adelaide metropolitan area, 24/7. Adelaide Hills suburbs (Stirling, Aldgate, Mount Barker, Hahndorf, Crafers, Bridgewater) add 15-30 minutes depending on conditions.' },
  { q: 'Do you charge after-hours premiums?', a: 'Emergency callouts after standard business hours carry a callout premium — disclosed upfront before dispatch. There is never a hidden fee. The premium covers the on-call tradie and the priority response. Make-safe work proceeds; full repair work is quoted in writing once the property is stable.' },
  { q: 'Insurance work — do you do it?', a: 'Yes. Every emergency callout includes photo documentation, written cause-and-effect summary, and itemised cost breakdown. Most home + landlord + business insurers accept Briks reports without an additional assessor visit. PDF report emailed within 24 hours of make-safe.' },
  { q: 'What should I do while waiting for the tradie?', a: 'For active leaks: shut off the water at the street meter. For gas: turn off the gas meter at the street, ventilate, evacuate if smell is strong. For no power: check if the network is out and try one switchboard reset. For storm damage: stay clear of damaged areas and photograph from safe distance. Detailed pre-arrival steps for each emergency type are on this page.' },
  { q: 'Can you make-safe first then quote?', a: 'Yes — and this is the standard flow. Briks tradie attends, makes the property safe (turn off services, tarp the roof, isolate the leak, board up the window), photographs damage, then quotes the full repair in writing once you can make a calm decision.' },
  { q: 'Do you do gas emergencies?', a: 'Yes. Briks dispatches PIC Type A licensed gas fitters for gas-related emergencies. If the smell is overwhelming, evacuate the property and turn off the meter at the street before we arrive. Do not use electrical switches or naked flames.' },
  { q: 'Service area for emergencies?', a: 'Adelaide metropolitan area plus Adelaide Hills (Stirling, Aldgate, Mount Barker, Hahndorf, Crafers, Bridgewater, Aldinga Beach perimeter). Outer regional areas by arrangement subject to bench availability — message via WhatsApp first for confirmation.' },
  { q: 'Will my insurance cover the callout?', a: 'Most home + landlord + commercial policies cover emergency callouts under "make-safe" entitlement plus the full repair under standard claim handling. Excess applies per your policy. Briks documents everything in insurance-friendly format from the first attendance.' },
  { q: 'What if it turns out not to be an emergency?', a: 'You pay the agreed callout fee for attendance. The tradie still diagnoses on-site and provides a written quote for the non-urgent repair. We do not retroactively bill emergency rates for routine issues.' },
]

const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }

// HowTo schema — high AI Overview citation value for "what to do in [emergency]" queries
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'What to do before an emergency tradie arrives in Adelaide',
  description: 'Five emergency types and the safe pre-arrival actions to take before a Briks tradie attends.',
  step: BEFORE_WE_ARRIVE.map((s) => ({
    '@type': 'HowToStep',
    name: s.title,
    text: s.body,
    position: s.step,
  })),
}

const serviceSchema = { '@context': 'https://schema.org', '@type': 'Service', serviceType: 'Emergency building services dispatch', name: '24/7 Emergency Tradie Dispatch — Adelaide', description: '24/7 emergency tradie response across Adelaide. 60-minute metro dispatch for plumbing, electrical, gas, roofing, and storm-damage emergencies.', provider: { '@id': `${SITE.url}/#organization` }, areaServed: { '@type': 'City', name: 'Adelaide' }, url: `${SITE.url}/emergency`, hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '00:00', closes: '23:59' } }

export default function EmergencyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />

      <PageHero
        eyebrow="24/7 emergency response"
        title={<>Emergency tradie Adelaide{' '}<span className="text-[#8a6e3f]">— inside 60 minutes.</span></>}
        subtitle={<>Active leak. No power. No hot water. Gas smell. Storm damage. Briks dispatches a licensed Adelaide tradie inside 60 minutes across metro, 24/7. Make-safe first, written quote after the property is stable. Insurance-ready PDF report inside 24 hours.</>}
      />

      {/* Urgent CTA right after hero — different from page CTAs below */}
      <section className="relative bg-[#1a1a1a] text-white border-y border-[#e2ddd3]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangle size={20} className="text-[#8a6e3f]" />
            <div>
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-0.5">Active emergency right now?</p>
              <p className="text-white text-base md:text-lg" style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 700 }}>Text the details — fastest response.</p>
            </div>
          </div>
          <a href={whatsappHref(`EMERGENCY — Adelaide. Address + issue:`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#8a6e3f] hover:bg-[#b89868] text-white px-6 py-3 rounded-sm min-h-[48px] transition-colors" style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 700 }}>
            <MessageCircle size={16} aria-hidden />WhatsApp now · {SITE.whatsappDisplay}
          </a>
        </div>
      </section>

      <TrustStrip />

      <section className="relative py-16 md:py-24 bg-[#ffffff]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">What counts as emergency</p>
              <h2 className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05] mb-6" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>An immediate threat to property or safety.</h2>
              <div className="space-y-5 text-[#3a3735] text-base md:text-[17px] leading-relaxed">
                <p>A genuine emergency is something that will cause further damage or safety risk if left until business hours. Active leak. No power across the whole house. No hot water with a tenant in residence. Gas smell. Storm damage with water actively coming in. Forced entry. Anything else is urgent but routine — same-day or next-day routine attendance.</p>
                <p>Briks runs an after-hours roster across plumbing, electrical, gas, roofing, and locksmith. Sixty-minute dispatch across metro Adelaide, 24/7. Make-safe action first; full repair quoted in writing once the property is stable. Insurance-friendly photo documentation from the first attendance.</p>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-md overflow-hidden border border-[#e2ddd3] bg-[#fafaf7]">
                <Image src={IMAGES.emergency} alt="After-hours emergency tradie van Adelaide" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-28 bg-[#fafaf7] border-y border-[#e2ddd3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">Emergency types we cover</p>
            <h2 className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>Six call categories.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {EMERGENCY_TYPES.map((e) => (
              <div key={e.title} className="bg-white border border-[#e2ddd3] rounded-md p-6">
                <p className="text-[#1a1a1a] text-lg tracking-[-0.01em] mb-3" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>{e.title}</p>
                <p className="text-[#3a3735] text-sm md:text-[15px] leading-relaxed">{e.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-28 bg-[#ffffff]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">Before we arrive</p>
            <h2 className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>Five safe actions to take right now.</h2>
            <p className="mt-5 text-[#3a3735] text-base md:text-[17px] leading-relaxed">These steps reduce damage + keep you safe while the tradie is en route. Match the action to your emergency type.</p>
          </div>
          <ol className="space-y-5">
            {BEFORE_WE_ARRIVE.map((s) => (
              <li key={s.step} className="relative bg-[#fafaf7] border border-[#e2ddd3] rounded-md p-6 md:p-7 pl-7">
                <span aria-hidden className="absolute left-0 top-6 bottom-6 w-[3px] bg-[#8a6e3f] rounded-r-sm" />
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-[#8a6e3f] text-2xl tabular-nums" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 700 }}>{String(s.step).padStart(2, '0')}</span>
                  <h3 className="text-[#1a1a1a] text-lg md:text-xl tracking-[-0.01em]" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>{s.title}</h3>
                </div>
                <p className="text-[#3a3735] text-sm md:text-[15px] leading-relaxed">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative py-20 md:py-28 bg-[#fafaf7] border-y border-[#e2ddd3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10 md:mb-12">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">FAQ</p>
            <h2 className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>Emergency questions, answered.</h2>
          </div>
          <FAQAccordion items={FAQS} />
        </div>
      </section>

      <section className="relative py-16 md:py-20 bg-[#ffffff]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">Trades dispatched on emergency</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { slug: 'plumbing', label: 'Plumbing' },
              { slug: 'electrical', label: 'Electrical' },
              { slug: 'gas', label: 'Gas' },
              { slug: 'roofing', label: 'Roofing' },
              { slug: 'gutters', label: 'Gutters' },
              { slug: 'hvac', label: 'HVAC' },
            ].map((t) => (
              <Link key={t.slug} href={`/services/${t.slug}`} className="group flex items-center justify-between bg-[#fafaf7] border border-[#e2ddd3] rounded-md px-4 py-3 hover:border-[#8a6e3f]/60 transition-colors">
                <span className="text-[#1a1a1a] text-sm" style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 600 }}>{t.label}</span>
                <ArrowUpRight size={14} className="text-[#8a6e3f] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-28 bg-[#1a1a1a] text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.1] mb-6" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>Active emergency right now?{' '}<span className="text-[#8a6e3f]">Text us — fastest path.</span></h2>
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">WhatsApp the address + a one-line description. Tradie dispatched inside 60 minutes across Adelaide metro.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={whatsappHref(`EMERGENCY — Adelaide. Address + issue:`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#8a6e3f] hover:bg-[#b89868] text-white px-8 py-4 rounded-full min-h-[48px] transition-colors" style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 700 }}>
              <MessageCircle size={16} aria-hidden />WhatsApp · {SITE.whatsappDisplay}
            </a>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 hover:border-white text-white/90 hover:text-white px-7 py-4 transition-colors min-h-[48px]">Use the form instead</Link>
          </div>
          <p className="mt-6 text-[10px] tracking-[0.18em] uppercase text-white/40">
            <Clock size={11} className="inline mr-1.5 -mt-0.5" />60-MIN METRO · 24/7 · INSURANCE-READY REPORTS
          </p>
        </div>
      </section>
    </>
  )
}
