import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  KeyRound,
  FileCheck,
  MessageCircle,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react'
import PageHero from '@/components/sections/PageHero'
import TrustStrip from '@/components/sections/TrustStrip'
import FAQAccordion from '@/components/sections/FAQAccordion'
import MovingBorder from '@/components/effects/MovingBorder'
import { IMAGES } from '@/lib/images'
import { SITE, whatsappHref } from '@/lib/constants'

const PRIMARY_KEYWORD = 'Adelaide rental property maintenance'

export const metadata: Metadata = {
  title:
    'Rental Property Maintenance Adelaide — Landlords | Briks Building Services',
  description:
    'Adelaide rental property maintenance for landlords. After-hours emergency response, tenant access protocols, insurance-ready PDF reports, SA Residential Tenancies Act compliance. One coordinator, one invoice.',
  alternates: { canonical: '/for-landlords' },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'For Landlords', item: `${SITE.url}/for-landlords` },
  ],
}

const SCENARIOS: { title: string; body: string; Icon: LucideIcon }[] = [
  {
    Icon: Phone,
    title: '11pm tenant emergency call',
    body: 'Burst pipe. No hot water. Power out. Tenant calls you while you are interstate or asleep. Briks dispatches inside 60 minutes across metro Adelaide, make-safes the property, sends you a photo report by morning. You do not get out of bed.',
  },
  {
    Icon: KeyRound,
    title: 'Between-tenants make-ready',
    body: 'Wall patch, paint touch-up, regrout, lock change, smoke alarm test, RCD check, garden tidy. Standard turnaround inside 5 working days from key handover. One quote, photo evidence for the bond office, ready to re-let.',
  },
  {
    Icon: FileCheck,
    title: 'Insurance + compliance documentation',
    body: 'Storm damage. Water ingress. Tenant-caused damage. Every Briks-coordinated job ends with an insurance-ready PDF: photos, written cause-and-effect, line-item costs. Most insurers accept Briks reports without a separate assessor visit.',
  },
]

const COMPLIANCE_ITEMS = [
  {
    label: 'Smoke alarms',
    body: 'SA residential tenancy law requires hardwired or 10-year sealed-battery smoke alarms in every bedroom and on every level. Briks A-grade sparks replace + certify; Certificate of Compliance lodged with the SA Office of the Technical Regulator.',
  },
  {
    label: 'RCD (safety switch) testing',
    body: 'Mandatory in SA residential tenancies. Periodic testing + replacement coordinated by Briks, with dated test logs supplied for your records.',
  },
  {
    label: 'Pool fence compliance',
    body: 'Where applicable, Briks coordinates fence inspection + remediation to current SA pool fence regulations. Certificate of currency supplied.',
  },
  {
    label: 'Gas appliance certification',
    body: 'Gas hot water, cooktops, heaters — every installation lodged via the eCoC (electronic Certificate of Compliance) system under PIC Type A gas-fitter authorisation.',
  },
  {
    label: 'Asbestos pre-1990 awareness',
    body: 'Pre-1990 SA homes routinely contain asbestos sheet, eaves, vinyl. Briks does not disturb suspect material without testing first. Where present, we coordinate licensed asbestos removalists separately and document for your records.',
  },
]

const DELIVERABLES = [
  '60-minute emergency dispatch across Adelaide metro, 24/7',
  'Tenant communication handled by Briks — tradies do not have your number',
  'Key safe / lockbox access protocols supported',
  'Insurance-ready PDF reports inside 24 hours of inspection',
  '5-working-day end-of-lease make-ready turnaround',
  'GST tax invoice issued in landlord name — tax-deductible per ATO rental-property rules',
  'Per-property cost tracking when you own multiple investments',
  'Certificates of Compliance for plumbing, electrical, gas work',
  '12-month workmanship guarantee on Briks-coordinated work',
]

