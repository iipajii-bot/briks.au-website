import type { Metadata } from 'next'
import Link from 'next/link'
import { cls, ground, SectionHead, JsonLd, CtaLink, Arrow } from '@/components/site/ui'
import { Photo } from '@/components/site/TradeStrip'
import { SITE, sitePhone, sitePhoneHref } from '@/lib/constants'

/**
 * /services hub. Links every trade page and the bigger-job pages so they are
 * reachable in two clicks from the nav and crawlable in plain HTML.
 */

export const metadata: Metadata = {
  title: 'Repair and Maintenance Services in Adelaide | Briks',
  description:
    'Every trade Briks organises in Adelaide: plumbing, electrical, carpentry, painting, tiling, roofing, gutters, gas, air-con and handyman work.',
  alternates: { canonical: '/services' },
}

const TRADES = [
  { slug: 'plumbing', name: 'Plumbing', img: '/stock/plumbing.jpg', body: 'Leaking taps, blocked drains, hot water, toilets and leaks under tiles. Done by a plumber licensed in South Australia.' },
  { slug: 'electrical', name: 'Electrical', img: '/stock/electrical.jpg', body: 'Power points, lights, safety switches, switchboards and smoke alarms. Done by a licensed electrician.' },
  { slug: 'carpentry', name: 'Carpentry', img: '/stock/carpentry.jpg', body: 'Doors that stick, locks, skirting, decks, verandah timber and built-ins.' },
  { slug: 'painting', name: 'Painting', img: '/stock/painting.jpg', body: 'Patch and paint between tenants, single rooms, whole interiors and exteriors.' },
  { slug: 'tiling', name: 'Tiling', img: '/stock/tiling.jpg', body: 'Cracked or loose tiles, regrouting, and bathroom and kitchen tiling.' },
  { slug: 'roofing', name: 'Roofing', img: '/stock/roofing.jpg', body: 'Roof leaks, cracked or slipped tiles, rusted iron and flashings.' },
  { slug: 'gutters', name: 'Gutters', img: '/stock/roofing.jpg', body: 'Gutter cleaning, overflowing or sagging gutters, downpipes and fascia.' },
  { slug: 'gas', name: 'Gas', img: '/stock/plumbing.jpg', body: 'Gas hot water, cooktops and heaters, connected by a licensed gas fitter.' },
  { slug: 'hvac', name: 'Air-con and heating', img: '/stock/electrical.jpg', body: 'Split systems and ducted air-con that stop cooling or heating, and servicing.' },
  { slug: 'handyman', name: 'Handyman', img: '/stock/carpentry.jpg', body: 'Small jobs bundled into one visit: hanging, fixing, adjusting and patching.' },
] as const

const BIGGER = [
  { href: '/maintenance', name: 'Property maintenance', body: 'Repairs and upkeep for homes and rentals, one invoice per job.' },
  { href: '/services/end-of-lease', name: 'End of lease repairs', body: 'Patch, paint and fix between tenants.' },
  { href: '/renovations', name: 'Renovations', body: 'Bathrooms, kitchens and bigger jobs, quoted in writing first.' },
  { href: '/emergency', name: 'Urgent repairs', body: 'What to do first, who to call, and how we organise the repair.' },
  { href: '/handyman', name: 'Handyman jobs', body: 'Lists of small jobs done in one visit.' },
  { href: '/services/pre-buy-inspection', name: 'Pre-purchase inspections', body: 'A building check before you buy.' },
  { href: '/services/preventative-maintenance', name: 'Preventative maintenance', body: 'Regular checks that catch small problems early.' },
  { href: '/services/renovations', name: 'Renovation projects', body: 'How a multi-trade renovation is run.' },
] as const

export default function ServicesPage() {
  const phone = sitePhone()
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Services Briks organises in Adelaide',
    itemListElement: TRADES.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, url: `${SITE.url}/services/${t.slug}` })),
  }
  return (
    <>
      <JsonLd data={ld} />
      <section className={`${ground.warm} ${cls.heroPad}`}>
        <div className={cls.wrap}>
          <p className={cls.eyebrow}>Services · Adelaide</p>
          <h1 className={`${cls.h1} mt-5 max-w-[16ch]`}>Every trade a house needs, through one number.</h1>
          <p className={`${cls.lead} mt-6 max-w-[60ch]`}>
            Briks organises the work. Independent trades, each licensed in South Australia for their own work, do it. You get a
            written quote or your approval limit first, then before and after photos and one invoice.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaLink href="/contact">Tell us the job <Arrow /></CtaLink>
            {phone && <CtaLink href={sitePhoneHref()} variant="secondary">Call {phone}</CtaLink>}
          </div>
        </div>
      </section>

      <section aria-labelledby="trades-h" className={ground.paper}>
        <div className={`${cls.wrap} ${cls.section}`}>
          <SectionHead id="trades-h" eyebrow="Trades" title="Pick the trade." />
          <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {TRADES.map((t) => (
              <li key={t.slug}>
                <Link href={`/services/${t.slug}`} className="group block">
                  <Photo src={t.img} alt="" ratio="aspect-[16/10]" sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" />
                  <h3 className="font-heading mt-4 flex items-center gap-2 text-[19px] font-semibold text-[#1a1a1a] group-hover:text-[#6a5530]">
                    {t.name} <Arrow />
                  </h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-[#5a5650]">{t.body}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="bigger-h" className={ground.soft}>
        <div className={`${cls.wrap} ${cls.section}`}>
          <SectionHead id="bigger-h" eyebrow="Bigger jobs and help" title="More than one trade, or not sure which." />
          <ul className="mt-10 grid border-t border-[#e2ddd3] sm:grid-cols-2 lg:grid-cols-3">
            {BIGGER.map((b) => (
              <li key={b.href} className="border-b border-[#e2ddd3] sm:odd:border-r lg:border-r lg:[&:nth-child(3n)]:border-r-0">
                <Link href={b.href} className="block p-5 hover:bg-white">
                  <span className="font-heading text-[17px] font-semibold text-[#1a1a1a]">{b.name}</span>
                  <span className="mt-1 block text-[15px] text-[#5a5650]">{b.body}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[15px] text-[#5a5650]">
            Simple problem? Try the <Link href="/help" className={cls.textLink}>check-this-first guide</Link> before anyone is sent. Renting or
            managing rentals? See <Link href="/for-landlords" className={cls.textLink}>landlords</Link> and{' '}
            <Link href="/for-property-managers" className={cls.textLink}>property managers</Link>.
          </p>
        </div>
      </section>
    </>
  )
}
