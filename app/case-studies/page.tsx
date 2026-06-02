import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'
import PageHero from '@/components/sections/PageHero'
import MovingBorder from '@/components/effects/MovingBorder'
import BackgroundBeams from '@/components/effects/BackgroundBeams'
import CaseStudyCard from '@/components/sections/CaseStudyCard'
import { CASE_STUDIES } from '@/lib/case-studies'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Case Studies — Real Adelaide Maintenance Jobs',
  description:
    'Detailed case studies of recent maintenance jobs handled by Briks across Adelaide. Real properties, real outcomes, real numbers.',
  alternates: { canonical: '/case-studies' },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'Case Studies', item: `${SITE.url}/case-studies` },
  ],
}

export default function CaseStudiesIndex() {
  const hasCases = CASE_STUDIES.length > 0

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c'),
        }}
      />

      <PageHero
        eyebrow="Case studies"
        title={
          <>
            Real Adelaide jobs.{' '}
            <span className="text-[#8a6e3f]">Real numbers.</span>
          </>
        }
        subtitle={
          <>
            Each case study is a real Briks job — the brief, the dispatch
            decision, the outcome, and what the customer saw on their invoice
            at the end. No fabrication, no marketing inflation.
          </>
        }
      />

      {hasCases ? (
        <section className="relative py-20 md:py-28 bg-[#fafaf7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {CASE_STUDIES.map((cs) => (
                <CaseStudyCard key={cs.slug} study={cs} enableSlider />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="relative py-20 md:py-32 bg-[#fafaf7]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="rounded-md border border-[#e2ddd3] bg-[#ffffff] p-10 md:p-14">
              <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full border border-[#8a6e3f]/40 bg-[#f3efe5] mb-6">
                <Clock size={22} className="text-[#8a6e3f]" aria-hidden />
              </div>
              <h2
                className="font-display text-2xl md:text-3xl text-[#1a1a1a] mb-4"
                style={{ fontWeight: 700 }}
              >
                First case studies coming soon.
              </h2>
              <p className="text-[#3a3735] leading-relaxed max-w-xl mx-auto mb-8">
                Briks just opened in Adelaide — our first case studies will
                land as the early jobs wrap up. In the meantime, the FAQ and
                services pages cover what we do and how we do it.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <MovingBorder href="/contact">
                  Book a 15-min call
                  <ArrowRight size={16} aria-hidden />
                </MovingBorder>
                <Link
                  href="/faq"
                  className="inline-flex items-center gap-2 rounded-full border border-[#c0bcb4] hover:border-[#8a6e3f]/60 text-[#1a1a1a]/80 hover:text-[#1a1a1a] px-7 py-3.5 transition-colors duration-300 min-h-[44px]"
                >
                  Read the FAQ
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="relative py-28 md:py-36 bg-[#fafaf7] overflow-hidden">
        <BackgroundBeams />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="font-display text-3xl md:text-5xl leading-[1.1] tracking-[-0.02em] text-[#1a1a1a] mb-6"
            style={{ fontWeight: 700 }}
          >
            Got a job that&rsquo;d make a good case study?{' '}
            <span className="text-[#8a6e3f]">Tell us.</span>
          </h2>
          <p className="text-[#3a3735] text-base md:text-lg mb-8 max-w-xl mx-auto">
            We document jobs in detail when customers consent. If you want
            yours featured (or stay private), we honour either.
          </p>
          <MovingBorder href="/contact">
            Get a quote
            <ArrowRight size={18} aria-hidden />
          </MovingBorder>
        </div>
      </section>
    </>
  )
}
