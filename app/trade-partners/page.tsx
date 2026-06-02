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
  title: 'Join the Briks Tradie Bench — Adelaide Trade Recruitment',
  description:
    'Briks Building Services is recruiting licensed Adelaide tradies for our managed bench. Steady work pipeline, weekly payment, no admin overhead, no job-bidding. Plumbing, electrical, carpentry, painting, tiling, roofing, gas, HVAC, handyman.',
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
  { Icon: ShieldCheck, title: 'No admin overhead', body: 'No quoting time, no customer chasing, no late-payment follow-up. Briks handles all customer-facing comms, scheduling, photo documentation, invoicing, and warranty claim coordination.' },
]

const RECRUITING_TRADES = [
  { trade: 'Plumbers', license: 'PIC license', detail: 'Full-spectrum residential + commercial plumbing. Gas-fitter ticket preferred.' },
  { trade: 'Electricians', license: 'A-grade SA license', detail: 'Switchboard upgrades, EV chargers, smoke alarms, light commercial.' },
  { trade: 'Carpenters', license: 'BLD / Cert IV Building', detail: 'Custom joinery, decks, structural, heritage profile work.' },
  { trade: 'Painters', license: 'BLD painter contractor', detail: 'Interior + exterior, heritage facades, low-VOC application.' },
  { trade: 'Tilers', license: 'Cert III + waterproofing ticket', detail: 'Wet-area to AS 3740, large-format porcelain, heritage encaustic.' },
  { trade: 'Roofers', license: 'BLD roof plumber + WAH ticket', detail: 'Tile + Colorbond, ridge re-pointing, storm-damage make-safe.' },
  { trade: 'Gas fitters', license: 'Type A authorisation', detail: 'Hot water, cooktops, leak diagnosis, commercial appliance.' },
  { trade: 'HVAC technicians', license: 'ARC + restricted electrical', detail: 'Split + ducted reverse cycle, evaporative, commercial.' },
  { trade: 'Handymen', license: 'BLD handyman class (where applicable)', detail: 'Small jobs, EOL turnaround, multi-task list days.' },
]

const VETTING = [
  { title: 'License + insurance verification', body: 'Briks pulls the live CBS license record before your first job. Public liability certificate of currency required. Re-checked annually on renewal.' },
  { title: 'Two-job paid trial', body: 'New tradies run two paid jobs at our risk. We attend at least one of them on-site. We watch the work, the comms, the cleanup.' },
  { title: 'Customer feedback loop', body: 'Every job ends with a 30-second customer review. Logged against your tradie record. Two soft strikes and you come off the bench while we investigate.' },
  { title: 'Workmanship guarantee', body: 'Briks carries a 12-month workmanship guarantee on every coordinated job. If something fails inside the window, Briks coordinates the fix — we deal with it commercially, not as a customer complaint to you.' },
]

const FAQS = [
  { q: 'What trades are you recruiting?', a: 'Plumbing, electrical, carpentry, painting, tiling, roofing, gutters, gas, HVAC, and handyman. We are particularly short on heritage waterproofing tilers, switchboard-upgrade A-grade sparks, and Type A gas fitters with cooktop install experience.' },
  { q: 'What are the payment terms?', a: 'Weekly direct debit at agreed rates. Briks invoices the customer on completion of each job; you are paid the following Friday regardless of when the customer pays us. We carry the receivables risk.' },
  { q: 'Do I bring my own insurance?', a: 'Yes. All Briks bench tradies hold their own current public liability insurance ($10M minimum, $20M preferred for senior positions). We verify the certificate of currency before onboarding and re-check on renewal.' },
  { q: 'Are jobs guaranteed?', a: 'No. Briks does not guarantee volume — work is dispatched based on job flow + tradie availability. Most active bench positions average 3-5 dispatches per week at steady state. We are transparent about expected volume during onboarding.' },
  { q: 'Can I work part-time?', a: 'Yes. Briks works with full-time, part-time, and sole-trader contractors. Set your availability window — we dispatch within it.' },
  { q: 'What is the application process?', a: 'Send your details via the form below or WhatsApp. We confirm license + insurance documentation, set up a 20-minute intro call, and run a two-job paid trial. Bench-position decision after the trial. Total elapsed time typically 1-2 weeks.' },
  { q: 'How does Briks pricing flow work?', a: 'Tradies set their own job pricing on each quote, submitted through the Briks coordinator. Briks adds a coordination margin and presents a single all-in quote to the customer. You get paid your quoted amount; Briks earns the coordination margin.' },
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
        title={<>Adelaide tradies{' '}<span className="text-[#8a6e3f]">— join the Briks bench.</span></>}
        subtitle={<>Steady work pipeline. Weekly payment. No quote-bidding wars. No customer chasing. Briks handles every customer-facing minute — you show up, do the work, leave. Apply below if you hold a current SA license + public liability cover.</>}
      />

      <section className="relative py-16 md:py-24 bg-[#ffffff]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">Why this exists</p>
              <h2 className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05] mb-6" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>Less admin. More tools.</h2>
              <div className="space-y-5 text-[#3a3735] text-base md:text-[17px] leading-relaxed">
                <p>Most Adelaide tradies spend 40% of their working week on admin: quoting, scheduling, chasing customers, chasing payments, dealing with bidding apps that race-to-the-bottom. Briks reverses that. We carry the customer relationship, the receivables, and the scheduling overhead — you carry the spanner.</p>
                <p>The trade-off is clear: you trade some pricing autonomy (we add a coordination margin) for cashflow predictability + admin-free workflow. Most tradies who join the bench net more per hour than they did running their own customer pipeline, because their on-tools hours go up.</p>
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
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">What you get</p>
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
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">Trades we are recruiting</p>
            <h2 className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>What the bench needs.</h2>
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
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">How we vet</p>
            <h2 className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>The vetting process.</h2>
            <p className="mt-5 text-[#3a3735] text-base md:text-[17px] leading-relaxed">Same checklist every tradie clears before going on rotation. We are transparent about it because we expect the same level of professionalism back.</p>
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
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">FAQ</p>
            <h2 className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>Tradie questions, answered.</h2>
          </div>
          <FAQAccordion items={FAQS} />
        </div>
      </section>

      {/* Application CTA */}
      <section className="relative py-20 md:py-28 bg-[#1a1a1a] text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">Apply to join the bench</p>
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.1] mb-6" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}>Send us your details.</h2>
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">WhatsApp is fastest. Send your trade, license number, public liability cert, years experience, suburbs you cover, and availability. We come back within one business day.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={whatsappHref("Hi Briks — applying for the tradie bench. My details: \n- Trade: \n- License: \n- Public liability: \n- Years experience: \n- Suburbs covered: \n- Availability: ")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#8a6e3f] hover:bg-[#b89868] text-white px-7 py-3.5 rounded-full min-h-[48px] transition-colors" style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 700 }}>
              <MessageCircle size={16} aria-hidden />Apply via WhatsApp
            </a>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 hover:border-white text-white/90 hover:text-white px-7 py-3.5 transition-colors min-h-[48px]">Use the form instead</Link>
          </div>
        </div>
      </section>
    </>
  )
}
