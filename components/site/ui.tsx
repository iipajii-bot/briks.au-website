/**
 * Shared marketing-page primitives (homepage + segment landing pages).
 * Briks design system: paper/brass, Bricolage display, Inter Tight labels, Inter body, 4px corners.
 */
import Link from 'next/link'
import type { ReactNode } from 'react'

export const cls = {
  wrap: 'mx-auto w-full max-w-[1200px] px-5 sm:px-8',
  eyebrow: 'eyebrow',
  h1: 'font-display text-[clamp(40px,6.2vw,76px)] font-bold leading-[0.98] text-[#1a1a1a] [text-wrap:balance]',
  h2: 'font-display text-[clamp(30px,4vw,48px)] font-bold leading-[1.04] text-[#1a1a1a] [text-wrap:balance]',
  lead: 'text-[18px] leading-[1.6] text-[#3a3735]',
  body: 'text-[16px] leading-relaxed text-[#3a3735]',
  btnPrimary:
    'font-heading inline-flex min-h-[48px] items-center justify-center gap-2 rounded-sm bg-[#1a1a1a] px-6 text-[15px] font-semibold text-[#fafaf7] transition-colors duration-200 hover:bg-[#6a5530] active:translate-y-px',
  btnSecondary:
    'font-heading inline-flex min-h-[48px] items-center justify-center gap-2 rounded-sm border border-[#c0bcb4] bg-white px-6 text-[15px] font-semibold text-[#1a1a1a] transition-colors duration-200 hover:border-[#1a1a1a] active:translate-y-px',
  btnLight:
    'font-heading inline-flex min-h-[48px] items-center justify-center gap-2 rounded-sm bg-[#fafaf7] px-6 text-[15px] font-semibold text-[#1a1a1a] transition-colors duration-200 hover:bg-[#ebe4d4] active:translate-y-px',
  textLink:
    'font-medium text-[#1a1a1a] underline decoration-[#c0bcb4] underline-offset-4 hover:decoration-[#8a6e3f]',
  /** Hero top padding clears the floating navbar. */
  heroPad: 'pb-16 pt-32 md:pb-20 md:pt-36 lg:pb-24 lg:pt-36',
  section: 'py-14 md:py-20',
} as const

/** Section grounds, in the order pages alternate them. */
export const ground = {
  paper: 'bg-white',
  soft: 'border-t border-[#e2ddd3] bg-[#fafaf7]',
  warm: 'bg-[#f3efe5]',
  ink: 'bg-[#1a1a1a] text-[#fafaf7]',
} as const

export function Arrow() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
    </svg>
  )
}

export function SectionHead({
  id,
  eyebrow,
  title,
  children,
  dark = false,
  className = '',
}: {
  id: string
  eyebrow: string
  title: ReactNode
  children?: ReactNode
  dark?: boolean
  className?: string
}) {
  return (
    <div className={`max-w-[44rem] ${className}`}>
      <p className={dark ? 'eyebrow text-[#b89868]!' : cls.eyebrow}>
        {eyebrow}
      </p>
      <h2 id={id} className={`${cls.h2} mt-4 ${dark ? '!text-[#fafaf7]' : ''}`}>
        {title}
      </h2>
      {children ? (
        <div className={`mt-6 text-[17px] leading-relaxed ${dark ? 'text-[#d6d0c4]' : 'text-[#3a3735]'}`}>{children}</div>
      ) : null}
    </div>
  )
}

/** Label/value rows with hairlines: facts, pricing, terms. */
export function FactList({ items, wide = false }: { items: ReadonlyArray<{ k: string; v: ReactNode }>; wide?: boolean }) {
  return (
    <dl className="m-0">
      {items.map((it) => (
        <div
          key={it.k}
          className={`grid gap-1 border-t border-[#e2ddd3] py-5 last:border-b ${wide ? 'sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-6' : ''}`}
        >
          <dt className="font-heading text-[15px] font-semibold text-[#1a1a1a]">{it.k}</dt>
          <dd className="m-0 text-[15px] leading-relaxed text-[#3a3735]">{it.v}</dd>
        </div>
      ))}
    </dl>
  )
}

/** A real sequence, numbered. */
export function Steps({ steps, cols = 4 }: { steps: ReadonlyArray<{ title: string; body: string }>; cols?: 3 | 4 | 5 }) {
  const grid = cols === 5 ? 'md:grid-cols-5' : cols === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4'
  return (
    <ol className={`m-0 mt-12 grid list-none gap-0 p-0 md:gap-6 ${grid}`}>
      {steps.map((s, i) => (
        <li key={s.title} className="border-t-2 border-[#1a1a1a] py-5 md:py-6">
          <span className="font-ticker text-[15px] text-[#8a6e3f]">{String(i + 1).padStart(2, '0')}</span>
          <h3 className="font-heading mt-3 text-[18px] font-bold leading-snug text-[#1a1a1a]">{s.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-[#3a3735]">{s.body}</p>
        </li>
      ))}
    </ol>
  )
}

/** Bulleted list with brass dashes and hairlines. */
export function DashList({ items }: { items: ReadonlyArray<ReactNode> }) {
  return (
    <ul className="m-0 list-none p-0">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3 border-b border-[#e2ddd3] py-4 text-[16px] leading-relaxed text-[#3a3735]">
          <span aria-hidden="true" className="mt-[11px] h-[2px] w-3 shrink-0 bg-[#8a6e3f]" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}

/** Native details FAQ. Pair with FAQPage JSON-LD built from the same array. */
export function Faq({ items }: { items: ReadonlyArray<{ q: string; a: string }> }) {
  return (
    <div>
      {items.map((f) => (
        <details key={f.q} className="group border-t border-[#e2ddd3] last:border-b">
          <summary className="font-heading flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-6 py-4 text-[17px] font-semibold text-[#1a1a1a] [&::-webkit-details-marker]:hidden">
            {f.q}
            <span aria-hidden="true" className="text-[22px] font-normal text-[#8a6e3f] transition-transform duration-200 group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="m-0 max-w-[40rem] pb-6 text-[16px] leading-relaxed text-[#3a3735]">{f.a}</p>
        </details>
      ))}
    </div>
  )
}

export function faqJsonLd(id: string, items: ReadonlyArray<{ q: string; a: string }>) {
  return {
    '@type': 'FAQPage',
    '@id': id,
    mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}

export function CtaLink({ href, children, variant = 'primary' }: { href: string; children: ReactNode; variant?: 'primary' | 'secondary' | 'light' }) {
  const c = variant === 'secondary' ? cls.btnSecondary : variant === 'light' ? cls.btnLight : cls.btnPrimary
  const external = href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('#')
  return external ? (
    <a href={href} className={c}>
      {children}
    </a>
  ) : (
    <Link href={href} className={c}>
      {children}
    </Link>
  )
}
