import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  Wrench,
  ClipboardCheck,
  ShieldCheck,
  Clock,
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

const PRIMARY_KEYWORD = 'Adelaide home maintenance'

export const metadata: Metadata = {
  title:
    'Adelaide Home Maintenance + Repairs — Homeowners | Briks Building Services',
  description:
    'Adelaide home maintenance for owner-occupied houses. One coordinator, every trade — plumbing, electrical, carpentry, painting, roofing, gas. One written quote, one invoice, 12-month workmanship guarantee.',
  alternates: { canonical: '/for-homeowners' },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'For Homeowners',
      item: `${SITE.url}/for-homeowners`,
    },
  ],
}

const COMMON_SCENARIOS: { title: string; body: string; Icon: LucideIcon }[] = [
  {
    Icon: ClipboardCheck,
    title: 'The five-things-broken weekend',
    body: 'Loose hinge. Dripping tap. Cracked tile. Sticky door. Power point that buzzes. You\'ve been meaning to call someone for six months. One coordinator handles the lot — sequenced into a single visit, one invoice at the end.',
  },
  {
    Icon: Wrench,
    title: 'The "this needs a real reno" job',
    body: 'Bathroom past its prime. Kitchen layout doesn\'t work. Adding a room. Briks scopes on-site, gives a written line-item quote, runs the trades back-to-back, photo-updates you daily, hands over a defect-free finish.',
  },
  {
    Icon: Phone,
    title: 'The "it just broke and I need someone now" emergency',
    body: 'Burst pipe. No hot water mid-winter. Storm damage. Gas smell. Briks dispatches inside 60 minutes across metro Adelaide. Make-safe first, repair-quote scoped after the property is stable.',
  },
]

const PROCESS_STEPS = [
  {
    n: '01',
    title: 'Tell us the job',
    body: 'WhatsApp a photo + description, fill the online form, or email. Real human reads it inside 2 hours during business days, 60 minutes for genuine emergencies.',
  },
  {
    n: '02',
    title: 'On-site scope + written quote',
    body: 'A coordinator attends, measures, photographs, and emails a line-item quote within 24 hours of the visit. Free callout. Fixed total. No "we\'ll work it out as we go."',
  },
  {
    n: '03',
    title: 'Sequenced trades, daily updates',
    body: 'One coordinator owns the job end-to-end. Multi-trade work is sequenced so trades don\'t wait on each other. Daily 5pm photo update on jobs running longer than two days.',
  },
  {
    n: '04',
    title: 'Sign-off, photo report, one invoice',
    body: 'Walk-through, defect list cleared, photo PDF report in your inbox, single invoice covering every trade. 12-month workmanship guarantee starts the day we leave.',
  },
]

const DELIVERABLES = [
  'Free on-site quote inspection — no callout fee, ever',
  'Written, itemised quote in your inbox within 24 hours of inspection',
  'One coordinator from first call to final invoice',
  'Licensed tradies only — PIC, A-grade, BLD, ARC, Type A gas',
  'Public liability cover from $10M per tradie up to $20M for senior bench',
  'Certificates of Compliance lodged with the SA Office of the Technical Regulator',
  'Photo report PDF documenting the work, ready for your records or insurer',
  '12-month workmanship guarantee on Briks-coordinated work',
  'Single invoice across all trades on the job — no chasing five different bills',
]

const ALTERNATIVES = [
  {
    title: 'vs. calling five tradies yourself',
    bad: 'Five quotes to compare. Five trades to schedule. Five invoices. Five callbacks when something goes wrong.',
    good: 'One Briks coordinator, one written quote, one schedule, one invoice, one accountable name on every fix.',
  },
  {
    title: 'vs. quote-bidding apps (hipages, Service.com.au, OneFlare)',
    bad: 'Race-to-the-bottom pricing attracts the most desperate bidder, not the right specialist. You become the project manager.',
    good: 'Briks picks the right specialist off a vetted bench, then runs the job for you. We pay tradies fairly so they take our calls first.',
  },
  {
    title: 'vs. a big franchise builder',
    bad: 'Layers of admin overhead baked into the quote. New-home-focused. Small repairs not their interest.',
    good: 'Briks is built for repair, maintenance, and mid-sized reno. No franchise tax on the quote. Small jobs welcome.',
  },
]

