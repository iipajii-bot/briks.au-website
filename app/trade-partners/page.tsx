import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight, MessageCircle, CheckCircle2, ShieldCheck, Banknote, CalendarCheck, type LucideIcon } from 'lucide-react'
import PageHero from '@/components/sections/PageHero'
import FAQAccordion from '@/components/sections/FAQAccordion'
import MovingBorder from '@/components/effects/MovingBorder'
import { IMAGES } from '@/lib/images'
import { SITE, whatsappHref } from '@/lib/constants'

export const metadata: Metadata = {
  title: { absolute: 'Work With Briks: Adelaide Trades | Briks' },
  description:
    'Licensed Adelaide trades: take jobs from Briks with clear scopes, access arranged and one point of contact. Apply to join.',
  alternates: { canonical: '/trade-partners' },
}

const breadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'Trade Partners', item: `${SITE.url}/trade-partners` },
  ],
}

const VALUE_PROPS: { title: string; body: string; Icon: LucideIcon }[] = [
  { Icon: CalendarCheck, title: 'Steady, scoped work', body: 'Jobs come pre-scoped, customer-aligned, with photos and access details. No phone-tag with customers, no quote-bidding wars, no "free quotes" that go nowhere. Show up, do the work, leave.' },
  { Icon: Banknote, title: 'Paid weekly, no chasing', body: 'Briks invoices the customer on completion. Tradies are paid weekly via direct debit at agreed rates. We carry the receivables risk — you get cashflow predictability.' },
  { Icon: ShieldCheck, title: 'No admin overhead', body: 'Briks coordinates the job and provides before and after photos and one invoice for each finished job. Homeowners and businesses get a written quote before work starts. You do the trade work.' },
]

const RECRUITING_TRADES = [
  { trade: 'Plumbers', license: 'SA plumbing licence', detail: 'Full-spectrum residential + commercial plumbing. Gas-fitter ticket preferred.' },
  { trade: 'Electricians', license: 'Licensed in South Australia for your trade', detail: 'Switchboard upgrades, EV chargers, smoke alarms, light commercial.' },
  { trade: 'Carpenters', license: 'Cert IV Building', detail: 'Custom joinery, decks, structural, heritage profile work.' },
  { trade: 'Painters', license: 'Painting contractor', detail: 'Interior + exterior, heritage facades, low-VOC application.' },
  { trade: 'Tilers', license: 'Cert III + waterproofing ticket', detail: 'Wet-area to AS 3740, large-format porcelain, heritage encaustic.' },
  { trade: 'Roofers', license: 'Licensed in South Australia for roof plumbing. Work at heights ticket.', detail: 'Tile + Colorbond, ridge re-pointing, storm-damage make-safe.' },
  { trade: 'Gas fitters', license: 'Licensed in South Australia for the work', detail: 'Hot water, cooktops, leak diagnosis, commercial appliance.' },
  { trade: 'HVAC technicians', license: 'ARC + restricted electrical', detail: 'Split + ducted reverse cycle, evaporative, commercial.' },
  { trade: 'Handymen', license: 'Licensed in South Australia where required for the work', detail: 'Small jobs, EOL turnaround, multi-task list days.' },
]

const VETTING = [
  { title: 'Licence and insurance details', body: 'Trades are licensed in South Australia for their own work.' },
  { title: 'Two-job paid trial', body: 'New tradies run two paid jobs at our risk. We attend at least one of them on-site. We watch the work, the comms, the cleanup.' },
  { title: 'Customer feedback loop', body: 'Customer feedback is welcome.' },
  { title: 'No workmanship warranty from Briks', body: 'Briks does not provide a workmanship guarantee. Manufacturer warranties on products are the manufacturer’s, not Briks’.' },
]

const FAQS = [
  { q: 'What trades are you recruiting?', a: 'Plumbing, electrical, carpentry, painting, tiling, roofing, gutters, gas, HVAC, and handyman. Trades are licensed in South Australia for their own work.' },
  { q: 'What are the payment terms?', a: 'Weekly direct debit at agreed rates. Briks invoices the customer on completion of each job; you are paid the following Friday regardless of when the customer pays us. We carry the receivables risk.' },
  { q: 'Do I bring my own insurance?', a: 'Insurance is the independent trade’s responsibility.' },
  { q: 'Are jobs guaranteed?', a: 'No. Briks does not guarantee volume. Briks organises repairs, maintenance and renovation work, and the work is done by independent trades licensed in South Australia for their own work.' },
  { q: 'Can I work part-time?', a: 'Yes. The work is done by independent trades licensed in South Australia for their own work. Tell us your availability when you send your details.' },
  { q: 'What is the application process?', a: 'Send your details via the form below or WhatsApp. Include your trade and availability. The work is done by independent trades licensed in South Australia for their own work.' },
  { q: 'How does Briks pricing flow work?', a: 'You set your own price on each quote and submit it through the Briks coordinator. Briks presents one quote to the customer, and you are paid the amount you quoted.' },
  { q: 'Do I deal with customers directly?', a: 'During jobs, yes — at the property only. Pre-job comms (booking, access, briefing) and post-job comms (sign-off, follow-up, invoice questions) are handled by the Briks coordinator. You focus on the work.' },
]

