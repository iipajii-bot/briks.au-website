import type { Metadata } from 'next'
import Chooser from '@/components/site/Chooser'
import LeadForm from '@/components/site/LeadForm'
import CopyBlock from '@/components/site/CopyBlock'
import QuickFixes from '@/components/site/QuickFixes'
import TradeStrip, { Photo } from '@/components/site/TradeStrip'
import { cleanChoice, cleanText, type SearchParams } from '@/components/site/personal'
import { Arrow, CtaLink, Faq, FactList, JsonLd, SectionHead, Steps, cls, faqJsonLd, ground } from '@/components/site/ui'
import { SITE, sitePhone, sitePhoneHref } from '@/lib/constants'

/*
 * /for-landlords: self-managing landlords. Keep managing it yourself; stop being the repair desk.
 * Personal link: ?suburb=&rentals=1|2-5|6+
 */

export const metadata: Metadata = {
  title: { absolute: 'Repairs for Self-Managing Landlords in Adelaide | Briks' },
  description:
    'Self-managing a rental in Adelaide? Tenants report repairs to Briks, a licensed trade is booked when needed, and anything over your limit waits for your yes.',
  alternates: { canonical: '/for-landlords' },
  robots: { index: true, follow: true },
}

const STEPS = [
  { title: 'Your tenant reports it to us', body: 'They call or text the Briks number. We work out how urgent it is.' },
  { title: 'We book a licensed trade', body: 'We arrange access with the tenant and keep them updated, so they stop calling you.' },
  { title: 'Over your limit, you decide', body: 'Jobs under your limit go ahead. Anything over it is quoted to you first.' },
  { title: 'You get photos and one invoice', body: 'Before and after photos with each finished job, and one invoice from Briks for each job.' },
] as const

const FAQS = [
  { q: 'Do I need a property manager to use Briks?', a: 'No. Briks works directly with landlords who manage their own rentals. You stay the landlord; we handle the repair calls.' },
  { q: 'Who approves the work?', a: 'You do. Routine repairs under the approval limit you set go ahead straight away. For anything bigger we send you the quote and call you; nothing starts until you approve it in writing.' },
  { q: 'What is my approval limit?', a: 'An amount you choose. Jobs under it go ahead without asking you. Anything over it is quoted to you first and waits for your yes.' },
  { q: 'What about emergencies?', a: 'Your tenant calls the same number. We triage it when it comes in, organise a make-safe or a licensed trade, then tell you what was done. We do not offer 24-hour cover. In a life-threatening emergency, call 000 first.' },
  { q: 'Do you do flooring?', a: 'Yes. Hybrid, laminate, vinyl and carpet, supplied and installed, with a written quote first. Useful between tenancies.' },
  { q: 'What does Briks not do?', a: 'Renovations, structural work and building projects are outside what we coordinate for landlords.' },
  { q: 'Which areas do you cover?', a: 'The Adelaide metropolitan area.' },
] as const

const TENANT_NOTE = `Hi, for any repair at the property please contact Briks Building Services on ${'0449 517 367'} (call or text). They will arrange the right licensed tradesperson, book a time with you and keep you updated. For anything urgent, use the same number. In an emergency where someone is in danger, call 000 first. Thanks.`