const FAQS = [
  {
    q: 'Can you let yourselves in for emergencies when I am not contactable?',
    a: 'Yes, with prior written authority. Briks supports key safes, lockbox codes, and pre-agreed entry instructions. For emergencies where life or property is at immediate risk (active leak, gas smell, fire) we attend under the make-safe duty implied by SA tenancy law and notify you on arrival.',
  },
  {
    q: 'How do you handle tenant complaints + access?',
    a: 'Briks acts as the single point of contact. We text the tenant ahead of every visit with the tradie name, ETA, and a brief description. We do not give tenants the tradie\'s number. Complaints flow through Briks and are documented in the job report.',
  },
  {
    q: 'Are smoke alarm + RCD checks included in routine maintenance?',
    a: 'They are not bundled by default — but they are easy add-ons. Many landlords set Briks up with a yearly compliance sweep that covers smoke alarms (replacement at 10-year mark or sooner), RCD testing, pool fence inspection, and gas appliance servicing. We schedule, attend, and report.',
  },
  {
    q: 'Do you do end-of-lease make-good?',
    a: 'Yes. Briks runs a standard 5-working-day end-of-lease turnaround for a 3-bedroom property — patch, paint, regrout where needed, fitting replacements, smoke alarm test, RCD check, photo report for the bond office. Larger properties + multi-trade jobs are quoted on inspection.',
  },
  {
    q: 'Can you invoice multiple properties separately?',
    a: 'Yes. Each property gets its own job number, scope, and invoice. Useful for tax reporting and per-property profit tracking. We supply a monthly summary PDF if you ask for one.',
  },
  {
    q: 'What is the after-hours emergency response time?',
    a: 'Inside 60 minutes across Adelaide metropolitan area for genuine emergencies (active leak, no power, no hot water, gas smell, security breach, storm damage). Hills suburbs add 15-30 minutes depending on conditions.',
  },
  {
    q: 'Are your reports insurance-ready?',
    a: 'Yes. Briks documents every fault with multi-angle photos, written cause-and-effect summary, and itemised cost breakdown. Most home and landlord insurers accept Briks reports without an additional assessor visit. We email the PDF inside 24 hours of inspection.',
  },
  {
    q: 'Do you work with my interstate property manager?',
    a: 'Yes. Briks accepts work orders via Tapi, MaintenanceManager, PropertyMe, REST Professional, or plain email. We can sit alongside your existing manager as the dispatched contractor, or replace them entirely if you self-manage.',
  },
  {
    q: 'Are Briks invoices tax-deductible as rental property expenses?',
    a: 'Yes. Briks invoices are issued in the landlord (or company) name with full ABN and GST detail, structured for direct deduction under ATO rental-property expense rules. We can split capital improvements vs repairs on the invoice if you specify — useful for tax-time clarity.',
  },
  {
    q: 'What if the tenant claims damage that I think was their fault?',
    a: 'Briks documents the issue with photos at attendance. We do not adjudicate fault — that is between you and the tenant under your tenancy agreement. The photo + written record gives you defensible evidence either way.',
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
  serviceType: 'Rental property maintenance for landlords',
  name: 'Adelaide Rental Property Maintenance for Landlords',
  description:
    'Briks coordinates maintenance, repair, and emergency response for Adelaide investment properties. SA Residential Tenancies Act compliance, insurance-ready reports, 60-minute emergency dispatch, 5-day end-of-lease turnaround.',
  provider: { '@id': `${SITE.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Adelaide' },
  audience: { '@type': 'Audience', audienceType: 'Landlord' },
  url: `${SITE.url}/for-landlords`,
}

export default function ForLandlords() {
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
        eyebrow="For landlords"
        title={
          <>
            {PRIMARY_KEYWORD}{' '}
            <span className="text-[#8a6e3f]">that stops at the property line.</span>
          </>
        }
        subtitle={
          <>
            One coordinator handles every trade your Adelaide investment needs —
            emergency response after hours, between-tenant make-ready,
            compliance sweeps, repair documentation for your insurer. We talk
            to your tenant. You read the report at breakfast.
          </>
        }
      />

      <TrustStrip />

      <section className="relative py-16 md:py-24 bg-[#ffffff]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">
                The pitch in one paragraph
              </p>
              <h2
                className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05] mb-6"
                style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
              >
                You hire Briks. We deal with your tenant. You read the report.
              </h2>
              <div className="space-y-5 text-[#3a3735] text-base md:text-[17px] leading-relaxed">
                <p>
                  Adelaide rental property maintenance is a logistics job, not a
                  tradie job. The tradie is the easy part — Briks already runs a
                  vetted bench of licensed South Australian professionals. The
                  hard part is tenant coordination, access, reporting,
                  compliance, and keeping you out of the loop until there is
                  something to actually decide.
                </p>
                <p>
                  Briks handles the logistics. Tenant calls us, we triage,
                  dispatch, attend, photograph, fix, document, invoice. You see
                  a single email summary at the end. Emergencies get a
                  60-minute metro dispatch and a photo report by morning.
                  Routine work follows the SA Residential Tenancies Act
                  notification windows so nothing comes back as a dispute.
                </p>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-md overflow-hidden border border-[#e2ddd3] bg-[#fafaf7]">
                <Image
                  src={IMAGES.extension}
                  alt="Modern Adelaide investment property exterior"
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
              How landlords use Briks
            </p>
            <h2
              className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]"
              style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
            >
              Three jobs we run every week.
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
              SA compliance — what gets checked
            </p>
            <h2
              className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]"
              style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
            >
              The non-negotiables for SA rentals.
            </h2>
            <p className="mt-5 text-[#3a3735] text-base md:text-[17px] leading-relaxed">
              South Australian residential tenancy law sets specific compliance
              items the landlord (not the tenant) is responsible for. Briks
              tracks the renewal cycle on each so you do not get caught by an
              expired certificate at handover.
            </p>
          </div>
          <ul className="space-y-3">
            {COMPLIANCE_ITEMS.map((c) => (
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
                Same checklist whether your investment is a single Glenelg
                cottage or a 12-property portfolio across the metro.
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
              Landlord questions, answered.
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
              { href: '/for-property-managers', label: 'For property managers' },
              { href: '/services/handyman', label: 'Handyman' },
              { href: '/services/electrical', label: 'Smoke alarm + RCD' },
              { href: '/services/plumbing', label: 'Plumbing' },
              { href: '/case-studies/norwood-end-of-lease-turnaround', label: 'EOL case study' },
              { href: '/blog/end-of-lease-repair-checklist-sa-landlords', label: 'EOL checklist blog' },
              { href: '/blog/storm-damage-repairs-adelaide-insurance-guide', label: 'Storm-damage guide' },
              { href: '/our-tradies', label: 'Our tradies' },
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
            Got a tenant call coming?{' '}
            <span className="text-[#8a6e3f]">Route it to us.</span>
          </h2>
          <p className="text-[#3a3735] text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            One coordinator, every trade, all the compliance paperwork. Give us
            the tenant&rsquo;s number and we&rsquo;ll take it from here.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <MovingBorder href="/contact">
              Get a quote
              <ArrowRight size={18} aria-hidden />
            </MovingBorder>
            <a
              href={whatsappHref(
                "Hi Briks — I'm a landlord with an Adelaide investment property. Brief:"
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