const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }

export default function TradePartners() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />

      <PageHero
        eyebrow="Trade partners"
        title={<>Adelaide tradies{' '}<span className="text-[#8a6e3f]">Join Briks as an independent trade.</span></>}
        subtitle={<>Briks organises repairs, maintenance and renovation work. The work is done by independent trades licensed in South Australia for their own work. There is one invoice from Briks for each finished job. Apply below if you are licensed in South Australia for your trade.</>}
      />

      <section className="relative py-16 md:py-24 bg-[#ffffff]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <p className="eyebrow mb-4">Why this exists</p>
              <h2 className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05] mb-6" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>Less admin. More tools.</h2>
              <div className="space-y-5 text-[#3a3735] text-base md:text-[17px] leading-relaxed">
                <p>Briks organises repairs, maintenance and renovation work. The work is done by independent trades licensed in South Australia for their own work. Briks coordinates the job, and there is one invoice from Briks for each finished job. You do the trade work.</p>
                <p>Briks coordinates the job, and there is one invoice from Briks for each finished job. The work is done by independent trades licensed in South Australia for their own work. You do the trade work.</p>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-md overflow-hidden border border-[#e2ddd3] bg-[#fafaf7]">
                <Image src={IMAGES.tradePartners} alt="Adelaide tradie handshake coordinator" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-28 bg-[#fafaf7] border-y border-[#e2ddd3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="eyebrow mb-4">What you get</p>
            <h2 className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>Three things that change your week.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {VALUE_PROPS.map((v) => (
              <div key={v.title} className="bg-white border border-[#e2ddd3] rounded-md p-6 md:p-7">
                <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-[#e2ddd3] bg-[#fafaf7] mb-5">
                  <v.Icon size={16} className="text-[#8a6e3f]" aria-hidden />
                </div>
                <h3 className="text-[#1a1a1a] text-lg md:text-xl tracking-[-0.01em] mb-3" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>{v.title}</h3>
                <p className="text-[#3a3735] text-sm md:text-[15px] leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-28 bg-[#ffffff]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="eyebrow mb-4">Trades we are recruiting</p>
            <h2 className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>What Briks needs from independent trades.</h2>
          </div>
          <ul className="space-y-3">
            {RECRUITING_TRADES.map((t) => (
              <li key={t.trade} className="bg-[#fafaf7] border border-[#e2ddd3] rounded-md p-5 md:p-6">
                <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
                  <p className="text-[#1a1a1a] text-base md:text-lg tracking-[-0.01em]" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>{t.trade}</p>
                  <span className="text-[10px] tracking-[0.18em] uppercase text-[#8a6e3f] bg-[#f3efe5] px-2 py-1 rounded-sm">{t.license}</span>
                </div>
                <p className="text-[#3a3735] text-sm md:text-[15px] leading-relaxed">{t.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative py-20 md:py-28 bg-[#fafaf7] border-y border-[#e2ddd3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="eyebrow mb-4">How we vet</p>
            <h2 className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>The vetting process.</h2>
            <p className="mt-5 text-[#3a3735] text-base md:text-[17px] leading-relaxed">Trades work independently and are licensed in South Australia for their own work. We are clear about that because we expect the same level of professionalism back.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {VETTING.map((v) => (
              <div key={v.title} className="bg-white border border-[#e2ddd3] rounded-md p-6">
                <p className="text-[#1a1a1a] text-lg tracking-[-0.01em] mb-3" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>{v.title}</p>
                <p className="text-[#3a3735] text-sm md:text-[15px] leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-28 bg-[#ffffff]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10 md:mb-12">
            <p className="eyebrow mb-4">FAQ</p>
            <h2 className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>Tradie questions, answered.</h2>
          </div>
          <FAQAccordion items={FAQS} />
        </div>
      </section>

      {/* Application CTA */}
      <section className="relative py-20 md:py-28 bg-[#1a1a1a] text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow mb-4">Apply to work with Briks</p>
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.1] mb-6" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>Send us your details.</h2>
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">Apply to work with Briks: your trades, licences and the rates you charge. Prefer to chat first? Call 0449 517 367.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/join" className="inline-flex items-center justify-center gap-2 bg-[#8a6e3f] hover:bg-[#b89868] text-white px-7 py-3.5 rounded-full min-h-[48px] transition-colors" style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 700 }}>
              Apply online<ArrowRight size={16} aria-hidden />
            </Link>
            <a href={whatsappHref("Hi Briks, I’m a tradie interested in working with you. My trade:")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 hover:border-white text-white/90 hover:text-white px-7 py-3.5 transition-colors min-h-[48px]">
              <MessageCircle size={16} aria-hidden />Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