export default async function ForLandlordsPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams
  const suburb = cleanText(sp.suburb)
  const rentals = cleanChoice(sp.rentals, ['1', '2-5', '6+'] as const)
  const phone = sitePhone()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${SITE.url}/for-landlords#service`,
        name: 'Repair coordination for self-managing landlords',
        serviceType: 'Rental property repair and maintenance coordination',
        provider: { '@id': `${SITE.url}/#organization` },
        areaServed: { '@type': 'City', name: 'Adelaide' },
        audience: { '@type': 'Audience', audienceType: 'Self-managing residential landlords' },
      },
      faqJsonLd(`${SITE.url}/for-landlords#faq`, FAQS),
    ],
  }

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* HERO: typographic, warm ground; the tenant note as the object */}
      <section aria-labelledby="hero-h" className="border-b border-[#e2ddd3] bg-[#f3efe5]">
        <div className={`${cls.wrap} ${cls.heroPad} grid items-center gap-12 lg:grid-cols-12`}>
          <div className="home-enter min-w-0 lg:col-span-7">
            <p className={cls.eyebrow}>{suburb ? `For landlords in ${suburb}` : 'For self-managing landlords · Adelaide'}</p>
            <h1 id="hero-h" className={`${cls.h1} mt-5`}>
              Keep managing it yourself. Stop being the repair desk.
            </h1>
            <p className={`${cls.lead} mt-6 max-w-[34rem]`}>
              Your tenants report repairs straight to Briks. We organise a licensed trade, keep the tenant updated and send you
              the photos. You set the approval limit, and nothing over it starts without your yes.{' '}
              <strong className="font-semibold text-[#1a1a1a]">You approve every job</strong> that is over your limit, in writing, before it starts.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CtaLink href="#setup">
                {suburb ? `Set up your ${suburb} rental` : 'Set up your rental'} <Arrow />
              </CtaLink>
              {phone ? (
                <CtaLink href={sitePhoneHref()} variant="secondary">
                  Call {phone}
                </CtaLink>
              ) : null}
            </div>
          </div>
          <div className="home-enter home-enter--late min-w-0 lg:col-span-5">
            <div className="rounded-lg border border-[#c0bcb4] bg-white p-6 shadow-[0_24px_60px_-36px_rgba(26,26,26,0.45)] sm:p-7">
              <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8a6e3f]">The note you send your tenant</p>
              <p className="mt-4 text-[16px] leading-relaxed text-[#1a1a1a]">{TENANT_NOTE}</p>
              <div className="mt-5">
                <CopyBlock text={TENANT_NOTE} label="Copy the note" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <TradeStrip title="The licensed trades your rental needs, through one number." note="Independent trades, each licensed in South Australia for their work." />

      {/* STEPS */}
      <section aria-labelledby="how-h" className={ground.paper}>
        <div className={`${cls.wrap} ${cls.section}`}>
          <SectionHead id="how-h" eyebrow="When a tenant reports a repair" title="Your phone stays quiet. You still decide." />
          <Steps steps={STEPS} cols={4} />
        </div>
      </section>

      {/* FREE HELP FIRST */}
      <section aria-labelledby="fix-h" className={ground.warm}>
        <div className={`${cls.wrap} ${cls.section}`}>
          <SectionHead id="fix-h" eyebrow="Help first" title="Some repairs don't need a trade at all.">
            <p>Your tenant gets walked through the simple checks before anyone is sent. That saves you call-outs. Pick a problem to see them.</p>
          </SectionHead>
          <div className="mt-10">
            <QuickFixes contactHref={phone ? sitePhoneHref() : '/contact'} contactLabel={phone ? `Still stuck? Call ${phone}` : 'Contact us'} />
          </div>
        </div>
      </section>

      {/* CONTROL + CHOOSER */}
      <section aria-labelledby="control-h" className={ground.soft}>
        <div className={`${cls.wrap} ${cls.section} grid gap-12 md:grid-cols-12`}>
          <div className="md:col-span-5">
            <SectionHead id="control-h" eyebrow="What you control" title="Your limit. Your yes or no. Every photo.">
              <p>Routine repairs under your limit go ahead. Anything bigger comes to you as a quote, and nothing over your limit starts until you reply.</p>
            </SectionHead>
            <div className="mt-8">
              <FactList
                items={[
                  { k: 'Your approval limit', v: 'You set the amount. Jobs under it go ahead; anything over it is quoted first.' },
                  { k: 'Your yes or no', v: 'Quotes come to you by email or phone. Nothing over your limit starts without your reply.' },
                  { k: 'Every photo', v: 'Before and after photos with each finished job, and one invoice.' },
                  { k: 'Phone help', v: 'Your tenant gets the simple checks first, which saves you call-outs.' },
                ]}
              />
            </div>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Chooser
              legend="How many rentals do you have?"
              initial={rentals}
              options={[
                { id: '1', label: '1 rental', title: 'One rental, no agent.', body: 'Give your tenant the Briks number and set one approval limit. You hear from us when something is done, or when something needs your yes.' },
                { id: '2-5', label: '2 to 5', title: 'A few rentals, one number.', body: 'Every tenant gets the same Briks number. Each rental can have its own approval limit, so one property never sets the price for another.' },
                { id: '6+', label: '6 or more', title: 'A portfolio without the phone calls.', body: 'One number for every tenant, an approval limit per property, and a weekly summary of every job across the portfolio with photos.' },
              ]}
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-h" className={ground.paper}>
        <div className={`${cls.wrap} ${cls.section} grid gap-10 md:grid-cols-12`}>
          <div className="md:col-span-4">
            <SectionHead id="faq-h" eyebrow="Questions landlords ask" title="Before you set it up." />
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <Faq items={FAQS} />
          </div>
        </div>
      </section>

      {/* SET UP */}
      <section id="setup" aria-labelledby="setup-h" className={`scroll-mt-24 ${ground.soft}`}>
        <div className={`${cls.wrap} ${cls.section} grid gap-12 md:grid-cols-12`}>
          <div className="md:col-span-5">
            <SectionHead id="setup-h" eyebrow="Set up your rental" title="Tell us about the rental. We'll do the rest.">
              <p>We reply by phone or email to agree your approval limit.</p>
            </SectionHead>
            <Photo src="/stock/about-hero.jpg" alt="A single-storey stone villa with a front garden" className="mt-8 hidden md:block" sizes="(min-width: 768px) 420px, 100vw" />
          </div>
          <div className="md:col-span-7">
            <LeadForm
              source="landlords"
              submitLabel="Send my details"
              defaults={{ suburb, doors: rentals ?? '' }}
              fields={[
                { name: 'name', label: 'Your name', autoComplete: 'name', required: true, half: true },
                { name: 'phone', label: 'Mobile', type: 'tel', autoComplete: 'tel', required: true, half: true },
                { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', required: true, half: true },
                { name: 'suburb', label: 'Suburb of the rental', required: true, half: true },
                { name: 'doors', label: 'Number of rentals', type: 'select', options: ['1', '2-5', '6+'], half: true },
                { name: 'issue', label: 'Anything we should know?', type: 'textarea', required: true, hint: 'For example: a repair that needs doing now, or how you handle repairs today.' },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  )
}
