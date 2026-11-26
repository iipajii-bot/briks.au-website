import type { Metadata } from 'next'
import Link from 'next/link'
import { cls, ground } from '@/components/site/ui'
import { GUIDES } from '@/lib/guides'

export const metadata: Metadata = {
  title: 'Rental Repair Guides for SA Landlords and Agencies | Briks',
  description:
    'Plain guides on rental repairs in South Australia: who pays, urgent repairs, and in-house vs outsourced maintenance for agencies.',
  alternates: { canonical: '/guides' },
}

const EXTRA = [
  { href: '/help', title: 'Check this first: simple home fixes', kind: 'guide' },
] as const

export default function GuidesIndex() {
  const items = [
    ...GUIDES.map((g) => ({ href: `/${g.kind === 'compare' ? 'compare' : 'guides'}/${g.slug}`, title: g.h1, body: g.answer, kind: g.kind })),
    ...EXTRA.map((e) => ({ ...e, body: '' })),
  ]
  const groups = [
    { kind: 'guide', h: 'Guides' },
    { kind: 'compare', h: 'Comparisons' },
  ] as const
  return (
    <>
      <section className={`${ground.warm} ${cls.heroPad}`}>
        <div className={cls.wrap}>
          <p className={cls.eyebrow}>Guides</p>
          <h1 className={`${cls.h1} mt-5 max-w-[16ch]`}>Rental repairs, explained plainly.</h1>
          <p className={`${cls.lead} mt-6 max-w-[60ch]`}>
            For Adelaide landlords, property managers, agency principals and tenants. South Australian rules are taken from SA Government
            guidance and linked on each page.
          </p>
        </div>
      </section>
      {groups.map((gr) => (
        <section key={gr.kind} aria-labelledby={`${gr.kind}-h`} className={gr.kind === 'guide' ? ground.paper : ground.soft}>
          <div className={`${cls.wrap} ${cls.section}`}>
            <h2 id={`${gr.kind}-h`} className={cls.h2}>{gr.h}</h2>
            <ul className="mt-8 border-t border-[#e2ddd3]">
              {items
                .filter((i) => i.kind === gr.kind)
                .map((i) => (
                  <li key={i.href} className="border-b border-[#e2ddd3]">
                    <Link href={i.href} className="group block py-5">
                      <span className="font-heading text-[19px] font-semibold text-[#1a1a1a] group-hover:text-[#6a5530]">{i.title}</span>
                      {i.body && <span className="mt-1.5 block max-w-[75ch] text-[15px] leading-[1.6] text-[#5a5650]">{i.body}</span>}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </section>
      ))}
    </>
  )
}
