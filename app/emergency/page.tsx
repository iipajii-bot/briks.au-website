import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight, MessageCircle, AlertTriangle, Phone, Clock } from 'lucide-react'
import PageHero from '@/components/sections/PageHero'
import TrustStrip from '@/components/sections/TrustStrip'
import FAQAccordion from '@/components/sections/FAQAccordion'
import MovingBorder from '@/components/effects/MovingBorder'
import { IMAGES } from '@/lib/images'
import { SITE, whatsappHref, sitePhone, sitePhoneHref } from '@/lib/constants'

const PRIMARY_KEYWORD = 'After-emergency repair help in Adelaide'

export const metadata: Metadata = {
  title: { absolute: 'Urgent Repairs in Adelaide: What To Do First | Briks' },
  description:
    'Burst pipe, no power or a gas smell? Make it safe first: 000, gas 1800 427 532, SA Power Networks 13 13 66. Then Briks organises the repair.',
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
  { title: 'Active leak / burst pipe', body: 'Water visible, ceiling staining, damp spreading, no isolation valve nearby. Briks organises a plumber licensed in South Australia for plumbing work. Step one before the trade arrives: shut off mains at the street meter if safe.' },
  { title: 'No hot water', body: 'Mid-winter, no shower, tenant complaint. A licensed plumber or gas fitter finds the cause, such as a failed element, tripped breaker or pilot out, and quotes the fix.' },
  { title: 'No power / electrical fault', body: 'Whole-house outage that is not network-side, repeated tripping, switchboard buzzing, burning smell. Briks organises an electrician licensed in South Australia for electrical work. Make safe first, then full diagnosis.' },
  { title: 'Gas leak / gas smell', body: 'Hissing, browning grass over a buried line, gas smell indoors. Leave the area, do not use switches or flames, call Australian Gas Networks on 1800 427 532. If anyone is in danger call 000. Briks can organise the repair afterwards once it is safe.' },
  { title: 'Storm damage / make-safe', body: 'Roof tile loose, gutter detached, water ingress, broken window, structural damage. Briks organises tarps, temporary patching and water diversion. Before and after photos and one invoice for each finished job.' },
  { title: 'Security breach', body: 'Forced lock, broken door, smashed window. Briks coordinates lock changes, board-up and replacement glazing.' },
]

const BEFORE_WE_ARRIVE = [
  { step: 1, title: 'Active leak', body: 'Shut off the water at the street meter (handle parallel to pipe = off). Move valuables clear of wet zone. Take photos of the source if safe.' },
  { step: 2, title: 'Gas smell', body: 'Leave the area. Do not use electrical switches, phones near the leak or open flames. Call Australian Gas Networks on 1800 427 532 and follow their advice.' },
  { step: 3, title: 'No power', body: 'Check whether the streetlights / neighbours have power — if yes, the fault is internal. Open the switchboard, check for tripped circuits, attempt one reset. If it trips again, leave it off and call us to organise a licensed electrician.' },
  { step: 4, title: 'No hot water', body: 'Check the unit pilot light (gas) or thermostat reset switch (electric). One reset attempt. Photograph the unit’s data plate so the trade knows what it is.' },
  { step: 5, title: 'Storm damage', body: 'Stay clear of fallen tiles, broken glass, fallen power lines. Photograph from a safe distance for the insurer. Do not climb on a damaged roof.' },
]

const FAQS = [
  { q: 'What counts as an emergency?', a: 'A genuine emergency is an immediate threat to property or safety: active leak, gas smell, no power (entire house, not network outage), no hot water with tenant in residence, broken access (door / lock / window), storm damage with active water ingress, structural damage. Other issues are urgent but routine.' },
  { q: 'What is your emergency response time?', a: 'Briks organises repairs once it is safe. It does not offer 24/7, after-hours or overnight cover, and gives no response time, arrival time or completion time.' },
  { q: 'Do you offer after-hours cover?', a: 'Briks does not offer after-hours or overnight cover, emergency dispatch or priority response. For a gas leak, leave the area, do not use switches or flames, and call Australian Gas Networks on 1800 427 532. For power out or wires down, call SA Power Networks on 13 13 66. If anyone is in danger, call 000. Briks can organise the repair afterwards once it is safe.' },
  { q: 'Insurance work: do you do it?', a: 'Briks provides before and after photos and one invoice for each finished job. Homeowners and businesses get a written quote before work starts. Landlords and agencies set an approval limit. Check your insurer for claim requirements.' },
  { q: 'What should I do while waiting for the tradie?', a: 'If anyone is in danger, call 000. For a burst pipe: turn water off at the meter if safe. For a gas smell: leave the area, do not use switches or flames, call Australian Gas Networks on 1800 427 532. For power out or wires down: call SA Power Networks on 13 13 66. For storm damage: stay clear of damaged areas and photograph from a safe distance. Briks can organise the repair afterwards once it is safe.' },
  { q: 'Can you make-safe first then quote?', a: 'Yes — and this is the standard flow. Briks tradie attends, makes the property safe (turn off services, tarp the roof, isolate the leak, board up the window), photographs damage, then quotes the full repair in writing once you can make a calm decision.' },
  { q: 'Do you do gas emergencies?', a: 'Briks can organise an independent gas fitter who is licensed in South Australia for gas fitting work. If you smell gas, leave the area, do not use switches or flames, and call Australian Gas Networks on 1800 427 532. Briks can organise the repair afterwards once it is safe.' },
  { q: 'Service area for emergencies?', a: 'Briks is an Adelaide business. Call 0449 517 367 to discuss your repair, maintenance or renovation job.' },
  { q: 'Will my insurance cover the callout?', a: 'Insurance cover depends on your policy. Check your insurer and excess. Finished jobs include before and after photos and one invoice from Briks. Homeowners and businesses get a written quote before work starts.' },
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

const serviceSchema = { '@context': 'https://schema.org', '@type': 'Service', serviceType: 'Emergency building services dispatch', name: 'Adelaide repair help', description: 'Briks is an Adelaide business that organises repairs, maintenance and renovation work. Independent trades are licensed in South Australia for their own work.', provider: { '@id': `${SITE.url}/#organization` }, areaServed: { '@type': 'City', name: 'Adelaide' }, url: `${SITE.url}/emergency`, hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '00:00', closes: '23:59' } }

