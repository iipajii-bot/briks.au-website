import Link from 'next/link'
import { cls, ground, Faq, JsonLd, CtaLink, Arrow, faqJsonLd } from '@/components/site/ui'
import { SITE, sitePhone, sitePhoneHref } from '@/lib/constants'
import type { Guide, Block } from '@/lib/guides'

function fmtDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
}

function BlockView({ b }: { b: Block }) {
  switch (b.t) {
    case 'p':
      return <p className="mt-4 text-[17px] leading-[1.7] text-[#3a3735]">{b.text}</p>
    case 'list':
      return (
        <ul className="mt-4 space-y-2.5">
          {b.items.map((i) => (
            <li key={i} className="flex gap-3 text-[17px] leading-[1.6] text-[#3a3735]">
              <span aria-hidden className="mt-[11px] h-px w-3 shrink-0 bg-[#8a6e3f]" />
              <span>{i}</span>
            </li>
          ))}
        </ul>
      )
    case 'steps':
      return (
        <ol className="mt-5 space-y-4">
          {b.items.map((i, n) => (
            <li key={i.title} className="grid grid-cols-[2.25rem_1fr] gap-x-3">
              <span className="font-heading text-[15px] font-semibold text-[#8a6e3f]">{String(n + 1).padStart(2, '0')}</span>
              <div>
                <p className="font-heading text-[17px] font-semibold text-[#1a1a1a]">{i.title}</p>
                <p className="mt-1 text-[16px] leading-[1.6] text-[#3a3735]">{i.body}</p>
              </div>
            </li>
          ))}
        </ol>
      )
    case 'table':
      return (
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left text-[15px]">
            <thead>
              <tr className="border-b border-[#1a1a1a]">
                {b.head.map((h) => (
                  <th key={h} scope="col" className="font-heading py-3 pr-4 font-semibold text-[#1a1a1a]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r) => (
                <tr key={r[0]} className="border-b border-[#e2ddd3] align-top">
                  {r.map((c, i) =>
                    i === 0 ? (
                      <th key={i} scope="row" className="font-heading py-3 pr-4 font-semibold text-[#1a1a1a]">
                        {c}
                      </th>
                    ) : (
                      <td key={i} className="py-3 pr-4 leading-[1.55] text-[#3a3735]">
                        {c}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case 'note':
      return (
        <div className="mt-5 bg-[#f3efe5] p-5 text-[16px] leading-[1.6] text-[#3a3735]">
          {b.title && <p className="font-heading mb-1 font-semibold text-[#1a1a1a]">{b.title}</p>}
          {b.text}
        </div>
      )
  }
}

export default function GuideArticle({ g, path }: { g: Guide; path: string }) {
  const url = `${SITE.url}${path}`
  const phone = sitePhone()
  const section = g.kind === 'compare' ? { name: 'Comparisons', href: '/guides' } : { name: 'Guides', href: '/guides' }
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: g.h1,
        description: g.description,
        datePublished: g.published,
        dateModified: g.updated,
        author: { '@id': `${SITE.url}/#organization` },
        publisher: { '@id': `${SITE.url}/#organization` },
        mainEntityOfPage: url,
        image: `${SITE.url}/og.png`,
        inLanguage: 'en-AU',
        ...(g.sources.length ? { citation: g.sources.map((s) => s.url) } : {}),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
          { '@type': 'ListItem', position: 2, name: section.name, item: `${SITE.url}${section.href}` },
          { '@type': 'ListItem', position: 3, name: g.h1, item: url },
        ],
      },
      ...(g.faqs.length ? [faqJsonLd(`${url}#faq`, g.faqs)] : []),
    ],
  }

  return (
    <>
      <JsonLd data={ld} />
      <article>
        <header className={`${ground.warm} ${cls.heroPad}`}>
          <div className={cls.wrap}>
            <nav aria-label="Breadcrumb" className="text-[13px] text-[#5a5650]">
              <Link href="/" className="hover:text-[#1a1a1a]">Home</Link> <span aria-hidden>/</span>{' '}
              <Link href={section.href} className="hover:text-[#1a1a1a]">{section.name}</Link>
            </nav>
            <p className={`${cls.eyebrow} mt-6`}>{g.eyebrow}</p>
            <h1 className="font-display mt-4 max-w-[22ch] text-[clamp(34px,5vw,60px)] font-bold leading-[1.02] text-[#1a1a1a] [text-wrap:balance]">
              {g.h1}
            </h1>
            <p className="mt-6 max-w-[62ch] text-[19px] leading-[1.6] text-[#1a1a1a]" data-speakable>
              {g.answer}
            </p>
            <p className="mt-6 text-[13px] text-[#5a5650]">
              By Briks Building Services, Adelaide · Updated <time dateTime={g.updated}>{fmtDate(g.updated)}</time>
            </p>
          </div>
        </header>

        <div className={`${ground.paper}`}>
          <div className={`${cls.wrap} py-12 md:py-16`}>
            <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
              <div className="max-w-[70ch]">
                {g.sections.map((s) => (
                  <section key={s.h} className="mt-10 first:mt-0">
                    <h2 className="font-display text-[clamp(24px,3vw,32px)] font-bold leading-[1.1] text-[#1a1a1a]">{s.h}</h2>
                    {s.blocks.map((b, i) => (
                      <BlockView key={i} b={b} />
                    ))}
                  </section>
                ))}

                {g.faqs.length > 0 && (
                  <section className="mt-14">
                    <h2 className="font-display mb-4 text-[clamp(24px,3vw,32px)] font-bold leading-[1.1] text-[#1a1a1a]">Common questions</h2>
                    <Faq items={g.faqs} />
                  </section>
                )}

                {g.sources.length > 0 && (
                  <section className="mt-12 border-t border-[#e2ddd3] pt-6">
                    <h2 className="font-heading text-[15px] font-semibold text-[#1a1a1a]">Sources</h2>
                    <ul className="mt-3 space-y-2 text-[14px] text-[#5a5650]">
                      {g.sources.map((s) => (
                        <li key={s.url}>
                          <a href={s.url} rel="noopener" className={cls.textLink}>{s.label}</a>
                          {s.note ? ` (${s.note})` : ''}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-[13px] text-[#5a5650]">
                      This is general information, not legal advice. For your own tenancy, check with CBS Tenancies on 131 882.
                    </p>
                  </section>
                )}
              </div>

              <aside className="lg:sticky lg:top-28 lg:self-start">
                <div className="bg-[#1a1a1a] p-6 text-[#fafaf7]">
                  <p className="font-heading text-[18px] font-semibold">{g.cta.title}</p>
                  <p className="mt-2 text-[15px] leading-[1.55] text-[#d8d2c6]">{g.cta.body}</p>
                  <div className="mt-5 flex flex-col gap-2">
                    <CtaLink href={g.cta.href} variant="light">
                      {g.cta.label} <Arrow />
                    </CtaLink>
                    {phone && (
                      <a href={sitePhoneHref()} className="font-heading py-2 text-center text-[15px] font-semibold text-[#fafaf7] underline underline-offset-4">
                        Call {phone}
                      </a>
                    )}
                  </div>
                </div>
                {g.related.length > 0 && (
                  <div className="mt-8">
                    <p className={cls.eyebrow}>Related</p>
                    <ul className="mt-3 border-t border-[#e2ddd3]">
                      {g.related.map((r) => (
                        <li key={r.href} className="border-b border-[#e2ddd3]">
                          <Link href={r.href} className="block py-3 text-[15px] font-medium text-[#1a1a1a] hover:text-[#6a5530]">
                            {r.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
