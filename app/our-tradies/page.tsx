import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ShieldCheck, Search, Repeat, MessageSquare, type LucideIcon } from 'lucide-react'
import PageHero from '@/components/sections/PageHero'
import NetworkGrid from '@/components/sections/NetworkGrid'
import MovingBorder from '@/components/effects/MovingBorder'
import { VET_CHECKS } from '@/lib/network'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Our Tradies — Adelaide\'s Vetted Building Network',
  description:
    'Briks Building Services coordinates a vetted bench of licensed Adelaide tradies. Plumbers, electricians, carpenters, painters, tilers, roofers — all license-checked, insured, and reviewed every job.',
  alternates: { canonical: '/our-tradies' },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'Our Tradies', item: `${SITE.url}/our-tradies` },
  ],
}

const VET_ICONS: Record<string, LucideIcon> = {
  'License + ticket verified': ShieldCheck,
  'Insurance current': Search,
  'Two-job trial': Repeat,
  'Customer feedback loop': MessageSquare,
}

export default function OurTradiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c'),
        }}
      />

      <PageHero
        eyebrow="Our tradies"
        title={
          <>
            Adelaide&rsquo;s{' '}
            <span className="text-[#8a6e3f]">quiet bench.</span>
          </>
        }
        subtitle={
          <>
            Briks doesn&rsquo;t pretend to be a 200-person crew. We&rsquo;re a
            coordinator with a tight bench of Adelaide tradies we&rsquo;ve
            vetted, used, and re-used. You get the right specialist for the
            job — not the closest available body.
          </>
        }
      />

      {/* Vetting checklist */}
      <section className="relative py-20 md:py-28 bg-[#ffffff]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12 md:mb-16">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">
              How we vet
            </p>
            <h2
              className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]"
              style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
            >
              Four checks every tradie clears before they touch your job.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {VET_CHECKS.map((check) => {
              const Icon = VET_ICONS[check.title] ?? ShieldCheck
              return (
                <div
                  key={check.title}
                  className="bg-[#fafaf7] border border-[#e2ddd3] rounded-md p-6 md:p-7"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-[#e2ddd3] bg-white mb-5">
                    <Icon size={16} className="text-[#8a6e3f]" aria-hidden />
                  </div>
                  <h3
                    className="text-[#1a1a1a] text-xl tracking-[-0.01em] mb-2"
                    style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
                  >
                    {check.title}
                  </h3>
                  <p className="text-[#3a3735] text-sm md:text-[15px] leading-relaxed">
                    {check.body}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Network grid */}
      <section className="relative py-20 md:py-28 bg-[#fafaf7] border-y border-[#e2ddd3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
            <div className="max-w-2xl">
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">
                The bench
              </p>
              <h2
                className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]"
                style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
              >
                Anonymized on purpose.{' '}
                <span className="text-[#5a5650]">
                  You hire Briks. We pick the right hands.
                </span>
              </h2>
              <p className="mt-5 text-[#3a3735] text-base md:text-[17px] leading-relaxed max-w-xl">
                Names + photos shift. Trade, experience, license, and insurance
                are what actually matter on the day. Here&rsquo;s the working
                bench right now.
              </p>
            </div>
          </div>

          <NetworkGrid />
        </div>
      </section>

      {/* Why outsourced beats employed */}
      <section className="relative py-20 md:py-28 bg-[#ffffff]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">
                Honest counter
              </p>
              <h2
                className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05]"
                style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
              >
                &ldquo;Aren&rsquo;t in-house tradies better?&rdquo;
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-5 text-[#3a3735] text-base md:text-[17px] leading-relaxed">
              <p>
                Sometimes. Often, no. Here&rsquo;s the honest read: an in-house
                crew works for whoever pays the wages. They show up on the job
                they were rostered to — not the one that suits your fault.
              </p>
              <p>
                A vetted network means your job gets the right specialist. The
                heritage waterproofer for your 1920s shower hob. The A-grade
                spark for the switchboard. The cabinet-maker who&rsquo;s done
                300 kitchens, not the apprentice the boss is trying to keep
                busy on a quiet Tuesday.
              </p>
              <p>
                We pay tradies fairly so they take our calls first. We don&rsquo;t
                inflate overhead by pretending to employ them. You pay for the
                work and the coordination — nothing else.
              </p>
              <p
                className="text-[#1a1a1a] pt-2"
                style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 600 }}
              >
                Right hands. Right job. Right time. That&rsquo;s the whole
                pitch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 md:py-28 bg-[#fafaf7] border-t border-[#e2ddd3] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.1] mb-6"
            style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
          >
            Got a job?{' '}
            <span className="text-[#8a6e3f]">We&rsquo;ll match the right tradie.</span>
          </h2>
          <p className="text-[#3a3735] text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            Tell us what&rsquo;s broken or what you&rsquo;re building. A
            coordinator picks the right specialist off the bench, scopes the
            job, and gets you a written quote — usually inside 24 hours of the
            on-site visit.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <MovingBorder href="/contact">
              Get a quote
              <ArrowRight size={18} aria-hidden />
            </MovingBorder>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 rounded-full border border-[#c0bcb4] hover:border-[#8a6e3f]/60 text-[#1a1a1a]/80 hover:text-[#1a1a1a] px-7 py-3.5 transition-colors duration-300 min-h-[44px]"
            >
              How quoting works
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
