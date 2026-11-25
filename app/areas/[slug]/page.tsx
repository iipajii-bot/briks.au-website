import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SUBURB_CONTENT, getSuburb } from '@/lib/suburb-content'
import { getSuburbPage } from '@/lib/suburb-pages'
import { TRADES } from '@/lib/trades'
import { SITE, sitePhone, sitePhoneHref } from '@/lib/constants'
import { cls, ground, Faq, JsonLd, CtaLink, Arrow, faqJsonLd } from '@/components/site/ui'

/**
 * Suburb pages. Every block of copy comes from lib/suburb-pages.json, which is unique per suburb.
 * The only shared parts are navigation, the full trade list and the call to action.
 */

type Params = Promise<{ slug: string }>

export const dynamicParams = false

export async function generateStaticParams() {
  return SUBURB_CONTENT.filter((s) => getSuburbPage(s.slug)).map((s) => ({ slug: s.slug }))
}

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const { slug } = await props.params
  const s = getSuburb(slug)
  const p = getSuburbPage(slug)
  if (!s || !p) return {}
  return {
    title: p.seoTitle,
    description: p.metaDescription,
    alternates: { canonical: `/areas/${s.slug}` },
    openGraph: { title: p.seoTitle, description: p.metaDescription, url: `${SITE.url}/areas/${s.slug}` },
  }
}

const tradeName = (slug: string) => TRADES.find((t) => t.slug === slug)?.name ?? slug

