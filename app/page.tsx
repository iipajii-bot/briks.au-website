import type { Metadata } from 'next'
import Link from 'next/link'
import FridayReport from '@/components/home/FridayReport'
import { STEPS, CHANGES, STAYS, APPROVALS, FAQS } from '@/components/home/homeContent'
import { SITE, sitePhone, sitePhoneHref } from '@/lib/constants'

/*
 * Homepage: Briks Maintenance Line (Nov 2026 rebuild).
 * Layout: answer-first hero with the product (an example Friday report) on the right,
 * then one idea per section on alternating paper / warm panels. Server component, no client JS.
 * Every claim must stay true: no 24/7, no response guarantees, no licence claim for Briks itself.
 */

const UPDATED = '2026-11-24'
const UPDATED_LABEL = 'November 2026'

export const metadata: Metadata = {
  title: { absolute: 'Maintenance Coordination for Real Estate Agencies | Briks' },
  description:
    'We handle the tenant and the trades, send you one price to approve, and report every Friday. Repair coordination for real estate agencies.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Maintenance Coordination for Real Estate Agencies | Briks',
    description:
      'We handle the tenant and the trades, send you one price to approve, and report every Friday. Repair coordination for real estate agencies.',
    url: SITE.url,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE.url}/#organization`,
      name: SITE.name,
      legalName: SITE.legalName,
      url: SITE.url,
      logo: { '@type': 'ImageObject', url: `${SITE.url}/logo.png`, width: 512, height: 512 },
      email: SITE.email,
      telephone: SITE.phone ? `+61${SITE.phone.replace(/^0/, '')}` : undefined,
      taxID: `ABN ${SITE.abn}`,
      description:
        'Adelaide property maintenance coordinator. Runs the Briks Maintenance Line, an outsourced maintenance desk for real estate agencies, and coordinates licensed trades for landlords and homeowners.',
      areaServed: { '@type': 'City', name: 'Adelaide' },
      sameAs: [SITE.social.linkedin, SITE.social.facebook, SITE.social.instagram],
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE.url}/#localbusiness`,
      name: 'Briks Maintenance Line',
      parentOrganization: { '@id': `${SITE.url}/#organization` },
      url: SITE.url,
      image: `${SITE.url}/og.png`,
      telephone: SITE.phone ? `+61${SITE.phone.replace(/^0/, '')}` : undefined,
      email: SITE.email,
      address: {
        '@type': 'PostalAddress',
        addressLocality: SITE.addressLocality,
        addressRegion: SITE.addressRegion,
        addressCountry: SITE.addressCountry,
      },
      areaServed: { '@type': 'City', name: 'Adelaide' },
    },
    {
      '@type': 'Service',
      '@id': `${SITE.url}/#maintenance-line`,
      name: 'Outsourced maintenance desk for real estate agencies',
      serviceType: 'Property maintenance coordination',
      provider: { '@id': `${SITE.url}/#organization` },
      areaServed: { '@type': 'City', name: 'Adelaide' },
      audience: { '@type': 'BusinessAudience', audienceType: 'Real estate agencies and property managers' },
      description:
        'Tenants report repairs to one Briks number. Briks triages urgency, books a licensed trade, arranges access, updates the tenant and property manager, checks the work and sends a weekly report with photos. Routine jobs under the agency approval limit go ahead; bigger jobs are quoted to the property manager and start only after written approval.',
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE.url}/#faq`,
      mainEntity: FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE.url}/#webpage`,
      url: SITE.url,
      name: 'Outsourced property maintenance for Adelaide real estate agencies',
      isPartOf: { '@id': `${SITE.url}/#website` },
      about: { '@id': `${SITE.url}/#maintenance-line` },
      dateModified: UPDATED,
      inLanguage: 'en-AU',
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      publisher: { '@id': `${SITE.url}/#organization` },
      inLanguage: 'en-AU',
    },
  ],
}

const eyebrow = 'eyebrow'
const h2 = 'font-display text-[clamp(30px,4vw,48px)] font-bold leading-[1.04] text-[#1a1a1a] [text-wrap:balance]'
const wrap = 'mx-auto w-full max-w-[1200px] px-5 sm:px-8'
const btnPrimary =
  'font-heading inline-flex min-h-[48px] items-center justify-center gap-2 rounded-sm bg-[#1a1a1a] px-6 text-[15px] font-semibold text-[#fafaf7] transition-colors duration-200 hover:bg-[#6a5530] active:translate-y-px'
