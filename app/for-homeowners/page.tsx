import type { Metadata } from 'next'
import Chooser from '@/components/site/Chooser'
import LeadForm from '@/components/site/LeadForm'
import QuickFixes from '@/components/site/QuickFixes'
import TradeStrip from '@/components/site/TradeStrip'
import { cleanChoice, cleanText, type SearchParams } from '@/components/site/personal'
import { Arrow, CtaLink, Faq, FactList, JsonLd, SectionHead, Steps, cls, faqJsonLd, ground } from '@/components/site/ui'
import { SITE, sitePhone, sitePhoneHref } from '@/lib/constants'

/*
 * /for-homeowners: owner-occupiers with a specific job. The quote-and-do side of Briks.
 * Personal link: ?job=leak|doors|paint|roof|floors&suburb=
 * Urgent-leak line sits above everything.
 */

export const metadata: Metadata = {
  title: { absolute: 'Home Repairs in Adelaide with a Written Quote First | Briks' },
  description:
    'Leaks, doors and locks, painting, roofs, gutters and floors in Adelaide. Tell Briks the job, get a written quote first, then photos and one invoice.',
  alternates: { canonical: '/for-homeowners' },
  robots: { index: true, follow: true },
}

const JOBS = [
  { id: 'leak', label: 'Leak', h: 'Leak repairs', title: 'A leak, found and fixed.', body: 'Tell us where the water is showing and send a photo if you can. We book a licensed plumber or roof plumber, depending on where it is coming from, and quote before any work beyond the find.', img: '/stock/plumbing.jpg', alt: 'A brass pipe trap under a basin being tightened with a wrench' },
  { id: 'doors', label: 'Doors and locks', h: 'Door and lock repairs', title: 'Doors that close, locks that work.', body: 'Sticking, dropped or damaged doors, frames, hinges and lock changes. A photo of the door and the frame helps us quote quickly.', img: '/stock/carpentry.jpg', alt: 'A spirit level, hand plane and wood shavings on plans' },
  { id: 'paint', label: 'Painting', h: 'Painting', title: 'A room, a wall, or the whole house.', body: 'Interior and exterior painting, including patching and prep. Tell us the rooms and roughly how big they are.', img: '/stock/painting.jpg', alt: 'A freshly painted skirting board with a brush on a paint tin' },
  { id: 'roof', label: 'Roof and gutters', h: 'Roof and gutter repairs', title: 'Gutters that overflow, tiles that slipped.', body: 'Overflowing gutters, a downpipe that has come away, broken or slipped tiles. Photos from the ground are enough to start.', img: '/stock/roofing.jpg', alt: 'Terracotta roof tiles and a gutter in late sun' },
  { id: 'floors', label: 'Floors', h: 'New floors', title: 'Hybrid, laminate, vinyl or carpet.', body: 'We supply and install floating floors and carpet. Tell us the rooms and rough sizes and we will quote supply, removal of the old floor and installation.', img: '/stock/home-living.jpg', alt: 'A sunlit living room with timber floors' },
  { id: 'other', label: 'Something else', h: 'Home repairs', title: 'Not on the list?', body: 'Tell us what is wrong. If it is a job we coordinate, we quote it. If it is not, we will say so.', img: '/stock/repair.jpg', alt: 'A hammer resting on a timber surface' },
] as const

const STEPS = [
  { title: 'Tell us the problem', body: 'Describe it and send photos if you can. Photos help us send the right trade the first time.' },
  { title: 'We assess it, or a licensed trade visits to quote', body: 'Some jobs can be quoted from photos. Others need a licensed trade to visit first.' },
  { title: 'You get a written quote', body: 'It names the work, the trade and the price. Nothing starts until you accept it.' },
  { title: 'The job is done and checked', body: 'Before and after photos and one invoice for the whole job.' },
] as const

const FAQS = [
  { q: 'Do you give a written quote before any work?', a: 'Yes. Every job gets a written quote that names the work, the trade and the price. Nothing starts until you accept it.' },
  { q: 'Who does the work?', a: 'Independent tradespeople licensed in South Australia for their trade. Briks organises the job, checks it and invoices once.' },
  { q: 'Do you install floors?', a: 'Yes. Hybrid, laminate, vinyl and carpet, supplied and installed, including removal of the old floor if needed.' },
  { q: 'What does Briks not do?', a: 'Renovations, extensions, structural work and new builds are outside what we take on.' },
  { q: 'Which areas do you cover?', a: 'The Adelaide metropolitan area.' },
] as const

