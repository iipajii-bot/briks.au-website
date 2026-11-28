import type { Metadata } from 'next'
import FridayReport from '@/components/home/FridayReport'
import JobTimeline from '@/components/home/JobTimeline'
import { STEPS, CHANGES, STAYS, FAQS } from '@/components/home/homeContent'
import LeadForm from '@/components/site/LeadForm'
import QuickFixes from '@/components/site/QuickFixes'
import TimeBackCalculator from '@/components/site/TimeBackCalculator'
import TradeStrip, { Photo } from '@/components/site/TradeStrip'
import { APPROVAL_FAQ, APPROVALS, START_NEEDS } from '@/components/site/pricingContent'
import { cleanInt, cleanText, fmt, timeBack, type SearchParams } from '@/components/site/personal'
import { Arrow, CtaLink, DashList, Faq, FactList, JsonLd, SectionHead, Steps, cls, faqJsonLd, ground } from '@/components/site/ui'
import { SITE, sitePhone, sitePhoneHref } from '@/lib/constants'

/*
 * /for-agencies: principals and heads of property management (v2, 25 Nov 2026).
 * Personal link: ?agency=&doors=&office= (cleaned in components/site/personal.ts, rendered as text).
 * Order: hero with a live example job, trades in photos, the cost of the current way in their numbers,
 * the sequence and the Friday report, help first, control, calculator, how approvals work, what we need to start, starting on one portfolio, proof they can check, FAQ, form.
 */

export const metadata: Metadata = {
  title: { absolute: 'Maintenance Desk for Adelaide Real Estate Agencies | Briks' },
  description:
    `Tenants call one Briks number, a licensed trade is booked when needed, and your agency gets one Friday report.`,
  alternates: { canonical: '/for-agencies' },
  // Not indexed until the building work contractor licence is issued.
  // Outreach page for principals: kept out of search so it does not compete with the homepage for agency queries.
  robots: { index: false, follow: true },
}

const AGENCY_FAQS = [
  APPROVAL_FAQ,
  ...FAQS.filter((f) => f.q !== APPROVAL_FAQ.q && !f.q.startsWith('What is an outsourced') && !f.q.startsWith('Does the Briks') && !f.q.startsWith('How do we start')),
  {
    q: 'How do we start?',
    a: 'With one job. Send us your next repair, or give one tenant our number, and tell us your approval limit. We arrange it, you approve as normal, and you judge us on how it went. If it works, send the next one. No contract and nothing to install.',
  },
  {
    q: 'Do you need access to our property management software?',
    a: 'No. You add Briks as a supplier, the way you would any tradie, and work orders reach us by email. We do not need owner details: your property manager approves and pays our invoices.',
  },
  {
    q: 'What does our property manager actually have to do?',
    a: 'Send one email to their tenants with the Briks number. We write it. After that, repair requests come to us and your property manager sees the jobs on the Friday report.',
  },
  {
    q: 'How do emergencies work?',
    a: 'Tenants call the same number. We work out whether it is an emergency, organise a make-safe or a licensed trade, and tell you what was done. Office hours are Monday to Friday, 8am to 6pm. After hours, tenants follow the make-safe steps on our help page (turn off the water or power), call 000 if anyone is in danger, and leave a message; we call back from 8am the next business day.',
  },
] as const

