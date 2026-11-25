import type { Metadata } from 'next'
import Link from 'next/link'
import { cls, ground, JsonLd, CtaLink, Arrow } from '@/components/site/ui'
import QuickFixes from '@/components/site/QuickFixes'
import { FIXES } from '@/components/site/quickFixesData'
import { SITE, sitePhone, sitePhoneHref } from '@/lib/constants'

/**
 * Tenant-facing "check this first" page. Property managers link it in the tenant email.
 * Every check is safe for a non-trade to do; anything risky says stop and call.
 */

export const metadata: Metadata = {
  title: 'Check This First: Simple Home Fixes | Briks Adelaide',
  description:
    'Light out, power off, no hot water, blocked drain, beeping smoke alarm or a leak? Safe checks to try before calling a trade, and when to stop and call.',
  alternates: { canonical: '/help' },
}

export default function HelpPage() {
  const phone = sitePhone()
  const ld = {
    '@context': 'https://schema.org',
    '@graph': FIXES.map((f) => ({
      '@type': 'HowTo',
      '@id': `${SITE.url}/help#${f.id}`,
      name: `${f.label.replace('’', "'")}: what to check first`,
      step: f.checks.map((c, i) => ({ '@type': 'HowToStep', position: i + 1, text: c })),
    })),
  }
  return (
    <>
      <JsonLd data={ld} />
      <section className={`${ground.warm} ${cls.heroPad}`}>
        <div className={cls.wrap}>
          <p className={cls.eyebrow}>Check this first</p>
          <h1 className={`${cls.h1} mt-5 max-w-[15ch]`}>It might be a two-minute fix.</h1>
          <p className={`${cls.lead} mt-6 max-w-[60ch]`}>
            Try these safe checks before anyone is sent. If they don’t sort it, call us and we’ll organise a licensed trade. If anyone is in
            danger, call 000. Smell gas: call 1800 427 532. Power out in the street: SA Power Networks on 13 13 66.
          </p>
          {phone && (
            <div className="mt-8">
              <CtaLink href={sitePhoneHref()}>Still stuck? Call {phone}</CtaLink>
            </div>
          )}
        </div>
      </section>

      <section aria-label="Pick a problem" className={ground.paper}>
        <div className={`${cls.wrap} ${cls.section}`}>
          <QuickFixes contactHref={phone ? sitePhoneHref() : '/contact'} contactLabel={phone ? `Still not fixed? Call ${phone}` : 'Contact us'} />
        </div>
      </section>

      <section aria-labelledby="all-h" className={ground.soft}>
        <div className={`${cls.wrap} ${cls.section}`}>
          <h2 id="all-h" className={cls.h2}>All the checks, on one page.</h2>
          <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {FIXES.map((f) => (
              <section key={f.id} id={f.id} aria-labelledby={`${f.id}-h`} className="scroll-mt-28">
                <h3 id={`${f.id}-h`} className="font-heading text-[20px] font-semibold text-[#1a1a1a]">{f.label}</h3>
                <ol className="mt-3 space-y-2">
                  {f.checks.map((c, i) => (
                    <li key={c} className="grid grid-cols-[1.75rem_1fr] text-[16px] leading-[1.6] text-[#3a3735]">
                      <span className="font-heading font-semibold text-[#8a6e3f]">{i + 1}.</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ol>
                <p className="mt-3 bg-[#f3efe5] p-4 text-[15px] leading-[1.55] text-[#3a3735]">
                  <strong className="font-semibold text-[#1a1a1a]">When to stop: </strong>
                  {f.stop}
                </p>
              </section>
            ))}
          </div>
          <p className="mt-12 text-[15px] text-[#5a5650]">
            Renting? Your landlord or property manager is responsible for most repairs. See{' '}
            <Link href="/guides/who-pays-for-rental-repairs-sa" className={cls.textLink}>who pays for repairs in an SA rental</Link> and{' '}
            <Link href="/guides/urgent-repairs-rental-sa" className={cls.textLink}>what to do about urgent repairs</Link>.
          </p>
          <div className="mt-8">
            <CtaLink href="/services" variant="secondary">Every trade we organise <Arrow /></CtaLink>
          </div>
        </div>
      </section>
    </>
  )
}
