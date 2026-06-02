import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  ArrowUpRight,
  Inbox,
  Workflow,
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

const PRIMARY_KEYWORD = 'Adelaide property management maintenance supplier'

export const metadata: Metadata = {
  title:
    'Property Management Maintenance Supplier Adelaide | Briks Building Services',
  description:
    'Adelaide real-estate-agency-grade maintenance coordination. Tapi + MaintenanceManager integrated, single invoice per job direct to landlord, 60-minute after-hours dispatch. Stop your PMs being dispatchers.',
  alternates: { canonical: '/for-property-managers' },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'For Property Managers', item: `${SITE.url}/for-property-managers` },
  ],
}

const PAINPOINTS: { title: string; body: string; Icon: LucideIcon }[] = [
  {
    Icon: Inbox,
    title: 'PMs spending 40% of their week as dispatchers',
    body: 'Every tenant complaint is a phone tree: get tradie, get quote, get landlord approval, schedule, chase, invoice, reconcile. Your property managers were hired to lease + retain, not run a maintenance call centre.',
  },
  {
    Icon: Workflow,
    title: 'Five tradies for five trades — five invoices',
    body: 'A single multi-trade job at one property turns into five suppliers, five invoices, five sets of bookkeeping reconciliation. Multiply across a 200-door portfolio and the admin cost is brutal.',
  },
  {
    Icon: Receipt,
    title: 'Insurance + compliance evidence chase',
    body: 'When a claim comes in, you spend 90 minutes chasing tradies for photos, dates, and a description of what happened. Defending bond decisions at SACAT without solid documentation is a coin flip.',
  },
]

const WORKFLOW_STEPS = [
  {
    n: '01',
    title: 'Add Briks as preferred supplier',
    body: 'Inside your maintenance system (Tapi, MaintenanceManager, PropertyMe, REST Professional, or plain email). One supplier record. No process change for your PMs — they keep raising work orders the same way they always have.',
  },
  {
    n: '02',
    title: 'Briks triages every inbound work order',
    body: 'AI-assisted parsing extracts the job scope automatically. A human coordinator reviews, picks the right trade off our vetted bench, schedules with the tenant, and confirms the visit window back to the PM.',
  },
  {
    n: '03',
    title: 'On-site, on-spec, photo-documented',
    body: 'Right specialist for the work. Photo evidence at attendance, mid-job, and completion. Tenant signs off on the visit summary. Insurance-grade documentation packaged automatically.',
  },
  {
    n: '04',
    title: 'One invoice per job, direct to landlord',
    body: 'Single line-item invoice in the landlord\'s name with full ABN + GST detail. Sent via your system, no separate biller relationships. Briks handles the bookkeeping with each tradie on the back end — your agency sees one supplier on its books.',
  },
]

const INTEGRATIONS = [
  {
    name: 'Tapi',
    body: 'Briks runs as a Tapi-native preferred supplier. Work orders flow in, AI extracts scope, status updates flow back via the Tapi API. Zero re-entry.',
  },
  {
    name: 'MaintenanceManager',
    body: 'Email-based work order ingestion. Briks parses the inbound, creates an internal job, links photos + reports back to the original work order ID.',
  },
  {
    name: 'PropertyMe + REST Professional',
    body: 'Email-based ingestion with PMS-aware formatting. Invoices are issued in formats your agency\'s accountant + property accounts team already process.',
  },
  {
    name: 'Plain email + WhatsApp',
    body: 'Smaller agencies or interim arrangements — work order via email or WhatsApp, Briks confirms scope + ETA in the same channel.',
  },
]

const DELIVERABLES = [
  'Single supplier record across your entire maintenance vendor list',
  'Tradie-network vetting handled by Briks — license + insurance + experience',
  '60-minute after-hours emergency dispatch with on-call coordinator',
  'Photo-documented evidence pack per job (attendance, mid-work, completion)',
  'Tenant communication owned by Briks — your PMs are not in the loop unless escalated',
  'SA Residential Tenancies Act notification windows respected',
  'Insurance-ready PDF reports inside 24 hours — accepted by all major SA insurers',
  'Single invoice per job in landlord name with ABN + GST detail',
  'Workmanship guarantee 12 months — Briks coordinates remediation on any failures',
  'Monthly portfolio summary PDF on request for landlord reporting',
]