const FAQS = [
  {
    q: 'How is Briks different from quote-bidding apps like hipages?',
    a: 'Briks acts as your coordinator. You give us one description, we scope on-site and give one written quote covering every trade involved. Quote-bidding apps push you a list of contractors to chase yourself — you end up project-managing five tradies. With Briks, you only ever talk to us, and we pay the trades on your behalf.',
  },
  {
    q: 'Do I get one invoice or one per tradie?',
    a: 'One invoice. Always. Briks bills you, then pays the individual tradies from that single payment. You see one charge against your bank account or card per job, regardless of how many trades attended.',
  },
  {
    q: 'Can you bundle multiple small jobs into one visit?',
    a: 'Yes — and we encourage it. Send the full list of what needs fixing, we scope all of it in one on-site visit, then dispatch in the most efficient sequence. Most multi-item visits take a single day and save the callout cost being applied repeatedly.',
  },
  {
    q: 'What is the minimum job size?',
    a: 'No minimum. A single picture hung is fine. We bundle small tasks into a single visit so the callout cost spreads across the list — better value than calling for one item at a time.',
  },
  {
    q: 'Do you do same-day callouts?',
    a: 'For genuine emergencies (active leak, no power, no hot water, gas smell), yes — dispatched inside 60 minutes across metro Adelaide. Routine same-day work is subject to bench availability and is often possible if you call before midday.',
  },
  {
    q: 'Are quotes free?',
    a: 'Yes. Briks does not charge a callout fee, an inspection fee, or a quote fee. The first time money changes hands is when you sign off the written quote and the work begins.',
  },
  {
    q: 'What happens if a tradie does a bad job?',
    a: 'Briks-coordinated work carries a 12-month workmanship guarantee on top of any manufacturer warranty on installed parts. If something fails inside the warranty window, message Briks (not the original tradie). We coordinate the fix at our cost. We also keep an internal feedback log per tradie — two strikes and they come off rotation.',
  },
  {
    q: 'Do you service my suburb?',
    a: 'Briks covers the full Adelaide metropolitan area plus Adelaide Hills (Stirling, Aldgate, Mount Barker, Hahndorf, Crafers, Bridgewater). Quickest way to confirm: send the address via WhatsApp.',
  },
  {
    q: 'How quickly will I get a quote?',
    a: 'On-site inspection booked inside 48 hours of your call for routine work. Written quote in your inbox within 24 hours of the inspection. Emergencies skip the quote-first step — make-safe dispatched immediately, repair quote follows.',
  },
  {
    q: 'Do you work directly with homeowners or only through agencies?',
    a: 'Both. Most Briks customers are owner-occupied homeowners. We also coordinate work for landlords, real estate agencies, and businesses — but the homeowner workflow is identical: one call, one quote, one invoice.',
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
  serviceType: 'Residential building services for homeowners',
  name: 'Adelaide Home Maintenance + Repairs for Homeowners',
  description:
    'Briks coordinates licensed Adelaide tradies for owner-occupied homes. Plumbing, electrical, carpentry, painting, tiling, roofing, gas, HVAC, handyman. One coordinator, one quote, one invoice, 12-month workmanship guarantee.',
  provider: { '@id': `${SITE.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Adelaide' },
  audience: {
    '@type': 'Audience',
    audienceType: 'Homeowner',
  },
  url: `${SITE.url}/for-homeowners`,
}

export default function ForHomeowners() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c'),
        }}
      />

      <PageHero
        eyebrow="For homeowners"
        title={
          <>
            {PRIMARY_KEYWORD} that{' '}
            <span className="text-[#8a6e3f]">stops the chase.</span>
          </>
        }
        subtitle={
          <>
            One coordinator covers every trade you need around the house —
            plumbing, electrical, carpentry, painting, tiling, roofing, gas, air
            conditioning, handyman. Briks scopes on-site, writes one quote,
            sequences the trades, hands over a photo report and one invoice.
            Twelve-month workmanship guarantee, free callouts, no subscription.
          </>
        }
      />

      <TrustStrip />

      {/* Definition + hero image */}
      <section className="relative py-16 md:py-24 bg-[#ffffff]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">
                What Briks is
              </p>
              <h2
                className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05] mb-6"
                style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
              >
                One coordinator. Every trade. Zero hassle.
              </h2>
              <div className="space-y-5 text-[#3a3735] text-base md:text-[17px] leading-relaxed">
                <p>
                  Briks Building Services is an Adelaide building services
                  coordinator. We don&rsquo;t pretend to be a 200-person crew —
                  we&rsquo;re a tight, vetted bench of licensed South Australian
                  tradies, and a single human coordinator who owns the job from
                  first call to final invoice. You get the right specialist for
                  every task, never the closest available body.
                </p>
                <p>
                  Most homeowner jobs are scoped on-site within 48 hours. Quotes
                  are written, itemised, and free. Multi-trade work is
                  sequenced so trades don&rsquo;t wait on each other.
                  Twelve-month workmanship guarantee is standard on every
                  Briks-coordinated job.
                </p>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-md overflow-hidden border border-[#e2ddd3] bg-[#fafaf7]">
                <Image
                  src={IMAGES.homeLiving}
                  alt="Adelaide cottage living room — calm weekday afternoon"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common scenarios */}
      <section className="relative py-20 md:py-28 bg-[#fafaf7] border-y border-[#e2ddd3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">
              How homeowners use Briks
            </p>
            <h2
              className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]"
              style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
            >
              Three jobs we see most weeks.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {COMMON_SCENARIOS.map((s) => (
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

      {/* 4-step process */}
      <section className="relative py-20 md:py-28 bg-[#ffffff]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">
              How it works
            </p>
            <h2
              className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]"
              style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
            >
              Four steps from call to keys-back.
            </h2>
          </div>
          <ol className="space-y-5">
            {PROCESS_STEPS.map((step) => (
              <li
                key={step.n}
                className="relative bg-[#fafaf7] border border-[#e2ddd3] rounded-md p-6 md:p-7 pl-7"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-6 bottom-6 w-[3px] bg-[#8a6e3f] rounded-r-sm"
                />
                <div className="flex items-baseline gap-3 mb-2">
                  <span
                    className="text-[#8a6e3f] text-2xl tabular-nums"
                    style={{
                      fontFamily: 'var(--font-bricolage)',
                      fontWeight: 700,
                    }}
                  >
                    {step.n}
                  </span>
                  <h3
                    className="text-[#1a1a1a] text-lg md:text-xl tracking-[-0.01em]"
                    style={{
                      fontFamily: 'var(--font-bricolage)',
                      fontWeight: 600,
                    }}
                  >
                    {step.title}
                  </h3>
                </div>
                <p className="text-[#3a3735] text-sm md:text-[15px] leading-relaxed">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What you get */}
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
                Same checklist every time, whether your job is a $300
                tap-replace or a $30,000 bathroom rebuild.
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

      {/* Why Briks vs alternatives */}
      <section className="relative py-20 md:py-28 bg-[#ffffff]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">
              Honest comparison
            </p>
            <h2
              className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]"
              style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
            >
              Why Briks beats the alternatives.
            </h2>
          </div>
          <div className="space-y-4">
            {ALTERNATIVES.map((a) => (
              <div
                key={a.title}
                className="bg-[#fafaf7] border border-[#e2ddd3] rounded-md p-6 md:p-7"
              >
                <p
                  className="text-[#1a1a1a] text-lg md:text-xl tracking-[-0.01em] mb-4"
                  style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
                >
                  Briks {a.title}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="border-l-2 border-[#c0bcb4] pl-4">
                    <p className="text-[10px] tracking-[0.22em] uppercase text-[#5a5650] mb-2">
                      What you usually get
                    </p>
                    <p className="text-[#3a3735] text-sm md:text-[15px] leading-relaxed">
                      {a.bad}
                    </p>
                  </div>
                  <div className="border-l-2 border-[#8a6e3f] pl-4">
                    <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-2">
                      With Briks
                    </p>
                    <p className="text-[#1a1a1a] text-sm md:text-[15px] leading-relaxed">
                      {a.good}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials — filtered */}
      <TestimonialsGrid
        filterAudience="homeowners"
        eyebrow="What homeowners say"
      />

      {/* FAQs */}
      <section className="relative py-20 md:py-28 bg-[#fafaf7] border-y border-[#e2ddd3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10 md:mb-12">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">
              FAQ
            </p>
            <h2
              className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]"
              style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
            >
              Homeowner questions, answered.
            </h2>
          </div>
          <FAQAccordion items={FAQS} />
        </div>
      </section>

      {/* Internal link cluster */}
      <section className="relative py-16 md:py-20 bg-[#ffffff]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">
            Trades homeowners book most
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { slug: 'plumbing', label: 'Plumbing' },
              { slug: 'electrical', label: 'Electrical' },
              { slug: 'carpentry', label: 'Carpentry' },
              { slug: 'painting', label: 'Painting' },
              { slug: 'tiling', label: 'Tiling' },
              { slug: 'roofing', label: 'Roofing' },
              { slug: 'handyman', label: 'Handyman' },
              { slug: 'hvac', label: 'HVAC' },
            ].map((t) => (
              <Link
                key={t.slug}
                href={`/services/${t.slug}`}
                className="group flex items-center justify-between bg-[#fafaf7] border border-[#e2ddd3] rounded-md px-4 py-3 hover:border-[#8a6e3f]/60 transition-colors"
              >
                <span
                  className="text-[#1a1a1a] text-sm"
                  style={{
                    fontFamily: 'var(--font-inter-tight)',
                    fontWeight: 600,
                  }}
                >
                  {t.label}
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

      {/* CTA */}
      <section className="relative py-20 md:py-28 bg-[#fafaf7] border-t border-[#e2ddd3] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.1] mb-6"
            style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
          >
            Got a job around the house?{' '}
            <span className="text-[#8a6e3f]">Tell us. We&rsquo;ll handle it.</span>
          </h2>
          <p className="text-[#3a3735] text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            Free on-site scope. Written quote inside 24 hours. Fixed total
            before any tool leaves the truck.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <MovingBorder href="/contact">
              Get a quote
              <ArrowRight size={18} aria-hidden />
            </MovingBorder>
            <a
              href={whatsappHref(
                "Hi Briks — I have a job around the house. Quick details:"
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