export default async function SuburbPage(props: { params: Params }) {
  const { slug } = await props.params
  const s = getSuburb(slug)
  const p = getSuburbPage(slug)
  if (!s || !p) notFound()
  const phone = sitePhone()
  const url = `${SITE.url}/areas/${s.slug}`
  const place = `${s.name} SA${s.postcode ? ` ${s.postcode}` : ''}`

  const nearby = s.nearby
    .map((n) => SUBURB_CONTENT.find((x) => x.slug === n))
    .filter((x): x is NonNullable<typeof x> => Boolean(x && getSuburbPage(x.slug)))

  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: `Repairs and maintenance in ${s.name}`,
        serviceType: 'Repair and maintenance coordination',
        provider: { '@id': `${SITE.url}/#organization` },
        areaServed: { '@type': 'Place', name: place, address: { '@type': 'PostalAddress', addressLocality: s.name, addressRegion: 'SA', ...(s.postcode ? { postalCode: s.postcode } : {}), addressCountry: 'AU' } },
        description: p.metaDescription,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
          { '@type': 'ListItem', position: 2, name: 'Service areas', item: `${SITE.url}/areas` },
          { '@type': 'ListItem', position: 3, name: s.name, item: url },
        ],
      },
      faqJsonLd(`${url}#faq`, p.faqs),
    ],
  }

  return (
    <>
      <JsonLd data={ld} />

      <section className={`${ground.warm} ${cls.heroPad}`}>
        <div className={cls.wrap}>
          <nav aria-label="Breadcrumb" className="text-[13px] text-[#5a5650]">
            <Link href="/areas" className="hover:text-[#1a1a1a]">Service areas</Link> <span aria-hidden>/</span> {s.region}
          </nav>
          <p className={`${cls.eyebrow} mt-6`}>{place}</p>
          <h1 className="font-display mt-4 max-w-[20ch] text-[clamp(36px,5.4vw,66px)] font-bold leading-[1] text-[#1a1a1a] [text-wrap:balance]">{p.h1}</h1>
          <p className={`${cls.lead} mt-6 max-w-[62ch]`}>{p.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaLink href="/contact">Tell us the job <Arrow /></CtaLink>
            {phone && <CtaLink href={sitePhoneHref()} variant="secondary">Call {phone}</CtaLink>}
          </div>
        </div>
      </section>

      <section aria-labelledby="homes-h" className={ground.paper}>
        <div className={`${cls.wrap} ${cls.section} grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16`}>
          <div>
            <p className={cls.eyebrow}>The houses</p>
            <h2 id="homes-h" className={`${cls.h2} mt-4`}>What {s.name} homes need.</h2>
            <p className={`${cls.body} mt-5`}>{p.housing}</p>
          </div>
          <ol className="border-t border-[#e2ddd3]">
            {p.issues.map((i, n) => (
              <li key={i.title} className="grid grid-cols-[2.5rem_1fr] border-b border-[#e2ddd3] py-5">
                <span className="font-heading text-[15px] font-semibold text-[#8a6e3f]">{String(n + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-heading text-[18px] font-semibold text-[#1a1a1a]">{i.title}</h3>
                  <p className="mt-1.5 text-[16px] leading-[1.6] text-[#3a3735]">{i.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="trades-h" className={ground.soft}>
        <div className={`${cls.wrap} ${cls.section}`}>
          <p className={cls.eyebrow}>Trades in {s.name}</p>
          <h2 id="trades-h" className={`${cls.h2} mt-4 max-w-[22ch]`}>The trades these houses call for.</h2>
          <ul className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {p.trades.map((t) => (
              <li key={t.slug}>
                <Link href={`/services/${t.slug}`} className="font-heading inline-flex items-center gap-2 text-[18px] font-semibold text-[#1a1a1a] hover:text-[#6a5530]">
                  {tradeName(t.slug)} in {s.name} <Arrow />
                </Link>
                <p className="mt-1.5 text-[16px] leading-[1.6] text-[#3a3735]">{t.note}</p>
              </li>
            ))}
          </ul>
          <div className="mt-12 border-t border-[#e2ddd3] pt-6">
            <p className="text-[14px] text-[#5a5650]">
              Every trade in {s.name}, each done by an independent trade licensed in South Australia:
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {TRADES.map((t) => (
                <li key={t.slug}>
                  <Link href={`/services/${t.slug}`} className="inline-flex min-h-[40px] items-center border border-[#d9d3c7] bg-white px-3 text-[14px] text-[#1a1a1a] hover:border-[#1a1a1a]">
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="rent-h" className={ground.paper}>
        <div className={`${cls.wrap} ${cls.section} grid gap-8 lg:grid-cols-[5fr_7fr] lg:gap-16`}>
          <div>
            <p className={cls.eyebrow}>Rentals in {s.name}</p>
            <h2 id="rent-h" className={`${cls.h2} mt-4`}>For landlords and property managers.</h2>
          </div>
          <div>
            <p className={cls.body}>{p.rentals}</p>
            <p className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
              <Link href="/for-landlords" className={cls.textLink}>Self-managing landlords</Link>
              <Link href="/for-property-managers" className={cls.textLink}>Property managers</Link>
              <Link href="/help" className={cls.textLink}>Tenant checklist</Link>
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-h" className={ground.soft}>
        <div className={`${cls.wrap} ${cls.section} grid gap-8 lg:grid-cols-[5fr_7fr] lg:gap-16`}>
          <div>
            <p className={cls.eyebrow}>Questions</p>
            <h2 id="faq-h" className={`${cls.h2} mt-4`}>Asked about {s.name}.</h2>
            <p className="mt-5 text-[15px] text-[#5a5650]">
              Emergencies: if anyone is in danger call 000. Gas smell: 1800 427 532. Power faults: SA Power Networks 13 13 66.
            </p>
          </div>
          <Faq items={p.faqs} />
        </div>
      </section>

      {nearby.length > 0 && (
        <section aria-labelledby="near-h" className={ground.paper}>
          <div className={`${cls.wrap} py-12`}>
            <h2 id="near-h" className={cls.eyebrow}>Nearby</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {nearby.map((n) => (
                <li key={n.slug}>
                  <Link href={`/areas/${n.slug}`} className="inline-flex min-h-[44px] items-center gap-2 border border-[#d9d3c7] bg-[#fafaf7] px-4 text-[15px] font-medium text-[#1a1a1a] hover:border-[#1a1a1a]">
                    {n.name} <Arrow />
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/areas" className="inline-flex min-h-[44px] items-center px-4 text-[15px] text-[#5a5650] underline underline-offset-4">
                  All service areas
                </Link>
              </li>
            </ul>
          </div>
        </section>
      )}

      <section className={ground.ink}>
        <div className={`${cls.wrap} ${cls.section} flex flex-col items-start justify-between gap-6 md:flex-row md:items-center`}>
          <h2 className="font-display max-w-[20ch] text-[clamp(28px,3.6vw,44px)] font-bold leading-[1.05] text-[#fafaf7]">
            Got a job in {s.name}? Tell us what it is.
          </h2>
          <div className="flex flex-wrap gap-3">
            <CtaLink href="/contact" variant="light">Get a written quote <Arrow /></CtaLink>
            {phone && (
              <a href={sitePhoneHref()} className="font-heading inline-flex min-h-[48px] items-center px-2 text-[15px] font-semibold text-[#fafaf7] underline underline-offset-4">
                Call {phone}
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
