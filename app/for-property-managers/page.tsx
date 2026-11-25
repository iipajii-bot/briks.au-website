import type { Metadata } from 'next'
import ChampionKit from '@/components/site/ChampionKit'
import JobTimeline from '@/components/home/JobTimeline'
import QuickFixes from '@/components/site/QuickFixes'
import { Photo } from '@/components/site/TradeStrip'
import { FEE } from '@/components/site/fee'
import LeadForm from '@/components/site/LeadForm'
import { cleanInt, cleanText, type SearchParams } from '@/components/site/personal'
import { Arrow, CtaLink, DashList, Faq, FactList, JsonLd, SectionHead, cls, faqJsonLd, ground } from '@/components/site/ui'
import { SITE } from '@/lib/constants'

/*
 * /for-property-managers: the employee who persuades the principal.
 * Order: understood (their week) → the after → their numbers + the email → the three questions
 * → start small → form. Hero CTA goes to the numbers first, not a blind mailto.
 * Personal link: ?name=&agency=&doors=
 */

export const metadata: Metadata = {
  title: { absolute: 'Tenant Repairs for Adelaide Property Managers | Briks' },
  description:
    'Adelaide property managers: tenants call Briks for repairs, we book licensed trades and you get one Friday report. Work out the hours it saves you.',
  alternates: { canonical: '/for-property-managers' },
  robots: { index: true, follow: true },
}

const WEEK = [
  'A tenant rings about the dripping tap in the middle of an inspection.',
  'You find a trade, book access, then chase the trade when they go quiet.',
  'The tenant asks for an update. Then the owner does.',
  'You match the invoice to the job and file the photos, if there are any.',
] as const

const AFTER = [
  { title: 'Tenants ring Briks', body: 'One number for every repair. We work out how urgent it is and book the access.' },
  { title: 'We book the licensed trade', body: 'We book independent trades, each licensed for their work. You get the date, not the calls.' },
  { title: 'Over your limit, you decide', body: 'Jobs under your approval limit go ahead. Anything over it is quoted to you first.' },
  { title: 'Friday, one report', body: 'Every job that week, with before and after photos and one invoice each.' },
] as const

const PRINCIPAL_QS = [
  { q: 'What does it cost the agency?', a: `Nothing. Tenant calls and phone help are free. When a trade is sent, Briks adds a flat ${FEE.amount} maintenance desk fee to its invoice for that job, paid from the owner\u2019s rent like any contractor bill.` },
  { q: 'Do we lose control?', a: 'No. Your approval limit stands, your owners stay with your agency, and preferred trades can work through Briks.' },
  { q: 'What is the risk?', a: 'It is contained: your approval limit stands, your owners stay with your agency, it starts on one portfolio with no lock-in, and nothing in your software changes. You add Briks as a supplier and send one tenant list.' },
] as const

