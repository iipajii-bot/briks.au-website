import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import PageHero from '@/components/sections/PageHero'
import FAQAccordion from '@/components/sections/FAQAccordion'
import MovingBorder from '@/components/effects/MovingBorder'
import type { QA } from '@/lib/faqs'

type Props = {
  eyebrow: string
  title: React.ReactNode
  subtitle: React.ReactNode
  faqs: QA[]
  primaryHref?: string
  primaryLabel?: string
}

export default function FAQSubPage({
  eyebrow,
  title,
  subtitle,
  faqs,
  primaryHref = '/contact',
  primaryLabel = 'Get a quote',
}: Props) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle} />

      <section className="relative py-16 md:py-24 bg-[#fafaf7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <section className="relative py-20 md:py-28 bg-[#ffffff] border-t border-[#e2ddd3]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="font-display text-3xl md:text-4xl text-[#1a1a1a] mb-5 tracking-[-0.02em]"
            style={{ fontWeight: 700 }}
          >
            Ready to talk?
          </h2>
          <p className="text-[#3a3735] text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            Two sentences is enough — broken thing, address, urgency. Quote
            back fast.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <MovingBorder href={primaryHref}>
              {primaryLabel}
              <ArrowRight size={16} aria-hidden />
            </MovingBorder>
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 rounded-md border border-[#c0bcb4] hover:border-[#8a6e3f]/60 text-[#1a1a1a]/80 hover:text-[#1a1a1a] px-7 py-3.5 transition-colors duration-300 min-h-[44px]"
            >
              <ArrowLeft size={14} aria-hidden />
              All FAQs
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