export default async function ForAgenciesPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams
  const agency = cleanText(sp.agency)
  const office = cleanText(sp.office)
  const doors = cleanInt(sp.doors, 1, 20000)
  const tb = doors ? timeBack(doors) : null
  const phone = sitePhone()
  const phoneHref = sitePhoneHref()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${SITE.url}/for-agencies#service`,
        name: 'Briks Maintenance Line for real estate agencies',
        serviceType: 'Outsourced property maintenance coordination',
        provider: { '@id': `${SITE.url}/#organization` },
        areaServed: { '@type': 'City', name: 'Adelaide' },
        audience: { '@type': 'BusinessAudience', audienceType: 'Real estate agencies' },
      },
      faqJsonLd(`${SITE.url}/for-agencies#faq`, AGENCY_FAQS),
    ],
  }

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* HERO */}
      <section aria-labelledby="hero-h" className="bg-[#fafaf7]">
        <div className={`${cls.wrap} grid items-center gap-10 pb-12 pt-32 md:pb-16 md:pt-36 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14`}>
          <div className="home-enter min-w-0">
            <p className={cls.eyebrow}>
              {agency ? `Prepared for ${agency}${office ? `, ${office}` : ''}` : 'Briks Maintenance Line · For agencies'}
            </p>
            <h1 id="hero-h" className={`${cls.h1} mt-5`}>
              Tenant repairs, off your property managers&rsquo; desks.
            </h1>
            <p className={`${cls.lead} mt-6 max-w-[34rem]`}>
              Tenants call one Briks number for every repair. Simple problems are often sorted over the phone. When a trade is
              needed, we book a licensed one, keep everyone updated and send {agency || 'your agency'} one report on Friday.{' '}
              <strong className="font-semibold text-[#1a1a1a]">You approve every job:</strong> routine repairs under your limit go ahead, and bigger jobs wait for your written approval.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CtaLink href="#enquiry">
                Book a 15-minute call <Arrow />
              </CtaLink>
              <CtaLink href="#numbers" variant="secondary">
                See your numbers
              </CtaLink>
            </div>
            <p className="mt-6 text-[14px] text-[#5a5650]">One job. Judge us on that. If we don’t make it easier, you’ve lost nothing.</p>
          </div>
          <div className="home-enter home-enter--late min-w-0">
            <JobTimeline />
          </div>
        </div>
      </section>

      <TradeStrip title="Every trade a rental needs. One number for tenants." note="Independent trades, each licensed in South Australia for their work." />

      {/* THE COST OF THE CURRENT WAY */}
      <section aria-labelledby="cost-h" className={ground.paper}>
        <div className={`${cls.wrap} ${cls.section} grid items-center gap-10 lg:grid-cols-12`}>
          <div className="lg:col-span-7">
            <SectionHead id="cost-h" eyebrow="The current way" title="Every repair costs a property manager an hour they don't have.">
              <p>
                A tenant rings about a leaking tap. Then the property manager finds a trade, books access, chases the trade,
                answers &ldquo;any update?&rdquo;, checks the job and files the invoice. Multiply that by every door.
              </p>
            </SectionHead>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            {tb ? (
              <div className="rounded-lg bg-[#1a1a1a] p-6 text-[#fafaf7]">
                <p className="font-heading text-[12px] font-semibold uppercase tracking-[0.16em] text-[#b89868]">At {fmt(doors!)} doors, estimated</p>
                <p className="font-ticker mt-2 text-[56px] leading-none">{fmt(tb.hoursWeek, 0)} h</p>
                <p className="mt-2 text-[15px] leading-relaxed text-[#e7e1d3]">
                  of property manager time a week on repairs. About {fmt(tb.hoursYear)} hours a year.
                </p>
                <p className="mt-3 text-[13px] text-[#a8a195]">Estimate: 2.5 requests a door a year, 45 minutes each.</p>
              </div>
            ) : (
              <Photo src="/stock/contact.jpg" alt="A hand holding a phone against a sandstone wall" ratio="aspect-[4/3]" />
            )}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS + THE REPORT */}
      <section id="how" aria-labelledby="how-h" className={`scroll-mt-24 ${ground.warm}`}>
        <div className={`${cls.wrap} ${cls.section}`}>
          <SectionHead id="how-h" eyebrow="How it works" title="From the tenant's call to the Friday report." />
          <Steps steps={STEPS} cols={5} />
          <div className="mt-12 grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h3 className="font-display text-[28px] font-bold leading-tight text-[#1a1a1a]">What lands in your inbox every Friday.</h3>
              <p className="mt-4 text-[16px] leading-relaxed text-[#3a3735]">
                Every job that week: what broke, who fixed it, the photos, and anything waiting on your approval. Over your
                limit? We send you a quote first and nothing starts until you or the owner say yes.
              </p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <FridayReport />
            </div>
          </div>
        </div>
      </section>

      {/* FREE HELP FIRST */}
      <section aria-labelledby="fix-h" className={ground.paper}>
        <div className={`${cls.wrap} ${cls.section}`}>
          <SectionHead id="fix-h" eyebrow="Help first" title="Not every call needs a trade sent.">
            <p>Before anyone is sent, we help tenants check the simple things. Fewer call-outs means fewer bills for your owners. Pick a problem to see the checks.</p>
          </SectionHead>
          <div className="mt-10">
            <QuickFixes contactHref={phoneHref || '/contact'} contactLabel={phone ? `Still stuck? Call ${phone}` : 'Contact us'} />
          </div>
        </div>
      </section>

      {/* CONTROL */}
      <section aria-labelledby="control-h" className={ground.soft}>
        <div className={`${cls.wrap} ${cls.section} grid items-center gap-12 lg:grid-cols-12`}>
          <Photo src="/stock/trade-partners.jpg" alt="Two people shaking hands outside a stone house" className="lg:col-span-5" />
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHead id="control-h" eyebrow="Your agency stays in charge" title="We do the running around. You keep the decisions." />
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {[
                { title: 'What changes', items: CHANGES },
                { title: 'What stays yours', items: STAYS },
              ].map((col) => (
                <div key={col.title}>
                  <h3 className="font-heading border-b border-[#1a1a1a] pb-2 text-[16px] font-bold text-[#1a1a1a]">{col.title}</h3>
                  <DashList items={col.items} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="numbers" aria-labelledby="numbers-h" className={`scroll-mt-24 ${ground.paper}`}>
        <div className={`${cls.wrap} ${cls.section}`}>
          <SectionHead id="numbers-h" eyebrow="Time back" title={agency ? `${agency}'s numbers.` : 'Your agency, in hours.'}>
            <p>Put in your own figures. The result is an estimate of the time repairs take today.</p>
          </SectionHead>
          <div className="mt-10">
            <TimeBackCalculator defaultDoors={doors ?? 200} />
          </div>
        </div>
      </section>

      {/* APPROVALS */}
      <section id="approvals" aria-labelledby="approvals-h" className={`scroll-mt-24 ${ground.soft}`}>
        <div className={`${cls.wrap} ${cls.section} grid gap-10 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <SectionHead id="approvals-h" eyebrow="How approvals work" title="Small jobs move. Big jobs wait for your yes.">
              <p>
                You set the limit once. Anything over it comes to you as a quote by email and a phone call, and nothing
                starts until you approve it in writing.
              </p>
            </SectionHead>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <FactList items={APPROVALS.map((p) => ({ k: p.q, v: p.a }))} wide />
          </div>
        </div>
      </section>

      {/* WHAT WE NEED TO START */}
      <section aria-labelledby="need-h" className={ground.paper}>
        <div className={`${cls.wrap} ${cls.section}`}>
          <SectionHead id="need-h" eyebrow="What we need from you" title="Three things to start. Nothing to install.">
            <p>We work alongside PropertyMe, Console or whatever you use today. Work orders reach us by email, the way they reach any tradie, so there is nothing to install.</p>
          </SectionHead>
          <Steps steps={START_NEEDS} cols={3} />
        </div>
      </section>

      {/* START */}
      <section aria-labelledby="start-h" className={ground.ink}>
        <div className={`${cls.wrap} ${cls.section} grid items-center gap-12 lg:grid-cols-12`}>
          <div className="lg:col-span-6">
            <SectionHead dark id="start-h" eyebrow="Getting started" title="One job. Judge us on that.">
              <p>Send us your next repair, or give one tenant our number. We agree your approval limit, arrange the trade and send the Friday report. If it works, send the next one. No lock-in contract.</p>
            </SectionHead>
            <div className="mt-8">
              <CtaLink href="#enquiry" variant="light">
                Book a 15-minute call <Arrow />
              </CtaLink>
            </div>
          </div>
          <ol className="m-0 list-none p-0 lg:col-span-5 lg:col-start-8">
            {[
              ['Week 1', 'Briks added as a supplier, tenant list sent, approval limit agreed.'],
              ['Week 1', 'Your property manager sends tenants the email we wrote.'],
              ['Every Friday', 'A report of every job, with photos.'],
              ['End of month 1', 'We go through the numbers together. You decide what happens next.'],
            ].map(([d, t], n) => (
              <li key={n} className="grid grid-cols-[8.5rem_minmax(0,1fr)] gap-4 border-t border-[#3a3733] py-4 last:border-b">
                <span className="font-heading text-[14px] font-semibold text-[#b89868]">{d}</span>
                <span className="text-[15px] leading-relaxed text-[#e7e1d3]">{t}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* PROOF THEY CAN CHECK */}
      <section aria-labelledby="check-h" className={ground.paper}>
        <div className={`${cls.wrap} ${cls.section} grid gap-10 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <SectionHead id="check-h" eyebrow="What you can check" title="Before you hand us a single tenant." />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <FactList
              items={[
                { k: 'The trades', v: 'Every trade we send holds a current South Australian licence for their work. Ask us for any trade’s licence number and check it on the Consumer and Business Services public register.' },
                { k: 'The report', v: 'Ask for a sample Friday report on the call. It is what you would receive every week.' },
                { k: 'Tenant details', v: 'Used only to arrange repairs and never shared beyond the trade doing the job.' },
                { k: 'Insurance', v: 'Briks holds public liability insurance. Ask for the certificate of currency and we will email it the same day.' },
                { k: 'The business', v: `${SITE.legalName}, ABN ${SITE.abn}. Adelaide owned and run by its founder, ${SITE.founderName}, who you deal with directly.` },
              ]}
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-h" className={ground.soft}>
        <div className={`${cls.wrap} ${cls.section} grid gap-10 lg:grid-cols-12`}>
          <div className="lg:col-span-4">
            <SectionHead id="faq-h" eyebrow="Questions principals ask" title="Before you book a call." />
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Faq items={AGENCY_FAQS} />
          </div>
        </div>
      </section>

      {/* ENQUIRY */}
      <section id="enquiry" aria-labelledby="enq-h" className={`scroll-mt-24 ${ground.paper}`}>
        <div className={`${cls.wrap} ${cls.section} grid gap-12 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <SectionHead id="enq-h" eyebrow="Book a call" title="15 minutes about your doors and your approval limits.">
              <p>Tell us a little about your agency. We reply by phone or email.</p>
            </SectionHead>
            {phone ? (
              <p className="mt-6 text-[15px] text-[#3a3735]">
                Or call <a href={phoneHref} className={cls.textLink}>{phone}</a>.
              </p>
            ) : null}
            <Photo src="/stock/how-it-works.jpg" alt="A hallway in a period home with timber floors" className="mt-8 hidden lg:block" ratio="aspect-[4/3]" />
          </div>
          <div className="lg:col-span-7">
            <LeadForm
              source="agencies"
              submitLabel="Request a call"
              defaults={{ company: agency, doors: doors ? String(doors) : '', suburb: office }}
              fields={[
                { name: 'name', label: 'Your name', autoComplete: 'name', required: true, half: true },
                { name: 'company', label: 'Agency', autoComplete: 'organization', required: true, half: true },
                { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', required: true, half: true },
                { name: 'phone', label: 'Mobile', type: 'tel', autoComplete: 'tel', required: true, half: true },
                { name: 'suburb', label: 'Office suburb', required: true, half: true },
                { name: 'doors', label: 'Properties managed', half: true },
                { name: 'issue', label: 'What should we know?', type: 'textarea', required: true, hint: 'For example: how many property managers, and how you handle repairs now.' },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  )
}