export default async function ForPropertyManagersPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams
  const name = cleanText(sp.name).split(' ')[0] ?? ''
  const agency = cleanText(sp.agency)
  const doors = cleanInt(sp.doors, 1, 5000)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE.url}/for-property-managers#webpage`,
        name: 'For property managers: hand tenant repairs to Briks',
        about: { '@id': `${SITE.url}/#maintenance-line` },
        audience: { '@type': 'Audience', audienceType: 'Property managers at real estate agencies' },
      },
      faqJsonLd(`${SITE.url}/for-property-managers#faq`, PRINCIPAL_QS),
    ],
  }

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* HERO: their week, said plainly */}
      <section aria-labelledby="hero-h" className="border-b border-[#e2ddd3] bg-[#fafaf7]">
        <div className={`${cls.wrap} ${cls.heroPad} grid items-end gap-12 lg:grid-cols-12`}>
          <div className="home-enter min-w-0 lg:col-span-7">
            <p className={cls.eyebrow}>{name ? `${name}, this one is for you` : 'For property managers'}</p>
            <h1 id="hero-h" className={`${cls.h1} mt-5`}>
              You didn&rsquo;t become a property manager to chase trades.
            </h1>
            <p className={`${cls.lead} mt-6 max-w-[36rem]`}>
              Tenants call Briks for every repair. We organise the licensed trade, book access and keep the tenant updated.
              You get one report on Friday and approve anything over your limit.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CtaLink href="#numbers">
                Work out your hours <Arrow />
              </CtaLink>
              <CtaLink href="#questions" variant="secondary">
                What your principal will ask
              </CtaLink>
            </div>
          </div>
          <div className="home-enter home-enter--late min-w-0 lg:col-span-4 lg:col-start-9">
            <Photo src="/stock/contact.jpg" alt="A hand holding a phone against a sandstone wall" ratio="aspect-[16/10]" className="mb-6" sizes="(min-width: 1024px) 380px, 100vw" />
            <h2 className="font-heading border-b border-[#1a1a1a] pb-3 text-[15px] font-bold uppercase tracking-[0.14em] text-[#1a1a1a]">
              Your week, today
            </h2>
            <DashList items={WEEK} />
          </div>
        </div>
      </section>

      {/* AFTER: steps beside a live example job */}
      <section aria-labelledby="after-h" className={ground.paper}>
        <div className={`${cls.wrap} ${cls.section} grid items-center gap-12 lg:grid-cols-12`}>
          <div className="lg:col-span-6">
            <SectionHead id="after-h" eyebrow="Your week with Briks" title="Calls go to Briks. The report comes to you." />
            <ol className="m-0 mt-8 list-none p-0">
              {AFTER.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 border-t border-[#e2ddd3] py-4">
                  <span className="font-ticker text-[15px] text-[#8a6e3f]">{String(i + 1).padStart(2, '0')}</span>
                  <span>
                    <span className="font-heading block text-[17px] font-bold text-[#1a1a1a]">{s.title}</span>
                    <span className="mt-1 block text-[15px] leading-relaxed text-[#3a3735]">{s.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-6">
            <JobTimeline />
          </div>
        </div>
      </section>

      {/* FREE HELP FIRST */}
      <section aria-labelledby="fix-h" className={ground.warm}>
        <div className={`${cls.wrap} ${cls.section}`}>
          <SectionHead id="fix-h" eyebrow="Fewer call-outs" title="Simple problems get sorted on the phone, free.">
            <p>Before anyone is sent, we walk tenants through the simple checks. Fewer call-outs, fewer bills for your owners, fewer questions for you.</p>
          </SectionHead>
          <div className="mt-10">
            <QuickFixes contactHref="#enquiry" contactLabel="Ask us how it works" />
          </div>
        </div>
      </section>

      {/* NUMBERS + EMAIL */}
      <section id="numbers" aria-labelledby="numbers-h" className={`scroll-mt-24 ${ground.soft}`}>
        <div className={`${cls.wrap} ${cls.section}`}>
          <SectionHead id="numbers-h" eyebrow="Your numbers, your email" title="Show your principal what repairs cost you.">
            <p>Put in your own figures. Underneath is an email to your principal that updates as you go. Copy it, or open it in your email.</p>
          </SectionHead>
          <div className="mt-10">
            <ChampionKit defaultDoors={doors ?? 200} defaultName={name} defaultAgency={agency} />
          </div>
        </div>
      </section>

      {/* PRINCIPAL QUESTIONS */}
      <section id="questions" aria-labelledby="questions-h" className={`scroll-mt-24 ${ground.paper}`}>
        <div className={`${cls.wrap} ${cls.section} grid gap-10 md:grid-cols-12`}>
          <div className="md:col-span-5">
            <SectionHead id="questions-h" eyebrow="Your principal will ask" title="Three questions, answered.">
              <p>These are the answers to have ready. They are also in the email.</p>
            </SectionHead>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <FactList items={PRINCIPAL_QS.map((x) => ({ k: x.q, v: x.a }))} />
          </div>
        </div>
      </section>

      {/* START */}
      <section aria-labelledby="start-h" className={ground.ink}>
        <div className={`${cls.wrap} ${cls.section} grid items-end gap-12 md:grid-cols-12`}>
          <div className="md:col-span-7">
            <SectionHead dark id="start-h" eyebrow="The ask" title="Let your portfolio be the one it starts on.">
              <p>Your agency adds Briks as a supplier and you send us your tenant list. We agree your approval limit, write the email to your tenants, and you judge it on four Friday reports. No lock-in contract.</p>
            </SectionHead>
          </div>
          <div className="flex flex-col gap-3 md:col-span-4 md:col-start-9">
            <CtaLink href="#numbers" variant="light">
              Get the email for your principal <Arrow />
            </CtaLink>
            <a href="#enquiry" className="font-heading inline-flex min-h-[48px] items-center justify-center rounded-sm border border-[#5a5650] px-6 text-[15px] font-semibold text-[#fafaf7] transition-colors duration-200 hover:border-[#fafaf7]">
              Ask us a question first
            </a>
          </div>
        </div>
      </section>

      {/* ENQUIRY */}
      <section id="enquiry" aria-labelledby="enq-h" className={`scroll-mt-24 ${ground.paper}`}>
        <div className={`${cls.wrap} ${cls.section} grid gap-12 md:grid-cols-12`}>
          <div className="md:col-span-5">
            <SectionHead id="enq-h" eyebrow="Questions" title="Ask before you take it to your principal.">
              <p>We reply by phone or email. Nothing is sent to your agency unless you ask us to.</p>
            </SectionHead>
            <div className="mt-8">
              <Faq
                items={[
                  { q: 'Will you contact my principal?', a: 'Only if you ask us to. You can send the email yourself, and we follow up once you reply.' },
                  { q: 'What do I have to do in the first month?', a: 'Send one email to your tenants with the Briks number. We write it. Then approve anything over your limit and read the Friday report.' },
                ]}
              />
            </div>
          </div>
          <div className="md:col-span-7">
            <LeadForm
              source="property-managers"
              submitLabel="Send my question"
              defaults={{ name, company: agency, doors: doors ? String(doors) : '' }}
              fields={[
                { name: 'name', label: 'Your name', autoComplete: 'name', required: true, half: true },
                { name: 'company', label: 'Agency', autoComplete: 'organization', required: true, half: true },
                { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', required: true, half: true },
                { name: 'phone', label: 'Mobile', type: 'tel', autoComplete: 'tel', required: true, half: true },
                { name: 'suburb', label: 'Office suburb', required: true, half: true },
                { name: 'doors', label: 'Doors you manage', half: true },
                { name: 'issue', label: 'Your question', type: 'textarea', required: true },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  )
}