const btnSecondary =
  'font-heading inline-flex min-h-[48px] items-center justify-center gap-2 rounded-sm border border-[#c0bcb4] bg-white px-6 text-[15px] font-semibold text-[#1a1a1a] transition-colors duration-200 hover:border-[#1a1a1a] active:translate-y-px'

function Arrow() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
    </svg>
  )
}

export default function HomePage() {
  const phone = sitePhone()
  const phoneHref = sitePhoneHref()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      {/* HERO: the answer, then the product */}
      <section aria-labelledby="hero-h" className="border-b border-[#e2ddd3] bg-[#fafaf7]">
        <div className={`${wrap} grid items-center gap-12 pb-16 pt-32 md:pb-20 md:pt-36 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:pb-24 lg:pt-36`}>
          <div className="home-enter min-w-0">
            <p className={eyebrow}>Maintenance coordination for real estate agencies</p>
            <h1
              id="hero-h"
              className="font-display mt-5 text-[clamp(40px,6.2vw,76px)] font-bold leading-[0.98] text-[#1a1a1a] [text-wrap:balance]"
            >
              Tenants call us. We save you the headache.
            </h1>
            <p className="mt-6 max-w-[34rem] text-[18px] leading-[1.6] text-[#3a3735]">
              <strong className="font-semibold text-[#1a1a1a]">Every repair handled, approved by you, and on one report every Friday.</strong> With Briks Maintenance Line, tenants
              report every repair to one Briks number. We organise a licensed trade, book access, keep everyone updated and
              review the work. Routine repairs under your limit go ahead, and bigger jobs wait for your written approval.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/for-agencies#enquiry" className={btnPrimary}>
                Book a 15-minute call <Arrow />
              </Link>
              <a href="#how" className={btnSecondary}>
                Read the 5 steps
              </a>
            </div>
            <p className="mt-8 text-[14px] leading-relaxed text-[#5a5650]">
              Self-managing a rental?{' '}
              <Link href="/for-landlords" className="font-medium text-[#1a1a1a] underline decoration-[#c0bcb4] underline-offset-4 hover:decoration-[#8a6e3f]">
                Repairs for landlords
              </Link>
              <span aria-hidden="true" className="mx-2">·</span>
              Your own home?{' '}
              <Link href="/for-homeowners" className="font-medium text-[#1a1a1a] underline decoration-[#c0bcb4] underline-offset-4 hover:decoration-[#8a6e3f]">
                Get a written quote
              </Link>
            </p>
          </div>
          <div className="home-enter home-enter--late min-w-0">
            <FridayReport />
          </div>
        </div>
      </section>

      {/* DEFINITION: extractable answer for AI and people */}
      <section aria-labelledby="what-h" className="bg-white">
        <div className={`${wrap} grid gap-10 py-20 md:grid-cols-12 md:py-28`}>
          <div className="md:col-span-7">
            <p className={eyebrow}>What it is</p>
            <h2 id="what-h" className={`${h2} mt-4`}>
              An outsourced maintenance desk, run from Adelaide.
            </h2>
            <p className="mt-6 max-w-[38rem] text-[18px] leading-[1.65] text-[#3a3735]">
              An outsourced maintenance desk takes tenant repair requests off property managers. Tenants contact Briks
              directly. We work out how urgent each job is, book a licensed trade, arrange access, keep the tenant and
              property manager updated and check the finished work. Your agency keeps its owners and its approval limits.
            </p>
          </div>
          <dl className="m-0 grid content-start gap-0 md:col-span-4 md:col-start-9 md:mt-14">
            {[
              ['Who it is for', 'Real estate agencies and their property managers'],
              ['Where', 'The Adelaide metropolitan area'],
              ['Who does the work', 'Independent trades licensed in South Australia'],
              ['Approvals', 'Under your limit it goes ahead; over it, only with your written yes'],
            ].map(([k, v]) => (
              <div key={k} className="border-t border-[#e2ddd3] py-4 last:border-b">
                <dt className="font-heading text-[12px] font-semibold uppercase tracking-[0.16em] text-[#5a5650]">{k}</dt>
                <dd className="m-0 mt-1 text-[16px] font-medium text-[#1a1a1a]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* HOW IT WORKS: a real sequence, so it is numbered */}
      <section id="how" aria-labelledby="how-h" className="scroll-mt-24 bg-[#f3efe5]">
        <div className={`${wrap} py-20 md:py-28`}>
          <div className="max-w-[44rem]">
            <p className={eyebrow}>How it works</p>
            <h2 id="how-h" className={`${h2} mt-4`}>
              From the tenant&rsquo;s call to the Friday report.
            </h2>
          </div>
          <ol className="m-0 mt-12 grid list-none gap-0 p-0 md:grid-cols-5 md:gap-6">
            {STEPS.map((s, i) => (
              <li key={s.title} className="border-t-2 border-[#1a1a1a] py-5 md:py-6">
                <span className="font-ticker text-[15px] text-[#8a6e3f]">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-heading mt-3 text-[18px] font-bold leading-snug text-[#1a1a1a]">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#3a3735]">{s.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 max-w-[44rem] text-[16px] leading-relaxed text-[#3a3735]">
            <strong className="font-semibold text-[#1a1a1a]">Over your approval limit?</strong> We send you a quote first
            and nothing starts until you or the owner say yes.
          </p>
        </div>
      </section>

      {/* CONTROL: what changes, what stays */}
      <section aria-labelledby="control-h" className="bg-white">
        <div className={`${wrap} py-20 md:py-28`}>
          <p className={eyebrow}>Your agency stays in charge</p>
          <h2 id="control-h" className={`${h2} mt-4 max-w-[40rem]`}>
            We take the running around. You keep the decisions.
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
            {[
              { title: 'What changes for your property managers', items: CHANGES },
              { title: 'What stays yours', items: STAYS },
            ].map((col) => (
              <div key={col.title}>
                <h3 className="font-heading border-b border-[#1a1a1a] pb-3 text-[18px] font-bold text-[#1a1a1a]">{col.title}</h3>
                <ul className="m-0 list-none p-0">
                  {col.items.map((it) => (
                    <li key={it} className="flex gap-3 border-b border-[#e2ddd3] py-4 text-[16px] leading-relaxed text-[#3a3735]">
                      <span aria-hidden="true" className="mt-[11px] h-[2px] w-3 shrink-0 bg-[#8a6e3f]" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPROVALS */}
      <section aria-labelledby="approvals-h" className="border-t border-[#e2ddd3] bg-[#fafaf7]">
        <div className={`${wrap} grid gap-10 py-20 md:grid-cols-12 md:py-28`}>
          <div className="md:col-span-5">
            <p className={eyebrow}>How approvals work</p>
            <h2 id="approvals-h" className={`${h2} mt-4`}>
              Small jobs move. Big jobs wait for your yes.
            </h2>
            <p className="mt-6 max-w-[30rem] text-[17px] leading-relaxed text-[#3a3735]">
              You set the limit once. Anything over it comes to you as a quote by email and a phone call, and nothing
              starts until you approve it in writing.
            </p>
          </div>
          <dl className="m-0 md:col-span-6 md:col-start-7">
            {APPROVALS.map((p) => (
              <div key={p.q} className="grid gap-1 border-t border-[#e2ddd3] py-5 last:border-b sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-6">
                <dt className="font-heading text-[15px] font-semibold text-[#1a1a1a]">{p.q}</dt>
                <dd className="m-0 text-[15px] leading-relaxed text-[#3a3735]">{p.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* START SMALL */}
      <section aria-labelledby="start-h" className="bg-[#1a1a1a] text-[#fafaf7]">
        <div className={`${wrap} grid items-end gap-12 py-20 md:grid-cols-12 md:py-28`}>
          <div className="md:col-span-6">
            <p className="eyebrow text-[#b89868]!">The first step</p>
            <h2 id="start-h" className="font-display mt-4 text-[clamp(30px,4vw,48px)] font-bold leading-[1.04] [text-wrap:balance]">
              Start with one property manager for 30 days.
            </h2>
            <p className="mt-6 max-w-[32rem] text-[17px] leading-relaxed text-[#d6d0c4]">
              No contract. We agree your approval limit, write the email that tells tenants the new
              number, and send a report every Friday. At day 30 you decide: keep it, expand it or stop.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/for-agencies#enquiry"
                className="font-heading inline-flex min-h-[48px] items-center justify-center gap-2 rounded-sm bg-[#fafaf7] px-6 text-[15px] font-semibold text-[#1a1a1a] transition-colors duration-200 hover:bg-[#ebe4d4] active:translate-y-px"
              >
                Book a 15-minute call <Arrow />
              </Link>
              <Link
                href="/for-property-managers"
                className="font-heading inline-flex min-h-[48px] items-center justify-center rounded-sm border border-[#5a5650] px-6 text-[15px] font-semibold text-[#fafaf7] transition-colors duration-200 hover:border-[#fafaf7]"
              >
                I&rsquo;m a property manager
              </Link>
            </div>
          </div>
          <ol className="m-0 list-none p-0 md:col-span-5 md:col-start-8">
            {[
              ['Day 1', 'We agree your approval limit, after-hours rules and any preferred trades.'],
              ['Day 2', 'Your property manager sends tenants the email we wrote.'],
              ['Every Friday', 'A report of every job, with photos.'],
              ['Day 30', 'We sit down with the numbers. You decide what happens next.'],
            ].map(([d, t]) => (
              <li key={d} className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-4 border-t border-[#3a3733] py-4 last:border-b">
                <span className="font-heading text-[14px] font-semibold text-[#b89868]">{d}</span>
                <span className="text-[15px] leading-relaxed text-[#e7e1d3]">{t}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* OTHER AUDIENCES: rows, not a card grid */}
      <section aria-labelledby="others-h" className="bg-white">
        <div className={`${wrap} py-20 md:py-28`}>
          <p className={eyebrow}>Not an agency?</p>
          <h2 id="others-h" className={`${h2} mt-4 max-w-[40rem]`}>
            The same desk, for landlords, property managers and homeowners.
          </h2>
          <ul className="m-0 mt-12 list-none p-0">
            {[
              {
                who: 'Self-managing landlords',
                line: 'Keep managing it yourself. Your tenants report repairs straight to us, and you approve anything over your limit.',
                href: '/for-landlords',
                cta: 'Repairs for landlords',
              },
              {
                who: 'Property managers',
                line: 'Want this for your portfolio? Work out your own numbers and get a ready email to take to your principal.',
                href: '/for-property-managers',
                cta: 'Bring it to your agency',
              },
              {
                who: 'Homeowners',
                line: 'A leak, a sticking door, new floors. Tell us the job and get a written quote before any work starts.',
                href: '/for-homeowners',
                cta: 'Get a written quote',
              },
            ].map((r) => (
              <li key={r.who} className="border-t border-[#e2ddd3] last:border-b">
                <Link
                  href={r.href}
                  className="group grid gap-2 py-7 md:grid-cols-12 md:items-center md:gap-8"
                >
                  <span className="font-display text-[26px] font-bold leading-tight text-[#1a1a1a] md:col-span-4">{r.who}</span>
                  <span className="text-[16px] leading-relaxed text-[#3a3735] md:col-span-5">{r.line}</span>
                  <span className="font-heading inline-flex items-center gap-2 text-[15px] font-semibold text-[#6a5530] transition-transform duration-200 group-hover:translate-x-1 md:col-span-3 md:justify-end">
                    {r.cta} <Arrow />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ: native details, FAQPage schema above */}
      <section aria-labelledby="faq-h" className="border-t border-[#e2ddd3] bg-[#fafaf7]">
        <div className={`${wrap} grid gap-10 py-20 md:grid-cols-12 md:py-28`}>
          <div className="md:col-span-4">
            <p className={eyebrow}>Questions principals ask</p>
            <h2 id="faq-h" className={`${h2} mt-4`}>Before you book a call.</h2>
            <p className="mt-6 text-[14px] text-[#5a5650]">
              Updated <time dateTime={UPDATED}>{UPDATED_LABEL}</time>.
            </p>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            {FAQS.map((f) => (
              <details key={f.q} className="group border-t border-[#e2ddd3] last:border-b">
                <summary className="font-heading flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-6 py-4 text-[17px] font-semibold text-[#1a1a1a] [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden="true" className="text-[22px] font-normal text-[#8a6e3f] transition-transform duration-200 group-open:rotate-45">+</span>
                </summary>
                <p className="m-0 max-w-[40rem] pb-6 text-[16px] leading-relaxed text-[#3a3735]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSE */}
      <section aria-labelledby="close-h" className="bg-white">
        <div className={`${wrap} flex flex-col gap-8 py-20 md:flex-row md:items-end md:justify-between md:py-24`}>
          <div className="max-w-[40rem]">
            <h2 id="close-h" className={h2}>
              One property manager. Thirty days. One Friday report to judge it by.
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-[#3a3735]">
              A 15-minute call: we go through your approval limits, after-hours rules and preferred trades. You get a sample
              Friday report and the email that tells tenants the new number. No obligation.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:shrink-0">
            <Link href="/for-agencies#enquiry" className={btnPrimary}>
              Book a 15-minute call <Arrow />
            </Link>
            {phone ? (
              <a href={phoneHref} className={btnSecondary}>
                Call {phone}
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </>
  )
}
