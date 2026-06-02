import Link from 'next/link'
import { ArrowRight, ArrowLeft, Wrench } from 'lucide-react'
import PageHero from '@/components/sections/PageHero'
import ImageBanner from '@/components/sections/ImageBanner'
import MovingBorder from '@/components/effects/MovingBorder'

type Props = {
  eyebrow: string
  title: React.ReactNode
  subtitle: React.ReactNode
  bullets?: string[]
  primaryHref?: string
  primaryLabel?: string
  backHref?: string
  backLabel?: string
  image?: { src: string; alt: string; caption?: string }
}

/**
 * Lightweight placeholder section for routes still in build.
 * Honest "scope captured, content shipping soon" — no Lorem.
 */
export default function PageStub({
  eyebrow,
  title,
  subtitle,
  bullets = [],
  primaryHref = '/contact',
  primaryLabel = 'Talk to us',
  backHref = '/',
  backLabel = 'Back home',
  image,
}: Props) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle} />

      {image && (
        <section className="relative pt-4 pb-10 md:pb-14 bg-[#ffffff]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <ImageBanner
              src={image.src}
              alt={image.alt}
              caption={image.caption}
              aspect="banner"
            />
          </div>
        </section>
      )}

      {bullets.length > 0 && (
        <section className="relative py-20 md:py-28 bg-[#fafaf7]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase mb-6">
              In scope
            </p>
            <ul className="space-y-3">
              {bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 text-[#1a1a1a] text-base md:text-lg leading-relaxed"
                >
                  <span className="mt-2 inline-block h-px w-5 bg-[#8a6e3f] shrink-0" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="relative py-20 md:py-28 bg-[#ffffff] border-t border-[#e2ddd3]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-md border border-[#8a6e3f]/40 bg-[#f3efe5] mb-6">
            <Wrench size={20} className="text-[#8a6e3f]" aria-hidden />
          </div>
          <h2
            className="font-display text-3xl md:text-4xl text-[#1a1a1a] mb-4 tracking-[-0.02em]"
            style={{ fontWeight: 700 }}
          >
            Page in build.{' '}
            <span className="text-[#8a6e3f]">Scope is locked.</span>
          </h2>
          <p className="text-[#3a3735] text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10">
            We&rsquo;re finishing the detailed copy and case studies for this
            page. The work itself runs as normal — call or quote-request and
            we&rsquo;ll handle it.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <MovingBorder href={primaryHref}>
              {primaryLabel}
              <ArrowRight size={16} aria-hidden />
            </MovingBorder>
            <Link
              href={backHref}
              className="inline-flex items-center gap-2 rounded-md border border-[#c0bcb4] hover:border-[#8a6e3f]/60 text-[#1a1a1a]/80 hover:text-[#1a1a1a] px-7 py-3.5 transition-colors duration-300 min-h-[44px]"
            >
              <ArrowLeft size={14} aria-hidden />
              {backLabel}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