const FAQS = [
  {
    q: 'How do I add Briks as a preferred supplier in Tapi?',
    a: 'Send us an email or a WhatsApp message and we will run you through the 5-minute setup. Briks becomes a supplier record in your Tapi tenant, work orders flow in automatically, and our acceptance + status webhooks update Tapi in real time. No data migration or PM retraining.',
  },
  {
    q: 'What is your turnaround on routine work orders?',
    a: 'On-site inspection booked inside 48 business hours of acceptance. Written quote inside 24 hours of inspection. Most routine work is scheduled, attended, and reported within 7 calendar days end to end. Emergencies dispatch inside 60 minutes.',
  },
  {
    q: 'Do you handle Saturday + Sunday lockouts and emergencies?',
    a: 'Yes. Briks runs a 24/7 emergency roster across plumbing, electrical, gas, and roofing. Lockouts go to a vetted locksmith on the same bench. Tenant calls our after-hours number directly; PM gets a summary by Monday morning.',
  },
  {
    q: 'Can landlords be invoiced directly from your system?',
    a: 'Yes — and this is the default. Briks issues each invoice in the landlord\'s name with full ABN, GST, and a single-line scope description. Your agency does not have a payable to reconcile. We bookkeep with the individual tradies on the back end.',
  },
  {
    q: 'What systems do you integrate with?',
    a: 'Tapi (deepest), MaintenanceManager, PropertyMe, REST Professional, Console, and plain email. If your agency uses a different system, send us the inbound work-order format and we will adapt — we have not yet encountered one we could not parse.',
  },
  {
    q: 'Do you provide monthly summary reporting?',
    a: 'Yes. A monthly portfolio PDF can be generated on request, broken down by landlord, property, trade, status, and total spend. Useful for landlord retention conversations and for your agency\'s portfolio analytics.',
  },
  {
    q: 'What is the minimum agency size?',
    a: 'No formal minimum. We work with agencies running 20 doors through to 1,500+. Smaller agencies benefit most from removing dispatcher overhead from PMs; larger agencies benefit from compliance consolidation across the portfolio.',
  },
  {
    q: 'Can I add Briks alongside existing suppliers?',
    a: 'Yes. Most agencies onboard Briks as one supplier among many, allocate certain trade categories or after-hours to us, and expand the share over time as the workflow proves out. We do not require exclusivity.',
  },
  {
    q: 'What happens if a Briks-coordinated job goes wrong?',
    a: 'Briks coordinates the remediation at our cost under the 12-month workmanship guarantee. Your agency + landlord deal with Briks as a single counterparty; we deal with the underlying tradie on the back end. No tradie-vs-PM disputes.',
  },
  {
    q: 'How does pricing work?',
    a: 'Briks does not publish a rate card. Each job is scoped on-site and quoted in writing. Pricing reflects the tradie\'s invoice plus coordination margin. The landlord pays the all-in invoice; agency pays nothing directly. Detailed pricing model: see /pricing.',
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
  serviceType: 'Property management maintenance coordination',
  name: 'Adelaide Property Management Maintenance Supplier',
  description:
    'Adelaide-grade maintenance coordination for residential real estate agencies. Tapi + MaintenanceManager integration, single invoice per job direct to landlord, 60-minute after-hours dispatch, full SA compliance.',
  provider: { '@id': `${SITE.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Adelaide' },
  audience: { '@type': 'Audience', audienceType: 'PropertyManager' },
  url: `${SITE.url}/for-property-managers`,
}

export default function ForPropertyManagers() {
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
        eyebrow="For property managers"
        title={
          <>
            Your PMs aren&rsquo;t{' '}
            <span className="text-[#8a6e3f]">dispatchers.</span>
          </>
        }
        subtitle={
          <>
            Adelaide residential real estate agencies use Briks as a single
            maintenance supplier — Tapi-native, 60-minute after-hours dispatch,
            one invoice per job direct to the landlord. Your PMs stop chasing
            tradies and go back to leasing + retention.
          </>
        }
      />

      <TrustStrip />

      {/* Definition + hero */}
      <section className="relative py-16 md:py-24 bg-[#ffffff]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">
                What this is
              </p>
              <h2
                className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05] mb-6"
                style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
              >
                A single building-services supplier for your entire portfolio.
              </h2>
              <div className="space-y-5 text-[#3a3735] text-base md:text-[17px] leading-relaxed">
                <p>
                  Briks Building Services operates as a managed maintenance
                  supplier for Adelaide residential real estate agencies. We
                  cover every trade — plumbing, electrical, carpentry, painting,
                  tiling, roofing, gas, HVAC, handyman — under one supplier
                  record in your existing system (Tapi, MaintenanceManager,
                  PropertyMe, REST Professional, Console, or email).
                </p>
                <p>
                  Work orders flow in. Our coordinator triages, dispatches the
                  right specialist from a vetted licensed bench, communicates
                  directly with the tenant, photo-documents the job, and issues
                  a single line-item invoice in the landlord&rsquo;s name. The
                  PM only sees status updates — the dispatcher workload moves
                  off the desk entirely.
                </p>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-md overflow-hidden border border-[#e2ddd3] bg-[#fafaf7]">
                <Image
                  src={IMAGES.aboutHero}
                  alt="Adelaide heritage property handover coordination"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="relative py-20 md:py-28 bg-[#fafaf7] border-y border-[#e2ddd3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">
              The status quo hurts
            </p>
            <h2
              className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]"
              style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
            >
              Three problems Briks solves for SA agencies.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {PAINPOINTS.map((p) => (
              <div
                key={p.title}
                className="bg-white border border-[#e2ddd3] rounded-md p-6 md:p-7"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-[#e2ddd3] bg-[#fafaf7] mb-5">
                  <p.Icon size={16} className="text-[#8a6e3f]" aria-hidden />
                </div>
                <h3
                  className="text-[#1a1a1a] text-lg md:text-xl tracking-[-0.01em] mb-3"
                  style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
                >
                  {p.title}
                </h3>
                <p className="text-[#3a3735] text-sm md:text-[15px] leading-relaxed">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="relative py-20 md:py-28 bg-[#ffffff]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">
              The workflow
            </p>
            <h2
              className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]"
              style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
            >
              Four steps. Zero process change for your PMs.
            </h2>
          </div>
          <ol className="space-y-5">
            {WORKFLOW_STEPS.map((step) => (
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
                    style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 700 }}
                  >
                    {step.n}
                  </span>
                  <h3
                    className="text-[#1a1a1a] text-lg md:text-xl tracking-[-0.01em]"
                    style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
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

      {/* Integrations */}
      <section className="relative py-20 md:py-28 bg-[#fafaf7] border-y border-[#e2ddd3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">
              Integrations
            </p>
            <h2
              className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]"
              style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
            >
              Works inside the systems your agency already uses.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {INTEGRATIONS.map((i) => (
              <div
                key={i.name}
                className="bg-white border border-[#e2ddd3] rounded-md p-6"
              >
                <p
                  className="text-[#1a1a1a] text-lg tracking-[-0.01em] mb-2"
                  style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
                >
                  {i.name}
                </p>
                <p className="text-[#3a3735] text-sm md:text-[15px] leading-relaxed">
                  {i.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="relative py-20 md:py-28 bg-[#ffffff]">
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
                Identical SOP every time, from a single dripping tap through to
                a multi-trade insurance claim.
              </p>
            </div>
            <div className="lg:col-span-7">
              <ul className="space-y-2.5">
                {DELIVERABLES.map((d) => (
                  <li
                    key={d}
                    className="flex items-start gap-3 bg-[#fafaf7] border border-[#e2ddd3] rounded-md p-4"
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
        filterAudience="property-managers"
        eyebrow="What agencies say"
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
              Agency questions, answered.
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
              { href: '/for-landlords', label: 'For landlords' },
              { href: '/our-tradies', label: 'Our tradies' },
              { href: '/how-it-works', label: 'How it works' },
              { href: '/pricing', label: 'Pricing model' },
              { href: '/case-studies/norwood-end-of-lease-turnaround', label: 'EOL case study' },
              { href: '/blog/how-property-managers-should-brief-a-tradie', label: 'PM brief guide' },
              { href: '/blog/end-of-lease-repair-checklist-sa-landlords', label: 'EOL checklist' },
              { href: '/contact', label: 'Book agency intro' },
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
            Book a 20-minute agency intro.{' '}
            <span className="text-[#8a6e3f]">No deck, no sales pitch.</span>
          </h2>
          <p className="text-[#3a3735] text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            We&rsquo;ll walk you through the workflow on a screenshare, show
            real Briks job reports, and answer your specific Tapi /
            MaintenanceManager integration questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <MovingBorder href="/contact">
              Book agency intro
              <ArrowRight size={18} aria-hidden />
            </MovingBorder>
            <a
              href={whatsappHref(
                "Hi Briks — I'm a property manager. We'd like to talk about adding Briks as a maintenance supplier:"
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