export default function EmergencyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />

      <PageHero
        eyebrow="Repair help"
        title={<>Urgent repair in Adelaide?{' '}<span className="text-[#8a6e3f]">Make it safe first.</span></>}
        subtitle={<>Active leak. No power. No hot water. Gas smell. Storm damage. If anyone is in danger, call 000. Gas smell: leave the area, do not use switches or flames, call Australian Gas Networks on 1800 427 532. Power out or wires down: call SA Power Networks on 13 13 66. Burst pipe: turn water off at the meter if safe. Briks can organise the repair afterwards once it is safe.</>}
      />

      {/* Urgent CTA right after hero — different from page CTAs below */}
      <section className="relative bg-[#1a1a1a] text-white border-y border-[#e2ddd3]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangle size={20} className="text-[#8a6e3f]" />
            <div>
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-0.5">Need a repair organised?</p>
              <p className="text-white text-base md:text-lg" style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 700 }}>Text the details and the address.</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            {sitePhone() && (
              <a href={sitePhoneHref()} className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#fafaf7] text-[#1a1a1a] px-6 py-3 rounded-sm min-h-[48px] transition-colors" style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 700 }} aria-label={`Call Briks now on ${sitePhone()}`}>
                <Phone size={16} aria-hidden className="text-[#8a6e3f]" />Call now · {sitePhone()}
              </a>
            )}
            <a href={whatsappHref(`EMERGENCY — Adelaide. Address + issue:`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#8a6e3f] hover:bg-[#b89868] text-white px-6 py-3 rounded-sm min-h-[48px] transition-colors" style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 700 }}>
              <MessageCircle size={16} aria-hidden />WhatsApp · {SITE.whatsappDisplay}
            </a>
          </div>
        </div>
      </section>

      <TrustStrip />

      <section className="relative py-16 md:py-24 bg-[#ffffff]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <p className="eyebrow mb-4">What counts as emergency</p>
              <h2 className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05] mb-6" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>An immediate threat to property or safety.</h2>
              <div className="space-y-5 text-[#3a3735] text-base md:text-[17px] leading-relaxed">
                <p>A genuine emergency is something that will cause further damage or safety risk if left until business hours. If anyone is in danger, call 000. Gas smell: leave the area, do not use switches or flames, call Australian Gas Networks on 1800 427 532. Power out or wires down: call SA Power Networks on 13 13 66. Burst pipe: turn water off at the meter if safe. Briks does not offer after-hours cover. It can organise repairs once it is safe.</p>
                <p>Briks organises repairs through independent trades licensed in South Australia for their own work. Briks does not offer after-hours cover or emergency dispatch. Repairs can be organised once it is safe. Homeowners and businesses get a written quote before work starts. Before and after photos and one invoice from Briks for each finished job.</p>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-md overflow-hidden border border-[#e2ddd3] bg-[#fafaf7]">
                <Image src={IMAGES.emergency} alt="Adelaide repair help" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-28 bg-[#fafaf7] border-y border-[#e2ddd3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="eyebrow mb-4">Emergency types we cover</p>
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
            <p className="eyebrow mb-4">Make it safe</p>
            <h2 className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>Five safe actions to take right now.</h2>
            <p className="mt-5 text-[#3a3735] text-base md:text-[17px] leading-relaxed">These steps reduce damage and keep you safe. Then call us to organise the repair.</p>
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
            <p className="eyebrow mb-4">FAQ</p>
            <h2 className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>Emergency questions, answered.</h2>
          </div>
          <FAQAccordion items={FAQS} />
        </div>
      </section>

      <section className="relative py-16 md:py-20 bg-[#ffffff]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">Repairs organised once it is safe</p>
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
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.1] mb-6" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>Repair needed once it is safe?{' '}<span className="text-[#8a6e3f]">Text us the details.</span></h2>
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">For non-emergency repairs, phone 0449 517 367 with the address and a one-line description. Briks can organise the repair once it is safe.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {sitePhone() && (
              <a href={sitePhoneHref()} className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#fafaf7] text-[#1a1a1a] px-8 py-4 rounded-full min-h-[48px] transition-colors" style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 700 }} aria-label={`Call Briks now on ${sitePhone()}`}>
                <Phone size={16} aria-hidden className="text-[#8a6e3f]" />Call · {sitePhone()}
              </a>
            )}
            <a href={whatsappHref(`EMERGENCY — Adelaide. Address + issue:`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#8a6e3f] hover:bg-[#b89868] text-white px-8 py-4 rounded-full min-h-[48px] transition-colors" style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 700 }}>
              <MessageCircle size={16} aria-hidden />WhatsApp · {SITE.whatsappDisplay}
            </a>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 hover:border-white text-white/90 hover:text-white px-7 py-4 transition-colors min-h-[48px]">Use the form instead</Link>
          </div>
          <p className="mt-6 text-[10px] tracking-[0.18em] uppercase text-white/40">
            <Clock size={11} className="inline mr-1.5 -mt-0.5" />REPAIR COORDINATION · PHOTOS · ONE INVOICE</p>
        </div>
      </section>
    </>
  )
}
