import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowLeft,
  Check,
  X,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'
import PageHero from '@/components/sections/PageHero'
import MovingBorder from '@/components/effects/MovingBorder'
import FAQAccordion from '@/components/sections/FAQAccordion'
import { CASE_STUDIES } from '@/lib/case-studies'
import { TRADES, type Trade } from '@/lib/trades'
import { IMAGES, type ImageKey } from '@/lib/images'
import { SITE, whatsappHref } from '@/lib/constants'

/**
 * Map trade slug → image key. Only slugs with a matching image render the
 * hero image band; missing slugs skip silently (gas, hvac, gutters fall back
 * to text-only hero).
 */
const TRADE_IMAGE: Record<string, ImageKey | undefined> = {
  plumbing: 'plumbing',
  electrical: 'electrical',
  carpentry: 'carpentry',
  painting: 'painting',
  tiling: 'tiling',
  roofing: 'roofing',
  gutters: 'roofing', // visually close — ridge-and-roofline shot reads as gutters too
  handyman: 'handyman',
  // gas: no asset
  // hvac: no asset
}

/**
 * TradePage — full /services/[slug] rendering for one trade.
 * Server component. Pulls schema, body copy, FAQs, related trades, related cases.
 */
export default function TradePage({ trade }: { trade: Trade }) {
  const related = trade.relatedTrades
    .map((slug) => TRADES.find((t) => t.slug === slug))
    .filter((t): t is Trade => Boolean(t))

  const relatedCases = CASE_STUDIES.filter((c) =>
    (c.trades ?? []).some((t) => t.toLowerCase() === trade.name.split(' ')[0].toLowerCase())
  ).slice(0, 3)

  const imageKey = TRADE_IMAGE[trade.slug]
  const heroImage = imageKey ? IMAGES[imageKey] : null

  return (
    <>
      <PageHero
        eyebrow={trade.hero.eyebrow}
        title={
          <>
            {trade.hero.headline}{' '}
            <span className="text-[#8a6e3f]">{trade.hero.headlineAccent}</span>
          </>
        }
        subtitle={<>{trade.hero.subhead}</>}
      />

      {/* Trade image band — skipped where no asset exists */}
      {heroImage && (
        <section
          aria-hidden
          className="relative bg-[#fafaf7] border-b border-[#e2ddd3]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-md overflow-hidden border border-[#e2ddd3]">
              <Image
                src={heroImage}
                alt={`${trade.name} — Adelaide`}
                fill
                priority
                sizes="(min-width: 1280px) 1280px, 100vw"
                className="object-cover"
              />
              {/* Subtle bottom-fade for tonal continuity into next section */}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#fafaf7]/40 to-transparent"
              />
            </div>
          </div>
        </section>
      )}

      {/* Common jobs */}
      <section className="relative py-20 md:py-28 bg-[#ffffff]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">
                Common jobs
              </p>
              <h2
                className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]"
                style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
              >
                What we handle.
              </h2>
              <p className="mt-5 text-[#3a3735] text-base md:text-[17px] leading-relaxed max-w-md">
                Most {trade.name.toLowerCase()} calls fall into the categories
                below. Yours doesn&rsquo;t fit? Send a photo via WhatsApp — we&rsquo;ll
                tell you straight whether it&rsquo;s our job or someone else&rsquo;s.
              </p>
            </div>
            <div className="lg:col-span-7">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {trade.commonJobs.map((job) => (
                  <li
                    key={job}
                    className="flex items-start gap-3 bg-[#fafaf7] border border-[#e2ddd3] rounded-md p-4"
                  >
                    <Check
                      size={14}
                      className="text-[#8a6e3f] shrink-0 mt-1"
                      aria-hidden
                    />
                    <span className="text-sm text-[#3a3735] leading-relaxed">
                      {job}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What's involved — numbered steps, easier to scan than prose */}
      <section className="relative py-20 md:py-28 bg-[#fafaf7] border-y border-[#e2ddd3]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10 md:mb-12">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">
              What&rsquo;s involved
            </p>
            <h2
              className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]"
              style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
            >
              How a Briks {trade.noun.toLowerCase()} job actually runs.
            </h2>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {trade.whatsInvolved.map((p, i) => (
              <li
                key={i}
                className="relative bg-white border border-[#e2ddd3] rounded-md p-6 md:p-7"
              >
                <div className="flex items-baseline gap-3 mb-3">
                  <span
                    className="text-[#8a6e3f] text-2xl tabular-nums tracking-[-0.02em]"
                    style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    aria-hidden
                    className="flex-1 h-px bg-gradient-to-r from-[#8a6e3f]/40 to-transparent"
                  />
                </div>
                <p className="text-[#3a3735] text-sm md:text-[15px] leading-[1.65]">
                  {p}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Standards */}
      <section className="relative py-20 md:py-28 bg-[#ffffff]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12 md:mb-14">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">
              Standards + compliance
            </p>
            <h2
              className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]"
              style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
            >
              The non-negotiables.
            </h2>
            <p className="mt-5 text-[#3a3735] text-base md:text-[17px] leading-relaxed max-w-xl">
              The licenses, standards, and paperwork every Briks-coordinated{' '}
              {trade.name.toLowerCase()} job clears before, during, and after
              the work.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {trade.standards.map((s) => (
              <div
                key={s.label}
                className="bg-[#fafaf7] border border-[#e2ddd3] rounded-md p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-[#e2ddd3] bg-white mb-5">
                  <ShieldCheck size={16} className="text-[#8a6e3f]" aria-hidden />
                </div>
                <h3
                  className="text-[#1a1a1a] text-lg tracking-[-0.01em] mb-2"
                  style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
                >
                  {s.label}
                </h3>
                <p className="text-[#3a3735] text-sm leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When to call vs DIY */}
      <section className="relative py-20 md:py-28 bg-[#fafaf7] border-y border-[#e2ddd3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">
              Honest carve-out
            </p>
            <h2
              className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]"
              style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
            >
              Call us — or don&rsquo;t.
            </h2>
            <p className="mt-5 text-[#3a3735] text-base md:text-[17px] leading-relaxed">
              Some {trade.name.toLowerCase()} jobs need a licensed tradie.
              Others you can knock over on a Saturday with the right tool. Here
              is the honest line.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <div className="bg-white border border-[#e2ddd3] rounded-md p-6 md:p-7">
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-3">
                Call a {trade.noun.toLowerCase()} for
              </p>
              <ul className="space-y-2.5">
                {trade.whenToCall.call.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check
                      size={14}
                      className="text-[#8a6e3f] shrink-0 mt-1"
                      aria-hidden
                    />
                    <span className="text-sm text-[#3a3735] leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-[#e2ddd3] rounded-md p-6 md:p-7">
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#5a5650] mb-3">
                Probably DIY
              </p>
              <ul className="space-y-2.5">
                {trade.whenToCall.diy.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <X
                      size={14}
                      className="text-[#5a5650]/60 shrink-0 mt-1"
                      aria-hidden
                    />
                    <span className="text-sm text-[#3a3735] leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related case studies */}
      {relatedCases.length > 0 && (
        <section className="relative py-20 md:py-28 bg-[#ffffff]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
              <div>
                <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-3">
                  Recent work
                </p>
                <h2
                  className="text-[#1a1a1a] text-3xl md:text-4xl tracking-[-0.02em] leading-[1.05]"
                  style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
                >
                  {trade.name} jobs — Adelaide.
                </h2>
              </div>
              <Link
                href="/case-studies"
                className="group inline-flex items-center gap-2 text-sm text-[#1a1a1a] hover:text-[#8a6e3f] transition-colors"
                style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 600 }}
              >
                All case studies
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedCases.map((c) => (
                <Link
                  key={c.slug}
                  href={`/case-studies/${c.slug}`}
                  className="group block bg-[#fafaf7] border border-[#e2ddd3] rounded-md overflow-hidden hover:border-[#8a6e3f]/60 transition-colors"
                >
                  <div className="aspect-[4/3] relative bg-[#e2ddd3] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.hero}
                      alt={c.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] tracking-[0.18em] uppercase text-[#8a6e3f] mb-2">
                      {c.suburb} · {c.duration}
                    </p>
                    <h3
                      className="text-[#1a1a1a] text-base tracking-[-0.01em] leading-[1.25]"
                      style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
                    >
                      {c.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className="relative py-20 md:py-28 bg-[#fafaf7] border-y border-[#e2ddd3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10 md:mb-12">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">
              FAQ
            </p>
            <h2
              className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]"
              style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
            >
              {trade.name} questions, answered.
            </h2>
          </div>
          <FAQAccordion items={trade.faqs.map((f) => ({ q: f.q, a: f.a }))} />
        </div>
      </section>

      {/* Related trades — slim band, not full section */}
      {related.length > 0 && (
        <div className="bg-[#ffffff] border-t border-[#e2ddd3]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#5a5650] shrink-0">
              Related trades
            </p>
            <div className="flex flex-wrap gap-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/services/${r.slug}`}
                  className="group inline-flex items-center gap-1.5 bg-[#fafaf7] border border-[#e2ddd3] rounded-md px-3 py-2 hover:border-[#8a6e3f]/60 hover:bg-[#f3efe5] transition-colors min-h-[44px]"
                >
                  <span
                    className="text-[#1a1a1a] text-sm"
                    style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 600 }}
                  >
                    {r.name}
                  </span>
                  <ArrowRight
                    size={12}
                    className="text-[#8a6e3f] transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="relative py-20 md:py-28 bg-[#fafaf7] border-t border-[#e2ddd3] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.1] mb-6"
            style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
          >
            Got a {trade.name.toLowerCase()} job?{' '}
            <span className="text-[#8a6e3f]">
              Tell us. We&rsquo;ll handle it.
            </span>
          </h2>
          <p className="text-[#3a3735] text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            Coordinator picks the right specialist off the bench, attends
            on-site, scopes the work, and gets you a written quote — usually
            inside 24 hours of the visit.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <MovingBorder href="/contact">
              Get a quote
              <ArrowRight size={18} aria-hidden />
            </MovingBorder>
            <a
              href={whatsappHref(
                `Hi Briks — I'd like a quote on ${trade.name.toLowerCase()} work in Adelaide. Quick details:`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#c0bcb4] hover:border-[#8a6e3f]/60 text-[#1a1a1a]/80 hover:text-[#1a1a1a] px-7 py-3.5 transition-colors duration-300 min-h-[44px]"
            >
              Text us on WhatsApp
            </a>
          </div>

          <Link
            href="/services"
            className="mt-12 inline-flex items-center gap-2 text-xs tracking-[0.16em] uppercase text-[#5a5650] hover:text-[#8a6e3f] transition-colors"
          >
            <ArrowLeft size={12} />
            All services
          </Link>
        </div>
      </section>
    </>
  )
}