export default async function ForHomeownersPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams
  const job = cleanChoice(sp.job, ['leak', 'doors', 'paint', 'roof', 'floors', 'other'] as const)
  const suburb = cleanText(sp.suburb)
  const jobInfo = JOBS.find((j) => j.id === job)
  const phone = sitePhone()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${SITE.url}/for-homeowners#service`,
        name: 'Home repairs coordinated by Briks',
        serviceType: 'Residential repair coordination',
        provider: { '@id': `${SITE.url}/#organization` },
        areaServed: { '@type': 'City', name: 'Adelaide' },
        audience: { '@type': 'Audience', audienceType: 'Homeowners' },
      },
      faqJsonLd(`${SITE.url}/for-homeowners#faq`, FAQS),
    ],
  }

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* HERO: answer first; urgent line visible */}
      <section aria-labelledby="hero-h" className="border-b border-[#e2ddd3] bg-[#fafaf7]">
        <div className={`${cls.wrap} ${cls.heroPad}`}>
          <div className="home-enter max-w-[52rem]">
            <p className={cls.eyebrow}>{suburb ? `For homeowners in ${suburb}` : 'For homeowners · Adelaide'}</p>
            <h1 id="hero-h" className={`${cls.h1} mt-5`}>
              {jobInfo ? `${jobInfo.h}${suburb ? ` in ${suburb}` : ''}, with a written quote first.` : 'Home repairs and new floors, with a written quote first.'}
            </h1>
            <p className={`${cls.lead} mt-6 max-w-[38rem]`}>
              Tell us the job and send a photo. We work out what it needs, get a licensed trade to quote it in writing and book
              the work once you say yes. Before and after photos, one invoice.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CtaLink href="#quote">
                {suburb ? `Get your ${suburb} quote` : 'Get a written quote'} <Arrow />
              </CtaLink>
              {phone ? (
                <CtaLink href={sitePhoneHref()} variant="secondary">
                  Call {phone}
                </CtaLink>
              ) : null}
            </div>
          </div>
          {phone ? (
            <p className="home-enter home-enter--late mt-10 flex max-w-[52rem] flex-wrap items-center gap-x-3 gap-y-1 border-t border-[#e2ddd3] pt-5 text-[15px] text-[#3a3735]">
              <span className="font-heading font-semibold text-[#1a1a1a]">Water coming in right now?</span>
              If anyone is in danger, call 000 first. If it is safe, turn off the water at the meter, then call{' '}
              <a href={sitePhoneHref()} className={cls.textLink}>{phone}</a>.
            </p>
          ) : null}
        </div>
      </section>

      <TradeStrip title="The trades your home needs, organised for you." note="Independent trades, each licensed in South Australia for their work." />

      {/* JOB PICKER */}
      <section aria-labelledby="job-h" className={ground.paper}>
        <div className={`${cls.wrap} ${cls.section} grid gap-12 md:grid-cols-12`}>
          <div className="md:col-span-5">
            <SectionHead id="job-h" eyebrow="What's the job?" title="Pick the closest one.">
              <p>It tells us which trade to send and what to ask you. You can describe it properly in the form.</p>
            </SectionHead>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Chooser
              legend="The job"
              initial={job}
              options={JOBS.map((j) => ({ id: j.id, label: j.label, title: j.title, body: j.body, img: j.img, alt: j.alt }))}
            />
          </div>
        </div>
      </section>

      {/* FREE HELP FIRST */}
      <section aria-labelledby="fix-h" className={ground.soft}>
        <div className={`${cls.wrap} ${cls.section}`}>
          <SectionHead id="fix-h" eyebrow="Check this first" title="It might be a two-minute fix.">
            <p>Before you book anyone, try the simple checks. If they don&rsquo;t sort it, call us and we&rsquo;ll take it from there.</p>
          </SectionHead>
          <div className="mt-10">
            <QuickFixes contactHref={phone ? sitePhoneHref() : '#quote'} contactLabel={phone ? `Still not fixed? Call ${phone}` : 'Get a written quote'} />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section aria-labelledby="how-h" className={ground.warm}>
        <div className={`${cls.wrap} ${cls.section}`}>
          <SectionHead id="how-h" eyebrow="How it works" title="A written price before any work." />
          <Steps steps={STEPS} cols={4} />
        </div>
      </section>

      {/* IN WRITING */}
      <section aria-labelledby="writing-h" className={ground.paper}>
        <div className={`${cls.wrap} ${cls.section} grid gap-10 md:grid-cols-12`}>
          <div className="md:col-span-5">
            <SectionHead id="writing-h" eyebrow="What you get" title="Everything in writing." />
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <FactList
              wide
              items={[
                { k: 'The quote', v: 'Before any work. It names the work, the trade and the price.' },
                { k: 'Photos', v: 'Before and after, sent with the finished job.' },
                { k: 'The invoice', v: 'One invoice from Briks for the whole job.' },
                { k: 'Paying', v: 'Jobs under $500 and make-safe visits: pay when the work is done. Bigger jobs: 60% to book and 40% on completion, shown on your quote before you accept.' },
                { k: 'Insurance', v: 'Briks holds public liability insurance, and every trade is licensed in South Australia for their work. Certificate on request.' },
              ]}
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-h" className={ground.soft}>
        <div className={`${cls.wrap} ${cls.section} grid gap-10 md:grid-cols-12`}>
          <div className="md:col-span-4">
            <SectionHead id="faq-h" eyebrow="Questions" title="Before you ask for a quote." />
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <Faq items={FAQS} />
          </div>
        </div>
      </section>

      {/* QUOTE FORM */}
      <section id="quote" aria-labelledby="quote-h" className={`scroll-mt-24 ${ground.paper}`}>
        <div className={`${cls.wrap} ${cls.section} grid gap-12 md:grid-cols-12`}>
          <div className="md:col-span-5">
            <SectionHead id="quote-h" eyebrow="Get a written quote" title="Tell us the job.">
              <p>We reply by phone or email. If photos help, we will ask you to text them to us.</p>
            </SectionHead>
          </div>
          <div className="md:col-span-7">
            <LeadForm
              source="homeowners"
              submitLabel="Get a written quote"
              defaults={{ suburb, company: jobInfo ? jobInfo.label : '' }}
              fields={[
                { name: 'name', label: 'Your name', autoComplete: 'name', required: true, half: true },
                { name: 'phone', label: 'Mobile', type: 'tel', autoComplete: 'tel', required: true, half: true },
                { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', required: true, half: true },
                { name: 'suburb', label: 'Suburb', required: true, half: true },
                { name: 'company', label: 'Type of job', type: 'select', options: JOBS.map((j) => j.label), half: true },
                { name: 'issue', label: 'Describe the problem', type: 'textarea', required: true, hint: 'What is wrong, where it is, and how long it has been happening.' },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  )
}
